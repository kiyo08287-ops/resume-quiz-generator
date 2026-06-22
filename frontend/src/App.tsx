import React, { useState } from 'react'
import {AllScreen,
  LoadingScreen,LoadingBackground,LoadingText1,LoadingText2,
  UploadArea,UploadAreaInput,UploadedFilesArea,UploadedFilesPart,UploadedFile,FileDeleteButton,UploadAreaText,SelectQuizTypeArea,SelectQuizTypeButton,SelectQuizTypeButtonText,MakeQuizButton,
  QuizArea,QuizNumText,QuizCorrectNumText,Question,QuizAnswerButton,QuizAnswerText,CheckAnsArea,ButtonArea,BackToUploadButton,NextButton,} from './CssTags'
import './App.css'

function App() {

  // アップロードされたファイルを記憶する関数
  const uploadFile = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newFile = e.target.files[0];
      setUploadedFiles([...uploaded_files,newFile]);
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
  const [quizes,setQuizes] = useState<any[]>([]);
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
        <LoadingScreen>
          <LoadingBackground>
            <div className="spinner"></div>
            <LoadingText1>
              AIクイズデータを生成中...
            </LoadingText1>
            <LoadingText2>
              レジュメを分析しています
            </LoadingText2>
          </LoadingBackground>
        </LoadingScreen>
      )}

      {/* upload状態の画面 */}
      {screen == 'upload' && (
        <div>
          {/* アップロード部分 */}
          <UploadArea>
            <p>ここをクリック<br/>もしくはファイルをドラッグ & ドロップ</p>
            <UploadAreaInput type="file" onChange={uploadFile} style={{position:'absolute', inset:'0', opacity:'0'}}/>
          </UploadArea>

          {/* アップロードされたファイルを表示する部分 */}
          <UploadedFilesArea>
            <p>アップロードされたファイル</p>
            <UploadedFilesPart>
              {uploaded_files.length > 0 ? (
                uploaded_files.map((file,index) => (
                  <UploadedFile key={index}>
                    <span>{file.name}</span>
                    <FileDeleteButton onClick={() => deleteFile(index)}>
                      削除
                    </FileDeleteButton>
                  </UploadedFile>
                ))
              ) : (
                <UploadAreaText>
                  まだファイルはありません
                </UploadAreaText>
              )}
            </UploadedFilesPart>
          </UploadedFilesArea>
          {/* クイズのタイプを選ぶボタン */}
          <SelectQuizTypeArea>
              <SelectQuizTypeButton onClick={() => {setQuizType('wordquiz');}} isActive={quizType==='wordquiz'}>
                単語モード<br />
                <SelectQuizTypeButtonText>
                  テキストの文章から穴抜き問題を作成する
                </SelectQuizTypeButtonText>
              </SelectQuizTypeButton>
              <SelectQuizTypeButton onClick={() => {setQuizType('knowledgequiz');}} isActive={quizType==='knowledgequiz'}>
                読解モード<br />
                <SelectQuizTypeButtonText style={{fontSize:'10px',color:'#555'}}>
                  テキストの内容の理解度を問う問題を作成する
                </SelectQuizTypeButtonText>
              </SelectQuizTypeButton>
          </SelectQuizTypeArea>
          <MakeQuizButton onClick={postFiles} disabled={uploaded_files.length==0} isActive={uploaded_files.length!=0}>
            クイズを作成する
          </MakeQuizButton>
        </div>
      )}

      

      {/* quiz状態の画面 */}
      {screen == 'quiz' && quizIndex < quizes.length && quizes.length > 0 && (
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
                  <QuizAnswerButton key={index} onClick={()=> {setSelected(index);answer(index);}} disabled={selected != null} isSelected={isSelected} selected={selected==null}>
                    <QuizAnswerText>
                      {index+1}. 
                    </QuizAnswerText>
                    {choice}
                  </QuizAnswerButton>
                );
              })}

              {/* 答え合わせ画面 */}
              {selected != null && (
                <CheckAnsArea isCorrect={selected === quizes[quizIndex].correctIndex}>
                  {selected === quizes[quizIndex].correctIndex ? '正解!' : '不正解　正解は'+(quizes[quizIndex].correctIndex+1)+'. '+(quizes[quizIndex].choices[quizes[quizIndex].correctIndex])+'です'}
                  <br />
                  {quizes[quizIndex].description}
                </CheckAnsArea>
              )}
          </QuizArea>
          {/* ボタン配置部分 */}
          <ButtonArea>
            <BackToUploadButton onClick={()=> {setScreen('upload');setSelected(null);setQuizIndex(0);setCorrectNum(0);}}>
              アップロード画面に戻る
            </BackToUploadButton>
            {quizIndex+1 == quizes.length && (
              <NextButton onClick={() => (setScreen('result'))} disabled={selected==null} isActive={selected!=null}>
              結果を表示
            </NextButton>
            )}
            {quizIndex+1 != quizes.length && (
              <NextButton onClick={() => makeQuiz()} disabled={selected==null} isActive={selected!=null}>
              次の問題へ
            </NextButton>
            )}
          </ButtonArea>
        </div>
      )}

      {/* 5問解き終わった後の結果表示画面 */}
      {screen == 'result' && (
        <div>
          <h3>結果</h3>
          <h5>{quizes.length}問中 {correctNum}問正解!</h5>
          <table>
            <tr>
              <td>問題文</td>
              <td>あなたの選択</td>
              <td>正解の選択</td>
              <td>結果</td>
            </tr>
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
          </table>
          <div>
            <button onClick={() => {setScreen('upload');}}>アップロード画面に戻る</button>
            <button onClick={makeQuiz}>さらに5問解く</button>
          </div>
        </div>
      )}
    </AllScreen>
  )
}

export default App