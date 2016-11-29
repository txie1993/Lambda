import Ember from 'ember';

export default Ember.Component.extend({
  didRender() {
    let c = document.getElementById("chat");
    c.scrollTop = c.scrollHeight;
  }
});
