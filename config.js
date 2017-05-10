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

const cfenv = require('cfenv');
const dotenv = require('dotenv');
const appEnv = cfenv.getAppEnv();

// Load environment variables from local .env when running locally. Otherwise use values from Bluemix
// environment variables
if (appEnv.isLocal) {
    dotenv.load();
}

// Expose botmaster port
//const botmasterSettings = { port: appEnv.isLocal ? 3000 : appEnv.port, url: appEnv.url };
const botmasterSettings = { port: appEnv.port, url: appEnv.url };

// Expose secret bot id
const secretBotId = process.env.SOCKETIO_BOT_ID;

// Settings for Watson conversation service
const watsonConversationCredentials = {
    username: (appEnv.isLocal) ? process.env.WATSON_CONVERSATION_USERNAME : appEnv.getServiceCreds('conversation-service').username,
    password: (appEnv.isLocal) ? process.env.WATSON_CONVERSATION_PASSWORD : appEnv.getServiceCreds('conversation-service').password,
    version: 'v1',
    version_date: '2017-02-03',
};

// Settings for IBM Weather Company Data service
const weatherCredentials = {
    username: (appEnv.isLocal) ? process.env.WEATHER_USERNAME : appEnv.getServiceCreds('weather-service').username,
    password: (appEnv.isLocal) ? process.env.WEATHER_PASSWORD : appEnv.getServiceCreds('weather-service').password,
    host: (appEnv.isLocal) ? process.env.WEATHER_HOST : appEnv.getServiceCreds('weather-service').host
};

module.exports = {
  botmasterSettings,
  secretBotId,
  watsonConversationCredentials,
  weatherCredentials
}
