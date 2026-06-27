import React from 'react'
import {type QuizItem} from '../types'
import {QuizArea,QuizNumText,QuizCorrectNumText,Question,QuizAnswerButton,QuizAnswerText,CheckAnsArea,ButtonArea,BackToUploadButton,NextButton} from './CssTags'


interface QuizScreenProps{
    quizes:QuizItem[];
    quizIndex:number;
    correctNum:number;
    selected: number | null;
    onSelectAnswer: (selectedIndex: number) => void;
    onAnswerSubmit: (selectIndex: number) => void;
    onBackToUpload: () => void;
    onNextQuiz: () => void;
    onShowResult: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
    quizes,
    quizIndex,
    correctNum,
    selected,
    onSelectAnswer,
    onAnswerSubmit,
    onBackToUpload,
    onNextQuiz,
    onShowResult,
}) => {
    return(
        <div>
          {/* クイズ画面 */}
          <QuizArea>
            <QuizNumText>第{quizIndex+1}問</QuizNumText>
            <QuizCorrectNumText>正解数:{correctNum}</QuizCorrectNumText>
            <br />
            <Question>
              {quizes[quizIndex].question}
            </Question>
              {quizes[quizIndex].choices.map((choice,index) => {
                const isSelected = selected === index;
                return (
                  <QuizAnswerButton key={index} onClick={()=> {onSelectAnswer(index);onAnswerSubmit(index);}} disabled={selected != null} isSelected={isSelected} selected={selected==null}>
                    <QuizAnswerText>
                      {index+1}. 
                    </QuizAnswerText>
                    {choice}
                  </QuizAnswerButton>
                );
              })}

              {/* 答え合わせ画面 */}
              {selected!=null && (
                <CheckAnsArea isCorrect={selected === quizes[quizIndex].correctIndex}>
                  {selected === quizes[quizIndex].correctIndex ? '正解!' : '不正解　正解は'+(quizes[quizIndex].correctIndex+1)+'. '+ quizes[quizIndex].choices[quizes[quizIndex].correctIndex]+'です'}
                  <br />
                  <span>
                    {quizes[quizIndex].description}
                  </span>
                </CheckAnsArea>
              )}
          </QuizArea>
          {/* ボタン配置部分 */}
          <ButtonArea>
            <BackToUploadButton onClick={onBackToUpload}>
              アップロード画面に戻る
            </BackToUploadButton>
            {quizIndex+1 == quizes.length && (
              <NextButton onClick={onShowResult} disabled={selected==null} isActive={selected!=null}>
              結果を表示
            </NextButton>
            )}
            {quizIndex+1 != quizes.length && (
              <NextButton onClick={onNextQuiz} disabled={selected==null} isActive={selected!=null}>
              次の問題へ
            </NextButton>
            )}
          </ButtonArea>
        </div>
    )
}