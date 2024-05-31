-- CreateTable
CREATE TABLE `wine_food` (
    `wine_id` INTEGER NOT NULL,
    `food_id` INTEGER NOT NULL,

    PRIMARY KEY (`wine_id`, `food_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `wine_food` ADD CONSTRAINT `wine_food_wine_id_fkey` FOREIGN KEY (`wine_id`) REFERENCES `Wine`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wine_food` ADD CONSTRAINT `wine_food_food_id_fkey` FOREIGN KEY (`food_id`) REFERENCES `Food`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
