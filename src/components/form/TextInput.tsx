import { forwardRef, useState, useId } from "react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "../../lib/utils"

export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label teks yang ditampilkan di atas input */
  label?: string
  /** Pesan error — jika diisi, komponen masuk ke state error */
  error?: string
  /** Teks bantuan di bawah input (tampil saat ada error) */
  helperText?: string
}

/**
 * TextInput
 *
 * Komponen input teks satu baris reusable untuk aplikasi AlurKerja.
 * Mendukung state: default, focus, error, disabled, readonly, dan password.
 *
 * @example
 * // Default
 * <TextInput label="Nama" placeholder="Masukkan nama" value={val} onChange={e => setVal(e.target.value)} />
 *
 * @example
 * // Error
 * <TextInput label="Email" error="Email tidak valid" helperText="Gunakan format email yang benar" value={val} onChange={e => setVal(e.target.value)} />
 *
 * @example
 * // Disabled
 * <TextInput label="Username" disabled value="johndoe" onChange={() => {}} />
 *
 * @example
 * // Readonly
 * <TextInput label="ID" readOnly value="USR-001" onChange={() => {}} />
 *
 * @example
 * // Password
 * <TextInput label="Kata Sandi" type="password" value={val} onChange={e => setVal(e.target.value)} />
 */
const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      error,
      helperText,
      type = "text",
      id,
      name,
      disabled,
      readOnly,
      className,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const inputId = id || name || generatedId
    const errorId = `${inputId}-error`
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === "password"
    const inputType = isPassword ? (showPassword ? "text" : "password") : type

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium leading-none text-[var(--text-h)]"
          >
            {label}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            name={name}
            type={inputType}
            disabled={disabled}
            readOnly={readOnly}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              // base
              "flex h-10 w-full rounded-md border px-3 py-2 text-sm transition-colors",
              "outline-none",
              // default state
              "border-[var(--border)] bg-[var(--bg)] text-[var(--text-h)]",
              "placeholder:text-[var(--text)]",
              // focus
              "focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-0 focus-visible:border-[var(--accent)]",
              // error
              error && "border-red-500 focus-visible:ring-red-400",
              // disabled
              disabled && "opacity-50 cursor-not-allowed bg-[var(--code-bg)]",
              // readonly
              readOnly && "bg-[var(--code-bg)] cursor-default",
              // password padding right
              isPassword && "pr-10",
              className
            )}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text)] hover:text-[var(--text-h)] transition-colors"
              aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}
        </div>

        {error && (
          <p id={errorId} className="text-sm text-red-500">
            {helperText || error}
          </p>
        )}
      </div>
    )
  }
)

TextInput.displayName = "TextInput"

export { TextInput }
