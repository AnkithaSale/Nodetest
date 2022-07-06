const router = require("express").Router();
const studentdata = require("../models/studentdata");
const csvtojson = require("csvtojson");
//uploading csv file and insert in to students table
router.post("/upload", (req, res, next) => {
  csvtojson()
    .fromFile("studentdata.csv")
    .then((csvData) => {
      console.log(csvData);
      studentdata
        .insertMany(csvData)
        .then(function () {
          res.json({ success: "success" });
        })
        .catch(function (error) {
          console.log(error);
        });
    });
});
// get student data by id
router.get("/students/:id", (req, res, next) => {
  //console.log(req.query)
  studentdata
    .findById(req.params.id)

    .select("Id Name Age Mark1 Mark2 Mark3")
    .exec()
    .then((result) => {
      console.log("Result", JSON.stringify(result));
      res.json({ success: true, data: result });
    })
    .catch((err) => {
      res.json({ success: false, message: "Server error" });
    });
});
router.get("/student", (req, res, next) => {
    //console.log(req.query)
    studentdata
      .find({})
  
      .select("Id Name Age Mark1 Mark2 Mark3 status")
      .exec()
      .then((result) => {
        console.log("Result", JSON.stringify(result));
        res.json({ success: true, data: result });
      })
      .catch((err) => {
        res.json({ success: false, message: "Server error" });
      });
  });
//using query string
router.get("/student/:Name/:status", (req, res, next) => {
    console.log(req.query);
    res.send(req.params.Name + ":" + req.params.status)
//   studentdata
//     .find({})

//     .select("Name  status")
//     .exec()
//     .then((result) => {
//       console.log("Result", JSON.stringify(req.query));
//       res.send({Result });
//     })
//     .catch((err) => {
//       res.json({ success: false, message: "Server error" });
//     });
});

module.exports = router;
