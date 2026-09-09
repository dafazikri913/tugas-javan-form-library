import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { DayPicker } from "react-day-picker"
import { format } from "date-fns"
import { id as localeId } from "date-fns/locale"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "../../lib/utils"

export interface DatePickerProps {
  /** Nilai tanggal yang dipilih */
  value?: Date | null
  /** Callback saat tanggal berubah */
  onChange: (date: Date | null) => void
  /** Teks placeholder saat belum ada tanggal */
  placeholder?: string
  /** Label di atas date picker */
  label?: string
  /** Nonaktifkan komponen */
  disabled?: boolean
  /** Mode readonly — tampilkan nilai tapi tidak bisa diubah */
  readOnly?: boolean
  /** Pesan error */
  error?: string
  /** Teks bantuan di bawah date picker */
  helperText?: string
  /** Tanggal minimum yang bisa dipilih */
  minDate?: Date
  /** Tanggal maksimum yang bisa dipilih */
  maxDate?: Date
  /** Id unik komponen */
  id?: string
}

/**
 * DatePicker
 *
 * Komponen pemilih tanggal reusable menggunakan Popover + Calendar.
 * Mendukung state: default, error, disabled, readonly, dengan batasan minDate/maxDate.
 *
 * @example
 * // Default
 * const [date, setDate] = useState<Date | null>(null)
 * <DatePicker value={date} onChange={setDate} label="Tanggal Lahir" placeholder="Pilih tanggal" />
 *
 * @example
 * // Error
 * <DatePicker value={date} onChange={setDate} label="Tanggal Mulai" error="Tanggal wajib diisi" />
 *
 * @example
 * // Disabled
 * <DatePicker value={new Date()} onChange={() => {}} label="Tanggal Dibuat" disabled />
 *
 * @example
 * // Readonly
 * <DatePicker value={new Date()} onChange={() => {}} label="Tanggal Terakhir" readOnly />
 *
 * @example
 * // Dengan minDate dan maxDate
 * <DatePicker
 *   value={date}
 *   onChange={setDate}
 *   label="Jadwal"
 *   minDate={new Date()}
 *   maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
 * />
 */
export function DatePicker({
  value,
  onChange,
  placeholder = "Pilih tanggal",
  label,
  disabled,
  readOnly,
  error,
  helperText,
  minDate,
  maxDate,
  id,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const generatedId = React.useId()
  const pickerId = id || generatedId
  const errorId = `${pickerId}-error`

  const canOpen = !disabled && !readOnly

  const handleSelect = (date: Date | undefined) => {
    onChange(date ?? null)
    setOpen(false)
  }

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={pickerId}
          className="text-sm font-medium leading-none text-[var(--text-h)]"
        >
          {label}
        </label>
      )}

      <PopoverPrimitive.Root open={open} onOpenChange={canOpen ? setOpen : undefined}>
        <PopoverPrimitive.Trigger asChild>
          <button
            id={pickerId}
            type="button"
            disabled={disabled}
            aria-label={label || placeholder}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={error ? errorId : undefined}
            aria-disabled={disabled}
            onClick={() => {
              if (canOpen) setOpen((v) => !v)
            }}
            className={cn(
              "flex h-10 w-full items-center gap-2 rounded-md border px-3 py-2",
              "text-sm text-left transition-colors outline-none",
              // default
              "border-[var(--border)] bg-[var(--bg)]",
              // focus
              "focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:border-[var(--accent)]",
              // error
              error && "border-red-500 focus-visible:ring-red-400",
              // disabled
              disabled && "opacity-50 cursor-not-allowed",
              // readonly
              readOnly && "bg-[var(--code-bg)] cursor-default"
            )}
          >
            {readOnly ? (
              <CalendarIcon className="h-4 w-4 text-[var(--text)] shrink-0 opacity-40" />
            ) : (
              <CalendarIcon className="h-4 w-4 text-[var(--text)] shrink-0" />
            )}
            <span className={cn(value ? "text-[var(--text-h)]" : "text-[var(--text)]")}>
              {value ? format(value, "dd/MM/yyyy") : placeholder}
            </span>
          </button>
        </PopoverPrimitive.Trigger>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            align="start"
            sideOffset={4}
            className={cn(
              "z-50 rounded-md border border-[var(--border)] bg-[var(--bg)]",
              "shadow-[var(--shadow)] p-3",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
            )}
          >
            <DayPicker
              mode="single"
              selected={value ?? undefined}
              onSelect={handleSelect}
              locale={localeId}
              disabled={[
                ...(minDate ? [{ before: minDate }] : []),
                ...(maxDate ? [{ after: maxDate }] : []),
              ]}
              classNames={{
                root: "text-sm",
                months: "flex flex-col",
                month: "space-y-2",
                caption: "flex justify-center items-center relative mb-1",
                caption_label: "text-sm font-medium text-[var(--text-h)]",
                nav: "flex items-center gap-1",
                nav_button_previous: "absolute left-0",
                nav_button_next: "absolute right-0",
                table: "w-full border-collapse",
                head_row: "flex",
                head_cell:
                  "text-[var(--text)] rounded-md w-9 font-normal text-[0.8rem] flex items-center justify-center",
                row: "flex w-full mt-1",
                cell: cn(
                  "h-9 w-9 text-center text-sm relative",
                  "focus-within:relative focus-within:z-20"
                ),
                day: cn(
                  "h-9 w-9 p-0 font-normal rounded-md",
                  "flex items-center justify-center",
                  "hover:bg-[var(--accent-bg)] hover:text-[var(--text-h)]",
                  "focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                ),
                day_selected:
                  "bg-[var(--accent)] text-white hover:bg-[var(--accent)] hover:text-white",
                day_today: "border border-[var(--accent)] text-[var(--accent)]",
                day_outside: "opacity-30",
                day_disabled: "opacity-30 cursor-not-allowed hover:bg-transparent",
              }}
              components={{
                PreviousMonthButton: (props) => (
                  <button
                    {...props}
                    className="h-7 w-7 flex items-center justify-center rounded-md border border-[var(--border)] hover:bg-[var(--accent-bg)] transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4 text-[var(--text)]" />
                  </button>
                ),
                NextMonthButton: (props) => (
                  <button
                    {...props}
                    className="h-7 w-7 flex items-center justify-center rounded-md border border-[var(--border)] hover:bg-[var(--accent-bg)] transition-colors"
                  >
                    <ChevronRight className="h-4 w-4 text-[var(--text)]" />
                  </button>
                ),
              }}
            />
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>

      {error && (
        <p id={errorId} className="text-sm text-red-500">
          {helperText || error}
        </p>
      )}
    </div>
  )
}
