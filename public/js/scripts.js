/* eslint-env browser */
/* eslint-disable no-undef */

Vue.createApp({
  setup() {
    const title = 'e-Wallet'
    const count = Vue.ref(0)
    const increase = () => count.value++
    const decrease = () => count.value--

    return {
      title,
      count,
      increase,
      decrease,
    }
  },
}).mount('#app')
