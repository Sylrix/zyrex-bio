import { RUO_NOTICE } from '@/lib/site'

/**
 * The catalogue.
 *
 * Everything here is the same 500mg vial, sold singly and in multi vial packs.
 * Copy stays deliberately plain. What is in the vial by format and quantity,
 * how it is presented, how it ships. No substance name, no dosing, no effects,
 * no benefits, no protocols, and no category jargon. That restraint is what
 * keeps the listing reviewable and honest.
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

/**
 * Google product taxonomy id used for every item in the Merchant Center feed.
 * Numeric ids are preferred over the full category string because the string
 * form has to match Google's taxonomy exactly, character for character, and
 * silently drops the item when it does not.
 */
export const GOOGLE_PRODUCT_CATEGORY = '3002'

const IMAGE = '/products/zyrex-500mg.webp'
const IMAGE_ALT =
  'Zyrex 500mg vial with a teal flip top seal and a black label'

const SHARED_SPECS = [
  { label: 'Format', value: 'Lyophilised powder, sealed glass vial' },
  { label: 'Fill', value: '500mg per vial' },
  { label: 'Purity', value: '99% or better by HPLC' },
  { label: 'Vial closure', value: 'Butyl stopper, aluminium flip off seal' },
  { label: 'Storage', value: 'Store sealed at 2 to 8°C, protected from light' },
  { label: 'Intended use', value: 'Laboratory use only' },
  { label: 'Origin', value: 'Dispatched from Bacchus Marsh, Victoria' },
] as const

function packDescription(vials: number): readonly string[] {
  const unit = vials === 1 ? 'vial' : 'vials'
  return [
    `${vials} x 500mg ${unit} of high purity lyophilised material, supplied in sealed glass vials and tested at 99% purity or better.`,
    'Each vial is sealed with a butyl stopper and aluminium flip off cap, labelled with the contents, quantity and batch, then packed in a moulded insert so nothing moves in transit.',
    'Supplied strictly for use by qualified individuals in a laboratory setting.',
    RUO_NOTICE,
  ]
}

export const products: readonly Product[] = [
  {
    slug: 'zyrex-500mg-single-vial',
    name: 'Zyrex 500mg Single Vial',
    summary: 'One 500mg vial. The standard unit.',
    price: 89,
    compareAt: null,
    vials: 1,
    strength: '500mg',
    purity: '99%',
    form: 'Lyophilised powder',
    image: IMAGE,
    imageAlt: IMAGE_ALT,
    sku: 'ZX-500-01',
    gtin: null,
    badge: null,
    description: packDescription(1),
    specs: SHARED_SPECS,
    stock: 'in_stock',
    featured: true,
  },
  {
    slug: 'zyrex-500mg-3-vial-kit',
    name: 'Zyrex 500mg 3 Vial Kit',
    summary: 'Three 500mg vials in one insert.',
    price: 249,
    compareAt: 267,
    vials: 3,
    strength: '500mg',
    purity: '99%',
    form: 'Lyophilised powder',
    image: IMAGE,
    imageAlt: IMAGE_ALT,
    sku: 'ZX-500-03',
    gtin: null,
    badge: 'Most picked',
    description: packDescription(3),
    specs: SHARED_SPECS,
    stock: 'in_stock',
    featured: true,
  },
  {
    slug: 'zyrex-500mg-5-vial-kit',
    name: 'Zyrex 500mg 5 Vial Kit',
    summary: 'Five 500mg vials, better per vial rate.',
    price: 399,
    compareAt: 445,
    vials: 5,
    strength: '500mg',
    purity: '99%',
    form: 'Lyophilised powder',
    image: IMAGE,
    imageAlt: IMAGE_ALT,
    sku: 'ZX-500-05',
    gtin: null,
    badge: 'Best value',
    description: packDescription(5),
    specs: SHARED_SPECS,
    stock: 'in_stock',
    featured: true,
  },
  {
    slug: 'zyrex-500mg-10-vial-case',
    name: 'Zyrex 500mg 10 Vial Case',
    summary: 'Ten 500mg vials in a foam lined case.',
    price: 749,
    compareAt: 890,
    vials: 10,
    strength: '500mg',
    purity: '99%',
    form: 'Lyophilised powder',
    image: IMAGE,
    imageAlt: IMAGE_ALT,
    sku: 'ZX-500-10',
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
