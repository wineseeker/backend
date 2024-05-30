/*
  Warnings:

  - You are about to drop the column `countryCode` on the `wine` table. All the data in the column will be lost.
  - You are about to drop the column `ratingAverage` on the `wine` table. All the data in the column will be lost.
  - You are about to drop the column `ratingCount` on the `wine` table. All the data in the column will be lost.
  - You are about to drop the column `typeId` on the `wine` table. All the data in the column will be lost.
  - Added the required column `country_code` to the `Wine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating_average` to the `Wine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating_count` to the `Wine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_id` to the `Wine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `wine` DROP COLUMN `countryCode`,
    DROP COLUMN `ratingAverage`,
    DROP COLUMN `ratingCount`,
    DROP COLUMN `typeId`,
    ADD COLUMN `country_code` VARCHAR(191) NOT NULL,
    ADD COLUMN `rating_average` DOUBLE NOT NULL,
    ADD COLUMN `rating_count` INTEGER NOT NULL,
    ADD COLUMN `type_id` INTEGER NOT NULL;
