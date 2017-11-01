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

const request = require('request-promise');
const config = require('../../config');

const addWeatherInfoToUpdate = {
  type: 'incoming',
  name: 'add-weather-to-update',
  controller: (bot, update, next) => {

    let weatherUrl = config.weatherCredentials.host;
    //weatherUrl = 'https://' + weatherUrl + '/api/weather/v1/geocode/52.34/4.83/forecast/daily/3day.json?units=m';
    weatherUrl = 'https://' + weatherUrl + '/api/weatherinfo';

    const requestOptions = {
        // Get daily forcasts for the next three days based for the location Amsterdam
        url: weatherUrl,
        /*auth: {
            user: config.weatherCredentials.username,
            pass: config.weatherCredentials.password
        },*/
        json: true,
    }

    if (typeof update.session.context.weather === 'undefined') {
        request(requestOptions)
            .then((body) => {
                update.session.context.weather = {};
                update.session.context.weather.narrative = body.forecasts[0].narrative;
                next();
            })
            .catch((err) => {
                console.log(err);
            })
    } else {
      next();
    }
  }
}

module.exports = {
  addWeatherInfoToUpdate
}
