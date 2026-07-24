'use client'

import { AlertCircle } from 'lucide-react'
import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

const CONTROL =
  'w-full rounded-xl border-2 bg-white px-4 py-3 text-[0.95rem] transition-colors ' +
  'placeholder:text-slate/60 focus:border-blue focus:outline-none'

export function FieldError({ id, message }: { readonly id: string; readonly message: string }) {
  return (
    <p
      id={id}
      role="alert"
      className="flex items-center gap-1.5 text-[0.8rem] font-semibold text-coral"
    >
      <AlertCircle className="h-3.5 w-3.5 shrink-0" strokeWidth={2.6} />
      {message}
    </p>
  )
}

interface FieldProps {
  readonly id: string
  readonly label: string
  readonly error?: string
  readonly hint?: string
  readonly required?: boolean
  readonly children?: ReactNode
  readonly className?: string
}

function FieldShell({ id, label, error, hint, required, children, className }: FieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-[0.82rem] font-bold">
        {label}
        {required ? <span className="text-coral"> *</span> : null}
      </label>
      {children}
      {hint && !error ? (
        <p className="text-[0.75rem] text-slate">{hint}</p>
      ) : null}
      {error ? <FieldError id={`${id}-error`} message={error} /> : null}
    </div>
  )
}

interface TextFieldProps extends FieldProps {
  readonly value: string
  readonly onChange: (value: string) => void
  readonly type?: string
  readonly placeholder?: string
  readonly autoComplete?: string
  readonly inputMode?: 'text' | 'email' | 'tel' | 'numeric'
  readonly maxLength?: number
}

export function TextField({
  value,
  onChange,
  type = 'text',
  placeholder,
  autoComplete,
  inputMode,
  maxLength,
  ...shell
}: TextFieldProps) {
  return (
    <FieldShell {...shell}>
      <input
        id={shell.id}
        name={shell.id}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        aria-invalid={shell.error ? true : undefined}
        aria-describedby={shell.error ? `${shell.id}-error` : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={cn(CONTROL, shell.error ? 'border-coral' : 'border-line')}
      />
    </FieldShell>
  )
}

interface SelectFieldProps extends FieldProps {
  readonly value: string
  readonly onChange: (value: string) => void
  readonly options: ReadonlyArray<{ value: string; label: string }>
  readonly placeholder?: string
  readonly autoComplete?: string
}

export function SelectField({
  value,
  onChange,
  options,
  placeholder = 'Select…',
  autoComplete,
  ...shell
}: SelectFieldProps) {
  return (
    <FieldShell {...shell}>
      <select
        id={shell.id}
        name={shell.id}
        value={value}
        autoComplete={autoComplete}
        aria-invalid={shell.error ? true : undefined}
        aria-describedby={shell.error ? `${shell.id}-error` : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={cn(CONTROL, shell.error ? 'border-coral' : 'border-line')}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  )
}

interface TextAreaFieldProps extends FieldProps {
  readonly value: string
  readonly onChange: (value: string) => void
  readonly placeholder?: string
  readonly rows?: number
}

export function TextAreaField({
  value,
  onChange,
  placeholder,
  rows = 4,
  ...shell
}: TextAreaFieldProps) {
  return (
    <FieldShell {...shell}>
      <textarea
        id={shell.id}
        name={shell.id}
        value={value}
        rows={rows}
        placeholder={placeholder}
        aria-invalid={shell.error ? true : undefined}
        aria-describedby={shell.error ? `${shell.id}-error` : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={cn(CONTROL, 'resize-y', shell.error ? 'border-coral' : 'border-line')}
      />
    </FieldShell>
  )
}

export function CheckboxField({
  id,
  checked,
  onChange,
  error,
  children,
}: {
  readonly id: string
  readonly checked: boolean
  readonly onChange: (checked: boolean) => void
  readonly error?: string
  readonly children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className={cn(
          'flex cursor-pointer items-start gap-3 rounded-2xl border-2 bg-white p-4 transition-colors',
          error ? 'border-coral' : checked ? 'border-ink bg-blue-soft' : 'border-line hover:border-ink'
        )}
      >
        <input
          id={id}
          name={id}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--color-blue)]"
        />
        <span className="text-[0.85rem] leading-relaxed">{children}</span>
      </label>
      {error ? <FieldError id={`${id}-error`} message={error} /> : null}
    </div>
  )
}
