import PDFParser from "pdf2json";
import multer from "multer";
import cors from "cors";

import express from "express";

import {
  formattingAnswerKeyUser,
  CalculatingFinalExam,
  allowedOrigins,
  AnsweKey,
} from "./libs/index.js";

const app = express();

app.use(express.json());

app.use(cors({ origin: "*" }));

const storage = multer.memoryStorage();

const upload = multer({ storage: storage }).single("files");

app.post("/upload", (req, res) => {
  upload(req, res, async (err) => {
    try {
      allowedOrigins(req, res);

      const { year } = req.query;

      console.log(year);
      if (err) {
        return res.status(500).json(err);
      }

      if (req.file.mimetype !== "application/pdf") {
        res.status(400).json({ message: "Please upload a pdf file" });
      }

      if (year === undefined || year === "") {
        res.status(404).send({ message: "No year selected" });
      }

      const pdfParser = new PDFParser(this, 1);

      const data = await new Promise((resolve, reject) => {
        pdfParser.on("pdfParser_dataError", (errData) => {
          reject(errData);
        });

        pdfParser.on("pdfParser_dataReady", (pdfData) => {
          const text = pdfParser
            .getRawTextContent()
            .replace(/\r\n/g, " ")
            .split(" ");

          const results = formattingAnswerKeyUser(text);

          const finaldata = CalculatingFinalExam(AnsweKey, results, year);

          resolve(finaldata);
        });

        pdfParser.parseBuffer(req.file.buffer);
      });
      //delete file after use it to save space on the server

      res.status(200).send({ message: "File uploaded successfully", data });
    } catch (error) {
      res.status(500).send({ message: "Something went wrong", error });
    }
  });
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`online server at the door ${PORT} ✅✅⚠️`));
