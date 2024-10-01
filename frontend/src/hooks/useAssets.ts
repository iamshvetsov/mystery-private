import { useState } from 'react';
import { StonApiClient } from '@ston-fi/api';
import { useInterval } from './useInterval';
import { AssetType } from '../types';

const stonApiClient = new StonApiClient();

const ASSETS = [
    'EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c',
    'EQAvlWFDxGF2lXm67y4yzC17wYKD9A0guwPkMs1gOsM__NOT',
    'EQCvxJy4eG8hyHBFsZ7eePxrRsUQSFE_jpptRAYBmcG_DOGS'
];

export function useAssets() {
    const [assets, setAssets] = useState<AssetType[]>([]);

    const getAssets = () =>
        Promise.all(ASSETS.map((asset) => stonApiClient.getAsset(asset))).then((response: any) =>
            setAssets(
                response.map(
                    ({ contractAddress, dexPriceUsd, decimals, displayName, symbol, imageUrl }: AssetType) => ({
                        contractAddress,
                        dexPriceUsd,
                        decimals,
                        displayName,
                        symbol,
                        imageUrl
                    })
                )
            )
        );

    useInterval(getAssets, 10000);

    return {
        assets,
        tonPrice: Number(
            assets.find(({ contractAddress }) => contractAddress === 'EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c')
                ?.dexPriceUsd ?? 0
        )
    };
}
