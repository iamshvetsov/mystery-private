import { FC, memo } from 'react';
import { Modal, Cell, Info, Avatar } from '@telegram-apps/telegram-ui';
import Trade from './Trade';
import { AssetType } from '../types';

type AssetsProps = {
    assets: AssetType[];
};

const Assets: FC<AssetsProps> = ({ assets }) => {
    return (
        <>
            {assets.map((asset) => (
                <Modal
                    key={asset.symbol}
                    header={<Modal.Header />}
                    trigger={
                        <Cell
                            after={<Info type="text">{`$${Number(asset.dexPriceUsd).toFixed(asset.decimals)}`}</Info>}
                            before={<Avatar size={48} src={asset.imageUrl} />}
                            subtitle={asset.symbol}
                        >
                            {asset.displayName}
                        </Cell>
                    }
                >
                    <Trade asset={asset} />
                </Modal>
            ))}
        </>
    );
};

export default memo(Assets);
