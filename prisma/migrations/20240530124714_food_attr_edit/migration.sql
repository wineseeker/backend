/*
  Warnings:

  - You are about to drop the column `wineId` on the `food` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `food` DROP FOREIGN KEY `Food_wineId_fkey`;

-- AlterTable
ALTER TABLE `food` DROP COLUMN `wineId`;
