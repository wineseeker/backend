-- AlterTable
ALTER TABLE `password_reset_tokens` ADD COLUMN `email_change_req` BOOLEAN NOT NULL DEFAULT false;
