
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://vrushabh:12345@clustermern.tcsjlzk.mongodb.net/mernCrud?retryWrites=true&w=majority&appName=Clustermern"
);
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected ");
});
mongoose.connection.on("error", (err) => {
  console.error("MongoDB error :", err);
});

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
