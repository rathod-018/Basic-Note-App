import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import path from "path"

import notesRouter from "./routes/notesRoutes.js"
import { connectDb } from "./config/db.js"
import ratelimiter from "./middleware/ratelimiter.js"


dotenv.config();

const app = express();
const port = process.env.PORT || 3000
const __dirname = path.resolve()


if (process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: "http://localhost:5173"
    }));
}


//middleware
app.use(express.json())// this middleware will parse JSON bodies

app.use(ratelimiter);

// app.use((req, res, next) => {
//     console.log(`req method is ${req.method} and req url is ${req.url}`)
//     next()
// });

app.use('/api/notes', notesRouter);


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}


connectDb().then(() => {
    app.listen(port, () => {
        console.log(`Server started on port : ${port}`)
    })
}).catch((error) => {
    console.log("mongoDB conection error !!!", error)
})




