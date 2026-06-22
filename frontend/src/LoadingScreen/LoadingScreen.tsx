import React from 'react'
import {LoadingArea,LoadingBackground,LoadingText1,LoadingText2} from './CssTags'


export const LoadingScreen:React.FC = ({
}) => {
    return (
        <LoadingArea>
            <LoadingBackground>
                <div className="spinner"></div>
                <LoadingText1>
                    AIクイズデータを生成中...
                </LoadingText1>
                <LoadingText2>
                    レジュメを分析しています
                </LoadingText2>
            </LoadingBackground>
        </LoadingArea>
    )
}