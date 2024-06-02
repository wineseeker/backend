/*
  Warnings:

  - You are about to drop the `result` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `result` DROP FOREIGN KEY `Result_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `result_wine` DROP FOREIGN KEY `result_wine_result_id_fkey`;

-- DropTable
DROP TABLE `result`;

-- CreateTable
CREATE TABLE `Results` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `datetime` DATETIME(3) NOT NULL,
    `user_id` VARCHAR(191) NULL,
    `clicked` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Results` ADD CONSTRAINT `Results_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `result_wine` ADD CONSTRAINT `result_wine_result_id_fkey` FOREIGN KEY (`result_id`) REFERENCES `Results`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
