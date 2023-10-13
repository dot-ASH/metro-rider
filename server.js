const express = require("express");
const cors = require("cors");
const axios = require("email");
// const path = require("path");
// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.static(path.join(__dirname, "build")));

// app.get("/", function (req, res) {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

// app.listen(PORT);

const app = express();

app.use(cors());

app.get("/", (req, res) => {});

app.use("/api/email", async (req, res) => {
  const { method, url, headers, body } = req;
  try {
    const response = await axios({
      method,
      url: `https://api.resend.com${url}`,
      headers,
      data: body,
    });
    res.status(response.status).send(response.data);
  } catch (error) {
    res.status(500).send("Proxy request failed.");
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Running on port ${port}`));
