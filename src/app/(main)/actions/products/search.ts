import { prisma } from "@/lib/prisma";

export const searchProduct = async (searchParams: string) => {
  console.log(searchParams);

  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name : 
            {contains : searchParams ,
            mode : 'insensitive',
            }
        },
        { title : 
            {contains : searchParams ,
            mode : 'insensitive',
            }
        },
        { description : 
            {contains : searchParams ,
            mode : 'insensitive',
            }
        },
        { category : {
            name : {contains : searchParams ,
            mode : 'insensitive',
            }}
        }

      ],
    }, include : {
        category : true , 
        images : true
    }
  });

  return products;
};
