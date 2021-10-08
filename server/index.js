const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4000;

app.get(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public"));
});
app.use(express.json());
app.use(cors());

app.listen(port, () => console.log(`Server is up and running on ${port}...`));
