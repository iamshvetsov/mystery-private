import { useState } from 'react';
import { Address } from '@ton/core';
import { useTonClient } from './useTonClient';
import { useTonConnect } from './useTonConnect';

export function useWalletBalance() {
    const { client } = useTonClient();
    const { wallet } = useTonConnect();

    const [walletBalance, setWalletBalance] = useState<bigint>(0n);

    if (client && wallet) {
        client?.getBalance(Address.parse(wallet!)).then((balance) => setWalletBalance(balance));
    }

    return walletBalance;
}
