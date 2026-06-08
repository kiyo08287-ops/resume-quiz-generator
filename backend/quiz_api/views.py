from rest_framework.decorators import api_view
from rest_framework.response import Response
from pypdf import PdfReader
from google import genai
from google.genai import types
from pydantic import BaseModel, Field
import os
import json
import random


# クイズデータの準備
@api_view(['GET'])
def get_quiz(request):
    # Reactが受け取るためのテスト用クイズデータ（Django側で用意したもの）
    quiz_pool = [
        {
            "question": "DjangoでAPIを作成するとき、アクセス許可を制御するセキュリティ機能の略称は何でしょう？",
            "choices": ["HTML", "CORS", "CSS", "SQL"],
            "correctIndex": 1
        },
        {
            "question": "Reactにおいて、コンポーネントの「状態」を管理するために使用する最も代表的なHooksは何でしょう？",
            "choices": ["useEffect", "useContext", "useState", "useRef"],
            "correctIndex": 2
        },
        {
            "question": "Gitで、リモートリポジトリ（GitHubなど）に手元のコードをアップロードするコマンドはどれでしょう？",
            "choices": ["git pull", "git push", "git commit", "git add"],
            "correctIndex": 1
        }
    ]
    return Response([random.choice(quiz_pool)])

# ファイルの受け取り
@api_view(['POST'])
def upload_files(request):
    # APIキー(環境変数にexport GEMINI_API_KEY="キー"で登録しておく)
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        return Response({"error":"GEMINI_API_KEYが設定されていません"},status=500)
    client = genai.Client(api_key=api_key)


    # テキスト抽出
    uploaded_files = request.FILES.getlist('files')

    extracted_text = ""

    for file in uploaded_files:
        if file.name.endswith('.pdf'):
            try:
                reader = PdfReader(file)
                for page in reader.pages:
                    text = page.extract_text()
                    if text:
                        extracted_text += text + "\n"
            except Exception as e:
                print(f"PDF解析エラー({file.name}):{e}")
        elif file.name.endwith('.txt'):
            try:
                extracted_text += file.read().decode('utf-8') + "\n"
            except Exception as e:
                print(f"テキスト解析エラー({file.name}):{e}")

    
    print(f"--- 届いたファイル数: {len(uploaded_files)}個 ---")
    for file in uploaded_files:
        print(f"ファイル名: {file.name}, サイズ: {file.size} bytes")
    print("\n--- 抽出されたテキスト(最初の100文字) ---")
    print(extracted_text[:100])
    print("-----------------------------------------")
        
    
    # Gemini APIでのクイズの生成
    try:
        prompt = f"以下の広義のレジュメのテキストから、内容に基づいた教育的な四択クイズを1問作成してください。\n\nレジュメテキスト\n{extracted_text}"
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=QuizSchema,
                temperature=0.7
            ),
        )
        quiz_data = json.loads(response.text)
        return Response([quiz_data])
    except Exception as e:
        print(f"Gemini APIエラー:{e}")
        return Response({"error":f"AIクイズ生成中にエラーが発生しました:{str(e)}"},status=500)


# クイズの形式
class QuizSchema(BaseModel):
    question:str = Field(description="レジュメ内容に基づいた四択のクイズの問題文")
    choices:list[str] = Field(description="4つの選択肢の配列。文字列の要素を4つ含めること")
    correctIndex:int = Field(description="正解となる選択肢のインデックス。0から3の整数")