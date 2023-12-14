import app from '@src/app'

const { PORT = 3000 } = process.env

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
