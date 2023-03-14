const express = require("express");
const { addImage, getAllImage, ediImage, findSingleImage, deleteImage } = require("../Controller/imageController");


const router = express.Router();

// add Image 
router.route("/add-image").post(addImage)


//delete Image 
router.route("/delete-image").get(deleteImage)


//get all image
router.route("/get-all").get(getAllImage)


//edit image
router.route('/edit').post(ediImage)


//find one image
router.route('/find-one').get(findSingleImage)

module.exports = router;