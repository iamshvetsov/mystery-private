import { createGlobalStyle, styled } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    body {
        background-color: black;
    }

    #root {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow-y: auto;
        padding-bottom: 72px;
    }
`;

export const Header = styled.header`
    display: flex;
    justify-content: end;
    margin: 36px;
`;

export const Banner = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: monospace;
`;

export const Image = styled.img`
    height: 100px;
    width: 100px;
    border-radius: 50%;
`;

export const Control = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 36px;
`;

export const Error = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: monospace;
    color: red;
    margin-top: -36px;
    margin-bottom: 36px;
`;
