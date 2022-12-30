import { Command } from "commander";
import { version } from "../../package.json";
import { kanjiCommand } from "./commands";

const createCLI = async (): Promise<Command> => {
    const program = new Command();

    program
        .name("jichan")
        .description("CLI Japanese Dictionary")
        .version(version);

    program
        .command("kanji")
        .alias("k")
        .description("search for a kanji")
        .argument("[character]", "search kanji by its literal value")
        .allowExcessArguments(false)
        .option("-m, --meaning <meaning>", "search kanji by meaning")
        .option("-o, --onyomi <onyomi>", "search kanji by onyomi")
        .option("-k, --kunyomi <kunyomi>", "search kanji by kunyomi")
        .option("-n, --nanori <nanori>", "search kanji by nanori")
        .option("-r, --radical <radical>", "search kanji by radicals")
        .option("-s, --stroke <number>", "search kanji by stroke count")
        .option("-j, --jlpt <level>", "search kanji by jlpt level")
        .option("-M, --max <number>", "set the maximum number of results")
        .option("-c, --common", "only show common kanji")
        .option("-d, --details", "print all kanji informations")
        .action(kanjiCommand);

    return program;
};

export { createCLI };
