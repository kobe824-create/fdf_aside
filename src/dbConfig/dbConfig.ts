// import mongoose from "mongoose"


// export default async function connect() {
//     try {
//         mongoose.connect(process.env.MONGO_URI!);
//         const connection = mongoose.connection

//         connection.on('connected', () => {
//             console.log('MongoDb successfully connected');
//         })
//         connection.on('error', () => {
//             console.log('mongoDb failed to connect');
//             process.exit();
//         })
//     } catch (error: unknown) {
//         console.log("somethings went wrong!", error);
//     }
// }

// lib/connect.ts


// import mongoose from "mongoose";

// const MONGO_URI = process.env.MONGO_URI!;
// const MONGO_DB_NAME = process.env.MONGO_DB_NAME!; 


// if (!MONGO_URI) {
//   throw new Error("Please define the MONGO_URI environment variable");
// }

// if (!MONGO_DB_NAME) {
//   throw new Error("Please define the MONGO_DB_NAME environment variable");
// }

// async function connect() {
//   try {
//     await mongoose.connect(MONGO_URI, {
//       dbName: MONGO_DB_NAME,
//     });
//     console.log("MongoDB successfully connected");
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//   }
// }
// export default connect;


// import mongoose from "mongoose";

// const MONGO_URI = process.env.MONGO_URI!;
// const MONGO_DB_NAME = process.env.MONGO_DB_NAME!;

// if (!MONGO_URI) {
//   throw new Error("Please define the MONGO_URI environment variable");
// }

// if (!MONGO_DB_NAME) {
//   throw new Error("Please define the MONGO_DB_NAME environment variable");
// }

// async function connect() {
//   try {
//     // Attempt to connect to MongoDB
//     await mongoose.connect(MONGO_URI, {
//       dbName: MONGO_DB_NAME,
//       // Removed deprecated options: useNewUrlParser and useUnifiedTopology
//     });

//     // Ensure the connection is successful and log it
//     if (mongoose.connection.readyState === 1) {
//       console.log("MongoDB successfully connected");
//     } else {
//       console.error("MongoDB connection state is not successful:", mongoose.connection.readyState);
//     }
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       // If the error is an instance of Error, provide a detailed message
//       console.error("MongoDB connection error:", error.message);
//     } else {
//       console.error("Unknown error occurred during MongoDB connection");
//     }
//   }
// }

// export default connect;

import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI!;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME!;

let isConnected = false;

async function connect() {
  if (isConnected) {
    // Use cached connection to prevent reconnecting on every call
    return;
  }

  try {
    await mongoose.connect(MONGO_URI, {
      dbName: MONGO_DB_NAME,
      serverSelectionTimeoutMS: 5000, // Fail fast if not available
      socketTimeoutMS: 45000,
      maxPoolSize: 10, // Smaller pool can help with quick functions
    });

    isConnected = mongoose.connection.readyState === 1;

    if (isConnected) {
      console.log("✅ MongoDB connected");
    } else {
      console.warn("⚠️ MongoDB not connected. State:", mongoose.connection.readyState);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ MongoDB connection error:", error.message);
    } else {
      console.error("❌ MongoDB connection error:", error);
    }
  }
}

export default connect;

