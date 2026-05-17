const express = require("express");

const router = express.Router();

const Candidate = require("../models/Candidate");

router.post("/shortlist", async (req, res) => {

  try {

    const {
      requiredSkills,
      minExperience,
    } = req.body;

    const candidates =
      await Candidate.find();

    const required =
      requiredSkills
        .toLowerCase()
        .split(",")
        .map((s) => s.trim());

    const ranked =
      candidates.map((candidate) => {

        let score = 0;

        const skills =
          candidate.skills.map((s) =>
            s.toLowerCase()
          );

        required.forEach((skill) => {

          if (
            skills.includes(skill)
          ) {
            score += 1;
          }
        });

        if (
          candidate.experience >=
          Number(minExperience)
        ) {
          score += 2;
        }

        return {
          ...candidate._doc,
          score,
        };
      });

    ranked.sort(
      (a, b) => b.score - a.score
    );

    res.json(ranked);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "AI Error",
    });
  }
});

module.exports = router;