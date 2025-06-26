/*
  Warnings:

  - Added the required column `avatarUrl` to the `ProfileCv` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProfileCv" ADD COLUMN     "avatarUrl" TEXT NOT NULL;
