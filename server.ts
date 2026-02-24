import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import EventRegesterationRoutes from "./routes/EventRegesterationRoutes";
import NewMemberRegesterationRoutes from "./routes/NewMemberRegesterationRoutes";
import MemberRoutes from "./routes/MembersRoutes";
import adminRoutes from "./routes/AdminRoutes";
import dotenv from "dotenv";
import { sessionMiddleware } from "./config/session";




dotenv.config();
const app = express();

app.use(
  cors({
    origin: "*", 
    // credentials: true, 
  })
);
app.use(express.json());
// app.use(cookieParser());
// app.use(sessionMiddleware);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - Body:`, req.body);
  next();
});



const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const DBname = process.env.MONGO_DBNAME;
console.log(username, password, DBname);

const SESSION_SECRET = process.env.SESSION_SECRET || "gasghal;k;lk;lgddswttttsss";



// using the routes
// app.use("/api/v1/register", RegesterationRoutes);
// app.use("/api/v1/member", MembersRoutes);
app.use("/api/v1/event-register", EventRegesterationRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/new-member-register", NewMemberRegesterationRoutes);
app.use("/api/v1/members", MemberRoutes);




const startServer = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${username}:${password}@rokaiwebsite.ywa5gnt.mongodb.net/${DBname}?appName=Rokaiwebsite`
    );

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

app.get("/", (req, res) => {
  res.send("API WORKING");
});


// the order matters 
// express.json
// cookieParser
// session
// csrf
// routes