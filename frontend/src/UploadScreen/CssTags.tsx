import styled from 'styled-components'

// アップロード部分
interface UploadAreaProps{
    isActive: boolean;
}
export const UploadArea = styled.div<UploadAreaProps>`
    border: 2px dashed ${(props) => props.isActive ? '#007bff' : '#ccc'};
    background-color: ${(props) => props.isActive ? '#e6f7ff' : '#ffffff'};
    padding: 20px;
    text-align: center;
    line-height: 100px;
    position: relative;
    height: 200px;
    border-radius: 12px;
    transition : all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    p{
        line-height: 1.5;
        color: ${(props) => props.isActive ? '#007bff' : '#666'};
        font-weight: ${(props) => props.isActive ? 'bold' : 'normal'};
    }
`;

// アップロード部分のinput
export const UploadAreaInput = styled.input`
    position: absolute;
    inset: 0px;
    opacity: 0;
`

// ファイル表示部分
export const UploadedFilesArea = styled.div`
    margin: 30px auto;
    max-width: 600px;

    p{
        font-size: 14px;
        font-weight: bold;
        color: #495057;
        margin-bottom: 12px;
    }
`

// ファイルが並ぶコンテナ部分
export const UploadedFilesPart = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

// ファイル
export const UploadedFile = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    padding: 12px 16px;
    border: 1px solid #e9ecef;
    border-radius:8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    transition: all 0.2s ease;

    span {
        font-size: 15px;
        color: #333333;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 80%;
    }
    
    &:hover{
        border-color: #dee2e6;
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }
`

// ファイル削除ボタン
export const FileDeleteButton = styled.button`
    background-color: transparent;
    color: #dc3545;
    border: 1px solid #dc3545;
    border-radius: 6px;
    padding: 6px 12px;
    font-size: 13px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background-color: #dc3545;
        color: #ffffff;
        box-shadow: 0 2px 6px rgba(220,53,69,0.3);
    }

    &:active {
        transform: scale(0.96);
    }
`

// ファイル部分のテキスト
export const UploadAreaText = styled.p`
    color: #999;
    font-size: 14px;
`

// クイズタイプ選択部分
export const SelectQuizTypeArea = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    margin: 30px 0;
`

// クイズタイプ選択ボタン
interface SelectQuizTypeButtonProps{
    isActive: boolean;
}
export const SelectQuizTypeButton = styled.button<SelectQuizTypeButtonProps>`
    flex: 1;
    max-width: 280px;
    height: auto;
    padding: 20px;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    border-radius: 10px;
    transition: all 0.25s ease;
    display: flex;
    flex-direction: column;
    align-itemns: center;
    gap: 8px;
    background-color: ${(props) => props.isActive ? '#e6f7ff' : '#ffffff'};
    color: ${(props) => props.isActive ? '#007bff' : '#495057'};
    border: 2px solid ${(props) => props.isActive ? '#007bff' : 'dee2e6'};
    box-shadow: ${(props) => props.isActive ? '0 4px 12px rgba(0,123,255,0.15)' : '0 2px 4px rgba(0,0,0,0.03)'};

    &:hover {
        border-color: #007bff;
        background-color: ${(props) => props.isActive ? '#e6f7ff' : '#f8f9fa'};
        transform: translateY(-2px);
    }
`

// クイズタイプ選択ボタンの文字
export const SelectQuizTypeButtonText = styled.span`
    font-size: 12px;
    font-weight: normal;
    color: #6c757d;
    line-height: 1.4;
`

// クイズ作成ボタン
interface MakeQuizButtonProps{
    isActive: boolean;
}
export const MakeQuizButton = styled.button<MakeQuizButtonProps>`
    display: block;
    width: 100%;
    max-width: 400px;
    margin: 40px auto 10px auto;
    padding: 16px 32px;
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 1px;
    border-radius: 30px;
    border: none;
    transition: all 0.3 cubic-bezier(0.25,0.8,0.25,1);
    
    cursor: ${(props) => props.isActive ? 'pointer' : 'not-allowed'};
    background: ${(props) => props.isActive ? 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)' : '#e9ecef'};
    color: ${(props) => props.isActive ? '#ffffff' : '#adb5bd'};
    box-shadow: ${(props) => props.isActive ? '0 4px 14px rgba(0,123,255,0.4)' : 'none'};

    &:hover{
        ${(props) => props.isActive && `
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,123,255,0.6);
            filter: brightness(1.1);
        `}
    }
    
    &:active{
        ${(props) => props.isActive && `
            transform: translateY(1px);
            box-shadow: 0 3px 8px rgba(0,123,255,0.4);
        `}
    }
`