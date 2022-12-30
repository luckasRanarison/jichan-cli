import { createCLI } from "./cli/engine";
import { Command } from "commander";
import { argv } from "process";

(async () => {
    const jchan: Command = await createCLI();

    try {
        jchan.parse(argv);
    } catch (error) {
        console.error("error: Error when parsing arguments");
        process.exit(1);
    }
})();
