/*
  Warnings:

  - You are about to drop the column `clicked` on the `results` table. All the data in the column will be lost.
  - You are about to drop the `survey` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `results` DROP COLUMN `clicked`;

-- DropTable
DROP TABLE `survey`;
