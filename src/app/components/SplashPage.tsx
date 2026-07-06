import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { CalendarDays, QrCode, ClipboardList, ArrowRight, ChevronRight } from "lucide-react";

const slides = [
  {
    icon: CalendarDays,
    color: "bg-red-50",
    iconColor: "text-red-500",
    ringColor: "ring-red-100",
    title: "Temukan Event Kampusmu",
    description:
      "Jelajahi berbagai event menarik di kampusmu — dari workshop, seminar, career fair, hingga hackathon. Semuanya ada di satu tempat.",
    accent: "bg-red-500",
  },
  {
    icon: ClipboardList,
    color: "bg-orange-50",
    iconColor: "text-orange-500",
    ringColor: "ring-orange-100",
    title: "Daftar dengan Mudah",
    description:
      "Isi form pendaftaran langsung dari aplikasi. Data kamu tersimpan otomatis sehingga kamu bisa melihat riwayat event yang sudah kamu ikuti kapan saja.",
    accent: "bg-orange-500",
  },
  {
    icon: QrCode,
    color: "bg-rose-50",
    iconColor: "text-rose-500",
    ringColor: "ring-rose-100",
    title: "Scan QR & Absen Cepat",
    description:
      "Gunakan fitur Scan QR untuk absensi event secara instan. Tidak perlu antre panjang — cukup arahkan kamera ke QR code dan selesai.",
    accent: "bg-rose-500",
  },
];

export function SplashPage() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    if (current < slides.length - 1) {
      setCurrent((c) => c + 1);
    } else {
      localStorage.setItem("campus_onboarding_seen", "1");
      navigate("/");
    }
  };

  const handleSkip = () => {
    localStorage.setItem("campus_onboarding_seen", "1");
    navigate("/");
  };

  const slide = slides[current];
  const Icon = slide.icon;
  const isLast = current === slides.length - 1;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Status Bar */}
      <div className="h-12" />

      {/* Skip */}
      <div className="flex justify-end px-6 pt-2">
        {!isLast && (
          <button onClick={handleSkip} className="text-gray-400 text-sm font-semibold">
            Lewati
          </button>
        )}
      </div>

      {/* Slide content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="flex flex-col items-center"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 16 }}
              className={`w-28 h-28 ${slide.color} rounded-[36px] flex items-center justify-center mb-10 ring-2 ${slide.ringColor} shadow-xl`}
            >
              <Icon className={`w-14 h-14 ${slide.iconColor}`} />
            </motion.div>

            {/* Text */}
            <motion.h1
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-900 text-3xl font-black tracking-tight leading-tight mb-4"
            >
              {slide.title}
            </motion.h1>
            <motion.p
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-500 text-base leading-relaxed"
            >
              {slide.description}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom */}
      <div className="px-8 pb-14 flex flex-col items-center gap-6">
        {/* Dots */}
        <div className="flex gap-2 items-center">
          {slides.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrent(i)}
              animate={{ width: i === current ? 24 : 8 }}
              transition={{ duration: 0.3 }}
              className={`h-2 rounded-full transition-colors ${
                i === current ? slide.accent : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleNext}
          className={`w-full py-4.5 ${slide.accent} text-white rounded-[24px] font-black text-lg shadow-xl flex items-center justify-center gap-3`}
          style={{ boxShadow: `0 16px 40px -8px rgba(239,68,68,0.35)` }}
        >
          {isLast ? (
            <>
              <span>Mulai Sekarang</span>
              <ChevronRight className="w-5 h-5" />
            </>
          ) : (
            <>
              <span>Selanjutnya</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
