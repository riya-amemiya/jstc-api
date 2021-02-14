// ライブラリ読み込み
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { router } from "./routes"
const app = express();
app.use( helmet() );
app.use( cors() );
const bodyParser = require( 'body-parser' );

//body-parserの設定
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );

const port = process.env.PORT || 5000// port番号を指定

// ------ ルーティング ------ //
app.use( '/', router );

//サーバ起動
app.listen( port, () => console.log( `Listening on ${ port }` ) );
console.log( 'listen on port ' + port );