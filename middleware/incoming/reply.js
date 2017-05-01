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

const watson = require('watson-developer-cloud');
const config = require('../../config');
const watsonConversationStorageMiddleware = require('../watson_conversation_storage');
const watsonConversation = watson.conversation(config.watsonConversationCredentials);

const replyToUser = {
  type: 'incoming',
  name: 'reply-to-user',
  controller: (bot, update, next) => {

    const messageForWatson = {
        context: update.session.context,
        workspace_id: process.env.WATSON_WORKSPACE_ID,
        input: {
            text: update.message.text,
        }
    };

    watsonConversation.message(messageForWatson, (err, watsonUpdate) => {
        if (err) {
          bot.sendTextCascadeTo(['Welcome! To complete the setup, follow the steps in the README.md to create your own workspace and link it to this application.',
                                'Have fun!!'], update.sender.id);
        } else {
          watsonConversationStorageMiddleware.updateSession(update.sender.id, watsonUpdate);
          const watsontext = watsonUpdate.output.text;
          bot.sendTextCascadeTo(watsontext, update.sender.id);
        }
    });

    next();
  }
};

module.exports = {
  replyToUser
}
