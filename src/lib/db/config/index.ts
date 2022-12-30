import { Sequelize } from "sequelize-typescript";
import KanjiDic from "../models/kanjidic";

const database = new Sequelize({
    dialect: "sqlite",
    storage: "db/jichan.db",
    define: {
        freezeTableName: true,
        timestamps: false,
    },
    models: [KanjiDic],
    logging: false,
});

export default database;
