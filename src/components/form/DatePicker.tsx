import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { DayPicker } from "react-day-picker"
import { format, setMonth, setYear, getMonth, getYear } from "date-fns"
import { id as localeId } from "date-fns/locale"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "../../lib/utils"

export interface DatePickerProps {
  value?: Date | null
  onChange: (date: Date | null) => void
  placeholder?: string
  label?: string
  disabled?: boolean
  readOnly?: boolean
  error?: string
  helperText?: string
  minDate?: Date
  maxDate?: Date
  id?: string
}

const MONTHS = [
  "Januari","Februari","Maret","April","Mei","Juni",
  "Juli","Agustus","September","Oktober","November","Desember",
]

function buildYears(minDate?: Date, maxDate?: Date): number[] {
  const currentYear = new Date().getFullYear()
  const from = minDate ? getYear(minDate) : currentYear - 100
  const to   = maxDate ? getYear(maxDate) : currentYear + 10
  const years: number[] = []
  for (let y = to; y >= from; y--) years.push(y)
  return years
}

/** Custom caption with month + year dropdowns */
function CalendarCaption({
  displayMonth,
  onMonthChange,
  minDate,
  maxDate,
}: {
  displayMonth: Date
  onMonthChange: (month: Date) => void
  minDate?: Date
  maxDate?: Date
}) {
  const years = buildYears(minDate, maxDate)
  const currentMonth = getMonth(displayMonth)
  const currentYear  = getYear(displayMonth)

  return (
    <div className="rdp-caption-custom">
      {/* Month dropdown */}
      <select
        value={currentMonth}
        onChange={e => onMonthChange(setMonth(displayMonth, Number(e.target.value)))}
        className="rdp-select"
        aria-label="Pilih bulan"
      >
        {MONTHS.map((m, i) => (
          <option key={m} value={i}>{m}</option>
        ))}
      </select>

      {/* Year dropdown */}
      <select
        value={currentYear}
        onChange={e => onMonthChange(setYear(displayMonth, Number(e.target.value)))}
        className="rdp-select"
        aria-label="Pilih tahun"
      >
        {years.map(y => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
    </div>
  )
}

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
  const [open, setOpen]         = React.useState(false)
  const [month, setMonth]       = React.useState<Date>(value ?? new Date())
  const generatedId             = React.useId()
  const pickerId                = id || generatedId
  const errorId                 = `${pickerId}-error`
  const canOpen                 = !disabled && !readOnly

  // Sync displayed month when value changes from outside
  React.useEffect(() => {
    if (value) setMonth(value)
  }, [value])

  const handleSelect = (date: Date | undefined) => {
    onChange(date ?? null)
    if (date) setOpen(false)
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

      <PopoverPrimitive.Root open={open} onOpenChange={v => canOpen && setOpen(v)}>
        <PopoverPrimitive.Trigger asChild>
          <button
            id={pickerId}
            type="button"
            disabled={disabled}
            aria-label={label || placeholder}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={error ? errorId : undefined}
            aria-disabled={disabled}
            className={cn(
              "flex h-10 w-full items-center gap-2 rounded-md border px-3 py-2",
              "text-sm text-left transition-colors outline-none",
              "border-[var(--border)] bg-[var(--bg)]",
              "focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:border-[var(--accent)]",
              error    && "border-red-500 focus-visible:ring-red-400",
              disabled && "opacity-50 cursor-not-allowed",
              readOnly && "bg-[var(--code-bg)] cursor-default"
            )}
          >
            <CalendarIcon
              className={cn(
                "h-4 w-4 shrink-0 text-[var(--text)]",
                readOnly && "opacity-40"
              )}
            />
            <span className={cn(value ? "text-[var(--text-h)]" : "text-[var(--text)]")}>
              {value ? format(value, "dd MMMM yyyy", { locale: localeId }) : placeholder}
            </span>
          </button>
        </PopoverPrimitive.Trigger>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            align="start"
            sideOffset={6}
            className={cn(
              "z-50 rounded-xl border border-[var(--border)] bg-[var(--bg)]",
              "shadow-[var(--shadow)] p-3 w-[300px]",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
            )}
          >
            <DayPicker
              mode="single"
              selected={value ?? undefined}
              onSelect={handleSelect}
              month={month}
              onMonthChange={setMonth}
              locale={localeId}
              showOutsideDays
              fixedWeeks
              disabled={[
                ...(minDate ? [{ before: minDate }] : []),
                ...(maxDate ? [{ after:  maxDate }] : []),
              ]}
              components={{
                /* Replace default caption with our dropdowns */
                MonthCaption: ({ calendarMonth }) => (
                  <CalendarCaption
                    displayMonth={calendarMonth.date}
                    onMonthChange={setMonth}
                    minDate={minDate}
                    maxDate={maxDate}
                  />
                ),
                /* Custom prev / next buttons */
                PreviousMonthButton: ({ onClick }) => (
                  <button
                    type="button"
                    onClick={onClick}
                    className="rdp-nav-btn"
                    aria-label="Bulan sebelumnya"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                ),
                NextMonthButton: ({ onClick }) => (
                  <button
                    type="button"
                    onClick={onClick}
                    className="rdp-nav-btn"
                    aria-label="Bulan berikutnya"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                ),
              }}
              classNames={{
                months:      "flex flex-col",
                month:       "w-full",
                month_grid:  "w-full border-collapse mt-2",
                weekdays:    "flex",
                weekday:     "rdp-weekday",
                week:        "flex w-full",
                day:         "rdp-day",
                day_button:  "rdp-day-btn",
                selected:    "rdp-day--selected",
                today:       "rdp-day--today",
                outside:     "rdp-day--outside",
                disabled:    "rdp-day--disabled",
                range_start: "rdp-day--selected",
                range_end:   "rdp-day--selected",
                hidden:      "invisible",
                nav:         "rdp-nav",
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