message OpenPosition {
    token: Address;
    entryPrice: Int as coins;
    amount: Int as coins;
    liquidationPrice: Int as coins;
}

message ClosePosition {
    seqno: Int as uint256;
    markPrice: Int as coins;
    value: Int as coins;
}

message LiquidatePosition {
    seqno: Int as uint256;
    markPrice: Int as coins;
}

message InternalOpenPosition {
    sender: Address;
    token: Address;
    entryPrice: Int as coins;
    amount: Int as coins;
    liquidationPrice: Int as coins;
}

message InternalClosePosition {
    sender: Address;
    seqno: Int as uint256;
    markPrice: Int as coins;
}

message InternalLiquidatePosition {
    sender: Address;
    seqno: Int as uint256;
    markPrice: Int as coins;
}
