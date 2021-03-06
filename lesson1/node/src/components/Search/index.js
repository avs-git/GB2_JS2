export default Vue.component('Search', {
  template: `<input id="search" @input="searchHandler" placeholder="Поиск..." />`,

  methods: {
    searchHandler(e) {
      this.$emit('valueChange', e);
    },
  },
});
