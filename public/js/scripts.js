/* eslint-env browser */
/* eslint-disable no-undef */

const http = axios.create({ baseURL: `${location.href}api` })

Vue.createApp({
  setup() {
    const title = 'e-Wallet'
    const balance = Vue.ref(0)
    const transactions = Vue.reactive([])
    const formData = Vue.reactive({
      description: '',
      value: 0,
    })

    async function getBalance() {
      const { data } = await http.get('balance')
      balance.value = data.total_balance
    }

    async function handleNewTransaction() {
      try {
        const { data } = await http.post('/transactions', formData)
        transactions.push(data)
        formData.description = ''
        formData.value = 0
        tata.success('Sucesso', 'Transação realizada')
        getBalance()
      } catch (error) {
        const messages = error.response.data.message
        Object.keys(messages).forEach((field) => {
          tata.error(field, messages[field][0])
        })
      }
    }

    async function handleEditDescription(transaction) {
      try {
        const newDesc = prompt('Editar descrição:', transaction.description)

        if (newDesc !== null) {
          await http.patch(`/transactions/${transaction.id}`, { description: newDesc })
          transaction.description = newDesc
          tata.success('Sucesso', 'Descrição salva')
        }
      } catch (error) {
        const messages = error.response.data.message
        Object.keys(messages).forEach((field) => {
          tata.error(field, messages[field][0])
        })
      }
    }

    getBalance()
    http.get('transactions')
      .then((response) => response.data)
      .then((data) => transactions.push(...data))

    return {
      title,
      balance,
      transactions,
      ...Vue.toRefs(formData),
      handleNewTransaction,
      handleEditDescription,
    }
  },
}).mount('#app')
