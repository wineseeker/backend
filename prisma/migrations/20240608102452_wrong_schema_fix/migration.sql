/*
  Warnings:

  - You are about to drop the column `email_change_req` on the `password_reset_tokens` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `email_verification_codes` ADD COLUMN `email_change_req` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `password_reset_tokens` DROP COLUMN `email_change_req`;
