'use client'

import Image from 'next/image'

import { useCart } from '@/components/cart/cart-provider'
import { RUO_SHORT, site } from '@/lib/site'
import { formatPrice } from '@/lib/utils'

export function OrderSummary() {
  const { lines, subtotal, shipping, total, freeShippingGap } = useCart()

  return (
    <aside
      aria-label="Order summary"
      className="lg:sticky lg:top-28 rounded-3xl border-2 border-ink bg-white p-6"
    >
      <h2 className="font-display text-lg font-extrabold">Order summary</h2>

      <ul className="mt-5 flex flex-col gap-4">
        {lines.map((line) => (
          <li key={line.slug} className="flex gap-3">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 border-line bg-paper-2">
              <Image
                src={line.product.image}
                alt={line.product.imageAlt}
                fill
                sizes="64px"
                className="object-contain p-1"
              />
              <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-ink bg-lime px-1 font-mono text-[0.62rem] font-bold">
                {line.qty}
              </span>
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-center">
              <p className="text-[0.86rem] leading-tight font-bold">
                {line.product.name}
              </p>
              <p className="font-mono text-[0.78rem] text-slate">
                {line.product.sku}
              </p>
            </div>
            <span className="self-center font-mono text-[0.86rem] font-bold">
              {formatPrice(line.lineTotal)}
            </span>
          </li>
        ))}
      </ul>

      <dl className="mt-6 flex flex-col gap-2.5 border-t-2 border-line pt-5 text-[0.88rem]">
        <div className="flex justify-between">
          <dt className="text-slate">Subtotal</dt>
          <dd className="font-mono font-bold">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate">Shipping</dt>
          <dd className="font-mono font-bold">
            {shipping === 0 ? 'Free' : formatPrice(shipping)}
          </dd>
        </div>
        {freeShippingGap > 0 ? (
          <p className="rounded-full bg-lime/50 px-3 py-1.5 text-center text-[0.75rem] font-semibold">
            Add {formatPrice(freeShippingGap)} for free shipping
          </p>
        ) : null}
        <div className="flex items-baseline justify-between border-t-2 border-line pt-3">
          <dt className="font-display font-extrabold">Total due</dt>
          <dd className="font-mono text-xl font-extrabold">{formatPrice(total)}</dd>
        </div>
      </dl>

      <p className="mt-4 text-[0.72rem] leading-relaxed text-slate">
        Prices in {site.currency}. Nothing is charged now — an invoice with a
        secure payment link is emailed after the order is confirmed. {RUO_SHORT}
      </p>
    </aside>
  )
}
