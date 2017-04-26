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
 
const addUserInfoToUpdate = {
  type: 'incoming',
  name: 'add-user-info-to-update',
  controller: (bot, update, next) => {
    if (bot.retrievesUserInfo) {
      return bot.getUserInfo(update.sender.id).then((userInfo) => {
        if (update.session.context) {
          update.session.context.userInfo = userInfo;
          update.session.context.firstname = userInfo.first_name;
          next();
        }
      });
    } else {
      next();
    }
  }
};

module.exports = {
  addUserInfoToUpdate
}
