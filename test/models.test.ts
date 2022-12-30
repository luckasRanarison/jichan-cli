import database from "../src/lib/db/config";
import KanjiDic from "../src/lib/db/models/kanjidic";

describe("KanjiDic", () => {
    it("should connect to the database", async () => {
        const result = await database.models.KanjiDic.sync();
        expect(result).toBe(KanjiDic);
    });
});
