const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const path = require("path")
const port = process.env.PORT || 8080;
const { default: mongoose } = require("mongoose");

app.use(cors());
app.use('/images',express.static('public'))

mongoose.connect(
  "mongodb+srv://aadith:1234@cluster0.zc9nm2l.mongodb.net/?retryWrites=true&w=majority"
);

const homeRoutes = require("./Routes/router");
app.use("/api/", homeRoutes);



app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
