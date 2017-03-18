import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    showHideEmotes() {
      let menu = document.getElementById('emote-container');
      menu.className = (menu.className === "hidden" ? "emote-container" : "hidden");
    },
    saveKappa() {
      let newEmote = this.store.createRecord('emote', {
        name: "LUL",
        url: "https://cdn.betterttv.net/emote/567b00c61ddbe1786688a633/1x"
      });

      newEmote.save();
    },
    setDarkMode(darkSetting) {
      if (darkSetting) {
        this.set("darkSetting", null);
      } else {
        this.set("darkSetting", Ember.String.htmlSafe("background-color: black"));
      }
    }
  }

});
