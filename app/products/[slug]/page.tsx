import ProductShowcase from "@/components/products/product-showcase";
import { Separator } from "@/components/ui/separator";
import formatPrice from "@/lib/format-price";
import { db } from "@/server";
import { products, productTags, tags } from "@/server/schema";
import { desc, eq } from "drizzle-orm";

export async function generateStaticParams() {
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

    if(data) {
        const slugID = data.map((product) => ({ slug: product.id.toString() }));
        return slugID;
    }
}

export default async function Page({params}: { params: { slug: string } }) {
    const product = await db
    .select({
        id: products.id,
        title: products.title,
        description: products.description,
        price: products.price,
        image: products.image,
        tagName: tags.name,
      })
      .from(products)
      .leftJoin(productTags, eq(products.id, productTags.productId))
      .leftJoin(tags, eq(productTags.tagId, tags.id))
      .where(eq(products.id, Number(params.slug)));

    return(
      <main>
        <section className="flex flex-col lg:flex-row gap-4 lg:gap-12">
            <div className="flex-1">
                <ProductShowcase product={product[0]} />
            </div>
            <div className="flex flex-col flex-1">
                <h2 className="text-2xl font-bold">{product[0].title}</h2>
                <div className="text-secondary-foreground font-medium">
                    {product[0].tagName}
                </div>
                <Separator className="my-2" />
                <p className="text-2xl font-medium py-2">
                    {formatPrice(product[0].price)}
                </p>
                <div dangerouslySetInnerHTML={{ __html: product[0].description }}>
                </div>
            </div>
        </section>
      </main>  
    );
}