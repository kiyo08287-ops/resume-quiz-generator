import React from 'react'
import {type QuizItem} from '../types'
import {ResultTitle,ResultStatus,ResultTable, ResultButton,StatusText,ButtonArea} from './CssTags'

interface ResultScreenProps{
    quizes: QuizItem[];
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
          <ResultTitle>結果</ResultTitle>
          <ResultStatus>{quizes.length}問中 <span>{correctNum}</span> 問正解!</ResultStatus>
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
                const isCorrect = quiz.user_select === quiz.correctIndex;
                return(
                  <tr key={index}>
                    <td style={{fontWeight:'bold',width:'40%'}}>{quiz.question}</td>
                    <td style={{color:isCorrect ? '#333' : '#dc3545'}}>{quiz.user_select!==undefined && quiz.user_select!==null ? `${quiz.user_select+1}. ${quiz.choices[quiz.user_select]}` : '未回答'}</td>
                    <td>{quiz.correctIndex+1}. {quiz.choices[quiz.correctIndex]}</td>
                    <StatusText isCorrect={isCorrect}>{isCorrect ? '○正解' :  '×不正解'}</StatusText>
                  </tr>
                )
              })}
            </tbody>
          </ResultTable>
          <ButtonArea>
            <ResultButton onClick={onBackToUpload}>アップロード画面に戻る</ResultButton>
            <ResultButton onClick={onMoreQuiz}>さらに5問解く</ResultButton>
          </ButtonArea>
        </div>
    )
}