import { FC, memo } from 'react';
import { Modal, Cell, Info, Avatar } from '@telegram-apps/telegram-ui';
import { Banner } from './styled';
import Trade from './Trade';
import { PositionUnionType } from '../types';

type PositionsProps = {
    positions: PositionUnionType[];
    positionsIsLoading: boolean;
};

const Positions: FC<PositionsProps> = ({ positions, positionsIsLoading }) => {
    if (positionsIsLoading) return <Banner>Positions is loading</Banner>;

    return (
        <>
            {positions.length ? (
                positions.map(({ seqno, entryPrice, amount, liquidationPrice, asset }) => (
                    <Modal
                        key={seqno}
                        header={<Modal.Header />}
                        trigger={
                            <Cell
                                after={
                                    <Info subtitle={`Liquidation price: $${liquidationPrice}`} type="text">
                                        {`Entry price: $${entryPrice}`}
                                    </Info>
                                }
                                before={<Avatar size={48} src={asset.imageUrl} />}
                                subtitle={`Current PNL: ${(
                                    (Number(entryPrice) / Number(asset.dexPriceUsd)) * 100 -
                                    100
                                ).toFixed(2)}%`}
                            >
                                {`${amount} ${asset.displayName}`}
                            </Cell>
                        }
                    >
                        <Trade asset={asset} seqno={seqno} />
                    </Modal>
                ))
            ) : (
                <Banner>There are no opened positions</Banner>
            )}
        </>
    );
};

export default memo(Positions);
