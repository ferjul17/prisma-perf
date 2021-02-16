import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error']
});

(async () => {
    const email = `user+${Math.random()}@domain.email`;
    const upsertConfig = {
        where: {
            email: email,
        },
        create: {
            email: email,
            firstName: 'firstName',
        },
        update: {
            firstName: 'firstName',
        }
    } as const;
    await prisma.user.upsert(upsertConfig);
    await prisma.user.upsert(upsertConfig);
})().catch((e) => {
    console.error(e);
    process.abort();
}).finally(() => {
    prisma.$disconnect();
})