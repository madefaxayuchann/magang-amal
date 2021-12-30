var express = require("express");
const axios = require("axios");
var router = express.Router();

/* GET users listing. */

router.get("/", function (req, res, next) {
  axios
    .get("https://dev.farizdotid.com/api/daerahindonesia/provinsi")
    .then((resp) => {
      const data = {
        provinsi: resp.data.provinsi,
      };
      res.render("listOfValue", data);
    });
});

router.get("/getData/provinsi", function (req, res, next) {
  axios
    .get("https://dev.farizdotid.com/api/daerahindonesia/provinsi")
    .then((resp) => {
      res.send(resp.data);
    });
});

router.get("/getData/kota", function (req, res, next) {
  console.log(req.query);
  console.log(req.query.id);
  axios
    .get(
      "https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=" +
        req.query.id
    )
    .then((resp) => {
      const result = resp.data.kota_kabupaten;
      res.send(result);
    });
});

module.exports = router;
