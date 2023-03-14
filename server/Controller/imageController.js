const multer = require("multer");
const path = require("path");
const fs = require("fs");
const imageModel = require("../Model/imageModel");
const { removeFile } = require("../Utils/function");
let fileName = "";

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/"),
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

exports.addImage = async (req, res) => {
  try {
    multer({ storage: storage }).single("avatar");
    let upload = multer({ storage: storage }).single("avatar");
    upload(req, res, function (err) {
      console.log(req.body);
      if (req.body.TC == "false") {
        fs.unlinkSync(req.file.path);
        res.status(400).json("TERMS AND CONDITION NOT ACCPTED");
      } else {
        if (req.file.size < 2000) {
          res.status(400).json("Enter a image with size greater than 2000");
        } else {
          imageModel
            .findOne({ ImageName: req.file.filename })
            .then((result) => {
              if (result) {
                res.status(400).json("Image Already Exists");
              } else {
                let details = {
                  Title: req.body.Title,
                  Description: req.body.Description,
                  File: req.file.mimetype,
                  Category: req.body.Category,
                  ImageName: req.file.filename,
                  Sale: req.body.Paid,
                };
                imageModel.create(details).then((data) => {
                  res.status(200).json(data);
                });
              }
            });
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
};

// delete Image
exports.deleteImage = async (req, res) => {
  let id = req.query.id;
  console.log("DELTE");
  try {
    imageModel.findOne({ _id: id }).then((data) => {
      fs.unlinkSync(path.join(__dirname, "../public/" + data.ImageName));
    });
    imageModel
      .deleteOne({ _id: id })
      .then((data) => {
        res.status(200).json("Deleted SuccessFully");
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (error) {
    res.status(400).json(error);
  }
};

// find single image

exports.findSingleImage = async (req, res) => {
  let id = req.query.id;
  try {
    imageModel
      .findOne({ _id: id })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.ediImage = async (req, res) => {
  try {
    let upload = multer({ storage: storage }).single("avatar");

    upload(req, res, function (err) {
      if (req.file != undefined) {
        if (req.file.size < 2000) {
          res.status(400).json("Enter a image with size greater than 2000");
        } else {
          imageModel
            .findOne({ ImageName: req.file.filename })
            .then((result) => {
              if (result) {
                res.status(400).json("Image Alreadyy Exists");
              } else {
                let details = {
                  Title: req.body.Title,
                  Description: req.body.Description,
                  File: req.file.mimetype,
                  Category: req.body.Category,
                  ImageName: req.file.filename,
                  Sale: req.body.Paid,
                };
                imageModel
                  .updateOne({ _id: req.body.id }, { $set: details })
                  .then((data) => {
                    console.log(data);
                    res.status(200).json(data);
                  });
              }
            });
        }
      } else {
        let details = {
          Title: req.body.Title,
          Description: req.body.Description,
          File: req.body.File,
          Category: req.body.Category,
          ImageName: req.body.filename,
          Sale: req.body.Paid,
        };
        imageModel
          .updateOne({ _id: req.body.id }, { $set: details })
          .then((data) => {
            console.log(data);
            res.status(200).json(data);
          });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getAllImage = async (req, res) => {
  try {
    imageModel.find({}).then((data) => {
      res.status(200).json(data);
    });
  } catch (error) {}
};
