/* Enterprise seed data for the AI Command Center (software-only, zero-hardware scope). */

export type Status = "active" | "paused" | "draft" | "error";

const at = <T,>(arr: readonly T[], i: number): T => arr[((i % arr.length) + arr.length) % arr.length] as T;

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/* ------------------------------------------------------------------ */
/* 43 business functions                                               */
/* ------------------------------------------------------------------ */

export type Department = {
  name: string;
  slug: string;
  cluster: string;
  headcount: number;
  automations: number;
  agents: number;
  adoption: number;
  hoursSaved: number;
  annualSavings: number;
  maturity: "Piloting" | "Scaling" | "Optimised" | "Assessment";
  copilot: string;
  kpis: { label: string; value: string; delta: number }[];
};

const departmentSeed: [string, string][] = [
  ["Executive Management", "Leadership"],
  ["Board & Governance", "Leadership"],
  ["Strategy & Business Planning", "Leadership"],
  ["Corporate Communications", "Leadership"],
  ["Sales & Marketing", "Commercial"],
  ["Domestic Sales", "Commercial"],
  ["Export Sales", "Commercial"],
  ["Tendering & Bidding", "Commercial"],
  ["Customer Service", "Commercial"],
  ["Business Development", "Commercial"],
  ["Contract Management", "Commercial"],
  ["Pricing & Commercial Desk", "Commercial"],
  ["Procurement & Purchase", "Supply Chain"],
  ["Vendor Management", "Supply Chain"],
  ["Raw Material Planning", "Supply Chain"],
  ["Stores & Inventory", "Supply Chain"],
  ["Warehouse Operations", "Supply Chain"],
  ["Dispatch & Despatch Desk", "Supply Chain"],
  ["Logistics & Transport", "Supply Chain"],
  ["Import & Export Documentation", "Supply Chain"],
  ["Production Planning", "Manufacturing"],
  ["Melting Shop Documentation", "Manufacturing"],
  ["Rolling Mill Documentation", "Manufacturing"],
  ["Heat & Batch Traceability", "Manufacturing"],
  ["Maintenance Documentation", "Manufacturing"],
  ["Engineering & Design Docs", "Manufacturing"],
  ["Quality Assurance", "Quality"],
  ["Quality Control & Lab", "Quality"],
  ["Metallurgy & Grade Development", "Quality"],
  ["Customer Complaints & CAPA", "Quality"],
  ["Certification & Standards", "Quality"],
  ["Finance & Accounts", "Finance"],
  ["Accounts Payable", "Finance"],
  ["Accounts Receivable", "Finance"],
  ["Costing & MIS", "Finance"],
  ["Taxation & GST", "Finance"],
  ["Treasury & Working Capital", "Finance"],
  ["Internal Audit", "Finance"],
  ["Human Resources", "Corporate"],
  ["Payroll & Compensation", "Corporate"],
  ["Learning & Development", "Corporate"],
  ["Legal & Compliance", "Corporate"],
  ["IT & Digital", "Corporate"],
];

const maturities: Department["maturity"][] = ["Assessment", "Piloting", "Scaling", "Optimised"];

export const departments: Department[] = departmentSeed.map(([name, cluster], i) => {
  const r = (n: number) => ((i * 37 + n * 17) % 100) / 100;
  const automations = 3 + Math.round(r(1) * 8);
  return {
    name,
    slug: slugify(name),
    cluster,
    headcount: 6 + Math.round(r(2) * 120),
    automations,
    agents: 1 + Math.round(r(3) * 4),
    adoption: 42 + Math.round(r(4) * 55),
    hoursSaved: 300 + Math.round(r(5) * 4200),
    annualSavings: 1200000 + Math.round(r(6) * 34000000),
    maturity: at(maturities, i),
    copilot: `${name.split(" ")[0]} Copilot`,
    kpis: [
      { label: "Automation coverage", value: `${38 + Math.round(r(7) * 55)}%`, delta: +(r(8) * 14 - 3).toFixed(1) as unknown as number },
      { label: "Cycle time", value: `${(1 + r(9) * 8).toFixed(1)} d`, delta: -(r(1) * 22).toFixed(1) as unknown as number },
      { label: "AI accuracy", value: `${(90 + r(2) * 9).toFixed(1)}%`, delta: +(r(3) * 4).toFixed(1) as unknown as number },
      { label: "Docs / month", value: `${(0.4 + r(4) * 9).toFixed(1)}k`, delta: +(r(5) * 30).toFixed(1) as unknown as number },
    ],
  };
});

export const departmentBySlug = (slug: string) => departments.find((d) => d.slug === slug);

/* ------------------------------------------------------------------ */
/* AI agents                                                           */
/* ------------------------------------------------------------------ */

export type Agent = {
  name: string;
  slug: string;
  department: string;
  category: string;
  status: Status;
  owner: string;
  model: string;
  accuracy: number;
  runs: number;
  hoursSaved: number;
  monthlyCost: number;
  description: string;
  systems: string[];
  permissions: string[];
  knowledge: string[];
};

const agentSeed: [string, string, string][] = [
  ["Executive Copilot", "Executive Management", "Executive"],
  ["Board Report Generator", "Board & Governance", "Executive"],
  ["Management Reporting Assistant", "Strategy & Business Planning", "Executive"],
  ["Sales Copilot", "Sales & Marketing", "Commercial"],
  ["Quotation Generator", "Pricing & Commercial Desk", "Commercial"],
  ["Tender Analysis Agent", "Tendering & Bidding", "Commercial"],
  ["Proposal Generator", "Business Development", "Commercial"],
  ["CRM Automation", "Sales & Marketing", "Commercial"],
  ["Marketing Assistant", "Corporate Communications", "Commercial"],
  ["Business Development Agent", "Business Development", "Commercial"],
  ["Customer Support Agent", "Customer Service", "Commercial"],
  ["Complaint Analytics Agent", "Customer Complaints & CAPA", "Quality"],
  ["Specification Matching Agent", "Metallurgy & Grade Development", "Quality"],
  ["Commercial Copilot", "Contract Management", "Commercial"],
  ["Procurement Copilot", "Procurement & Purchase", "Supply Chain"],
  ["Vendor Intelligence", "Vendor Management", "Supply Chain"],
  ["Vendor Evaluation", "Vendor Management", "Supply Chain"],
  ["Purchase Order Agent", "Procurement & Purchase", "Supply Chain"],
  ["Contract Review Agent", "Legal & Compliance", "Corporate"],
  ["Inventory Assistant", "Stores & Inventory", "Supply Chain"],
  ["Warehouse Agent", "Warehouse Operations", "Supply Chain"],
  ["Dispatch Documentation Agent", "Dispatch & Despatch Desk", "Supply Chain"],
  ["Logistics Copilot", "Logistics & Transport", "Supply Chain"],
  ["Transport Allocation Agent", "Logistics & Transport", "Supply Chain"],
  ["Finance Assistant", "Finance & Accounts", "Finance"],
  ["Accounts Payable Agent", "Accounts Payable", "Finance"],
  ["Accounts Receivable Agent", "Accounts Receivable", "Finance"],
  ["Invoice Processing Agent", "Accounts Payable", "Finance"],
  ["Expense Audit Agent", "Internal Audit", "Finance"],
  ["Cost Analysis Agent", "Costing & MIS", "Finance"],
  ["Budget Assistant", "Treasury & Working Capital", "Finance"],
  ["Quality Copilot", "Quality Assurance", "Quality"],
  ["Mill Test Certificate Agent", "Quality Control & Lab", "Quality"],
  ["Inspection Assistant", "Quality Assurance", "Quality"],
  ["CAPA Assistant", "Customer Complaints & CAPA", "Quality"],
  ["NCR Assistant", "Quality Assurance", "Quality"],
  ["ISO Documentation Assistant", "Certification & Standards", "Quality"],
  ["Laboratory Documentation Agent", "Quality Control & Lab", "Quality"],
  ["Heat Certificate Assistant", "Heat & Batch Traceability", "Manufacturing"],
  ["Compliance Assistant", "Legal & Compliance", "Corporate"],
  ["Legal Copilot", "Legal & Compliance", "Corporate"],
  ["HR Assistant", "Human Resources", "Corporate"],
  ["Recruitment Assistant", "Human Resources", "Corporate"],
  ["Payroll Assistant", "Payroll & Compensation", "Corporate"],
  ["Training Assistant", "Learning & Development", "Corporate"],
  ["Policy Assistant", "Human Resources", "Corporate"],
  ["Engineering Documentation Agent", "Engineering & Design Docs", "Manufacturing"],
  ["Maintenance Documentation Agent", "Maintenance Documentation", "Manufacturing"],
  ["Planning Documentation Assistant", "Production Planning", "Manufacturing"],
  ["Knowledge Agent", "IT & Digital", "Platform"],
  ["Company Brain Agent", "IT & Digital", "Platform"],
  ["Document Intelligence Agent", "IT & Digital", "Platform"],
  ["Meeting Assistant", "Executive Management", "Executive"],
  ["Workflow Agent", "IT & Digital", "Platform"],
  ["Approval Agent", "IT & Digital", "Platform"],
  ["Email Assistant", "Corporate Communications", "Platform"],
  ["Administration Assistant", "IT & Digital", "Platform"],
  ["Export Documentation Agent", "Import & Export Documentation", "Supply Chain"],
];

const models = ["GPT-5.5", "Claude Sonnet 4.6", "Gemini 3.6 Flash", "Azure OpenAI o5"];
const owners = [
  "R. Sharma",
  "A. Iyer",
  "P. Deshmukh",
  "S. Kulkarni",
  "M. Banerjee",
  "V. Nair",
  "K. Gupta",
  "N. Rao",
];
const statuses: Status[] = ["active", "active", "active", "paused", "draft", "active", "error"];

export const agents: Agent[] = agentSeed.map(([name, department, category], i) => {
  const r = (n: number) => ((i * 29 + n * 13) % 100) / 100;
  return {
    name,
    slug: slugify(name),
    department,
    category,
    status: at(statuses, i),
    owner: at(owners, i),
    model: at(models, i),
    accuracy: +(89 + r(1) * 10).toFixed(1),
    runs: 240 + Math.round(r(2) * 18000),
    hoursSaved: 120 + Math.round(r(3) * 2600),
    monthlyCost: 40 + Math.round(r(4) * 900),
    description: `${name} automates document, analysis and drafting work for ${department} using the Company Brain as its grounded knowledge layer.`,
    systems: ["SAP S/4HANA", "SharePoint", "Microsoft 365", "PostgreSQL", "CRM"].slice(
      0,
      2 + Math.round(r(5) * 3),
    ),
    permissions: ["Read: department library", "Write: drafts only", "Human approval required"],
    knowledge: ["Company Brain", "SOP library", "Historical records", "Standards library"].slice(
      0,
      2 + Math.round(r(6) * 2),
    ),
  };
});

export const agentBySlug = (slug: string) => agents.find((a) => a.slug === slug);

/* ------------------------------------------------------------------ */
/* 231 automation opportunities                                        */
/* ------------------------------------------------------------------ */

export type Automation = {
  id: string;
  title: string;
  department: string;
  businessFunction: string;
  complexity: "Low" | "Medium" | "High";
  priority: "P1" | "P2" | "P3";
  status: "Live" | "In Build" | "Approved" | "Backlog" | "Piloting";
  phase: "Phase 1 · Quick Wins" | "Phase 2 · Core" | "Phase 3 · Scale" | "Phase 4 · Transform";
  hoursSaved: number;
  annualSavings: number;
  roi: number;
  owner: string;
  tech: string[];
};

const verbs = [
  "Automated extraction of",
  "AI drafting of",
  "Intelligent validation of",
  "Auto-classification of",
  "Summarisation of",
  "Anomaly detection in",
  "Auto-routing of",
  "Comparison engine for",
  "Knowledge retrieval for",
  "Report generation for",
  "Reconciliation of",
];
const objects = [
  "mill test certificates",
  "purchase orders",
  "supplier quotations",
  "RFQ documents",
  "vendor invoices",
  "delivery challans",
  "goods receipt notes",
  "weighbridge slips",
  "packing lists",
  "export documents",
  "customer contracts",
  "tender documents",
  "inspection reports",
  "lab reports",
  "SOP documents",
  "CAPA records",
  "NCR records",
  "safety reports",
  "expense claims",
  "meeting minutes",
  "customer emails",
  "heat certificates",
  "rate contracts",
  "shift log books",
  "production reports",
  "grade specifications",
];
const statusPool: Automation["status"][] = [
  "Live",
  "In Build",
  "Approved",
  "Backlog",
  "Piloting",
  "Live",
  "Backlog",
];
const phases: Automation["phase"][] = [
  "Phase 1 · Quick Wins",
  "Phase 2 · Core",
  "Phase 3 · Scale",
  "Phase 4 · Transform",
];
const techPool = [
  "LLM",
  "RAG",
  "OCR",
  "Document AI",
  "Classification",
  "Knowledge Graph",
  "Vector Search",
  "Workflow Engine",
  "NLP Extraction",
];

export const automations: Automation[] = Array.from({ length: 231 }, (_, i) => {
  const r = (n: number) => ((i * 41 + n * 23) % 100) / 100;
  const dept = at(departments, i);
  const title = `${at(verbs, i)} ${at(objects, i * 3)}`;
  return {
    id: `AUT-${String(i + 1).padStart(3, "0")}`,
    title: title.charAt(0).toUpperCase() + title.slice(1),
    department: dept.name,
    businessFunction: dept.cluster,
    complexity: at(["Low", "Medium", "High"] as const, i),
    priority: at(["P1", "P2", "P3"] as const, Math.floor(r(1) * 3)),
    status: at(statusPool, i),
    phase: at(phases, i),
    hoursSaved: 80 + Math.round(r(2) * 3200),
    annualSavings: 400000 + Math.round(r(3) * 12000000),
    roi: 1.4 + +(r(4) * 7).toFixed(1),
    owner: at(owners, i),
    tech: techPool.slice(i % 4, (i % 4) + 3),
  };
});

/* ------------------------------------------------------------------ */
/* Executive metrics & charts                                          */
/* ------------------------------------------------------------------ */

export const inr = (n: number) => {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
};

export const enterpriseKpis = [
  { label: "AI Adoption", value: "78.4%", delta: 6.2, hint: "of eligible users weekly active" },
  { label: "Active AI Agents", value: "51", delta: 4, hint: "of 58 deployed" },
  { label: "Active Copilots", value: "43", delta: 3, hint: "one per business function" },
  { label: "Running Workflows", value: "312", delta: 18, hint: "orchestrated this week" },
  { label: "Documents Processed", value: "1.28 M", delta: 12.4, hint: "trailing 12 months" },
  { label: "Automation %", value: "64.1%", delta: 5.1, hint: "of eligible process steps" },
  { label: "Hours Saved", value: "412,600", delta: 9.8, hint: "annualised" },
  { label: "Monthly Savings", value: "₹4.31 Cr", delta: 7.3, hint: "run-rate" },
  { label: "Annual Savings", value: "₹51.7 Cr", delta: 11.2, hint: "projected FY" },
  { label: "FTE Saved", value: "198", delta: 8, hint: "redeployed capacity" },
  { label: "Executive Productivity", value: "+31%", delta: 4.4, hint: "hours on decisions" },
  { label: "AI Accuracy", value: "96.2%", delta: 1.1, hint: "human-verified sample" },
  { label: "ROI", value: "6.4x", delta: 0.8, hint: "programme to date" },
  { label: "Risk Score", value: "22 / 100", delta: -6, hint: "lower is better" },
  { label: "Compliance Score", value: "94.7%", delta: 2.3, hint: "ISO + statutory" },
  { label: "User Adoption", value: "3,842", delta: 214, hint: "monthly active users" },
  { label: "Pending Approvals", value: "18", delta: -5, hint: "human-in-the-loop queue" },
];

export const salesPerformance = [
  { month: "Apr", domestic: 412, export: 118, target: 500 },
  { month: "May", domestic: 438, export: 132, target: 520 },
  { month: "Jun", domestic: 401, export: 145, target: 530 },
  { month: "Jul", domestic: 466, export: 151, target: 540 },
  { month: "Aug", domestic: 489, export: 162, target: 560 },
  { month: "Sep", domestic: 512, export: 158, target: 570 },
  { month: "Oct", domestic: 534, export: 176, target: 590 },
  { month: "Nov", domestic: 561, export: 189, target: 610 },
  { month: "Dec", domestic: 588, export: 194, target: 630 },
];

export const procurementSpend = [
  { month: "Apr", scrap: 210, alloys: 62, refractory: 24, consumables: 18 },
  { month: "May", scrap: 226, alloys: 58, refractory: 27, consumables: 19 },
  { month: "Jun", scrap: 198, alloys: 71, refractory: 22, consumables: 21 },
  { month: "Jul", scrap: 241, alloys: 66, refractory: 29, consumables: 17 },
  { month: "Aug", scrap: 255, alloys: 74, refractory: 25, consumables: 22 },
  { month: "Sep", scrap: 233, alloys: 69, refractory: 31, consumables: 20 },
];

export const gradeMix = [
  { name: "TMT Fe 550D", value: 34 },
  { name: "Structural E350", value: 21 },
  { name: "Alloy 42CrMo4", value: 14 },
  { name: "Stainless 304L", value: 12 },
  { name: "Wire Rod C-Mn", value: 11 },
  { name: "Flat HR Coil", value: 8 },
];

export const mtcStatus = [
  { name: "Auto-verified", value: 1284 },
  { name: "Pending review", value: 176 },
  { name: "Deviation flagged", value: 63 },
  { name: "Customer approved", value: 942 },
];

export const automationTrend = Array.from({ length: 12 }, (_, i) => ({
  month: at(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], i),
  automated: 18 + i * 4 + (i % 3),
  manual: 82 - i * 4 - (i % 3),
  hours: 8000 + i * 2600,
}));

export const workingCapital = [
  { month: "Apr", dso: 62, dpo: 48, dio: 41 },
  { month: "May", dso: 59, dpo: 51, dio: 39 },
  { month: "Jun", dso: 57, dpo: 53, dio: 38 },
  { month: "Jul", dso: 54, dpo: 55, dio: 36 },
  { month: "Aug", dso: 51, dpo: 56, dio: 35 },
  { month: "Sep", dso: 48, dpo: 58, dio: 33 },
];

export const departmentProductivity = departments.slice(0, 12).map((d) => ({
  name: d.name.split(" ")[0],
  adoption: d.adoption,
  hours: Math.round(d.hoursSaved / 100),
}));

/* ------------------------------------------------------------------ */
/* Approvals, documents, workflows, heats, integrations                */
/* ------------------------------------------------------------------ */

export type Approval = {
  id: string;
  title: string;
  type: string;
  requester: string;
  department: string;
  value: string;
  risk: "Low" | "Medium" | "High";
  aiRecommendation: "Approve" | "Review" | "Reject";
  confidence: number;
  age: string;
};

export const approvals: Approval[] = [
  ["APR-2041", "Quotation Q-88421 · Larsen Infra · 1,200 MT TMT Fe 550D", "Quotation", "Sales Copilot", "Domestic Sales", "₹9.84 Cr", "Medium", "Approve", 94, "2h"],
  ["APR-2042", "PO-55219 · Heavy melting scrap 2,400 MT", "Purchase Order", "Procurement Copilot", "Procurement & Purchase", "₹8.16 Cr", "Low", "Approve", 97, "4h"],
  ["APR-2043", "Deviation on MTC H-24188 · S content 0.043%", "Quality Deviation", "MTC Agent", "Quality Control & Lab", "—", "High", "Review", 71, "1h"],
  ["APR-2044", "Vendor onboarding · Shakti Ferro Alloys Pvt Ltd", "Vendor", "Vendor Intelligence", "Vendor Management", "—", "Medium", "Review", 82, "1d"],
  ["APR-2045", "Credit limit increase · Meghna Structurals", "Credit", "Finance Assistant", "Accounts Receivable", "₹2.50 Cr", "High", "Review", 68, "6h"],
  ["APR-2046", "Export documentation set · Shipment EXP-3391 (Dubai)", "Export Docs", "Export Documentation Agent", "Import & Export Documentation", "$412K", "Low", "Approve", 96, "3h"],
  ["APR-2047", "CAPA closure · Complaint CC-1187 rib height variance", "CAPA", "CAPA Assistant", "Customer Complaints & CAPA", "—", "Medium", "Approve", 89, "2d"],
  ["APR-2048", "Rate contract renewal · Ferro Silicon (annual)", "Contract", "Contract Review Agent", "Procurement & Purchase", "₹14.2 Cr", "High", "Review", 76, "5h"],
  ["APR-2049", "Invoice mismatch INV-77401 · 3-way match failed", "Invoice", "Invoice Processing Agent", "Accounts Payable", "₹41.7 L", "Medium", "Reject", 91, "30m"],
  ["APR-2050", "Board pack · Q3 FY performance review", "Report", "Board Report Generator", "Board & Governance", "—", "Low", "Approve", 93, "8h"],
].map(
  ([id, title, type, requester, department, value, risk, aiRecommendation, confidence, age]) =>
    ({
      id,
      title,
      type,
      requester,
      department,
      value,
      risk,
      aiRecommendation,
      confidence,
      age,
    }) as Approval,
);

export type DocType = {
  name: string;
  processed: number;
  accuracy: number;
  auto: number;
};

export const docTypes: DocType[] = [
  ["Mill Test Certificates", 48210, 98.4, 96],
  ["Heat Test Certificates", 31480, 97.9, 94],
  ["Purchase Orders", 27640, 99.1, 98],
  ["Supplier Quotations", 21980, 96.2, 88],
  ["RFQs", 14320, 95.4, 84],
  ["Invoices", 62110, 99.3, 97],
  ["Delivery Challans", 39870, 98.6, 95],
  ["Goods Receipt Notes", 28430, 98.1, 93],
  ["Weighbridge Slips", 51240, 99.5, 99],
  ["Packing Lists", 18760, 97.4, 92],
  ["Export Documents", 9840, 96.8, 87],
  ["Contracts", 4210, 94.1, 71],
  ["Tender Documents", 3180, 93.6, 66],
  ["Inspection Reports", 16720, 97.2, 90],
  ["Lab Reports", 22410, 98.0, 93],
  ["SOPs", 2870, 95.9, 78],
  ["CAPA Records", 1940, 96.4, 81],
  ["NCR Records", 2360, 96.1, 80],
  ["Safety Reports", 5120, 97.0, 86],
  ["Expense Claims", 33180, 98.8, 96],
  ["Meeting Minutes", 7640, 94.8, 83],
  ["Emails", 184300, 97.6, 91],
].map(([name, processed, accuracy, auto]) => ({ name, processed, accuracy, auto }) as DocType);

export const knowledgeSources = [
  { name: "SAP S/4HANA", docs: 412000, status: "Synced", type: "ERP" },
  { name: "SAP ECC", docs: 128400, status: "Synced", type: "ERP" },
  { name: "Oracle ERP", docs: 64200, status: "Synced", type: "ERP" },
  { name: "Microsoft Dynamics", docs: 31800, status: "Partial", type: "ERP" },
  { name: "SharePoint", docs: 289000, status: "Synced", type: "Content" },
  { name: "Outlook / Exchange", docs: 184300, status: "Synced", type: "Email" },
  { name: "CRM", docs: 92100, status: "Synced", type: "Commercial" },
  { name: "SQL Server", docs: 51200, status: "Synced", type: "Database" },
  { name: "PostgreSQL", docs: 44800, status: "Synced", type: "Database" },
  { name: "Contracts vault", docs: 4210, status: "Synced", type: "Legal" },
  { name: "MTC / Heat archive", docs: 79690, status: "Synced", type: "Quality" },
  { name: "SOP & ISO library", docs: 6120, status: "Synced", type: "Quality" },
  { name: "Drawings & specs", docs: 23400, status: "Indexing", type: "Engineering" },
  { name: "Shift logs", docs: 41200, status: "Synced", type: "Production" },
  { name: "Laboratory reports", docs: 22410, status: "Synced", type: "Quality" },
  { name: "Historical quotations", docs: 68300, status: "Synced", type: "Commercial" },
];

export type Heat = {
  id: string;
  grade: string;
  standard: string;
  furnace: string;
  tonnage: number;
  c: number;
  mn: number;
  s: number;
  p: number;
  ys: number;
  uts: number;
  status: "Released" | "Hold" | "Under test" | "Dispatched";
  customer: string;
};

const grades: [string, string][] = [
  ["Fe 550D TMT", "IS 1786"],
  ["E350 Structural", "IS 2062"],
  ["42CrMo4", "EN 10083"],
  ["SS 304L", "ASTM A240"],
  ["C-Mn Wire Rod", "IS 7887"],
  ["HR Coil SAE 1006", "ASTM A1011"],
  ["Fe 500D TMT", "IS 1786"],
  ["S355J2", "EN 10025"],
];
const heatStatuses: Heat["status"][] = ["Released", "Hold", "Under test", "Dispatched"];
const customers = [
  "Larsen Infra",
  "Meghna Structurals",
  "Tata Projects",
  "Gulf Steel FZE",
  "NCC Ltd",
  "Shapoorji EPC",
];

export const heats: Heat[] = Array.from({ length: 28 }, (_, i) => {
  const r = (n: number) => ((i * 31 + n * 19) % 100) / 100;
  const [grade, standard] = at(grades, i);
  return {
    id: `H-24${String(100 + i * 7).padStart(3, "0")}`,
    grade,
    standard,
    furnace: `IF-${(i % 3) + 1}`,
    tonnage: 28 + Math.round(r(1) * 22),
    c: +(0.16 + r(2) * 0.22).toFixed(3),
    mn: +(0.7 + r(3) * 0.9).toFixed(3),
    s: +(0.018 + r(4) * 0.03).toFixed(3),
    p: +(0.016 + r(5) * 0.028).toFixed(3),
    ys: 520 + Math.round(r(6) * 90),
    uts: 610 + Math.round(r(7) * 110),
    status: at(heatStatuses, i),
    customer: at(customers, i),
  };
});

export const integrations = [
  { name: "SAP ECC", category: "ERP", status: "Connected", records: "128K" },
  { name: "SAP S/4HANA", category: "ERP", status: "Connected", records: "412K" },
  { name: "Oracle ERP", category: "ERP", status: "Connected", records: "64K" },
  { name: "Microsoft Dynamics", category: "ERP", status: "Degraded", records: "32K" },
  { name: "Salesforce CRM", category: "CRM", status: "Connected", records: "92K" },
  { name: "Microsoft 365", category: "Productivity", status: "Connected", records: "1.2M" },
  { name: "Google Workspace", category: "Productivity", status: "Available", records: "—" },
  { name: "SharePoint", category: "Content", status: "Connected", records: "289K" },
  { name: "Microsoft Teams", category: "Collaboration", status: "Connected", records: "48K" },
  { name: "Slack", category: "Collaboration", status: "Available", records: "—" },
  { name: "Power BI", category: "Analytics", status: "Connected", records: "212" },
  { name: "Tableau", category: "Analytics", status: "Available", records: "—" },
  { name: "PostgreSQL", category: "Database", status: "Connected", records: "44K" },
  { name: "SQL Server", category: "Database", status: "Connected", records: "51K" },
  { name: "MySQL", category: "Database", status: "Available", records: "—" },
  { name: "Supabase", category: "Database", status: "Available", records: "—" },
  { name: "REST APIs", category: "Custom", status: "Connected", records: "36 endpoints" },
];

export const workflowNodes = [
  "AI", "ERP", "Email", "SQL", "API", "Approval", "OCR", "Document AI", "PDF", "Excel",
  "Word", "Human Approval", "Notification", "Schedule", "Condition", "Loop", "Webhook",
  "LLM", "Company Brain",
];

export type Workflow = {
  id: string;
  name: string;
  department: string;
  runs: number;
  successRate: number;
  status: Status;
  nodes: string[];
  lastRun: string;
};

export const workflows: Workflow[] = [
  ["WF-101", "MTC ingestion → validation → customer portal", "Quality Control & Lab", 4820, 98.6, "active", ["Schedule", "OCR", "Document AI", "LLM", "Condition", "Human Approval", "Email"], "4 min ago"],
  ["WF-102", "RFQ → costing → quotation draft → approval", "Domestic Sales", 1284, 96.1, "active", ["Email", "Document AI", "Company Brain", "LLM", "Approval", "PDF"], "12 min ago"],
  ["WF-103", "Vendor invoice 3-way match → AP posting", "Accounts Payable", 9140, 99.2, "active", ["OCR", "ERP", "Condition", "SQL", "Notification"], "2 min ago"],
  ["WF-104", "Tender discovery → eligibility → bid pack", "Tendering & Bidding", 218, 92.4, "active", ["Webhook", "Document AI", "LLM", "Human Approval", "Word"], "1 h ago"],
  ["WF-105", "Dispatch doc set → e-way bill → transporter", "Dispatch & Despatch Desk", 6210, 97.8, "active", ["ERP", "LLM", "PDF", "API", "Notification"], "8 min ago"],
  ["WF-106", "Customer complaint → RCA → CAPA draft", "Customer Complaints & CAPA", 384, 94.7, "paused", ["Email", "LLM", "Company Brain", "Approval"], "3 d ago"],
  ["WF-107", "Monthly MIS pack generation", "Costing & MIS", 12, 100, "active", ["Schedule", "SQL", "Excel", "LLM", "Email"], "6 d ago"],
  ["WF-108", "New employee onboarding documentation", "Human Resources", 96, 98.9, "active", ["Condition", "Word", "Approval", "Notification"], "1 d ago"],
].map(
  ([id, name, department, runs, successRate, status, nodes, lastRun]) =>
    ({ id, name, department, runs, successRate, status, nodes, lastRun }) as Workflow,
);

export const executiveRoles = [
  { role: "Chairman", focus: "Group performance, capital allocation, governance", alerts: 2 },
  { role: "Board", focus: "Risk, compliance, strategic milestones", alerts: 1 },
  { role: "Managing Director", focus: "Growth, margin, transformation programme", alerts: 3 },
  { role: "CEO", focus: "Revenue, market share, customer intelligence", alerts: 2 },
  { role: "COO", focus: "Throughput, order fulfilment, dispatch", alerts: 4 },
  { role: "CFO", focus: "Working capital, cash flow, cost of production", alerts: 3 },
  { role: "Commercial Head", focus: "Pipeline, pricing, win rate, contracts", alerts: 5 },
  { role: "Plant Head", focus: "Yield documentation, quality, maintenance docs", alerts: 2 },
  { role: "Operations Head", focus: "Planning adherence, logistics, inventory", alerts: 3 },
  { role: "HR Head", focus: "Attrition, hiring, training compliance", alerts: 1 },
];

export const insights = [
  {
    title: "Scrap procurement price arbitrage detected",
    body: "Landed cost from Eastern cluster vendors is 4.1% below current PO mix. Shifting 30% of Q4 volume saves ₹2.7 Cr.",
    impact: "₹2.7 Cr",
    tone: "success" as const,
  },
  {
    title: "MTC deviation cluster on IF-2 heats",
    body: "17 heats in the last 30 days flagged for sulphur near upper limit. Recommend lab re-calibration documentation review.",
    impact: "Quality risk",
    tone: "warning" as const,
  },
  {
    title: "Receivables ageing concentration",
    body: "Top 5 customers hold 62% of >90 day receivables. AI drafted dunning sequence ready for CFO approval.",
    impact: "₹18.4 Cr",
    tone: "destructive" as const,
  },
  {
    title: "Tender win probability model refreshed",
    body: "Win rate on structural tenders rises 11 pts when quotation is issued within 36 hours. Quotation Generator SLA tightened.",
    impact: "+11 pts",
    tone: "info" as const,
  },
];

export const riskRegister = [
  ["RSK-01", "Customer specification mismatch on export orders", "Quality", "High", 82, "Specification Matching Agent"],
  ["RSK-02", "Rate contract expiry without renewal", "Procurement", "Medium", 54, "Contract Review Agent"],
  ["RSK-03", "GST input credit mismatch", "Finance", "High", 76, "Invoice Processing Agent"],
  ["RSK-04", "ISO 9001 surveillance audit readiness", "Compliance", "Medium", 48, "ISO Documentation Assistant"],
  ["RSK-05", "Single-source dependency on ferro alloys", "Supply Chain", "High", 71, "Vendor Intelligence"],
  ["RSK-06", "Hallucination risk on unreviewed AI drafts", "AI Governance", "Low", 22, "Guardrail Engine"],
  ["RSK-07", "Export documentation non-conformity", "Logistics", "Medium", 57, "Export Documentation Agent"],
  ["RSK-08", "Attrition in metallurgy team", "HR", "Medium", 44, "HR Assistant"],
].map(([id, title, area, severity, score, owner]) => ({ id, title, area, severity, score, owner }));

export const roadmap = [
  {
    phase: "Phase 1 · Quick Wins",
    window: "Month 0–3",
    focus: "Document Intelligence, Company Brain foundation, 42 automations",
    status: "Complete",
    progress: 100,
  },
  {
    phase: "Phase 2 · Core",
    window: "Month 4–9",
    focus: "Departmental copilots, approval workflows, 68 automations",
    status: "In progress",
    progress: 72,
  },
  {
    phase: "Phase 3 · Scale",
    window: "Month 10–18",
    focus: "Multi-plant rollout, agent marketplace, 74 automations",
    status: "Planned",
    progress: 21,
  },
  {
    phase: "Phase 4 · Transform",
    window: "Month 19–30",
    focus: "Autonomous workflows, decision intelligence, 47 automations",
    status: "Planned",
    progress: 4,
  },
];

export const plants = [
  "Integrated Plant · Angul",
  "Secondary Plant · Raipur",
  "Rolling Mill · Ghaziabad",
  "Wire Rod Plant · Hosur",
  "Coil Service Centre · Pune",
];
