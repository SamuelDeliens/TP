import app from "./app.js";
import db from "./model/database.js";
import {config} from "./config/config.js";

await db.init();

app.listen(config.app.port, () => {
    console.log(`Server is now running in port ${config.app.port}`);
});