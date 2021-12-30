var express = require("express");
var router = express.Router();
const axios = require("axios");

/* GET home page. */
router.get("/", function (req, res, next) {
  axios
    .get("https://dev.farizdotid.com/api/daerahindonesia/provinsi")
    .then((resp) => {
      console.log(resp.data.provinsi);
    });
  // controller.getAll = async function (req, res) {
  //   axios
  //     .get("/https://dev.farizdotid.com/api/daerahindonesia/provinsi")
  //     .then(function (reponse) {
  //       res.status(200).json({
  //         message: "Data dari Public",
  //         data: Response.data,
  //       });
  //     })
  //     .catch(function (eror) {
  //       res.status(400).json({
  //         message: eror.message,
  //       });
  //     });
  // };
});

module.exports = router;
