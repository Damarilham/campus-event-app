import { useNavigate } from "react-router";
import { ArrowLeft, Moon, Sun, ChevronRight, Monitor, ShieldCheck, BellRing, Smartphone } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export function SettingsPage() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("campus_theme") === "dark";
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("campus_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("campus_theme", "light");
    }
  }, [isDarkMode]);

  const settingsItems = [
    { icon: BellRing, label: "Notifikasi", value: "Aktif" },
    { icon: ShieldCheck, label: "Privasi & Keamanan", value: "" },
    { icon: Smartphone, label: "Bahasa", value: "Bahasa Indonesia" },
    { icon: Monitor, label: "Versi Aplikasi", value: "v2.4.0" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      {/* iOS Status Bar */}
      <div className="h-12 bg-white dark:bg-gray-900 sticky top-0 z-50" />

      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-5 sticky top-12 z-50">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/events")}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </motion.button>
        <h1 className="font-black text-xl text-gray-900 dark:text-white tracking-tight">Pengaturan</h1>
      </div>

      <div className="px-6 py-8 space-y-8">
        {/* Appearance Section */}
        <section>
          <h2 className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[2px] mb-4 px-1">Tampilan</h2>
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-[28px] p-2 border border-gray-100 dark:border-gray-800">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isDarkMode ? "bg-red-500 text-white" : "bg-gray-100 text-gray-500"}`}>
                  {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </div>
                <span className="font-bold text-gray-900 dark:text-white">Mode Gelap</span>
              </div>
              <div className={`w-12 h-6 rounded-full p-1 transition-colors ${isDarkMode ? "bg-red-500" : "bg-gray-200"}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${isDarkMode ? "translate-x-6" : "translate-x-0"}`} />
              </div>
            </button>
          </div>
        </section>

        {/* General Settings */}
        <section>
          <h2 className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[2px] mb-4 px-1">Umum</h2>
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-[28px] overflow-hidden border border-gray-100 dark:border-gray-800">
            {settingsItems.map((item, i) => (
              <button
                key={i}
                className={`w-full flex items-center justify-between p-5 active:bg-gray-100 dark:active:bg-gray-800 transition-colors ${i !== settingsItems.length - 1 ? "border-b border-gray-100 dark:border-gray-800" : ""}`}
              >
                <div className="flex items-center gap-4">
                  <item.icon className="w-5 h-5 text-gray-400" />
                  <span className="font-bold text-gray-700 dark:text-gray-300 text-[15px]">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.value && <span className="text-sm text-gray-400 font-medium">{item.value}</span>}
                  <ChevronRight className="w-4 h-4 text-gray-300" />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Account Action */}
        <section className="pt-4">
          <button 
            onClick={() => {
              localStorage.removeItem("campus_username");
              navigate("/");
            }}
            className="w-full py-5 bg-red-50 dark:bg-red-500/10 text-red-500 rounded-[24px] font-black text-lg border-2 border-red-100 dark:border-red-500/20 active:scale-[0.98] transition-all"
          >
            Keluar Akun
          </button>
          <p className="text-center text-gray-400 text-xs font-bold mt-6 uppercase tracking-widest">Campus Events v2.4.0</p>
        </section>
      </div>

      {/* Background festive gradient (matching other pages) */}
      <div className="fixed -bottom-24 -left-24 w-64 h-64 bg-red-500/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="fixed -bottom-24 -right-24 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] pointer-events-none" />
    </motion.div>
  );
}
