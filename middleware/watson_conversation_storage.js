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

'use strict';
const store = {};

function retrieveSession(bot, update, next) {
  // try to retrieve the session object for a certain id
  // if no session is found, set the session to an empty object
  if (store[update.sender.id]) {
    update.session = store[update.sender.id];
  } else {
    // on the first pass, this will be our session object
    update.session = {};
    update.session.context = {};
  }
  next();
}

function updateSession(userId, session) {
  // update or store the session for the first time.
  // the update is expected to be found in the message object
  // for the platform.
  store[userId] = session;
}

module.exports = {
  retrieveSession,
  updateSession
};
