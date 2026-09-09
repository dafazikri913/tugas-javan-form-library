# Requirements Document

## Introduction

Pustaka komponen form reusable untuk aplikasi **AlurKerja** adalah sekumpulan komponen antarmuka pengguna yang konsisten, aksesibel, dan dapat digunakan kembali di seluruh aplikasi. Pustaka ini mencakup tiga jenis komponen form utama: **Text Input**, **Select**, dan **Date Picker**. Setiap komponen dibangun di atas shadcn/ui sebagai design system, dikombinasikan dengan TailwindCSS untuk styling dan ReactJS sebagai framework UI. Setiap komponen mendukung minimal dua varian state: default, error/validasi, disabled, atau readonly.

---

## Glossary

- **AlurKerja**: Nama aplikasi utama yang menggunakan pustaka komponen form ini.
- **TextInput**: Komponen form untuk masukan teks satu baris.
- **Select**: Komponen form untuk memilih satu nilai dari daftar opsi.
- **DatePicker**: Komponen form untuk memilih tanggal dari kalender.
- **Design_System**: Sistem desain berbasis shadcn/ui yang menjadi acuan visual dan perilaku komponen.
- **Props**: Parameter yang diterima komponen React dari komponen induknya.
- **State**: Kondisi tampilan komponen (default, error, disabled, readonly).
- **Validator**: Mekanisme validasi yang memeriksa nilai input dan menghasilkan pesan error.
- **Consumer**: Komponen React yang menggunakan komponen dari pustaka ini.
- **Token_Desain**: Nilai desain (warna, ukuran, jarak) yang bersumber dari konfigurasi TailwindCSS dan shadcn/ui.

---

## Requirements

### Persyaratan 1: Komponen TextInput

**User Story:** Sebagai developer AlurKerja, saya ingin menggunakan komponen TextInput yang reusable, agar saya dapat memasukkan teks satu baris secara konsisten di seluruh aplikasi.

#### Kriteria Penerimaan

1. THE TextInput SHALL menerima props `value`, `onChange`, `placeholder`, `label`, `id`, `name`, `disabled`, `readOnly`, `error`, dan `helperText`, di mana `value` bertipe string dengan panjang maksimum 1000 karakter, `onChange` adalah callback yang menerima nilai string terbaru, `placeholder` dan `label` bertipe string dengan panjang maksimum 100 karakter, serta `id` dan `name` bertipe string dengan panjang maksimum 100 karakter.
2. WHEN prop `disabled` bernilai `true`, THE TextInput SHALL menonaktifkan semua interaksi pengguna (klik, fokus keyboard, dan input teks) dan menampilkan visual state disabled sesuai Token_Desain.
3. WHEN prop `readOnly` bernilai `true`, THE TextInput SHALL mencegah pengeditan nilai melalui keyboard maupun paste, tetapi tetap mengizinkan fokus dan seleksi teks, serta menampilkan visual state readonly sesuai Token_Desain.
4. WHEN prop `error` berisi string dengan panjang satu karakter atau lebih, THE TextInput SHALL menampilkan border berwarna error sesuai Token_Desain dan menampilkan teks `helperText` di bawah input dalam satu baris dengan tinggi maksimum satu baris teks.
5. IF prop `id` tidak disertakan atau bernilai string kosong, THEN THE TextInput SHALL menggunakan nilai `name` sebagai nilai atribut `id` elemen input, sehingga elemen `label` dengan atribut `for` yang merujuk ke `name` tetap terhubung secara aksesibel.
6. THE TextInput SHALL menerapkan Token_Desain dari Design_System untuk warna, ukuran font, border-radius, dan spacing pada semua state (default, focused, disabled, readOnly, error), sehingga tidak ada state yang menggunakan nilai di luar Token_Desain.
7. WHERE prop `type` disertakan dengan nilai `"password"`, THE TextInput SHALL menampilkan tombol toggle visibilitas kata sandi di sisi kanan input.
8. WHEN tombol toggle visibilitas kata sandi ditekan saat `type` adalah `"password"`, THE TextInput SHALL mengubah tipe input antara `"password"` dan `"text"` sehingga karakter kata sandi dapat ditampilkan atau disembunyikan, dan tombol toggle SHALL menampilkan label atau ikon yang mencerminkan state visibilitas saat ini.
9. IF prop `label` disertakan, THEN THE TextInput SHALL merender elemen label yang terhubung secara programatik ke elemen input melalui atribut `for`/`htmlFor` yang merujuk ke nilai `id` atau `name`, sehingga klik pada label memindahkan fokus ke input.

---

### Persyaratan 2: Varian State TextInput

**User Story:** Sebagai developer AlurKerja, saya ingin TextInput memiliki varian state visual yang jelas, agar pengguna dapat memahami kondisi input dengan mudah.

#### Kriteria Penerimaan

1. WHEN TextInput berada dalam state default, THE TextInput SHALL menampilkan border menggunakan token `border-input` dan background menggunakan token `bg-background` dari Design_System.
2. WHEN TextInput mendapatkan fokus dari pengguna, THE TextInput SHALL menampilkan ring fokus dengan lebar minimal 2px menggunakan token `focus-visible:ring` dari Design_System, dan ring fokus tersebut hanya muncul saat navigasi keyboard (bukan klik mouse).
3. IF prop `error` berisi string dengan panjang 1 hingga 255 karakter, THEN THE TextInput SHALL menampilkan border menggunakan token `border-destructive`, merender teks helper di bawah elemen input menggunakan token `text-destructive`, dan menambahkan atribut `aria-invalid="true"` pada elemen input.
4. IF prop `error` bernilai string kosong atau tidak didefinisikan, THEN THE TextInput SHALL tidak menampilkan border `border-destructive` maupun teks helper error.
5. WHILE prop `disabled` bernilai `true`, THE TextInput SHALL menampilkan opacity 50%, menerapkan kursor `cursor-not-allowed` pada elemen input, dan mencegah seluruh interaksi pengguna termasuk fokus keyboard dan input teks.
6. WHILE prop `readOnly` bernilai `true`, THE TextInput SHALL menampilkan background menggunakan token `bg-muted`, mengizinkan fokus keyboard, dan mencegah modifikasi nilai input oleh pengguna.

---

### Persyaratan 3: Dokumentasi TextInput

**User Story:** Sebagai developer AlurKerja, saya ingin dokumentasi komponen TextInput tersedia, agar saya dapat memahami cara penggunaannya tanpa membaca source code.

#### Kriteria Penerimaan

1. THE TextInput SHALL memiliki dokumentasi yang mencantumkan nama komponen, deskripsi singkat maksimal 200 karakter, dan tabel Props yang mendokumentasikan semua props yang diekspor dengan kolom: nama, tipe, default, dan keterangan.
2. THE TextInput SHALL memiliki contoh kode penggunaan yang dapat disalin dan dijalankan tanpa modifikasi untuk setiap state berikut: default, error, disabled, dan readonly; di mana setiap contoh menampilkan output visual yang berbeda sesuai state-nya.
3. THE TextInput SHALL memiliki dua contoh kode penggunaan untuk state `type="password"`: satu menampilkan state kata sandi tersembunyi dan satu menampilkan state kata sandi terlihat, sehingga perilaku toggle dapat diverifikasi secara objektif.
4. THE TextInput SHALL memiliki dokumentasi yang dapat dirender dalam waktu tidak lebih dari 3 detik pada kondisi jaringan normal.

---

### Persyaratan 4: Komponen Select

**User Story:** Sebagai developer AlurKerja, saya ingin menggunakan komponen Select yang reusable, agar pengguna dapat memilih satu nilai dari daftar opsi secara konsisten.

#### Kriteria Penerimaan

1. THE Select SHALL menerima props `value`, `onValueChange`, `options`, `placeholder`, `label`, `disabled`, `error`, dan `helperText`, di mana `options` dan `onValueChange` bersifat wajib sedangkan props lainnya bersifat opsional.
2. THE Select SHALL menerima prop `options` berupa array of object dengan struktur `{ value: string; label: string }`, di mana nilai `value` pada setiap item harus unik dalam array tersebut.
3. WHEN prop `disabled` bernilai `true`, THE Select SHALL menonaktifkan dropdown sehingga dropdown tidak dapat dibuka dan menampilkan visual state disabled sesuai Token_Desain.
4. WHEN prop `error` berisi string tidak kosong, THE Select SHALL menampilkan border berwarna error pada trigger dan menampilkan teks `helperText` di bawah Select, di mana konten teks helper adalah nilai dari prop `error` itu sendiri.
5. WHEN pengguna membuka dropdown, THE Select SHALL menampilkan daftar seluruh opsi yang tersedia dalam prop `options` dengan urutan yang sama seperti urutan array, di mana setiap `label` ditampilkan sebagai teks yang terlihat.
6. WHEN pengguna memilih satu opsi, THE Select SHALL memanggil callback `onValueChange` dengan nilai `value` dari opsi yang dipilih dan menutup dropdown setelah pemilihan.
7. IF prop `options` berupa array kosong, THEN THE Select SHALL menampilkan pesan "Tidak ada opsi tersedia" di dalam dropdown dan tidak memanggil `onValueChange`.
8. WHEN prop `value` sesuai dengan salah satu nilai dalam `options`, THE Select SHALL menampilkan `label` dari opsi yang sesuai pada elemen trigger.
9. WHEN prop `value` tidak diset atau tidak sesuai dengan nilai manapun dalam `options`, THE Select SHALL menampilkan teks `placeholder` pada elemen trigger.
10. THE Select SHALL menerapkan Token_Desain dari Design_System untuk seluruh elemen visual (trigger, dropdown, item) pada semua state: default, hover, focus, disabled, dan error.

---

### Persyaratan 5: Varian State Select

**User Story:** Sebagai developer AlurKerja, saya ingin Select memiliki varian state visual yang jelas, agar pengguna dapat memahami kondisi Select dengan mudah.

#### Kriteria Penerimaan

1. WHEN Select berada dalam state default tanpa nilai terpilih, THE Select SHALL menampilkan teks `placeholder` dengan warna `text-muted-foreground`.
2. WHEN Select berada dalam state default dengan nilai terpilih, THE Select SHALL menampilkan label opsi yang dipilih dengan warna `text-foreground`.
3. IF prop `error` berisi string tidak kosong, THEN THE Select SHALL menampilkan border trigger dengan warna `border-destructive`, menampilkan teks helper di bawah trigger yang isinya sama dengan nilai prop `error`, dan mewarnai teks helper tersebut dengan warna `text-destructive`.
4. WHILE prop `disabled` bernilai `true`, THE Select SHALL menampilkan opacity 50% dan kursor `cursor-not-allowed` pada elemen trigger.
5. WHILE prop `disabled` bernilai `true`, IF pengguna mengklik atau berinteraksi dengan elemen trigger, THEN THE Select SHALL tidak membuka dropdown dan tidak mengubah nilai yang terpilih.

---

### Persyaratan 6: Dokumentasi Select

**User Story:** Sebagai developer AlurKerja, saya ingin dokumentasi komponen Select tersedia, agar saya dapat memahami cara penggunaannya tanpa membaca source code.

#### Kriteria Penerimaan

1. THE Select SHALL memiliki dokumentasi yang mencantumkan nama komponen, deskripsi fungsi komponen dalam tidak lebih dari 2 kalimat, dan tabel Props yang mendokumentasikan seluruh props publik komponen dengan kolom: nama, tipe data, nilai default, dan keterangan.
2. THE Select SHALL memiliki contoh kode untuk setiap state berikut: default (tanpa props tambahan), error (dengan prop penanda error aktif), dan disabled (dengan prop disabled aktif), di mana setiap contoh kode harus berdiri sendiri dan dapat dijalankan tanpa dependensi di luar komponen Select itu sendiri.
3. THE Select SHALL memiliki contoh kode yang menunjukkan pendefinisian array `options` dengan setidaknya dua item, di mana setiap item menampilkan seluruh field yang wajib diisi, serta sebuah handler `onValueChange` yang menunjukkan tipe parameter nilai yang diterima.

---

### Persyaratan 7: Komponen DatePicker

**User Story:** Sebagai developer AlurKerja, saya ingin menggunakan komponen DatePicker yang reusable, agar pengguna dapat memilih tanggal melalui kalender secara konsisten.

#### Kriteria Penerimaan

1. THE DatePicker SHALL menerima props `value` (bertipe `Date | null`), `onChange` (callback yang menerima `Date | null`), `placeholder` (string maksimum 100 karakter), `label` (string maksimum 200 karakter), `disabled` (boolean), `readOnly` (boolean), `error` (string), `helperText` (string), `minDate` (Date), dan `maxDate` (Date).
2. WHEN pengguna mengklik trigger DatePicker, THE DatePicker SHALL menampilkan panel kalender di dalam Popover sesuai komponen Design_System dalam waktu kurang dari 300ms.
3. WHEN pengguna memilih tanggal dari kalender, THE DatePicker SHALL memanggil callback `onChange` dengan objek `Date` yang dipilih dan menutup panel kalender dalam waktu kurang dari 300ms setelah pemilihan.
4. WHEN prop `value` berisi objek `Date` yang valid, THE DatePicker SHALL menampilkan tanggal dalam format `dd/MM/yyyy` pada trigger.
5. WHEN prop `value` bernilai `null` atau tidak diset, THE DatePicker SHALL menampilkan teks `placeholder` atau string kosong pada trigger.
6. WHEN prop `minDate` atau `maxDate` disertakan, THE DatePicker SHALL menonaktifkan (tidak dapat dipilih oleh pengguna) tanggal di luar rentang tersebut pada panel kalender.
7. IF prop `minDate` lebih besar dari `maxDate`, THEN THE DatePicker SHALL tidak membuka panel kalender dan memanggil `onChange` dengan nilai `null`.
8. IF prop `error` berisi string tidak kosong, THEN THE DatePicker SHALL menampilkan border trigger berwarna error dan menampilkan teks `helperText` di bawah DatePicker.
9. WHEN prop `disabled` bernilai `true`, THE DatePicker SHALL menonaktifkan interaksi dan mencegah pembukaan panel kalender, serta menampilkan visual state disabled sesuai Token_Desain.
10. WHILE prop `readOnly` bernilai `true`, THE DatePicker SHALL menampilkan nilai tanggal namun mencegah pembukaan panel kalender ketika trigger diklik.
11. THE DatePicker SHALL menerapkan Token_Desain dari Design_System untuk seluruh elemen visual pada semua state.

---

### Persyaratan 8: Varian State DatePicker

**User Story:** Sebagai developer AlurKerja, saya ingin DatePicker memiliki varian state visual yang jelas, agar pengguna dapat memahami kondisi DatePicker dengan mudah.

#### Kriteria Penerimaan

1. WHEN DatePicker berada dalam state default tanpa nilai, THE DatePicker SHALL menampilkan teks `placeholder` dengan warna `text-muted-foreground` dan ikon kalender.
2. WHEN DatePicker berada dalam state default dengan nilai terpilih, THE DatePicker SHALL menampilkan tanggal yang diformat dalam `dd/MM/yyyy` dengan warna `text-foreground`.
3. IF prop `error` berisi string tidak kosong, THEN THE DatePicker SHALL menampilkan border trigger `border-destructive` dan teks helper berwarna `text-destructive`; jika prop `error` bernilai string kosong atau tidak diset, THE DatePicker SHALL tidak menampilkan border error maupun teks helper error.
4. WHILE prop `disabled` bernilai `true`, THE DatePicker SHALL menampilkan opacity 50% dan kursor `cursor-not-allowed` pada elemen trigger.
5. WHILE prop `readOnly` bernilai `true`, THE DatePicker SHALL menampilkan background `bg-muted` pada trigger dan mengganti ikon kalender interaktif dengan ikon non-interaktif, serta tidak membuka panel kalender saat trigger diklik.
6. WHILE prop `disabled` bernilai `true`, IF pengguna mengklik elemen trigger, THEN THE DatePicker SHALL tidak membuka panel kalender.

---

### Persyaratan 9: Dokumentasi DatePicker

**User Story:** Sebagai developer AlurKerja, saya ingin dokumentasi komponen DatePicker tersedia, agar saya dapat memahami cara penggunaannya tanpa membaca source code.

#### Kriteria Penerimaan

1. THE DatePicker SHALL memiliki dokumentasi yang mencantumkan nama komponen, deskripsi fungsional tidak lebih dari 2 kalimat, dan tabel Props yang mencakup seluruh prop publik komponen dengan kolom: nama, tipe, nilai default, dan keterangan.
2. THE DatePicker SHALL memiliki masing-masing satu contoh kode terpisah yang dapat dikompilasi untuk setiap state berikut: default, error, disabled, dan readonly; di mana setiap contoh menunjukkan konfigurasi prop minimal yang diperlukan untuk menghasilkan state tersebut.
3. THE DatePicker SHALL memiliki satu contoh kode yang dapat dikompilasi yang menunjukkan penggunaan prop `minDate` dan `maxDate` secara bersamaan untuk membatasi rentang tanggal yang dapat dipilih.

---

### Persyaratan 10: Konsistensi Design System

**User Story:** Sebagai developer AlurKerja, saya ingin seluruh komponen form mengikuti Design_System yang ada, agar tampilan aplikasi konsisten di semua halaman.

#### Kriteria Penerimaan

1. THE Design_System SHALL mendefinisikan Token_Desain warna, tipografi, spacing, dan border-radius dalam konfigurasi TailwindCSS yang bersumber dari variabel CSS shadcn/ui, di mana setiap kategori token mencakup minimal nilai default, hover, focus, dan disabled.
2. THE TextInput, THE Select, dan THE DatePicker SHALL menggunakan kelas TailwindCSS yang mereferensikan Token_Desain (contoh: `bg-background`, `text-foreground`, `border-input`, `ring-ring`) dan tidak menggunakan nilai warna hardcoded dalam bentuk apapun (termasuk nilai hex, rgb, hsl, atau named color langsung).
3. WHEN tema aplikasi berubah (contoh: mode gelap ke terang), THE TextInput, THE Select, dan THE DatePicker SHALL memperbarui seluruh properti visual (warna, border, teks, placeholder, ikon) mengikuti Token_Desain yang aktif dalam satu render cycle tanpa perubahan kode komponen.
4. THE TextInput, THE Select, dan THE DatePicker SHALL menggunakan komponen primitif dari shadcn/ui (`Input`, `Select`, `Button`, `Popover`, `Calendar`) sebagai fondasi dan tidak menduplikasi logika yang sudah ada di Design_System, diverifikasi dengan tidak adanya re-implementasi handler interaksi (focus, blur, keyboard navigation) yang telah disediakan oleh primitif tersebut.
5. THE TextInput, THE Select, dan THE DatePicker SHALL menggunakan utility `cn()` (gabungan `clsx` dan `tailwind-merge`) untuk menggabungkan semua kelas TailwindCSS pada prop `className`, sehingga kelas yang bertentangan diselesaikan oleh `tailwind-merge` dan tidak ada kelas duplikat yang dikirim ke DOM.
6. WHEN komponen baru ditambahkan ke pustaka, THE Design_System SHALL memastikan komponen baru tersebut menggunakan Token_Desain, komponen primitif shadcn/ui, dan utility `cn()`, yang diverifikasi melalui code review checklist sebelum komponen tersebut diterima ke dalam pustaka.
7. IF komponen baru yang ditambahkan menggunakan nilai warna, spacing, atau tipografi di luar Token_Desain yang terdefinisi, THEN THE Design_System SHALL menolak penambahan komponen tersebut dan menampilkan pesan kesalahan yang mengidentifikasi token yang tidak valid.

---

### Persyaratan 11: Aksesibilitas Komponen

**User Story:** Sebagai developer AlurKerja, saya ingin seluruh komponen form memenuhi standar aksesibilitas dasar, agar pengguna dengan kebutuhan khusus dapat menggunakan aplikasi.

#### Kriteria Penerimaan

1. THE TextInput SHALL mengaitkan elemen `<label>` dengan elemen `<input>` menggunakan atribut `htmlFor` yang mereferensikan `id` input, di mana nilai `id` tersebut unik dalam satu halaman untuk mencegah konflik asosiasi label antar instance komponen.
2. IF prop `label` disertakan pada THE Select dan terdapat elemen label yang dirender, THEN THE Select SHALL mengaitkan elemen label tersebut dengan komponen trigger menggunakan `aria-labelledby` yang mereferensikan `id` elemen label; IF prop `label` tidak disertakan, THEN THE Select SHALL menggunakan `aria-label` dengan teks deskriptif sebagai gantinya.
3. THE DatePicker SHALL mengaitkan elemen label dengan komponen trigger menggunakan atribut `aria-label` yang nilainya sama persis dengan nilai prop `label` yang disertakan.
4. IF prop `error` berisi string tidak kosong, THEN THE TextInput, THE Select, dan THE DatePicker SHALL menambahkan atribut `aria-invalid="true"` dan `aria-describedby` pada elemen interaktif yang nilainya mereferensikan `id` elemen yang menampilkan pesan error, di mana elemen pesan error tersebut harus ada di DOM dengan `id` yang sama.
5. IF prop `error` bernilai string kosong atau tidak diset setelah sebelumnya berisi nilai, THEN THE TextInput, THE Select, dan THE DatePicker SHALL menghapus atribut `aria-invalid` dan `aria-describedby` dari elemen interaktif.
6. IF prop `disabled` bernilai `true` pada THE TextInput, THEN THE TextInput SHALL menambahkan atribut `disabled` pada elemen `<input>`; IF prop `disabled` bernilai `true` pada THE Select atau THE DatePicker yang menggunakan elemen trigger kustom, THEN THE Select dan THE DatePicker SHALL menambahkan `aria-disabled="true"` pada elemen trigger dan mencegah semua interaksi pengguna secara programatik.
