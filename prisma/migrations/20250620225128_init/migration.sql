-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "githubId" INTEGER NOT NULL,
    "login" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "avatarUrl" TEXT,
    "bio" TEXT,
    "location" TEXT,
    "website" TEXT,
    "githubUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileCv" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "githubUrl" TEXT NOT NULL,
    "linkedinUrl" TEXT NOT NULL,
    "websiteUrl" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "stacks" TEXT[],

    CONSTRAINT "ProfileCv_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_githubId_key" ON "User"("githubId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileCv_userId_key" ON "ProfileCv"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileCv_email_key" ON "ProfileCv"("email");

-- AddForeignKey
ALTER TABLE "ProfileCv" ADD CONSTRAINT "ProfileCv_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
