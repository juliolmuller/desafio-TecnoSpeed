import app from './app'

const { PORT } = process.env

app.listen(PORT, () => {
  console.log(`Server available on http://localhost:${PORT}/`)
})
