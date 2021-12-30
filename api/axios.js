const axios = require("axios");
const controller = {};

controller.getAll = async function (req, res) {
  axios
    .get("/https://dev.farizdotid.com/api/daerahindonesia/provinsi")
    .then(function (reponse) {
      res.status(200).json({
        message: "Data dari Public",
        data: Response.data,
      });
    })
    .catch(function (eror) {
      res.status(400).json({
        message: eror.message,
      });
    });
};
module.exports = controller;
