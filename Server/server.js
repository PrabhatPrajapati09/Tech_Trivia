import express from 'express';
import cors from 'cors';

import conectDb from './Configuration/db.js';
import config from './Configuration/config.js';

import adminRoute from './Routes/adminRoute.js';
import userRoute from './Routes/userRoute.js';
import quizRoute from './Routes/quizRoute.js';

const app = express();
const port = config.port;

app.use(express.json());
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);

    // Allow localhost and vercel.app domains
    if (origin.includes('localhost') || origin.includes('vercel.app')) {
      return callback(null, true);
    }

    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));


app.get('/', (req, res) => {
  res.send("welcome to home page 🚀");
})


app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/quiz", quizRoute);


const startServer = async () => {
  try {
    await conectDb();
    console.log("✅ Connected to MongoDb Server")
    app.listen(port, () => {
      console.log(`app is listening at port ${config.port}`);
    })

  }
  catch (error) {

    console.log("❌ Failed to connect to MongoDB:", error);

  }
}

startServer()