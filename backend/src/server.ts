// import { env } from "process";
// import app from "./app.js";

// const startServer = async () =>{
//   try {
//     app.listen(env.PORT, ()=>{
//        console.log(`server successfully running on port:${env.PORT}`);
//       //  console.log(`Environment: ${env.NODE_ENV}`);
//     })
//   } catch (error) {
//     console.error("❌ Failed to start server:", error);
//     process.exit(1);
//   }
// };

// startServer();


import app from "./app.js";
import { env } from "process";

// Local development এ only listen করবে
if (process.env.NODE_ENV !== "production") {
  app.listen(env.PORT || 5000, () => {
    console.log(`Server running on port: ${env.PORT || 5000}`);
  });
}

export default app;