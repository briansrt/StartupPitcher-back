const express = require('express');
const {urlencoded, json} = require('express');
const cors = require('cors');
const path = require("path");
require('dotenv').config();
const ideasRoutes = require('./routes/ideasRoutes.routes.js');
const chatbotRoutes = require('./routes/chatbots.routes.js');

const port = process.env.PORT;

const app = express();

app.use(urlencoded({extended: true}))
app.use(json())

app.use(cors())
app.use('/swagger-output.json', express.static(path.join(__dirname, 'swagger-output.json')));
app.use('/api-docs', express.static(path.join(__dirname, 'public/swagger')));
app.use('/api', ideasRoutes);
app.use('/chatbot', chatbotRoutes);

app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

app.listen(port, ()=>{
    console.log(`listening at port http://localhost:${port}`);
})
