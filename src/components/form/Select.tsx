import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { ChevronDown, Check } from "lucide-react"
import { cn } from "../../lib/utils"

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps {
  /** Nilai yang sedang dipilih */
  value?: string
  /** Callback saat nilai berubah */
  onValueChange: (value: string) => void
  /** Daftar opsi yang tersedia */
  options: SelectOption[]
  /** Teks placeholder saat belum ada pilihan */
  placeholder?: string
  /** Label di atas select */
  label?: string
  /** Nonaktifkan komponen */
  disabled?: boolean
  /** Pesan error — jika diisi, komponen masuk ke state error */
  error?: string
  /** Teks bantuan di bawah select */
  helperText?: string
  /** Id unik komponen */
  id?: string
}

/**
 * Select
 *
 * Komponen dropdown reusable untuk memilih satu nilai dari daftar opsi.
 * Mendukung state: default, error, disabled.
 *
 * @example
 * // Default
 * const [val, setVal] = useState("")
 * const opts = [{ value: "1", label: "Opsi 1" }, { value: "2", label: "Opsi 2" }]
 * <Select value={val} onValueChange={setVal} options={opts} placeholder="Pilih opsi" label="Kategori" />
 *
 * @example
 * // Error
 * <Select value={val} onValueChange={setVal} options={opts} error="Wajib dipilih" label="Status" />
 *
 * @example
 * // Disabled
 * <Select value="1" onValueChange={() => {}} options={opts} disabled label="Divisi" />
 */
export function Select({
  value,
  onValueChange,
  options,
  placeholder = "Pilih...",
  label,
  disabled,
  error,
  helperText,
  id,
}: SelectProps) {
  const generatedId = React.useId()
  const selectId = id || generatedId
  const errorId = `${selectId}-error`
  const labelId = `${selectId}-label`

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          id={labelId}
          htmlFor={selectId}
          className="text-sm font-medium leading-none text-[var(--text-h)]"
        >
          {label}
        </label>
      )}

      <SelectPrimitive.Root
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <SelectPrimitive.Trigger
          id={selectId}
          aria-labelledby={label ? labelId : undefined}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? errorId : undefined}
          aria-disabled={disabled}
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-md border px-3 py-2",
            "text-sm transition-colors outline-none",
            // default
            "border-[var(--border)] bg-[var(--bg)] text-[var(--text-h)]",
            // focus
            "focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)]",
            // error
            error && "border-red-500 focus:ring-red-400",
            // disabled
            disabled && "opacity-50 cursor-not-allowed",
            // placeholder color via data attribute
            "[&[data-placeholder]]:text-[var(--text)]"
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon asChild>
            <ChevronDown className="h-4 w-4 text-[var(--text)] shrink-0" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className={cn(
              "relative z-50 min-w-[8rem] overflow-hidden rounded-md border",
              "border-[var(--border)] bg-[var(--bg)]",
              "shadow-[var(--shadow)]",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
            )}
            position="popper"
            sideOffset={4}
          >
            <SelectPrimitive.Viewport className="p-1">
              {options.length === 0 ? (
                <div className="py-2 px-3 text-sm text-[var(--text)] text-center">
                  Tidak ada opsi tersedia
                </div>
              ) : (
                options.map((opt) => (
                  <SelectPrimitive.Item
                    key={opt.value}
                    value={opt.value}
                    className={cn(
                      "relative flex w-full cursor-pointer select-none items-center rounded-sm",
                      "py-1.5 pl-8 pr-3 text-sm text-[var(--text-h)] outline-none",
                      "focus:bg-[var(--accent-bg)] focus:text-[var(--text-h)]",
                      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                    )}
                  >
                    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                      <SelectPrimitive.ItemIndicator>
                        <Check className="h-4 w-4 text-[var(--accent)]" />
                      </SelectPrimitive.ItemIndicator>
                    </span>
                    <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
                  </SelectPrimitive.Item>
                ))
              )}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>

      {error && (
        <p id={errorId} className="text-sm text-red-500">
          {helperText || error}
        </p>
      )}
    </div>
  )
}
