import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, CheckCircle2, User, Hash, BookOpen, Mail, Phone, ChevronDown, Sparkles, Send } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { saveEventRegistration, isEventRegistered } from "../utils/registrationCache";
import { mockEvents } from "../utils/eventsData";
import confetti from "canvas-confetti";

const faculties = [
  "Teknik Informatika", "Sistem Informasi", "Teknik Elektro", "Teknik Mesin", "Teknik Sipil",
  "Ekonomi & Bisnis", "Hukum", "Kedokteran", "Psikologi", "FMIPA", "Lainnya",
];

const semesters = ["1", "2", "3", "4", "5", "6", "7", "8", "9+"];

interface FormData {
  name: string;
  nim: string;
  faculty: string;
  semester: string;
  email: string;
  phone: string;
  expectation: string;
}

const emptyForm: FormData = {
  name: "", nim: "", faculty: "", semester: "", email: "", phone: "", expectation: "",
};

export function EventRegistrationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>(() => {
    const savedIdentity = localStorage.getItem("campus_user_identity");
    if (savedIdentity) {
      try {
        const parsed = JSON.parse(savedIdentity);
        return { ...emptyForm, ...parsed, expectation: "" };
      } catch {
        return emptyForm;
      }
    }
    return emptyForm;
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showFacultyPicker, setShowFacultyPicker] = useState(false);
  const [showSemesterPicker, setShowSemesterPicker] = useState(false);

  const event = mockEvents.find((e) => e.id === Number(id));

  useEffect(() => {
    if (event && isEventRegistered(event.id)) {
      toast.error("Kamu sudah terdaftar di event ini");
      navigate(`/events/${event.id}`);
    }
  }, [event, navigate]);

  useEffect(() => {
    if (success) {
      // Save identity for next time (excluding expectation)
      const { expectation, ...identity } = form;
      localStorage.setItem("campus_user_identity", JSON.stringify(identity));

      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ef4444', '#f87171', '#ffffff']
      });
    }
  }, [success, form]);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500 font-bold">Event tidak ditemukan</p>
      </div>
    );
  }

  const validate = () => {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim()) newErrors.name = "Nama lengkap wajib diisi";
    if (!form.nim.trim()) newErrors.nim = "NIM wajib diisi";
    if (!form.faculty) newErrors.faculty = "Jurusan wajib dipilih";
    if (!form.semester) newErrors.semester = "Semester wajib dipilih";
    if (!form.email.trim()) newErrors.email = "Email wajib diisi";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Format email tidak valid";
    if (!form.phone.trim()) newErrors.phone = "No. WhatsApp wajib diisi";
    return newErrors;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Lengkapi data yang ditandai merah");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1800));
    setSubmitting(false);
    saveEventRegistration(Number(id));
    setSuccess(true);
  };

  if (success) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-white flex flex-col"
      >
        <div className="h-12" />
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
          <motion.div 
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 15, stiffness: 200 }}
            className="w-24 h-24 bg-red-50 rounded-[32px] flex items-center justify-center mb-8 ring-1 ring-red-100 shadow-xl shadow-red-50"
          >
            <CheckCircle2 className="w-12 h-12 text-red-500" />
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-gray-900 font-black text-3xl mb-3">Selesai!</h1>
            <p className="text-gray-500 font-medium mb-1">Pendaftaran kamu di</p>
            <p className="text-red-500 font-black text-lg mb-8 leading-tight">{event.title}</p>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-full bg-gray-50 rounded-[32px] p-6 mb-10 text-left space-y-4 border border-gray-100"
          >
            <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-3">
              <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">Nama Peserta</span>
              <span className="font-bold text-gray-800">{form.name}</span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-3">
              <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">NIM</span>
              <span className="font-bold text-gray-800">{form.nim}</span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-3">
              <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">Jurusan</span>
              <span className="font-bold text-gray-800">{form.faculty}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">Email</span>
              <span className="font-bold text-gray-800">{form.email}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-2 text-gray-400 mb-10 px-4 py-3 bg-gray-50 rounded-2xl border border-gray-100"
          >
            <Sparkles className="w-4 h-4 text-red-400" />
            <p className="text-xs font-bold leading-relaxed">Tiket digital telah dikirimkan ke alamat email kamu.</p>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/events")}
            className="w-full py-5 bg-red-500 text-white rounded-[24px] font-black text-lg shadow-xl shadow-red-200"
          >
            Selesai & Tutup
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen bg-white"
    >
      {/* iOS Status Bar */}
      <div className="h-12 bg-white sticky top-0 z-50" />

      {/* Header */}
      <div className="bg-white px-6 py-6 border-b border-gray-50 flex items-center gap-5 sticky top-12 z-50">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(`/events/${id}`)}
          className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-50 border border-gray-100"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </motion.button>
        <div className="flex-1 min-w-0">
          <h1 className="font-black text-xl text-gray-900 tracking-tight">Pendaftaran</h1>
          <p className="text-xs text-gray-400 font-bold truncate uppercase tracking-widest">{event.title}</p>
        </div>
      </div>

      {/* Form */}
      <div className="px-6 py-8 pb-40 space-y-8">
        {/* Info Banner */}
        <div className="bg-red-50/50 border border-red-100/50 rounded-[24px] px-5 py-4 flex gap-4 items-center">
          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-red-500" />
          </div>
          <p className="text-xs text-red-700 font-bold leading-relaxed tracking-tight">
            Data kamu digunakan untuk verifikasi kehadiran. Harap isi dengan benar sesuai KTM.
          </p>
        </div>

        {/* Form Sections */}
        <div className="space-y-6">
          <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[2px] mb-2.5 px-1">Nama Lengkap</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-red-500 transition-colors" />
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Nama Sesuai KTM"
                className={`w-full pl-12 pr-4 py-4 bg-gray-50 border rounded-[22px] text-base font-bold focus:outline-none focus:bg-white focus:ring-4 focus:ring-red-500/5 transition-all ${errors.name ? "border-red-400 bg-red-50/20" : "border-gray-100"}`}
              />
            </div>
          </motion.div>

          <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[2px] mb-2.5 px-1">NIM / Student ID</label>
            <div className="relative group">
              <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-red-500 transition-colors" />
              <input
                type="text"
                value={form.nim}
                onChange={(e) => handleChange("nim", e.target.value)}
                placeholder="Nomor Induk Mahasiswa"
                className={`w-full pl-12 pr-4 py-4 bg-gray-50 border rounded-[22px] text-base font-bold focus:outline-none focus:bg-white focus:ring-4 focus:ring-red-500/5 transition-all ${errors.nim ? "border-red-400 bg-red-50/20" : "border-gray-100"}`}
              />
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[2px] mb-2.5 px-1">Jurusan</label>
              <button
                type="button"
                onClick={() => setShowFacultyPicker(true)}
                className={`w-full flex items-center justify-between px-5 py-4 bg-gray-50 border rounded-[22px] text-base font-bold focus:outline-none transition-all ${errors.faculty ? "border-red-400 bg-red-50/20" : "border-gray-100"}`}
              >
                <span className={`truncate ${form.faculty ? "text-gray-900" : "text-gray-300"}`}>
                  {form.faculty || "Pilih"}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
            </motion.div>

            <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[2px] mb-2.5 px-1">Semester</label>
              <button
                type="button"
                onClick={() => setShowSemesterPicker(true)}
                className={`w-full flex items-center justify-between px-5 py-4 bg-gray-50 border rounded-[22px] text-base font-bold focus:outline-none transition-all ${errors.semester ? "border-red-400 bg-red-50/20" : "border-gray-100"}`}
              >
                <span className={form.semester ? "text-gray-900" : "text-gray-300"}>
                  {form.semester ? `${form.semester}` : "Pilih"}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
            </motion.div>
          </div>

          <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[2px] mb-2.5 px-1">Email Student</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-red-500 transition-colors" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="nama@student.ac.id"
                className={`w-full pl-12 pr-4 py-4 bg-gray-50 border rounded-[22px] text-base font-bold focus:outline-none focus:bg-white focus:ring-4 focus:ring-red-500/5 transition-all ${errors.email ? "border-red-400 bg-red-50/20" : "border-gray-100"}`}
              />
            </div>
          </motion.div>

          <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[2px] mb-2.5 px-1">No. WhatsApp</label>
            <div className="relative group">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-red-500 transition-colors" />
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="08xxxxxxxxxx"
                className={`w-full pl-12 pr-4 py-4 bg-gray-50 border rounded-[22px] text-base font-bold focus:outline-none focus:bg-white focus:ring-4 focus:ring-red-500/5 transition-all ${errors.phone ? "border-red-400 bg-red-50/20" : "border-gray-100"}`}
              />
            </div>
          </motion.div>

          <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }}>
            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[2px] mb-2.5 px-1">Harapan Mengikuti Event</label>
            <textarea
              value={form.expectation}
              onChange={(e) => handleChange("expectation", e.target.value)}
              placeholder="Tuliskan harapanmu..."
              rows={4}
              className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-[28px] text-base font-bold focus:outline-none focus:bg-white focus:ring-4 focus:ring-red-500/5 transition-all resize-none"
            />
          </motion.div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 px-6 pt-4 pb-10 z-[60]">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full py-5 bg-red-500 text-white rounded-[24px] font-black text-lg shadow-xl shadow-red-200 active:bg-red-600 disabled:opacity-60 flex items-center justify-center gap-3 transition-all"
        >
          {submitting ? (
            <>
              <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
              <span>Memproses...</span>
            </>
          ) : (
            <>
              <span>Kirim Pendaftaran</span>
              <Send className="w-5 h-5" />
            </>
          )}
        </motion.button>
      </div>

      {/* Faculty Picker Sheet */}
      <AnimatePresence>
        {showFacultyPicker && (
          <div className="fixed inset-0 z-[200] flex flex-col justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" 
              onClick={() => setShowFacultyPicker(false)} 
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative bg-white rounded-t-[40px] pt-4 pb-12 max-h-[80vh] flex flex-col"
            >
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
              <p className="text-xl font-black text-gray-900 px-8 mb-6 tracking-tight">Pilih Jurusan</p>
              <div className="overflow-y-auto px-4 space-y-1">
                {faculties.map((f) => (
                  <button
                    key={f}
                    onClick={() => { handleChange("faculty", f); setShowFacultyPicker(false); }}
                    className={`w-full text-left px-6 py-4.5 rounded-[20px] text-base font-bold transition-all ${form.faculty === f ? "text-red-500 bg-red-50" : "text-gray-700 hover:bg-gray-50 active:bg-gray-100"}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Semester Picker Sheet */}
      <AnimatePresence>
        {showSemesterPicker && (
          <div className="fixed inset-0 z-[200] flex flex-col justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" 
              onClick={() => setShowSemesterPicker(false)} 
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative bg-white rounded-t-[40px] pt-4 pb-12"
            >
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
              <p className="text-xl font-black text-gray-900 px-8 mb-8 tracking-tight">Pilih Semester</p>
              <div className="grid grid-cols-3 gap-4 px-8 pb-4">
                {semesters.map((s) => (
                  <button
                    key={s}
                    onClick={() => { handleChange("semester", s); setShowSemesterPicker(false); }}
                    className={`py-5 rounded-[22px] text-lg font-black transition-all ${form.semester === s ? "bg-red-500 text-white shadow-lg shadow-red-100" : "bg-gray-50 text-gray-800 active:bg-gray-100"}`}
                  >
                    {s === "9+" ? "9+" : s}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
