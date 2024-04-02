# 기본 이미지 설정
FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8

# 작업 디렉토리 설정
WORKDIR /app

# 호스트의 모든 파일을 컨테이너의 /app 디렉토리로 복사
COPY . /app

# 필요한 패키지 설치
RUN pip install --no-cache-dir -r requirements.txt

# FastAPI 애플리케이션을 실행
CMD ["uvicorn", "recommend.main:app", "--host", "0.0.0.0", "--port", "8000"]
