import React from 'react'
import {UploadArea,UploadAreaInput,UploadedFilesArea,UploadedFilesPart,UploadedFile,FileDeleteButton,UploadAreaText,SelectQuizTypeArea,SelectQuizTypeButton,SelectQuizTypeButtonText,MakeQuizButton} from './CssTags'

interface UploadScreenProps{
    uploaded_files: File[];
    quizType: 'wordquiz' | 'knowledgequiz';
    onUploadFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDeleteFile: (deleteIndex:number) => void;
    onSetQuizType: (quizType: 'wordquiz' | 'knowledgequiz') => void;
    onPostFiles: () => void;
}

export const UploadScreen: React.FC<UploadScreenProps> = ({
    uploaded_files,
    quizType,
    onUploadFile,
    onDeleteFile,
    onSetQuizType,
    onPostFiles,
}) => {
    return (
        <div>
          {/* アップロード部分 */}
          <UploadArea>
            <p>ここをクリック<br/>もしくはファイルをドラッグ & ドロップ</p>
            <UploadAreaInput type="file" onChange={onUploadFile} style={{position:'absolute', inset:'0', opacity:'0'}}/>
          </UploadArea>

          {/* アップロードされたファイルを表示する部分 */}
          <UploadedFilesArea>
            <p>アップロードされたファイル</p>
            <UploadedFilesPart>
              {uploaded_files.length > 0 ? (
                uploaded_files.map((file,index) => (
                  <UploadedFile key={index}>
                    <span>{file.name}</span>
                    <FileDeleteButton onClick={() => onDeleteFile(index)}>
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
              <SelectQuizTypeButton onClick={() => {onSetQuizType('wordquiz');}} isActive={quizType==='wordquiz'}>
                単語モード<br />
                <SelectQuizTypeButtonText>
                  テキストの文章から穴抜き問題を作成する
                </SelectQuizTypeButtonText>
              </SelectQuizTypeButton>
              <SelectQuizTypeButton onClick={() => {onSetQuizType('knowledgequiz');}} isActive={quizType==='knowledgequiz'}>
                読解モード<br />
                <SelectQuizTypeButtonText style={{fontSize:'10px',color:'#555'}}>
                  テキストの内容の理解度を問う問題を作成する
                </SelectQuizTypeButtonText>
              </SelectQuizTypeButton>
          </SelectQuizTypeArea>
          <MakeQuizButton onClick={onPostFiles} disabled={uploaded_files.length==0} isActive={uploaded_files.length!=0}>
            クイズを作成する
          </MakeQuizButton>
        </div>
    )
}