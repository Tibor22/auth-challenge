-- CreateTable
CREATE TABLE "MoviesAndUsers" (
    "movieId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "MoviesAndUsers_pkey" PRIMARY KEY ("movieId","userId")
);

-- AddForeignKey
ALTER TABLE "MoviesAndUsers" ADD CONSTRAINT "MoviesAndUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoviesAndUsers" ADD CONSTRAINT "MoviesAndUsers_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
