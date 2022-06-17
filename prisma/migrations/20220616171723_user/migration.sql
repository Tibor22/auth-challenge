/*
  Warnings:

  - You are about to drop the `Movie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MoviesAndUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MoviesAndUsers" DROP CONSTRAINT "MoviesAndUsers_movieId_fkey";

-- DropForeignKey
ALTER TABLE "MoviesAndUsers" DROP CONSTRAINT "MoviesAndUsers_userId_fkey";

-- DropTable
DROP TABLE "Movie";

-- DropTable
DROP TABLE "MoviesAndUsers";
