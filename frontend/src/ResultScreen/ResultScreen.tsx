import React from 'react'
import {ResultTable, ResultButton} from './CssTags'

interface ResultScreenProps{
    quizes: any[];
    correctNum: number;
    onBackToUpload: () => void;
    onMoreQuiz: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
    quizes,
    correctNum,
    onBackToUpload,
    onMoreQuiz,
}) => {
    return (
        <div>
          <h3>結果</h3>
          <h5>{quizes.length}問中 {correctNum}問正解!</h5>
          <ResultTable>
            <thead>
              <tr>
              <th>問題文</th>
              <th>あなたの選択</th>
              <th>正解の選択</th>
              <th>結果</th>
            </tr>
            </thead>
            <tbody>
              {quizes.map((quiz,index) => {
                return(
                  <tr key={index}>
                    <td>{quiz.question}</td>
                    <td>{quiz.user_select+1}. {quiz.choices[quiz.user_select]}</td>
                    <td>{quiz.correctIndex+1}. {quiz.choices[quiz.correctIndex]}</td>
                    <td>{quiz.user_select == quiz.correctIndex ? '○' : '×'}</td>
                  </tr>
                )
              })}
            </tbody>
          </ResultTable>
          <div>
            <ResultButton onClick={onBackToUpload}>アップロード画面に戻る</ResultButton>
            <ResultButton onClick={onMoreQuiz}>さらに5問解く</ResultButton>
          </div>
        </div>
    )
}