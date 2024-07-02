const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const userDetails = require('./excelModel');
const importExcel = require("./excelController");

const express = require('express');
const user = express();

user.use(bodyParser.urlencoded({ extended: true }));
user.use(express.static(path.resolve(__dirname, "public/uploads")));



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage: storage });


user.post("/importExcel", upload.single('file'), importExcel);

user.get("/importExcel", async (req, res) => {
    try {
        const data = await userDetails.find();
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
    }
});

module.exports = user;