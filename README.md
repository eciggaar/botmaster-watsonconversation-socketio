# Getting started chatbot using Watson Conversation and the Botmaster framework
<div align="center">
Powered by <img src="http://botmasterai.com/documentation/latest/images/botmaster_light.svg" width="100"/>
</div>

Botmaster is a lightweight highly extendable, highly configurable chatbot framework. It was meant to be used both in small scale and large scale projects. Its purpose is to integrate your chatbot into a variety of messaging channels like Facebook, Telegram and Slack.

## Before you begin

* Create a Bluemix account
    * [Sign Up](https://bluemix.net/registration) in Bluemix, or use an existing account. Your account must have available space for at least 1 application (256MB) and 1 service.
* Make sure that you have the following prerequisites installed:
    * [The Node.js runtime](https://nodejs.org/en/) (including the npm package manager) when you plan to run your bot locally
    * [The Cloud Foundry and Bluemix](https://console.ng.bluemix.net/docs/cli/index.html#cli) command-line client is very useful.
* In order to connect your bot to Facebook messenger, you must first have a Facebook Developers account and page created. Click [here](https://www.facebook.com/login/?next=https%3A%2F%2Fdevelopers.facebook.com%2F) to create your Facebook developers account.

## Getting Started with Botmaster on Bluemix

If you wish to simply deploy a Botmaster instance without having to edit any of the pre-existing code, or when you do not wish to connect any additional API or additional functionality, use the steps below.

1. In order to setup Botmaster and a webhook for messenger to link to your Watson Conversation instance we first need to deploy a Bluemix application. For this, click the "Deploy to Bluemix" button below.
<div align="center">
<a href="https://bluemix.net/deploy?repository=https://github.com/eciggaar/botmaster-watsonconversation-socketio.git" # [required]><img src="https://bluemix.net/deploy/button.png" alt="Deploy to Bluemix"></a></div>

2. Log into Bluemix.
3. Give your application a unique name. This will be the URL for the base of your webhook.
4. Select the region, organization and space to deploy to.

  ![Name your application](https://github.com/eciggaar/botmaster-watsonconversation-socketio/blob/master/readmeimages/bluemixname.png?raw=true)

5. Once complete you will be presented with this screen. Now you can click "Edit Code" if you wish to add additional functionality.

  ![Success deployment](https://github.com/eciggaar/botmaster-watsonconversation-socketio/blob/master/readmeimages/success.png?raw=true)

6. Once successfully deployed, go to your Bluemix application dashboard and view your app.

  ![Success deployment](https://github.com/eciggaar/botmaster-watsonconversation-socketio/blob/master/readmeimages/appdetail.png?raw=true)

7. Select 'Runtime' followed by "Environment Variables".

  ![Success deployment](https://github.com/eciggaar/botmaster-watsonconversation-socketio/blob/master/readmeimages/envvar.png?raw=true)

8. Populate these fields with the required information. The `FACEBOOK_VERIFY_TOKEN` is a token you define yourself, the other two Facebook variables are obtained by following the section *Connecting to Facebook* below.

9. Follow the steps described in the [Getting Watson Conversation Credentials](#getting-watson-conversation-credentials) section to obtain the `WATSON_WORKSPACE_ID`.

10. Hit "Save" to restart your application.

### Connecting to Facebook

1. In order to connect to Facebook messenger, you must first have a Facebook Developers account and page created. If you don't already have these, follow the Steps 1-4 on the [Facebook Messenger guide](https://developers.facebook.com/docs/messenger-platform/guides/quick-start)

2. In step 2 of the guide, where you setup your webhook, you don't need to code anything. In the callback URL field, paste in your application URL from Bluemix using your webhook. By default this is set to `/webhook` (e.g myapp.bluemix.net/messenger/webhook) or in code **line 36**. Note the `/messenger` part of the URL. This is part of the callback URL and is a way for the Botmaster framework to distinguish between the different messaging platforms. For Telegram and Slack the values `/telegram` and `/slack` are used respectively.

3. Enter your verify token you created in the "Environment Variables" section and in **line 21** of your `manifest.yml`.

4. Select the following fields `messages`, `messaging_postbacks`. Those fields are "update"s using Botmaster semantics.

5. To find your Facebook App Secret, navigate to your application's dashboard and under App Secret click "Show", enter your password if prompted and then there it is. This will be the value for `FACEBOOK_APP_SECRET`.

6. Finally, the third step in the guide will get you the `FACEBOOK_PAGE_TOKEN`.

## Getting started with Botmaster locally

The best way to begin utilizing Botmaster is to run the app locally. This allows you to customize the code to match your needs. If however you are happy with what is already included, go ahead and skip to [Getting Started with Botmaster on Bluemix](#getting-started-with-botmaster-on-bluemix).

Otherwise, begin by changing to the directory of this repository you have just cloned or downloaded.

* This can be done via command line e.g `cd ~/botmaster-watsonconversation-basic`

To customize your Botmaster framework, such as adding additional actions or API services, find more detailed instructions in the [Botmaster Documentation](http://botmasterai.com/).

## Getting Watson Conversation Credentials

In order for Watson Conversation to integrate with Botmaster, the following credentials are required
  - Service Credentials
  - Conversation Workspace ID

### Service Credentials
---
1. Find your service within Bluemix and click to view the service details screen. Create a new Watson Conversation service in case you want to run your bot locally. If you wish to run the bot on Bluemix, the service will be created for you as part of the deployment process.

  ![Find your service](https://github.com/eciggaar/botmaster-watsonconversation-socketio/blob/master/readmeimages/services.png?raw=true)

2. From this screen click the "Service Credentials" tab

  ![Get workspace ID](https://github.com/eciggaar/botmaster-watsonconversation-socketio/blob/master/readmeimages/servicecredentials.png?raw=true)

3. Copy the username and password information. We will use this later when connecting our conversation to Botmaster.

### Conversation Workspace ID
---
1. Open the conversation instance you have created.
2. In the service instance detail click "Launch Tool".

  ![Launch tooling](https://github.com/eciggaar/botmaster-watsonconversation-socketio/blob/master/readmeimages/launchtool.png?raw=true)

3. Once in the Conversation tooling locate your conversation workspace. If you don't have a Conversation workspace yet, this the place where you have to create one.
4. Click the menu located top right and select "View Details".

  ![Get workspace ID](https://github.com/eciggaar/botmaster-watsonconversation-socketio/blob/master/readmeimages/workspaceid.png?raw=true)

5. Copy your workspace ID and make a note of this. We will use this with service credentials to connect our Watson Conversation to Botmaster.

## Connecting IBM Watson Conversation & Facebook Messenger
You will notice within the repository files there is a `manifest.yml` file. This file is where we will enter our credentials to connect your application to IBM Watson Conversation and Facebook Messenger. For this, change the following lines with your information.

<img src="https://github.com/eciggaar/botmaster-watsonconversation-socketio/blob/master/readmeimages/env.png?raw=true" width="500">

## Logging into Bluemix
Bluemix is where we will host our application, therefore we will make use of the Cloud Foundry command line to help us manage and push the application.

1. Open a terminal or command prompt.<p/>
2. Set the API endpoint of your Bluemix space. The endpoints for the US region and the UK region are listed below.<p/>
    * `cf api https://api.ng.bluemix.net` - US South
    * `cf api https://api.eu-gb.bluemix.net` - UK<p/>
3. Login to Bluemix using:<p/>
    * `cf login`
    * Enter your email address of your Bluemix account.
    * Hit enter.
    * Enter your password of your Bluemix Account (*it will appear your password is not typing*)
    * Hit enter.<p/>
4. Select your space following on screen prompt.<p/>
5. To confirm and check which region, org and space is currently targeted type:<p/>
    * `cf target`

Once you have successfully logged in and targeted Bluemix you can now push your application to Bluemix.

## Pushing to Bluemix
Once you have finished working on your application you can now push this to Bluemix to be hosted.

1. Open a terminal or command prompt.

2. Login to Bluemix as described in [Logging into Bluemix](#logging-into-bluemix)

3. Change directory to your repository using `cd <your_repository>`.

4. Use the following command to push to Bluemix `cf push`.

*Note*: Before you use `cf push` ensure you have edited the `manifest.yml` file. You will need to update lines **13** and **14** using the unique name of your application.

## Exporting Your Conversation
If you wish to export your conversation in the raw .json format to share with others or backup, this can be achieved by following:

1. Log into Bluemix.

2. Locate your conversation service.

3. Within your conversation service locate your workspace.

4. Use the menu in the top right of your workspace and click "Download as JSON".

  <img src="https://github.com/eciggaar/botmaster-watsonconversation-socketio/blob/master/readmeimages/instance.png?raw=true" width="350px">

## Connecting Third Party API
Botmaster supports Third party API integration to enable the conversation of your bot to be enriched. Within the `weather.js` middleware file you will see a pre-included Weather API that makes use of IBM Weather Company Data.

This sample code is able to be adapted to call any API function that returns a .json response. This is outputted as a message to the user within the specified channel.

## Calling the API
To invoke an API call, your application may require a trigger. To do this, we've set an API trigger within the watson.output.context.action json tag. We have defined this within the Watson Conversation advanced dialog. Whenever the specified node is reached by the user, the action is triggered.

See e.g. the botmaster-watsonconversation-flightbot repository for an example implementation of this.

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

Deployment tracking can be disabled by removing `require('cf-deployment-tracker-client').track();` from the beginning of the `server.js` file at the root of this repo.

## Additional Links

Botmaster Documentation : [Botmaster Documentation](http://botmasterai.com/)

Facebook Messenger Webhook Reference : [Facebook Webhooks](https://developers.facebook.com/docs/messenger-platform/webhook-reference#setup)

Watson Conversation Documentation : [Watson Conversation](http://www.ibm.com/watson/developercloud/doc/conversation/index.html)
