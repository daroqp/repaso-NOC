import Server = require("./presentation/server");

(async() => {
    main();
})();

function main() {
    Server.start();
}
