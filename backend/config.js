const PORT = 8091

const baseURL = "mongodb+srv://group1:group1@webproject.ruid65p.mongodb.net"

const database = "journalsDB"

const parameters = "retryWrites=true&w=majority&appName=webproject"


module.exports = { PORT, baseURL, database, parameters }