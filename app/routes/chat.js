import Ember from 'ember';
import DS from "ember-data";


export default Ember.Route.extend({
  userFromParams: null,

  model(params) {
    this.set('userFromParams', params.user_name);

    return Ember.RSVP.hash({
      messages: this.store.query('message', {
        limitToLast: 5
      }),
      emotes: this.store.findAll('emote')
    });
  },

  actions: {
    createMessage(message) {

      const checkEmotes = (str) => {
        return this.store.query('emote', {}).then((result) => {

          result.forEach(e => {
            let re = new RegExp(`${e.get('name')}`, "g");
            str = str.replace(re, `${e.get('url')}`);
          });

          return str;
        });
      };

      let newRecord = this.store.createRecord('message', {
        text: checkEmotes(message),
        user: this.get('userFromParams')
      });

      newRecord.save();

      this.controller.set('textMessageFromInput', '');
    },
    saveKappa() {
      // let newKappa = this.store.createRecord('emote', {
      //   name: "PogChamp",
      //   url: "<img src='https://static-cdn.jtvnw.net/emoticons/v1/88/1.0'></img>"
      // });
      //
      // newKappa.save();
    }
  }
});
