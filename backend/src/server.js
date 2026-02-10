// import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import http from "http";
import { initSocket } from "./config/serverSocket.js";


connectDB();


const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
initSocket(server);
server.listen(3456, () => {
    console.log("server is running on 3456");
})




app.listen(PORT, () => {console.log(`server is running on port ${PORT}`)});

