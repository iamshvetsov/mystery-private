import { useState, useEffect } from 'react';
import { Address, OpenedContract, toNano, fromNano } from '@ton/core';
import { useAsyncInitialize } from './useAsyncInitialize';
import { useTonClient } from './useTonClient';
import { useTonConnect } from './useTonConnect';
import { useAssets } from './useAssets';
import { useWalletBalance } from './useWalletBalance';
import { PositionType, OpenPositionArgs, ClosePositionArgs, LiquidatePositionArgs } from '../types';
import {
    MysteryPrivate,
    OpenPosition,
    ClosePosition,
    LiquidatePosition
} from '../../contracts/MysteryPrivate/tact_MysteryPrivate';
import { Positions, Position } from '../../contracts/Positions/tact_Positions';

const GAS_CONSUMPTION = toNano('0.05');
const GAS_CONSUMPTION_THRESHOLD = toNano('0.5');

export function usePositionsContract() {
    const { client } = useTonClient();
    const { sender, wallet } = useTonConnect();

    const { tonPrice } = useAssets();
    const tonBalance = useWalletBalance();

    const [walletBalance, setWalletBalance] = useState<bigint>(0n);

    useEffect(() => {
        const walletBalance = toNano(tonPrice * Number(fromNano(tonBalance)));

        setWalletBalance(walletBalance);
    }, [tonPrice, tonBalance]);

    const mysteryPrivateContract = useAsyncInitialize(async () => {
        if (!client) return;

        const contract = MysteryPrivate.fromAddress(Address.parse('EQAZo_YiXiHkcsuhy6CyItBoxYsXwilPhS1FoRBGTGHLFGTO'));

        return client.open(contract) as OpenedContract<MysteryPrivate>;
    }, [client]);

    const positionsContract = useAsyncInitialize(async () => {
        if (!client || !mysteryPrivateContract) return;

        const positionsAddress = await mysteryPrivateContract.getPositionsAddress(Address.parse(wallet!));

        if (positionsAddress === null) return;

        const contract = Positions.fromAddress(positionsAddress);

        return client.open(contract) as OpenedContract<Positions>;
    }, [client, wallet, mysteryPrivateContract]);

    const [positions, setPositions] = useState<PositionType[]>([]);
    const [positionsIsLoading, setPositionsIsLoading] = useState<boolean>(false);

    async function getPositions() {
        if (!positionsContract) return;

        setPositionsIsLoading(true);

        const tempPositions = [];

        const numPositions = await positionsContract.getNumPositions();
        const positionsMap = await positionsContract.getPositions();

        for (let i = 1; i <= numPositions; i++) {
            const { seqno, token, entryPrice, amount, liquidationPrice, status, closePrice } = positionsMap.get(
                BigInt(i)
            ) as Position;

            tempPositions.push({
                seqno: fromNano(seqno),
                token: Address.normalize(token),
                entryPrice: fromNano(entryPrice),
                amount: fromNano(amount),
                liquidationPrice: fromNano(liquidationPrice),
                status,
                closePrice: fromNano(closePrice)
            });
        }

        setPositions(tempPositions);
        setPositionsIsLoading(false);
    }

    useEffect(() => {
        getPositions();
    }, [client, positionsContract]);

    return {
        positions,
        positionsIsLoading,
        openPosition: async ({ token, entryPrice, amount, liquidationPrice }: OpenPositionArgs) => {
            const message: OpenPosition = {
                $$type: 'OpenPosition',
                token: Address.parse(token),
                entryPrice: toNano(Number(entryPrice)),
                amount: toNano(amount),
                liquidationPrice: toNano(liquidationPrice)
            };

            if (walletBalance - toNano(Number(entryPrice) * Number(amount)) < GAS_CONSUMPTION_THRESHOLD) {
                throw new Error('Insufficient wallet balance');
            }

            await mysteryPrivateContract?.send(
                sender,
                {
                    value: toNano((Number(entryPrice) * Number(amount)) / tonPrice) + GAS_CONSUMPTION
                },
                message
            );

            await setTimeout(getPositions, 60000);
        },
        closePosition: async ({ seqno, markPrice }: ClosePositionArgs) => {
            const position = positions.find((position) => position.seqno === seqno);

            if (!position) return;

            const message: ClosePosition = {
                $$type: 'ClosePosition',
                seqno: toNano(seqno),
                markPrice: toNano(Number(markPrice)),
                value: toNano(
                    Number(position.amount) * ((Number(position.liquidationPrice) - Number(markPrice)) / tonPrice)
                )
            };

            await mysteryPrivateContract?.send(
                sender,
                {
                    value: GAS_CONSUMPTION
                },
                message
            );

            await setTimeout(getPositions, 60000);
        },
        liquidatePosition: async ({ seqno, markPrice }: LiquidatePositionArgs) => {
            const message: LiquidatePosition = {
                $$type: 'LiquidatePosition',
                seqno: toNano(seqno),
                markPrice: toNano(Number(markPrice))
            };

            await mysteryPrivateContract?.send(
                sender,
                {
                    value: GAS_CONSUMPTION
                },
                message
            );

            await setTimeout(getPositions, 60000);
        }
    };
}
