const { Router } = require("express");
const Visitor = require("../model/Visitor");

const router = Router();

router.get("/", async (req, res) => {
  const visitors = await Visitor.find();
  res.status(200).render("visitors.ejs", {
    visitors
  });
});

router.get("/all", async (req, res) => {
  const visitors = await Visitor.find();
  res.status(200).json(visitors);
});

router.put("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const visitors = await Visitor.updateOne({
    _id: id
  }, req.body);

  res.status(200).json(visitors);
});

router.post("/create", async (req, res) => {
  const visitor = new Visitor({
    name:req.body.name,
    phone:req.body.phone,
  });

  await visitor.save();
  res.status(200).json({"title": "ok"});
});

module.exports = router;
