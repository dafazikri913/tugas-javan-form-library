# Form Component Library — AlurKerja

Pustaka komponen form **reusable** untuk aplikasi AlurKerja, dibangun dengan **ReactJS**, **Tailwind CSS v4**, dan **Radix UI primitives** (mengikuti pola shadcn/ui).

---

## Cara Menjalankan

```bash
npm install
npm run dev
```

Buka [http://localhost:5173](http://localhost:5173) untuk melihat halaman demo interaktif.

---

## Tech Stack

| Teknologi | Versi | Peran |
|---|---|---|
| React | 19 | UI framework |
| TypeScript | 6 | Type safety |
| Tailwind CSS | v4 | Utility-first styling |
| Radix UI | latest | Accessible primitives (Select, Popover) |
| react-day-picker | v9 | Kalender untuk DatePicker |
| lucide-react | latest | Icon set |
| clsx + tailwind-merge | latest | Utility `cn()` untuk class merging |

---

## Struktur File

```
src/
├── lib/
│   └── utils.ts                  # cn() helper
└── components/form/
    ├── TextInput.tsx              # Komponen 1
    ├── Select.tsx                 # Komponen 2
    ├── DatePicker.tsx             # Komponen 3
    └── index.ts                   # Re-export semua komponen
```

---

## Komponen

### 1. TextInput

**Deskripsi**
Komponen input teks satu baris yang dapat digunakan kembali di seluruh aplikasi. Mendukung semua state form yang umum: default, fokus, error/validasi, disabled, readonly, dan mode password dengan tombol toggle visibilitas.

**Props**

| Prop | Tipe | Default | Keterangan |
|---|---|---|---|
| `value` | `string` | — | Nilai input (controlled) |
| `onChange` | `(e: ChangeEvent) => void` | — | Handler perubahan nilai |
| `label` | `string` | — | Teks label yang tampil di atas input |
| `placeholder` | `string` | — | Teks placeholder input |
| `type` | `string` | `"text"` | Tipe HTML input; gunakan `"password"` untuk aktifkan toggle |
| `error` | `string` | — | Pesan error; mengaktifkan visual state error |
| `helperText` | `string` | — | Teks keterangan di bawah input saat error |
| `disabled` | `boolean` | `false` | Menonaktifkan semua interaksi |
| `readOnly` | `boolean` | `false` | Mencegah pengeditan, masih bisa difokus dan diseleksi |
| `id` | `string` | — | Id elemen; jika kosong, fallback ke `name` |
| `name` | `string` | — | Atribut `name` HTML input |

> Komponen ini meneruskan semua props HTML `<input>` standar (`autoComplete`, `maxLength`, dll.) via `...props`.

**Varian State**

| State | Trigger | Tampilan |
|---|---|---|
| Default | — | Border abu, background putih |
| Focus | Keyboard / klik | Ring ungu (`--accent`) di sekeliling input |
| Error | `error` prop diisi | Border merah, helper text merah di bawah |
| Disabled | `disabled={true}` | Opacity 50%, kursor `not-allowed`, background abu |
| Read Only | `readOnly={true}` | Background abu muda, kursor default, fokus diizinkan |
| Password | `type="password"` | Ikon Eye/EyeOff di sisi kanan untuk toggle visibilitas |

**Contoh Pemakaian**

```tsx
import { TextInput } from "./components/form/TextInput"

// Default
const [name, setName] = useState("")
<TextInput
  label="Nama Lengkap"
  placeholder="Masukkan nama lengkap"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

// Error / Validasi
<TextInput
  label="Alamat Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error="Format email tidak valid"
  helperText="Contoh: nama@domain.com"
/>

// Disabled
<TextInput
  label="Username"
  value="johndoe_2024"
  disabled
  onChange={() => {}}
/>

// Read Only
<TextInput
  label="ID Karyawan"
  value="EMP-00142"
  readOnly
  onChange={() => {}}
/>

// Password dengan toggle visibilitas
<TextInput
  label="Kata Sandi"
  type="password"
  placeholder="Masukkan kata sandi"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>
```

---

### 2. Select

**Deskripsi**
Komponen dropdown untuk memilih satu nilai dari daftar opsi. Dibangun di atas `@radix-ui/react-select` sehingga keyboard navigation (Arrow Up/Down, Enter, Escape) dan ARIA attributes sudah tersedia secara bawaan. Menampilkan pesan "Tidak ada opsi tersedia" saat array `options` kosong.

**Props**

| Prop | Tipe | Default | Keterangan |
|---|---|---|---|
| `value` | `string` | — | Nilai yang sedang dipilih (controlled) |
| `onValueChange` | `(value: string) => void` | **wajib** | Callback dipanggil saat user memilih opsi |
| `options` | `{ value: string; label: string }[]` | **wajib** | Daftar opsi yang ditampilkan |
| `placeholder` | `string` | `"Pilih..."` | Teks trigger saat belum ada pilihan |
| `label` | `string` | — | Teks label di atas select |
| `disabled` | `boolean` | `false` | Menonaktifkan dan menutup akses ke dropdown |
| `error` | `string` | — | Pesan error; mengaktifkan visual state error |
| `helperText` | `string` | — | Teks keterangan di bawah select saat error |
| `id` | `string` | — | Id elemen trigger |

**Varian State**

| State | Trigger | Tampilan |
|---|---|---|
| Default (kosong) | Belum ada pilihan | Teks placeholder abu-abu |
| Default (terpilih) | Setelah memilih | Label opsi dipilih + checkmark |
| Error | `error` prop diisi | Border merah pada trigger, helper text merah |
| Disabled | `disabled={true}` | Opacity 50%, kursor `not-allowed`, dropdown tidak bisa dibuka |

**Contoh Pemakaian**

```tsx
import { Select } from "./components/form/Select"

const options = [
  { value: "fe", label: "Frontend Engineer" },
  { value: "be", label: "Backend Engineer" },
  { value: "ds", label: "Data Scientist" },
]

// Default
const [job, setJob] = useState("")
<Select
  label="Posisi"
  value={job}
  onValueChange={setJob}
  options={options}
  placeholder="Pilih posisi..."
/>

// Error / Validasi
<Select
  label="Divisi"
  value=""
  onValueChange={() => {}}
  options={options}
  error="Divisi wajib dipilih"
  helperText="Silakan pilih divisi Anda"
/>

// Disabled
<Select
  label="Departemen"
  value="fe"
  onValueChange={() => {}}
  options={options}
  disabled
/>
```

---

### 3. DatePicker

**Deskripsi**
Komponen pemilih tanggal menggunakan kalender popup. Trigger berupa tombol yang membuka `Popover` berisi `DayPicker` (react-day-picker). Mendukung format tampilan `dd/MM/yyyy`, locale Indonesia, dan pembatasan rentang tanggal via `minDate`/`maxDate`.

**Props**

| Prop | Tipe | Default | Keterangan |
|---|---|---|---|
| `value` | `Date \| null` | — | Tanggal yang dipilih (controlled) |
| `onChange` | `(date: Date \| null) => void` | **wajib** | Callback saat tanggal dipilih |
| `placeholder` | `string` | `"Pilih tanggal"` | Teks trigger saat belum ada tanggal |
| `label` | `string` | — | Teks label di atas picker |
| `disabled` | `boolean` | `false` | Menonaktifkan interaksi, mencegah popup kalender terbuka |
| `readOnly` | `boolean` | `false` | Tampilkan nilai tapi tidak bisa diubah; ikon kalender dimute |
| `error` | `string` | — | Pesan error; mengaktifkan visual state error |
| `helperText` | `string` | — | Teks keterangan di bawah picker saat error |
| `minDate` | `Date` | — | Tanggal paling awal yang bisa dipilih |
| `maxDate` | `Date` | — | Tanggal paling akhir yang bisa dipilih |
| `id` | `string` | — | Id elemen trigger |

**Varian State**

| State | Trigger | Tampilan |
|---|---|---|
| Default (kosong) | Belum ada tanggal | Teks placeholder abu + ikon kalender |
| Default (terpilih) | Setelah memilih | Tanggal format `dd/MM/yyyy` |
| Error | `error` prop diisi | Border merah, helper text merah |
| Disabled | `disabled={true}` | Opacity 50%, kursor `not-allowed`, popup tidak bisa dibuka |
| Read Only | `readOnly={true}` | Background abu, ikon kalender redup, popup tidak bisa dibuka |

**Contoh Pemakaian**

```tsx
import { DatePicker } from "./components/form/DatePicker"

const [date, setDate] = useState<Date | null>(null)

// Default
<DatePicker
  label="Tanggal Mulai"
  value={date}
  onChange={setDate}
  placeholder="Pilih tanggal mulai"
/>

// Error / Validasi
<DatePicker
  label="Tanggal Berakhir"
  value={null}
  onChange={() => {}}
  error="Tanggal wajib diisi"
  helperText="Silakan pilih tanggal berakhir"
/>

// Disabled
<DatePicker
  label="Tanggal Bergabung"
  value={new Date(2023, 0, 15)}
  onChange={() => {}}
  disabled
/>

// Read Only
<DatePicker
  label="Tanggal Lahir"
  value={new Date(1995, 5, 15)}
  onChange={() => {}}
  readOnly
/>

// Min & Max Date (contoh: hanya 30 hari ke depan)
<DatePicker
  label="Jadwal Interview"
  value={date}
  onChange={setDate}
  minDate={new Date()}
  maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
/>
```

---

## Konsistensi dengan Design System

Karena tidak ada referensi design system eksternal yang diberikan, pendekatan berikut digunakan sebagai fondasi:

### 1. CSS Custom Properties sebagai Design Tokens
Semua nilai visual (warna, border, shadow, background) didefinisikan sebagai CSS variable di `src/index.css`:

```css
--text          /* warna teks body */
--text-h        /* warna teks heading / konten utama */
--bg            /* background utama */
--bg-subtle     /* background card / area sekunder */
--border        /* warna border default */
--accent        /* warna brand / interaksi aktif */
--accent-bg     /* background tint aksen (hover, selected) */
```

Tidak ada nilai hex atau RGB yang ditulis langsung di dalam komponen — semua melalui variable ini. Efeknya: **dark mode otomatis** hanya dengan mengubah nilai variable di media query `prefers-color-scheme: dark`.

### 2. Radix UI sebagai Behavioral Primitives
`Select` menggunakan `@radix-ui/react-select` dan `DatePicker` menggunakan `@radix-ui/react-popover`. Ini memastikan:
- Keyboard navigation (Arrow, Enter, Escape, Tab) sudah benar tanpa implementasi manual
- ARIA roles dan attributes (`role="listbox"`, `aria-expanded`, dll.) ditangani otomatis
- Focus trapping saat popup terbuka

### 3. Utility `cn()` untuk Class Merging

```ts
// src/lib/utils.ts
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
```

Semua penggabungan kelas Tailwind menggunakan `cn()` sehingga kelas yang bertentangan diselesaikan dengan benar (misal: `border-gray-300` tidak bentrok dengan `border-red-500`).

### 4. Pola Komponen yang Konsisten
Ketiga komponen mengikuti pola yang sama:
- Props `label`, `error`, `helperText`, `disabled` dengan interface yang seragam
- Struktur DOM: wrapper `div` → label → input/trigger → helper text
- Aksesibilitas: `htmlFor`/`id` terhubung, `aria-invalid` + `aria-describedby` saat error, `aria-disabled` pada elemen kustom
- State visual menggunakan token yang sama (`--accent` untuk focus ring, merah untuk error)

---

## Aksesibilitas

| Fitur | Detail |
|---|---|
| Label association | `<label htmlFor>` terhubung ke `id` input di semua komponen |
| Error announcement | `aria-invalid="true"` + `aria-describedby` menunjuk ke elemen pesan error |
| Disabled state | `disabled` native pada `<input>`, `aria-disabled` pada trigger kustom |
| Keyboard nav | TextInput: Tab/Shift+Tab. Select: Arrow Up/Down, Enter, Escape. DatePicker: Arrow untuk navigasi kalender |
| Focus ring | Visible focus indicator (ring 2px) di semua elemen interaktif |
