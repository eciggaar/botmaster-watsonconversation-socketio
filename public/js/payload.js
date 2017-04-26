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

// The PayloadPanel module is designed to handle
// all display and behaviors of the conversation column of the app.
/* eslint no-unused-vars: "off" */
/* global Api: true, Common: true, document*/
/* exported PayloadPanel*/

var PayloadPanel = (function() {
  var settings = {
    selectors: {
      payloadColumn: '#payload-column',
      payloadInitial: '#payload-initial-message',
      payloadResponse: '#payload-response'
    }
  };

  var responsePayload;

  //Used to generate a string of consecutive numbers separated by new lines
  // - used as line numbers for displayed JSON
  function createLineNumberString(numberOfLines) {
    var lineString = '';
    var prefix = '';
    for (var i = 1; i <= numberOfLines; i++) {
      lineString += prefix;
      lineString += i;
      prefix = '\n';
    }
    return lineString;
  }

  //Format (payload) JSON to make it more readable
  function jsonPrettyPrint(json) {
    if (json === null) {
      return '';
    }
    var convert = JSON.stringify(json, null, 2);

    convert = convert.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(
      />/g, '&gt;');
    convert = convert
      .replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        function(match) {
          var cls = 'number';
          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              cls = 'key';
            } else {
              cls = 'string';
            }
          } else if (/true|false/.test(match)) {
            cls = 'boolean';
          } else if (/null/.test(match)) {
            cls = 'null';
          }
          return '<span class="' + cls + '">' + match + '</span>';
        });
    return convert;
  }

  // Toggle panel between being:
  //    reduced width (default for large resolution apps)
  //    hidden (default for small/mobile resolution apps)
  //    full width (regardless of screen size)
  function togglePanel(event, element) {
    var payloadColumn = document.querySelector(settings.selectors.payloadColumn);
    if (element.classList.contains('full')) {
      element.classList.remove('full');
      payloadColumn.classList.remove('full');
    } else {
      element.classList.add('full');
      payloadColumn.classList.add('full');
    }
  }

  // Constructs new DOM element to use in displaying the payload
  function buildPayloadDomElement(newPayload) {
    var payloadPrettyString = jsonPrettyPrint(newPayload);

    var payloadJson = {
      'tagName': 'div',
      'children': [{
        // <div class='header-text'>
        'tagName': 'div',
        'text': 'Watson understands',
        'classNames': ['header-text']
      }, {
        // <div class='code-line responsive-columns-wrapper'>
        'tagName': 'div',
        'classNames': ['code-line', 'responsive-columns-wrapper'],
        'children': [{
          // <div class='line-numbers'>
          'tagName': 'pre',
          'text': createLineNumberString((payloadPrettyString.match(/\n/g) || []).length + 1),
          'classNames': ['line-numbers']
        }, {
          // <div class='payload-text responsive-column'>
          'tagName': 'pre',
          'classNames': ['payload-text', 'responsive-column'],
          'html': payloadPrettyString
        }]
      }]
    };

    return Common.buildDomElement(payloadJson);
  }

  //Display a request or response payload that has just been sent/received
  function displayPayload(newPayload) {
    if (newPayload !== null) {
      // Create new payload DOM element
      var payloadDiv = buildPayloadDomElement(newPayload);
      var payloadElement = document.querySelector(settings.selectors.payloadResponse);
      // Clear out payload holder element

      while (payloadElement.lastChild) {
        payloadElement.removeChild(payloadElement.lastChild);
      }

      // Add new payload element
      payloadElement.appendChild(payloadDiv);

      // Set the horizontal rule to show (if request and response payloads both exist)
      // or to hide (otherwise)
      var payloadInitial = document.querySelector(settings.selectors.payloadInitial);
    }
  }

  // Set up callbacks on payload response setter
  // This causes the displayPayload function to be called when messages are sent / received
  function payloadUpdateSetup() {
    var currentResponsePayloadSetter = this.setResponsePayload;
    setResponsePayload = function(newPayload) {
      currentResponsePayloadSetter.call(this, newPayload);
      displayPayload(settings.payloadTypes.response);
    };
  }

  //Initialize the module
  function init() {
    payloadUpdateSetup();
  }

  // Publicly accessible methods defined
  return {
    init: init,
    togglePanel: togglePanel,
    displayPayload,

    // The esponse getters/setters are defined here to prevent internal methods
    // from calling the methods without any of the callbacks that are added elsewhere.
    getResponsePayload: function() {
      return responsePayload;
    },
    setResponsePayload: function(newPayloadStr) {
      var newPayload = JSON.parse(newPayloadStr);
      responsePayload = newPayload;
    }
  };

}());
