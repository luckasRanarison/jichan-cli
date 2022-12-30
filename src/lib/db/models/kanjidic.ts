import * as seq from "sequelize-typescript";
import { Kanji } from "../../../interface";

@seq.Table({
    tableName: "kanjidic",
})
class KanjiDic extends seq.Model<KanjiDic> implements Kanji {
    @seq.PrimaryKey
    @seq.Column({ type: seq.DataType.INTEGER({ length: 5 }) })
    declare id: number;

    @seq.Column({ type: seq.DataType.CHAR(1) })
    character: string;

    @seq.Column({ type: seq.DataType.CHAR(5) })
    unicode: string;

    @seq.Column({ type: seq.DataType.INTEGER({ length: 4 }) })
    freq: number;

    @seq.Column({ type: seq.DataType.INTEGER({ length: 2 }) })
    stroke: number;

    @seq.Column({ type: seq.DataType.TEXT })
    radical: string;

    @seq.Column({ type: seq.DataType.INTEGER({ length: 2 }) })
    grade: number;

    @seq.Column({ type: seq.DataType.INTEGER({ length: 1 }) })
    jlpt: number;

    @seq.Column({ type: seq.DataType.TEXT })
    regular_on: string;

    @seq.Column({ type: seq.DataType.TEXT })
    regular_kun: string;

    @seq.Column({ type: seq.DataType.TEXT })
    onyomi: string;

    @seq.Column({ type: seq.DataType.TEXT })
    kunyomi: string;

    @seq.Column({ type: seq.DataType.TEXT })
    nanori: string;

    @seq.Column({ type: seq.DataType.TEXT })
    selected_meaning: string;

    @seq.Column({ type: seq.DataType.TEXT })
    meaning: string;
}

export default KanjiDic;
