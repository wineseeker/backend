/*
  Warnings:

  - You are about to drop the `wine` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `result_wine` DROP FOREIGN KEY `result_wine_wine_id_fkey`;

-- DropForeignKey
ALTER TABLE `wine_food` DROP FOREIGN KEY `wine_food_wine_id_fkey`;

-- DropForeignKey
ALTER TABLE `wine_grapes` DROP FOREIGN KEY `wine_grapes_wine_id_fkey`;

-- RenameTable
RENAME TABLE `wine` TO `Wines`;

-- AddForeignKey
ALTER TABLE `result_wine` ADD CONSTRAINT `result_wine_wine_id_fkey` FOREIGN KEY (`wine_id`) REFERENCES `Wines`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wine_food` ADD CONSTRAINT `wine_food_wine_id_fkey` FOREIGN KEY (`wine_id`) REFERENCES `Wines`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wine_grapes` ADD CONSTRAINT `wine_grapes_wine_id_fkey` FOREIGN KEY (`wine_id`) REFERENCES `Wines`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
