import Ember from 'ember';


export default Ember.Route.extend({
  userFromParams: null,

model(params) {
  this.set('userFromParams', params.user_name);
  window.store = this.store;

  return Ember.RSVP.hash({
    messages: this.store.query('message', {limitToLast: 5}),
    emotes: this.store.findAll('emote')
  });
},

  actions: {
    createMessage(message) {
      const checkEmotes = (str) => {
        let arr = str.split(" ");
        let newArr = [];
        arr.forEach((word) => {
          // console.log(word);
          this.store.query('emote', {name: `${word}`}).then((emote) => {
            console.log(emote);
          });

        });
        // console.log(newArr);
        return newArr.join(" ");
      };

      let newRecord = this.store.createRecord('message', {
        text: checkEmotes(message),
        user: this.get('userFromParams')
      });

      newRecord.save();

      this.controller.set('textMessageFromInput', '');
    },
    saveKappa(){
      // let newKappa = this.store.createRecord('emote', {
      //   name: "PogChamp",
      //   url: "<img src='https://static-cdn.jtvnw.net/emoticons/v1/88/1.0'></img>"
      // });
      //
      // newKappa.save();
    }
  }
});
