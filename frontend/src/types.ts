export enum Tabs {
    Assets = 'Assets',
    Positions = 'Positions',
    History = 'History'
}

export type AssetType = {
    contractAddress: string;
    dexPriceUsd: string;
    decimals: number;
    displayName: string;
    symbol: string;
    imageUrl: string;
};

export type PositionType = {
    seqno: string;
    token: string;
    entryPrice: string;
    amount: string;
    liquidationPrice: string;
    status: string;
    closePrice: string;
};

export type PositionUnionType = { asset: AssetType } & Omit<PositionType, 'token'>;

export enum PositionStatuses {
    Open = 'Open',
    Close = 'Close',
    Liquidate = 'Liquidate'
}

export type OpenPositionArgs = {
    token: string;
    entryPrice: string;
    amount: string;
    liquidationPrice: number;
};

export type ClosePositionArgs = {
    seqno: string;
    markPrice: string;
};

export type LiquidatePositionArgs = {
    seqno: string;
    markPrice: string;
};
