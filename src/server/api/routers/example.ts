
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.product.findMany( {
      include: {
        Colours: {
          include: {
            Size: true,
          },
        }
      }
    });
  }),
});
