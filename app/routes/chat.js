import Ember from 'ember';
import DS from "ember-data";
import Filter from 'npm:bad-words';

const filter = new Filter();


export default Ember.Route.extend({
  userFromParams: null,

  model(params) {
    this.set('userFromParams', params.user_name);

    return Ember.RSVP.hash({
      messages: this.store.query('message', {
        limitToLast: 25
      }),
      emotes: this.store.findAll('emote')
    });
  },

  actions: {
    appendEmote(emote) {
      let m = this.controller.get('textMessageFromInput');
      if (m) this.controller.set("textMessageFromInput", m + " " + emote);
      else this.controller.set("textMessageFromInput", emote);
    },
    createMessage(message) {
      if (message) {
        this.store.query('emote', {}).then((result) => {

          result.forEach(e => {
            let re = new RegExp(`${e.get('name')}`, "g");
            message = message.replace(re, `<div class="tooltip"><img src=${e.get('url')}><span class="tooltiptext">${e.get('name')}</span></img></div>`);
          });

          let newRecord = this.store.createRecord('message', {
            text: filter.clean(message),
            user: this.get('userFromParams')
          });

          newRecord.save();


          this.controller.set('textMessageFromInput', '');
        });
      }
    }
  }
});
