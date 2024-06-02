/*
  Warnings:

  - Added the required column `datetime` to the `Result` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `result` ADD COLUMN `datetime` DATETIME(3) NOT NULL;
