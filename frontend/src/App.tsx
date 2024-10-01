import { FC, useState, useEffect } from 'react';
import { CHAIN, TonConnectButton } from '@tonconnect/ui-react';
import { Tabbar } from '@telegram-apps/telegram-ui';
import { GrMoney, GrLineChart, GrHistory } from 'react-icons/gr';
import { useTonConnect } from './hooks/useTonConnect';
import { useAssets } from './hooks/useAssets';
import { usePositionsContract } from './hooks/usePositionsContract';
import { GlobalStyle, Header, Banner } from './components/styled';
import Assets from './components/Assets';
import Positions from './components/Positions';
import History from './components/History';
import { Tabs, PositionUnionType, PositionStatuses } from './types';
import '@twa-dev/sdk';

const TABS = [
    {
        id: Tabs.Assets,
        text: Tabs.Assets,
        Icon: () => <GrMoney size={32} />
    },
    {
        id: Tabs.Positions,
        text: Tabs.Positions,
        Icon: () => <GrLineChart size={32} />
    },
    {
        id: Tabs.History,
        text: Tabs.History,
        Icon: () => <GrHistory size={32} />
    }
];

const LIQUIDATION_THRESHOLD = 0.95;

const App: FC = () => {
    const { network } = useTonConnect();
    const { assets } = useAssets();

    const [currentTab, setCurrentTab] = useState<Tabs>(Tabs.Assets);
    const [openedPositions, setOpenedPositions] = useState<PositionUnionType[]>([] as PositionUnionType[]);
    const [closedPositions, setClosedPositions] = useState<PositionUnionType[]>([] as PositionUnionType[]);

    const { positions, positionsIsLoading, liquidatePosition } = usePositionsContract();

    useEffect(() => {
        const filteredOpenedPositions = positions.filter(({ status }) => status === PositionStatuses.Open);
        const matchedOpenedPositions = [];

        for (let { token, ...restPosition } of filteredOpenedPositions) {
            const asset = assets.find(({ contractAddress }) => contractAddress === token);

            if (Number(asset?.dexPriceUsd) / Number(restPosition.liquidationPrice) > LIQUIDATION_THRESHOLD) {
                liquidatePosition({ seqno: restPosition.seqno, markPrice: restPosition.liquidationPrice });
            } else matchedOpenedPositions.push({ ...restPosition, asset });
        }

        setOpenedPositions(matchedOpenedPositions as PositionUnionType[]);

        const filteredClosedPositions = positions.filter(({ status }) => status !== PositionStatuses.Open);
        const matchedClosedPositions = filteredClosedPositions.map(({ token, ...restPosition }) => {
            const asset = assets.find(({ contractAddress }) => contractAddress === token);

            return { ...restPosition, asset };
        });

        setClosedPositions(matchedClosedPositions as PositionUnionType[]);
    }, [assets, positions]);

    return (
        <>
            <Header>
                <TonConnectButton />
            </Header>
            {network === CHAIN.TESTNET ? (
                <>
                    {currentTab === Tabs.Assets && <Assets assets={assets} />}
                    {currentTab === Tabs.Positions && (
                        <Positions positions={openedPositions} positionsIsLoading={positionsIsLoading} />
                    )}
                    {currentTab === Tabs.History && (
                        <History positions={closedPositions} positionsIsLoading={positionsIsLoading} />
                    )}
                    <Tabbar>
                        {TABS.map(({ id, text, Icon }) => (
                            <Tabbar.Item
                                key={id}
                                text={text}
                                selected={id === currentTab}
                                onClick={() => setCurrentTab(id)}
                            >
                                <Icon />
                            </Tabbar.Item>
                        ))}
                    </Tabbar>
                </>
            ) : (
                <Banner>Please connect to the Testnet</Banner>
            )}
            <GlobalStyle />
        </>
    );
};

export default App;
