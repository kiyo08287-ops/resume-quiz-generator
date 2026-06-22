import styled from 'styled-components'

// ローディング画面全体
export const LoadingArea = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    backdrop-filter: blur(3px);
`;

// 背景の白のボックス
export const LoadingBackground = styled.div`
    background-color: #ffffff;
    padding: 30px 40px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    text-align: center;
    min-width: 260px;
`

// 大文字
export const LoadingText1 = styled.div`
    margin: 0;
    font-size: 16px;
    font-weight: bold;
    color: #333;
`

// 小文字
export const LoadingText2 = styled.div`
    margin: 8px 0 0 0;
    font-size: 13px;
    color: #666;
`