/* eslint-env browser */
/* eslint-disable no-undef */

const http = axios.create({ baseURL: `${location.origin}/api` })

function useBalance() {
  const balance = Vue.reactive({
    credits: 0,
    debits: 0,
    total: 0,
  })

  async function fetchBalance({ from, to } = {}) {
    const response = await http.get('balance', { params: { from, to } })
    balance.credits = response.data.total_credits
    balance.debits = response.data.total_debits
    balance.total = response.data.total_balance
  }

  fetchBalance()

  return {
    balance,
    fetchBalance,
  }
}

function useCategories() {
  const categories = Vue.reactive([])

  async function fetchCategories() {
    const response = await http.get('categories')
    categories.push(...response.data)
  }

  async function createCategory({ name }) {
    const response = await http.post('categories', { name })
    categories.push(response.data)

    return response.data
  }

  fetchCategories()

  return {
    categories,
    fetchCategories,
    createCategory,
  }
}

function useTransactions() {
  const transactions = Vue.reactive([])

  async function fetchTransactions({ from, to } = {}) {
    const response = await http.get('transactions', { params: { from, to } })
    transactions.splice(0, transactions.length, ...response.data)
  }

  async function createTransaction({ value, description, category_id }) {
    const response = await http.post('transactions', { value, description, category_id })
    transactions.push(response.data)

    return response.data
  }

  async function updateTransaction({ id, description, category_id }) {
    const response = await http.put(`transactions/${id}`, { description, category_id })
    const index = transactions.findIndex((transaction) => transaction.id === id)
    transactions.splice(index, 1, response.data)

    return response.data
  }

  fetchTransactions()

  return {
    transactions,
    fetchTransactions,
    createTransaction,
    updateTransaction,
  }
}

Vue.createApp({
  setup() {
    const { balance, fetchBalance } = useBalance()
    const { categories, createCategory } = useCategories()
    const { transactions, fetchTransactions, createTransaction, updateTransaction } = useTransactions()
    const editingTransaction = Vue.ref(null)
    const fromDate = Vue.ref('')
    const toDate = Vue.ref('')
    const editingField = Vue.ref('')
    const newCategory = Vue.ref('')
    const descriptionModal = Vue.ref(null)
    const categoryModal = Vue.ref(null)
    const formData = Vue.reactive({
      description: '',
      category: null,
      value: 0,
    })

    function handleEditField(transaction, field) {
      editingTransaction.value = transaction
      editingField.value = transaction[field]?.id
        ? transaction[field].id
        : transaction[field] ?? ''
    }

    async function handleNewTransaction() {
      try {
        await createTransaction(formData)
        formData.description = ''
        formData.value = 0
        tata.success('Sucesso', 'Transação realizada')
        fetchBalance()
      } catch (error) {
        const messages = error.response.data.message
        Object.keys(messages).forEach((field) => {
          tata.error(field, messages[field][0])
        })
      }
    }

    async function handleUpdateCategory() {
      try {
        let category = categories.find(({ id }) => id === editingField.value)

        if (!category && newCategory.value) {
          category = await createCategory({ name: newCategory.value })
          tata.success('Sucesso', 'Categoria criada')
        }

        await updateTransaction({
          id: editingTransaction.value.id,
          category_id: category?.id ?? null,
        })
        categoryModal.value.click()
        tata.success('Sucesso', 'Descrição salva')
      } catch (error) {
        const messages = error.response.data.message
        Object.keys(messages).forEach((field) => {
          tata.error(field, messages[field][0])
        })
      }
    }

    async function handleUpdateDescription() {
      try {
        await updateTransaction({
          id: editingTransaction.value.id,
          description: editingField.value,
        })
        descriptionModal.value.click()
        tata.success('Sucesso', 'Descrição salva')
      } catch (error) {
        const messages = error.response?.data.message
        messages && Object.keys(messages).forEach((field) => {
          tata.error(field, messages[field][0])
        })
      }
    }

    function clearFilters() {
      fromDate.value = ''
      toDate.value = ''
    }

    Vue.watch([fromDate, toDate], ([from, to]) => {
      fetchTransactions({ from, to })
      fetchBalance({ from, to })
    })

    return {
      title: 'e-Wallet',
      form: formData,
      balance,
      fromDate,
      toDate,
      categories,
      transactions,
      newCategory,
      editingField,
      handleEditField,
      clearFilters,
      handleNewTransaction,
      handleUpdateCategory,
      handleUpdateDescription,
      descriptionModal,
      categoryModal,
    }
  },
}).mount('#app')
