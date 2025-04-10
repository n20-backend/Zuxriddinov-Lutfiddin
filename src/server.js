import express from 'express';
import {userRoutes, transportRoutes, ordesRoutes, repairroutes, reportrouter} from './routes/index.js';
import db from "./db/index.js"

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Assalomu aleykum!👍")
})

app.use("/users", userRoutes);
app.use("/transport", transportRoutes)
app.use("/orders", ordesRoutes)
app.use("/repair", repairroutes)
app.use("/report", reportrouter)

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`server run on port ${PORT}`);
})
