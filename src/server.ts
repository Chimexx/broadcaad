require('dotenv').config();
import http from "http";
import bodyParser from "body-parser";
import express from 'express';
import authRoute from "./routes/auth";
import mediaRoute from "./routes/media";
import historyRoute from "./routes/history";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI as string

app.use(express.json());
app.use(bodyParser.json());
app.use(cors("*"))

app.use('/api/auth', authRoute);
app.use('/api/media', mediaRoute);
app.use('/api/history', historyRoute);

const server = http.createServer(app)


mongoose.Promise = Promise;
mongoose.connect(uri).then(() => {
  console.log("DB connection established");

  server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  })
})

mongoose.connection.on("error", (error: Error) => console.log(error))
