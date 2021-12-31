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

router.get("/data/provinsi", function (req, res, next) {
  axios
    .get("https://dev.farizdotid.com/api/daerahindonesia/provinsi")
    .then((resp) => {
      res.send(resp.data);
    });
});

router.get("/data/kota", function (req, res, next) {
  console.log(req.query);
  console.log(req.query.id);
  axios
    .get(
      "https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=" +
        req.query.id
    )
    .then((resp) => {
      res.send(resp.data);
    });
});

router.get("/data/kecamatan", function (req, res, next) {
  console.log(req.query);
  console.log(req.query.id);
  axios
    .get(
      "https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=" +
        req.query.id
    )
    .then((resp) => {
      res.send(resp.data);
    });
});

router.get("/data/kelurahan", function (req, res, next) {
  axios
    .get(
      "https://dev.farizdotid.com/api/daerahindonesia/kelurahan/?id_kecamatan=" +
        req.query.id
    )
    .then((resp) => {
      res.send(resp.data);
    });
});

router.get("/detail/kelurahan", function (req, res, next) {
  axios
    .get(
      "https://dev.farizdotid.com/api/daerahindonesia/kelurahan/" + req.query.id
    )
    .then((resp) => {
      return res.send(resp.data);
    });
});

module.exports = router;
