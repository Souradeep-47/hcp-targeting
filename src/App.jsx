
import React, { useMemo, useState, useEffect, useContext, createContext } from 'react'
import { createPortal } from 'react-dom'

// ========================= SVG Icon Components =========================
const Icon = ({ path, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {path}
  </svg>
)
const MessageSquare = ({ className }) => <Icon className={className} path={<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />} />
const Send = ({ className }) => <Icon className={className} path={<><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></>} />
const RefreshCcw = ({ className }) => <Icon className={className} path={<><path d="M3 2v6h6"/><path d="M21 12A9 9 0 0 0 6 5.3L3 8"/><path d="M21 22v-6h-6"/><path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"/></>} />
const Download = ({ className }) => <Icon className={className} path={<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></>} />
const Upload = ({ className }) => <Icon className={className} path={<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></>} />
const Wand2 = ({ className }) => <Icon className={className} path={<><path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.21 1.21 0 0 0 1.72 0L21.64 5.36a1.21 1.21 0 0 0 0-1.72Z"/><path d="m14 7 3 3"/><path d="M5 6v4"/><path d="M19 14v4"/><path d="M10 2v2"/><path d="M7 8H3"/><path d="M21 16h-4"/><path d="M11 3H9"/></>} />
const Info = ({ className }) => <Icon className={className} path={<><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></>} />
const Eye = ({ className }) => <Icon className={className} path={<><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></>} />
const X = ({ className }) => <Icon className={className} path={<><path d="M18 6 6 18"/><path d="m6 6 12 12"/></>} />

// ========================= Re-implemented UI Components =========================
const Card = ({ className = '', children }) => <div className={`rounded-2xl ${className}`}>{children}</div>
const CardHeader = ({ className = '', children }) => <div className={`p-4 sm:p-6 ${className}`}>{children}</div>
const CardContent = ({ className = '', children }) => <div className={`p-4 sm:p-6 pt-0 ${className}`}>{children}</div>
const CardTitle = ({ className = '', children }) => <h3 className={`font-semibold ${className}`}>{children}</h3>

const Button = ({ className = '', children, ...props }) => (
  <button className={`inline-flex items-center justify-center rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 disabled:opacity-50 disabled:pointer-events-none ${className}`} {...props}>{children}</button>
)

const Badge = ({ className = '', children }) => <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>{children}</span>

const Input = ({ className = '', ...props }) => <input className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`} {...props} />

const Label = ({ className = '', ...props }) => <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`} {...props} />

const Select = ({ className = '', children, value, onValueChange, ...props }) => (
  <select className={`w-full mt-1 ${className}`} value={value} onChange={e => onValueChange(e.target.value)} {...props}>
    {children}
  </select>
)
const SelectItem = ({ value, children }) => <option value={value}>{children}</option>

const DialogContext = createContext()
const Dialog = ({ children, open, onOpenChange }) => {
  useEffect(() => {
    const handleEsc = (event) => { if (event.key === 'Escape') onOpenChange(false) }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onOpenChange])
  if (!open) return null
  return createPortal(
    <DialogContext.Provider value={{ onOpenChange }}>
      <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => onOpenChange(false)}>
        {children}
      </div>
    </DialogContext.Provider>,
    document.body
  )
}
const DialogContent = ({ className = '', children }) => (
  <div className={`relative z-50 rounded-2xl ${className}`} onClick={(e) => e.stopPropagation()}>
    {children}
  </div>
)
const DialogHeader = ({ className = '', children }) => <div className={`flex flex-col space-y-1.5 text-center sm:text-left p-6 ${className}`}>{children}</div>
const DialogTitle = ({ className = '', children }) => <h2 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>{children}</h2>

const Switch = ({ checked, onCheckedChange, className = '' }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onCheckedChange(!checked)}
    className={`${className} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${checked ? 'bg-indigo-600' : 'bg-gray-600'}`}
  >
    <span aria-hidden="true" className={`${checked ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`} />
  </button>
)

const TabsContext = createContext()
const Tabs = ({ defaultValue, children, className }) => {
  const [activeTab, setActiveTab] = useState(defaultValue)
  return <TabsContext.Provider value={{ activeTab, setActiveTab }}><div className={className}>{children}</div></TabsContext.Provider>
}
const TabsList = ({ children, className }) => <div className={className}>{children}</div>
const TabsTrigger = ({ value, children, className }) => {
  const { activeTab, setActiveTab } = useContext(TabsContext)
  const isActive = activeTab === value
  return <button onClick={() => setActiveTab(value)} className={`${className} ${isActive ? 'bg-white/20' : 'opacity-70 hover:opacity-100'} transition-all`} data-state={isActive ? 'active' : 'inactive'}>{children}</button>
}
const TabsContent = ({ value, children, className }) => {
  const { activeTab } = useContext(TabsContext)
  return activeTab === value ? <div className={className}>{children}</div> : null
}

const TooltipProvider = ({ children }) => <>{children}</>
const Tooltip = ({ children }) => <>{children}</>
const TooltipTrigger = ({ children }) => <>{children}</>
const TooltipContent = ({ children }) => null

// ========================= Constants & Styles =========================
const GLASS = "backdrop-blur-xl backdrop-saturate-150 bg-black/20 border border-white/10 shadow-lg"
const GLASS_SOFT = "backdrop-blur-lg bg-black/10 border border-white/5"
const DIALOG_GLASS = "backdrop-blur-2xl backdrop-saturate-200 bg-gray-950/90 border border-white/10 shadow-2xl"
const INPUT_GLASS = "bg-black/20 border-white/20 focus:ring-2 focus:ring-indigo-400/50 text-white placeholder:text-white/60"
const PILL = `rounded-full backdrop-blur-md bg-white/10 border border-white/20 shadow-md hover:bg-white/20 transition-colors`

const THEMES = {
  blue: 'linear-gradient(-45deg, #0f172a, #1e3a8a, #312e81, #2c1a4d)',
  violet: 'linear-gradient(-45deg, #2e1065, #4c1d95, #5b21b6, #7c3aed)',
  emerald: 'linear-gradient(-45deg, #064e3b, #047857, #059669, #10b981)',
  crimson: 'linear-gradient(-45deg, #881337, #9f1239, #be123c, #e11d48)',
}

// ========================= Utilities =========================
const parseDate = (s) => {
  if (!s) return null
  const cleaned = String(s).trim()
  if (!cleaned) return null
  const iso = /\d{4}-\d{2}-\d{2}/.test(cleaned)
    ? cleaned
    : /\d{2}\/\d{2}\/\d{4}/.test(cleaned) ? cleaned.split("/").reverse().join("-") : cleaned
  const d = new Date(iso)
  return isNaN(d.getTime()) ? null : d
}
const daysBetween = (a, b) => Math.round((+a - +b) / (1000 * 60 * 60 * 24))
const withinDays = (date, from, daysAhead) => date ? ((()=>{ const diff = daysBetween(date, from); return diff >= 0 && diff <= daysAhead; })()) : false
const toNumber = (x) => { if (!x) return 0; const n = Number(String(x).replace(/[^0-9.-]/g, "")); return isNaN(n) ? 0 : n }
const numberFmt = (n) => n.toLocaleString()
const pctFmt = (n) => (n * 100).toFixed(0) + "%"
const dateFmt = (d) => (d ? d.toISOString().slice(0, 10) : "—")

const COMPANY_PRODUCTS = {
  Merck: ["Keytruda"],
  "Bristol Myers Squibb": ["Opdivo", "Opdualag", "Yervoy", "Abraxane"],
  Roche: ["Tecentriq", "Avastin"],
  AstraZeneca: ["Imfinzi", "Tagrisso", "Enhertu"],
  Novartis: ["Tafinlar", "Mekinist", "Kisqali"],
  Pfizer: ["Ibrance", "Lorbrena"],
  "Eli Lilly": ["Verzenio", "Retevmo"],
  Amgen: ["Lumakras"],
  Bayer: ["Vitrakvi"],
  Takeda: ["Alunbrig"],
  Jansen: ["Rybrevant"],
  GSK: ["Jemperli"],
  AbbVie: [],
}

const DEFAULT_GEMINI_KEY = "YOUR_GEMINI_API_KEY_HERE" // Replace in UI to enable Gemini calls

function buildCompanyProductMap(rows) {
  const map = {}
  for (const r of rows) {
    const c = (r.company || "").trim()
    const p = (r.product || r.drug_name || "").trim()
    if (!c && !p) continue
    if (c) { if (!map[c]) map[c] = new Set(); if (p) map[c].add(p) }
  }
  for (const [c, plist] of Object.entries(COMPANY_PRODUCTS)) {
    if (!map[c]) map[c] = new Set()
    plist.forEach(p => map[c].add(p))
  }
  for (const c of Object.keys(map)) map[c].delete("")
  return map
}
function getProductOptions(rows, company) {
  const map = buildCompanyProductMap(rows)
  if (!company) {
    const all = new Set()
    Object.values(map).forEach(set => set.forEach(v => all.add(v)))
    rows.forEach(r => { const p = (r.product || r.drug_name || "").trim(); if (p) all.add(p) })
    return Array.from(all).filter(Boolean).sort()
  }
  return (map[company] ? Array.from(map[company]) : []).sort()
}
function sanitizeProductSelection(rows, company, product) {
  if (!product) return null
  const options = getProductOptions(rows, company)
  return options.includes(product) ? product : null
}

// ========================= Custom CSV Parser =========================
function parseCSV(text) {
  const lines = text.split(/\r?\n/).filter(line => line.trim() !== '')
  if (lines.length < 2) return []
  const header = lines[0].split(',').map(h => h.trim())
  const rows = []
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',')
    const rowObject = {}
    for (let j = 0; j < header.length; j++) {
      rowObject[header[j]] = values[j]?.trim() || ''
    }
    rows.push(rowObject)
  }
  return rows
}

// ========================= Aggregation =========================
function aggregateByHcp(rows, taFilter, today, lookbackDays, horizonDays) {
  const filtered = rows.filter(r => (taFilter ? (r.ta || "").toLowerCase().includes(taFilter.toLowerCase()) : true))
  const byHcp = {}
  for (const r of filtered) {
    const hcp = r.hcp_id || "Unknown"
    const lastSeen = parseDate(r.last_seen_date || r.claim_date)
    const nextAppt = parseDate(r.next_appt_date || "")
    const recent = lastSeen ? daysBetween(new Date(today), lastSeen) <= lookbackDays && daysBetween(new Date(today), lastSeen) >= 0 : false
    const upcoming = withinDays(nextAppt, new Date(today), horizonDays)
    const paid = toNumber(r.paid_amount)
    if (!byHcp[hcp]) byHcp[hcp] = { hcp_id: hcp, hcp_specialty: r.hcp_specialty || "", site_of_care: r.site_of_care || "", ta: r.ta || "", patients: 0, recentPatients: 0, upcomingPatients: 0, newPatientShare: 0, drugCounts: {}, drugClassMix: {}, topDrugByCount: null, lastSeenMax: null, nextApptMin: null, paidAmountSum: 0 }
    const b = byHcp[hcp]
    b.patients += 1
    if (recent) b.recentPatients += 1
    if (upcoming) b.upcomingPatients += 1
    b.paidAmountSum += paid
    const np = String(r.new_patient_flag || "").toUpperCase()
    if (np === "Y") b.drugClassMix["__newPatientCount__"] = (b.drugClassMix["__newPatientCount__"] || 0) + 1
    const drug = (r.drug_name || "Unknown").trim()
    const dclass = (r.drug_class || "Unknown").trim()
    b.drugCounts[drug] = (b.drugCounts[drug] || 0) + 1
    b.drugClassMix[dclass] = (b.drugClassMix[dclass] || 0) + 1
    if (lastSeen && (!b.lastSeenMax || lastSeen > b.lastSeenMax)) b.lastSeenMax = lastSeen
    if (nextAppt && (!b.nextApptMin || nextAppt < b.nextApptMin)) b.nextApptMin = nextAppt
  }
  Object.values(byHcp).forEach(b => {
    const newCount = b.drugClassMix["__newPatientCount__"] || 0
    delete b.drugClassMix["__newPatientCount__"]
    b.newPatientShare = b.patients ? newCount / b.patients : 0
    const top = Object.entries(b.drugCounts).sort((a, c) => c[1] - a[1])[0]
    b.topDrugByCount = top ? { drug_name: top[0], count: top[1] } : null
  })
  return Object.values(byHcp).sort((a, b) => (b.upcomingPatients - a.upcomingPatients) || (b.recentPatients - a[1]))
}

// ========================= AI helpers =========================
function formatHcpForPrompt(h) {
  return `HCP ${h.hcp_id} | Specialty: ${h.hcp_specialty} | Site: ${h.site_of_care} | TA: ${h.ta} | Patients: ${h.patients} (recent ${h.recentPatients}, upcoming ${h.upcomingPatients}) | New share: ${(h.newPatientShare*100).toFixed(0)}% | Top drug: ${h.topDrugByCount?.drug_name || '—'} | Mix: ${Object.entries(h.drugClassMix).map(([k,v])=>`${k}:${v}`).join(', ')}`
}

async function generateWithGemini(apiKey, hcp, company, product, signal) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`
  const brand = product || "our product"; const co = company || "our company"
  const sys = "You are a medical sales enablement assistant. Generate 5-8 concise, compliant, and professional talking points for a pharmaceutical sales rep. Do not include any introductory phrases like 'Here are...' or use markdown formatting like asterisks."
  const user = `Context: ${formatHcpForPrompt(hcp)}\nCompany: ${co}\nProduct: ${brand}\nTask: Write hyper-personalised pre-call talking points to detail ${brand} to this HCP before the next patient visit. Include line-of-therapy considerations and access reminders.`
  const body = { contents: [ { role: "user", parts: [{ text: sys + "\n\n" + user }] } ] }
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal })
  if (!res.ok) throw new Error(`Gemini error ${res.status}`)
  const data = await res.json()
  const text = data?.candidates?.[0]?.content?.parts?.map((p)=> p?.text).filter(Boolean).join("\n") || ""
  if (!text) throw new Error('Empty Gemini response')
  const bullets = text.split(/\n+|•|\d+\.|- /).map((s)=> s.trim().replace(/\*\*/g, '')).filter(Boolean)
  return bullets.length ? bullets : [text]
}

function buildNBAFallback(hcp, selectedCompany, selectedProduct) {
  const tips = []
  const topDrug = hcp.topDrugByCount?.drug_name
  const hasIO = (hcp.drugClassMix["Immunotherapy"] ?? 0) > 0
  const hasChemo = (hcp.drugClassMix["Chemotherapy"] ?? 0) > 0
  const brand = selectedProduct || "our product"; const co = selectedCompany || "our company"
  if (hcp.newPatientShare >= 0.3) tips.push(`Highlight ${brand} first-line evidence for newly diagnosed patients; consider starter kits and quick-start forms.`)
  if (hasIO && hasChemo) tips.push(`Position ${brand} combination data and safety profile vs monotherapy in ≥1L settings.`)
  else if (hasIO) tips.push(`Reinforce ${brand} persistence + real-world outcomes for their patient mix.`)
  else if (hasChemo) tips.push(`Introduce latest data on moving chemo-reliant patients to targeted/IO regimens with ${brand} where appropriate.`)
  if (topDrug) tips.push(`Acknowledge recent use of ${topDrug}; contrast ${brand} label/indications in eligible subgroups.`)
  if (hcp.upcomingPatients > 0) tips.push("Schedule a 10-minute touchpoint 24–72h before the next visit window with a concise, two-slide leave-behind.")
  tips.push(`Close with a clear ask: 2 trial patients on ${brand} this month — ${co} can support access & prior-auth.`)
  if (!tips.length) tips.push(`Confirm patient mix; offer tailored clinical reprints aligned to their most common regimens, then introduce ${brand}.`)
  return tips
}

async function chatWithAI(endpoint, apiKey, messages, signal) {
  const headers = { 'Content-Type': 'application/json' }
  if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`
  const res = await fetch(endpoint, { method: 'POST', headers, body: JSON.stringify({ messages }), signal })
  if (!res.ok) throw new Error(`Chat endpoint error: ${res.status}`)
  const data = await res.json().catch(() => ({}))
  const content = data?.reply || data?.choices?.[0]?.message?.content
  if (typeof content === 'string') return content
  throw new Error('Unexpected chat response')
}
function chatFallback(q, ctx) {
  const bits = [ctx.ta ? `TA: ${ctx.ta}` : null, ctx.company ? `Company: ${ctx.company}` : null, ctx.product ? `Product: ${ctx.product}` : null].filter(Boolean).join(' | ')
  return `I don't have a live chat endpoint configured.\nQuestion: ${q}\n${bits ? `Context: ${bits}\n` : ''}Suggested next steps: 1) Clarify patient line of therapy & biomarkers; 2) Position ${ctx.product || 'our product'} vs their most-used regimen; 3) Offer access resources.`
}

// ========================= Decorative Liquid Glass Background =========================
function LiquidBackground({ theme }) {
  return <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden animated-gradient" style={{ backgroundImage: THEMES[theme] }}></div>
}

// ========================= App =========================
function App() {
  const [rows, setRows] = useState([])
  const [taFilter, setTaFilter] = useState("NSCLC")
  const [lookbackDays, setLookbackDays] = useState(30)
  const [horizonDays, setHorizonDays] = useState(21)
  const [today] = useState(new Date())

  const [theme, setTheme] = useState('blue')
  const [companySelection, setCompanySelection] = useState(null)
  const [productSelection, setProductSelection] = useState(null)
  useEffect(() => { const s = sanitizeProductSelection(rows, companySelection, productSelection); if (s !== productSelection) setProductSelection(s) }, [companySelection, rows, productSelection])

  const [useAI, setUseAI] = useState(true)
  const [geminiKey, setGeminiKey] = useState(DEFAULT_GEMINI_KEY)

  const [chatOpen, setChatOpen] = useState(false); const [chatEndpoint, setChatEndpoint] = useState(""); const [chatKey, setChatKey] = useState("")
  const [chatInput, setChatInput] = useState(""); const [chatMessages, setChatMessages] = useState([{ role: 'system', content: 'You are a helpful HCP targeting assistant.' }])
  const [chatBusy, setChatBusy] = useState(false); const [chatError, setChatError] = useState(null)

  const tas = useMemo(() => Array.from(new Set(rows.map(r => r.ta || ""))).filter(Boolean).sort(), [rows])
  const companies = useMemo(() => { const fromData = Array.from(new Set(rows.map(r => (r.company || '').trim()).filter(Boolean))); const curated = Object.keys(COMPANY_PRODUCTS); return Array.from(new Set([...fromData, ...curated])).filter(Boolean).sort() }, [rows])
  const productsForUI = useMemo(() => getProductOptions(rows, companySelection), [rows, companySelection])
  const insights = useMemo(() => aggregateByHcp(rows, taFilter, today, lookbackDays, horizonDays), [rows, taFilter, today, lookbackDays, horizonDays])
  const kpis = useMemo(() => ({ totalHcps: insights.length, totalPatients: insights.reduce((s, i) => s + i.patients, 0), flaggedHcps: insights.filter(i => i.upcomingPatients > 0 || i.recentPatients > 0).length, newShare: insights.length ? insights.reduce((s, i) => s + i.newPatientShare, 0) / insights.length : 0 }), [insights])

  const handleFile = (file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      const text = event.target.result
      const parsedData = parseCSV(text)
      const norm = parsedData.map((r) => {
        const o = {}
        Object.keys(r).forEach(k => {
          const nk = k?.toString?.().trim().toLowerCase().replace(/\s+/g, "_")
          if (nk) o[nk] = r[k]
        })
        return o
      })
      setRows(norm)
    }
    reader.readAsText(file)
  }

  const downloadCsv = () => {
    const headers = ["hcp_id","hcp_specialty","site_of_care","ta","patients","recentPatients","upcomingPatients","newPatientShare","topDrug","lastSeenMax","nextApptMin","paidAmountSum"]
    const csvRows = [headers.join(",")].concat(insights.map(i => [
      i.hcp_id, i.hcp_specialty, i.site_of_care, i.ta, i.patients, i.recentPatients, i.upcomingPatients, i.newPatientShare.toFixed(2),
      (i.topDrugByCount?.drug_name || "").replaceAll(',', ';'), dateFmt(i.lastSeenMax), dateFmt(i.nextApptMin), i.paidAmountSum
    ].join(",")))
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a"); a.href = url; a.download = `hcp_insights_${Date.now()}.csv`; a.click(); URL.revokeObjectURL(url)
  }

  async function handleChatSend() {
    const q = chatInput.trim(); if (!q) return
    const ctx = { ta: taFilter, company: companySelection, product: productSelection }
    const newMsgs = [...chatMessages, { role: 'user', content: q }]
    setChatMessages(newMsgs); setChatBusy(true); setChatError(null)
    try {
      const reply = chatEndpoint ? await chatWithAI(chatEndpoint, chatKey || undefined, newMsgs, undefined) : chatFallback(q, ctx)
      setChatMessages(msgs => [...msgs, { role: 'assistant', content: reply }])
    } catch (e) {
      setChatError(e?.message || 'Failed to chat')
      setChatMessages(msgs => [...msgs, { role: 'assistant', content: chatFallback(q, ctx) }])
    } finally { setChatBusy(false); setChatInput("") }
  }

  return (
    <div className="min-h-screen w-full relative">
      <LiquidBackground theme={theme} />
      <style>{`
        :root, body { color: #ffffff !important; }
        ::placeholder { color: rgba(255,255,255,0.72) !important; }
        select { background-color: rgba(0,0,0,0.2); color: white; border-radius: 0.375rem; padding: 0.5rem; border: 1px solid rgba(255,255,255,0.2); }
        select option { background-color: #1f2937; color: white; }
      `}</style>

      <div className="sticky top-0 z-30 p-4">
        <div className={`rounded-2xl px-4 py-3 ${GLASS} flex flex-col sm:flex-row items-center justify-between gap-4`}>
          <div className="text-center sm:text-left">
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">HCP Targeting Dashboard</h1>
            <p className="text-xs md:text-sm text-white/70">IQVIA Claims Analysis</p>
          </div>
          <div className="flex items-center gap-2">
            <Button className={`${PILL} px-3 py-2 text-xs`} title="Open Chat assistant" onClick={() => setChatOpen(true)}>
              <MessageSquare className="h-4 w-4 mr-1.5"/>Chat
            </Button>
            <Dialog open={chatOpen} onOpenChange={setChatOpen}>
              <DialogContent className={`w-full h-full sm:max-w-2xl sm:h-auto p-0 ${DIALOG_GLASS}`}>
                <DialogHeader>
                  <DialogTitle>Chat Assistant</DialogTitle>
                  <Button onClick={() => setChatOpen(false)} className="absolute top-4 right-4 p-1 bg-white/10 hover:bg-white/20 rounded-full"><X className="h-4 w-4"/></Button>
                </DialogHeader>
                <div className="p-6 pt-0 space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div><Label>Chat endpoint</Label><Input className={INPUT_GLASS} placeholder="/api/chat" value={chatEndpoint} onChange={(e) => setChatEndpoint(e.target.value)} /></div>
                    <div><Label>API key (optional)</Label><Input className={INPUT_GLASS} type="password" placeholder="Bearer key" value={chatKey} onChange={(e) => setChatKey(e.target.value)} /></div>
                  </div>
                  <div className={`h-64 overflow-auto rounded-2xl border p-3 ${GLASS_SOFT} text-sm space-y-2`}>
                    {chatMessages.filter(m => m.role !== 'system').map((m, idx) => (
                      <div key={idx} className={m.role === 'user' ? 'text-right' : ''}>
                        <div className={`inline-block px-3 py-2 rounded-2xl ${m.role === 'user' ? 'bg-indigo-500' : 'bg-black/20'} backdrop-blur`}>{m.content}</div>
                      </div>
                    ))}
                    {chatError && <div className="text-red-400 text-xs">{chatError}</div>}
                  </div>
                  <div className="flex items-center gap-2">
                    <Input className={INPUT_GLASS} placeholder="Ask about HCP targeting..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleChatSend() } }} />
                    <Button className={`${PILL} px-4 py-2 bg-indigo-500 hover:bg-indigo-600`} onClick={handleChatSend} disabled={chatBusy || !chatInput.trim()}><Send className="h-4 w-4"/></Button>
                  </div>
                  <div className="text-[11px] opacity-80">If no endpoint is set, responses are rule-based fallbacks.</div>
                </div>
              </DialogContent>
            </Dialog>
            <Button className={`${PILL} px-3 py-2 text-xs`} onClick={() => { setRows([]) }} title="Clear data"><RefreshCcw className="h-4 w-4 mr-1.5" />Reset</Button>
            <Button className={`${PILL} px-3 py-2 text-xs`} onClick={downloadCsv} disabled={!rows.length}><Download className="h-4 w-4 mr-1.5" />Export</Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        <Card className={`border-dashed border-2 border-white/20 rounded-2xl ${GLASS_SOFT}`}>
          <CardHeader className="flex flex-row items-center justify-between"><CardTitle className="text-base flex items-center gap-2"><Upload className="h-4 w-4" /> Upload Weekly Claims CSV</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              <input className={`${PILL} px-3 py-2 text-sm w-full max-w-xs`} type="file" accept=".csv" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />
              <p className="text-xs text-white/60">Expected headers include: <code>hcp_id, hcp_specialty, site_of_care, ta, claim_date, last_seen_date, next_appt_date, drug_name, drug_class, paid_amount, new_patient_flag</code>.</p>
            </div>
          </CardContent>
        </Card>

        <Card className={`${GLASS}`}>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div className="col-span-1 md:col-span-2 lg:col-span-4 font-bold text-lg mb-2">Filters & Settings</div>
              <div className="col-span-1">
                <Label>Therapy Area</Label>
                <Select value={taFilter ?? "__ALL__"} onValueChange={(v) => setTaFilter(v === "__ALL__" ? null : v)} className={INPUT_GLASS}>
                  <SelectItem value="__ALL__">(All)</SelectItem>
                  {tas.map(ta => <SelectItem key={ta} value={ta}>{ta}</SelectItem>)}
                </Select>
              </div>
              <div className="col-span-1">
                <Label>Company (for AI)</Label>
                <Select value={companySelection ?? "__ALL__"} onValueChange={(v) => setCompanySelection(v === "__ALL__" ? null : v)} className={INPUT_GLASS}>
                  <SelectItem value="__ALL__">(All)</SelectItem>
                  {companies.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </Select>
              </div>
              <div className="col-span-1">
                <Label>Product (for AI)</Label>
                <Select value={productSelection ?? "__ALL__"} onValueChange={(v) => setProductSelection(v === "__ALL__" ? null : v)} className={INPUT_GLASS}>
                  <SelectItem value="__ALL__">(All)</SelectItem>
                  {productsForUI.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4 col-span-1">
                <div>
                  <Label>Recent (days)</Label>
                  <Input className={INPUT_GLASS + " mt-1"} type="number" value={lookbackDays} onChange={(e) => setLookbackDays(Number(e.target.value) || 0)} />
                </div>
                <div>
                  <Label>Upcoming (days)</Label>
                  <Input className={INPUT_GLASS + " mt-1"} type="number" value={horizonDays} onChange={(e) => setHorizonDays(Number(e.target.value) || 0)} />
                </div>
              </div>
              <div className="md:col-span-2 lg:col-span-4">
                <Label>Gemini AI for Talking Points</Label>
                <div className="flex items-center gap-4 mt-2">
                  <div className={`flex items-center gap-2 px-3 py-2 ${PILL}`}><Switch checked={useAI} onCheckedChange={setUseAI} /><Wand2 className="h-4 w-4" /></div>
                  <Input className={INPUT_GLASS + " flex-grow"} type="password" placeholder="Google Gemini API key" value={geminiKey} onChange={(e) => setGeminiKey(e.target.value)} />
                </div>
              </div>
              <div className="md:col-span-2 lg:col-span-4">
                <Label>Theme</Label>
                <div className="flex items-center gap-2 mt-2">
                  {Object.keys(THEMES).map(themeKey => (
                    <button key={themeKey} onClick={() => setTheme(themeKey)} className={`w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white ${theme === themeKey ? 'ring-2 ring-white' : ''}`} style={{ background: THEMES[themeKey] }}></button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className={`${GLASS_SOFT}`}><CardHeader><CardTitle className="text-sm text-white/70">HCPs in view</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold tracking-tighter">{numberFmt(kpis.totalHcps)}</div></CardContent></Card>
          <Card className={`${GLASS_SOFT}`}><CardHeader><CardTitle className="text-sm text-white/70">Total claims (rows)</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold tracking-tighter">{numberFmt(kpis.totalPatients)}</div></CardContent></Card>
          <Card className={`${GLASS_SOFT}`}><CardHeader><CardTitle className="text-sm text-white/70">Flagged HCPs</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold tracking-tighter">{numberFmt(kpis.flaggedHcps)}</div></CardContent></Card>
          <Card className={`${GLASS_SOFT}`}><CardHeader><CardTitle className="text-sm text-white/70">New patient share</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold tracking-tighter">{pctFmt(kpis.newShare)}</div></CardContent></Card>
        </div>

        <Card className={`${GLASS}`}>
          <Tabs defaultValue="cards" className="w-full">
            <TabsList className={`grid grid-cols-3 gap-2 p-1 m-4 rounded-full ${GLASS_SOFT}`}>
              <TabsTrigger value="cards" className={`${PILL} border-0`}>Cards</TabsTrigger>
              <TabsTrigger value="table" className={`${PILL} border-0`}>Table</TabsTrigger>
              <TabsTrigger value="tests" className={`${PILL} border-0`}>Tests</TabsTrigger>
            </TabsList>
            <TabsContent value="cards" className="p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {insights.map(i => (
                <HcpCard key={i.hcp_id} data={i} company={companySelection} product={productSelection} useAI={useAI} geminiKey={geminiKey} />
              ))}
              {!insights.length && <p className="p-4 text-sm text-white/70 col-span-full text-center">Upload a CSV to see results.</p>}
            </TabsContent>
            <TabsContent value="table" className="p-4">
              <div className={`overflow-auto w-full rounded-2xl ${GLASS_SOFT}`}>
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left border-b border-white/20">{"HCP ID,Specialty,Site,TA,Patients,Recent,Upcoming,New %,Top Drug,Last Seen,Next Appt,Spend".split(",").map(h => <th key={h} className="p-3 pr-4 font-semibold text-white/80">{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {insights.map(i => (
                      <tr key={i.hcp_id} className="border-b border-white/10 hover:bg-white/5">
                        <td className="p-3 pr-4 font-medium">{i.hcp_id}</td>
                        <td className="p-3 pr-4 text-white/80">{i.hcp_specialty}</td>
                        <td className="p-3 pr-4 text-white/80">{i.site_of_care}</td>
                        <td className="p-3 pr-4 text-white/80">{i.ta}</td>
                        <td className="p-3 pr-4 text-white/80">{i.patients}</td>
                        <td className="p-3 pr-4 text-white/80">{i.recentPatients}</td>
                        <td className="p-3 pr-4 text-white/80">{i.upcomingPatients}</td>
                        <td className="p-3 pr-4 text-white/80">{pctFmt(i.newPatientShare)}</td>
                        <td className="p-3 pr-4 text-white/80">{i.topDrugByCount?.drug_name || "—"}</td>
                        <td className="p-3 pr-4 text-white/80">{dateFmt(i.lastSeenMax)}</td>
                        <td className="p-3 pr-4 text-white/80">{dateFmt(i.nextApptMin)}</td>
                        <td className="p-3 pr-4 text-white/80">${numberFmt(i.paidAmountSum)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            <TabsContent value="tests" className="p-4">
              <TestPanel chatConfigured={!!chatEndpoint} />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}

function HcpCard({ data, company, product, useAI, geminiKey }) {
  const [open, setOpen] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState(null)
  const [tips, setTips] = useState(null)

  useEffect(() => {
    if (!open) return; const ac = new AbortController(); let cancelled = false;
    (async () => {
      setAiLoading(true); setAiError(null);
      try {
        let out = null
        if (useAI && geminiKey && geminiKey !== "YOUR_GEMINI_API_KEY_HERE") out = await generateWithGemini(geminiKey, data, company, product, ac.signal)
        if (!out || !out.length) out = buildNBAFallback(data, company, product)
        if (!cancelled) setTips(out)
      } catch (e) {
        if (!cancelled) { setAiError(e?.message || 'Failed to generate'); setTips(buildNBAFallback(data, company, product)) }
      } finally { if (!cancelled) setAiLoading(false) }
    })()
    return () => { cancelled = true; ac.abort() }
  }, [open, useAI, geminiKey, company, product, data])

  return (
    <Card className={`hover:shadow-xl transition-all rounded-2xl ${GLASS_SOFT} flex flex-col`}>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-base text-white">HCP {data.hcp_id}</CardTitle>
            <div className="text-xs text-white/70">{data.hcp_specialty || "—"} • {data.site_of_care || "—"}</div>
            <div className="mt-2 flex items-center flex-wrap gap-2">
              <Badge className={`${PILL} px-2 bg-indigo-500/30 border-indigo-400/50`}>{data.ta || "TA"}</Badge>
              {data.upcomingPatients > 0 && <Badge className={`${PILL} px-2 bg-green-500/30 border-green-400/50`}>Upcoming: {data.upcomingPatients}</Badge>}
              {data.recentPatients > 0 && <Badge className={`${PILL} px-2 bg-blue-500/30 border-blue-400/50`}>Recent: {data.recentPatients}</Badge>}
            </div>
          </div>
          <div title={`Last seen: ${dateFmt(data.lastSeenMax)} • Next appt: ${dateFmt(data.nextApptMin)}`}>
            <Info className="h-4 w-4 text-white/60 cursor-pointer" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2 text-xs">
            <Kpi label="Patients" value={numberFmt(data.patients)} />
            <Kpi label="New patient %" value={pctFmt(data.newPatientShare)} />
            <Kpi label="Top drug" value={data.topDrugByCount?.drug_name || "—"} />
          </div>
        </div>
        <Button className={`${PILL} w-full mt-4 bg-indigo-500/50 hover:bg-indigo-500/80`} onClick={() => setOpen(true)}><Eye className="h-4 w-4 mr-2" /> Rep Plan & Details</Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className={`w-full h-full sm:max-w-3xl sm:h-auto p-0 ${DIALOG_GLASS}`}>
            <DialogHeader>
              <DialogTitle>Rep plan for HCP {data.hcp_id}</DialogTitle>
              <Button onClick={() => setOpen(false)} className="absolute top-4 right-4 p-1 bg-white/10 hover:bg-white/20 rounded-full"><X className="h-4 w-4"/></Button>
            </DialogHeader>
            <div className="p-6 pt-0 space-y-4 text-sm max-h-[calc(100vh-80px)] overflow-y-auto">
              <div className={`p-4 rounded-2xl ${GLASS_SOFT}`}>
                <div className="font-medium mb-2 text-white">Snapshot</div>
                <ul className="list-disc pl-5 space-y-1 text-white/80">
                  <li>Specialty: {data.hcp_specialty || "—"}</li>
                  <li>Site: {data.site_of_care || "—"}</li>
                  <li>Patients (total / recent / upcoming): {data.patients} / {data.recentPatients} / {data.upcomingPatients}</li>
                  <li>New patient share: {pctFmt(data.newPatientShare)}</li>
                  <li>Top drug: {data.topDrugByCount?.drug_name || "—"}</li>
                  <li>Last seen: {dateFmt(data.lastSeenMax)} • Next appt: {dateFmt(data.nextApptMin)}</li>
                </ul>
              </div>
              <div className={`p-4 rounded-2xl ${GLASS_SOFT}`}>
                <div className="font-medium mb-2 text-white">Hyper-personalised talking points</div>
                {aiLoading && <div className="text-xs italic text-white/70">Generating…</div>}
                {aiError && <div className="text-xs text-red-400">{aiError}</div>}
                <ol className="list-decimal pl-5 space-y-1 text-white/80">{(tips || buildNBAFallback(data, company, product)).map((t, idx) => <li key={idx}>{t}</li>)}</ol>
                {(!geminiKey || geminiKey === "YOUR_GEMINI_API_KEY_HERE") && useAI && (<div className="text-[11px] opacity-70 mt-2">Using fallback heuristics (no Gemini key configured).</div>)}
              </div>
              <div className={`p-4 rounded-2xl ${GLASS_SOFT}`}>
                <div className="font-medium mb-2 text-white">Suggested outreach cadence</div>
                <ul className="list-disc pl-5 space-y-1 text-white/80">
                  <li><strong>T-72 to T-24 hours</strong>: Short email referencing 1–2 patients due (no PHI), attach two-slide summary.</li>
                  <li><strong>T-24 to T-0</strong>: WhatsApp/text with single data point + PDF link; request 10-minute hall consult.</li>
                  <li><strong>Post-visit</strong>: Capture feedback; log objections; schedule CME invite if interest shown.</li>
                </ul>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

function Kpi({ label, value }) {
  return (
    <div className={`p-3 rounded-lg ${GLASS_SOFT}`}>
      <div className="text-[11px] text-white/60">{label}</div>
      <div className="text-base font-bold tracking-tight text-white">{value}</div>
    </div>
  )
}

function TestPanel({ chatConfigured }) {
  const today = new Date("2025-08-09")
  const mk = (over) => ({ claim_id: "c", encounter_id: "e", claim_date: "2025-08-01", hcp_id: "H1", hcp_specialty: "Medical Oncology", site_of_care: "Hospital Outpatient", ta: "Oncology:NSCLC", drug_name: "Pembrolizumab", drug_class: "Immunotherapy", paid_amount: "1000", new_patient_flag: "N", last_seen_date: "2025-08-05", next_appt_date: "2025-08-15", ...over })

  const rows = [
    mk({}),
    mk({ drug_name: "Carboplatin", drug_class: "Chemotherapy" }),
    mk({ new_patient_flag: "Y" }),
    mk({ hcp_id: "H2", ta: "Oncology:Breast", drug_name: "Trastuzumab", drug_class: "Targeted", last_seen_date: "2025-08-02", next_appt_date: "2025-08-20" }),
    mk({ hcp_id: "H3", ta: "Oncology:NSCLC", last_seen_date: "31/07/2025", next_appt_date: "01/09/2025", drug_name: "Docetaxel", drug_class: "Chemotherapy" }),
  ]

  const nsclc = aggregateByHcp(rows, "NSCLC", today, 30, 21)
  const all = aggregateByHcp(rows, null, today, 30, 21)

  const tests = []
  tests.push({ name: "NSCLC filter returns H1 & H3 only", pass: nsclc.length === 2 && nsclc.some(x => x.hcp_id === 'H1') && nsclc.some(x => x.hcp_id === 'H3'), detail: `got len=${nsclc.length}` })
  tests.push({ name: "All filter returns all HCPs", pass: all.length === 3, detail: `got len=${all.length}` })
  tests.push({ name: "New patient share computed", pass: nsclc[0]?.newPatientShare !== undefined })
  tests.push({ name: "Upcoming patient counted", pass: nsclc.some(h => h.upcomingPatients >= 1) })
  tests.push({ name: "Drug class mix tallied", pass: !!nsclc[0]?.drugClassMix['Immunotherapy'] || !!nsclc[0]?.drugClassMix['Chemotherapy'] })
  const map = buildCompanyProductMap(rows); const merckProducts = map['Merck'] || new Set(); const bmsProducts = map['Bristol Myers Squibb'] || new Set()
  tests.push({ name: "Curated map contains expected products", pass: merckProducts.has('Keytruda') && bmsProducts.has('Opdivo') && bmsProducts.has('Opdualag') })
  const dmy = parseDate("01/09/2025"); tests.push({ name: "parseDate supports dd/mm/yyyy", pass: !!dmy && dmy.getFullYear() === 2025 && (dmy.getMonth() + 1) === 9 && dmy.getDate() === 1 })
  tests.push({ name: "Chat fallback works when not configured", pass: !chatConfigured && typeof chatFallback("Hello", { ta: "NSCLC", company: "Merck", product: "Keytruda" }) === 'string' })
  tests.push({ name: "Sanitize product clears invalid selection", pass: sanitizeProductSelection(rows, 'Merck', 'Opdivo') === null })
  tests.push({ name: "parseDate returns null for garbage", pass: parseDate("n/a") === null })
  tests.push({ name: "NBA fallback yields bullets", pass: Array.isArray(buildNBAFallback(nsclc[0], 'Merck', 'Keytruda')) && buildNBAFallback(nsclc[0], 'Merck', 'Keytruda').length > 0 })

  const allPass = tests.every(t => t.pass)
  return (
    <div className="space-y-4">
      <div className="text-sm">Checks for filtering, aggregation, messaging, and options logic.</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {tests.map((t, idx) => (
          <div key={idx} className={`p-3 rounded-2xl ${t.pass ? 'bg-emerald-900/40' : 'bg-rose-900/40'} backdrop-blur`}>
            <div className="font-medium text-sm">{t.name}</div>
            <div className="text-xs opacity-80">{t.pass ? 'PASS' : 'FAIL'}{t.detail ? ` — ${t.detail}` : ''}</div>
          </div>
        ))}
      </div>
      <div className="text-sm font-medium">Overall: {allPass ? 'ALL PASS ✅' : 'CHECK FAILURES ❌'}</div>
    </div>
  )
}

export default App
