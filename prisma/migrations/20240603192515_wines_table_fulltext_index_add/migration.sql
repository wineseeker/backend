-- CreateIndex
CREATE FULLTEXT INDEX `Wines_name_idx` ON `Wines`(`name`) WITH PARSER `ngram`;
