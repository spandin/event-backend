/*
  Warnings:

  - The primary key for the `event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `event` table. All the data in the column will be lost.
  - Added the required column `creator_id` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "event" DROP CONSTRAINT "event_user_id_fkey";

-- AlterTable
ALTER TABLE "event" DROP CONSTRAINT "event_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "creator_id" TEXT NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "totalCost" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "isActive" SET DEFAULT true,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "event_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "event_id_seq";

-- CreateTable
CREATE TABLE "event_member" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,

    CONSTRAINT "event_member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "user_id" TEXT NOT NULL,
    "event_member_id" TEXT,
    "event_id" TEXT,

    CONSTRAINT "purchase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "event_member_id_key" ON "event_member"("id");

-- CreateIndex
CREATE UNIQUE INDEX "event_member_user_id_key" ON "event_member"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "event_member_event_id_key" ON "event_member"("event_id");

-- CreateIndex
CREATE UNIQUE INDEX "purchase_id_key" ON "purchase"("id");

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_member" ADD CONSTRAINT "event_member_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_member" ADD CONSTRAINT "event_member_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase" ADD CONSTRAINT "purchase_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase" ADD CONSTRAINT "purchase_event_member_id_fkey" FOREIGN KEY ("event_member_id") REFERENCES "event_member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase" ADD CONSTRAINT "purchase_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
