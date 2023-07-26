import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nonce: 1,
    lc: '',
    logs: '',
    price: '',
    qty: '',
    amount: '',
    labelPrice: '',
    labelQty: '',
    labelAmount: '',
    log: ''
  },
  getters: {
    nonce(state) {
      return state.nonce
    },
    price(state) {
      return state.price
    },
    qty(state) {
      return state.qty
    },
    amount(state) {
      return state.amount
    },
    labelPrice(state) {
      return state.labelPrice
    },
    labelQty(state) {
      return state.labelQty
    },
    labelAmount(state) {
      return state.labelAmount
    },
    lc(state) {
      return state.lc
    },
    log(state) {
      return state.log
    }
  },
  mutations: {
    send(state) {
      state.nonce += 1
      let lc = {nonce: state.nonce, price: state.price, qty: state.qty, amount: state.amount}
      state.log = "Отправлено: " + JSON.stringify(lc) + ", localStorage: " + localStorage.getItem('post') + "\n" + state.log
      setTimeout(()=>{
        if (state.amount && state.amount % 2 == 0) {
          localStorage.setItem('post', JSON.stringify(lc));
          state.lc = JSON.parse(localStorage.getItem('post'))
          state.log = "{success: true}" + ", отправлено: " + JSON.stringify(lc) + ", localStorage: " + localStorage.getItem('post') + "\n" + state.log
        } else {
          state.log = "{success: false}" + ", отправлено: " + JSON.stringify(lc)+ ", localStorage: " + localStorage.getItem('post') + "\n" + state.log
        }
      },1000);
    },
    updateLogs(state, el) {
      state.log = el.label + ': ' + el.num + "\n" + state.log
    },
    updateLocalStorage (state, lc) {
      state.lc = lc
    },
    updatePrice (state, price) {
      state.price = price
    },
    updateQty (state, qty) {
      state.qty = qty
    },
    updateAmount (state, amount) {
      state.amount = amount
    },
    updateLabelPrice (state, price) {
      state.labelPrice = price
    },
    updateLabelQty (state, qty) {
      state.labelQty = qty
    },
    updateLabelAmount (state, amount) {
      state.labelAmount = amount
    }
  },
  actions: {
    fetchLocalStorage (ctx) {
      let lc = JSON.parse(localStorage.getItem('post'))
      ctx.commit("updateLocalStorage", lc)
    },
    updatePrice (ctx, price) {
      ctx.commit("updatePrice", price)
      setTimeout(()=>{
        ctx.commit("updateLabelPrice", price)
        ctx.commit("updateLogs", {num: price, label: 'price'})
      },300);
    },
    updateQty (ctx, qty) {
      ctx.commit("updateQty", qty)
      setTimeout(()=>{
        ctx.commit("updateLabelQty", qty)
        ctx.commit("updateLogs", {num: qty, label: 'qty'})
      },300);
    },
    updateAmount (ctx, amount) {
      ctx.commit("updateAmount", amount)
      setTimeout(()=>{
        ctx.commit("updateLabelAmount", amount)
        ctx.commit("updateLogs", {num: amount, label: 'amount'})
      },300);
    }
  },
  modules: {
  }
})
