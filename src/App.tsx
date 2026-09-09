import { useState } from "react"
import { TextInput } from "./components/form/TextInput"
import { Select } from "./components/form/Select"
import { DatePicker } from "./components/form/DatePicker"
import "./App.css"

const jobOptions = [
  { value: "fe", label: "Frontend Engineer" },
  { value: "be", label: "Backend Engineer" },
  { value: "ds", label: "Data Scientist" },
  { value: "pm", label: "Product Manager" },
]

const emptyOptions: { value: string; label: string }[] = []

/* ── Layout helpers ── */
function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-shell">
      {children}
    </div>
  )
}

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="section-header">
      <h2 className="section-title">{title}</h2>
      <p className="section-desc">{description}</p>
    </div>
  )
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="demo-grid">{children}</div>
}

function DemoCard({ tag, children }: { tag: string; children: React.ReactNode }) {
  return (
    <div className="demo-card">
      <span className="demo-tag">{tag}</span>
      {children}
    </div>
  )
}

function Divider() {
  return <hr className="section-divider" />
}

/* ── App ── */
export default function App() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("invalid-email")
  const [password, setPassword] = useState("rahasia123")
  const [job, setJob] = useState("")
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [birthDate] = useState<Date | null>(new Date(1995, 5, 15))

  return (
    <PageShell>
      {/* ── Hero header ── */}
      <header className="page-header">
        <div className="page-header-inner">
          <div className="badge">AlurKerja Design System</div>
          <h1 className="page-title">Form Component Library</h1>
          <p className="page-subtitle">
            Komponen form reusable yang konsisten, aksesibel, dan siap pakai.
            Dibangun di atas <strong>React</strong>, <strong>Tailwind CSS</strong>, dan <strong>Radix UI</strong>.
          </p>
          <div className="tech-pills">
            {["ReactJS", "TailwindCSS v4", "Radix UI", "TypeScript", "lucide-react"].map((t) => (
              <span key={t} className="tech-pill">{t}</span>
            ))}
          </div>
        </div>
      </header>

      <main className="page-main">

        {/* ════ TEXT INPUT ════ */}
        <section className="component-section">
          <SectionHeader
            title="TextInput"
            description="Input teks satu baris dengan dukungan label, validasi, disabled, readonly, dan toggle password."
          />
          <Grid>
            <DemoCard tag="Default">
              <TextInput
                label="Nama Lengkap"
                placeholder="Masukkan nama lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </DemoCard>

            <DemoCard tag="Error">
              <TextInput
                label="Alamat Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error="Format email tidak valid"
                helperText="Contoh: nama@domain.com"
              />
            </DemoCard>

            <DemoCard tag="Disabled">
              <TextInput
                label="Username"
                value="johndoe_2024"
                disabled
                onChange={() => {}}
              />
            </DemoCard>

            <DemoCard tag="Read Only">
              <TextInput
                label="ID Karyawan"
                value="EMP-00142"
                readOnly
                onChange={() => {}}
              />
            </DemoCard>

            <DemoCard tag="Password">
              <TextInput
                label="Kata Sandi"
                type="password"
                placeholder="Masukkan kata sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </DemoCard>
          </Grid>
        </section>

        <Divider />

        {/* ════ SELECT ════ */}
        <section className="component-section">
          <SectionHeader
            title="Select"
            description="Dropdown pilihan tunggal dengan keyboard navigation, state error, disabled, dan fallback opsi kosong."
          />
          <Grid>
            <DemoCard tag="Default">
              <Select
                label="Posisi"
                value={job}
                onValueChange={setJob}
                options={jobOptions}
                placeholder="Pilih posisi..."
              />
            </DemoCard>

            <DemoCard tag="Error">
              <Select
                label="Divisi"
                value=""
                onValueChange={() => {}}
                options={jobOptions}
                placeholder="Pilih divisi..."
                error="Divisi wajib dipilih"
                helperText="Silakan pilih divisi Anda"
              />
            </DemoCard>

            <DemoCard tag="Disabled">
              <Select
                label="Departemen"
                value="fe"
                onValueChange={() => {}}
                options={jobOptions}
                disabled
              />
            </DemoCard>

            <DemoCard tag="Empty Options">
              <Select
                label="Proyek"
                value=""
                onValueChange={() => {}}
                options={emptyOptions}
                placeholder="Pilih proyek..."
              />
            </DemoCard>
          </Grid>
        </section>

        <Divider />

        {/* ════ DATE PICKER ════ */}
        <section className="component-section">
          <SectionHeader
            title="DatePicker"
            description="Kalender popup untuk memilih tanggal dengan dukungan disabled, readonly, dan batasan rentang tanggal."
          />
          <Grid>
            <DemoCard tag="Default">
              <DatePicker
                label="Tanggal Mulai"
                value={startDate}
                onChange={setStartDate}
                placeholder="Pilih tanggal mulai"
              />
            </DemoCard>

            <DemoCard tag="Error">
              <DatePicker
                label="Tanggal Berakhir"
                value={null}
                onChange={() => {}}
                error="Tanggal wajib diisi"
                helperText="Silakan pilih tanggal berakhir"
              />
            </DemoCard>

            <DemoCard tag="Disabled">
              <DatePicker
                label="Tanggal Bergabung"
                value={new Date(2023, 0, 15)}
                onChange={() => {}}
                disabled
              />
            </DemoCard>

            <DemoCard tag="Read Only">
              <DatePicker
                label="Tanggal Lahir"
                value={birthDate}
                onChange={() => {}}
                readOnly
              />
            </DemoCard>

            <DemoCard tag="Min / Max Date">
              <DatePicker
                label="Jadwal Interview"
                value={startDate}
                onChange={setStartDate}
                placeholder="30 hari ke depan"
                minDate={new Date()}
                maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
              />
            </DemoCard>
          </Grid>
        </section>

      </main>

      <footer className="page-footer">
        <p>AlurKerja Design System &mdash; Form Component Library</p>
      </footer>
    </PageShell>
  )
}