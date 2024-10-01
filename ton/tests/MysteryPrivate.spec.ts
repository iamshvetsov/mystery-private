import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano, Address } from '@ton/core';
import { MysteryPrivate, OpenPosition, ClosePosition, LiquidatePosition } from '../wrappers/MysteryPrivate';
import { Positions } from '../wrappers/Positions';
import '@ton/test-utils';

const GAS_CONSUMPTION = toNano('0.06');

describe('MysteryPrivate', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let mysteryPrivate: SandboxContract<MysteryPrivate>;
    let positions: SandboxContract<Positions>;

    beforeAll(async () => {
        blockchain = await Blockchain.create();
        deployer = await blockchain.treasury('deployer');
        mysteryPrivate = blockchain.openContract(await MysteryPrivate.fromInit());

        const deployResult = await mysteryPrivate.send(
            deployer.getSender(),
            { value: GAS_CONSUMPTION },
            { $$type: 'Deploy', queryId: 0n }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: mysteryPrivate.address,
            deploy: true,
            success: true
        });
    });

    it('should create a new position', async () => {
        const message: OpenPosition = {
            $$type: 'OpenPosition',
            token: Address.parse('EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c'),
            entryPrice: toNano('5'),
            amount: 1n,
            liquidationPrice: toNano('10')
        };

        await mysteryPrivate.send(deployer.getSender(), { value: GAS_CONSUMPTION }, message);

        const positionsAddress = await mysteryPrivate.getPositionsAddress(deployer.address);
        positions = blockchain.openContract(Positions.fromAddress(positionsAddress!));
        const seqno = await positions.getNumPositions();
        const positionsMap = await positions.getPositions();
        const positionBySeqno = positionsMap.get(seqno)!;

        expect(seqno).toEqual(1n);
        expect(positionBySeqno).toHaveProperty('seqno', seqno);
        expect(positionBySeqno.token).toEqualAddress(Address.parse('EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c'));
        expect(positionBySeqno).toHaveProperty('entryPrice', 5000000000n);
        expect(positionBySeqno).toHaveProperty('amount', 1n);
        expect(positionBySeqno).toHaveProperty('liquidationPrice', 10000000000n);
        expect(positionBySeqno).toHaveProperty('status', 'Open');
        expect(positionBySeqno).toHaveProperty('closePrice', 0n);
    });

    it('should close the last position', async () => {
        const seqno = await positions.getNumPositions();

        const closeMessage: ClosePosition = {
            $$type: 'ClosePosition',
            seqno,
            markPrice: toNano('4'),
            value: toNano('6')
        };

        await mysteryPrivate.send(deployer.getSender(), { value: GAS_CONSUMPTION }, closeMessage);

        const positionsMap = await positions.getPositions();
        const positionBySeqno = positionsMap.get(seqno)!;

        expect(positionBySeqno).toHaveProperty('status', 'Close');
        expect(positionBySeqno).toHaveProperty('closePrice', 4000000000n);
    });

    it('should not close a position if it has already closed', async () => {
        const seqno = await positions.getNumPositions();

        const closeMessage: ClosePosition = {
            $$type: 'ClosePosition',
            seqno,
            markPrice: toNano('3'),
            value: toNano('6')
        };

        const { transactions } = await mysteryPrivate.send(
            deployer.getSender(),
            { value: GAS_CONSUMPTION },
            closeMessage
        );
        const positionsMap = await positions.getPositions();
        const positionBySeqno = positionsMap.get(seqno)!;

        expect(transactions).toHaveTransaction({ success: false });
        expect(positionBySeqno).toHaveProperty('closePrice', 4000000000n);
    });

    it('should not liquidate a position if there is a margin', async () => {
        const message: OpenPosition = {
            $$type: 'OpenPosition',
            token: Address.parse('EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c'),
            entryPrice: toNano('5'),
            amount: 1n,
            liquidationPrice: toNano('10')
        };

        await mysteryPrivate.send(deployer.getSender(), { value: GAS_CONSUMPTION }, message);

        const seqno = await positions.getNumPositions();

        const liquidateMessage: LiquidatePosition = {
            $$type: 'LiquidatePosition',
            seqno,
            markPrice: toNano('9')
        };

        await mysteryPrivate.send(deployer.getSender(), { value: GAS_CONSUMPTION }, liquidateMessage);

        const positionsMap = await positions.getPositions();
        const positionBySeqno = positionsMap.get(seqno)!;

        expect(positionBySeqno).toHaveProperty('status', 'Open');
    });

    it('should liquidate a position', async () => {
        const seqno = await positions.getNumPositions();

        const liquidateMessage: LiquidatePosition = {
            $$type: 'LiquidatePosition',
            seqno,
            markPrice: toNano('10')
        };

        await mysteryPrivate.send(deployer.getSender(), { value: GAS_CONSUMPTION }, liquidateMessage);

        const positionsMap = await positions.getPositions();
        const positionBySeqno = positionsMap.get(seqno)!;

        expect(positionBySeqno).toHaveProperty('status', 'Liquidate');
        expect(positionBySeqno).toHaveProperty('closePrice', 10000000000n);
    });
});
