import { Kanji } from "../interface";
import chalk from "chalk";
import spinner from "./spinner";

const getJlptColor = (jlptLevel: number): chalk.Chalk => {
    switch (jlptLevel) {
        case 1:
            return chalk.red;
        case 2:
            return chalk.yellow;
        case 3:
            return chalk.green;
        case 4:
            return chalk.blueBright;
        case 5:
            return chalk.magenta;
        default:
            return chalk.gray;
    }
};

const getFreqColor = (freq: number): chalk.Chalk => {
    switch (true) {
        case !freq:
            return chalk.gray;
        case freq < 1000:
            return chalk.green;
        case freq < 2000:
            return chalk.yellow;
        default:
            return chalk.red;
    }
};

const getIrregularReading = (kanji: Kanji) => {
    let irregularOn: string = kanji.onyomi;
    let irregularKun: string = kanji.kunyomi;

    if (kanji.regular_on) {
        irregularOn = kanji.onyomi
            .split(",")
            .filter((reading) => !kanji.regular_on.includes(reading))
            .toString();
    }

    if (kanji.regular_kun) {
        irregularKun = kanji.kunyomi
            .split(",")
            .filter((reading) => !kanji.regular_kun.includes(reading))
            .toString();
    }

    return [irregularOn, irregularKun];
};

export const printKanji = (kanji: Kanji) => {
    // Sample output:
    // 漢字: 亜
    // 意味: Asia,Rank Next,Come After,-ous
    // 音: ア,エ
    // 訓: つ（ぐ）
    // 名: や,つぎ,つぐ
    // 部: ｜,一,口
    // 画: 7
    // unicode: U+4E9C, freq#: 1104, grade: 8, JLPT: 1

    if (!kanji) {
        spinner.prefixText = "";
        spinner.fail("No match found");
        return;
    }

    const freqColor = getFreqColor(kanji.freq);
    const jlptColor = getJlptColor(kanji.jlpt);
    const [irregularOn, irregularKun] = getIrregularReading(kanji);
    let restMeaning: any = kanji.meaning;

    if (kanji.selected_meaning) {
        restMeaning = kanji.meaning
            .split(",")
            .filter((meaning) => !kanji.selected_meaning.includes(meaning));
    }

    const character = `${chalk.gray("漢字:")} ${kanji.character}\n`;

    const meaning = `${chalk.gray("意味:")} ${chalk.bold(
        kanji.selected_meaning ? kanji.selected_meaning : ""
    )}${
        kanji.selected_meaning && restMeaning.length ? "," : ""
    }${restMeaning}\n`;

    const on = `${chalk.gray("音:")} ${chalk.yellow(
        kanji.regular_on ? kanji.regular_on : ""
    )}${irregularOn && kanji.regular_on ? "," : ""}${chalk.grey(
        irregularOn ? irregularOn : ""
    )}\n`;

    const kun = `${chalk.gray("訓:")} ${chalk.green(
        kanji.regular_kun ? kanji.regular_kun : ""
    )}${irregularKun && kanji.regular_kun ? "," : ""}${chalk.grey(
        irregularKun ? irregularKun : ""
    )}\n`;

    const nanori = `${chalk.gray("名:")} ${chalk.cyan(
        kanji.nanori ? kanji.nanori : ""
    )}\n`;

    const radical = `${chalk.grey("部:")} ${
        kanji.radical ? kanji.radical : ""
    }\n`;

    const stroke = `${chalk.gray("画:")} ${chalk.red(kanji.stroke)}\n`;

    const info = `unicode: ${chalk.grey(
        `U+${kanji.unicode}`
    )}, freq#: ${freqColor(
        kanji.freq ? kanji.freq : "Not set"
    )}, grade: ${jlptColor(
        kanji.grade ? kanji.grade : "Not set"
    )}, JLPT: ${jlptColor(kanji.jlpt ? kanji.jlpt : "Not set")}`;

    console.log(
        character + meaning + on + kun + nanori + radical + stroke + info
    );
};

export const printKanjiList = (kanjiList: Kanji[]) => {
    // sample output:
    // 人 N5 -c Person | ジン,ニン | ひと | じ,と,ね,ひこ,ふみ | 2 strokes | U+4EBA
    // 一 N5 -c One | イチ,イツ | ひと,ひと（つ）,はじ（め） | かず,い,いっ,いる,かつ | 1 stroke | U+4E00
    // 特 N4 -c Special | トク,ドク | とりわけ,おうし,ひと（り）,ひと（つ） | こと,よし | 10 strokes | U+7279
    // 等 N3 -c Etc. | トウ | ひと（しい）,など,ら | と,ひ | 12 strokes | U+7B49
    // 単 N3 -c Simple | タン,ゼン,セン | ひとえ,ひと（つ） | いち,ただ | 9 strokes | U+5358
    // 独 N1 -c Single | ドク,トク | ひと（り） | どいつ,どっ | 9 strokes | U+72EC

    kanjiList.forEach((kanji) => {
        const jlptColor = getJlptColor(kanji.jlpt);
        const freqColor = getFreqColor(kanji.freq);
        const firstmeaning = kanji.meaning.match(/^[^,]*/)[0];
        const [irregularOn, irregularKun] = getIrregularReading(kanji);

        const jlpt = ` ${kanji.jlpt ? jlptColor("N" + kanji.jlpt) : "--"}`;

        const freq = `${kanji.freq ? freqColor("-c") : "  "}`;

        const meaning = `${chalk.bold(
            kanji.selected_meaning ? kanji.selected_meaning : firstmeaning
        )}`;
        const on = `${
            !kanji.regular_on && !irregularOn
                ? chalk.yellow("--")
                : `${chalk.yellow(kanji.regular_on ? kanji.regular_on : "")}${
                      irregularOn && kanji.regular_on ? "," : chalk.yellow("")
                  }${chalk.grey(irregularOn ? irregularOn : "")}`
        }`;

        const kun = `${
            !kanji.regular_kun && !irregularKun
                ? chalk.green("--")
                : `${chalk.green(kanji.regular_kun ? kanji.regular_kun : "")}${
                      irregularKun && kanji.regular_kun ? "," : chalk.green("")
                  }${chalk.grey(irregularKun ? irregularKun : "")}`
        }`;

        const nanori = `${chalk.cyan(kanji.nanori ? kanji.nanori : "--")}`;

        const stroke = `${kanji.stroke} ${
            kanji.stroke > 1 ? "strokes" : "stroke"
        }`;

        const unicode = `${chalk.grey(`U+${kanji.unicode}`)}`;

        console.log(
            `${kanji.character} ${jlpt} ${freq} ${meaning} | ${on} | ${kun} | ${nanori} | ${stroke} | ${unicode}`
        );
    });
};
