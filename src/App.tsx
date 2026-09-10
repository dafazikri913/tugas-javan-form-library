import { useState } from "react"
import { TextInput } from "./components/form/TextInput"
import { Select } from "./components/form/Select"
import { DatePicker } from "./components/form/DatePicker"
import { Type, ChevronDown, CalendarDays, Menu, X } from "lucide-react"
import "./App.css"

const jobOptions = [
  { value: "fe", label: "Frontend Engineer" },
  { value: "be", label: "Backend Engineer" },
  { value: "ds", label: "Data Scientist" },
  { value: "pm", label: "Product Manager" },
]
const emptyOptions: { value: string; label: string }[] = []

type ComponentId = "text-input" | "select" | "date-picker"

const NAV_ITEMS: { id: ComponentId; label: string; icon: React.ReactNode; desc: string }[] = [
  { id: "text-input",   label: "TextInput",   icon: <Type size={16} />,         desc: "Input teks satu baris" },
  { id: "select",       label: "Select",      icon: <ChevronDown size={16} />,  desc: "Dropdown pilihan tunggal" },
  { id: "date-picker",  label: "DatePicker",  icon: <CalendarDays size={16} />, desc: "Kalender popup" },
]

function DemoCard({ tag, children }: { tag: string; children: React.ReactNode }) {
  return (
    <div className="demo-card">
      <span className="demo-tag">{tag}</span>
      {children}
    </div>
  )
}

function SectionHeading({ title, description }: { title: string; description: string }) {
  return (
    <div className="section-heading">
      <h2 className="section-title">{title}</h2>
      <p className="section-desc">{description}</p>
    </div>
  )
}

/* ── Page sections ── */
function TextInputSection() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("invalid-email")
  const [password, setPassword] = useState("rahasia123")
  return (
    <>
      <SectionHeading
        title="TextInput"
        description="Input teks satu baris dengan dukungan label, validasi, disabled, readonly, dan toggle password."
      />
      <div className="demo-grid">
        <DemoCard tag="Default">
          <TextInput label="Nama Lengkap" placeholder="Masukkan nama lengkap" value={name} onChange={e => setName(e.target.value)} />
        </DemoCard>
        <DemoCard tag="Error">
          <TextInput label="Alamat Email" type="email" value={email} onChange={e => setEmail(e.target.value)} error="Format email tidak valid" helperText="Contoh: nama@domain.com" />
        </DemoCard>
        <DemoCard tag="Disabled">
          <TextInput label="Username" value="johndoe_2024" disabled onChange={() => {}} />
        </DemoCard>
        <DemoCard tag="Read Only">
          <TextInput label="ID Karyawan" value="EMP-00142" readOnly onChange={() => {}} />
        </DemoCard>
        <DemoCard tag="Password">
          <TextInput label="Kata Sandi" type="password" placeholder="Masukkan kata sandi" value={password} onChange={e => setPassword(e.target.value)} />
        </DemoCard>
      </div>
    </>
  )
}

function SelectSection() {
  const [job, setJob] = useState("")
  return (
    <>
      <SectionHeading
        title="Select"
        description="Dropdown pilihan tunggal dengan keyboard navigation, state error, disabled, dan fallback opsi kosong."
      />
      <div className="demo-grid">
        <DemoCard tag="Default">
          <Select label="Posisi" value={job} onValueChange={setJob} options={jobOptions} placeholder="Pilih posisi..." />
        </DemoCard>
        <DemoCard tag="Error">
          <Select label="Divisi" value="" onValueChange={() => {}} options={jobOptions} placeholder="Pilih divisi..." error="Divisi wajib dipilih" helperText="Silakan pilih divisi Anda" />
        </DemoCard>
        <DemoCard tag="Disabled">
          <Select label="Departemen" value="fe" onValueChange={() => {}} options={jobOptions} disabled />
        </DemoCard>
        <DemoCard tag="Empty Options">
          <Select label="Proyek" value="" onValueChange={() => {}} options={emptyOptions} placeholder="Pilih proyek..." />
        </DemoCard>
      </div>
    </>
  )
}

function DatePickerSection() {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [birthDate] = useState<Date | null>(new Date(1995, 5, 15))
  return (
    <>
      <SectionHeading
        title="DatePicker"
        description="Kalender popup untuk memilih tanggal dengan dukungan disabled, readonly, dan batasan rentang tanggal."
      />
      <div className="demo-grid">
        <DemoCard tag="Default">
          <DatePicker label="Tanggal Mulai" value={startDate} onChange={setStartDate} placeholder="Pilih tanggal mulai" />
        </DemoCard>
        <DemoCard tag="Error">
          <DatePicker label="Tanggal Berakhir" value={null} onChange={() => {}} error="Tanggal wajib diisi" helperText="Silakan pilih tanggal berakhir" />
        </DemoCard>
        <DemoCard tag="Disabled">
          <DatePicker label="Tanggal Bergabung" value={new Date(2023, 0, 15)} onChange={() => {}} disabled />
        </DemoCard>
        <DemoCard tag="Read Only">
          <DatePicker label="Tanggal Lahir" value={birthDate} onChange={() => {}} readOnly />
        </DemoCard>
        <DemoCard tag="Min / Max Date">
          <DatePicker label="Jadwal Interview" value={startDate} onChange={setStartDate} placeholder="30 hari ke depan" minDate={new Date()} maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)} />
        </DemoCard>
      </div>
    </>
  )
}

/* ── App ── */
export default function App() {
  const [active, setActive] = useState<ComponentId>("text-input")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleNav = (id: ComponentId) => {
    setActive(id)
    setSidebarOpen(false)
  }

  return (
    <div className="layout">

      {/* ── Sidebar overlay (mobile) ── */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* ── Sidebar ── */}
      <aside className={`sidebar ${sidebarOpen ? "sidebar--open" : ""}`}>
        <div className="sidebar-brand">
          <div className="sidebar-logo">AK</div>
          <div>
            <div className="sidebar-brand-name">AlurKerja</div>
            <div className="sidebar-brand-sub">Design System</div>
          </div>
        </div>

        <div className="sidebar-section-label">Components</div>
        <nav className="sidebar-nav">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`nav-item ${active === item.id ? "nav-item--active" : ""}`}
            >
              <span className="nav-item-icon">{item.icon}</span>
              <div className="nav-item-text">
                <span className="nav-item-label">{item.label}</span>
                <span className="nav-item-desc">{item.desc}</span>
              </div>
              {active === item.id && <span className="nav-item-dot" />}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-footer-text">Form Component Library</div>
          <div className="sidebar-footer-stack">React · Tailwind · Radix UI</div>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="main-wrapper">

        {/* ── Topbar ── */}
        <header className="topbar">
          <button className="topbar-menu-btn" onClick={() => setSidebarOpen(v => !v)} aria-label="Toggle sidebar">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="topbar-breadcrumb">
            <span className="topbar-breadcrumb-root">Components</span>
            <span className="topbar-breadcrumb-sep">/</span>
            <span className="topbar-breadcrumb-current">
              {NAV_ITEMS.find(n => n.id === active)?.label}
            </span>
          </div>
          <div className="topbar-pills">
            {["ReactJS", "TailwindCSS v4", "Radix UI", "TypeScript"].map(t => (
              <span key={t} className="tech-pill">{t}</span>
            ))}
          </div>
        </header>

        {/* ── Content ── */}
        <main className="content">
          {active === "text-input"  && <TextInputSection />}
          {active === "select"      && <SelectSection />}
          {active === "date-picker" && <DatePickerSection />}
        </main>

        <footer className="page-footer">
          <p>AlurKerja Design System &mdash; Form Component Library</p>
        </footer>
      </div>
    </div>
  )
}