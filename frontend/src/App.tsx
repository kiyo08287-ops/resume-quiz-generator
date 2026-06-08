import React, { useState } from 'react'
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

  // 2問目以降のクイズを作成する関数
  const makeQuiz = () => {
    fetch('http://127.0.0.1:8000/api/get-quiz/')
      .then(response => response.json())
      .then(data => {
        setQuizes([...quizes,data[0]]);
        setQuizIndex(quizIndex+1);
        setSelected(null);
      })
      .catch(error => console.error("Djangoとの通信エラー:",error));
  }

  // 正解数をカウントする関数
  const isCorrect = (selectedIndex :number) => {
    if(selectedIndex == quizes[quizIndex].correctIndex){
      setCorrectNum(correctNum+1);
    }
  }

  // ファイルをポストする関数
  const postFiles = () => {
    const formData = new FormData();
    uploaded_files.forEach((file) => {
      formData.append('files',file);
    })
    fetch('http://127.0.0.1:8000/api/upload-files/',{
      method:'POST',
      body:formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log("Djangoからのレスポンス:",data);
        setScreen('quiz');
      })
      .catch(error => console.error("ファイル送信エラー：",error));
  }

  const title = "レジュメtoクイズ ジェネレーター"

  // 画面の状態を記憶
  const [screen, setScreen] = useState<'upload' | 'quiz'>('upload');
  // アップロードされたファイル情報を記憶
  const [uploaded_files, setUploadedFiles] = useState<File[]>([]);
  // クイズの情報を記憶
  // クイズオブジェクト
  const [quizes,setQuizes] = useState<any[]>([]);
  // ユーザーのクイズでの選択を記憶
  const [selected, setSelected] = useState<number | null>(null);
  // 何問目かを記憶
  const [quizIndex, setQuizIndex] = useState<number>(0);
  // ユーザーの正解数を記憶
  const [correctNum, setCorrectNum] = useState<number>(0);


  // 画面が表示されたときにDjangoからクイズを読み込む
  React.useEffect(() => {
    fetch('http://127.0.0.1:8000/api/get-quiz/')
      .then(response => response.json())
      .then(data => {
        setQuizes(data);
      })
      .catch(error => console.error("Djangoとの通信エラー:",error));
  },[]);


  // 画面を返す
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth:'900px', margin:'40px auto' }}>
      <h1>{title}</h1>

      {/* クイズを読み込むまでの読み込み画面 */}
      {screen == 'quiz' && quizes.length === 0 && (
        <p style={{textAlign:'center',padding:'40px',color:'#666'}}>
          クイズデータを読み込み中...
        </p>
      )}

      {/* upload状態の画面 */}
      {screen == 'upload' && (
        <div>
          {/* アップロード部分 */}
          <div style={{border:'2px dashed #ccc', padding:'20px', textAlign:'center', lineHeight:'100px', position:'relative', height:'200px'}}>
            <p>ここをクリック<br/>もしくはファイルをドラッグ & ドロップ</p>
            <input type="file" onChange={uploadFile} style={{position:'absolute', inset:'0', opacity:'0'}}/>
          </div>

          {/* アップロードされたファイルを表示する部分 */}
          <div style={{margin:'20px'}}>
            <p>アップロードされたファイル</p>
            <div style={{display:'flex', flexDirection:'column'}}>
              {uploaded_files.length > 0 ? (
                uploaded_files.map((file,index) => (
                  <div key={index} style={{display:'flex', justifyContent:'space-between', alignItems:'center', background:'#f0f0f0', padding:'8px 12px', borderRadius:'4px'}}>
                    <span>{file.name}</span>
                    <button onClick={() => deleteFile(index)} style={{background: '#ff4d4f', color: '#fff', border: 'none', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer'}}>
                      削除
                    </button>
                  </div>
                ))
              ) : (
                <p style={{color: '#999', fontSize: '14px'}}>
                  まだファイルはありません
                  </p>
              )}
            </div>
          </div>
          <button onClick={postFiles} disabled={uploaded_files.length==0}
              style={{padding:'10px 20px',
                      margin:'10px',
                      fontSize:'16px',
                      cursor:'pointer',
                      fontWeight:'bold',
                      cursor:uploaded_files.length==0 ? 'not-allowed':'pointer',
                      backgroundColor:uploaded_files.length==0 ? '#adb5bd':'#fff',
                      border:uploaded_files.length==0 ? 'none' : '2px solid rgba(0,123,255,0.5)',
                      borderRadius:'6px',
                      boxShadow:uploaded_files.length==0 ? 'none':'0 4px 6px rgba(0,0,0,0.2)',
                      transition:'all 0.3s'
            }}>
            クイズを作成する
          </button>
        </div>
      )}

      

      {/* quiz状態の画面 */}
      {screen == 'quiz' && (
        <div>
          {/* クイズ画面 */}
          <div style={{ border: '1px solid #dee2e6', padding: '35px 20px 20px 20px', borderRadius: '12px', display:'flex', flexDirection:'column', gap:'10px', position:'relative', boxShadow:'0 4px 12px rgba(0,0,0,0.05)', background:'#fff'}}>
            <span style={{position:'absolute', top:'10px', left:'15px', fontSize:'13px', fontWeight: 'bold', color: '#007bff', background: '#e6f7ff', padding: '2px 8px', borderRadius: '4px'}}>第{quizIndex+1}問</span>
            <span style={{position:'absolute', top:'10px', right:'15px', fontSize:'13px', fontWeight: 'bold', color: '#28a745', background: '#e2f0d9', padding: '2px 8px', borderRadius: '4px'}}>正答数:{correctNum}</span>
            <br />
            <p style={{fontSize: '18px', fontWeight: 'bold', marginTop: '10px', color: '#333'}}>
              {quizes[quizIndex].question}
            </p>
              {quizes[quizIndex].choices.map((choice,index) => {
                const isSelected = selected === index;
                return (
                  <button key={index} onClick={()=> {setSelected(index);isCorrect(index);}} disabled={selected != null} style={{
                          padding: '16px 20px',
                          textAlign: 'left',
                          fontSize: '16px',
                          cursor: selected == null ? 'pointer' : 'default',
                          backgroundColor: isSelected ? '#e6f7ff' : '#ffffff',
                          border: isSelected ? '1px solid #1890ff' : '1px solid #dee2e6',
                          borderRadius: '8px',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                          transition: 'all 0.2s',    
                          fontWeight: isSelected ? 'bold' : 'normal',
                          color: isSelected ? '#1890ff' : '#495057',}}>
                    <span style={{marginRight:'10px', fontWeight:'bold', color:isSelected ? '#1890ff' : '#8c8c8c'}}>
                      {index+1}. 
                    </span>
                    {choice}
                  </button>
                );
              })}

              {/* 答え合わせ画面 */}
              {selected != null && (
                <div style={{marginTop:'15px', padding:'15px',borderRadius:'6px', background: selected === quizes[quizIndex].correctIndex ? '#e2f0d9' : '#fce8e6', color:selected === quizes[quizIndex].correctIndex ? '#2b5115' : '#a71d2a', fontWeight:'bold'}}>
                  {selected === quizes[quizIndex].correctIndex ? '正解!' : '不正解　正解は'+(quizes[quizIndex].correctIndex+1)+'. '+(quizes[quizIndex].choices[quizes[quizIndex].correctIndex])+'です'}
                </div>
              )}
          </div>
          {/* ボタン配置画面 */}
          <div style={{display:'flex', justifyContent:'center', gap:'15px', margin:'0 20px'}}>
            <button onClick={()=> {setScreen('upload');setSelected(null);setQuizIndex(0);setCorrectNum(0);}}
              style={{padding:'10px 20px',
                      margin:'10px',
                      fontSize:'16px',
                      cursor:'pointer',
                      fontWeight:'bold',
                      cursor:'pointer',
                      backgroundColor:'#ffffff',
                      color:'#595959',
                      border:'1px solid #d9d9d9',
                      borderRadius:'6px',
                      boxShadow:'0 2px 4px rgba(0,0,0,0.05)',
                      transition:'all 0.3s',
                      flex:1
            }}>
              アップロード画面に戻る
            </button>
            <button onClick={() => makeQuiz()} disabled={selected==null}
              style={{padding:'10px 20px',
                      margin:'10px',
                      fontSize:'16px',
                      cursor:'pointer',
                      fontWeight:'bold',
                      cursor:selected==null ? 'not-allowed':'pointer',
                      backgroundColor:selected==null ? '#f5f5f5':'#007bff',
                      color:selected==null ? '#bfbfbf':'#ffffff',
                      border:selected==null ? '1px solid #d9d9d9':'none',
                      borderRadius:'6px',
                      boxShadow:selected==null ? 'none':'0 4px 6px rgba(0,123,255,0.15)',
                      transition:'all 0.3s',
                      flex:1
            }}>
              もう一問解く
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App