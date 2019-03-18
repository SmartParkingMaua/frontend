import express from 'express';
import { join } from 'path';

const PORT = process.env.PORT || 4000;
const app = express();

app.use( express.static( join( __dirname, 'public' ) ) );

app.set( 'views', join( __dirname, 'views' ) );
app.set( 'view engine', 'ejs' );

// Handling known routes
app.get( '/', ( req, res, next ) =>  res.redirect( '/live') );
app.get( '/live', ( req, res, next ) => res.render( 'pages/live') );
app.get( '/history', ( req, res, next ) => res.render( 'pages/history' ) );

// Handling unknown routes
app.use(( req, res, next ) => res.redirect( '/' ));


app.listen( PORT, () => console.log( `Listening on ${ PORT }` ) );
