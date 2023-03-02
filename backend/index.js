import mongoose from "mongoose";
import express from "express";
import authRouter from "./routers/authRouter.js";
import adminRouter from "./routers/adminRouter.js";
import publicRouter from "./routers/publicRouter.js";
import cors from "cors";
import { verifyJwt, isAdmin } from "./middlewares/authMiddleware.js";

//config serveur
const app = express();
const PORT = 9875;

//auth cors
app.use(cors());
//bases
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//dossier des statics
app.use(express.static("public"));

//connection à la base de données
mongoose.set("strictQuery", false);
mongoose.connect(
    "mongodb+srv://SylvainAlx:123@clusterapp.1zcuk8m.mongodb.net/the-commerce?retryWrites=true&w=majority"
);

mongoose.connection.on("error", () => {
    console.log("Erreur lors de la connexion à la base de données");
});
mongoose.connection.on("open", () => {
    app.use("/auth", authRouter);
    app.use("/admin", [verifyJwt], [isAdmin], adminRouter);
    app.use("/public", publicRouter)
    console.log("connexion à la base de données");
});

//écouteur du port
app.listen(PORT, () => {
    console.log(`server running at PORT : ${PORT}`);
});
