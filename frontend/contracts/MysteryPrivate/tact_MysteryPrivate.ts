import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadGetterTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type StdAddress = {
    $$type: 'StdAddress';
    workchain: bigint;
    address: bigint;
}

export function storeStdAddress(src: StdAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.workchain, 8);
        b_0.storeUint(src.address, 256);
    };
}

export function loadStdAddress(slice: Slice) {
    let sc_0 = slice;
    let _workchain = sc_0.loadIntBig(8);
    let _address = sc_0.loadUintBig(256);
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleStdAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleStdAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleStdAddress(source: StdAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeNumber(source.address);
    return builder.build();
}

function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStdAddress(src)).endCell());
        },
        parse: (src) => {
            return loadStdAddress(src.loadRef().beginParse());
        }
    }
}

export type VarAddress = {
    $$type: 'VarAddress';
    workchain: bigint;
    address: Slice;
}

export function storeVarAddress(src: VarAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.workchain, 32);
        b_0.storeRef(src.address.asCell());
    };
}

export function loadVarAddress(slice: Slice) {
    let sc_0 = slice;
    let _workchain = sc_0.loadIntBig(32);
    let _address = sc_0.loadRef().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleVarAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleVarAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleVarAddress(source: VarAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeSlice(source.address.asCell());
    return builder.build();
}

function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVarAddress(src)).endCell());
        },
        parse: (src) => {
            return loadVarAddress(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadGetterTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadGetterTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadGetterTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadGetterTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadGetterTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type OpenPosition = {
    $$type: 'OpenPosition';
    token: Address;
    entryPrice: bigint;
    amount: bigint;
    liquidationPrice: bigint;
}

export function storeOpenPosition(src: OpenPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2326216063, 32);
        b_0.storeAddress(src.token);
        b_0.storeCoins(src.entryPrice);
        b_0.storeCoins(src.amount);
        b_0.storeCoins(src.liquidationPrice);
    };
}

export function loadOpenPosition(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2326216063) { throw Error('Invalid prefix'); }
    let _token = sc_0.loadAddress();
    let _entryPrice = sc_0.loadCoins();
    let _amount = sc_0.loadCoins();
    let _liquidationPrice = sc_0.loadCoins();
    return { $$type: 'OpenPosition' as const, token: _token, entryPrice: _entryPrice, amount: _amount, liquidationPrice: _liquidationPrice };
}

function loadTupleOpenPosition(source: TupleReader) {
    let _token = source.readAddress();
    let _entryPrice = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _liquidationPrice = source.readBigNumber();
    return { $$type: 'OpenPosition' as const, token: _token, entryPrice: _entryPrice, amount: _amount, liquidationPrice: _liquidationPrice };
}

function loadGetterTupleOpenPosition(source: TupleReader) {
    let _token = source.readAddress();
    let _entryPrice = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _liquidationPrice = source.readBigNumber();
    return { $$type: 'OpenPosition' as const, token: _token, entryPrice: _entryPrice, amount: _amount, liquidationPrice: _liquidationPrice };
}

function storeTupleOpenPosition(source: OpenPosition) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.token);
    builder.writeNumber(source.entryPrice);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.liquidationPrice);
    return builder.build();
}

function dictValueParserOpenPosition(): DictionaryValue<OpenPosition> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeOpenPosition(src)).endCell());
        },
        parse: (src) => {
            return loadOpenPosition(src.loadRef().beginParse());
        }
    }
}

export type ClosePosition = {
    $$type: 'ClosePosition';
    seqno: bigint;
    markPrice: bigint;
    value: bigint;
}

export function storeClosePosition(src: ClosePosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2394813661, 32);
        b_0.storeUint(src.seqno, 256);
        b_0.storeCoins(src.markPrice);
        b_0.storeCoins(src.value);
    };
}

export function loadClosePosition(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2394813661) { throw Error('Invalid prefix'); }
    let _seqno = sc_0.loadUintBig(256);
    let _markPrice = sc_0.loadCoins();
    let _value = sc_0.loadCoins();
    return { $$type: 'ClosePosition' as const, seqno: _seqno, markPrice: _markPrice, value: _value };
}

function loadTupleClosePosition(source: TupleReader) {
    let _seqno = source.readBigNumber();
    let _markPrice = source.readBigNumber();
    let _value = source.readBigNumber();
    return { $$type: 'ClosePosition' as const, seqno: _seqno, markPrice: _markPrice, value: _value };
}

function loadGetterTupleClosePosition(source: TupleReader) {
    let _seqno = source.readBigNumber();
    let _markPrice = source.readBigNumber();
    let _value = source.readBigNumber();
    return { $$type: 'ClosePosition' as const, seqno: _seqno, markPrice: _markPrice, value: _value };
}

function storeTupleClosePosition(source: ClosePosition) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.seqno);
    builder.writeNumber(source.markPrice);
    builder.writeNumber(source.value);
    return builder.build();
}

function dictValueParserClosePosition(): DictionaryValue<ClosePosition> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeClosePosition(src)).endCell());
        },
        parse: (src) => {
            return loadClosePosition(src.loadRef().beginParse());
        }
    }
}

export type LiquidatePosition = {
    $$type: 'LiquidatePosition';
    seqno: bigint;
    markPrice: bigint;
}

export function storeLiquidatePosition(src: LiquidatePosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1034647345, 32);
        b_0.storeUint(src.seqno, 256);
        b_0.storeCoins(src.markPrice);
    };
}

export function loadLiquidatePosition(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1034647345) { throw Error('Invalid prefix'); }
    let _seqno = sc_0.loadUintBig(256);
    let _markPrice = sc_0.loadCoins();
    return { $$type: 'LiquidatePosition' as const, seqno: _seqno, markPrice: _markPrice };
}

function loadTupleLiquidatePosition(source: TupleReader) {
    let _seqno = source.readBigNumber();
    let _markPrice = source.readBigNumber();
    return { $$type: 'LiquidatePosition' as const, seqno: _seqno, markPrice: _markPrice };
}

function loadGetterTupleLiquidatePosition(source: TupleReader) {
    let _seqno = source.readBigNumber();
    let _markPrice = source.readBigNumber();
    return { $$type: 'LiquidatePosition' as const, seqno: _seqno, markPrice: _markPrice };
}

function storeTupleLiquidatePosition(source: LiquidatePosition) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.seqno);
    builder.writeNumber(source.markPrice);
    return builder.build();
}

function dictValueParserLiquidatePosition(): DictionaryValue<LiquidatePosition> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLiquidatePosition(src)).endCell());
        },
        parse: (src) => {
            return loadLiquidatePosition(src.loadRef().beginParse());
        }
    }
}

export type InternalOpenPosition = {
    $$type: 'InternalOpenPosition';
    sender: Address;
    token: Address;
    entryPrice: bigint;
    amount: bigint;
    liquidationPrice: bigint;
}

export function storeInternalOpenPosition(src: InternalOpenPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1211050099, 32);
        b_0.storeAddress(src.sender);
        b_0.storeAddress(src.token);
        b_0.storeCoins(src.entryPrice);
        b_0.storeCoins(src.amount);
        b_0.storeCoins(src.liquidationPrice);
    };
}

export function loadInternalOpenPosition(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1211050099) { throw Error('Invalid prefix'); }
    let _sender = sc_0.loadAddress();
    let _token = sc_0.loadAddress();
    let _entryPrice = sc_0.loadCoins();
    let _amount = sc_0.loadCoins();
    let _liquidationPrice = sc_0.loadCoins();
    return { $$type: 'InternalOpenPosition' as const, sender: _sender, token: _token, entryPrice: _entryPrice, amount: _amount, liquidationPrice: _liquidationPrice };
}

function loadTupleInternalOpenPosition(source: TupleReader) {
    let _sender = source.readAddress();
    let _token = source.readAddress();
    let _entryPrice = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _liquidationPrice = source.readBigNumber();
    return { $$type: 'InternalOpenPosition' as const, sender: _sender, token: _token, entryPrice: _entryPrice, amount: _amount, liquidationPrice: _liquidationPrice };
}

function loadGetterTupleInternalOpenPosition(source: TupleReader) {
    let _sender = source.readAddress();
    let _token = source.readAddress();
    let _entryPrice = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _liquidationPrice = source.readBigNumber();
    return { $$type: 'InternalOpenPosition' as const, sender: _sender, token: _token, entryPrice: _entryPrice, amount: _amount, liquidationPrice: _liquidationPrice };
}

function storeTupleInternalOpenPosition(source: InternalOpenPosition) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.sender);
    builder.writeAddress(source.token);
    builder.writeNumber(source.entryPrice);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.liquidationPrice);
    return builder.build();
}

function dictValueParserInternalOpenPosition(): DictionaryValue<InternalOpenPosition> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInternalOpenPosition(src)).endCell());
        },
        parse: (src) => {
            return loadInternalOpenPosition(src.loadRef().beginParse());
        }
    }
}

export type InternalClosePosition = {
    $$type: 'InternalClosePosition';
    sender: Address;
    seqno: bigint;
    markPrice: bigint;
}

export function storeInternalClosePosition(src: InternalClosePosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1378645494, 32);
        b_0.storeAddress(src.sender);
        b_0.storeUint(src.seqno, 256);
        b_0.storeCoins(src.markPrice);
    };
}

export function loadInternalClosePosition(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1378645494) { throw Error('Invalid prefix'); }
    let _sender = sc_0.loadAddress();
    let _seqno = sc_0.loadUintBig(256);
    let _markPrice = sc_0.loadCoins();
    return { $$type: 'InternalClosePosition' as const, sender: _sender, seqno: _seqno, markPrice: _markPrice };
}

function loadTupleInternalClosePosition(source: TupleReader) {
    let _sender = source.readAddress();
    let _seqno = source.readBigNumber();
    let _markPrice = source.readBigNumber();
    return { $$type: 'InternalClosePosition' as const, sender: _sender, seqno: _seqno, markPrice: _markPrice };
}

function loadGetterTupleInternalClosePosition(source: TupleReader) {
    let _sender = source.readAddress();
    let _seqno = source.readBigNumber();
    let _markPrice = source.readBigNumber();
    return { $$type: 'InternalClosePosition' as const, sender: _sender, seqno: _seqno, markPrice: _markPrice };
}

function storeTupleInternalClosePosition(source: InternalClosePosition) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.sender);
    builder.writeNumber(source.seqno);
    builder.writeNumber(source.markPrice);
    return builder.build();
}

function dictValueParserInternalClosePosition(): DictionaryValue<InternalClosePosition> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInternalClosePosition(src)).endCell());
        },
        parse: (src) => {
            return loadInternalClosePosition(src.loadRef().beginParse());
        }
    }
}

export type InternalLiquidatePosition = {
    $$type: 'InternalLiquidatePosition';
    sender: Address;
    seqno: bigint;
    markPrice: bigint;
}

export function storeInternalLiquidatePosition(src: InternalLiquidatePosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2338772000, 32);
        b_0.storeAddress(src.sender);
        b_0.storeUint(src.seqno, 256);
        b_0.storeCoins(src.markPrice);
    };
}

export function loadInternalLiquidatePosition(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2338772000) { throw Error('Invalid prefix'); }
    let _sender = sc_0.loadAddress();
    let _seqno = sc_0.loadUintBig(256);
    let _markPrice = sc_0.loadCoins();
    return { $$type: 'InternalLiquidatePosition' as const, sender: _sender, seqno: _seqno, markPrice: _markPrice };
}

function loadTupleInternalLiquidatePosition(source: TupleReader) {
    let _sender = source.readAddress();
    let _seqno = source.readBigNumber();
    let _markPrice = source.readBigNumber();
    return { $$type: 'InternalLiquidatePosition' as const, sender: _sender, seqno: _seqno, markPrice: _markPrice };
}

function loadGetterTupleInternalLiquidatePosition(source: TupleReader) {
    let _sender = source.readAddress();
    let _seqno = source.readBigNumber();
    let _markPrice = source.readBigNumber();
    return { $$type: 'InternalLiquidatePosition' as const, sender: _sender, seqno: _seqno, markPrice: _markPrice };
}

function storeTupleInternalLiquidatePosition(source: InternalLiquidatePosition) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.sender);
    builder.writeNumber(source.seqno);
    builder.writeNumber(source.markPrice);
    return builder.build();
}

function dictValueParserInternalLiquidatePosition(): DictionaryValue<InternalLiquidatePosition> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInternalLiquidatePosition(src)).endCell());
        },
        parse: (src) => {
            return loadInternalLiquidatePosition(src.loadRef().beginParse());
        }
    }
}

export type Position = {
    $$type: 'Position';
    seqno: bigint;
    token: Address;
    entryPrice: bigint;
    amount: bigint;
    liquidationPrice: bigint;
    status: string;
    closePrice: bigint;
}

export function storePosition(src: Position) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.seqno, 256);
        b_0.storeAddress(src.token);
        b_0.storeCoins(src.entryPrice);
        b_0.storeCoins(src.amount);
        b_0.storeCoins(src.liquidationPrice);
        b_0.storeStringRefTail(src.status);
        b_0.storeCoins(src.closePrice);
    };
}

export function loadPosition(slice: Slice) {
    let sc_0 = slice;
    let _seqno = sc_0.loadUintBig(256);
    let _token = sc_0.loadAddress();
    let _entryPrice = sc_0.loadCoins();
    let _amount = sc_0.loadCoins();
    let _liquidationPrice = sc_0.loadCoins();
    let _status = sc_0.loadStringRefTail();
    let _closePrice = sc_0.loadCoins();
    return { $$type: 'Position' as const, seqno: _seqno, token: _token, entryPrice: _entryPrice, amount: _amount, liquidationPrice: _liquidationPrice, status: _status, closePrice: _closePrice };
}

function loadTuplePosition(source: TupleReader) {
    let _seqno = source.readBigNumber();
    let _token = source.readAddress();
    let _entryPrice = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _liquidationPrice = source.readBigNumber();
    let _status = source.readString();
    let _closePrice = source.readBigNumber();
    return { $$type: 'Position' as const, seqno: _seqno, token: _token, entryPrice: _entryPrice, amount: _amount, liquidationPrice: _liquidationPrice, status: _status, closePrice: _closePrice };
}

function loadGetterTuplePosition(source: TupleReader) {
    let _seqno = source.readBigNumber();
    let _token = source.readAddress();
    let _entryPrice = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _liquidationPrice = source.readBigNumber();
    let _status = source.readString();
    let _closePrice = source.readBigNumber();
    return { $$type: 'Position' as const, seqno: _seqno, token: _token, entryPrice: _entryPrice, amount: _amount, liquidationPrice: _liquidationPrice, status: _status, closePrice: _closePrice };
}

function storeTuplePosition(source: Position) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.seqno);
    builder.writeAddress(source.token);
    builder.writeNumber(source.entryPrice);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.liquidationPrice);
    builder.writeString(source.status);
    builder.writeNumber(source.closePrice);
    return builder.build();
}

function dictValueParserPosition(): DictionaryValue<Position> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePosition(src)).endCell());
        },
        parse: (src) => {
            return loadPosition(src.loadRef().beginParse());
        }
    }
}

export type Positions$Data = {
    $$type: 'Positions$Data';
    parent: Address;
    owner: Address;
    numPositions: bigint;
    positions: Dictionary<bigint, Position>;
}

export function storePositions$Data(src: Positions$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.parent);
        b_0.storeAddress(src.owner);
        b_0.storeUint(src.numPositions, 256);
        b_0.storeDict(src.positions, Dictionary.Keys.BigInt(257), dictValueParserPosition());
    };
}

export function loadPositions$Data(slice: Slice) {
    let sc_0 = slice;
    let _parent = sc_0.loadAddress();
    let _owner = sc_0.loadAddress();
    let _numPositions = sc_0.loadUintBig(256);
    let _positions = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserPosition(), sc_0);
    return { $$type: 'Positions$Data' as const, parent: _parent, owner: _owner, numPositions: _numPositions, positions: _positions };
}

function loadTuplePositions$Data(source: TupleReader) {
    let _parent = source.readAddress();
    let _owner = source.readAddress();
    let _numPositions = source.readBigNumber();
    let _positions = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserPosition(), source.readCellOpt());
    return { $$type: 'Positions$Data' as const, parent: _parent, owner: _owner, numPositions: _numPositions, positions: _positions };
}

function loadGetterTuplePositions$Data(source: TupleReader) {
    let _parent = source.readAddress();
    let _owner = source.readAddress();
    let _numPositions = source.readBigNumber();
    let _positions = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserPosition(), source.readCellOpt());
    return { $$type: 'Positions$Data' as const, parent: _parent, owner: _owner, numPositions: _numPositions, positions: _positions };
}

function storeTuplePositions$Data(source: Positions$Data) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.parent);
    builder.writeAddress(source.owner);
    builder.writeNumber(source.numPositions);
    builder.writeCell(source.positions.size > 0 ? beginCell().storeDictDirect(source.positions, Dictionary.Keys.BigInt(257), dictValueParserPosition()).endCell() : null);
    return builder.build();
}

function dictValueParserPositions$Data(): DictionaryValue<Positions$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePositions$Data(src)).endCell());
        },
        parse: (src) => {
            return loadPositions$Data(src.loadRef().beginParse());
        }
    }
}

export type MysteryPrivate$Data = {
    $$type: 'MysteryPrivate$Data';
    owners: Dictionary<Address, Address>;
}

export function storeMysteryPrivate$Data(src: MysteryPrivate$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeDict(src.owners, Dictionary.Keys.Address(), Dictionary.Values.Address());
    };
}

export function loadMysteryPrivate$Data(slice: Slice) {
    let sc_0 = slice;
    let _owners = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.Address(), sc_0);
    return { $$type: 'MysteryPrivate$Data' as const, owners: _owners };
}

function loadTupleMysteryPrivate$Data(source: TupleReader) {
    let _owners = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Address(), source.readCellOpt());
    return { $$type: 'MysteryPrivate$Data' as const, owners: _owners };
}

function loadGetterTupleMysteryPrivate$Data(source: TupleReader) {
    let _owners = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Address(), source.readCellOpt());
    return { $$type: 'MysteryPrivate$Data' as const, owners: _owners };
}

function storeTupleMysteryPrivate$Data(source: MysteryPrivate$Data) {
    let builder = new TupleBuilder();
    builder.writeCell(source.owners.size > 0 ? beginCell().storeDictDirect(source.owners, Dictionary.Keys.Address(), Dictionary.Values.Address()).endCell() : null);
    return builder.build();
}

function dictValueParserMysteryPrivate$Data(): DictionaryValue<MysteryPrivate$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMysteryPrivate$Data(src)).endCell());
        },
        parse: (src) => {
            return loadMysteryPrivate$Data(src.loadRef().beginParse());
        }
    }
}

 type MysteryPrivate_init_args = {
    $$type: 'MysteryPrivate_init_args';
}

function initMysteryPrivate_init_args(src: MysteryPrivate_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
    };
}

async function MysteryPrivate_init() {
    const __code = Cell.fromBase64('te6ccgECFQEABQAAART/APSkE/S88sgLAQIBYgIDApjQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxZ2zzy4ILI+EMBzH8BygABAfQAye1UEgQCASAQEQP2AZIwf+BwIddJwh+VMCDXCx/eIIIQiqc9f7qOuDDTHwGCEIqnPX+68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6APoA+gBVMGwU4CCCEI699N26jpsw0x8BghCOvfTduvLggdP/+gD6AFUgbBPbPH/gBQYHAtz4QlUwyFVAghBILyhzUAbLH1AEINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgH6AgH6AgH6AsmBAQv4QiNZWfQKb6GSMG3fbuMPfwgJAvSBTj6BAQv4QiZZWfQKb6GSMG3fbrPy9IEBC/hCJVlZ9ApvoZIwbd8gbvLQgPhCQEPIVSCCEFIsdfZQBMsfWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsv/AfoCyRKCCvrwgHJ/BANtbds8MPhCAYIK+vCAoQ4LAqYgghA9q3cxuo6VMNMfAYIQPat3Mbry4IHT//oAWWwS4IIQlGqYtrqOp9MfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8f+AwcAwNAvD4Q/go+ELbPFxwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiIEBC/hCIhA3IG6VMFn0WTCYyAHPFkEz9EHiEDQQJIIK+vCAAnJAZn8GRVXbPDAKDgFIgQEL+EIjWVn0Cm+hkjBt3yBu8tCAAYIK+vCAcn8EA21t2zwwDgDaAtD0BDBtAYIA/OoBgBD0D2+h8uCHAYIA/OoiAoAQ9BfIAcj0AMkBzHABygBAA1kg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyQEWgEJ/VSBtbW3bPDAOAeCBTj6BAQv4QiVZWfQKb6GSMG3fbrPy9IEBC/hCJFlZ9ApvoZIwbd8gbvLQgPhCWshVIIIQi2bUIFAEyx9YINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8Wy/8B+gLJggr68IByfwQDbW3bPDB/DgE8bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zwwDgHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wgPAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAkm+slkGukwICF3XlwRBBrhYUQQIJ/3XloRMGE3XlwRG2eAO2eGMEhMAEb4V92omhpAADAE87UTQ1AH4Y9IAAZT0BAEx4DD4KNcLCoMJuvLgids8FAAcgQELIgJZ9ApvoZIwbd8AAm0=');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initMysteryPrivate_init_args({ $$type: 'MysteryPrivate_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const MysteryPrivate_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    11: { message: `'Unknown' error` },
    12: { message: `Fatal error` },
    13: { message: `Out of gas error` },
    14: { message: `Virtualization error` },
    32: { message: `Action list is invalid` },
    33: { message: `Action list is too long` },
    34: { message: `Action is invalid or not supported` },
    35: { message: `Invalid source address in outbound message` },
    36: { message: `Invalid destination address in outbound message` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    39: { message: `Outbound message does not fit into a cell after rewriting` },
    40: { message: `Cannot process a message` },
    41: { message: `Library reference is null` },
    42: { message: `Library change action error` },
    43: { message: `Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree` },
    50: { message: `Account state size exceeded limits` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    20030: { message: `There is no such owner` },
    26863: { message: `This position has an incorrect liquidation price` },
    28546: { message: `This position has a margin` },
    28967: { message: `This method could be called only by the owner` },
    32672: { message: `This position has already closed` },
    40771: { message: `There is no such position` },
    58322: { message: `This method could be called only by the parent` },
}

const MysteryPrivate_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"OpenPosition","header":2326216063,"fields":[{"name":"token","type":{"kind":"simple","type":"address","optional":false}},{"name":"entryPrice","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"liquidationPrice","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"ClosePosition","header":2394813661,"fields":[{"name":"seqno","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"markPrice","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"value","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"LiquidatePosition","header":1034647345,"fields":[{"name":"seqno","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"markPrice","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"InternalOpenPosition","header":1211050099,"fields":[{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"token","type":{"kind":"simple","type":"address","optional":false}},{"name":"entryPrice","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"liquidationPrice","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"InternalClosePosition","header":1378645494,"fields":[{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"seqno","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"markPrice","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"InternalLiquidatePosition","header":2338772000,"fields":[{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"seqno","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"markPrice","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"Position","header":null,"fields":[{"name":"seqno","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"token","type":{"kind":"simple","type":"address","optional":false}},{"name":"entryPrice","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"liquidationPrice","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"status","type":{"kind":"simple","type":"string","optional":false}},{"name":"closePrice","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"Positions$Data","header":null,"fields":[{"name":"parent","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"numPositions","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"positions","type":{"kind":"dict","key":"int","value":"Position","valueFormat":"ref"}}]},
    {"name":"MysteryPrivate$Data","header":null,"fields":[{"name":"owners","type":{"kind":"dict","key":"address","value":"address"}}]},
]

const MysteryPrivate_getters: ABIGetter[] = [
    {"name":"positionsAddress","arguments":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":true}},
]

export const MysteryPrivate_getterMapping: { [key: string]: string } = {
    'positionsAddress': 'getPositionsAddress',
}

const MysteryPrivate_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"OpenPosition"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ClosePosition"}},
    {"receiver":"internal","message":{"kind":"typed","type":"LiquidatePosition"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class MysteryPrivate implements Contract {
    
    static async init() {
        return await MysteryPrivate_init();
    }
    
    static async fromInit() {
        const init = await MysteryPrivate_init();
        const address = contractAddress(0, init);
        return new MysteryPrivate(address, init);
    }
    
    static fromAddress(address: Address) {
        return new MysteryPrivate(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  MysteryPrivate_types,
        getters: MysteryPrivate_getters,
        receivers: MysteryPrivate_receivers,
        errors: MysteryPrivate_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: OpenPosition | ClosePosition | LiquidatePosition | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'OpenPosition') {
            body = beginCell().store(storeOpenPosition(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ClosePosition') {
            body = beginCell().store(storeClosePosition(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'LiquidatePosition') {
            body = beginCell().store(storeLiquidatePosition(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getPositionsAddress(provider: ContractProvider, owner: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(owner);
        let source = (await provider.get('positionsAddress', builder.build())).stack;
        let result = source.readAddressOpt();
        return result;
    }
    
}