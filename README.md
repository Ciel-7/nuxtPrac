# 環境構築手順

1. ビルド・コンテナ起動
    docker compose build --no-chache
    docker compose up -d

2. Nuxt
    ・コンテナ上で以下のコマンドを実行
        npx nuxi init . --force
        yarn install
        yarn dev
    
    ・コンテナ起動時にアプリが起動するようにdocker-compose.ymlを書き換える

3. Django
    ・コンテナ上で以下のコマンドを実行
        django-admin startproject myproject
        cd myproject
        python3 manage.py runserver 0.0.0.0:8000
    
    ・コンテナ起動時にアプリが起動するようにdocker-compose.ymlを書き換える
    
    