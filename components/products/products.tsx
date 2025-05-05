'use client'

import Image from "next/image"
import Link from "next/link"
import { Badge } from "../ui/badge"
import formatPrice from "@/lib/format-price"



export default function Products({products}: any) {
    return(
        <main className="grid sm:grid-cols-1 md:grid-cols-2 gap-12 lg:grid-cols-3">
            {products.map((product:any) => 
                <Link className="py-2" key={product.id} href={`/products/${product.id}?id=${product.id}&price=${product.price}&title=${product.title}&image=${product.image[0]}`}>
                    <Image 
                        className="rounded-md pb-2"
                        src={product.image[0]}
                        width={720}
                        height={480}
                        alt={product.title}
                        loading="lazy"
                    />
                    <div className="flex justify-between">
                        <div className="font-medium">
                            <h2>
                                {product.title}
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                {product.tagName}
                            </p>
                        </div>
                        <div>
                            <Badge className="text-sm" variant={'secondary'}>
                                {formatPrice(product.price)}
                            </Badge>
                        </div>
                    </div>
                </Link>
            )}
        </main>
    )
}