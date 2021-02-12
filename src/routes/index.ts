import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { python, ruby } from "@jstc/core"
const app = express();
app.use( helmet() );
app.use( cors() );
// ルーティングする
const router = express.Router();

// routerにルーティングの動作を記述する
router.get( '/python', ( req, res ) =>
{
    ( async () =>
    {
        if ( typeof req.query.code === "string" )
        {
            const acorn = await import( "acorn" )
            const code: any = acorn.parse( req.query.code, {
                ecmaVersion: "latest",
                allowAwaitOutsideFunction: true,
                allowImportExportEverywhere: true,
                allowReserved: true
            } )
            const show = new python( { codes: code, mode: "python", option: { optimisation: false } } )
            res.status( 200 ).send( { code: show.parse.code } );
        }
    } )()
} );

router.get( '/ruby', ( req, res ) =>
{
    ( async () =>
    {
        if ( typeof req.query.code === "string" )
        {
            const acorn = await import( "acorn" )
            const code: any = acorn.parse( req.query.code, {
                ecmaVersion: "latest",
                allowAwaitOutsideFunction: true,
                allowImportExportEverywhere: true,
                allowReserved: true
            } )
            const show = new ruby( { codes: code, mode: "ruby", option: { optimisation: false } } )
            res.status( 200 ).send( { code: show.parse.code } );
        }
    } )()
} );

// -------------------------------------------------
//  以下、何のルーティングにもマッチしないorエラー
// -------------------------------------------------

// いずれのルーティングにもマッチしない(==NOT FOUND)
app.use( ( req, res ) =>
{
    res.status( 404 );
    res.render( 'error', {
        param: {
            status: 404,
            message: 'not found'
        },
    } );
} );

//routerをモジュールとして扱う準備
export { router }