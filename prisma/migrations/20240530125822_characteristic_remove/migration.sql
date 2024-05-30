/*
  Warnings:

  - You are about to drop the `characteristic` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `acidity` to the `Wine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alcohol` to the `Wine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `body` to the `Wine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryCode` to the `Wine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sweetness` to the `Wine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tannin` to the `Wine` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `characteristic` DROP FOREIGN KEY `Characteristic_wineId_fkey`;

-- AlterTable
ALTER TABLE `wine` ADD COLUMN `acidity` DOUBLE NOT NULL,
    ADD COLUMN `alcohol` DOUBLE NOT NULL,
    ADD COLUMN `body` DOUBLE NOT NULL,
    ADD COLUMN `countryCode` VARCHAR(191) NOT NULL,
    ADD COLUMN `sweetness` DOUBLE NOT NULL,
    ADD COLUMN `tannin` DOUBLE NOT NULL;

-- DropTable
DROP TABLE `characteristic`;
