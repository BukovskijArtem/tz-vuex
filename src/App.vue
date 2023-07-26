<template>
  <div>
    <div id="parent">
      <div>
        <input v-model="price" placeholder="price" type="number"/>
        <label >{{ labelPrice }}</label>
      </div>
      <div>
        <input v-model="qty" placeholder="qty" type="number"/>
        <label >{{ labelQty }}</label>
      </div>
      <div>
        <input v-model="amount" placeholder="amount" type="number"/>
        <label >{{ labelAmount }}</label>
      </div>
      <div>
        <button @click="$store.commit('send')">Send</button>
        <label>{{ lc }}</label>
      </div>
    </div>
    <div id="log">
      <textarea rows="20" disabled>{{ log }}</textarea>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  mounted () {
    this.$store.dispatch("fetchLocalStorage")
  },
  computed: {
    price: {
      get: function () {
        return this.$store.getters.price
      },
      set: function (price) {
        this.$store.dispatch("updatePrice", price)
      }
    },
    qty: {
      get: function () {
        return this.$store.getters.qty
      },
      set: function (qty) {
        this.$store.dispatch("updateQty", qty)
      }
    },
    amount: {
      get: function () {
        return this.$store.getters.amount
      },
      set: function (amount) {
        this.$store.dispatch("updateAmount", amount)
      }
    },
    ...mapGetters(['labelPrice','labelQty','labelAmount','lc', 'log'])
  }
}
</script>

<style scoped>
#parent {
	flex-direction: row;
	display: flex;
}
#parent > div {
  margin-left:5%;
  flex-direction: column;
	display: flex;
}
#parent > div > label{
  margin-top:10px;
}
#log {
  margin-left:5%;
  margin-top:5%;
}
#log > textarea {
  width: 70%;
}
</style>
