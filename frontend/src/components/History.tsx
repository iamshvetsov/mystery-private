import { FC, memo } from 'react';
import { Cell, Info, Avatar } from '@telegram-apps/telegram-ui';
import { Banner } from './styled';
import { PositionUnionType } from '../types';

type HistoryProps = {
    positions: PositionUnionType[];
    positionsIsLoading: boolean;
};

const History: FC<HistoryProps> = ({ positions, positionsIsLoading }) => {
    if (positionsIsLoading) return <Banner>History is loading</Banner>;

    return (
        <>
            {positions.length ? (
                positions.map(({ seqno, entryPrice, amount, status, closePrice, asset }) => (
                    <Cell
                        key={seqno}
                        after={
                            <Info subtitle={status} type="text">
                                {`Entry price: $${entryPrice} / Closed price: $${closePrice}`}
                            </Info>
                        }
                        before={<Avatar size={48} src={asset.imageUrl} />}
                        subtitle={`PNL: ${((Number(entryPrice) / Number(asset.dexPriceUsd)) * 100 - 100).toFixed(2)}%`}
                    >
                        {`${amount} ${asset.displayName}`}
                    </Cell>
                ))
            ) : (
                <Banner>There are no closed positions</Banner>
            )}
        </>
    );
};

export default memo(History);
