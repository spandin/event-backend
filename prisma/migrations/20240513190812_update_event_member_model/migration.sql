/*
  Warnings:

  - You are about to drop the column `creator_id` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `event` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,event_id]` on the table `event_member` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `owner_id` to the `event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "event" DROP CONSTRAINT "event_creator_id_fkey";

-- DropIndex
DROP INDEX "event_member_id_key";

-- AlterTable
ALTER TABLE "event" DROP COLUMN "creator_id",
DROP COLUMN "isActive",
ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "owner_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "event_member_user_id_event_id_key" ON "event_member"("user_id", "event_id");

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
