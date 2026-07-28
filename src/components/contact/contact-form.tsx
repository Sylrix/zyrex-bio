'use client'

import { motion } from 'motion/react'
import { AlertCircle, Check, Loader2, Send } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod'

import { TextAreaField, TextField } from '@/components/checkout/fields'
import { Button } from '@/components/ui/button'
import { site } from '@/lib/site'

const schema = z.object({
  name: z.string().trim().min(1, 'Please enter your name.').max(80, 'That is a little long.'),
  email: z
    .string()
    .trim()
    .min(1, 'Please enter your email address.')
    .email('Please enter a valid email address.'),
  subject: z
    .string()
    .trim()
    .min(1, 'Please add a subject.')
    .max(120, 'Please keep the subject under 120 characters.'),
  message: z
    .string()
    .trim()
    .min(10, 'Please add a little more detail.')
    .max(2000, 'Please keep the message under 2000 characters.'),
})

type Values = z.infer<typeof schema>
type Errors = Partial<Record<keyof Values, string>>

const ENDPOINT = 'https://api.web3forms.com/submit'
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? ''

export function ContactForm() {
  const [values, setValues] = useState<Values>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<Errors>({})
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle')

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    const parsed = schema.safeParse(values)
    if (!parsed.success) {
      const next: Errors = {}
      for (const issue of parsed.error.issues) {
        const key = issue.path[0]
        if (typeof key === 'string' && !next[key as keyof Values]) {
          next[key as keyof Values] = issue.message
        }
      }
      setErrors(next)
      return
    }

    if (!ACCESS_KEY) {
      setState('failed')
      return
    }

    setState('sending')

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Zyrex enquiry, ${parsed.data.subject}`,
          from_name: `${site.name} contact form`,
          replyto: parsed.data.email,
          name: parsed.data.name,
          email: parsed.data.email,
          message: parsed.data.message,
        }),
      })

      setState(response.ok ? 'sent' : 'failed')
      if (response.ok) {
        setValues({ name: '', email: '', subject: '', message: '' })
      }
    } catch {
      setState('failed')
    }
  }

  if (state === 'sent') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4 rounded-3xl border-2 border-ink bg-lime/40 p-10 text-center"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink bg-white">
          <Check className="h-6 w-6" strokeWidth={3.2} />
        </span>
        <h2 className="font-display text-xl font-extrabold">Message sent</h2>
        <p className="max-w-sm text-[0.9rem] leading-relaxed">
          You will get a reply within {site.contact.responseWindow}, {site.contact.hours}.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          id="name"
          label="Your name"
          required
          autoComplete="name"
          value={values.name}
          error={errors.name}
          onChange={(value) => update('name', value)}
        />
        <TextField
          id="email"
          label="Email"
          type="email"
          inputMode="email"
          required
          autoComplete="email"
          value={values.email}
          error={errors.email}
          onChange={(value) => update('email', value)}
        />
      </div>

      <TextField
        id="subject"
        label="Subject"
        required
        placeholder="Batch documentation, order status, bulk quote…"
        value={values.subject}
        error={errors.subject}
        onChange={(value) => update('subject', value)}
      />

      <TextAreaField
        id="message"
        label="Message"
        required
        rows={6}
        placeholder="What can I help with?"
        value={values.message}
        error={errors.message}
        onChange={(value) => update('message', value)}
      />

      {state === 'failed' ? (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-2xl border-2 border-coral bg-coral/10 px-4 py-3 text-[0.85rem] font-semibold"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2.6} />
          <span>
            The message could not be sent from here. Please email{' '}
            <a
              href={`mailto:${site.contact.email}`}
              className="underline underline-offset-4"
            >
              {site.contact.email}
            </a>{' '}
            directly and it will be answered just as quickly.
          </span>
        </div>
      ) : null}

      <Button type="submit" size="lg" disabled={state === 'sending'}>
        {state === 'sending' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={3} /> Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" strokeWidth={2.8} /> Send message
          </>
        )}
      </Button>

      <p className="text-[0.75rem] leading-relaxed text-slate">
        Your name, email and message are used only to answer your enquiry and
        are never passed on to anyone else.
      </p>
    </form>
  )
}
