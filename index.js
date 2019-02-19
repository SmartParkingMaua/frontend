const express = require( 'express' );
const path = require( 'path' );
const PORT = process.env.PORT || 4000;
const app = express();

app.use( express.static( path.join( __dirname, 'public' ) ) );

app.set( 'views', path.join( __dirname, 'views' ) );

app.set( 'view engine', 'ejs' );


app.get( '/', ( req, res ) =>  res.redirect( '/live' ) );

app.get( '/live', ( req, res ) => res.render( 'pages/live' ) );

app.get( '/history', ( req, res ) => res.render( 'pages/history' ) );


app.listen( PORT, () => console.log( `Listening on ${ PORT }` ) );
