/**
 * The properties represent the columns of the kanjidic table
 */
export interface Kanji {
    id: number;
    character: string;
    unicode: string;
    freq: number;
    stroke: number;
    radical: string;
    grade: number;
    jlpt: number;
    regular_on: string;
    regular_kun: string;
    onyomi: string;
    kunyomi: string;
    nanori: string;
    selected_meaning: string;
    meaning: string;
}

/**
 * Options for the kanji command
 */
export interface KanjiOption {
    meaning: string;
    onyomi: string;
    kunyomi: string;
    nanori: string;
    radical: string;
    stroke: number;
    jlpt: number;
    max: number;
    common: boolean;
    details: boolean;
}
