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

let workspaceId = '';
let workspaceFound = false;

const replyToUser = {
  type: 'incoming',
  name: 'reply-to-user',
  controller: (bot, update, next) => {

    // By default picks the first workspace that is found in the list...
    // Then a boolean is set to true so that this API call is called only once
    if (!workspaceFound) {
      watsonConversation.listWorkspaces( (err, watsonWorkspaces) => {
        if (!err && watsonWorkspaces.workspaces[0]) {
          workspaceId = watsonWorkspaces.workspaces[0].workspace_id;
          console.log('Workspace ID being used....: ' + workspaceId);
        } else { // In case of error or empty list
          workspaceId = process.env.WATSON_WORKSPACE_ID;
        }

        workspaceFound = true;
        submitMessage(bot, update);
      });
    }

    if (workspaceFound) {
      submitMessage(bot, update);
    }

    next();
  }
};

function submitMessage(bot, update) {
  const messageForWatson = {
      context: update.session.context,
      workspace_id: workspaceId,
      input: {
          text: update.message.text,
      }
  };

  watsonConversation.message(messageForWatson, (err, watsonUpdate) => {
      if (err) {
        bot.sendTextCascadeTo(['Welcome! To complete the setup, follow the steps in the <a href="https://github.com/eciggaar/botmaster-watsonconversation-socketio#step-1-import-your-workspace">README.md</a> to create your own workspace and link it to this application.',
                              'Have fun!!'], update.sender.id);
      } else {
        watsonConversationStorageMiddleware.updateSession(update.sender.id, watsonUpdate);
        const watsontext = watsonUpdate.output.text;
        bot.sendTextCascadeTo(watsontext, update.sender.id);
      }
  });
}

module.exports = {
  replyToUser
}
