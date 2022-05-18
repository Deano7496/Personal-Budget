const express = require("express");
const dotenv = require("dotenv");
const logger = require("morgan");
const cors = require('cors');

dotenv.config({ path: "./config/config.env" });

const envelopesRouter = require("./routes/envelopes");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cors());

app.use("/api", envelopesRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});