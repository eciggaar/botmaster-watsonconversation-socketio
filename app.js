/**
 * Copyright 2017 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


// *******************************************************************************************************
// The part below defines the parts of the application that will handle the client-facing side (Frontend)
// *******************************************************************************************************
const express = require('express');
const app = express();
const config = require('./config');

// Deployment tracking
require("metrics-tracker-client").track();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// start server on the specified port and binding host
const server = app.listen(config.botmasterSettings.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on %s", config.botmasterSettings.url);
});

// *******************************************************************************************
// The part below defines botmaster and socket.io specific parts (Backend)
// *******************************************************************************************
const Botmaster = require('botmaster');
const SocketioBot = require('botmaster-socket.io');
const { fulfillOutgoingWare } = require('botmaster-fulfill');
const actions = require('botmaster-fulfill-actions');
const incomingMiddleware = require('./middleware/incoming');
const watsonConversationStorageMiddleware = require('./middleware/watson_conversation_storage');

// Define botmaster and add different bottypes (in this case only Socket.IO)
const botmaster = new Botmaster( {server} );

// Initialize socket.io bot
const socketioBot = new SocketioBot({
  id: config.secretBotId,
  server
});

botmaster.addBot(socketioBot);

// Incoming middleware for botmaster to perform middleware tasks before update handler is entered.
botmaster.use({
  type: 'incoming',
  name: 'retrieveSession',
  controller: watsonConversationStorageMiddleware.retrieveSession
});

botmaster.use(incomingMiddleware.weather.addWeatherInfoToUpdate);
botmaster.use(incomingMiddleware.userInfo.addUserInfoToUpdate);
botmaster.use(incomingMiddleware.reply.replyToUser);

// Botmaster outgoing middleware handlers
botmaster.use({
  type: 'outgoing',
  name: 'fulfill-middleware',
  controller: fulfillOutgoingWare({actions})
});

botmaster.use({
  type: 'outgoing',
  name: 'my-outgoing-middleware',
  controller: (bot, update, message, next) => {
    // message will now be of type OutgoingMessage
    watsonConversationStorageMiddleware.retrieveSession(bot, update, next);
    message.session = update.session;
    next();
  }
});

// Catch errors and log them
botmaster.on('error', (bot, err) => { console.log(err.stack); });
