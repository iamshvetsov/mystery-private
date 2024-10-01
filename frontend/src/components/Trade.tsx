import { FC, ChangeEventHandler, memo, useState, MouseEventHandler } from 'react';
import { Placeholder, Button, Input } from '@telegram-apps/telegram-ui';
import { usePositionsContract } from '../hooks/usePositionsContract';
import { Image, Control, Error } from './styled';
import { AssetType } from '../types';

type TradeProps = {
    asset: AssetType;
    seqno?: string;
};

const Trade: FC<TradeProps> = ({
    asset: { contractAddress, dexPriceUsd, decimals, displayName, symbol, imageUrl },
    seqno
}) => {
    const { openPosition, closePosition } = usePositionsContract();

    const [amount, setAmount] = useState<string>('');
    const [error, setError] = useState<string>('');

    const amountHandler: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
        setError('');
        setAmount(value);
    };

    const sendTransactionHandler: MouseEventHandler<HTMLButtonElement> = async () => {
        if (seqno) {
            await closePosition({ seqno, markPrice: dexPriceUsd });
        } else {
            try {
                await openPosition({
                    token: contractAddress,
                    entryPrice: dexPriceUsd,
                    amount,
                    liquidationPrice: Number(dexPriceUsd) * 2
                });

                setError('');
                setAmount('');
            } catch (e) {
                setError((e as Error).message);
            }
        }
    };

    return (
        <>
            <Placeholder
                description={`$${Number(dexPriceUsd).toFixed(decimals)}`}
                header={`${displayName} - ${symbol}`}
            >
                <Image src={imageUrl} />
            </Placeholder>
            <Control>
                <Button size="m" disabled={!seqno && !amount.length} onClick={sendTransactionHandler}>
                    {seqno ? 'Close Short' : 'Open Short'}
                </Button>
                {!seqno && (
                    <Input
                        type="number"
                        header="Amount"
                        placeholder="Asset amount"
                        value={amount}
                        onChange={amountHandler}
                    />
                )}
            </Control>
            {error && <Error>{error}</Error>}
        </>
    );
};

export default memo(Trade);
