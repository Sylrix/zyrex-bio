import { RUO_NOTICE } from '@/lib/site'

/**
 * The catalogue.
 *
 * Everything here is NAD+ in lyophilised vial form: one product photographed,
 * sold singly and in multi vial packs. Copy stays deliberately plain. What is
 * in the vial, how much, how it is presented, how it ships. No dosing, no
 * effects, no benefits, no protocols. That restraint is what keeps the listing
 * reviewable and honest for a research use only catalogue.
 */

export interface Product {
  readonly slug: string
  readonly name: string
  /** Short line used on cards and in the feed title. */
  readonly summary: string
  readonly price: number
  readonly compareAt: number | null
  readonly vials: number
  readonly strength: string
  readonly purity: string
  readonly form: string
  readonly image: string
  readonly imageAlt: string
  readonly sku: string
  readonly gtin: string | null
  readonly badge: string | null
  readonly description: readonly string[]
  readonly specs: ReadonlyArray<{ label: string; value: string }>
  readonly stock: 'in_stock' | 'out_of_stock'
  readonly featured: boolean
}

const IMAGE = '/products/nad-plus-500mg.webp'
const IMAGE_ALT =
  'Zyrex Bio NAD+ 500mg research vial with a teal flip top seal and black label'

const SHARED_SPECS = [
  { label: 'Compound', value: 'NAD+ (nicotinamide adenine dinucleotide)' },
  { label: 'Purity', value: '99% or better by HPLC' },
  { label: 'Presentation', value: 'Lyophilised powder, sealed glass vial' },
  { label: 'Vial closure', value: 'Butyl stopper, aluminium flip off seal' },
  { label: 'Storage', value: 'Store sealed at 2 to 8°C, protected from light' },
  { label: 'Intended use', value: 'Laboratory research use only' },
  { label: 'Origin', value: 'Dispatched from Bacchus Marsh, Victoria' },
] as const

function packDescription(vials: number): readonly string[] {
  const unit = vials === 1 ? 'vial' : 'vials'
  return [
    `${vials} x 500mg NAD+ ${unit} supplied as a lyophilised powder in sealed glass vials, tested at 99% purity or better.`,
    'Each vial is sealed with a butyl stopper and aluminium flip off cap, labelled with the compound, quantity and batch, then packed in a moulded insert so nothing moves in transit.',
    'Supplied strictly as a research material for use by qualified individuals in a laboratory setting.',
    RUO_NOTICE,
  ]
}

export const products: readonly Product[] = [
  {
    slug: 'nad-plus-500mg-single-vial',
    name: 'NAD+ 500mg Single Vial',
    summary: 'One 500mg vial. The standard unit.',
    price: 89,
    compareAt: null,
    vials: 1,
    strength: '500mg',
    purity: '99%',
    form: 'Lyophilised powder',
    image: IMAGE,
    imageAlt: IMAGE_ALT,
    sku: 'ZB-NAD500-01',
    gtin: null,
    badge: null,
    description: packDescription(1),
    specs: SHARED_SPECS,
    stock: 'in_stock',
    featured: true,
  },
  {
    slug: 'nad-plus-500mg-3-vial-kit',
    name: 'NAD+ 500mg 3 Vial Kit',
    summary: 'Three 500mg vials in one insert.',
    price: 249,
    compareAt: 267,
    vials: 3,
    strength: '500mg',
    purity: '99%',
    form: 'Lyophilised powder',
    image: IMAGE,
    imageAlt: IMAGE_ALT,
    sku: 'ZB-NAD500-03',
    gtin: null,
    badge: 'Most picked',
    description: packDescription(3),
    specs: SHARED_SPECS,
    stock: 'in_stock',
    featured: true,
  },
  {
    slug: 'nad-plus-500mg-5-vial-kit',
    name: 'NAD+ 500mg 5 Vial Kit',
    summary: 'Five 500mg vials, better per vial rate.',
    price: 399,
    compareAt: 445,
    vials: 5,
    strength: '500mg',
    purity: '99%',
    form: 'Lyophilised powder',
    image: IMAGE,
    imageAlt: IMAGE_ALT,
    sku: 'ZB-NAD500-05',
    gtin: null,
    badge: 'Best value',
    description: packDescription(5),
    specs: SHARED_SPECS,
    stock: 'in_stock',
    featured: true,
  },
  {
    slug: 'nad-plus-500mg-10-vial-case',
    name: 'NAD+ 500mg 10 Vial Case',
    summary: 'Ten 500mg vials in a foam lined case.',
    price: 749,
    compareAt: 890,
    vials: 10,
    strength: '500mg',
    purity: '99%',
    form: 'Lyophilised powder',
    image: IMAGE,
    imageAlt: IMAGE_ALT,
    sku: 'ZB-NAD500-10',
    gtin: null,
    badge: 'Bulk',
    description: packDescription(10),
    specs: SHARED_SPECS,
    stock: 'in_stock',
    featured: false,
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}

export const featuredProducts = products.filter((product) => product.featured)

/** Cheapest vial rate across the catalogue, used in hero copy. */
export const lowestPerVial = Math.min(
  ...products.map((product) => product.price / product.vials)
)
