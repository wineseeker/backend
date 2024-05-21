-- CreateTable
CREATE TABLE `Survey` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `wine_type` INTEGER NOT NULL,
    `body` DOUBLE NOT NULL,
    `alcohol` DOUBLE NOT NULL,
    `acidity` DOUBLE NOT NULL,
    `sweetness` DOUBLE NOT NULL,
    `tannin` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
