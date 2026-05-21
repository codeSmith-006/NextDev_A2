import app from "./app";
import { initDB } from "./db/connectDB";
import config from "./utility/env_config";
import net from "node:net";

// the main function of the server
const main = () => {
  net.setDefaultAutoSelectFamilyAttemptTimeout(1000);
  initDB();
  app.listen(config.port, () => {
    console.log(`Task issuer app running on port ${config.port}`);
  });
};
// run the main function
main();
