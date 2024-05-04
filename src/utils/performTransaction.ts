import prisma from '../prisma.js'
import { PrismaTransactionClient } from '../types/index.js'

export default async <T>(callback: (tx: PrismaTransactionClient) => Promise<T>): Promise<T> => {
  return await prisma.$transaction(async (tx) => {
    return await callback(tx)
  })
}
