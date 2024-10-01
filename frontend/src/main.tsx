import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import App from './App.tsx';
import '@telegram-apps/telegram-ui/dist/styles.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <TonConnectUIProvider manifestUrl="https://iamshvetsov.github.io/mystery-private/tonconnect-manifest.json">
            <AppRoot>
                <App />
            </AppRoot>
        </TonConnectUIProvider>
    </StrictMode>
);
