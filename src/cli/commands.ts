import { KanjiOption } from "../interface";
import spinner from "./spinner";
import { searchKanji } from "../lib/core/search";
import { printKanji, printKanjiList } from "./output";

export const kanjiCommand = async (kanji: string, option: KanjiOption) => {
    try {
        spinner.start();
        const match = await searchKanji(kanji, option);
        spinner.stop();

        if (match.length > 1) {
            if (option.details) {
                match.forEach((entry) => printKanji(entry));
            } else {
                printKanjiList(match);
            }

            spinner.prefixText = "";
            spinner.succeed(
                `Found ${match.length} ${
                    match.length > 1 ? "results" : "result"
                }`
            );
        } else {
            printKanji(match[0]);
        }
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};
