const express = require("express")
const dotenv = require("dotenv")
const { sequelize } = require("./config/database.js")
const cors = require("cors")

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

sequelize.authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error connecting to database", err))

app.get("/", (req, res) => {
  res.send("Hackathon Helper Backend Running 🚀")
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
