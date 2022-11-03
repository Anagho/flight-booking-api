const express = require("express");
const { json } = require("express");
const flights = require("./controllers/flightController");
const models = require("./models/Flight");
const routes = require("./routes/flightRoute");
const port = process.env.PORT || 3000;

const app = express();

app.use(json());

// routes
app.use("/flights", routes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
