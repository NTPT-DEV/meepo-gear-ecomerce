
strack use 

Next js 15 
tailwind 4.0 
typescript 
lucie Icon
React Icon

Auth js
prisna 
mongoDB   user nuttaphong / password yY7340DhhOYXIG2T *** meepo gear project ***
zod 

React-hook-form


------------------------------

connect url ////    mongodb+srv://nuttaphong:<yY7340DhhOYXIG2T>@cluster0.fudjvae.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0


Authentication Auth js /// 

// Set up and Connect //
1. create Datatbase [mongoDB cluter] and get Link DATA_BASE (.env)  
2. npm i prisma --save // npm prisma init
3 . edit  DATA_BASE (.env) replace username and password 
4. create model Schema User and Account? // connect Project cluter with Prisma // npx prisma db push 
5. check data base in Prisma Studio // npx prisma studio // and getsome url  http://localhost:5555


// create Prisma Client //

 *** npx prisma db push = update current schema to data base ***
 *** npx prisma generate = update current schema to client ***

6. npm install @prisma/client   
7. add file prisma.ts in prisma folder for create global Variable // เพื่อหลีกเลี่ยงการสร้างซ้ำๆ


import { PrismaClient } from "@prisma/client"; *** import schema client

const globalForPrisma = global as unknown as { prisma : PrismaClient};

export const prisma =  globalForPrisma.prisma || 
new PrismaClient({
    log : ["error" , "warn"]
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma


/// install Auth js *** Prisma Adapter ///

8. npm install @prisma/client @auth/prisma-adapter // for adapter prisma 
9. npm install next-auth@beta  // for auth js 


