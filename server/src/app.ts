import express from "express";
import { router } from "./routes/api-routes";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running in port: ${PORT}`));
