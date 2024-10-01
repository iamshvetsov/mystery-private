import { toNano } from '@ton/core';
import { MysteryPrivate } from '../wrappers/MysteryPrivate';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const mysteryPrivate = provider.open(await MysteryPrivate.fromInit());

    await mysteryPrivate.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(mysteryPrivate.address);

    // run methods on `mysteryPrivate`
}
