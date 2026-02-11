import mongoose from "mongoose";
import app from "./app.js";

const PORT = process.env.PORT || 8080;

mongoose.connect("mongodb://localhost:27017/adoptionDB")
  .then(() => {
    console.log("DB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(error => console.log(error));
