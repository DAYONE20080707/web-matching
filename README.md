# Web Matching

## ローカル起動方法

PostgreSQL をインストールします。
下記サイトにアクセスし、インストーラーをダウンロードします。

https://www.postgresql.org/download/

インストールを進めると、パスワードを入力する所がありますので、忘れないようにメモしておきます。

インストールが完了したら、SQL Shell を起動します。


1. データベース作成

```bash
Server [localhost]:
Database [postgres]:
Port [5432]:
Username [postgres]:
Client Encoding [SJIS]:
ユーザー postgres のパスワード: 設定したパスワードを入力
```

デフォルトのままで、Enter キーを押して進めて、パスワードを入力する箇所で、インストール時に設定したパスワードを入力します。

PostgreSQL にログインしたら、データベースを作成します。

web_matchingという名前で作成します。



```sql
postgres=# create database web_matching;
CREATE DATABASE
```



2. 環境変数作成

.env ファイルを作成
passwordをPostgreSQLで作ったパスワードへ変更してください。

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/web_matching?
NEXTAUTH_SECRET=
NEXTAUTH_URL=
NEXT_PUBLIC_APP_URL=
EMAIL=
EMAIL_PASSWORD=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_FOLDER=
```

3. ライブラリインストール

```bash
npm install
```

4. データベースマイグレーション

```bash
npx prisma generate
npx prisma migrate deploy
```

5. ローカル起動

```bash
npm run dev
```

6. ビルド確認

```bash
npm run build
npm run start
```
