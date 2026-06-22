import styled from 'styled-components'

// クイズ部分
export const QuizArea = styled.div`
    border: 1px solid #dee2e6;
    padding: 35px 20px 20px 20px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    background-color: #fff;
`

// 第○問の文字
export const QuizNumText = styled.span`
    position: absolute;
    top: 10px;
    left: 15px;
    font-size:13px;
    font-weight: bold;
    color: #007bff;
    background-color: #e6f7ff;
    padding: 2px 8px;
    border-radius: 4px;
`

// 正解数○問の文字
export const QuizCorrectNumText = styled.span`
    position: absolute;
    top: 10px;
    right: 15px;
    font-size:13px;
    font-weight: bold;
    color: #28a745;
    background-color: #e2f0d9;
    padding: 2px 8px;
    border-radius: 4px;
`

// 問題文
export const Question = styled.p`
    font-size: 18px;
    font-weight: bold;
    margin-top: 10px;
    color: #333;
`

// クイズの選択ボタン(回答ボタン)
interface QuizAnswerButtonProps{
    isSelected: boolean;
    selected: boolean;
}
export const QuizAnswerButton = styled.button<QuizAnswerButtonProps>`
    padding: 16px 20px;
    text-align: left;
    font-size: 16px;
    cursor: ${(props) => props.selected ? 'pointer' : 'default'};
    background-color: ${(props) => props.isSelected ? '#e6f7ff' : '#ffffff'};
    border: ${(props) => props.isSelected ? '1px solid #1890ff' : '1px solid #dee2e6'};
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    transition: all 0.2s;
    font-weight: ${(props) => props.isSelected ? 'bold' : 'normal'};
    color: ${(props) => props.isSelected ? '#1890ff' : '#495057'};
`

// クイズの選択ボタンの文字
export const QuizAnswerText = styled.span`
    margin-right: 10px;
    font-weight: bold;
`

// 答え合わせ画面
interface CheckAnsAreaProps{
    isCorrect : boolean;
}
export const CheckAnsArea = styled.div<CheckAnsAreaProps>`
    margin-top: 15px;
    padding: 15px;
    border-radius: 6px;
    background-color: ${(props) => props.isCorrect ? '#e2f0d9' : '#fce8e6'};
    color: ${(props) => props.isCorrect ? '#2b5115' : '#a71d2a'};
    font-weight: bold;
`

export const ButtonArea = styled.div`
    display: flex;
    justify-content: center;
    gap: 15px;
    margin: 0 20px;
`

// アップロード画面に戻るボタン
export const BackToUploadButton = styled.button`
    padding: 10px 20px;
    margin: 10px;
    font-size: 16px;
    cursor: pointer;
    font-weight: bold;
    background-color: #ffffff;
    color: #595959;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    transition: all 0.3s;
    flex: 1;
`

// 次の問題を表示するボタン、結果表示ボタン
interface NextButtonProps{
    isActive: boolean;
}
export const NextButton = styled.button<NextButtonProps>`
    padding: 10px 20px;
    margin: 10px;
    font-size: 16px;
    font-weight: bold;
    cursor: ${(props) => props.isActive ? 'pointer' : 'not-allowed'};
    background-color: ${(props) => props.isActive ? '#007bff' : '#f5f5f5'};
    color: ${(props) => props.isActive ? '#ffffff' : '#bfbfbf'};
    border: ${(props) => props.isActive ? 'none' : '1px solid #d9d9d9'};
    border-radius: 6px;
    box-shadow: ${(props) => props.isActive ? '0 4px 6px rgba(0,123,255,0.15)' : 'none'};
    transition: all 0.3s;
    flex: 1;
`