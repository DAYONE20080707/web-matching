/*
  Warnings:

  - You are about to drop the column `planPageNumber` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "pickUp" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "planPageNumber";

-- CreateTable
CREATE TABLE "CompanySubsidy" (
    "id" TEXT NOT NULL,
    "subsidyId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanySubsidy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CompanySubsidy_companyId_idx" ON "CompanySubsidy"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanySubsidy_companyId_subsidyId_key" ON "CompanySubsidy"("companyId", "subsidyId");
