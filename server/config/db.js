const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.set("strictQuery", false);
  const connection = await mongoose.connect(process.env.MONGO_URI);

  console.log(
    "MongoDB Connected:".cyan.underline.bold,
    `${connection.connection.host}`.white
  );
};

module.exports = connectDB;
