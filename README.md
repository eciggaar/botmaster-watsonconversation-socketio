# Getting started chatbot using Watson Conversation and the Botmaster framework
<div align="center">
Powered by <img src="http://botmasterai.com/documentation/latest/images/botmaster_light.svg" width="100"/>
</div>

Botmaster is a lightweight highly extendable, highly configurable chatbot framework. It is designed to be used both in small scale and large scale projects. Its purpose is to integrate your chatbot into a variety of messaging channels like Facebook, Twitter, Telegram, Slack and Socket.IO. This project describes how to get started with botmaster, Watson Conversation and socket.io.

## Before you begin

* Create a Bluemix account

    * [Sign Up](https://developer.ibm.com/sso/bmregistration) in Bluemix, or use an existing account. Your account must have available space for at least 1 application (256MB) and 2 services.

The following steps are optional.

* When you plan to run your bot locally, make sure you have the following prerequisites installed:

    * [The Node.js runtime](https://nodejs.org/en/) (including the npm package manager)
    * [The Cloud Foundry and Bluemix](https://console.ng.bluemix.net/docs/cli/index.html#cli) command-line client is very useful.

## Getting Started with Botmaster on Bluemix

1. To get your own copy of the sample application that integrates with Watson Conversation and exposes its responses via socket.io, click the "Deploy to Bluemix" button.

  <a href="https://bluemix.net/deploy?repository=https://github.com/eciggaar/botmaster-watsonconversation-socketio.git" target="_blank">
    <img src="https://deployment-tracker.mybluemix.net/stats/a3a41102a5d277cce1b65b7b1dc018e8/button.svg">
  </a>

2. Log into Bluemix.

3. Give your Toolchain a unique name. This will also be the name of your application and it will form the base of your application URL.

  ![Name your application][1]

4. Select the "Delivery Pipeline" icon and choose your region, organization and space to deploy to.

  ![Select region][2]

5. Once successfully deployed, you will be presented with this screen. Now you can click "View app" to see the bot's user interface.

  ![Success deployment][3]

## Step 1: Import your workspace

To make life a bit easier for you, we've included a sample workspace to give you a jump-start with your own workspace. The steps below describe how to import this workspace and how to link this to the application.

1. Open the [contents][4] of the sample workspace JSON file in a separate tab. Select the contents of the page and save it to a file on your own device.

  ![Create workspace][5]

2. Open your Bluemix application [dashboard](https://console.ng.bluemix.net) and select the `conversation-service-socketio` that was created for you during the deployment process. Click on "Launch tool" to open the Watson Conversation Tooling. You might need to switch region and/or space to match the selection you've made in Step 4 of [Getting Started with Botmaster on Bluemix](#getting-started-with-botmaster-on-bluemix)

  ![Launch tool][6]

3. Click the import button and upload the workspace JSON file that you created in Step 1.

  ![Import JSON][7]

## Step 2: Obtain the workspace ID and link it to your app

1. Make sure the Watson Conversation Tooling is opened and that the workspaces overview page is active. If not, follow Step 2 in the section above to open the tooling page.

2. Next, click the actions (3 dots) of the 'Demo Workspace' tile and select 'View Details'.

  ![Get workspace ID][8]

3. Copy the workspace ID to your clipboard.

4. Open your Bluemix app dashboard and select the application that was deployed for you in Step 1 of [Getting Started with Botmaster on Bluemix](#getting-started-with-botmaster-on-bluemix).

  ![Success deployment][9]

5. Select 'Runtime' followed by 'Environment Variables'.

  ![Success deployment][10]

6. Paste the workspace ID from your clipboard as value of the variable `WATSON_WORKSPACE_ID`. Click 'Save' to apply the changes.

## Step 3: Enhance the conversation

Once the application successfully restarted, click the application URL to view your app. You should see a page similar to

![bot-socketio][11]

Did you see this page? Well, congratulations!! :smiley: You can now continue to fine-tune your conversation by adding more intents, define entities and include these in your dialog.

Check out the [Conversation tutorial](CONVERSATION.md) for more details. Feel free to define your own intents and entities to include in your dialog.

## Exporting Your Conversation

Follow the steps below to export your conversation in the raw .json format to share with others or for backup.

1. Log into Bluemix.

2. Locate your conversation service.

3. Within your conversation service locate your workspace.

4. Use the menu in the top right of your workspace and click "Download as JSON".

  <img src="https://github.com/eciggaar/botmaster-watsonconversation-socketio/blob/master/readmeimages/instance.png?raw=true" width="350px">

## Connecting Third Party API
Botmaster supports Third party API integration to enable the conversation of your bot to be enriched. Within the `weather.js` middleware file you will see a pre-included Weather API that makes use of IBM Weather Company Data.

This sample code is able to be adapted to call any API function that returns a .json response. This can be outputted as a message to the user within the specified channel.

To see what weather information is currently included, open the application URL and append `debug.html` to it. This will open a debug view and looks like:

![bot-socketio-debug][12]

## License

  This sample code is licensed under Apache 2.0. Full license text is available in [LICENSE](LICENSE).

## Privacy Notice

This node sample web application includes code to track deployments to Bluemix and other Cloud Foundry platforms. The following information is sent to a [Deployment Tracker][deploy_track_url] service on each deployment:

* Application Name (`application_name`)
* Space ID (`space_id`)
* Application Version (`application_version`)
* Application URIs (`application_uris`)

This data is collected from the `VCAP_APPLICATION` environment variable in IBM Bluemix and other Cloud Foundry platforms. This data is used by IBM to track metrics around deployments of sample applications to IBM Bluemix. Only deployments of sample applications that include code to ping the Deployment Tracker service will be tracked.

### Disabling Deployment Tracking

Deployment tracking can be disabled by removing `require('cf-deployment-tracker-client').track();` from the beginning of the `app.js` file at the root of this repo.

## Additional Links

* Botmaster Documentation : [Botmaster Documentation](http://botmasterai.com/)
* Watson Conversation Documentation : [Watson Conversation](http://www.ibm.com/watson/developercloud/doc/conversation/index.html)

[1]: https://github.com/eciggaar/botmaster-watsonconversation-socketio/blob/master/readmeimages/bluemixname.png?raw=true
[2]: https://github.com/eciggaar/botmaster-watsonconversation-socketio/blob/master/readmeimages/region.png?raw=true
[3]: https://github.com/eciggaar/botmaster-watsonconversation-socketio/blob/master/readmeimages/success.png?raw=true
[4]: https://raw.githubusercontent.com/eciggaar/botmaster-watsonconversation-socketio/master/resources/demo-workspace-socketio.json
[5]: https://github.com/eciggaar/botmaster-watsonconversation-socketio/blob/master/readmeimages/create-workspace.png?raw=true
[6]: https://github.com/eciggaar/botmaster-watsonconversation-socketio/blob/master/readmeimages/launch.png?raw=true
[7]: https://github.com/eciggaar/botmaster-watsonconversation-socketio/blob/master/readmeimages/import-json.png?raw=true
[8]: https://github.com/eciggaar/botmaster-watsonconversation-socketio/blob/master/readmeimages/workspaceid.png?raw=true
[9]: https://github.com/eciggaar/botmaster-watsonconversation-socketio/blob/master/readmeimages/select-app.png?raw=true
[10]: https://github.com/eciggaar/botmaster-watsonconversation-socketio/blob/master/readmeimages/envvar.png?raw=true
[11]: https://github.com/eciggaar/botmaster-watsonconversation-socketio/blob/master/readmeimages/bot-socketio.png?raw=true
[12]: https://github.com/eciggaar/botmaster-watsonconversation-socketio/blob/master/readmeimages/bot-socketio-debug.png?raw=true
