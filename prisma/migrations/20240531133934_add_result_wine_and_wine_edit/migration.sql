/*
  Warnings:

  - You are about to drop the column `userId` on the `result` table. All the data in the column will be lost.
  - You are about to drop the column `wineId` on the `result` table. All the data in the column will be lost.
  - Made the column `name` on table `wine` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `result` DROP FOREIGN KEY `Result_userId_fkey`;

-- DropForeignKey
ALTER TABLE `result` DROP FOREIGN KEY `Result_wineId_fkey`;

-- AlterTable
ALTER TABLE `result` DROP COLUMN `userId`,
    DROP COLUMN `wineId`,
    ADD COLUMN `user_id` VARCHAR(191) NULL,
    MODIFY `clicked` INTEGER NULL;

-- AlterTable
ALTER TABLE `wine` MODIFY `name` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `result_wine` (
    `result_id` INTEGER NOT NULL,
    `wine_id` INTEGER NOT NULL,

    PRIMARY KEY (`result_id`, `wine_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Result` ADD CONSTRAINT `Result_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `result_wine` ADD CONSTRAINT `result_wine_result_id_fkey` FOREIGN KEY (`result_id`) REFERENCES `Result`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `result_wine` ADD CONSTRAINT `result_wine_wine_id_fkey` FOREIGN KEY (`wine_id`) REFERENCES `Wine`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
