require('dotenv').config();

const app = require('./src/app');
const connectdb = require('./database/db');

async function server() {
    await connectdb();

    app.listen(process.env.PORT, () => {
        console.log("Server started on port " + process.env.PORT);
    });
}

server();