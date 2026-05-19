const express = require("express");
const cors = require("cors");
const axios = require("axios");

require("dotenv").config({ path: "../.env" });

const app = express();
app.use(cors({ origin: "https://sales-force-validation-rule-manager.vercel.app" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Auth token
app.post("/auth/token", async (req, res) => {
  try {
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", req.body.code);
    params.append("client_id", process.env.VITE_SALESFORCE_CLIENT_ID);
    params.append("client_secret", process.env.VITE_SALESFORCE_CLIENT_SECRET);
    params.append("redirect_uri", process.env.VITE_SALESFORCE_CALLBACK_URL);

    const response = await axios.post(
      "https://login.salesforce.com/services/oauth2/token",
      params
    );

    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(400).json({ message: "Token exchange failed" });
  }
});

// Get validation rules
app.get("/api/validation-rules", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const instanceUrl = req.headers["x-instance-url"];

    const query = `SELECT Id, ValidationName, Active, Description FROM ValidationRule WHERE EntityDefinition.QualifiedApiName = 'Account'`;

    const response = await axios.get(
      `${instanceUrl}/services/data/v59.0/tooling/query?q=${encodeURIComponent(
        query
      )}`,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data.records);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(400).json({ error: "Failed to fetch rules" });
  }
});

// Toggle single rule
app.patch("/api/validation-rules/:id", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const instanceUrl = req.headers['x-instance-url'];
    const {id} = req.params;
    const {isActive} = req.body;

    // first fetch exisiting metadata
    const exisitingRule = await axios.get(
      `${instanceUrl}/services/data/v59.0/tooling/sobjects/ValidationRule/${id}`,
      {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        }
      }
    )

    const exisitingMetadata = exisitingRule.data.Metadata;

    // merge all the data and update
    await axios.patch(
        `${instanceUrl}/services/data/v59.0/tooling/sobjects/ValidationRule/${id}`,
        { Metadata: { ...exisitingMetadata, active: isActive } },
        {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            }
        }
    )

    res.json({ success: true });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(400).json({ error: "Failed to toggle rule" });
  }
});

app.listen(4000, () => {
  console.log("Backend running on http://localhost:4000");
});
