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

// the following line could also be: "var socket = io('ws://<URL>:<PORT_Number>?botmasterUserId=wantedUserId');"
// if you know you will be communicating with a server different from the one that served you the page you are on.
// this only works because the socket.io library assumes with this syntax that the socket.io server
// lives at the same address as the server that served this page (this should mostly be your case)

var socket = io();
var initial = true;
var hello = {'message':{'text':'hello'}};

var settings = {
  selectors: {
    chatBox: '#scrollingChat',
    fromUser: '.from-user',
    fromWatson: '.from-watson',
    latest: '.latest',
    textInputLocation: '#textInputLocation',
    loginSection: '#loginSection',
    conversationSection: '#conversationSection',
    textInputOne: '#textInputOne'
  },
  authorTypes: {
    user: 'user',
    watson: 'watson'
  }
};

var ConversationPanel = (function() {
  // Publicly accessible methods defined
  return {
    init: init,
    inputKeyDown: inputKeyDown,
    displayMessage: displayMessage
  };

  // Initialize the module
  function init() {
    // send init message to trigger welcome message.
    socket.send(hello);
    initial = false;
  }

  // Handles the submission of input
  function inputKeyDown(event, inputBox) {
    // Submit on enter key, dis-allowing blank messages
    if (event.keyCode === 13 && inputBox.value) {
      console.log('Submitting: ' + inputBox.value);

      // just making sure the page isn't refreshed
      event.preventDefault();

      // don't do anything if there is no text
      if (!inputBox.value) {
        return;
      }

      // create a botmaster compatible message from the text input by the user
      const update = {
        message: {
          text: inputBox.value
        }
      };

      // Add the user message to the web page
      displayMessage(inputBox.value, settings.authorTypes.user);

      // send the message over the webSocket
      socket.send(update);
      // finally, clear the user inputBox field
      inputBox.value = '';
    }
  }

  // Display a user or Watson message that has just been sent/received
  function displayMessage(newPayload, typeValue) {
    if (initial)
      return;

    var isUser = isUserMessage(typeValue);
    var textExists = newPayload;

    if (isUser !== null && textExists) {
      // Create new message DOM element
      var messageDivs = buildMessageDomElements(newPayload, isUser);
      var chatBoxElement = document.querySelector(settings.selectors.chatBox);
      var previousLatest = chatBoxElement.querySelectorAll((isUser ?
          settings.selectors.fromUser : settings.selectors.fromWatson) +
        settings.selectors.latest);
      // Previous "latest" message is no longer the most recent
      if (previousLatest) {
        Common.listForEach(previousLatest, function(element) {
          element.classList.remove('latest');
        });
      }

      messageDivs.forEach(function(currentDiv) {
        chatBoxElement.appendChild(currentDiv);
        // Class to start fade in animation
        currentDiv.classList.add('load');
      });
      // Move chat to the most recent messages when new messages are added
      scrollToChatBottom();
    }
  }

  // Checks if the given typeValue matches with the user "name", the Watson "name", or neither
  // Returns true if user, false if Watson, and null if neither
  // Used to keep track of whether a message was from the user or Watson
  function isUserMessage(typeValue) {
    if (typeValue === settings.authorTypes.user) {
      return true;
    } else if (typeValue === settings.authorTypes.watson) {
      return false;
    }
    return null;
  }

  // Constructs new DOM element from a message payload
  function buildMessageDomElements(newPayload, isUser) {
    var currentText = newPayload;

    if (Array.isArray(currentText)) {
      //currentText = currentText.join('<br/>');
      //FIX for empty string at UI
      currentText = currentText.filter(function(val) {
        return val;
      }).join('<br/>');
    }

    var messageArray = [];

    if (currentText) {
      var messageJson = {
        // <div class='segments'>
        'tagName': 'div',
        'classNames': ['segments'],
        'children': [{
          // <div class='from-user/from-watson latest'>
          'tagName': 'div',
          'classNames': [(isUser ? 'from-user' : 'from-watson'), 'latest', ((messageArray.length === 0) ? 'top' : 'sub')],
          'children': [{
            // <div class='message-inner'>
            'tagName': 'div',
            'classNames': ['message-inner'],
            'children': [{
              // <p>{messageText}</p>
              'tagName': 'p',
              'text': currentText
            }]
          }]
        }]
      };
      messageArray.push(Common.buildDomElement(messageJson));
    }

    return messageArray;
  }

  // Scroll to the bottom of the chat window (to the most recent messages)
  // Note: this method will bring the most recent user message into view,
  //   even if the most recent message is from Watson.
  //   This is done so that the "context" of the conversation is maintained in the view,
  //   even if the Watson message is long.
  function scrollToChatBottom() {
    var scrollingChat = this.document.querySelector('#scrollingChat');

    // Scroll to the latest message sent by the user
    var scrollEl = scrollingChat.querySelector(settings.selectors.fromUser + settings.selectors.latest);
    if (scrollEl) {
      scrollingChat.scrollTop = scrollEl.offsetTop;
    }
  }

}());

socket.on('message', function(botmasterMessage) {
  console.log('Received from Watson: ' + botmasterMessage.message.text);
  ConversationPanel.displayMessage(botmasterMessage.message.text, settings.authorTypes.watson);
  PayloadPanel.displayPayload(botmasterMessage.session);
});
