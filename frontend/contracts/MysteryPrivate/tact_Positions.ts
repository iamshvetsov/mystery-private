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

 type Positions_init_args = {
    $$type: 'Positions_init_args';
    parent: Address;
    owner: Address;
}

function initPositions_init_args(src: Positions_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.parent);
        b_0.storeAddress(src.owner);
    };
}

async function Positions_init(parent: Address, owner: Address) {
    const __code = Cell.fromBase64('te6ccgECGQEABUUAART/APSkE/S88sgLAQIBYgIDA3rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVE9s88uCCFQQFAgEgEBEC7AGSMH/gcCHXScIflTAg1wsf3iCCEEgvKHO6jtgw0x8BghBILyhzuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6APoA+gBVQGwV4CAGBwCkyPhDAcx/AcoAVTBQQyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYSy//0AMntVAGYggDj0vhCUqDHBfL0J4FxJwbHBRXy9IFo7yKqAFJQuvL0BaSBAQGLRPcGVugiBQRIE1BmcMhVYNs8yVQjMCBulTBZ9FowlEEz9BXifw0D+oIQUix19rqOtjDTHwGCEFIsdfa68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHT//oAVSBsE+AgghCLZtQguuMCghCUapi2uo6n0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4DBwCAkKAvCCAOPS+EJSgMcF8vQlgXEnBMcFE/L0ggCfQ1MUu/L0IoEBASJZ9A1voZIwbd8gbpIwbY6H0Ns8bBdvB+IgbvLQgG8nMIF/oItE9wZW6FgB+QEB+QG68vSBAQGLVDbG9zZYUAjIVWDbPMkgbpUwWfRaMJRBM/QV4n8MDQFsMNMfAYIQi2bUILry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdP/+gBVIGwTCwE8bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zwwDgLmggDj0vhCUoDHBfL0JYFxJwTHBRPy9IIAn0NTFLvy9CKBAQEiWfQNb6GSMG3fIG6SMG2Oh9DbPGwXbwfiIG7y0IBvJ1sggW+CCLoX8vSBAQGLlMaXF1aWRhdGWFQXAchVYNs8ySBulTBZ9FowlEEz9BXifwwNAGDT//pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+gD6APoA1AHQAfoAVWAAblBny/9QBCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlj6AgH6AgH6AshYzxbJAcwB+gIByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsIDwCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAIRvti22ebZ42IMFRICASATFAACIAIRuuLNs82zxsQYFRYAEbgr7tRNDSAAGAHA7UTQ1AH4Y9IAAY5I+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdP/9ARVMGwU4Pgo1wsKgwm68uCJFwACIQGK+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEgLRAds8GAAEcG0=');
    const __system = Cell.fromBase64('te6cckECGwEABU8AAQHAAQEFofnVAgEU/wD0pBP0vPLICwMCAWIEEQN60AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VRPbPPLgghYFEALsAZIwf+BwIddJwh+VMCDXCx/eIIIQSC8oc7qO2DDTHwGCEEgvKHO68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfoA+gD6AFVAbBXgIAYHAZiCAOPS+EJSoMcF8vQngXEnBscFFfL0gWjvIqoAUlC68vQFpIEBAYtE9wZW6CIFBEgTUGZwyFVg2zzJVCMwIG6VMFn0WjCUQTP0FeJ/DAP6ghBSLHX2uo62MNMfAYIQUix19rry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdP/+gBVIGwT4CCCEItm1CC64wKCEJRqmLa6jqfTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gMHAICQ0C8IIA49L4QlKAxwXy9CWBcScExwUT8vSCAJ9DUxS78vQigQEBIln0DW+hkjBt3yBukjBtjofQ2zxsF28H4iBu8tCAbycwgX+gi0T3BlboWAH5AQH5Abry9IEBAYtUNsb3NlhQCMhVYNs8ySBulTBZ9FowlEEz9BXifwsMAWww0x8BghCLZtQguvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0//6AFUgbBMKAuaCAOPS+EJSgMcF8vQlgXEnBMcFE/L0ggCfQ1MUu/L0IoEBASJZ9A1voZIwbd8gbpIwbY6H0Ns8bBdvB+IgbvLQgG8nWyCBb4IIuhfy9IEBAYuUxpcXVpZGF0ZYVBcByFVg2zzJIG6VMFn0WjCUQTP0FeJ/CwwAYNP/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6APoA+gDUAdAB+gBVYABuUGfL/1AEINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WWPoCAfoCAfoCyFjPFskBzAH6AgE8bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zwwDgHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wgPAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAKTI+EMBzH8BygBVMFBDINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhLL//QAye1UAgEgEhQCEb7Yttnm2eNiDBYTAAIgAgEgFRoCEbrizbPNs8bEGBYZAcDtRNDUAfhj0gABjkj6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0//0BFUwbBTg+CjXCwqDCbry4IkXAYr6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSAtEB2zwYAARwbQACIQARuCvu1E0NIAAYC1+EVQ==');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initPositions_init_args({ $$type: 'Positions_init_args', parent, owner })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Positions_errors: { [key: number]: { message: string } } = {
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

const Positions_types: ABIType[] = [
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

const Positions_getters: ABIGetter[] = [
    {"name":"numPositions","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"positions","arguments":[],"returnType":{"kind":"dict","key":"int","value":"Position","valueFormat":"ref"}},
]

export const Positions_getterMapping: { [key: string]: string } = {
    'numPositions': 'getNumPositions',
    'positions': 'getPositions',
}

const Positions_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"InternalOpenPosition"}},
    {"receiver":"internal","message":{"kind":"typed","type":"InternalClosePosition"}},
    {"receiver":"internal","message":{"kind":"typed","type":"InternalLiquidatePosition"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class Positions implements Contract {
    
    static async init(parent: Address, owner: Address) {
        return await Positions_init(parent, owner);
    }
    
    static async fromInit(parent: Address, owner: Address) {
        const init = await Positions_init(parent, owner);
        const address = contractAddress(0, init);
        return new Positions(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Positions(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Positions_types,
        getters: Positions_getters,
        receivers: Positions_receivers,
        errors: Positions_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: InternalOpenPosition | InternalClosePosition | InternalLiquidatePosition | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'InternalOpenPosition') {
            body = beginCell().store(storeInternalOpenPosition(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'InternalClosePosition') {
            body = beginCell().store(storeInternalClosePosition(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'InternalLiquidatePosition') {
            body = beginCell().store(storeInternalLiquidatePosition(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getNumPositions(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('numPositions', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getPositions(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('positions', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserPosition(), source.readCellOpt());
        return result;
    }
    
}