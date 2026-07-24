import { cn } from '@/lib/utils'

/**
 * Inline payment marks.
 *
 * Drawn as small labelled pills rather than brand SVGs: reproducing a card
 * scheme's logo needs their trademark licence, and a wordmark in the site's
 * own type says the same thing without borrowing anyone's asset.
 */

const MARK_LABELS: Record<string, string> = {
  visa: 'VISA',
  mastercard: 'Mastercard',
  amex: 'AMEX',
  'apple-pay': ' Pay',
  'google-pay': 'G Pay',
  bank: 'Bank transfer',
  payid: 'PayID',
}

export function PaymentMark({ id }: { readonly id: string }) {
  return (
    <span className="inline-flex items-center rounded-md border-2 border-ink bg-white px-2 py-1 font-display text-[0.68rem] leading-none font-extrabold tracking-tight">
      {MARK_LABELS[id] ?? id}
    </span>
  )
}

export function PaymentMarks({
  ids = ['visa', 'mastercard', 'amex', 'apple-pay', 'google-pay', 'bank', 'payid'],
  className,
}: {
  readonly ids?: readonly string[]
  readonly className?: string
}) {
  return (
    <ul className={cn('flex flex-wrap items-center gap-1.5', className)}>
      {ids.map((id) => (
        <li key={id}>
          <PaymentMark id={id} />
        </li>
      ))}
    </ul>
  )
}
