 const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json()); 

app.post("/login", async (req, res) => {
  try {
    console.log("req.body", req.body);
    const response = await fetch(
      "https://feedback.waelchafei.workers.dev/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      }
    );
    const responseData = await response.text();
    res.status(response.status).json(responseData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/getUsers", async (req, res) => {
  try {
    const response = await fetch(
      "https://feedback.waelchafei.workers.dev/getUsers",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseData = await response.text();
    res.status(response.status).json(responseData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/postUsers", async (req, res) => {
  try {
    const response = await fetch(
      "https://feedback.waelchafei.workers.dev/postUsers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      }
    );
    const responseData = await response.text();
    res.status(response.status).json(responseData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/showSurvey", async (req, res) => {
    try {
      const response = await fetch(
        "https://feedback.waelchafei.workers.dev/showSurvey",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.text();
      res.status(response.status).json(responseData);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

app.get("/getForm", async (req, res) => {
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwh4px_zzpZvb3lRBfcSaobCCsYhc6kc5ggX7V4zGwEKcOLd1YJ3BjiwaUek7t-JFXVjg/exec",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.text();
      res.status(response.status).json(responseData);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
app.post("/createSurvey", async (req, res) => {
    try {
      const response = await fetch(
        "https://feedback.waelchafei.workers.dev/createSurvey",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req.body),
        }
      );
      const responseData = await response.text();
      res.status(response.status).json(responseData);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
app.post("/sendMail", async (req, res) => {
    try {
      const response = await fetch(
        "https://feedback.waelchafei.workers.dev/sendMail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req.body),
        }
      );
      const responseData = await response.text();
      res.status(response.status).json(responseData);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });



app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
