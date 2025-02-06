const express = require('express');
const { dbConnection } = require('./config/config');

const app = express();
const PORT = 8080;

// Inicializar la base de datos
dbConnection();

app.use(express.json());

const taskRoutes = require('./routes/tasks');
app.use('/', taskRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
