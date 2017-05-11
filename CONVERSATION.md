
# Conversation Tutorial
This tutorial guides you through setting up additional intents and entities and explains how to include these in your dialog.

## Step 1: Adding a new intent
An intent is a purpose or goal expressed in the user's input, e.g. answering a question or turning on an appliance in your car. By recognizing the intent expressed in the user's input, the Watson Conversation service can choose the correct dialog flow for responding to it.

1. On the Workspaces page, select the workspace tile that you created.

2. On the Intents tab, select **Create new** and add the following intent name: `turn_on`. This intent indicates that the user wants to turn on an appliance such as the car's radio, airco or headlights.

3. In the **User example** field, type `I need lights` as sample sentence and press Enter.

4. Add these 4 more examples to help Watson recognize the `#turn_on` intent and hit Enter:
```
  Listen to some music
  Play some tunes
  Air on please
  Turn on the headlights
```

Finally, click **Create** at the top right to complete the intent creation. You now defined an additional intent `#turn_on` with example utterances. These examples help train Watson to recognize the intents in the user's input.

## Step 2: Adding entities
An entity definition includes a set of entity _values_ that can be used to trigger different responses. Each entity value can have multiple _synonyms_, which define different ways that the same value might be specified in the user's input.

Create entities to represent what the user wants to turn on.

1. On your workspace page, click the Entities tab.
2. On the Entities tab, click **Create new** and add an entity named `appliance`.

The `@appliance` entity represents an appliance in the car that a user might want to turn on. This could be the radio, the airco or e.g. the lights.

1. Add `music` as value in the **Value** field.The value represents a specific appliance that users might want to turn on.

2. Add `radio` in the **Synonyms** field as another way to specify the music appliance entity.

3. Click the plus sign **(+)** to define additional values for `@appliance`.

    * Value: `headlights`. Synonym: `lights`.

    * Value: `air conditioning`. Synonyms: `air` and `airco`.

  Click **Create** when finished.

4. Repeat the process to create the `@genre` entity with 2 values and synonyms:

    * Value: `classical`. Synonym: `symphonic`.

    * Value: `rhythm and blues` Synonym: `r&b`

    * Value: `rock`. Synonym: `pop`

You defined two entities: `@appliance` -- representing an appliance that can be turned on -- and `@genre` representing a genre of music the user can choose. The next section will explain how you can extend the existing dialog to use these intents and entities and set the correct response.

## Step 3: Extending your dialog
A dialog is a set of conversational nodes that are contained in a workspace. Together the set of nodes makes a dialog tree, on which every branch is a conversation that can be held with a user. A _Welcome, Get weather info_ and _Greeting_ branch are already set up for you.

Now we are going to extend the dialog by adding a branch that responds to the `#turn_on` intent. Because there are multiple possibilities for what the user might want to turn on, this branch represents a more complex conversation.

For this, we start by creating the root-level node:

1. Select the **+** icon on the bottom of the `#greeting` node to create a root-level node. If the **+** icon isn't visible, select the `#greeting` node to put it into focus.

2. In the **Name this node** field, enter `Turn On`. The title does not affect the processing of the node, but it makes it easier to find.

3. In the edit view, in the **Trigger** field, start typing `#turn_on`.

4. Select **#turn_on** from the list. This condition is triggered by any input that matches the `#turn_on` intent.

5. Do not enter a response in this node.

### Add multiple child nodes for `#turn_on`
The `#turn_on` intent requires additional processing, because the dialog needs to determine which appliance the user wants to turn on. To handle this, we create multiple responses based on additional conditions. There are three possible scenarios, based on the intents and entities that we have defined:

1. The user wants to turn on the music, in which case we need to ask for the genre.

2. The user wants to turn on any other valid appliance, in which case we simply echo the name of the requested appliance in a message that indicates that we're turning it on.

3. The user does not specify a recognizable appliance name, in which case we need to ask for clarification.

We'll check the conditions in this order. Determining the most efficient order in which to check conditions is an important skill in building dialog trees. If you find a branch is becoming very complex, check the conditions to see whether you can simplify your dialog by reordering them. It's often best to process the most specific conditions first.

To check the input, add a child node:

1. Select the **+** icon on the side of the `turn on` node to create a child node.

2. In the **Name this node** field, enter `Music`.

3. Under **Trigger**, enter `@appliance:music`. This condition is true if the value of the `@appliance` entity is `music` or one of its synonyms, as defined on the Entities tab.

4. In the **Enter a response** field, enter `What kind of music would you like to hear?`

5. Exit the edit view of this node by clicking ![Close][1].

We want to jump directly from the _Turn On_ node to the _Music_ node without asking for any more user input. To do this, we use a **Jump to** action.

1. In the _Turn On_ node, select the **Jump to** icon ![Jump to][2].
2. Select the _Music_ node, and then select **Go to condition**. We want to process the condition of the _Music_ node.

![Jump to before][3]

Note that you had to create the target node -- the node to which you want to jump -- before you added the **Jump to** action.

After you select **Go to condition** you see a new box in the tree:

![Jump to after][4]

Now we need a node to process the type of music that the user requests.

1. Select the **+** icon on the right side of the _Music_ node to create a child node and enter `Genre` in the **Name this node** field. This child node is evaluated only after the user has responded to the question about the type of music. Because we need a user input before this node, there is no need to use a **Jump to** action.

2. Under **Trigger**, enter `@genre`. This condition is true whenever a valid value for the `@genre` entity is detected.

3. In the **Enter a response** field, enter `OK! Playing @genre.` This response uses the value that the user entered.

We also need a node to respond when the user does not specify a recognized value for `@genre`.

1. Select the **+** icon on the bottom of the _Genre_ node to create a peer node. Name it `Genre not recognized`.

2. Under **Trigger**, enter `true`. This condition specifies that if the dialog flow reaches this node, it should always evaluate as true. If the user specifies a valid `@genre` value, this node will never be reached.

3. In the **Enter a response** field, enter `I'm sorry, I don't understand. I can play classical, rhythm and blues, or rock music.`

![Music branch][5]

That takes care of all the cases where the user asked us to turn on the music.

### Test the dialog for music
In this section we'll test the conversation via the chat pane.

1. Select the ![Ask Watson][6] icon to open the chat pane.

2. Type `Play music`. The bot recognizes the `#turn_on` intent and the `@appliance:music` entity, and it responds by asking for a musical genre.

3. Type the name or a synonym for a valid `@genre` value (for example, `pop`). The bot recognizes the `@genre` entity and responds appropriately.

4. Type `Play music` again, but this time specify an invalid response for the genre.

The bot responds that it does not understand.

### Create nodes for other appliances
Next, we'll create a node that is used when the user specifies any other valid value for `@appliance`. For these other values of `@appliance`, we don't need to ask for any more input. We just give a positive response.

1. Select the _Music_ node, so that the options to create child and peer nodes are displayed.

2. Select the **+** icon on the bottom of the music node to create a peer node.

3. Under **Trigger**, enter `@appliance`. This condition is triggered if the user input includes any recognized value for the `@appliance` entity, except music.

4. In the **Enter a response** field, enter `OK! Turning on the @appliance.` This response uses the value that the user entered.

Now add a peer node that will be triggered if the user input did not specify a valid appliance:

1. Select the **+** icon on the bottom of the `@appliance` node to create a peer node.

2. Under **Trigger**, enter `true`. This condition specifies that if the dialog flow reaches this node, it should always evaluate as true. If the user specifies a valid `@appliance` value, this node will never be reached.

3. In the **Enter a response** field, enter `I'm sorry, I don't know how to do that. I can turn on music, headlights, or air conditioning.`.

### Test the dialog with other appliances
We will now test the conversation again with the other appliances.

1. Select the ![Ask Watson][6] icon to open the chat pane.

2. Type `Lights on`.

  The bot recognizes the `#turn_on` intent and the `@appliance:headlights` entity, and it responds with `OK, turning on the headlights`.

3. Type `Turn on the airco`.

  The bot recognizes the `#turn_on` intent and the `@appliance:(air conditioning)` entity, and it responds with `OK, turning on the air conditioning.`

4. Try variations on all of the supported commands based on the example utterances and entity synonyms you defined.

If the bot fails to recognize the correct intent, you can retrain it directly from the chat window. Select the incorrect intent and type the correct one in the field.

**Tip**: Don't include the `#` character when you type the intent name.

## What to do next

Now that your bot is complete, you can experiment by enhancing it with new functions. For example:

* Define entities for additional appliances and musical genres
* Add synonyms for entities
* Add a new intent to turn off appliances
* Add capability for turning on music and specifying a musical genre with a single command

[1]: https://github.com/eciggaar/botmaster-watsonconversation-socketio/blob/master/readmeimages/close.png?raw=true
[2]: https://github.com/eciggaar/botmaster-watsonconversation-socketio/blob/master/readmeimages/jump-to.png?raw=true
[3]: https://github.com/eciggaar/botmaster-watsonconversation-socketio/blob/master/readmeimages/jump-to-before.png?raw=true
[4]: https://github.com/eciggaar/botmaster-watsonconversation-socketio/blob/master/readmeimages/jump-to-after.png?raw=true
[5]: https://github.com/eciggaar/botmaster-watsonconversation-socketio/blob/master/readmeimages/music-branch.png?raw=true
[6]: https://github.com/eciggaar/botmaster-watsonconversation-socketio/blob/master/readmeimages/ask-watson.png?raw=true
