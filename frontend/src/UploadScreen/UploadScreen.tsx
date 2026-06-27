import React, {useState} from 'react'
import {UploadArea,UploadAreaInput,UploadedFilesArea,UploadedFilesPart,UploadedFile,FileDeleteButton,UploadAreaText,SelectQuizTypeArea,SelectQuizTypeButton,SelectQuizTypeButtonText,MakeQuizButton} from './CssTags'

interface UploadScreenProps{
    uploaded_files: File[];
    quizType: 'wordquiz' | 'knowledgequiz';
    onUploadFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDeleteFile: (deleteIndex:number) => void;
    onSetQuizType: (quizType: 'wordquiz' | 'knowledgequiz') => void;
    onPostFiles: () => void;
    onDirectUpload: (files : File[]) => void;
}

export const UploadScreen: React.FC<UploadScreenProps> = ({
    uploaded_files,
    quizType,
    onUploadFile,
    onDeleteFile,
    onSetQuizType,
    onPostFiles,
    onDirectUpload,
}) => {
  const [isDragActive, setIsDragActive] = useState<boolean>(false);

  // ドラッグエリアにファイルが入ってきたとき
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  }

  // ドラッグエリアでファイルをドラッグしているとき
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  }

  // ドラッグエリアからファイルが離れたとき
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  }

  // ファイルがドロップされたとき
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if(e.dataTransfer.files && e.dataTransfer.files[0]){
      const droppedFiles = Array.from(e.dataTransfer.files);
      onDirectUpload(droppedFiles);
    }
  }


    return (
        <div>
          {/* アップロード部分 */}
          <UploadArea
            isActive={isDragActive}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}>
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
                <SelectQuizTypeButtonText>
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