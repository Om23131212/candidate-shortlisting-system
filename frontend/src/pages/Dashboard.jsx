import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import "../App.css";

const Dashboard = () => {

  const [candidates, setCandidates] =
    useState([]);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [skills, setSkills] =
    useState("");

  const [experience, setExperience] =
    useState("");

  const [bio, setBio] =
    useState("");

  const [
    requiredSkills,
    setRequiredSkills,
  ] = useState("");

  const [
    minExperience,
    setMinExperience,
  ] = useState("");

  const [aiResults, setAiResults] =
    useState([]);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates =
    async () => {

      try {

        const res =
          await axios.get(
            "http://localhost:5000/api/candidates"
          );

        setCandidates(res.data);

      } catch (err) {

        console.log(err);

      }
    };

  const addCandidate =
    async () => {

      try {

        await axios.post(
          "http://localhost:5000/api/candidates",
          {
            name,
            email,
            skills:
              skills
                .split(",")
                .map((s) =>
                  s.trim()
                ),

            experience:
              Number(
                experience
              ),

            bio,
          }
        );

        alert(
          "Candidate Added"
        );

        setName("");
        setEmail("");
        setSkills("");
        setExperience("");
        setBio("");

        fetchCandidates();

      } catch (err) {

        console.log(err);

        alert(
          err.response?.data
            ?.message ||
            "Add Candidate Error"
        );
      }
    };

  const aiMatch =
    async () => {

      try {

        const res =
          await axios.post(
            "http://localhost:5000/api/ai/shortlist",
            {
              requiredSkills,
              minExperience,
            }
          );

        setAiResults(res.data);

      } catch (err) {

        console.log(err);

        alert("AI Error");
      }
    };

  const deleteCandidate =
    async (id) => {

      try {

        await axios.delete(
          `http://localhost:5000/api/candidates/${id}`
        );

        fetchCandidates();

      } catch (err) {

        console.log(err);

        alert(
          "Delete Error"
        );
      }
    };

  return (

    <div className="dashboard">

      <h1 className="title">
        Candidate Shortlisting System
      </h1>

      <div className="top-section">

        <div className="form-box">

          <h2>Add Candidate</h2>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          <input
            type="text"
            placeholder="Skills (comma separated)"
            value={skills}
            onChange={(e) =>
              setSkills(
                e.target.value
              )
            }
          />

          <input
            type="number"
            placeholder="Experience"
            value={experience}
            onChange={(e) =>
              setExperience(
                e.target.value
              )
            }
          />

          <textarea
            placeholder="Projects / Bio"
            value={bio}
            onChange={(e) =>
              setBio(
                e.target.value
              )
            }
          />

          <button
            className="add-btn"
            onClick={
              addCandidate
            }
          >
            Add Candidate
          </button>

        </div>

        <div className="job-box">

          <h2>
            Job Requirement
          </h2>

          <input
            type="text"
            placeholder="Required Skills"
            value={
              requiredSkills
            }
            onChange={(e) =>
              setRequiredSkills(
                e.target.value
              )
            }
          />

          <input
            type="number"
            placeholder="Minimum Experience"
            value={
              minExperience
            }
            onChange={(e) =>
              setMinExperience(
                e.target.value
              )
            }
          />

          <div className="button-row">

            <button className="basic-btn">
              Basic Match
            </button>

            <button
              className="ai-btn"
              onClick={aiMatch}
            >
              AI Match
            </button>

          </div>

        </div>

      </div>

      <div className="candidate-wrapper">

        <h2>
          All Candidates
        </h2>

        <div className="candidate-grid">

          {candidates.map((c) => (

            <div
              className="candidate-card"
              key={c._id}
            >

              <h3>
                {c.name}
              </h3>

              <p>
                {c.email}
              </p>

              <p>
                Experience:
                {" "}
                {
                  c.experience
                }
                {" "}
                years
              </p>

              <div className="skills">

                {c.skills.map(
                  (
                    skill,
                    index
                  ) => (

                    <span
                      key={index}
                      className="skill-tag"
                    >
                      {skill}
                    </span>

                  )
                )}

              </div>

              <button
                className="delete-btn"
                onClick={() =>
                  deleteCandidate(
                    c._id
                  )
                }
              >
                Delete
              </button>

            </div>

          ))}

        </div>

      </div>

      {
        aiResults.length >
          0 && (

          <div className="ai-wrapper">

            <h2>
              AI Recommendation
            </h2>

            {
              aiResults.map(
                (
                  candidate,
                  index
                ) => (

                  <div
                    className="ai-card"
                    key={index}
                  >

                    <h3>
                      Rank #
                      {index + 1}
                    </h3>

                    <p>
                      <strong>
                        Candidate:
                      </strong>
                      {" "}
                      {
                        candidate.name
                      }
                    </p>

                    <p>
                      <strong>
                        Reason:
                      </strong>
                      {" "}
                      Has skills in
                      {" "}
                      {
                        candidate.skills.join(
                          ", "
                        )
                      }
                      {" "}
                      with
                      {" "}
                      {
                        candidate.experience
                      }
                      {" "}
                      years
                      experience.
                    </p>

                  </div>

                )
              )
            }

          </div>

        )
      }

    </div>
  );
};

export default Dashboard;