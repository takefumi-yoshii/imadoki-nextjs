# WEB+DB PRESS vol.123 - 特集２ いまどき Next.js -

第５章「作って学ぶ静的生成の使い分け」のサンプルコードです。  
当サンプルコードをローカル開発環境で動作させるためには、以下の手順が必要です。

## node バージョンを確認

開発環境に Node.js インストールされている必要があります。  
次の環境で動作確認をしています。

```
"node": "14.17.0"
"npm": "7.17.0"
```

## .env.local に環境変数を設定

誌面のとおり GithubO Auth Apps と Personal access token を作成します。  
取得した値を、環境変数として`.env.local`に記載してください。

```
GITHUB_OAUTH_CLIENT_ID=xxxxxxxxxxxxxx
GITHUB_OAUTH_CLIENT_SECRET=xxxxxxxxxxxxxx
GITHUB_ACCESS_TOKEN=ghp_xxxxxxxxxxxxxx
```

## install

node_modules をインストールしてください。

```
$ npm i
```

## 起動

以下のコマンドで開発サーバーを起動します。

```
$ npm run dev
```
