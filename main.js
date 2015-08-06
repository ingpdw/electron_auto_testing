'use strict'

var app = require( 'app' );
var BrowserWindow = require( 'browser-window' );
var ipc = require( 'ipc' );
var path = require( 'path' );

var mainWindow = null;

app.on('window-all-closed', function() {
  console.log( 'All window closed' );
  if (process.platform != 'darwin')
    app.quit();
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    title: 'test_automation',
    width: 600
    ,height: 600
  });

  var src = path.join( 'file://' + __dirname, './', 'index.html' );
  mainWindow.loadUrl( src );
  //mainWindow.openDevTools();
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

require('crash-reporter').start();
