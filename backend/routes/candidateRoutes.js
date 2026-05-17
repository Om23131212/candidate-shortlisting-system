const express = require("express");

const router = express.Router();

const Candidate = require("../models/Candidate");

router.post("/", async (req, res) => {
  try {

    const {
      name,
      email,
      skills,
      experience,
      bio,
    } = req.body;

    const candidate =
      await Candidate.create({
        name,
        email,
        skills,
        experience,
        bio,
      });

    res.status(201).json(candidate);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Add Candidate Error",
    });
  }
});

router.get("/", async (req, res) => {
  try {

    const candidates =
      await Candidate.find();

    res.json(candidates);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Fetch Error",
    });
  }
});


// DELETE CANDIDATE

router.delete("/:id", async (req, res) => {

  try {

    await Candidate.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Candidate Deleted",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message:
        "Delete Error",
    });
  }
});

module.exports = router;