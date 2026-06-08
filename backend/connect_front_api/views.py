from rest_framework.decorators import api_view
from rest_framework.response import Response
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
    uploaded_files = request.FILES.getlist('files')
    
    print(f"--- 届いたファイル数: {len(uploaded_files)}個 ---")
    for file in uploaded_files:
        print(f"ファイル名: {file.name}, サイズ: {file.size} bytes")
        
    return Response({
        "message": "ファイルを正常に受け取りました！",
        "file_count": len(uploaded_files)
    })