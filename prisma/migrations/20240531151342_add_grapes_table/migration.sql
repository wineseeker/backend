-- CreateTable
CREATE TABLE `wine_grapes` (
    `wine_id` INTEGER NOT NULL,
    `grape_id` INTEGER NOT NULL,

    PRIMARY KEY (`wine_id`, `grape_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Grapes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `wine_grapes` ADD CONSTRAINT `wine_grapes_wine_id_fkey` FOREIGN KEY (`wine_id`) REFERENCES `Wine`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wine_grapes` ADD CONSTRAINT `wine_grapes_grape_id_fkey` FOREIGN KEY (`grape_id`) REFERENCES `Grapes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
