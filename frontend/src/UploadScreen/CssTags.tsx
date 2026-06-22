import styled from 'styled-components'

// アップロード部分
export const UploadArea = styled.div`
    border: 2px dashed #ccc;
    padding: 20px;
    text-align: center;
    line-height: 100px;
    position: relative;
    height: 200px;
`;

// アップロード部分のinput
export const UploadAreaInput = styled.input`
    position: absolute;
    inset: 0px;
    opacity: 0;
`

// ファイル表示部分
export const UploadedFilesArea = styled.div`
    margin: 20px;
`

// ファイル表示部分
export const UploadedFilesPart = styled.div`
    display: flex;
    flex-direction: column;
`

// ファイル
export const UploadedFile = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f0f0f0;
    padding: 8px 12px;
    border-radius:4px;
`

// ファイル削除ボタン
export const FileDeleteButton = styled.button`
    background-color: #ff4d4f;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 4px 8px;
    cursor: pointer;
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
`

// クイズタイプ選択ボタン
interface SelectQuizTypeButtonProps{
    isActive: boolean;
}
export const SelectQuizTypeButton = styled.button<SelectQuizTypeButtonProps>`
    background-color: ${(props) => props.isActive ? 'rgba(0,0,255,0.3)' : '#EEE'};
    border-color: ${(props) => props.isActive ? 'rgba(0,0,255,0.8)' : '#EEE'};
    border-radius: 0px;
    height: 80px;
`

// クイズタイプ選択ボタンの文字
export const SelectQuizTypeButtonText = styled.span`
    font-size: 10px;
    color: #555;
`

// クイズ作成ボタン
interface MakeQuizButtonProps{
    isActive: boolean;
}
export const MakeQuizButton = styled.button<MakeQuizButtonProps>`
    padding: 10px 20px;
    margin: 10px;
    font-size: 16px;
    font-weight: bold;
    cursor: ${(props) => props.isActive ? 'pointer' : 'not-allowed'};
    background-color: ${(props) => props.isActive ? '#fff' : '#adb5bd'};
    border: ${(props) => props.isActive ? '2px solid rgba(0,123,255,0.5)' : 'none'};
    border-radius: 6px;
    box-shadow: ${(props) => props.isActive ? '0 4px 6px rgba(0,0,0,0.2)' : 'none'};
    transition: all 0.3s;
`