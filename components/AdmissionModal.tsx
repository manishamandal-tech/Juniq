"use client";

import { useState, useEffect, useRef } from "react";
import {
  X, ChevronRight, ChevronLeft, Check,
  User, BookOpen, GraduationCap, PartyPopper,
  Phone, Mail, MapPin, Calendar, Upload,
  AlertCircle
} from "lucide-react";

/* ─── Types ─── */
interface FormData {
  // Step 1 — Personal
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  city: string;
  state: string;
  address: string;
  // Step 2 — Academic
  tenthBoard: string;
  tenthPercent: string;
  twelfthBoard: string;
  twelfthPercent: string;
  twelfthStream: string;
  entranceExam: string;
  entranceScore: string;
  // Step 3 — Programme
  level: string;
  programme: string;
  specialization: string;
  intake: string;
  mode: string;
  hostel: string;
  scholarship: string;
  howDidYouHear: string;
}

type FieldErrors = Partial<Record<keyof FormData, string>>;

/* ─── Constants ─── */
const STEPS = [
  { id: 1, label: "Personal", icon: User },
  { id: 2, label: "Academic", icon: BookOpen },
  { id: 3, label: "Programme", icon: GraduationCap },
  { id: 4, label: "Confirm", icon: Check },
];

const PROGRAMMES: Record<string, string[]> = {
  Undergraduate: ["BBA", "BBA (Hons)", "BCA", "BCA (Hons)", "B.Tech – CSE", "B.Tech – AI/ML", "B.Com", "B.Com (Hons)", "B.Sc – Forensic", "B.Sc – Quantum", "LL.B."],
  Postgraduate: ["MBA", "iMBA", "MCA", "M.Sc", "M.Com", "LL.M.", "M.Des"],
  Doctoral: ["Ph.D – Management", "Ph.D – Engineering", "Ph.D – Sciences", "Ph.D – Law"],
  Certificate: ["AI & Machine Learning", "Mobile App Development", "Cyber Security", "Data Analytics", "Cloud Computing", "Digital Marketing"],
};

const STATES = ["Gujarat", "Maharashtra", "Rajasthan", "Madhya Pradesh", "Delhi", "Karnataka", "Tamil Nadu", "Other"];
const BOARDS = ["CBSE", "ICSE", "Gujarat Board (GSEB)", "Maharashtra Board", "Other State Board", "IB", "Cambridge"];
const STREAMS = ["Science (PCM)", "Science (PCB)", "Commerce", "Arts / Humanities", "Vocational", "Other"];
const ENTRANCE = ["GUJCET", "JEE Main", "NEET", "CAT", "MAT", "CMAT", "None / Not Applicable"];

const INITIAL: FormData = {
  firstName: "", lastName: "", email: "", phone: "",
  dob: "", gender: "", city: "", state: "", address: "",
  tenthBoard: "", tenthPercent: "", twelfthBoard: "",
  twelfthPercent: "", twelfthStream: "", entranceExam: "",
  entranceScore: "", level: "", programme: "", specialization: "",
  intake: "2026-27", mode: "Regular", hostel: "No",
  scholarship: "No", howDidYouHear: "",
};

/* ─── Reusable input components ─── */
function InputField({
  label, name, type = "text", value, onChange, error, placeholder, required, children
}: {
  label: string; name: keyof FormData; type?: string;
  value: string; onChange: (n: keyof FormData, v: string) => void;
  error?: string; placeholder?: string; required?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-white/60 text-xs font-medium font-dm tracking-wide">
        {label}{required && <span className="text-jg-gold ml-0.5">*</span>}
      </label>
      {children ?? (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          placeholder={placeholder}
          className={`w-full bg-white/4 border rounded-xl px-4 py-3 text-white text-sm font-dm placeholder-white/20
            focus:outline-none focus:bg-white/6 transition-all duration-200
            ${error ? "border-red-500/50 focus:border-red-500/70" : "border-white/8 focus:border-jg-gold/40"}`}
        />
      )}
      {error && (
        <span className="flex items-center gap-1 text-red-400 text-xs font-dm">
          <AlertCircle className="w-3 h-3" />{error}
        </span>
      )}
    </div>
  );
}

function SelectField({
  label, name, value, onChange, options, error, required, placeholder
}: {
  label: string; name: keyof FormData; value: string;
  onChange: (n: keyof FormData, v: string) => void;
  options: string[]; error?: string; required?: boolean; placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-white/60 text-xs font-medium font-dm tracking-wide">
        {label}{required && <span className="text-jg-gold ml-0.5">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className={`w-full bg-[#0d0d1a] border rounded-xl px-4 py-3 text-sm font-dm
          focus:outline-none transition-all duration-200 appearance-none cursor-pointer
          ${value ? "text-white" : "text-white/25"}
          ${error ? "border-red-500/50 focus:border-red-500/70" : "border-white/8 focus:border-jg-gold/40"}`}
      >
        <option value="" disabled>{placeholder ?? `Select ${label}`}</option>
        {options.map(o => <option key={o} value={o} className="bg-[#0d0d1a] text-white">{o}</option>)}
      </select>
      {error && (
        <span className="flex items-center gap-1 text-red-400 text-xs font-dm">
          <AlertCircle className="w-3 h-3" />{error}
        </span>
      )}
    </div>
  );
}

/* ─── Step components ─── */
function Step1({ data, onChange, errors }: { data: FormData; onChange: (n: keyof FormData, v: string) => void; errors: FieldErrors }) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField label="First Name" name="firstName" value={data.firstName} onChange={onChange} error={errors.firstName} placeholder="e.g. Manisha" required />
        <InputField label="Last Name" name="lastName" value={data.lastName} onChange={onChange} error={errors.lastName} placeholder="e.g. Sharma" required />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField label="Email Address" name="email" type="email" value={data.email} onChange={onChange} error={errors.email} placeholder="you@email.com" required />
        <InputField label="Phone Number" name="phone" type="tel" value={data.phone} onChange={onChange} error={errors.phone} placeholder="+91 98765 43210" required />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField label="Date of Birth" name="dob" type="date" value={data.dob} onChange={onChange} error={errors.dob} required />
        <SelectField label="Gender" name="gender" value={data.gender} onChange={onChange} options={["Male", "Female", "Non-binary", "Prefer not to say"]} error={errors.gender} required />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField label="City" name="city" value={data.city} onChange={onChange} error={errors.city} placeholder="e.g. Ahmedabad" required />
        <SelectField label="State" name="state" value={data.state} onChange={onChange} options={STATES} error={errors.state} required />
      </div>
      <InputField label="Residential Address" name="address" value={data.address} onChange={onChange} placeholder="Street, Area, Pincode" />
    </div>
  );
}

function Step2({ data, onChange, errors }: { data: FormData; onChange: (n: keyof FormData, v: string) => void; errors: FieldErrors }) {
  return (
    <div className="space-y-5">
      {/* 10th */}
      <div className="glass-card rounded-xl p-4 border border-white/6">
        <div className="text-white/50 text-xs font-medium tracking-widest uppercase mb-4 font-dm flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-jg-gold/15 text-jg-gold text-[10px] flex items-center justify-center font-bold">10</span>
          10th Standard Details
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectField label="Board" name="tenthBoard" value={data.tenthBoard} onChange={onChange} options={BOARDS} error={errors.tenthBoard} required />
          <InputField label="Percentage / CGPA" name="tenthPercent" value={data.tenthPercent} onChange={onChange} error={errors.tenthPercent} placeholder="e.g. 85.5" required />
        </div>
      </div>

      {/* 12th */}
      <div className="glass-card rounded-xl p-4 border border-white/6">
        <div className="text-white/50 text-xs font-medium tracking-widest uppercase mb-4 font-dm flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-jg-gold/15 text-jg-gold text-[10px] flex items-center justify-center font-bold">12</span>
          12th Standard Details
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectField label="Board" name="twelfthBoard" value={data.twelfthBoard} onChange={onChange} options={BOARDS} error={errors.twelfthBoard} required />
          <InputField label="Percentage / CGPA" name="twelfthPercent" value={data.twelfthPercent} onChange={onChange} error={errors.twelfthPercent} placeholder="e.g. 78.0" required />
        </div>
        <div className="mt-4">
          <SelectField label="Stream" name="twelfthStream" value={data.twelfthStream} onChange={onChange} options={STREAMS} error={errors.twelfthStream} required />
        </div>
      </div>

      {/* Entrance */}
      <div className="glass-card rounded-xl p-4 border border-white/6">
        <div className="text-white/50 text-xs font-medium tracking-widest uppercase mb-4 font-dm">
          Entrance Exam (if any)
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectField label="Exam Name" name="entranceExam" value={data.entranceExam} onChange={onChange} options={ENTRANCE} />
          <InputField label="Score / Percentile" name="entranceScore" value={data.entranceScore} onChange={onChange} placeholder="e.g. 92 percentile" />
        </div>
      </div>
    </div>
  );
}

function Step3({ data, onChange, errors }: { data: FormData; onChange: (n: keyof FormData, v: string) => void; errors: FieldErrors }) {
  const programmes = data.level ? PROGRAMMES[data.level] ?? [] : [];

  return (
    <div className="space-y-5">
      {/* Level tabs */}
      <div>
        <label className="text-white/60 text-xs font-medium font-dm tracking-wide block mb-3">
          Programme Level<span className="text-jg-gold ml-0.5">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {Object.keys(PROGRAMMES).map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => { onChange("level", level); onChange("programme", ""); }}
              className={`py-2.5 px-3 rounded-xl text-xs font-medium font-dm transition-all duration-200 border ${
                data.level === level
                  ? "bg-jg-gold/15 border-jg-gold/35 text-jg-gold"
                  : "border-white/8 text-white/40 hover:text-white hover:border-white/15 bg-white/2"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
        {errors.level && <span className="flex items-center gap-1 text-red-400 text-xs mt-1.5 font-dm"><AlertCircle className="w-3 h-3" />{errors.level}</span>}
      </div>

      {/* Programme dropdown */}
      {data.level && (
        <SelectField
          label="Select Programme" name="programme" value={data.programme}
          onChange={onChange} options={programmes} error={errors.programme} required
          placeholder="Choose your programme"
        />
      )}

      {data.programme && (
        <InputField
          label="Specialization / Elective (optional)" name="specialization"
          value={data.specialization} onChange={onChange}
          placeholder="e.g. Finance, Data Science, Criminal Law…"
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-white/60 text-xs font-medium font-dm tracking-wide block mb-3">Academic Intake</label>
          <div className="flex gap-2">
            {["2026-27", "2027-28"].map(i => (
              <button key={i} type="button" onClick={() => onChange("intake", i)}
                className={`flex-1 py-3 rounded-xl text-xs font-medium font-dm border transition-all duration-200 ${
                  data.intake === i ? "bg-jg-gold/15 border-jg-gold/35 text-jg-gold" : "border-white/8 text-white/40 hover:text-white bg-white/2"
                }`}>{i}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-white/60 text-xs font-medium font-dm tracking-wide block mb-3">Study Mode</label>
          <div className="flex gap-2">
            {["Regular", "Distance", "Online"].map(m => (
              <button key={m} type="button" onClick={() => onChange("mode", m)}
                className={`flex-1 py-3 rounded-xl text-xs font-medium font-dm border transition-all duration-200 ${
                  data.mode === m ? "bg-jg-gold/15 border-jg-gold/35 text-jg-gold" : "border-white/8 text-white/40 hover:text-white bg-white/2"
                }`}>{m}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-white/60 text-xs font-medium font-dm tracking-wide block mb-3">Hostel Required?</label>
          <div className="flex gap-2">
            {["Yes", "No"].map(v => (
              <button key={v} type="button" onClick={() => onChange("hostel", v)}
                className={`flex-1 py-3 rounded-xl text-xs font-medium font-dm border transition-all duration-200 ${
                  data.hostel === v ? "bg-jg-gold/15 border-jg-gold/35 text-jg-gold" : "border-white/8 text-white/40 hover:text-white bg-white/2"
                }`}>{v}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-white/60 text-xs font-medium font-dm tracking-wide block mb-3">Apply for Scholarship?</label>
          <div className="flex gap-2">
            {["Yes", "No"].map(v => (
              <button key={v} type="button" onClick={() => onChange("scholarship", v)}
                className={`flex-1 py-3 rounded-xl text-xs font-medium font-dm border transition-all duration-200 ${
                  data.scholarship === v ? "bg-jg-gold/15 border-jg-gold/35 text-jg-gold" : "border-white/8 text-white/40 hover:text-white bg-white/2"
                }`}>{v}</button>
            ))}
          </div>
        </div>
      </div>

      <SelectField
        label="How did you hear about us?" name="howDidYouHear"
        value={data.howDidYouHear} onChange={onChange}
        options={["Google Search", "Social Media", "Friend / Family", "School / College", "News / Advertisement", "Education Fair", "Other"]}
      />
    </div>
  );
}

function Step4({ data }: { data: FormData }) {
  const rows = [
    { section: "Personal Details", items: [
      { label: "Full Name", value: `${data.firstName} ${data.lastName}` },
      { label: "Email", value: data.email },
      { label: "Phone", value: data.phone },
      { label: "Date of Birth", value: data.dob },
      { label: "Gender", value: data.gender },
      { label: "City / State", value: `${data.city}, ${data.state}` },
    ]},
    { section: "Academic Background", items: [
      { label: "10th Board", value: data.tenthBoard },
      { label: "10th Marks", value: data.tenthPercent + "%" },
      { label: "12th Board", value: data.twelfthBoard },
      { label: "12th Marks", value: data.twelfthPercent + "%" },
      { label: "12th Stream", value: data.twelfthStream },
      ...(data.entranceExam ? [{ label: "Entrance Exam", value: `${data.entranceExam} — ${data.entranceScore || "Score not entered"}` }] : []),
    ]},
    { section: "Programme Selection", items: [
      { label: "Level", value: data.level },
      { label: "Programme", value: data.programme },
      ...(data.specialization ? [{ label: "Specialization", value: data.specialization }] : []),
      { label: "Academic Intake", value: data.intake },
      { label: "Study Mode", value: data.mode },
      { label: "Hostel", value: data.hostel },
      { label: "Scholarship", value: data.scholarship },
    ]},
  ];

  return (
    <div className="space-y-5">
      {/* Summary cards */}
      {rows.map(({ section, items }) => (
        <div key={section} className="glass-card rounded-xl border border-white/6 overflow-hidden">
          <div className="bg-jg-gold/6 border-b border-white/5 px-4 py-2.5">
            <span className="text-jg-gold text-xs font-semibold tracking-wider uppercase font-dm">{section}</span>
          </div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
            {items.map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="text-white/35 text-[10px] uppercase tracking-wider font-dm">{label}</span>
                <span className="text-white/80 text-sm font-dm font-medium">{value || "—"}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Declaration */}
      <div className="flex items-start gap-3 bg-jg-gold/4 border border-jg-gold/15 rounded-xl p-4">
        <input type="checkbox" id="declaration" defaultChecked className="mt-0.5 accent-jg-gold w-4 h-4 flex-shrink-0" />
        <label htmlFor="declaration" className="text-white/50 text-xs leading-relaxed font-dm cursor-pointer">
          I declare that all the information provided above is true and correct to the best of my knowledge.
          I understand that any false information may result in cancellation of my application.
        </label>
      </div>
    </div>
  );
}

/* ─── Validation ─── */
function validate(step: number, data: FormData): FieldErrors {
  const errors: FieldErrors = {};
  if (step === 1) {
    if (!data.firstName.trim()) errors.firstName = "First name is required";
    if (!data.lastName.trim()) errors.lastName = "Last name is required";
    if (!data.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Enter a valid email";
    if (!data.phone.trim()) errors.phone = "Phone number is required";
    else if (!/^\+?[\d\s\-()]{8,15}$/.test(data.phone)) errors.phone = "Enter a valid phone number";
    if (!data.dob) errors.dob = "Date of birth is required";
    if (!data.gender) errors.gender = "Please select gender";
    if (!data.city.trim()) errors.city = "City is required";
    if (!data.state) errors.state = "Please select state";
  }
  if (step === 2) {
    if (!data.tenthBoard) errors.tenthBoard = "10th board is required";
    if (!data.tenthPercent.trim()) errors.tenthPercent = "10th marks are required";
    if (!data.twelfthBoard) errors.twelfthBoard = "12th board is required";
    if (!data.twelfthPercent.trim()) errors.twelfthPercent = "12th marks are required";
    if (!data.twelfthStream) errors.twelfthStream = "Stream is required";
  }
  if (step === 3) {
    if (!data.level) errors.level = "Please select a programme level";
    if (!data.programme) errors.programme = "Please select a programme";
  }
  return errors;
}

/* ─── Main Modal ─── */
export default function Admissionmodal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when modal open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Scroll to top of modal on step change
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const handleChange = (name: keyof FormData, value: string) => {
    setData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleNext = () => {
    const errs = validate(step, data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStep(s => s + 1);
  };

  const handleBack = () => { setErrors({}); setStep(s => s - 1); };

  const handleSubmit = async () => {
    setSubmitting(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1800));
    setSubmitting(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setStep(1);
    setData(INITIAL);
    setErrors({});
    setSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal box */}
      <div className="relative w-full sm:max-w-2xl bg-[#0d0d1a] border border-white/8 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[95dvh] sm:max-h-[90vh]">

        {/* ── Header ── */}
        <div className="flex-shrink-0 px-5 sm:px-6 pt-5 pb-4 border-b border-white/6">
          {/* Title row */}
          <div className="flex items-start justify-between gap-3 mb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-jg-gold to-jg-gold-dark flex items-center justify-center">
                  <GraduationCap className="w-3.5 h-3.5 text-jg-navy" />
                </div>
                <span className="text-jg-gold text-xs font-medium tracking-widest uppercase font-dm">JG University</span>
              </div>
              <h2 className="font-playfair font-bold text-white text-lg sm:text-xl">
                Admission Application {!submitted && <span className="text-white/30 text-sm font-dm font-normal">2026–27</span>}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 w-8 h-8 rounded-xl border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Step indicators + progress */}
          {!submitted && (
            <>
              <div className="flex items-center justify-between mb-3">
                {STEPS.map((s, i) => {
                  const done = step > s.id;
                  const active = step === s.id;
                  return (
                    <div key={s.id} className="flex-1 flex flex-col items-center gap-1.5 relative">
                      {/* Connector line */}
                      {i < STEPS.length - 1 && (
                        <div className="absolute top-4 left-1/2 w-full h-px">
                          <div className="h-full bg-white/6" />
                          <div
                            className="absolute top-0 left-0 h-full bg-jg-gold transition-all duration-500"
                            style={{ width: step > s.id ? "100%" : "0%" }}
                          />
                        </div>
                      )}
                      {/* Circle */}
                      <div className={`relative z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        done ? "bg-jg-gold border-jg-gold" :
                        active ? "bg-jg-gold/15 border-jg-gold" :
                        "bg-transparent border-white/15"
                      }`}>
                        {done
                          ? <Check className="w-3.5 h-3.5 text-jg-navy font-bold" strokeWidth={3} />
                          : <s.icon className={`w-3.5 h-3.5 ${active ? "text-jg-gold" : "text-white/25"}`} />
                        }
                      </div>
                      <span className={`text-[10px] font-dm font-medium hidden sm:block ${
                        active ? "text-jg-gold" : done ? "text-white/50" : "text-white/20"
                      }`}>{s.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Progress bar */}
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-jg-gold to-jg-gold-light rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="text-white/25 text-[10px] font-dm">Step {step} of {STEPS.length}</span>
                <span className="text-white/25 text-[10px] font-dm">{Math.round(progress)}% complete</span>
              </div>
            </>
          )}
        </div>

        {/* ── Body ── */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 sm:px-6 py-5">
          {submitted ? (
            /* ── Success screen ── */
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/25 flex items-center justify-center mb-6 animate-pulse_slow">
                <PartyPopper className="w-10 h-10 text-green-400" />
              </div>
              <h3 className="font-playfair font-bold text-white text-2xl mb-3">
                Application Submitted!
              </h3>
              <p className="text-white/50 text-sm leading-relaxed font-dm max-w-sm mb-2">
                Thank you <span className="text-white font-medium">{data.firstName}</span>! Your application for{" "}
                <span className="text-jg-gold font-medium">{data.programme}</span> has been successfully submitted.
              </p>
              <p className="text-white/35 text-xs font-dm mb-8">
                A confirmation will be sent to <span className="text-white/60">{data.email}</span>
              </p>

              {/* Reference number */}
              <div className="glass-card-gold rounded-xl px-6 py-4 mb-8 text-center">
                <div className="text-white/35 text-xs font-dm mb-1">Application Reference</div>
                <div className="font-playfair font-bold text-jg-gold text-xl tracking-widest">
                  JGU-{new Date().getFullYear()}-{Math.random().toString(36).substring(2,7).toUpperCase()}
                </div>
              </div>

              {/* Next steps */}
              <div className="w-full glass-card rounded-xl p-4 text-left space-y-3 mb-6">
                <div className="text-white/50 text-xs font-medium tracking-widest uppercase font-dm mb-3">What happens next?</div>
                {[
                  { icon: Mail, text: "Confirmation email sent to your inbox within 30 minutes" },
                  { icon: Phone, text: "Admissions team will call within 1–2 working days" },
                  { icon: Calendar, text: "Document verification scheduled after initial review" },
                  { icon: Upload, text: "Merit list & selection results published on portal" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-jg-gold/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-3 h-3 text-jg-gold" />
                    </div>
                    <span className="text-white/45 text-xs font-dm leading-relaxed">{text}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleReset}
                className="btn-gold-hover bg-gradient-to-r from-jg-gold to-jg-gold-dark text-jg-navy font-bold px-8 py-3 rounded-xl text-sm font-dm"
              >
                Close & Return
              </button>
            </div>
          ) : (
            <>
              {/* Step heading */}
              <div className="mb-6">
                <h3 className="font-playfair font-bold text-white text-lg">
                  {step === 1 && "Personal Details"}
                  {step === 2 && "Academic Background"}
                  {step === 3 && "Programme Selection"}
                  {step === 4 && "Review & Confirm"}
                </h3>
                <p className="text-white/35 text-xs font-dm mt-1">
                  {step === 1 && "Tell us about yourself. All fields marked * are required."}
                  {step === 2 && "Your educational history helps us match the right programme."}
                  {step === 3 && "Choose the programme you wish to apply for."}
                  {step === 4 && "Please review all details before submitting your application."}
                </p>
              </div>

              {/* Step content */}
              {step === 1 && <Step1 data={data} onChange={handleChange} errors={errors} />}
              {step === 2 && <Step2 data={data} onChange={handleChange} errors={errors} />}
              {step === 3 && <Step3 data={data} onChange={handleChange} errors={errors} />}
              {step === 4 && <Step4 data={data} />}
            </>
          )}
        </div>

        {/* ── Footer buttons ── */}
        {!submitted && (
          <div className="flex-shrink-0 px-5 sm:px-6 py-4 border-t border-white/6 flex items-center justify-between gap-3">
            {step > 1 ? (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 glass-card border border-white/10 text-white/60 hover:text-white px-5 py-3 rounded-xl text-sm font-dm transition-all duration-200"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            ) : (
              <button
                onClick={onClose}
                className="flex items-center gap-2 text-white/30 hover:text-white/60 px-4 py-3 text-sm font-dm transition-colors duration-200"
              >
                Cancel
              </button>
            )}

            <div className="flex items-center gap-2 ml-auto">
              {/* Step dots (mobile) */}
              <div className="flex gap-1.5 sm:hidden mr-2">
                {STEPS.map((s) => (
                  <div key={s.id} className={`rounded-full transition-all duration-300 ${
                    step === s.id ? "w-4 h-2 bg-jg-gold" : "w-2 h-2 bg-white/15"
                  }`} />
                ))}
              </div>

              {step < 4 ? (
                <button
                  onClick={handleNext}
                  className="btn-gold-hover flex items-center gap-2 bg-gradient-to-r from-jg-gold to-jg-gold-dark text-jg-navy font-bold px-6 py-3 rounded-xl text-sm font-dm"
                >
                  Next Step
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="btn-gold-hover flex items-center gap-2 bg-gradient-to-r from-jg-gold to-jg-gold-dark text-jg-navy font-bold px-6 py-3 rounded-xl text-sm font-dm disabled:opacity-70"
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Submitting…
                    </>
                  ) : (
                    <>
                      Submit Application
                      <Check className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}