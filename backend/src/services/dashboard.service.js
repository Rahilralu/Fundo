import prisma from "../config/psql.js";

export async function getDashboardStatsService() {
  const [totalUsers, totalEvents, totalTransactions, amountData] = await Promise.all([
    prisma.users.count(),
    prisma.Event.count(),
    prisma.Transaction.count({ where: { status: 'SUCCESS' } }),
    prisma.Transaction.aggregate({
      _sum: { amount: true },
      where: { status: 'SUCCESS' },
    }),
  ]);

  return {
    totalUsers,
    totalEvents,
    totalTransactions,
    totalAmountCollected: amountData._sum.amount || 0,
  };
}