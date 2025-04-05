import express from 'express';
import {userRoutes, transportRoutes} from './routes/index.js';
import db from "./db/index.js"

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/transport", transportRoutes)

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`server run on port ${PORT}`);
})