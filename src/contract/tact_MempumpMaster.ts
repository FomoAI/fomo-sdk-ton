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

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadGetterTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadGetterTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type TokenTransfer = {
    $$type: 'TokenTransfer';
    queryId: bigint;
    amount: bigint;
    destination: Address;
    response_destination: Address;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Cell | null;
}

export function storeTokenTransfer(src: TokenTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_ton_amount);
        if (src.forward_payload !== null && src.forward_payload !== undefined) { b_0.storeBit(true).storeRef(src.forward_payload); } else { b_0.storeBit(false); }
    };
}

export function loadTokenTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _destination = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'TokenTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleTokenTransfer(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCellOpt();
    return { $$type: 'TokenTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadGetterTupleTokenTransfer(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCellOpt();
    return { $$type: 'TokenTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleTokenTransfer(source: TokenTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeCell(source.forward_payload);
    return builder.build();
}

function dictValueParserTokenTransfer(): DictionaryValue<TokenTransfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadTokenTransfer(src.loadRef().beginParse());
        }
    }
}

export type TokenTransferInternal = {
    $$type: 'TokenTransferInternal';
    queryId: bigint;
    amount: bigint;
    from: Address;
    response_destination: Address;
    forward_ton_amount: bigint;
    forward_payload: Cell | null;
}

export function storeTokenTransferInternal(src: TokenTransferInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(395134233, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeAddress(src.response_destination);
        b_0.storeCoins(src.forward_ton_amount);
        if (src.forward_payload !== null && src.forward_payload !== undefined) { b_0.storeBit(true).storeRef(src.forward_payload); } else { b_0.storeBit(false); }
    };
}

export function loadTokenTransferInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 395134233) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'TokenTransferInternal' as const, queryId: _queryId, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleTokenTransferInternal(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _response_destination = source.readAddress();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCellOpt();
    return { $$type: 'TokenTransferInternal' as const, queryId: _queryId, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadGetterTupleTokenTransferInternal(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _response_destination = source.readAddress();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCellOpt();
    return { $$type: 'TokenTransferInternal' as const, queryId: _queryId, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleTokenTransferInternal(source: TokenTransferInternal) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeAddress(source.response_destination);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeCell(source.forward_payload);
    return builder.build();
}

function dictValueParserTokenTransferInternal(): DictionaryValue<TokenTransferInternal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenTransferInternal(src)).endCell());
        },
        parse: (src) => {
            return loadTokenTransferInternal(src.loadRef().beginParse());
        }
    }
}

export type TokenNotification = {
    $$type: 'TokenNotification';
    queryId: bigint;
    amount: bigint;
    from: Address;
    forward_payload: Cell | null;
}

export function storeTokenNotification(src: TokenNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        if (src.forward_payload !== null && src.forward_payload !== undefined) { b_0.storeBit(true).storeRef(src.forward_payload); } else { b_0.storeBit(false); }
    };
}

export function loadTokenNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _forward_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'TokenNotification' as const, queryId: _queryId, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function loadTupleTokenNotification(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _forward_payload = source.readCellOpt();
    return { $$type: 'TokenNotification' as const, queryId: _queryId, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function loadGetterTupleTokenNotification(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _forward_payload = source.readCellOpt();
    return { $$type: 'TokenNotification' as const, queryId: _queryId, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function storeTupleTokenNotification(source: TokenNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeCell(source.forward_payload);
    return builder.build();
}

function dictValueParserTokenNotification(): DictionaryValue<TokenNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenNotification(src)).endCell());
        },
        parse: (src) => {
            return loadTokenNotification(src.loadRef().beginParse());
        }
    }
}

export type TokenBurn = {
    $$type: 'TokenBurn';
    queryId: bigint;
    amount: bigint;
    owner: Address;
    response_destination: Address;
}

export function storeTokenBurn(src: TokenBurn) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1499400124, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.response_destination);
    };
}

export function loadTokenBurn(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1499400124) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _owner = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    return { $$type: 'TokenBurn' as const, queryId: _queryId, amount: _amount, owner: _owner, response_destination: _response_destination };
}

function loadTupleTokenBurn(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _owner = source.readAddress();
    let _response_destination = source.readAddress();
    return { $$type: 'TokenBurn' as const, queryId: _queryId, amount: _amount, owner: _owner, response_destination: _response_destination };
}

function loadGetterTupleTokenBurn(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _owner = source.readAddress();
    let _response_destination = source.readAddress();
    return { $$type: 'TokenBurn' as const, queryId: _queryId, amount: _amount, owner: _owner, response_destination: _response_destination };
}

function storeTupleTokenBurn(source: TokenBurn) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.response_destination);
    return builder.build();
}

function dictValueParserTokenBurn(): DictionaryValue<TokenBurn> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenBurn(src)).endCell());
        },
        parse: (src) => {
            return loadTokenBurn(src.loadRef().beginParse());
        }
    }
}

export type TokenBurnNotification = {
    $$type: 'TokenBurnNotification';
    queryId: bigint;
    amount: bigint;
    owner: Address;
    response_destination: Address | null;
}

export function storeTokenBurnNotification(src: TokenBurnNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2078119902, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.response_destination);
    };
}

export function loadTokenBurnNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2078119902) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _owner = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    return { $$type: 'TokenBurnNotification' as const, queryId: _queryId, amount: _amount, owner: _owner, response_destination: _response_destination };
}

function loadTupleTokenBurnNotification(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _owner = source.readAddress();
    let _response_destination = source.readAddressOpt();
    return { $$type: 'TokenBurnNotification' as const, queryId: _queryId, amount: _amount, owner: _owner, response_destination: _response_destination };
}

function loadGetterTupleTokenBurnNotification(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _owner = source.readAddress();
    let _response_destination = source.readAddressOpt();
    return { $$type: 'TokenBurnNotification' as const, queryId: _queryId, amount: _amount, owner: _owner, response_destination: _response_destination };
}

function storeTupleTokenBurnNotification(source: TokenBurnNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.response_destination);
    return builder.build();
}

function dictValueParserTokenBurnNotification(): DictionaryValue<TokenBurnNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenBurnNotification(src)).endCell());
        },
        parse: (src) => {
            return loadTokenBurnNotification(src.loadRef().beginParse());
        }
    }
}

export type TokenExcesses = {
    $$type: 'TokenExcesses';
    queryId: bigint;
}

export function storeTokenExcesses(src: TokenExcesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadTokenExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'TokenExcesses' as const, queryId: _queryId };
}

function loadTupleTokenExcesses(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'TokenExcesses' as const, queryId: _queryId };
}

function loadGetterTupleTokenExcesses(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'TokenExcesses' as const, queryId: _queryId };
}

function storeTupleTokenExcesses(source: TokenExcesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserTokenExcesses(): DictionaryValue<TokenExcesses> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadTokenExcesses(src.loadRef().beginParse());
        }
    }
}

export type TokenUpdateContent = {
    $$type: 'TokenUpdateContent';
    content: Cell;
}

export function storeTokenUpdateContent(src: TokenUpdateContent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2937889386, 32);
        b_0.storeRef(src.content);
    };
}

export function loadTokenUpdateContent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2937889386) { throw Error('Invalid prefix'); }
    let _content = sc_0.loadRef();
    return { $$type: 'TokenUpdateContent' as const, content: _content };
}

function loadTupleTokenUpdateContent(source: TupleReader) {
    let _content = source.readCell();
    return { $$type: 'TokenUpdateContent' as const, content: _content };
}

function loadGetterTupleTokenUpdateContent(source: TupleReader) {
    let _content = source.readCell();
    return { $$type: 'TokenUpdateContent' as const, content: _content };
}

function storeTupleTokenUpdateContent(source: TokenUpdateContent) {
    let builder = new TupleBuilder();
    builder.writeCell(source.content);
    return builder.build();
}

function dictValueParserTokenUpdateContent(): DictionaryValue<TokenUpdateContent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenUpdateContent(src)).endCell());
        },
        parse: (src) => {
            return loadTokenUpdateContent(src.loadRef().beginParse());
        }
    }
}

export type CollectCommission = {
    $$type: 'CollectCommission';
}

export function storeCollectCommission(src: CollectCommission) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(594127348, 32);
    };
}

export function loadCollectCommission(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 594127348) { throw Error('Invalid prefix'); }
    return { $$type: 'CollectCommission' as const };
}

function loadTupleCollectCommission(source: TupleReader) {
    return { $$type: 'CollectCommission' as const };
}

function loadGetterTupleCollectCommission(source: TupleReader) {
    return { $$type: 'CollectCommission' as const };
}

function storeTupleCollectCommission(source: CollectCommission) {
    let builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserCollectCommission(): DictionaryValue<CollectCommission> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCollectCommission(src)).endCell());
        },
        parse: (src) => {
            return loadCollectCommission(src.loadRef().beginParse());
        }
    }
}

export type ProvideWalletAddress = {
    $$type: 'ProvideWalletAddress';
    queryId: bigint;
    owner: Address;
    includeAddress: boolean;
}

export function storeProvideWalletAddress(src: ProvideWalletAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(745978227, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.owner);
        b_0.storeBit(src.includeAddress);
    };
}

export function loadProvideWalletAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 745978227) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _owner = sc_0.loadAddress();
    let _includeAddress = sc_0.loadBit();
    return { $$type: 'ProvideWalletAddress' as const, queryId: _queryId, owner: _owner, includeAddress: _includeAddress };
}

function loadTupleProvideWalletAddress(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _owner = source.readAddress();
    let _includeAddress = source.readBoolean();
    return { $$type: 'ProvideWalletAddress' as const, queryId: _queryId, owner: _owner, includeAddress: _includeAddress };
}

function loadGetterTupleProvideWalletAddress(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _owner = source.readAddress();
    let _includeAddress = source.readBoolean();
    return { $$type: 'ProvideWalletAddress' as const, queryId: _queryId, owner: _owner, includeAddress: _includeAddress };
}

function storeTupleProvideWalletAddress(source: ProvideWalletAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.owner);
    builder.writeBoolean(source.includeAddress);
    return builder.build();
}

function dictValueParserProvideWalletAddress(): DictionaryValue<ProvideWalletAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeProvideWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadProvideWalletAddress(src.loadRef().beginParse());
        }
    }
}

export type TakeWalletAddress = {
    $$type: 'TakeWalletAddress';
    queryId: bigint;
    walletAddress: Address;
    ownerAddress: Slice;
}

export function storeTakeWalletAddress(src: TakeWalletAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3513996288, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.walletAddress);
        b_0.storeBuilder(src.ownerAddress.asBuilder());
    };
}

export function loadTakeWalletAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3513996288) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _walletAddress = sc_0.loadAddress();
    let _ownerAddress = sc_0;
    return { $$type: 'TakeWalletAddress' as const, queryId: _queryId, walletAddress: _walletAddress, ownerAddress: _ownerAddress };
}

function loadTupleTakeWalletAddress(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _walletAddress = source.readAddress();
    let _ownerAddress = source.readCell().asSlice();
    return { $$type: 'TakeWalletAddress' as const, queryId: _queryId, walletAddress: _walletAddress, ownerAddress: _ownerAddress };
}

function loadGetterTupleTakeWalletAddress(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _walletAddress = source.readAddress();
    let _ownerAddress = source.readCell().asSlice();
    return { $$type: 'TakeWalletAddress' as const, queryId: _queryId, walletAddress: _walletAddress, ownerAddress: _ownerAddress };
}

function storeTupleTakeWalletAddress(source: TakeWalletAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.walletAddress);
    builder.writeSlice(source.ownerAddress.asCell());
    return builder.build();
}

function dictValueParserTakeWalletAddress(): DictionaryValue<TakeWalletAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTakeWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadTakeWalletAddress(src.loadRef().beginParse());
        }
    }
}

export type MintAnother = {
    $$type: 'MintAnother';
    queryId: bigint;
    address: Address;
    amount: bigint;
    message: Cell;
}

export function storeMintAnother(src: MintAnother) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(21, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.address);
        b_0.storeCoins(src.amount);
        b_0.storeRef(src.message);
    };
}

export function loadMintAnother(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 21) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _address = sc_0.loadAddress();
    let _amount = sc_0.loadCoins();
    let _message = sc_0.loadRef();
    return { $$type: 'MintAnother' as const, queryId: _queryId, address: _address, amount: _amount, message: _message };
}

function loadTupleMintAnother(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _address = source.readAddress();
    let _amount = source.readBigNumber();
    let _message = source.readCell();
    return { $$type: 'MintAnother' as const, queryId: _queryId, address: _address, amount: _amount, message: _message };
}

function loadGetterTupleMintAnother(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _address = source.readAddress();
    let _amount = source.readBigNumber();
    let _message = source.readCell();
    return { $$type: 'MintAnother' as const, queryId: _queryId, address: _address, amount: _amount, message: _message };
}

function storeTupleMintAnother(source: MintAnother) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.address);
    builder.writeNumber(source.amount);
    builder.writeCell(source.message);
    return builder.build();
}

function dictValueParserMintAnother(): DictionaryValue<MintAnother> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMintAnother(src)).endCell());
        },
        parse: (src) => {
            return loadMintAnother(src.loadRef().beginParse());
        }
    }
}

export type ChangeJettonOwner = {
    $$type: 'ChangeJettonOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeJettonOwner(src: ChangeJettonOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeJettonOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeJettonOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeJettonOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeJettonOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadGetterTupleChangeJettonOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeJettonOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeJettonOwner(source: ChangeJettonOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeJettonOwner(): DictionaryValue<ChangeJettonOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeJettonOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeJettonOwner(src.loadRef().beginParse());
        }
    }
}

export type CurveParams = {
    $$type: 'CurveParams';
    mathScale: bigint;
    coinScale: bigint;
    virtualTON: bigint;
    virtualJetton: bigint;
    maxSupply: bigint;
    curveJettonStock: bigint;
    curveJettonSold: bigint;
    maxTonAmount: bigint;
    dexFeeAmount: bigint;
    airdropAmount: bigint;
    airdropMinted: bigint;
}

export function storeCurveParams(src: CurveParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.mathScale, 256);
        b_0.storeUint(src.coinScale, 256);
        b_0.storeUint(src.virtualTON, 256);
        let b_1 = new Builder();
        b_1.storeUint(src.virtualJetton, 256);
        b_1.storeCoins(src.maxSupply);
        b_1.storeCoins(src.curveJettonStock);
        b_1.storeCoins(src.curveJettonSold);
        b_1.storeCoins(src.maxTonAmount);
        b_1.storeCoins(src.dexFeeAmount);
        b_1.storeCoins(src.airdropAmount);
        let b_2 = new Builder();
        b_2.storeCoins(src.airdropMinted);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadCurveParams(slice: Slice) {
    let sc_0 = slice;
    let _mathScale = sc_0.loadUintBig(256);
    let _coinScale = sc_0.loadUintBig(256);
    let _virtualTON = sc_0.loadUintBig(256);
    let sc_1 = sc_0.loadRef().beginParse();
    let _virtualJetton = sc_1.loadUintBig(256);
    let _maxSupply = sc_1.loadCoins();
    let _curveJettonStock = sc_1.loadCoins();
    let _curveJettonSold = sc_1.loadCoins();
    let _maxTonAmount = sc_1.loadCoins();
    let _dexFeeAmount = sc_1.loadCoins();
    let _airdropAmount = sc_1.loadCoins();
    let sc_2 = sc_1.loadRef().beginParse();
    let _airdropMinted = sc_2.loadCoins();
    return { $$type: 'CurveParams' as const, mathScale: _mathScale, coinScale: _coinScale, virtualTON: _virtualTON, virtualJetton: _virtualJetton, maxSupply: _maxSupply, curveJettonStock: _curveJettonStock, curveJettonSold: _curveJettonSold, maxTonAmount: _maxTonAmount, dexFeeAmount: _dexFeeAmount, airdropAmount: _airdropAmount, airdropMinted: _airdropMinted };
}

function loadTupleCurveParams(source: TupleReader) {
    let _mathScale = source.readBigNumber();
    let _coinScale = source.readBigNumber();
    let _virtualTON = source.readBigNumber();
    let _virtualJetton = source.readBigNumber();
    let _maxSupply = source.readBigNumber();
    let _curveJettonStock = source.readBigNumber();
    let _curveJettonSold = source.readBigNumber();
    let _maxTonAmount = source.readBigNumber();
    let _dexFeeAmount = source.readBigNumber();
    let _airdropAmount = source.readBigNumber();
    let _airdropMinted = source.readBigNumber();
    return { $$type: 'CurveParams' as const, mathScale: _mathScale, coinScale: _coinScale, virtualTON: _virtualTON, virtualJetton: _virtualJetton, maxSupply: _maxSupply, curveJettonStock: _curveJettonStock, curveJettonSold: _curveJettonSold, maxTonAmount: _maxTonAmount, dexFeeAmount: _dexFeeAmount, airdropAmount: _airdropAmount, airdropMinted: _airdropMinted };
}

function loadGetterTupleCurveParams(source: TupleReader) {
    let _mathScale = source.readBigNumber();
    let _coinScale = source.readBigNumber();
    let _virtualTON = source.readBigNumber();
    let _virtualJetton = source.readBigNumber();
    let _maxSupply = source.readBigNumber();
    let _curveJettonStock = source.readBigNumber();
    let _curveJettonSold = source.readBigNumber();
    let _maxTonAmount = source.readBigNumber();
    let _dexFeeAmount = source.readBigNumber();
    let _airdropAmount = source.readBigNumber();
    let _airdropMinted = source.readBigNumber();
    return { $$type: 'CurveParams' as const, mathScale: _mathScale, coinScale: _coinScale, virtualTON: _virtualTON, virtualJetton: _virtualJetton, maxSupply: _maxSupply, curveJettonStock: _curveJettonStock, curveJettonSold: _curveJettonSold, maxTonAmount: _maxTonAmount, dexFeeAmount: _dexFeeAmount, airdropAmount: _airdropAmount, airdropMinted: _airdropMinted };
}

function storeTupleCurveParams(source: CurveParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.mathScale);
    builder.writeNumber(source.coinScale);
    builder.writeNumber(source.virtualTON);
    builder.writeNumber(source.virtualJetton);
    builder.writeNumber(source.maxSupply);
    builder.writeNumber(source.curveJettonStock);
    builder.writeNumber(source.curveJettonSold);
    builder.writeNumber(source.maxTonAmount);
    builder.writeNumber(source.dexFeeAmount);
    builder.writeNumber(source.airdropAmount);
    builder.writeNumber(source.airdropMinted);
    return builder.build();
}

function dictValueParserCurveParams(): DictionaryValue<CurveParams> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCurveParams(src)).endCell());
        },
        parse: (src) => {
            return loadCurveParams(src.loadRef().beginParse());
        }
    }
}

export type BondingCurveBuyReturn = {
    $$type: 'BondingCurveBuyReturn';
    jettonAmount: bigint;
    remainingTonAmount: bigint;
    isBondingCurveFull: boolean;
}

export function storeBondingCurveBuyReturn(src: BondingCurveBuyReturn) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.jettonAmount);
        b_0.storeCoins(src.remainingTonAmount);
        b_0.storeBit(src.isBondingCurveFull);
    };
}

export function loadBondingCurveBuyReturn(slice: Slice) {
    let sc_0 = slice;
    let _jettonAmount = sc_0.loadCoins();
    let _remainingTonAmount = sc_0.loadCoins();
    let _isBondingCurveFull = sc_0.loadBit();
    return { $$type: 'BondingCurveBuyReturn' as const, jettonAmount: _jettonAmount, remainingTonAmount: _remainingTonAmount, isBondingCurveFull: _isBondingCurveFull };
}

function loadTupleBondingCurveBuyReturn(source: TupleReader) {
    let _jettonAmount = source.readBigNumber();
    let _remainingTonAmount = source.readBigNumber();
    let _isBondingCurveFull = source.readBoolean();
    return { $$type: 'BondingCurveBuyReturn' as const, jettonAmount: _jettonAmount, remainingTonAmount: _remainingTonAmount, isBondingCurveFull: _isBondingCurveFull };
}

function loadGetterTupleBondingCurveBuyReturn(source: TupleReader) {
    let _jettonAmount = source.readBigNumber();
    let _remainingTonAmount = source.readBigNumber();
    let _isBondingCurveFull = source.readBoolean();
    return { $$type: 'BondingCurveBuyReturn' as const, jettonAmount: _jettonAmount, remainingTonAmount: _remainingTonAmount, isBondingCurveFull: _isBondingCurveFull };
}

function storeTupleBondingCurveBuyReturn(source: BondingCurveBuyReturn) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.jettonAmount);
    builder.writeNumber(source.remainingTonAmount);
    builder.writeBoolean(source.isBondingCurveFull);
    return builder.build();
}

function dictValueParserBondingCurveBuyReturn(): DictionaryValue<BondingCurveBuyReturn> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBondingCurveBuyReturn(src)).endCell());
        },
        parse: (src) => {
            return loadBondingCurveBuyReturn(src.loadRef().beginParse());
        }
    }
}

export type VirtualReserves = {
    $$type: 'VirtualReserves';
    virtualTonReserve: bigint;
    virtualJettonReserve: bigint;
}

export function storeVirtualReserves(src: VirtualReserves) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.virtualTonReserve);
        b_0.storeCoins(src.virtualJettonReserve);
    };
}

export function loadVirtualReserves(slice: Slice) {
    let sc_0 = slice;
    let _virtualTonReserve = sc_0.loadCoins();
    let _virtualJettonReserve = sc_0.loadCoins();
    return { $$type: 'VirtualReserves' as const, virtualTonReserve: _virtualTonReserve, virtualJettonReserve: _virtualJettonReserve };
}

function loadTupleVirtualReserves(source: TupleReader) {
    let _virtualTonReserve = source.readBigNumber();
    let _virtualJettonReserve = source.readBigNumber();
    return { $$type: 'VirtualReserves' as const, virtualTonReserve: _virtualTonReserve, virtualJettonReserve: _virtualJettonReserve };
}

function loadGetterTupleVirtualReserves(source: TupleReader) {
    let _virtualTonReserve = source.readBigNumber();
    let _virtualJettonReserve = source.readBigNumber();
    return { $$type: 'VirtualReserves' as const, virtualTonReserve: _virtualTonReserve, virtualJettonReserve: _virtualJettonReserve };
}

function storeTupleVirtualReserves(source: VirtualReserves) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.virtualTonReserve);
    builder.writeNumber(source.virtualJettonReserve);
    return builder.build();
}

function dictValueParserVirtualReserves(): DictionaryValue<VirtualReserves> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVirtualReserves(src)).endCell());
        },
        parse: (src) => {
            return loadVirtualReserves(src.loadRef().beginParse());
        }
    }
}

export type DeployEvent = {
    $$type: 'DeployEvent';
    from: Address;
}

export function storeDeployEvent(src: DeployEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(964548351, 32);
        b_0.storeAddress(src.from);
    };
}

export function loadDeployEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 964548351) { throw Error('Invalid prefix'); }
    let _from = sc_0.loadAddress();
    return { $$type: 'DeployEvent' as const, from: _from };
}

function loadTupleDeployEvent(source: TupleReader) {
    let _from = source.readAddress();
    return { $$type: 'DeployEvent' as const, from: _from };
}

function loadGetterTupleDeployEvent(source: TupleReader) {
    let _from = source.readAddress();
    return { $$type: 'DeployEvent' as const, from: _from };
}

function storeTupleDeployEvent(source: DeployEvent) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.from);
    return builder.build();
}

function dictValueParserDeployEvent(): DictionaryValue<DeployEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployEvent(src)).endCell());
        },
        parse: (src) => {
            return loadDeployEvent(src.loadRef().beginParse());
        }
    }
}

export type DeployAndBuyEvent = {
    $$type: 'DeployAndBuyEvent';
    from: Address;
    inputTonAmount: bigint;
    tonAmount: bigint;
    jettonAmount: bigint;
    feeTonAmount: bigint;
    bondingCurveOverflow: boolean;
}

export function storeDeployAndBuyEvent(src: DeployAndBuyEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2776048961, 32);
        b_0.storeAddress(src.from);
        b_0.storeCoins(src.inputTonAmount);
        b_0.storeCoins(src.tonAmount);
        b_0.storeCoins(src.jettonAmount);
        b_0.storeCoins(src.feeTonAmount);
        b_0.storeBit(src.bondingCurveOverflow);
    };
}

export function loadDeployAndBuyEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2776048961) { throw Error('Invalid prefix'); }
    let _from = sc_0.loadAddress();
    let _inputTonAmount = sc_0.loadCoins();
    let _tonAmount = sc_0.loadCoins();
    let _jettonAmount = sc_0.loadCoins();
    let _feeTonAmount = sc_0.loadCoins();
    let _bondingCurveOverflow = sc_0.loadBit();
    return { $$type: 'DeployAndBuyEvent' as const, from: _from, inputTonAmount: _inputTonAmount, tonAmount: _tonAmount, jettonAmount: _jettonAmount, feeTonAmount: _feeTonAmount, bondingCurveOverflow: _bondingCurveOverflow };
}

function loadTupleDeployAndBuyEvent(source: TupleReader) {
    let _from = source.readAddress();
    let _inputTonAmount = source.readBigNumber();
    let _tonAmount = source.readBigNumber();
    let _jettonAmount = source.readBigNumber();
    let _feeTonAmount = source.readBigNumber();
    let _bondingCurveOverflow = source.readBoolean();
    return { $$type: 'DeployAndBuyEvent' as const, from: _from, inputTonAmount: _inputTonAmount, tonAmount: _tonAmount, jettonAmount: _jettonAmount, feeTonAmount: _feeTonAmount, bondingCurveOverflow: _bondingCurveOverflow };
}

function loadGetterTupleDeployAndBuyEvent(source: TupleReader) {
    let _from = source.readAddress();
    let _inputTonAmount = source.readBigNumber();
    let _tonAmount = source.readBigNumber();
    let _jettonAmount = source.readBigNumber();
    let _feeTonAmount = source.readBigNumber();
    let _bondingCurveOverflow = source.readBoolean();
    return { $$type: 'DeployAndBuyEvent' as const, from: _from, inputTonAmount: _inputTonAmount, tonAmount: _tonAmount, jettonAmount: _jettonAmount, feeTonAmount: _feeTonAmount, bondingCurveOverflow: _bondingCurveOverflow };
}

function storeTupleDeployAndBuyEvent(source: DeployAndBuyEvent) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.from);
    builder.writeNumber(source.inputTonAmount);
    builder.writeNumber(source.tonAmount);
    builder.writeNumber(source.jettonAmount);
    builder.writeNumber(source.feeTonAmount);
    builder.writeBoolean(source.bondingCurveOverflow);
    return builder.build();
}

function dictValueParserDeployAndBuyEvent(): DictionaryValue<DeployAndBuyEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployAndBuyEvent(src)).endCell());
        },
        parse: (src) => {
            return loadDeployAndBuyEvent(src.loadRef().beginParse());
        }
    }
}

export type BuyEvent = {
    $$type: 'BuyEvent';
    from: Address;
    inputTonAmount: bigint;
    tonAmount: bigint;
    jettonAmount: bigint;
    feeTonAmount: bigint;
    bondingCurveOverflow: boolean;
}

export function storeBuyEvent(src: BuyEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2216914818, 32);
        b_0.storeAddress(src.from);
        b_0.storeCoins(src.inputTonAmount);
        b_0.storeCoins(src.tonAmount);
        b_0.storeCoins(src.jettonAmount);
        b_0.storeCoins(src.feeTonAmount);
        b_0.storeBit(src.bondingCurveOverflow);
    };
}

export function loadBuyEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2216914818) { throw Error('Invalid prefix'); }
    let _from = sc_0.loadAddress();
    let _inputTonAmount = sc_0.loadCoins();
    let _tonAmount = sc_0.loadCoins();
    let _jettonAmount = sc_0.loadCoins();
    let _feeTonAmount = sc_0.loadCoins();
    let _bondingCurveOverflow = sc_0.loadBit();
    return { $$type: 'BuyEvent' as const, from: _from, inputTonAmount: _inputTonAmount, tonAmount: _tonAmount, jettonAmount: _jettonAmount, feeTonAmount: _feeTonAmount, bondingCurveOverflow: _bondingCurveOverflow };
}

function loadTupleBuyEvent(source: TupleReader) {
    let _from = source.readAddress();
    let _inputTonAmount = source.readBigNumber();
    let _tonAmount = source.readBigNumber();
    let _jettonAmount = source.readBigNumber();
    let _feeTonAmount = source.readBigNumber();
    let _bondingCurveOverflow = source.readBoolean();
    return { $$type: 'BuyEvent' as const, from: _from, inputTonAmount: _inputTonAmount, tonAmount: _tonAmount, jettonAmount: _jettonAmount, feeTonAmount: _feeTonAmount, bondingCurveOverflow: _bondingCurveOverflow };
}

function loadGetterTupleBuyEvent(source: TupleReader) {
    let _from = source.readAddress();
    let _inputTonAmount = source.readBigNumber();
    let _tonAmount = source.readBigNumber();
    let _jettonAmount = source.readBigNumber();
    let _feeTonAmount = source.readBigNumber();
    let _bondingCurveOverflow = source.readBoolean();
    return { $$type: 'BuyEvent' as const, from: _from, inputTonAmount: _inputTonAmount, tonAmount: _tonAmount, jettonAmount: _jettonAmount, feeTonAmount: _feeTonAmount, bondingCurveOverflow: _bondingCurveOverflow };
}

function storeTupleBuyEvent(source: BuyEvent) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.from);
    builder.writeNumber(source.inputTonAmount);
    builder.writeNumber(source.tonAmount);
    builder.writeNumber(source.jettonAmount);
    builder.writeNumber(source.feeTonAmount);
    builder.writeBoolean(source.bondingCurveOverflow);
    return builder.build();
}

function dictValueParserBuyEvent(): DictionaryValue<BuyEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBuyEvent(src)).endCell());
        },
        parse: (src) => {
            return loadBuyEvent(src.loadRef().beginParse());
        }
    }
}

export type SellEvent = {
    $$type: 'SellEvent';
    from: Address;
    tonAmount: bigint;
    jettonAmount: bigint;
    feeTonAmount: bigint;
}

export function storeSellEvent(src: SellEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1787886933, 32);
        b_0.storeAddress(src.from);
        b_0.storeCoins(src.tonAmount);
        b_0.storeCoins(src.jettonAmount);
        b_0.storeCoins(src.feeTonAmount);
    };
}

export function loadSellEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1787886933) { throw Error('Invalid prefix'); }
    let _from = sc_0.loadAddress();
    let _tonAmount = sc_0.loadCoins();
    let _jettonAmount = sc_0.loadCoins();
    let _feeTonAmount = sc_0.loadCoins();
    return { $$type: 'SellEvent' as const, from: _from, tonAmount: _tonAmount, jettonAmount: _jettonAmount, feeTonAmount: _feeTonAmount };
}

function loadTupleSellEvent(source: TupleReader) {
    let _from = source.readAddress();
    let _tonAmount = source.readBigNumber();
    let _jettonAmount = source.readBigNumber();
    let _feeTonAmount = source.readBigNumber();
    return { $$type: 'SellEvent' as const, from: _from, tonAmount: _tonAmount, jettonAmount: _jettonAmount, feeTonAmount: _feeTonAmount };
}

function loadGetterTupleSellEvent(source: TupleReader) {
    let _from = source.readAddress();
    let _tonAmount = source.readBigNumber();
    let _jettonAmount = source.readBigNumber();
    let _feeTonAmount = source.readBigNumber();
    return { $$type: 'SellEvent' as const, from: _from, tonAmount: _tonAmount, jettonAmount: _jettonAmount, feeTonAmount: _feeTonAmount };
}

function storeTupleSellEvent(source: SellEvent) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.from);
    builder.writeNumber(source.tonAmount);
    builder.writeNumber(source.jettonAmount);
    builder.writeNumber(source.feeTonAmount);
    return builder.build();
}

function dictValueParserSellEvent(): DictionaryValue<SellEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSellEvent(src)).endCell());
        },
        parse: (src) => {
            return loadSellEvent(src.loadRef().beginParse());
        }
    }
}

export type UnwrapEvent = {
    $$type: 'UnwrapEvent';
    from: Address;
    jettonAmount: bigint;
}

export function storeUnwrapEvent(src: UnwrapEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(758454395, 32);
        b_0.storeAddress(src.from);
        b_0.storeCoins(src.jettonAmount);
    };
}

export function loadUnwrapEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 758454395) { throw Error('Invalid prefix'); }
    let _from = sc_0.loadAddress();
    let _jettonAmount = sc_0.loadCoins();
    return { $$type: 'UnwrapEvent' as const, from: _from, jettonAmount: _jettonAmount };
}

function loadTupleUnwrapEvent(source: TupleReader) {
    let _from = source.readAddress();
    let _jettonAmount = source.readBigNumber();
    return { $$type: 'UnwrapEvent' as const, from: _from, jettonAmount: _jettonAmount };
}

function loadGetterTupleUnwrapEvent(source: TupleReader) {
    let _from = source.readAddress();
    let _jettonAmount = source.readBigNumber();
    return { $$type: 'UnwrapEvent' as const, from: _from, jettonAmount: _jettonAmount };
}

function storeTupleUnwrapEvent(source: UnwrapEvent) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.from);
    builder.writeNumber(source.jettonAmount);
    return builder.build();
}

function dictValueParserUnwrapEvent(): DictionaryValue<UnwrapEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUnwrapEvent(src)).endCell());
        },
        parse: (src) => {
            return loadUnwrapEvent(src.loadRef().beginParse());
        }
    }
}

export type DepositLiquidityEvent = {
    $$type: 'DepositLiquidityEvent';
    tonAmount: bigint;
    jettonAmount: bigint;
    feeTonAmount: bigint;
}

export function storeDepositLiquidityEvent(src: DepositLiquidityEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3903820933, 32);
        b_0.storeCoins(src.tonAmount);
        b_0.storeCoins(src.jettonAmount);
        b_0.storeCoins(src.feeTonAmount);
    };
}

export function loadDepositLiquidityEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3903820933) { throw Error('Invalid prefix'); }
    let _tonAmount = sc_0.loadCoins();
    let _jettonAmount = sc_0.loadCoins();
    let _feeTonAmount = sc_0.loadCoins();
    return { $$type: 'DepositLiquidityEvent' as const, tonAmount: _tonAmount, jettonAmount: _jettonAmount, feeTonAmount: _feeTonAmount };
}

function loadTupleDepositLiquidityEvent(source: TupleReader) {
    let _tonAmount = source.readBigNumber();
    let _jettonAmount = source.readBigNumber();
    let _feeTonAmount = source.readBigNumber();
    return { $$type: 'DepositLiquidityEvent' as const, tonAmount: _tonAmount, jettonAmount: _jettonAmount, feeTonAmount: _feeTonAmount };
}

function loadGetterTupleDepositLiquidityEvent(source: TupleReader) {
    let _tonAmount = source.readBigNumber();
    let _jettonAmount = source.readBigNumber();
    let _feeTonAmount = source.readBigNumber();
    return { $$type: 'DepositLiquidityEvent' as const, tonAmount: _tonAmount, jettonAmount: _jettonAmount, feeTonAmount: _feeTonAmount };
}

function storeTupleDepositLiquidityEvent(source: DepositLiquidityEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tonAmount);
    builder.writeNumber(source.jettonAmount);
    builder.writeNumber(source.feeTonAmount);
    return builder.build();
}

function dictValueParserDepositLiquidityEvent(): DictionaryValue<DepositLiquidityEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDepositLiquidityEvent(src)).endCell());
        },
        parse: (src) => {
            return loadDepositLiquidityEvent(src.loadRef().beginParse());
        }
    }
}

export type NewTradeStatusEvent = {
    $$type: 'NewTradeStatusEvent';
    oldTradeStatus: bigint;
    newTradeStatus: bigint;
}

export function storeNewTradeStatusEvent(src: NewTradeStatusEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4225975404, 32);
        b_0.storeUint(src.oldTradeStatus, 16);
        b_0.storeUint(src.newTradeStatus, 16);
    };
}

export function loadNewTradeStatusEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4225975404) { throw Error('Invalid prefix'); }
    let _oldTradeStatus = sc_0.loadUintBig(16);
    let _newTradeStatus = sc_0.loadUintBig(16);
    return { $$type: 'NewTradeStatusEvent' as const, oldTradeStatus: _oldTradeStatus, newTradeStatus: _newTradeStatus };
}

function loadTupleNewTradeStatusEvent(source: TupleReader) {
    let _oldTradeStatus = source.readBigNumber();
    let _newTradeStatus = source.readBigNumber();
    return { $$type: 'NewTradeStatusEvent' as const, oldTradeStatus: _oldTradeStatus, newTradeStatus: _newTradeStatus };
}

function loadGetterTupleNewTradeStatusEvent(source: TupleReader) {
    let _oldTradeStatus = source.readBigNumber();
    let _newTradeStatus = source.readBigNumber();
    return { $$type: 'NewTradeStatusEvent' as const, oldTradeStatus: _oldTradeStatus, newTradeStatus: _newTradeStatus };
}

function storeTupleNewTradeStatusEvent(source: NewTradeStatusEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.oldTradeStatus);
    builder.writeNumber(source.newTradeStatus);
    return builder.build();
}

function dictValueParserNewTradeStatusEvent(): DictionaryValue<NewTradeStatusEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNewTradeStatusEvent(src)).endCell());
        },
        parse: (src) => {
            return loadNewTradeStatusEvent(src.loadRef().beginParse());
        }
    }
}

export type JettonData = {
    $$type: 'JettonData';
    totalSupply: bigint;
    mintable: boolean;
    owner: Address;
    content: Cell;
    walletCode: Cell;
}

export function storeJettonData(src: JettonData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.totalSupply, 257);
        b_0.storeBit(src.mintable);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
        b_0.storeRef(src.walletCode);
    };
}

export function loadJettonData(slice: Slice) {
    let sc_0 = slice;
    let _totalSupply = sc_0.loadIntBig(257);
    let _mintable = sc_0.loadBit();
    let _owner = sc_0.loadAddress();
    let _content = sc_0.loadRef();
    let _walletCode = sc_0.loadRef();
    return { $$type: 'JettonData' as const, totalSupply: _totalSupply, mintable: _mintable, owner: _owner, content: _content, walletCode: _walletCode };
}

function loadTupleJettonData(source: TupleReader) {
    let _totalSupply = source.readBigNumber();
    let _mintable = source.readBoolean();
    let _owner = source.readAddress();
    let _content = source.readCell();
    let _walletCode = source.readCell();
    return { $$type: 'JettonData' as const, totalSupply: _totalSupply, mintable: _mintable, owner: _owner, content: _content, walletCode: _walletCode };
}

function loadGetterTupleJettonData(source: TupleReader) {
    let _totalSupply = source.readBigNumber();
    let _mintable = source.readBoolean();
    let _owner = source.readAddress();
    let _content = source.readCell();
    let _walletCode = source.readCell();
    return { $$type: 'JettonData' as const, totalSupply: _totalSupply, mintable: _mintable, owner: _owner, content: _content, walletCode: _walletCode };
}

function storeTupleJettonData(source: JettonData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.totalSupply);
    builder.writeBoolean(source.mintable);
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    builder.writeCell(source.walletCode);
    return builder.build();
}

function dictValueParserJettonData(): DictionaryValue<JettonData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonData(src)).endCell());
        },
        parse: (src) => {
            return loadJettonData(src.loadRef().beginParse());
        }
    }
}

export type FomoData = {
    $$type: 'FomoData';
    tradeStatus: bigint;
    curveBalance: bigint;
    commissionBalance: bigint;
    commissionTotal: bigint;
    commission: bigint;
    curve: CurveParams;
    price: bigint;
    jettonsInStock: bigint;
    maxSupply: bigint;
}

export function storeFomoData(src: FomoData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.tradeStatus, 257);
        b_0.storeInt(src.curveBalance, 257);
        b_0.storeInt(src.commissionBalance, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.commissionTotal, 257);
        b_1.storeInt(src.commission, 257);
        let b_2 = new Builder();
        b_2.store(storeCurveParams(src.curve));
        let b_3 = new Builder();
        b_3.storeInt(src.price, 257);
        b_3.storeInt(src.jettonsInStock, 257);
        b_3.storeInt(src.maxSupply, 257);
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadFomoData(slice: Slice) {
    let sc_0 = slice;
    let _tradeStatus = sc_0.loadIntBig(257);
    let _curveBalance = sc_0.loadIntBig(257);
    let _commissionBalance = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _commissionTotal = sc_1.loadIntBig(257);
    let _commission = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _curve = loadCurveParams(sc_2);
    let sc_3 = sc_2.loadRef().beginParse();
    let _price = sc_3.loadIntBig(257);
    let _jettonsInStock = sc_3.loadIntBig(257);
    let _maxSupply = sc_3.loadIntBig(257);
    return { $$type: 'FomoData' as const, tradeStatus: _tradeStatus, curveBalance: _curveBalance, commissionBalance: _commissionBalance, commissionTotal: _commissionTotal, commission: _commission, curve: _curve, price: _price, jettonsInStock: _jettonsInStock, maxSupply: _maxSupply };
}

function loadTupleFomoData(source: TupleReader) {
    let _tradeStatus = source.readBigNumber();
    let _curveBalance = source.readBigNumber();
    let _commissionBalance = source.readBigNumber();
    let _commissionTotal = source.readBigNumber();
    let _commission = source.readBigNumber();
    const _curve = loadTupleCurveParams(source.readTuple());
    let _price = source.readBigNumber();
    let _jettonsInStock = source.readBigNumber();
    let _maxSupply = source.readBigNumber();
    return { $$type: 'FomoData' as const, tradeStatus: _tradeStatus, curveBalance: _curveBalance, commissionBalance: _commissionBalance, commissionTotal: _commissionTotal, commission: _commission, curve: _curve, price: _price, jettonsInStock: _jettonsInStock, maxSupply: _maxSupply };
}

function loadGetterTupleFomoData(source: TupleReader) {
    let _tradeStatus = source.readBigNumber();
    let _curveBalance = source.readBigNumber();
    let _commissionBalance = source.readBigNumber();
    let _commissionTotal = source.readBigNumber();
    let _commission = source.readBigNumber();
    const _curve = loadGetterTupleCurveParams(source);
    let _price = source.readBigNumber();
    let _jettonsInStock = source.readBigNumber();
    let _maxSupply = source.readBigNumber();
    return { $$type: 'FomoData' as const, tradeStatus: _tradeStatus, curveBalance: _curveBalance, commissionBalance: _commissionBalance, commissionTotal: _commissionTotal, commission: _commission, curve: _curve, price: _price, jettonsInStock: _jettonsInStock, maxSupply: _maxSupply };
}

function storeTupleFomoData(source: FomoData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tradeStatus);
    builder.writeNumber(source.curveBalance);
    builder.writeNumber(source.commissionBalance);
    builder.writeNumber(source.commissionTotal);
    builder.writeNumber(source.commission);
    builder.writeTuple(storeTupleCurveParams(source.curve));
    builder.writeNumber(source.price);
    builder.writeNumber(source.jettonsInStock);
    builder.writeNumber(source.maxSupply);
    return builder.build();
}

function dictValueParserFomoData(): DictionaryValue<FomoData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFomoData(src)).endCell());
        },
        parse: (src) => {
            return loadFomoData(src.loadRef().beginParse());
        }
    }
}

export type Buy = {
    $$type: 'Buy';
    doBuy: boolean;
}

export function storeBuy(src: Buy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1876860589, 32);
        b_0.storeBit(src.doBuy);
    };
}

export function loadBuy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1876860589) { throw Error('Invalid prefix'); }
    let _doBuy = sc_0.loadBit();
    return { $$type: 'Buy' as const, doBuy: _doBuy };
}

function loadTupleBuy(source: TupleReader) {
    let _doBuy = source.readBoolean();
    return { $$type: 'Buy' as const, doBuy: _doBuy };
}

function loadGetterTupleBuy(source: TupleReader) {
    let _doBuy = source.readBoolean();
    return { $$type: 'Buy' as const, doBuy: _doBuy };
}

function storeTupleBuy(source: Buy) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.doBuy);
    return builder.build();
}

function dictValueParserBuy(): DictionaryValue<Buy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBuy(src)).endCell());
        },
        parse: (src) => {
            return loadBuy(src.loadRef().beginParse());
        }
    }
}

export type WithdrawCommission = {
    $$type: 'WithdrawCommission';
    amount: bigint;
    to: Address;
}

export function storeWithdrawCommission(src: WithdrawCommission) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(500070842, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.to);
    };
}

export function loadWithdrawCommission(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 500070842) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    let _to = sc_0.loadAddress();
    return { $$type: 'WithdrawCommission' as const, amount: _amount, to: _to };
}

function loadTupleWithdrawCommission(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _to = source.readAddress();
    return { $$type: 'WithdrawCommission' as const, amount: _amount, to: _to };
}

function loadGetterTupleWithdrawCommission(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _to = source.readAddress();
    return { $$type: 'WithdrawCommission' as const, amount: _amount, to: _to };
}

function storeTupleWithdrawCommission(source: WithdrawCommission) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.to);
    return builder.build();
}

function dictValueParserWithdrawCommission(): DictionaryValue<WithdrawCommission> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdrawCommission(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawCommission(src.loadRef().beginParse());
        }
    }
}

export type DepositLiquidity = {
    $$type: 'DepositLiquidity';
    tonVault: Address;
    jettonVault: Address;
    tonVaultPayload: Cell;
    jettonVaultPayload: Cell;
}

export function storeDepositLiquidity(src: DepositLiquidity) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(14184552, 32);
        b_0.storeAddress(src.tonVault);
        b_0.storeAddress(src.jettonVault);
        b_0.storeRef(src.tonVaultPayload);
        b_0.storeRef(src.jettonVaultPayload);
    };
}

export function loadDepositLiquidity(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 14184552) { throw Error('Invalid prefix'); }
    let _tonVault = sc_0.loadAddress();
    let _jettonVault = sc_0.loadAddress();
    let _tonVaultPayload = sc_0.loadRef();
    let _jettonVaultPayload = sc_0.loadRef();
    return { $$type: 'DepositLiquidity' as const, tonVault: _tonVault, jettonVault: _jettonVault, tonVaultPayload: _tonVaultPayload, jettonVaultPayload: _jettonVaultPayload };
}

function loadTupleDepositLiquidity(source: TupleReader) {
    let _tonVault = source.readAddress();
    let _jettonVault = source.readAddress();
    let _tonVaultPayload = source.readCell();
    let _jettonVaultPayload = source.readCell();
    return { $$type: 'DepositLiquidity' as const, tonVault: _tonVault, jettonVault: _jettonVault, tonVaultPayload: _tonVaultPayload, jettonVaultPayload: _jettonVaultPayload };
}

function loadGetterTupleDepositLiquidity(source: TupleReader) {
    let _tonVault = source.readAddress();
    let _jettonVault = source.readAddress();
    let _tonVaultPayload = source.readCell();
    let _jettonVaultPayload = source.readCell();
    return { $$type: 'DepositLiquidity' as const, tonVault: _tonVault, jettonVault: _jettonVault, tonVaultPayload: _tonVaultPayload, jettonVaultPayload: _jettonVaultPayload };
}

function storeTupleDepositLiquidity(source: DepositLiquidity) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.tonVault);
    builder.writeAddress(source.jettonVault);
    builder.writeCell(source.tonVaultPayload);
    builder.writeCell(source.jettonVaultPayload);
    return builder.build();
}

function dictValueParserDepositLiquidity(): DictionaryValue<DepositLiquidity> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDepositLiquidity(src)).endCell());
        },
        parse: (src) => {
            return loadDepositLiquidity(src.loadRef().beginParse());
        }
    }
}

export type MintAirdrop = {
    $$type: 'MintAirdrop';
    amount: bigint;
    to: Address;
}

export function storeMintAirdrop(src: MintAirdrop) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2836452725, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.to);
    };
}

export function loadMintAirdrop(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2836452725) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    let _to = sc_0.loadAddress();
    return { $$type: 'MintAirdrop' as const, amount: _amount, to: _to };
}

function loadTupleMintAirdrop(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _to = source.readAddress();
    return { $$type: 'MintAirdrop' as const, amount: _amount, to: _to };
}

function loadGetterTupleMintAirdrop(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _to = source.readAddress();
    return { $$type: 'MintAirdrop' as const, amount: _amount, to: _to };
}

function storeTupleMintAirdrop(source: MintAirdrop) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.to);
    return builder.build();
}

function dictValueParserMintAirdrop(): DictionaryValue<MintAirdrop> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMintAirdrop(src)).endCell());
        },
        parse: (src) => {
            return loadMintAirdrop(src.loadRef().beginParse());
        }
    }
}

export type SetTradeStatus = {
    $$type: 'SetTradeStatus';
    newTradeStatus: bigint;
}

export function storeSetTradeStatus(src: SetTradeStatus) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2814722558, 32);
        b_0.storeInt(src.newTradeStatus, 257);
    };
}

export function loadSetTradeStatus(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2814722558) { throw Error('Invalid prefix'); }
    let _newTradeStatus = sc_0.loadIntBig(257);
    return { $$type: 'SetTradeStatus' as const, newTradeStatus: _newTradeStatus };
}

function loadTupleSetTradeStatus(source: TupleReader) {
    let _newTradeStatus = source.readBigNumber();
    return { $$type: 'SetTradeStatus' as const, newTradeStatus: _newTradeStatus };
}

function loadGetterTupleSetTradeStatus(source: TupleReader) {
    let _newTradeStatus = source.readBigNumber();
    return { $$type: 'SetTradeStatus' as const, newTradeStatus: _newTradeStatus };
}

function storeTupleSetTradeStatus(source: SetTradeStatus) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.newTradeStatus);
    return builder.build();
}

function dictValueParserSetTradeStatus(): DictionaryValue<SetTradeStatus> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetTradeStatus(src)).endCell());
        },
        parse: (src) => {
            return loadSetTradeStatus(src.loadRef().beginParse());
        }
    }
}

export type WithdrawByOwner = {
    $$type: 'WithdrawByOwner';
    amount: bigint;
    to: Address;
}

export function storeWithdrawByOwner(src: WithdrawByOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3334857217, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.to);
    };
}

export function loadWithdrawByOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3334857217) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    let _to = sc_0.loadAddress();
    return { $$type: 'WithdrawByOwner' as const, amount: _amount, to: _to };
}

function loadTupleWithdrawByOwner(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _to = source.readAddress();
    return { $$type: 'WithdrawByOwner' as const, amount: _amount, to: _to };
}

function loadGetterTupleWithdrawByOwner(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _to = source.readAddress();
    return { $$type: 'WithdrawByOwner' as const, amount: _amount, to: _to };
}

function storeTupleWithdrawByOwner(source: WithdrawByOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.to);
    return builder.build();
}

function dictValueParserWithdrawByOwner(): DictionaryValue<WithdrawByOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdrawByOwner(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawByOwner(src.loadRef().beginParse());
        }
    }
}

export type MintByOwner = {
    $$type: 'MintByOwner';
    amount: bigint;
    to: Address;
}

export function storeMintByOwner(src: MintByOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4143400398, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.to);
    };
}

export function loadMintByOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4143400398) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    let _to = sc_0.loadAddress();
    return { $$type: 'MintByOwner' as const, amount: _amount, to: _to };
}

function loadTupleMintByOwner(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _to = source.readAddress();
    return { $$type: 'MintByOwner' as const, amount: _amount, to: _to };
}

function loadGetterTupleMintByOwner(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _to = source.readAddress();
    return { $$type: 'MintByOwner' as const, amount: _amount, to: _to };
}

function storeTupleMintByOwner(source: MintByOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.to);
    return builder.build();
}

function dictValueParserMintByOwner(): DictionaryValue<MintByOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMintByOwner(src)).endCell());
        },
        parse: (src) => {
            return loadMintByOwner(src.loadRef().beginParse());
        }
    }
}

export type SendByOwner = {
    $$type: 'SendByOwner';
    parameters: SendParameters;
}

export function storeSendByOwner(src: SendByOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4157949314, 32);
        b_0.store(storeSendParameters(src.parameters));
    };
}

export function loadSendByOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4157949314) { throw Error('Invalid prefix'); }
    let _parameters = loadSendParameters(sc_0);
    return { $$type: 'SendByOwner' as const, parameters: _parameters };
}

function loadTupleSendByOwner(source: TupleReader) {
    const _parameters = loadTupleSendParameters(source.readTuple());
    return { $$type: 'SendByOwner' as const, parameters: _parameters };
}

function loadGetterTupleSendByOwner(source: TupleReader) {
    const _parameters = loadGetterTupleSendParameters(source);
    return { $$type: 'SendByOwner' as const, parameters: _parameters };
}

function storeTupleSendByOwner(source: SendByOwner) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTupleSendParameters(source.parameters));
    return builder.build();
}

function dictValueParserSendByOwner(): DictionaryValue<SendByOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendByOwner(src)).endCell());
        },
        parse: (src) => {
            return loadSendByOwner(src.loadRef().beginParse());
        }
    }
}

export type DeployUnwrapped = {
    $$type: 'DeployUnwrapped';
}

export function storeDeployUnwrapped(src: DeployUnwrapped) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1362863405, 32);
    };
}

export function loadDeployUnwrapped(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1362863405) { throw Error('Invalid prefix'); }
    return { $$type: 'DeployUnwrapped' as const };
}

function loadTupleDeployUnwrapped(source: TupleReader) {
    return { $$type: 'DeployUnwrapped' as const };
}

function loadGetterTupleDeployUnwrapped(source: TupleReader) {
    return { $$type: 'DeployUnwrapped' as const };
}

function storeTupleDeployUnwrapped(source: DeployUnwrapped) {
    let builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserDeployUnwrapped(): DictionaryValue<DeployUnwrapped> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployUnwrapped(src)).endCell());
        },
        parse: (src) => {
            return loadDeployUnwrapped(src.loadRef().beginParse());
        }
    }
}

export type MintUnwrappedSupply = {
    $$type: 'MintUnwrappedSupply';
}

export function storeMintUnwrappedSupply(src: MintUnwrappedSupply) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(312072381, 32);
    };
}

export function loadMintUnwrappedSupply(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 312072381) { throw Error('Invalid prefix'); }
    return { $$type: 'MintUnwrappedSupply' as const };
}

function loadTupleMintUnwrappedSupply(source: TupleReader) {
    return { $$type: 'MintUnwrappedSupply' as const };
}

function loadGetterTupleMintUnwrappedSupply(source: TupleReader) {
    return { $$type: 'MintUnwrappedSupply' as const };
}

function storeTupleMintUnwrappedSupply(source: MintUnwrappedSupply) {
    let builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserMintUnwrappedSupply(): DictionaryValue<MintUnwrappedSupply> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMintUnwrappedSupply(src)).endCell());
        },
        parse: (src) => {
            return loadMintUnwrappedSupply(src.loadRef().beginParse());
        }
    }
}

export type RevokeUnwrappedOwnership = {
    $$type: 'RevokeUnwrappedOwnership';
}

export function storeRevokeUnwrappedOwnership(src: RevokeUnwrappedOwnership) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2802272535, 32);
    };
}

export function loadRevokeUnwrappedOwnership(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2802272535) { throw Error('Invalid prefix'); }
    return { $$type: 'RevokeUnwrappedOwnership' as const };
}

function loadTupleRevokeUnwrappedOwnership(source: TupleReader) {
    return { $$type: 'RevokeUnwrappedOwnership' as const };
}

function loadGetterTupleRevokeUnwrappedOwnership(source: TupleReader) {
    return { $$type: 'RevokeUnwrappedOwnership' as const };
}

function storeTupleRevokeUnwrappedOwnership(source: RevokeUnwrappedOwnership) {
    let builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserRevokeUnwrappedOwnership(): DictionaryValue<RevokeUnwrappedOwnership> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRevokeUnwrappedOwnership(src)).endCell());
        },
        parse: (src) => {
            return loadRevokeUnwrappedOwnership(src.loadRef().beginParse());
        }
    }
}

 type MempumpMaster_init_args = {
    $$type: 'MempumpMaster_init_args';
    owner: Address;
    creator: Address;
    content: Cell;
    unwrappedContent: Cell;
}

function initMempumpMaster_init_args(src: MempumpMaster_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.creator);
        b_0.storeRef(src.content);
        b_0.storeRef(src.unwrappedContent);
    };
}

async function MempumpMaster_init(owner: Address, creator: Address, content: Cell, unwrappedContent: Cell) {
    const __code = Cell.fromBase64('te6ccgECqQEALYEAART/APSkE/S88sgLAQIBYgIDAgLIBAUCASAQEQL33AdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zwRGREbERkRGBEaERgRFxEZERcRFhEYERYRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDlUdn0GAC+8D6RFAjywBwAcsDcAHLAnEBywDLB8v/gCVts88uCCyPhDAcx/AcoAERoRGREYERcRFhEVERQRExESEREREFXg2zzJ7VQHCASi7aLt+wGSMH/gcCHXScIflTAg1wsf3iCCEK8comq6jpQw0x8BghCvHKJquvLggdQBMds8f+AgghB73ZfeuuMCIIIQb96erbrjAiCCEB3Oebq6CQoLDAH2AREZAREagQEBzwABERcg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBERUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBERMBygABEREBzA/IzB7LD1AM+gJQCvoCUAj6AhbLfxSBAQHPAMgLEDoQKV40DgL2ERkRGhEZERgRGhEYERcRGhEXERYRGhEWERURGhEVERQRGhEUERMRGhETERIRGhESERERGhERERARGhEQDxEaDw4RGg4NERoNDBEaDAsRGgsKERoKCREaCREaCAcGVUDbPFcVERgRGREYERcRGBEXERYRFxEWERURFhEVVA0BzjDTHwGCEHvdl9668uCB0z/6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBINcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iFEMwbBTbPH8WAk4w0x8BghBv3p6tuvLggdIAATGCAIvdVhXAAPL0+EFvJDAyArPjD38fIASmjrUw0x8BghAdznm6uvLggfoA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEts8f+AgggjYcGi64wIgghCpENV1uuMCIIIQp8VB/rooKSorADwRExEUERMREhETERIRERESEREREBERERAPERAPVQ4BNEATUM3bPAPIgQEBzwAUzBTMyQHMyQHMyQHMDwBYUKvL/xjL/xbL/wTIy/9QA/oCAfoCAfoCWPoCWPoCWPoCyFAD+gLJWMzJAcwCASASEwIBIFlaAhm5ZH2zzbPFcQXw9soYfRQCGbhR3bPNs8VxBfD2yhh9FQAEVhcABFYYAfYwERkRHBEZERgRGxEYERcRGhEXERYRHBEWERURGxEVERQRGhEUERMRHBETERIRGxESERERGhERERARHBEQDxEbDw4RGg4NERwNDBEbDAsRGgsKERwKCREbCQgRGggHERwHBhEbBgURGgUEERwEAxEbAwIRGgIBERwBERsXA/hWG9s8+EFvJDAxgWN2MoIQCPDRgLzy9FYTwACOpVYTwAGcVxpXGlcaggCc+/Lw4w4RFxEZERcRFxEYERcNERcNEN7jDREWERkRFhEVERgRFREUERcRFBETERYRExESERUREhERERQREREQERMREA8REg8NERENDREQDVUsGBkaAuj4QW8kECNfAxEaERsRGhEZERsRGREYERsRGBEXERsRFxEWERsRFhEVERsRFREUERsRFBETERsRExESERsREhERERsREREQERsREA8RGw8OERsODREbDQwRGwwLERsLChEbCgkRGwkRGwgHBlVA2zwBgRFNAmkbBOgRGVYcoYIAmXYhwv/y9PgoAREaAds8cIBAbSICER8CbVYiA1YiUCNWIwIQI8hVYNs8yUEwAREdAX9VMG1t2zwBERoBERvIWYIQLTUYe1ADyx8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAfoCyXJEVx0E1FcaVhsnVhNUf+1Uf+1Uf+1T/ts8ERlWHKEHVhyhggCZdijC//L0ERJWGaGCAIf2IcL/8vQHERkHERIHERpWGts8ERJWEqAREVYSoBEbVhKhcIBCVh5UQzBDMG1tbds8AxEcAwIBER0BERJ/glceAfpwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAERHAHHBQERGwHy9BEYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIRERwAGBEQEREREA8REA9VDgA8yIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAERgRGREYAJ7IVTCCEGqQ/VVQBcsfUAMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYB+gIB+gIB+gLJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAAeKBPZshghAO5rKAvvL0ERGkERGCEA7msoChUhBwcEMwbW1t2zxWEKXAAI5DyAGCEDl91v9Yyx8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AJEw4lcB/CCCC5OHAKGCC5OHAKGCAL7YIcIA8vQREqQRGREcERkRGBEbERgRFxEaERcRFhEcERYRFREbERURFBEaERQRExEcERMREhEbERIREREaEREREBEcERAPDhEaDg0RHA0MCxEaCwoRHAoJCBEaCAcRHAcGBREaBQQRHAQDAhEaAiED9AERHAFWG9s8ERxWHKFTCFYVVhFWEVYRVhFWEVYRVhFWEVYRVhFWEds8ERVWH6ARFFYfoFMxoQERFwGgUbKgVhWTcVcY3iGCC5OHAKARGhEeERoRGREdERkRGBEcERgRFxEbERcRFhEeERYRFREdERURFBEcERQMERMMgnwiBPwREhEdERIREREbEREREBEcERAQzw4RHQ4NERsNDBEcDAsRHAsKER0KCREbCRgHERwHBhEdBgURGwUUAxEcAwIRHQIBERsBcFYgAlYeAlYiAds8L6XAAOMPERIRGRESERERGBERERARFxEQDxEWDw4RFQ4NERQNDBETDAsREgtAIyQlAXABERoBERyhBREdBQQRHwQDAhEaAgERHgERHMhVUNs8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ACYBcAERGgERHKEFER0FBBEfBAMCERoCAREeAREcyFVQ2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAJwAkChERCgkREAkQjxB+VWZGQENQAHKCEKV3JUFQB8sfUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCAfoCAfoCAfoCygAAcoIQhCNvglAHyx9QBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gIB+gIB+gIB+gLKAAH0ERkRGxEZERgRGhEYERcRGxEXERYRGhEWERURGxEVERQRGhEUERMRGxETERIRGhESERERGxERERARGhEQDxEbDw4RGg4NERsNDBEaDAsRGwsKERoKCREbCQgRGggHERsHBhEaBgURGwUEERoEAxEbAwIRGgIBERsBERosAaww0x8BggjYcGi68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdTUVTBsFNs8fy0BajDTHwGCEKkQ1XW68uCB+gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEmwS2zx/MQTijpgw0x8BghCnxUH+uvLggYEBAdcAATHbPH/gIIIQLHa5c7qOuTDTHwGCECx2uXO68uCB0z/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdIAVSBsE9s8f+AgghDGxeIBuuMCIIIQ9vdFzrozNDU2AuLbPIIA80pWHFYTu/L0ERpWG3CAQEMwbW1t2zwBERABERqhERcRGREXERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQEREOERAOEN8QzhC9EKwQmxCKEHkQaBBXEEYQNUQDAlRXAfQRGREdERkRGBEcERgRFxEbERcRFhEaERYRFREdERURFBEcERQRExEbERMREhEaERIREREdEREREBEcERAPERsPDhEaDg0RHQ0MERwMCxEbCwoRGgoJER0JCBEcCAcRGwcGERoGBREdBQQRHAQDERsDAhEaAgERHQERHC4D+ts8+EFvJBNfA4IAqJhWFcAB8vSCAOHWAYIQL68IAL7y9FYSJqEREiagEREmoFOooSahghAX14QAVhSgAhEeAn9YESFDMHABbW3bPIIQIMhVgPgoERsRHREbERoRHBEaERkRGxEZERgRGhEYERcRGREXERYRGBEWERURFxEVVFcvAuQRFBEWERQREhEVERIREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM4QvRCsEJsQihB5EGgQVxBGEDUQJBAjcIIQC+vCAFYhBREhghAX14QA2zwBERoBERslyFUgghDor5SFUATLH1j6AgH6AgH6AslLMACoyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAERcRGREXERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q31UcAfQRGREbERkRGBEaERgRFxEbERcRFhEaERYRFREbERURFBEaERQRExEbERMREhEaERIREREbEREREBEaERAPERsPDhEaDg0RGw0MERoMCxEbCwoRGgoJERsJCBEaCAcRGwcGERoGBREbBQQRGgQDERsDAhEaAgERGwERGjIC6Ns8gQxTJFYdoCa78vQEVhugERkRGxEZERgRGhEYERcRGREXERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q3xDOEL0QrBCbEIoQeRBoEFcGEDVEMHBUEgKAQNs8VEAC9BEZERoRGREYERoRGBEXERoRFxEWERoRFhEVERoRFREUERoRFBETERoRExESERoREhERERoREREQERoREA8RGg8OERoODREaDQwRGgwLERoLChEaCgkRGgkRGggHBlVA2zxWGgERFAERG8hZghD740RsUAPLH8sPyw/JVDcB9BEZERwRGREYERsRGBEXERoRFxEWERwRFhEVERsRFREUERoRFBETERwRExESERsREhERERoREREQERwREA8RGw8OERoODREcDQwRGwwLERoLChEcCgkRGwkIERoIBxEcBwYRGwYFERoFBBEcBAMRGwMCERoCAREcAREbOAFqMNMfAYIQxsXiAbry4IH6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBLbPH86BO6OtTDTHwGCEPb3Rc668uCB+gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEmwS2zx/4CCCENUydtu6jqEw0x8BghDVMnbbuvLggdM/ATEwVhhwcIBAQzBtbW3bPH/gIIIQc2LQnLrjAiDAACLXScEhsDxXPT4AnMiCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABEYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExERERIREREQEREREA8REA9VDgKyVhzbPMhwAcoAydARHY4uVxzIfwHKAAERHSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsnQERsRHJJXHeICERoCAREcAREb+EFvJBAjXwNwUEOAQANfOQHoyFUgghDRc1QAUATLHxLLPwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBzxbJf1UwbW3bPBEWERkRFhEVERgRFREUERcRFBETERYRExESERUREhERERQREREQERMREA8REg8OEREODREQDRDPVStXAfQRGREbERkRGBEaERgRFxEbERcRFhEaERYRFREbERURFBEaERQRExEbERMREhEaERIREREbEREREBEaERAPERsPDhEaDg0RGw0MERoMCxEbCwoRGgoJERsJCBEaCAcRGwcGERoGBREbBQQRGgQDERsDAhEaAgERGwERGjsCuNs8ggCY8vgnbxBWHQG78vQBERoBERtwgEBDMG1tbds8ERcRGREXERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q31UcVFcB9BEZERsRGREYERoRGBEXERsRFxEWERoRFhEVERsRFREUERoRFBETERsRExESERoREhERERsREREQERoREA8RGw8OERoODREbDQwRGgwLERsLChEaCgkRGwkIERoIBxEbBwYRGgYFERsFBBEaBAMRGwMCERoCAREbAREaPwF+MNMfAYIQc2LQnLry4IHTP/oA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHSAAGR1JJtAeJVMGwUQwR0jo9bVhhwcIBAQzBtbW3bPH/gIIIQ99VFgrqPFTDTHwGCEPfVRYK68uCB2zxsF9s8f+AgghCnB0kXuldFRkcCoNs8ERkRGxEZERgRGhEYERcRGREXERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA5VHXBUEgKAQNs8VEAC8BEeI6CCAJl2IcL/8vQRGhEZER0RGREYERwRGBEXERsRFxEWERURHREVERQRHBEUERMRGxETERIREREdEREREBEcERAPERsPDg0RHQ0MERwMCxEbCwoJER0JCBEcCAcRGwcGBREdBQQRHAQDERsDAgERHQERHNs8XGlBA/pwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiHBw+CghyMkQNQQRIgQQIwIRJALIVVDbPMkGER8GBREeBQQRHQQDESADWRBGEEXbPBEVERkRFREUERgRFFBXQgBgERMRFxETERIRFhESERERFRERERARFBEQDxETDw4REg4NERENDBEQDBC/EK4QnVU4Aq4w+EFvJBAjXwP4KFjHBbOPQXCAQI0IYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABG34KCQQWBBHbRAjyFVg2zzJQzB/VTBtbds8kl8D4n9EVwDgghAPin6lUAjLHxbLP1AE+gJYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFiFus5V/AcoAzJRwMsoA4gH6AiFus5V/AcoAzJRwMsoA4gCS0gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAgQEB1wDSAAGR1JJtAeLSAAGR1JJtAeLSAAGR1JJtAeJVYAH0ERkRIBEZERgRHxEYERcRHhEXERYRHREWERURHBEVERQRGxEUERMRGhETERIRIBESERERHxERERARHhEQDxEdDw4RHA4NERsNDBEaDAsRIAsKER8KCREeCQgRHQgHERwHBhEbBgURGgUEESAEAxEfAwIRHgIBER0BERxIBPyP+jDTHwGCEKcHSRe68uCBbTEw2zyCAPMpVhTAAvL02zxwcIBAIo0IYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABMhZc1ADyx/LPwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJECQQI21t2zx/4CBUdFdJAqTbPAYRGwYFERoFBBEgBAMRHwMCER4CAREdAREc2zwREhEZERIREREYEREREBEXERAPERYPDhEVDg0RFA0MERMMCxESCwoREQoJERAJEI8QflVmVFcE7IIQUTulLbqOkzDTHwGCEFE7pS268uCBbTHbPH/gIIIQEpnYvbqPRjDTHwGCEBKZ2L268uCBbTEw2zz4QW8kMDKCAKiYVhbAAfL0gXm4AoIQC+vCALwS8vT4KFOWoBJwWIBAbW2CEAX14QDbPH/gIIIQgZ2+mbpKVEtMAvYw2zwRGREbERkRGBEaERgRFxEbERcRFhEaERYRFREbERURFBEaERQRExEbERMREhEaERIREREbEREREBEaERAPERsPDhEaDg0RGw0MERoMCxEbCwoRGgoJERsJCBEaCAcRGwcGERoGBREbBQQRGgQDERsDAhEaAgERGwF3TQHygSZEJ8L/8vRwI26zmDACIG7y0IACkTPiyMkibrOYMAEgbvLQgAGRMuIRGREhERkRGBEgERgRFxEfERcRFhEeERYRFREdERURFBEcERQRExEbERMREhEaERIREREhEREREBEgERAPER8PDhEeDg0RHQ0MERwMCxEbC04B1I61MNMfAYIQgZ2+mbry4IHTP/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBLbPH/gwACOKvkBgvCF0og4TABDRYsCgDyyIFn2iAPFU8NlY0Q0ZGjayWHyRrqTf9sx4JEw4nBSAqYRGts8AnBwWoBAAgERHwERHhA1EDRtWds8ERcRGREXERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA5VHXRXAv4KERoKCREhCQgRIAgHER8HBhEeBgURHQUEERwEAxEbAwIRGgIBESEBESDbPFxwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiHD4KBUEESMEAwIRIQIBER8Bd08D/BEmyFVQ2zzJcHADAhEhAgERIgERIchVMIAVUAXLHxPLPwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYB+gLMyQYRGwYFERwFBBEfBAMRGgMCAREdAREgEEYQRds8ERERGRERERARGBEQDxEXDw4RFg4NERUNDBEUDFBXUQDCghAXjUUZUAfLHxXLP1AD+gIBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgH6AiFus5V/AcoAzJRwMsoA4gAwCxETCwoREgoJEREJCBEQCFV3EEcFRjYUAfQRGREbERkRGBEaERgRFxEbERcRFhEaERYRFREbERURFBEaERQRExEbERMREhEaERIREREbEREREBEaERAPERsPDhEaDg0RGw0MERoMCxEbCwoRGgoJERsJCBEaCAcRGwcGERoGBREbBQQRGgQDERsDAhEaAgERGwERGlMC/Ns8VxhWGQERGwERGshZghAyeytKUAPLH8s/ASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFskRGBEaERgRFhEYERYRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM4QvRCsEJsQilRVABT4QlYZAccF8uCEASYQeRBoEFcQRhA1RDD4QgF/bds8VgE6bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zxXAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7AFgAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwCASBbXAIBIGprAgFYXV4CnbYYG2eCIyIjQiMiIwIjIiMCIuIjAiLiIsIi4iLCIqIiwiKiIoIioiKCImIigiJiIkIiYiJCIiIiQiIiIgIiIiIB4iIB6qHbZ4riC+HtlDB9ggLVrbyQa6TAgIXdeXBEEGuFhRBAgn/deWhEwYTdeXBEbZ4IjIiNCIyIjAiMiIwIi4iMCIuIiwiLiIsIioiLCIqIigiKiIoIiYiKCImIiQiJiIkIiIiJCIiIiAiIiIgHiIgHqodtniuIL4e2UMB9XwIBIGBhAYbbPHBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIaQKcqGzbPNs8VxNXE1cTVxNXE1cTVxNXE1cTVxNXE1cTVxNXE1cTVxNXE1cTVxNXE1cTVxNXE1cTVxNXEwsREgsKEREKCREQCRCPEH5VZlUUfWICFKot2zzbPGz1bLV9aAG6J1YTVH/tVH/tVH/tU/7bPFOooSahVhUCVhUCVhUCVhUCVhMCVhMCVhMCVhMCVhMCVhMCVhMCVhMCVhMCVhMCVhMCVhMCVhsQPhA9EDwQOxA6EDkQOBA3EDYQNRA0YwQuKhC9EKxRnAlVYds8VDEj2zxUMSPbPCOBZGRlAAgBqQSoAgrbPFnbPGZnAAYBqYQACKkEqQQBJPgo2zwwVhTAAFYbAlYbAVYZAWkAkshw+gIBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W+Cgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZSIMzJUiACASBsbQKdtgKbZ4IjIiNCIyIjAiMiIwIi4iMCIuIiwiLiIsIioiLCIqIigiKiIoIiYiKCImIiQiJiIkIiIiJCIiIiAiIiIgHiIgHqodtniuIL4e2UMH1+ABGwr7tRNDSAAGACASBubwIZrsptnm2eK4gvh7ZQwH10AgEgcHEC1KiGINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiNs8ERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXEF8PbKF9cgKcq/vbPBEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxBfD2yhfXoBhts8cFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhzAtARGREaERkRGBEaERgRFxEaERcRFhEaERYRFREaERURFBEaERQRExEaERMREhEaERIREREaEREREBEaERAPERoPDhEaDg0RGg0MERoMCxEaCwoRGgoJERoJERoIBwZVQNs8yHD6AgERHHR1AfBWGVYZVhlWGVYZVhlWGVYZVhlWGVYZVhlWGVYZVhlWGVYZVhlWGVYZVhlWGVYZVhlWGVYZERkRMxEZERgRMhEYERcRMREXERYRMBEWERURLxEVERQRLhEUERMRLRETERIRLBESERERKxERERARKhEQDxEpDw4RKA52AfYg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBERsg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZSEMzJUhARGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMREhETERJ5AoQNEScNDBEmDAsRJQsKESQKCREjCQgRIggHESEHBhEgBgURHwUEER4EAxEdAwIRHAIBERsBERrbPFcSVxBfD1CaXwl3eABcyHD6AvgoINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WVhUBzFIgzMlSEACCcFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgAVBERERIREREQEREREA8REA8Q7xDeEM0QvBCrEJoQiRB4EGcQVhBFEDQQIwL0gguThwChgguThwChERkRGhEZERgRGhEYERcRGhEXERYRGhEWERURGhEVERQRGhEUERMRGhETERIRGhESERERGhERERARGhEQDxEaDw4RGg4NERoNDBEaDAsRGgsKERoKCREaCREaCAcGVUBWGts8AREbAaEnVhNUf+2CewHKVH/tVH/tU/7bPFsRGREaERkRGBEZERgRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPEO8Q3hDNELwQqxCaEIkQeBBnEFYQRRA0QTB8AUpT26AkoXAhwv+VMFHuoQ6RMeJVwNs8UhSgUROoAakEEqEhwgASgQKw7UTQ1AH4Y9IAAY7A2zxXGhEYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDuD4KNcLCoMJuvLgiYOEAvQoVhRWEFYQVhBWEFYQVhBWEFYQVhBWEFYQ2zwRGREaERkRGBEaERgRFxEaERcRFhEaERYRFREaERURFBEaERQRExEaERMREhEaERIREREaEREREBEaERAPERoPDhEaDg0RGg0MERoMCxEaCwoRGgoJERoJERoIBwZVQH+AASqBPRFT7bvy9Ns8UgOgUhOoWKkEoaWBAcZWGts8AREbAaERGREaERkRGBEZERgRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPEO8Q3hDNELwQqxCaEIkQeBBnEFYQRRA0QTCCABBfB2wiAqACoQAOI6iBA+ipBALwgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gDU1AHQ1NMP+gD6APoA03+BAQHXANQw0Ns8C9Qw0IEBAdcA1NQwERURGhEVERURGREVhYYBlPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHU1FUwBNFVAts8hwBG0//T/9P/1AHQ0//6APoA+gD6APoA+gDUMND6ADAQixCKEIkATBEVERgRFREVERcRFREVERYRFRDNELwQqxCaEIkQeBBnEFYQRRA0A+4zcFRwAI0IYAI0NRYDNjwlSK+fAOQp6YyvaSpkpHENbdnyVNn6+eOmvCF/IXGCOAVrx14tYxAAAIIQO5rKAIIYnVFonByCMA7aXSPpJLYFgjAN4Lazp2QAAIIwCxorwuxQAAAnghnRqUogAIIYBKgXyABTInqIiIiJigEU/wD0pBP0vPLIC4sBFP8A9KQT9LzyyAucAFgREREZEREREhEYERIREhEXERIREBEWERAREhEVERIREREUERFePxEQEREREAIBYoyNAgLMjo8AG6D2BdqJofQB9IH0gahhAgHUkJECAUiSkwDDCDHAJJfBOAB0NMDAXGwlRNfA/AL4PpA+kAx+gAxcdch+gAx+gAwc6m0AALTH4IQD4p+pVIgupUxNFnwCOCCEBeNRRlSILqWMUREA/AJ4DWCEFlfB7y6k1nwCuBfBIQP8vCAAET6RDBwuvLhTYAIBIJSVAgEgmpsB8QD0z/6APpAIfAB7UTQ+gD6QPpA1DBRNqFSKscF8uLBKML/8uLCVDRCcFQgE1QUA8hQBPoCWM8WAc8WzMkiyMsBEvQA9ADLAMkg+QBwdMjLAsoHy//J0AT6QPQEMfoAINdJwgDy4sR3gBjIywVQCM8WcPoCF8trE8yCWA/c7UTQ+gD6QPpA1DAI0z/6AFFRoAX6QPpAU1vHBVRzbXBUIBNUFAPIUAT6AljPFgHPFszJIsjLARL0APQAywDJ+QBwdMjLAsoHy//J0FANxwUcsfLiwwr6AFGooYIImJaAggiYloAStgihggjk4cCgGKEn4w8l1wsBwwAjgl5iZAK6CEBeNRRnIyx8Zyz9QB/oCIs8WUAbPFiX6AlADzxbJUAXMI5FykXHiUAioE6CCCOThwKoAggiYloCgoBS88uLFBMmAQPsAECPIUAT6AljPFgHPFszJ7VQAcFJ5oBihghBzYtCcyMsfUjDLP1j6AlAHzxZQB88WyXGAEMjLBSTPFlAG+gIVy2oUzMlx+wAQJBAjAA4QSRA4N18EAHbCALCOIYIQ1TJ223CAEMjLBVAIzxZQBPoCFstqEssfEss/yXL7AJM1bCHiA8hQBPoCWM8WAc8WzMntVADbO1E0PoA+kD6QNQwB9M/+gD6QDBRUaFSSccF8uLBJ8L/8uLCggjk4cCqABagFrzy4sOCEHvdl97Iyx8Vyz9QA/oCIs8WAc8WyXGAGMjLBSTPFnD6AstqzMmAQPsAQBPIUAT6AljPFgHPFszJ7VSAAgyAINch7UTQ+gD6QPpA1DAE0x+CEBeNRRlSILqCEHvdl94TuhKx8uLF0z8x+gAwE6BQI8hQBPoCWM8WAc8WzMntVIAIBYp2eAgLMn6ACA3pgp6gB9dkGOASS+B8ADoaYGAuNhJL4HwfSB9IBj9ABi465D9ABj9ABg51NoAAWmP6Z/2omh9AH0gamoYQAqpOF1HGZqamxsommOC+XAkgX0gfQBqGBBoQDBrkP0AGBKIGigheASKUCgZ5CgCfQEsZ4tmZmT2qnBBCD3uy+8pOF1KEAk7PwUIgG4KhAJqgoB5CgCfQEsZ4sA54tmZJFkZYCJegB6AGWAZJB8gDg6ZGWBZQPl/+ToO8AMZGWCrGeLKAJ9AQnltYlmZmS4/YBBPSO4DY3NwH6APpA+ChUEgZwVCATVBQDyFAE+gJYzxYBzxbMySLIywES9AD0AMsAyfkAcHTIywLKB8v/ydBQBscF8uBKoQNFRchQBPoCWM8WzMzJ7VQB+kAwINcLAcMAkVvjDeCCECx2uXNScLrjAjU3NyPAA+MCNQLABKKjpKUAPoIQ1TJ223CAEMjLBVADzxYi+gISy2rLH8s/yYBC+wAB/jZfA4IImJaAFaAVvPLgSwL6QNMAMJXIIc8WyZFt4oIQ0XNUAHCAGMjLBVAFzxYk+gIUy2oTyx8Uyz8j+kQwcLqOM/goRANwVCATVBQDyFAE+gJYzxYBzxbMySLIywES9AD0AMsAyfkAcHTIywLKB8v/ydDPFpZsInABywHi9ACmADQzUDXHBfLgSQP6QDBZyFAE+gJYzxbMzMntVABCjhhRJMcF8uBJ1DBDAMhQBPoCWM8WzMzJ7VTgXwWED/LwAArJgED7AAB9rbz2omh9AH0gamoYNhj8FAC4KhAJqgoB5CgCfQEsZ4sA54tmZJFkZYCJegB6AGWAZPyAODpkZYFlA+X/5OhAAB+vFvaiaH0AfSBqahg/qpBA');
    const __system = Cell.fromBase64('te6cckECqwEALYsAAQHAAQEFoatpAgEU/wD0pBP0vPLICwMCAWIEVAICyAVTAvfcB0NMDAXGwowH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIVFBTA28E+GEC+GLbPBEZERsRGREYERoRGBEXERkRFxEWERgRFhEVERcRFREUERYRFBETERURExESERQREhERERMREREQERIREA8REQ8OERAOVR2fwYCVts88uCCyPhDAcx/AcoAERoRGREYERcRFhEVERQRExESEREREFXg2zzJ7VQHUASi7aLt+wGSMH/gcCHXScIflTAg1wsf3iCCEK8comq6jpQw0x8BghCvHKJquvLggdQBMds8f+AgghB73ZfeuuMCIIIQb96erbrjAiCCEB3Oebq6CAoUHgL2ERkRGhEZERgRGhEYERcRGhEXERYRGhEWERURGhEVERQRGhEUERMRGhETERIRGhESERERGhERERARGhEQDxEaDw4RGg4NERoNDBEaDAsRGgsKERoKCREaCREaCAcGVUDbPFcVERgRGREYERcRGBEXERYRFxEWERURFhEVSwkAPBETERQRExESERMREhERERIREREQEREREA8REA9VDgHOMNMfAYIQe92X3rry4IHTP/oA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAEg1wsBwwCOH/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiUctchbeIUQzBsFNs8fwsB9jARGREcERkRGBEbERgRFxEaERcRFhEcERYRFREbERURFBEaERQRExEcERMREhEbERIREREaEREREBEcERAPERsPDhEaDg0RHA0MERsMCxEaCwoRHAoJERsJCBEaCAcRHAcGERsGBREaBQQRHAQDERsDAhEaAgERHAERGwwD+FYb2zz4QW8kMDGBY3YyghAI8NGAvPL0VhPAAI6lVhPAAZxXGlcaVxqCAJz78vDjDhEXERkRFxEXERgRFw0RFw0Q3uMNERYRGREWERURGBEVERQRFxEUERMRFhETERIRFRESERERFBERERARExEQDxESDw0REQ0NERANVSwNEBIC6PhBbyQQI18DERoRGxEaERkRGxEZERgRGxEYERcRGxEXERYRGxEWERURGxEVERQRGxEUERMRGxETERIRGxESERERGxERERARGxEQDxEbDw4RGw4NERsNDBEbDAsRGwsKERsKCREbCREbCAcGVUDbPAGBEU0CaQ4B+nBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAREcAccFAREbAfL0ERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERDwAYERAREREQDxEQD1UOBOgRGVYcoYIAmXYhwv/y9PgoAREaAds8cIBAbSICER8CbVYiA1YiUCNWIwIQI8hVYNs8yUEwAREdAX9VMG1t2zwBERoBERvIWYIQLTUYe1ADyx8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAfoCyXI6ThEAPMiCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABEYERkRGATUVxpWGydWE1R/7VR/7VR/7VP+2zwRGVYcoQdWHKGCAJl2KML/8vQRElYZoYIAh/Yhwv/y9AcRGQcREgcRGlYa2zwRElYSoBERVhKgERtWEqFwgEJWHlRDMEMwbW1t2zwDERwDAgERHQEREqeqThMAnshVMIIQapD9VVAFyx9QAyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgH6AgH6AgH6AsnIgljAAAAAAAAAAAAAAAABActnzMlw+wACTjDTHwGCEG/enq268uCB0gABMYIAi91WFcAA8vT4QW8kMDICs+MPfxUWAeKBPZshghAO5rKAvvL0ERGkERGCEA7msoChUhBwcEMwbW1t2zxWEKXAAI5DyAGCEDl91v9Yyx8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AJEw4k4B/CCCC5OHAKGCC5OHAKGCAL7YIcIA8vQREqQRGREcERkRGBEbERgRFxEaERcRFhEcERYRFREbERURFBEaERQRExEcERMREhEbERIREREaEREREBEcERAPDhEaDg0RHA0MCxEaCwoRHAoJCBEaCAcRHAcGBREaBQQRHAQDAhEaAhcD9AERHAFWG9s8ERxWHKFTCFYVVhFWEVYRVhFWEVYRVhFWEVYRVhFWEds8ERVWH6ARFFYfoFMxoQERFwGgUbKgVhWTcVcY3iGCC5OHAKARGhEeERoRGREdERkRGBEcERgRFxEbERcRFhEeERYRFREdERURFBEcERQMERMMqn0YBPwREhEdERIREREbEREREBEcERAQzw4RHQ4NERsNDBEcDAsRHAsKER0KCREbCRgHERwHBhEdBgURGwUUAxEcAwIRHQIBERsBcFYgAlYeAlYiAds8L6XAAOMPERIRGRESERERGBERERARFxEQDxEWDw4RFQ4NERQNDBETDAsREgs1GRsdAXABERoBERyhBREdBQQRHwQDAhEaAgERHgERHMhVUNs8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABoAcoIQpXclQVAHyx9QBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gIB+gIB+gIB+gLKAAFwAREaAREcoQURHQUEER8EAwIRGgIBER4BERzIVVDbPMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAcAHKCEIQjb4JQB8sfUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCAfoCAfoCAfoCygAAJAoREQoJERAJEI8QflVmRkBDUASmjrUw0x8BghAdznm6uvLggfoA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEts8f+AgggjYcGi64wIgghCpENV1uuMCIIIQp8VB/rofISYpAfQRGREbERkRGBEaERgRFxEbERcRFhEaERYRFREbERURFBEaERQRExEbERMREhEaERIREREbEREREBEaERAPERsPDhEaDg0RGw0MERoMCxEbCwoRGgoJERsJCBEaCAcRGwcGERoGBREbBQQRGgQDERsDAhEaAgERGwERGiAC4ts8ggDzSlYcVhO78vQRGlYbcIBAQzBtbW3bPAEREAERGqERFxEZERcRFhEYERYRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAREQ4REA4Q3xDOEL0QrBCbEIoQeRBoEFcQRhA1RAMCS04BrDDTHwGCCNhwaLry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB1NRVMGwU2zx/IgH0ERkRHREZERgRHBEYERcRGxEXERYRGhEWERURHREVERQRHBEUERMRGxETERIRGhESERERHRERERARHBEQDxEbDw4RGg4NER0NDBEcDAsRGwsKERoKCREdCQgRHAgHERsHBhEaBgURHQUEERwEAxEbAwIRGgIBER0BERwjA/rbPPhBbyQTXwOCAKiYVhXAAfL0ggDh1gGCEC+vCAC+8vRWEiahERImoBERJqBTqKEmoYIQF9eEAFYUoAIRHgJ/WBEhQzBwAW1t2zyCECDIVYD4KBEbER0RGxEaERwRGhEZERsRGREYERoRGBEXERkRFxEWERgRFhEVERcRFUtOJALkERQRFhEUERIRFRESERIRFBESERERExERERAREhEQDxERDw4REA4Q3xDOEL0QrBCbEIoQeRBoEFcQRhA1ECQQI3CCEAvrwgBWIQURIYIQF9eEANs8AREaAREbJchVIIIQ6K+UhVAEyx9Y+gIB+gIB+gLJQyUAqMiCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABEXERkRFxEWERgRFhEVERcRFREUERYRFBETERURExESERQREhERERMREREQERIREA8REQ8OERAOEN9VHAFqMNMfAYIQqRDVdbry4IH6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBLbPH8nAfQRGREbERkRGBEaERgRFxEbERcRFhEaERYRFREbERURFBEaERQRExEbERMREhEaERIREREbEREREBEaERAPERsPDhEaDg0RGw0MERoMCxEbCwoRGgoJERsJCBEaCAcRGwcGERoGBREbBQQRGgQDERsDAhEaAgERGwERGigC6Ns8gQxTJFYdoCa78vQEVhugERkRGxEZERgRGhEYERcRGREXERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q3xDOEL0QrBCbEIoQeRBoEFcGEDVEMHBUEgKAQNs8SzUE4o6YMNMfAYIQp8VB/rry4IGBAQHXAAEx2zx/4CCCECx2uXO6jrkw0x8BghAsdrlzuvLggdM/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHSAFUgbBPbPH/gIIIQxsXiAbrjAiCCEPb3Rc66KiwvMgL0ERkRGhEZERgRGhEYERcRGhEXERYRGhEWERURGhEVERQRGhEUERMRGhETERIRGhESERERGhERERARGhEQDxEaDw4RGg4NERoNDBEaDAsRGgsKERoKCREaCREaCAcGVUDbPFYaAREUAREbyFmCEPvjRGxQA8sfyw/LD8lLKwCcyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETEREREhERERAREREQDxEQD1UOAfQRGREcERkRGBEbERgRFxEaERcRFhEcERYRFREbERURFBEaERQRExEcERMREhEbERIREREaEREREBEcERAPERsPDhEaDg0RHA0MERsMCxEaCwoRHAoJERsJCBEaCAcRHAcGERsGBREaBQQRHAQDERsDAhEaAgERHAERGy0CslYc2zzIcAHKAMnQER2OLlccyH8BygABER0g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJ0BEbERySVx3iAhEaAgERHAERG/hBbyQQI18DcFBDgEADXi4B6MhVIIIQ0XNUAFAEyx8Syz8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAc8WyX9VMG1t2zwRFhEZERYRFREYERURFBEXERQRExEWERMREhEVERIREREUEREREBETERAPERIPDhERDg0REA0Qz1UrTgFqMNMfAYIQxsXiAbry4IH6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBLbPH8wAfQRGREbERkRGBEaERgRFxEbERcRFhEaERYRFREbERURFBEaERQRExEbERMREhEaERIREREbEREREBEaERAPERsPDhEaDg0RGw0MERoMCxEbCwoRGgoJERsJCBEaCAcRGwcGERoGBREbBQQRGgQDERsDAhEaAgERGwERGjECuNs8ggCY8vgnbxBWHQG78vQBERoBERtwgEBDMG1tbds8ERcRGREXERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q31UcS04E7o61MNMfAYIQ9vdFzrry4IH6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBLbPH/gIIIQ1TJ227qOoTDTHwGCENUydtu68uCB0z8BMTBWGHBwgEBDMG1tbds8f+AgghBzYtCcuuMCIMAAItdJwSGwM044OwH0ERkRGxEZERgRGhEYERcRGxEXERYRGhEWERURGxEVERQRGhEUERMRGxETERIRGhESERERGxERERARGhEQDxEbDw4RGg4NERsNDBEaDAsRGwsKERoKCREbCQgRGggHERsHBhEaBgURGwUEERoEAxEbAwIRGgIBERsBERo0AqDbPBEZERsRGREYERoRGBEXERkRFxEWERgRFhEVERcRFREUERYRFBETERURExESERQREhERERMREREQERIREA8REQ8OERAOVR1wVBICgEDbPEs1AvARHiOgggCZdiHC//L0ERoRGREdERkRGBEcERgRFxEbERcRFhEVER0RFREUERwRFBETERsRExESERERHRERERARHBEQDxEbDw4NER0NDBEcDAsRGwsKCREdCQgRHAgHERsHBgURHQUEERwEAxEbAwIBER0BERzbPFxpNgP6cFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhwcPgoIcjJEDUEESIEECMCESQCyFVQ2zzJBhEfBgURHgUEER0EAxEgA1kQRhBF2zwRFREZERURFBEYERRGTjcAYBETERcRExESERYREhERERUREREQERQREA8REw8OERIODRERDQwREAwQvxCuEJ1VOAF+MNMfAYIQc2LQnLry4IHTP/oA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHSAAGR1JJtAeJVMGwUOQKuMPhBbyQQI18D+ChYxwWzj0FwgECNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARt+CgkEFgQR20QI8hVYNs8yUMwf1UwbW3bPJJfA+J/Ok4A4IIQD4p+pVAIyx8Wyz9QBPoCWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYhbrOVfwHKAMyUcDLKAOIB+gIhbrOVfwHKAMyUcDLKAOIEdI6PW1YYcHCAQEMwbW1t2zx/4CCCEPfVRYK6jxUw0x8BghD31UWCuvLggds8bBfbPH/gIIIQpwdJF7pOPD0/AJLSAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wCBAQHXANIAAZHUkm0B4tIAAZHUkm0B4tIAAZHUkm0B4lVgAfQRGREgERkRGBEfERgRFxEeERcRFhEdERYRFREcERURFBEbERQRExEaERMREhEgERIREREfEREREBEeERAPER0PDhEcDg0RGw0MERoMCxEgCwoRHwoJER4JCBEdCAcRHAcGERsGBREaBQQRIAQDER8DAhEeAgERHQERHD4CpNs8BhEbBgURGgUEESAEAxEfAwIRHgIBER0BERzbPBESERkREhERERgREREQERcREA8RFg8OERUODREUDQwREwwLERILChERCgkREAkQjxB+VWZLTgT8j/ow0x8BghCnB0kXuvLggW0xMNs8ggDzKVYUwALy9Ns8cHCAQCKNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATIWXNQA8sfyz8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyRAkECNtbds8f+AgS3ROQATsghBRO6Utuo6TMNMfAYIQUTulLbry4IFtMds8f+AgghASmdi9uo9GMNMfAYIQEpnYvbry4IFtMTDbPPhBbyQwMoIAqJhWFsAB8vSBebgCghAL68IAvBLy9PgoU5agEnBYgEBtbYIQBfXhANs8f+AgghCBnb6ZukFLQ0gC9jDbPBEZERsRGREYERoRGBEXERsRFxEWERoRFhEVERsRFREUERoRFBETERsRExESERoREhERERsREREQERoREA8RGw8OERoODREbDQwRGgwLERsLChEaCgkRGwkIERoIBxEbBwYRGgYFERsFBBEaBAMRGwMCERoCAREbAXZCAqYRGts8AnBwWoBAAgERHwERHhA1EDRtWds8ERcRGREXERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA5VHXROAfKBJkQnwv/y9HAjbrOYMAIgbvLQgAKRM+LIySJus5gwASBu8tCAAZEy4hEZESERGREYESARGBEXER8RFxEWER4RFhEVER0RFREUERwRFBETERsRExESERoREhERESEREREQESAREA8RHw8OER4ODREdDQwRHAwLERsLRAL+ChEaCgkRIQkIESAIBxEfBwYRHgYFER0FBBEcBAMRGwMCERoCAREhAREg2zxccFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Ihw+CgVBBEjBAMCESECAREfAXZFA/wRJshVUNs8yXBwAwIRIQIBESIBESHIVTCAFVAFyx8Tyz8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAfoCzMkGERsGBREcBQQRHwQDERoDAgERHQERIBBGEEXbPBERERkREREQERgREA8RFw8OERYODREVDQwRFAxGTkcAwoIQF41FGVAHyx8Vyz9QA/oCASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYB+gIhbrOVfwHKAMyUcDLKAOIAMAsREwsKERIKCRERCQgREAhVdxBHBUY2FAHUjrUw0x8BghCBnb6ZuvLggdM/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEts8f+DAAI4q+QGC8IXSiDhMAENFiwKAPLIgWfaIA8VTw2VjRDRkaNrJYfJGupN/2zHgkTDicEkB9BEZERsRGREYERoRGBEXERsRFxEWERoRFhEVERsRFREUERoRFBETERsRExESERoREhERERsREREQERoREA8RGw8OERoODREbDQwRGgwLERsLChEaCgkRGwkIERoIBxEbBwYRGgYFERsFBBEaBAMRGwMCERoCAREbAREaSgL82zxXGFYZAREbAREayFmCEDJ7K0pQA8sfyz8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyREYERoRGBEWERgRFhEVERcRFREUERYRFBETERURExESERQREhERERMREREQERIREA8REQ8OERAOEN8QzhC9EKwQmxCKS0wAFPhCVhkBxwXy4IQBJhB5EGgQVxBGEDVEMPhCAX9t2zxNATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPE4ByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsATwCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAH2AREZAREagQEBzwABERcg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBERUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBERMBygABEREBzA/IzB7LD1AM+gJQCvoCUAj6AhbLfxSBAQHPAMgLEDoQKV40UQE0QBNQzds8A8iBAQHPABTMFMzJAczJAczJAcxSAFhQq8v/GMv/Fsv/BMjL/1AD+gIB+gIB+gJY+gJY+gJY+gLIUAP6AslYzMkBzAAvvA+kRQI8sAcAHLA3ABywJxAcsAywfL/4AgEgVVoCASBWWAIZuWR9s82zxXEF8PbKGH9XAARWFwIZuFHds82zxXEF8PbKGH9ZAARWGAIBIFtrAgEgXGoCAVhdXwLVrbyQa6TAgIXdeXBEEGuFhRBAgn/deWhEwYTdeXBEbZ4IjIiNCIyIjAiMiIwIi4iMCIuIiwiLiIsIioiLCIqIigiKiIoIiYiKCImIiQiJiIkIiIiJCIiIiAiIiIgHiIgHqodtniuIL4e2UMB/XgGG2zxwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiGkCASBgZwKcqGzbPNs8VxNXE1cTVxNXE1cTVxNXE1cTVxNXE1cTVxNXE1cTVxNXE1cTVxNXE1cTVxNXE1cTVxNXEwsREgsKEREKCREQCRCPEH5VZlUUf2EBuidWE1R/7VR/7VR/7VP+2zxTqKEmoVYVAlYVAlYVAlYVAlYTAlYTAlYTAlYTAlYTAlYTAlYTAlYTAlYTAlYTAlYTAlYTAlYbED4QPRA8EDsQOhA5EDgQNxA2EDUQNGIELioQvRCsUZwJVWHbPFQxI9s8VDEj2zwjqGNjZAAIAakEqAIK2zxZ2zxlZgAGAamEAAipBKkEAhSqLds82zxs9Wy1f2gBJPgo2zwwVhTAAFYbAlYbAVYZAWkAkshw+gIBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W+Cgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZSIMzJUiACnbYYG2eCIyIjQiMiIwIjIiMCIuIjAiLiIsIi4iLCIqIiwiKiIoIioiKCImIigiJiIkIiYiJCIiIiQiIiIgIiIiIB4iIB6qHbZ4riC+HtlDB/qgIBIGx+AgEgbW4AEbCvu1E0NIAAYAIBIG9wAhmuym2ebZ4riC+HtlDAf3QCASBxegLUqIYg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCI2zwRGREaERkRGBEZERgRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcQXw9soX9yAYbbPHBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIcwLQERkRGhEZERgRGhEYERcRGhEXERYRGhEWERURGhEVERQRGhEUERMRGhETERIRGhESERERGhERERARGhEQDxEaDw4RGg4NERoNDBEaDAsRGgsKERoKCREaCREaCAcGVUDbPMhw+gIBERx0eAHwVhlWGVYZVhlWGVYZVhlWGVYZVhlWGVYZVhlWGVYZVhlWGVYZVhlWGVYZVhlWGVYZVhlWGREZETMRGREYETIRGBEXETERFxEWETARFhEVES8RFREUES4RFBETES0RExESESwREhERESsREREQESoREA8RKQ8OESgOdQKEDREnDQwRJgwLESULChEkCgkRIwkIESIIBxEhBwYRIAYFER8FBBEeBAMRHQMCERwCAREbAREa2zxXElcQXw9Qml8JdncAXMhw+gL4KCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlYVAcxSIMzJUhAAgnBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfYg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBERsg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZSEMzJUhARGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMREhETERJ5AFQRERESEREREBERERAPERAPEO8Q3hDNELwQqxCaEIkQeBBnEFYQRRA0ECMCnKv72zwRGREaERkRGBEZERgRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcQXw9soX97AvSCC5OHAKGCC5OHAKERGREaERkRGBEaERgRFxEaERcRFhEaERYRFREaERURFBEaERQRExEaERMREhEaERIREREaEREREBEaERAPERoPDhEaDg0RGg0MERoMCxEaCwoRGgoJERoJERoIBwZVQFYa2zwBERsBoSdWE1R/7ap8AcpUf+1Uf+1T/ts8WxEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA8Q7xDeEM0QvBCrEJoQiRB4EGcQVhBFEDRBMH0BSlPboCShcCHC/5UwUe6hDpEx4lXA2zxSFKBRE6gBqQQSoSHCABKoAp22AptngiMiI0IjIiMCIyIjAiLiIwIi4iLCIuIiwiKiIsIioiKCIqIigiJiIoIiYiJCImIiQiIiIkIiIiICIiIiAeIiAeqh22eK4gvh7ZQwf6YCsO1E0NQB+GPSAAGOwNs8VxoRGBEZERgRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7g+CjXCwqDCbry4ImAgwLwgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gDU1AHQ1NMP+gD6APoA03+BAQHXANQw0Ns8C9Qw0IEBAdcA1NQwERURGhEVERURGREVgYIARtP/0//T/9QB0NP/+gD6APoA+gD6APoA1DDQ+gAwEIsQihCJAEwRFREYERURFREXERURFREWERUQzRC8EKsQmhCJEHgQZxBWEEUQNAGU+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdTUVTAE0VUC2zyEA+4zcFRwAI0IYAI0NRYDNjwlSK+fAOQp6YyvaSpkpHENbdnyVNn6+eOmvCF/IXGCOAVrx14tYxAAAIIQO5rKAIIYnVFonByCMA7aXSPpJLYFgjAN4Lazp2QAAIIwCxorwuxQAAAnghnRqUogAIIYBKgXyABTInqIiIWXpQEU/wD0pBP0vPLIC4YCAWKHlgICzIiLAgHUiYoAwwgxwCSXwTgAdDTAwFxsJUTXwPwC+D6QPpAMfoAMXHXIfoAMfoAMHOptAAC0x+CEA+KfqVSILqVMTRZ8AjgghAXjUUZUiC6ljFERAPwCeA1ghBZXwe8upNZ8ArgXwSED/LwgABE+kQwcLry4U2ACAUiMkwIBII2PAfEA9M/+gD6QCHwAe1E0PoA+kD6QNQwUTahUirHBfLiwSjC//LiwlQ0QnBUIBNUFAPIUAT6AljPFgHPFszJIsjLARL0APQAywDJIPkAcHTIywLKB8v/ydAE+kD0BDH6ACDXScIA8uLEd4AYyMsFUAjPFnD6AhfLaxPMgjgCughAXjUUZyMsfGcs/UAf6AiLPFlAGzxYl+gJQA88WyVAFzCORcpFx4lAIqBOgggjk4cCqAIIImJaAoKAUvPLixQTJgED7ABAjyFAE+gJYzxYBzxbMye1UA/c7UTQ+gD6QPpA1DAI0z/6AFFRoAX6QPpAU1vHBVRzbXBUIBNUFAPIUAT6AljPFgHPFszJIsjLARL0APQAywDJ+QBwdMjLAsoHy//J0FANxwUcsfLiwwr6AFGooYIImJaAggiYloAStgihggjk4cCgGKEn4w8l1wsBwwAjgkJGSAHBSeaAYoYIQc2LQnMjLH1Iwyz9Y+gJQB88WUAfPFslxgBDIywUkzxZQBvoCFctqFMzJcfsAECQQIwAOEEkQODdfBAB2wgCwjiGCENUydttwgBDIywVQCM8WUAT6AhbLahLLHxLLP8ly+wCTNWwh4gPIUAT6AljPFgHPFszJ7VQCASCUlQDbO1E0PoA+kD6QNQwB9M/+gD6QDBRUaFSSccF8uLBJ8L/8uLCggjk4cCqABagFrzy4sOCEHvdl97Iyx8Vyz9QA/oCIs8WAc8WyXGAGMjLBSTPFnD6AstqzMmAQPsAQBPIUAT6AljPFgHPFszJ7VSAAgyAINch7UTQ+gD6QPpA1DAE0x+CEBeNRRlSILqCEHvdl94TuhKx8uLF0z8x+gAwE6BQI8hQBPoCWM8WAc8WzMntVIAAboPYF2omh9AH0gfSBqGEBFP8A9KQT9LzyyAuYAgFimaICAsyaoQH12QY4BJL4HwAOhpgYC42EkvgfB9IH0gGP0AGLjrkP0AGP0AGDnU2gABaY/pn/aiaH0AfSBqahhACqk4XUcZmpqbGyiaY4L5cCSBfSB9AGoYEGhAMGuQ/QAYEogaKCF4BIpQKBnkKAJ9ASxni2ZmZPaqcEEIPe7L7yk4XUmwT0juA2NzcB+gD6QPgoVBIGcFQgE1QUA8hQBPoCWM8WAc8WzMkiyMsBEvQA9ADLAMn5AHB0yMsCygfL/8nQUAbHBfLgSqEDRUXIUAT6AljPFszMye1UAfpAMCDXCwHDAJFb4w3gghAsdrlzUnC64wI1NzcjwAPjAjUCwAScnZ+gAD6CENUydttwgBDIywVQA88WIvoCEstqyx/LP8mAQvsAAf42XwOCCJiWgBWgFbzy4EsC+kDTADCVyCHPFsmRbeKCENFzVABwgBjIywVQBc8WJPoCFMtqE8sfFMs/I/pEMHC6jjP4KEQDcFQgE1QUA8hQBPoCWM8WAc8WzMkiyMsBEvQA9ADLAMn5AHB0yMsCygfL/8nQzxaWbCJwAcsB4vQAngAKyYBA+wAANDNQNccF8uBJA/pAMFnIUAT6AljPFszMye1UAEKOGFEkxwXy4EnUMEMAyFAE+gJYzxbMzMntVOBfBYQP8vAAk7PwUIgG4KhAJqgoB5CgCfQEsZ4sA54tmZJFkZYCJegB6AGWAZJB8gDg6ZGWBZQPl/+ToO8AMZGWCrGeLKAJ9AQnltYlmZmS4/YBAgN6YKOkAH2tvPaiaH0AfSBqahg2GPwUALgqEAmqCgHkKAJ9ASxniwDni2ZkkWRlgIl6AHoAZYBk/IA4OmRlgWUD5f/k6EAAH68W9qJofQB9IGpqGD+qkEAAWBERERkRERESERgREhESERcREhEQERYREBESERUREhERERQREV4/ERAREREQAvQoVhRWEFYQVhBWEFYQVhBWEFYQVhBWEFYQ2zwRGREaERkRGBEaERgRFxEaERcRFhEaERYRFREaERURFBEaERQRExEaERMREhEaERIREREaEREREBEaERAPERoPDhEaDg0RGg0MERoMCxEaCwoRGgoJERoJERoIBwZVQKepASqBPRFT7bvy9Ns8UgOgUhOoWKkEoaWoABBfB2wiAqACoQHGVhrbPAERGwGhERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQDxDvEN4QzRC8EKsQmhCJEHgQZxBWEEUQNEEwqgAOI6iBA+ipBPOApUY=');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initMempumpMaster_init_args({ $$type: 'MempumpMaster_init_args', owner, creator, content, unwrappedContent })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const MempumpMaster_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
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
    3155: { message: `Airdrop amount exceeds limits` },
    4429: { message: `Invalid sender` },
    9796: { message: `amount < 0` },
    15633: { message: `Can't sell more then bondingCurveSupply` },
    15771: { message: `Not enough gas for deploy` },
    25462: { message: `Not enough gas for burn` },
    31160: { message: `Not enough gas for minting bonding curve supply` },
    34806: { message: `bondingCurveBalance <= 0` },
    35805: { message: `tradeStatus != tradeStatusBondingCurve` },
    39154: { message: `msg.amount > myBalance()` },
    39286: { message: `totalSupply < 0` },
    40187: { message: `Can't burn, bacause tradeStatus == tradeStatusDepositLiquidity` },
    43160: { message: `tradeStatus != tradeStatusDepositLiquidity` },
    48856: { message: `Not enough gas for buy` },
    57814: { message: `Not enough gas to send to pool` },
    62249: { message: `tradeStatus != tradeStatusDedust` },
    62282: { message: `Amount > Comission balance` },
}

const MempumpMaster_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TokenTransfer","header":260734629,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"TokenTransferInternal","header":395134233,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"TokenNotification","header":1935855772,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"TokenBurn","header":1499400124,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TokenBurnNotification","header":2078119902,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"TokenExcesses","header":3576854235,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"TokenUpdateContent","header":2937889386,"fields":[{"name":"content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"CollectCommission","header":594127348,"fields":[]},
    {"name":"ProvideWalletAddress","header":745978227,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"includeAddress","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"TakeWalletAddress","header":3513996288,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"walletAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"ownerAddress","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"MintAnother","header":21,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"address","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"message","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"ChangeJettonOwner","header":3,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"CurveParams","header":null,"fields":[{"name":"mathScale","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"coinScale","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"virtualTON","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"virtualJetton","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"maxSupply","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"curveJettonStock","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"curveJettonSold","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"maxTonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"dexFeeAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"airdropAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"airdropMinted","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"BondingCurveBuyReturn","header":null,"fields":[{"name":"jettonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"remainingTonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"isBondingCurveFull","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"VirtualReserves","header":null,"fields":[{"name":"virtualTonReserve","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"virtualJettonReserve","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"DeployEvent","header":964548351,"fields":[{"name":"from","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"DeployAndBuyEvent","header":2776048961,"fields":[{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"inputTonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"jettonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"feeTonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"bondingCurveOverflow","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"BuyEvent","header":2216914818,"fields":[{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"inputTonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"jettonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"feeTonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"bondingCurveOverflow","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"SellEvent","header":1787886933,"fields":[{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"tonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"jettonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"feeTonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"UnwrapEvent","header":758454395,"fields":[{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"DepositLiquidityEvent","header":3903820933,"fields":[{"name":"tonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"jettonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"feeTonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"NewTradeStatusEvent","header":4225975404,"fields":[{"name":"oldTradeStatus","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"newTradeStatus","type":{"kind":"simple","type":"uint","optional":false,"format":16}}]},
    {"name":"JettonData","header":null,"fields":[{"name":"totalSupply","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"walletCode","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"FomoData","header":null,"fields":[{"name":"tradeStatus","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"curveBalance","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"commissionBalance","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"commissionTotal","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"commission","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"curve","type":{"kind":"simple","type":"CurveParams","optional":false}},{"name":"price","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"jettonsInStock","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"maxSupply","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Buy","header":1876860589,"fields":[{"name":"doBuy","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"WithdrawCommission","header":500070842,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"DepositLiquidity","header":14184552,"fields":[{"name":"tonVault","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonVault","type":{"kind":"simple","type":"address","optional":false}},{"name":"tonVaultPayload","type":{"kind":"simple","type":"cell","optional":false}},{"name":"jettonVaultPayload","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"MintAirdrop","header":2836452725,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SetTradeStatus","header":2814722558,"fields":[{"name":"newTradeStatus","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"WithdrawByOwner","header":3334857217,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"MintByOwner","header":4143400398,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SendByOwner","header":4157949314,"fields":[{"name":"parameters","type":{"kind":"simple","type":"SendParameters","optional":false}}]},
    {"name":"DeployUnwrapped","header":1362863405,"fields":[]},
    {"name":"MintUnwrappedSupply","header":312072381,"fields":[]},
    {"name":"RevokeUnwrappedOwnership","header":2802272535,"fields":[]},
]

const MempumpMaster_getters: ABIGetter[] = [
    {"name":"calculateCommission","arguments":[{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"unwrappedAddress","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"creatorAddress","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"get_jetton_data","arguments":[],"returnType":{"kind":"simple","type":"JettonData","optional":false}},
    {"name":"get_wallet_address","arguments":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"get_unwrapped_wallet_address","arguments":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"get_fomo_data","arguments":[],"returnType":{"kind":"simple","type":"FomoData","optional":false}},
    {"name":"getBuyAmount","arguments":[{"name":"tonSpent","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getSellAmount","arguments":[{"name":"jettonAmount","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

export const MempumpMaster_getterMapping: { [key: string]: string } = {
    'calculateCommission': 'getCalculateCommission',
    'unwrappedAddress': 'getUnwrappedAddress',
    'creatorAddress': 'getCreatorAddress',
    'get_jetton_data': 'getGetJettonData',
    'get_wallet_address': 'getGetWalletAddress',
    'get_unwrapped_wallet_address': 'getGetUnwrappedWalletAddress',
    'get_fomo_data': 'getGetFomoData',
    'getBuyAmount': 'getGetBuyAmount',
    'getSellAmount': 'getGetSellAmount',
    'owner': 'getOwner',
}

const MempumpMaster_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"text","text":"Deploy"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TokenUpdateContent"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TokenBurnNotification"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Buy"}},
    {"receiver":"internal","message":{"kind":"typed","type":"WithdrawCommission"}},
    {"receiver":"internal","message":{"kind":"typed","type":"DepositLiquidity"}},
    {"receiver":"internal","message":{"kind":"typed","type":"MintAirdrop"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetTradeStatus"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ProvideWalletAddress"}},
    {"receiver":"internal","message":{"kind":"typed","type":"WithdrawByOwner"}},
    {"receiver":"internal","message":{"kind":"typed","type":"MintByOwner"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TokenExcesses"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TokenNotification"}},
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SendByOwner"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RevokeUnwrappedOwnership"}},
    {"receiver":"internal","message":{"kind":"typed","type":"DeployUnwrapped"}},
    {"receiver":"internal","message":{"kind":"typed","type":"MintUnwrappedSupply"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeOwner"}},
]

export class MempumpMaster implements Contract {
    
    static async init(owner: Address, creator: Address, content: Cell, unwrappedContent: Cell) {
        return await MempumpMaster_init(owner, creator, content, unwrappedContent);
    }
    
    static async fromInit(owner: Address, creator: Address, content: Cell, unwrappedContent: Cell) {
        const init = await MempumpMaster_init(owner, creator, content, unwrappedContent);
        const address = contractAddress(0, init);
        return new MempumpMaster(address, init);
    }
    
    static fromAddress(address: Address) {
        return new MempumpMaster(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  MempumpMaster_types,
        getters: MempumpMaster_getters,
        receivers: MempumpMaster_receivers,
        errors: MempumpMaster_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: 'Deploy' | TokenUpdateContent | TokenBurnNotification | Buy | WithdrawCommission | DepositLiquidity | MintAirdrop | SetTradeStatus | ProvideWalletAddress | WithdrawByOwner | MintByOwner | TokenExcesses | TokenNotification | null | SendByOwner | RevokeUnwrappedOwnership | DeployUnwrapped | MintUnwrappedSupply | ChangeOwner) {
        
        let body: Cell | null = null;
        if (message === 'Deploy') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenUpdateContent') {
            body = beginCell().store(storeTokenUpdateContent(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenBurnNotification') {
            body = beginCell().store(storeTokenBurnNotification(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Buy') {
            body = beginCell().store(storeBuy(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawCommission') {
            body = beginCell().store(storeWithdrawCommission(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DepositLiquidity') {
            body = beginCell().store(storeDepositLiquidity(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'MintAirdrop') {
            body = beginCell().store(storeMintAirdrop(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetTradeStatus') {
            body = beginCell().store(storeSetTradeStatus(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ProvideWalletAddress') {
            body = beginCell().store(storeProvideWalletAddress(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawByOwner') {
            body = beginCell().store(storeWithdrawByOwner(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'MintByOwner') {
            body = beginCell().store(storeMintByOwner(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenExcesses') {
            body = beginCell().store(storeTokenExcesses(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenNotification') {
            body = beginCell().store(storeTokenNotification(message)).endCell();
        }
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SendByOwner') {
            body = beginCell().store(storeSendByOwner(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RevokeUnwrappedOwnership') {
            body = beginCell().store(storeRevokeUnwrappedOwnership(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DeployUnwrapped') {
            body = beginCell().store(storeDeployUnwrapped(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'MintUnwrappedSupply') {
            body = beginCell().store(storeMintUnwrappedSupply(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeOwner') {
            body = beginCell().store(storeChangeOwner(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getCalculateCommission(provider: ContractProvider, value: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(value);
        let source = (await provider.get('calculateCommission', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getUnwrappedAddress(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('unwrappedAddress', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getCreatorAddress(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('creatorAddress', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getGetJettonData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_jetton_data', builder.build())).stack;
        const result = loadGetterTupleJettonData(source);
        return result;
    }
    
    async getGetWalletAddress(provider: ContractProvider, owner: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(owner);
        let source = (await provider.get('get_wallet_address', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getGetUnwrappedWalletAddress(provider: ContractProvider, owner: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(owner);
        let source = (await provider.get('get_unwrapped_wallet_address', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getGetFomoData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_fomo_data', builder.build())).stack;
        const result = loadGetterTupleFomoData(source);
        return result;
    }
    
    async getGetBuyAmount(provider: ContractProvider, tonSpent: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(tonSpent);
        let source = (await provider.get('getBuyAmount', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetSellAmount(provider: ContractProvider, jettonAmount: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(jettonAmount);
        let source = (await provider.get('getSellAmount', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}