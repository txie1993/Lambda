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
      this.store.query('emote', {}).then((result) => {

        result.forEach(e => {
          let re = new RegExp(`${e.get('name')}`, "g");
          message = message.replace(re, `${e.get('url')}`);
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
});
