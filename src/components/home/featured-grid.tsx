import { ArrowRight } from 'lucide-react'

import { RevealGroup, RevealItem, Reveal } from '@/components/motion/reveal'
import { ProductCard } from '@/components/product/product-card'
import { ButtonLink } from '@/components/ui/button'
import { featuredProducts } from '@/lib/products'

export function FeaturedGrid() {
  return (
    <section className="relative py-20 sm:py-24" id="shop">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <span className="font-display text-[0.8rem] font-extrabold tracking-[0.2em] text-blue uppercase">
                The range
              </span>
              <h2 className="mt-3 text-[clamp(2rem,4.6vw,3.1rem)]">
                One compound.{' '}
                <span className="text-gradient">Four ways to buy it.</span>
              </h2>
              <p className="mt-4 text-[1.02rem] leading-relaxed text-slate">
                Same vial, same batch standard, same seal. Pick a single unit to
                trial the material or a kit if a project needs the volume — the
                per-vial rate drops as the pack gets bigger.
              </p>
            </div>

            <ButtonLink href="/shop" variant="outline" className="shrink-0">
              See all four <ArrowRight className="h-4 w-4" strokeWidth={2.8} />
            </ButtonLink>
          </div>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product, index) => (
            <RevealItem key={product.slug} className="h-full">
              <ProductCard product={product} priority={index === 0} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
