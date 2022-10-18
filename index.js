import express from "express";
import upload from "./api/upload.js";
import cors from "cors";

const app = express();

app.use(cors({ origin: "*" }));

app.use(express.json({ extended: false }));

app.use("/api/upload", upload);

app.use("/", (req, res) => {
  res.send("api running 🚀🚀🚀");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
