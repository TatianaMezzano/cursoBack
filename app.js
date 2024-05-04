import express, { response } from "express";
import router from "./src/routes/index.js";

const app = express();

const port = 8080;
const ready = console.log("server ready on port " + port);

app.listen(port, ready);

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use("/api", router);


