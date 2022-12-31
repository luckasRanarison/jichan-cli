import database from "../db/config";
import { KanjiOption } from "../../interface";
import { Op } from "sequelize";
import { isHiragana, isRomaji, toHiragana, toKatakana } from "wanakana";

export const searchKanji = async (
    character: string,
    option: KanjiOption
): Promise<any[]> => {
    const isLiteralSearch = character ? true : false;

    const filters: any = { [Op.and]: [] };

    if (isLiteralSearch) {
        filters[Op.and].push({ character: character });
    } else {
        if (isRomaji(option.onyomi) || isHiragana(option.onyomi)) {
            option.onyomi = toKatakana(option.onyomi);
        }
        if (isRomaji(option.kunyomi)) {
            option.kunyomi = toHiragana(option.kunyomi);
        }
        if (isRomaji(option.nanori)) {
            option.nanori = toHiragana(option.nanori);
        }

        const radicalList = { [Op.and]: [] };

        if (option.radical) {
            for (const radical of option.radical) {
                radicalList[Op.and].push({ [Op.like]: `%${radical}%` });
            }
        }

        const optionFilter = [
            { filter: "meaning", value: { [Op.like]: `%${option.meaning}%` } },
            { filter: "onyomi", value: { [Op.like]: `%${option.onyomi}%` } },
            { filter: "kunyomi", value: { [Op.like]: `%${option.kunyomi}%` } },
            { filter: "nanori", value: { [Op.like]: `%${option.nanori}%` } },
            { filter: "radical", value: radicalList },
            { filter: "stroke", value: option.stroke },
            { filter: "jlpt", value: option.jlpt },
            { filter: "common", value: { [Op.not]: null } },
        ];

        for (const { filter, value } of optionFilter) {
            if (option[filter]) {
                if (filter === "common") {
                    filters[Op.and].push({ freq: value });
                } else {
                    filters[Op.and].push({ [filter]: value });
                }
            }
        }
    }

    const query: any = {
        raw: true,
        where: filters,
        order: [
            ["freq", "NULLS LAST"],
            ["stroke", "ASC"],
        ],
        limit: option.max,
    };

    const match = database.models.KanjiDic.findAll(query);

    return match;
};
