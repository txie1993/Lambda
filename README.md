# Lambda - An Ember Chat

[Live](https://www.lambdaforthe.win/)

![splash](https://github.com/txie1993/Lambda/blob/master/docs/Screen%20Shot%202016-11-30%20at%206.19.07%20PM.png?raw=true)
![chat](https://github.com/txie1993/Lambda/blob/master/docs/Screen%20Shot%202016-11-30%20at%206.21.02%20PM.png?raw=true)

## Background

Twitch chat culture is one of the most prominent phenomena on the internet - the simple ability to add emotes through text recognition creates hundreds of reasons to use Twitch chat over another chat client.

Like Twitch itself, I used Ember on the front end to deploy a chat client that can recognize words as emotes. Users are able to select a username upon entering the chatroom, and spam the chat with emotes and copypasta to their heart's desire.

## Technologies and Languages Used

* JavaScript (ES6)
* Ember.js
* CSS3
* SASS


## Implementation Details

I did not know Ember when I began to write this app, and self-taught Ember as I wrote. Lambda is based on Zoltan's Ember Chat App, I consulted Zoltan over Twitter and other members of the Ember Community Slack channel for guidance when I got stuck.

### Emote Replacement

Emotes are stored remotely in Firebase as a name and image URL, which is then interpolated in chat. When creating a message, the app checks for the presence of an emote and globally replaces all instances of that emote in the message.

```javascript
createMessage(message) {
  if (message) {
    this.store.query('emote', {}).then((result) => {

      result.forEach(e => {
        let re = new RegExp(`${e.get('name')}`, "g");
        message = message.replace(re, `<div class="tooltip"><img src=${e.get('url')}><span class="tooltiptext">${e.get('name')}</span></img></div>`);
      });

      let newRecord = this.store.createRecord('message', {
        text: message,
        user: this.get('userFromParams')
      });

      newRecord.save();


      this.controller.set('textMessageFromInput', '');
    });
  }
}
```

### Username Colors

Twitch stores a color for usernames to appear in chat, but Lambda only gets usernames from the URL params. To get unique colors for each user, I hashed each username into a 6-character hex string, which I then escaped and used as the style for each username.


```javascript

const stringToColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
};

export default Ember.Component.extend({
  didReceiveAttrs(){
    this.set('userColor', Ember.String.htmlSafe("color :" + stringToColor(this.user)));
  }
});

```

## Future Features

- [ ] Copy/Paste Emotes
- [ ] Migrate to Rails
- [ ] More Emotes
- [ ] Account System
- [ ] Dark Mode
