const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const connect = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGO_ID, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // 30 seconds timeout
      socketTimeoutMS: 45000, // 45 seconds timeout
    })
    .then(() => {
      console.log("connected to DB sucessfully!!");
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
};
mongoose.connection.on("disconnected", () => {
  console.log("Mongodb disconnected");
});
mongoose.connection.on("connected", () => {
  console.log("Mongodb connected");
});
// export default connect;
module.exports = connect;
