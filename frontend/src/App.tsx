import React, { useState } from 'react'
import {type QuizItem} from './types'
import {AllScreen} from './CssTags'
import {QuizScreen} from './QuizScreen/QuizScreen'
import {ResultScreen} from './ResultScreen/ResultScreen'
import {UploadScreen} from './UploadScreen/UploadScreen'
import { LoadingScreen } from './LoadingScreen/LoadingScreen'
import './App.css'

function App() {

  // アップロードされたファイルを記憶する関数
  const uploadFile = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newFile = e.target.files[0];
      setUploadedFiles([...uploaded_files,newFile]);
      e.target.value = '';
    }
  }


  // ファイルを削除する関数
  const deleteFile = (RemoveIndex: number) => {
    const filteredFiles = uploaded_files.filter((_,index) => index != RemoveIndex);
    setUploadedFiles(filteredFiles);
  }


  // 回答を保存する関数
  const answer = (selectedIndex :number) => {
    const updatedQuizes = [...quizes];
    updatedQuizes[quizIndex] = {
      ...updatedQuizes[quizIndex],
      user_select: selectedIndex
    };
    setQuizes(updatedQuizes);

    if(selectedIndex == quizes[quizIndex].correctIndex){
      setCorrectNum(correctNum+1);
    }
  }


  // 6問目以降のクイズを作成する関数
  const makeQuiz = () => {
    setScreen('quiz');
    if(quizes.length == quizIndex+1){
      setLoading(true);
      const formData = new FormData();
      formData.append('quiz_type',quizType);
      uploaded_files.forEach((file) => {
        formData.append('files',file);
      })
      quizes.forEach((quiz) => {
        formData.append('quizes',JSON.stringify(quiz));
      })
      fetch('http://127.0.0.1:8000/api/get-quiz/',{
        method:'POST',
        body:formData,
      })
        .then(response => response.json())
        .then(data => {
          setQuizes([...quizes,...data]);
          setQuizIndex(quizIndex+1);
          setSelected(null);
        })
        .catch(error => console.error("Djangoとの通信エラー:",error))
        .finally(() => setLoading(false));
    } else {
      setQuizIndex(quizIndex+1);
      setSelected(null);
    }
  }


  // ファイルをポストし、最初の5問のクイズを取得する関数
  const postFiles = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('quiz_type',quizType);
    uploaded_files.forEach((file) => {
      formData.append('files',file);
    })
    fetch('http://127.0.0.1:8000/api/upload-files/',{
      method:'POST',
      body:formData,
    })
      .then(response => response.json())
      .then(data => {
        setQuizes(data);
        setQuizIndex(0);
        setSelected(null);
        setScreen('quiz');
      })
      .catch(error => console.error("ファイル送信エラー：",error))
      .finally(() => setLoading(false));
  }

  // 画面の状態を記憶
  const [screen, setScreen] = useState<'upload' | 'quiz' | 'result'>('upload');
  // アップロードされたファイル情報を記憶
  const [uploaded_files, setUploadedFiles] = useState<File[]>([]);
  // クイズの情報を記憶
  const [quizes,setQuizes] = useState<QuizItem[]>([]);
  // ユーザーのクイズでの選択を記憶
  const [selected, setSelected] = useState<number | null>(null);
  // クイズのタイプを記憶
  const [quizType, setQuizType] = useState<'wordquiz' | 'knowledgequiz'>('wordquiz');
  // 何問目かを記憶
  const [quizIndex, setQuizIndex] = useState<number>(0);
  // ユーザーの正解数を記憶
  const [correctNum, setCorrectNum] = useState<number>(0);
  // 通信状態かどうかを記憶
  const [loading, setLoading] = useState<boolean>(false);


  // 画面を返す
  return (
    <AllScreen>
      <h1>レジュメtoクイズ ジェネレーター</h1>

      {/* クイズを読み込むまでの読み込み画面 */}
      {loading === true && (
        <LoadingScreen />
      )}

      {/* upload状態の画面 */}
      {screen == 'upload' && (
          <UploadScreen 
            uploaded_files={uploaded_files}
            onUploadFile={uploadFile}
            onDeleteFile={deleteFile}
            quizType={quizType}
            onSetQuizType={setQuizType}
            onPostFiles={postFiles}
          />
      )}

      {/* quiz状態の画面 */}
      {screen == 'quiz' && quizIndex < quizes.length && quizes.length > 0 && (
        <QuizScreen
          quizes={quizes}
          quizIndex={quizIndex}
          correctNum={correctNum}
          selected={selected}
          onSelectAnswer={setSelected}
          onAnswerSubmit={answer}
          onBackToUpload={() => {setScreen('upload'); setSelected(null); setQuizIndex(0); setCorrectNum(0);}}
          onNextQuiz={makeQuiz}
          onShowResult={() => setScreen('result')}
        />
      )}

      {/* 5問解き終わった後の結果表示画面 */}
      {screen == 'result' && (
        <ResultScreen
          quizes={quizes}
          correctNum={correctNum}
          onBackToUpload={() => setScreen('upload')}
          onMoreQuiz={makeQuiz} />
      )}
    </AllScreen>
  )
}

export default App