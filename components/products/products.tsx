'use client'

import Image from "next/image"
import Link from "next/link"
import { Badge } from "../ui/badge"
import formatPrice from "@/lib/format-price"
import { useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { ProductWithTag, TagsWithProducts } from "@/lib/infer-type"
import { BadgeCheck } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"

type ProductTypes = {
    products: ProductWithTag[]
}

export default function Products({products}: ProductTypes) {
    
    const params = useSearchParams();
    const paramTag = params.get("tag");

    const filtered = useMemo(() => {
        if(paramTag) {
            return products.filter((item) => (item.tag.tag.name).toLowerCase() === paramTag);
        }
        return products;
    }, [paramTag, products]);


    return(


        <main className="grid sm:grid-cols-1 md:grid-cols-2 gap-12 lg:grid-cols-3">
        {filtered
            .filter((product) => product.stock! > 0)
            .map((product) => (
                <Link
                    className="py-2"
                    key={product.id}
                    href={`/products/${product.id}?id=${product.id}&price=${product.price}&title=${product.title}&image=${product.image![0]}`}
                >
                    <Image
                    className="rounded-md pb-2 max-h-[300px]"
                    src={product.image![0]}
                    width={720}
                    height={300}
                    alt={product.title}
                    loading="lazy"
                    />
                    <div className="flex justify-between">
                        <div className="font-medium">
                            <div className="flex flex-row gap-2 items-center">
                                <h2>{product.title}</h2>    
                                {!product.verified && (
                                    <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                        <span>
                                            <BadgeCheck className="text-emerald-500 dark:text-emerald-300" />
                                        </span>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                        Authenticity Verified
                                        </TooltipContent>
                                    </Tooltip>
                                    </TooltipProvider>
                                )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                            {product.tag.tag.name}
                            </p>
                        </div>
                        <div>
                            <Badge className="text-sm" variant="secondary">
                            {formatPrice(product.price)}
                            </Badge>
                        </div>
                    </div>
                </Link>
            ))}
        </main>

    )
}