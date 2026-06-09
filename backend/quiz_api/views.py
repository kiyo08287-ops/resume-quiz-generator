from rest_framework.decorators import api_view
from rest_framework.response import Response
from pypdf import PdfReader
from google import genai
from google.genai import types
from pydantic import BaseModel, Field
import os
import json

# 文字起こし関数
def extractText(files):
    extracted_text = ""
    for file in files:
        if file.name.endswith('.pdf'):
            try:
                reader = PdfReader(file)
                for page in reader.pages:
                    text = page.extract_text()
                    if text:
                        extracted_text += text + "\n"
            except Exception as e:
                print(f"PDF解析エラー({file.name}):{e}")
        elif file.name.endswith('.txt'):
            try:
                extracted_text += file.read().decode('utf-8') + "\n"
            except Exception as e:
                print(f"テキスト解析エラー({file.name}):{e}")
    return extracted_text



# Gemini APIによるクイズ作成
def createQuizByGemini(prompt):
    # APIキー(環境変数にexport GEMINI_API_KEY="キー"で登録しておく)
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("Gemini APIキーが環境変数に設定されていません")
    client = genai.Client(api_key=api_key)

    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=QuizSchema,
            temperature=0.7
        ),
    )
    return [json.loads(response.text)]



# 2問目以降の新しいクイズの作成
@api_view(['POST'])
def get_quiz(request):
    asked_quiz = request.data.getlist('quizes')
    upload_files = request.FILES.getlist('files')
    extracted_text = extractText(upload_files)
    if not extracted_text.strip():
        return Response({"error":"ファイルからテキストを抽出できませんでした。"},status=400)

    asked_quiz_summary = ""
    for idx, quiz_str in enumerate(asked_quiz):
        try:
            quiz_obj = json.loads(quiz_str)
            asked_quiz_summary += f"問題{idx+1}:{quiz_obj.get('question')}\n"
        except Exception:
            asked_quiz_summary += f"問題{idx+1}:{quiz_str}\n"

    try:
        prompt = f"以下のレジュメテキストから、講義の科目を予測し、その科目とテキスト内容に基づいた教育的な四択クイズを1問作成してください。「この講義の目的は何か」「何について説明しているか」といった、講義のテーマやメタ的な構成を問う問題は避け、知識や理解を問う問題にしてください。\n\nレジュメテキスト:\n{extracted_text}\n\nまた、以下の問題はすでに作成済みのため、これらとは重複しない別のクイズを作成してください。\n\nすでに作成済みの問題:\n{asked_quiz_summary}"
        quiz_data = createQuizByGemini(prompt)
        return Response(quiz_data)
    except Exception as e:
        print(f"Gemini APIエラー:{e}")
        return Response({"error":f"AIクイズ生成中にエラーが発生しました:{str(e)}"},status=500)



# ファイルの受け取りと一問目のクイズの返却
@api_view(['POST'])
def upload_files(request):
    # テキスト抽出
    uploaded_files = request.FILES.getlist('files')
    extracted_text = extractText(uploaded_files)
    if not extracted_text.strip():
        return Response({"error":"ファイルからテキストを抽出できませんでした。"},status=400)
    
    # Gemini APIでのクイズの生成
    try:
        prompt = f"以下のレジュメテキストから、講義の科目を予測し、その科目とテキスト内容に基づいた教育的な四択クイズを1問作成してください。「この講義の目的は何か」「何について説明しているか」といった、講義のテーマやメタ的な構成を問う問題は避け、知識や理解を問う問題にしてください。\n\nレジュメテキスト\n{extracted_text}"
        quiz_data = createQuizByGemini(prompt)
        return Response(quiz_data)
    except Exception as e:
        print(f"Gemini APIエラー:{e}")
        return Response({"error":f"AIクイズ生成中にエラーが発生しました:{str(e)}"},status=500)



# クイズの形式
class QuizSchema(BaseModel):
    question:str = Field(description="レジュメ内容に基づいた四択のクイズの問題文")
    choices:list[str] = Field(description="4つの選択肢の配列。文字列の要素を4つ含めること")
    correctIndex:int = Field(description="正解となる選択肢のインデックス。0から3の整数")