import GoodsItem from './GoodsItem';

export default Vue.component('GoodsList', {
  template: `<div class="goods-list">
                <GoodsItem
                  v-for="good in goods"
                  :title="good.title"
                  :price="good.price"
                  :id="good.id"
                  @addToCart="addToCartHandler"
                />
              </div>`,
  props: {
    goods: Array,
  },
  methods: {
    addToCartHandler(id) {
      this.$emit('addToCart', id);
    },
  },
});
