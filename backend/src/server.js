// import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js"
// import { startMembershipCleanupJob } from "./jobs/cleanupMemberships.js";

// dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;

// startMembershipCleanupJob();

app.listen(PORT, () => {console.log(`server is running on port ${PORT}`)});

