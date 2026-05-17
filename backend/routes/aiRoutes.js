const express = require("express");
const axios = require("axios");

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
            skills.some((s) =>
              s.includes(skill)
            )
          ) {
            score += 10;
          }

        });

        score +=
          Number(candidate.experience || 0);

        return {
          ...candidate._doc,
          score,
        };
      });

    ranked.sort(
      (a, b) => b.score - a.score
    );

    const topCandidates =
      ranked.slice(0, 5);

    const prompt = `
Explain why these candidates are ranked.

${topCandidates.map((c, i) => `
Rank #${i + 1}

Candidate: ${c.name}

Skills:
${c.skills.join(", ")}

Experience:
${c.experience}
`).join("\n")}
`;

    const response =
      await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model:
            "mistralai/mistral-7b-instruct:free",

          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        },
        {
          headers: {
            Authorization:
              `Bearer ${process.env.OPENROUTER_API_KEY}`,

            "Content-Type":
              "application/json",
          },
        }
      );

    const result =
      response.data.choices[0]
        .message.content;

    res.json({
      result,
    });

  } catch (err) {

    console.log(
      err.response?.data || err
    );

    res.status(500).json({
      message: "AI Error",
    });
  }
});

module.exports = router;