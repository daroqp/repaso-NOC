import { envs } from "./config/adapters/envs.adapter.js";
import { Server } from "./presentation/server.js";

(async() => {
    main();
})();

function main() {
    // Server.start();
    console.log( envs.PORT );
}
