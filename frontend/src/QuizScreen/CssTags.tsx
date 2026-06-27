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
    padding: 18px 24px;
    text-align: left;
    font-size: 16px;
    border-radius: 10px;
    transition: all 0.2s cubic-bezier(0.25, 0.8,0.25,1);
    font-width: 500;
    cursor: ${(props) => props.selected ? 'pointer' : 'default'};
    background-color: ${(props) => props.isSelected ? '#e6f7ff' : '#ffffff'};
    border: 2px solid ${(props) => props.isSelected ? '#1890ff' : '#e9ecef'};
    color: ${(props) => props.isSelected ? '#1890ff' : '#495057'};
    box-shadow: 0 2px 6px rgba(0,0,0,0.02);
    font-weight: ${(props) => props.isSelected ? 'bold' : 'normal'};

    &:hover {
        ${(props) => props.selected && `
            border-color: #007bff;
            background-color: #f8f9fa;
            transform: translateX(4px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        `}
    }
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
    margin-top: 25px;
    padding: 20px;
    border-radius: 10px;
    line-height: 1.6;
    font-size: 15px;
    animation: fadeInUp 0.3s ease;
    background-color: ${(props) => props.isCorrect ? '#f6ffed' : '#fff1f0'};
    border: 1px solid ${(props) => props.isCorrect ? '#b7eb8f' : '#ffa39e'};
    color: ${(props) => props.isCorrect ? '#237804' : '#a8071a'};

    &::first-line {
        font-size: 18px;
        font-weight: bold;
        line-height: 2.2;
    }

    span {
        display: block;
        margin-top: 10px;
        color: #555;
        font-weight: normal;
    }

    color: #495057; 
    font-weight: normal;

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`

// 戻るボタンと次に進むボタンの部分
export const ButtonArea = styled.div`
    display: flex;
    justify-content: center;
    gap: 15px;
    margin: 0 20px;
`

// アップロード画面に戻るボタン
export const BackToUploadButton = styled.button`
    padding: 14px 28px;
    margin: 15px 0;
    font-size: 15px;
    cursor: pointer;
    font-weight: bold;
    background-color: #ffffff;
    color: #6c757d;
    border: 1px solid #ced4da;
    border-radius: 30px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
    transition: all 0.2s ease;
    flex: 1;

    &:hover {
        background-color: #f8f9fa;
        color: #495057;
        border-color: #adb5bd;
    }

    &:active {
        transform: scale(0.98);
    }
`

// 次の問題を表示するボタン、結果表示ボタン
interface NextButtonProps{
    isActive: boolean;
}
export const NextButton = styled.button<NextButtonProps>`
    padding: 14px 28px;
    margin: 15px 0;
    font-size: 15px;
    font-weight: bold;
    border-radius: 30px;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    flex: 1;
    border: none;
    cursor: ${(props) => props.isActive ? 'pointer' : 'not-allowed'};
    background: ${(props) => props.isActive ? 'linear-gradient(135deg, #28a745 0%, #1e7e34 100%)' : '#e9ecef'};
    color: ${(props) => props.isActive ? '#ffffff' : '#bfbfbf'};
    box-shadow: ${(props) => props.isActive ? '0 4px 12px rgba(40, 167, 69, 0.3)' : 'none'};

    &:hover {
        ${(props) => props.isActive && `
            transform: translateY(-2px);
            box-shadow: 0 6px 18px rgba(40, 167, 69, 0.5);
            filter: brightness(1.05);
        `}
    }

    &:active {
        ${(props) => props.isActive && `
            transform: translateY(1px);
            box-shadow: 0 3px 6px rgba(40, 167, 69, 0.3);
        `}
    }
`