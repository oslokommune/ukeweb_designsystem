import pagination from './pagination.vue';

function pageEvent(event, payload) {
  console.log(event + ": " + payload)
}

document.addEventListener('DOMContentLoaded', function () {
  if (document.getElementById('vue-pagination')) {
    Vue.component('osg-pagination', pagination);
    new Vue({ el: '#vue-pagination' });
  }
});
