import { db } from "@/server";
import { products, productTags, tags } from "@/server/schema";
import { desc, eq } from "drizzle-orm";
import Products from "@/components/products/products";

export default async function Home() {
  const data = await db
    .select({
      id: products.id,
      title: products.title,
      price: products.price,
      image: products.image,
      description: products.description,
      tagName: tags.name,
    })
    .from(products)
    .leftJoin(productTags, eq(products.id, productTags.productId))
    .leftJoin(tags, eq(productTags.tagId, tags.id))
    .orderBy(desc(products.id));

  return (
    <main>
      <Products products={data} />
    </main>
  );
}
