'use server'

import { auth } from "@/lib/auth";
import { createOrderSchema } from "@/types/order-schema";
import { createSafeActionClient } from "next-safe-action"
import { headers } from "next/headers";
import { orderProduct, orders } from "../schema";
import { db } from "..";


const action = createSafeActionClient();

export const createOrder = action.schema(createOrderSchema).action(async ({ parsedInput: { products, status, total, paymentIntentID } }) => {
    const session = await auth.api.getSession({
        headers: await headers()
      });
    if(!session?.user) {
        return { error: "user not found" };
    }

    const order = await db.insert(orders).values({
        status,
        paymentIntentID,
        total,
        userID: session.user.id
    })
    .returning();
    const orderProducts = products.map(async({productID, quantity}) => {
        const newOrderProduct = await db.insert(orderProduct).values({
            quantity,
            orderID: order[0].id,
            productID: productID
        });
    })
    return { success: 'Order has been added' };
})