# JiChan

Japanese CLI dictionary, it's currently only providing kanji search. This project is currently not my priority but I'll implement JMDict database later on, PRs are also welcome.

This app uses the Kanjidic2 database with some additional informations such as common readings, updated JLPT levels and only features 6355 kanji (JIS X 0208-1998), you aso have to get the database from [this repository](https://github.com/luckasRanarison/jichan-db)). The database is converted in sqlite database and Jichan uses Sequelize-typescript for ORM.
