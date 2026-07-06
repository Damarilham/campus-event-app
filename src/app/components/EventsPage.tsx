import { useState } from "react";
import { Search, Calendar, MapPin, Bell, Home, Menu as MenuIcon, User, Settings, FileText, HelpCircle, BookOpen, ScanLine, ChevronRight, X, Flame, Trophy, Users, GraduationCap, LayoutGrid } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useNavigate } from "react-router";
import { BarcodeScanner } from "./BarcodeScanner";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { getRegisteredEvents } from "../utils/registrationCache";
import { mockEvents } from "../utils/eventsData";

export function EventsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("Semua");
  const [showMenu, setShowMenu] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const username = localStorage.getItem("campus_username") || "Pengguna";
  const registeredCount = getRegisteredEvents().length;

  const categories = ["Semua", "Bootcamp", "Lomba", "Seminar", "Workshop"];

  const hotEvents = mockEvents.filter(event => (event.quota - event.registered) <= 10 && (event.quota - event.registered) > 0);

  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "Semua" || event.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleScan = (data: string) => {
    toast.success("QR Code scanned successfully!", {
      description: data,
    });
    setShowScanner(false);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Semua": return <LayoutGrid className="w-5 h-5" />;
      case "Bootcamp": return <GraduationCap className="w-5 h-5" />;
      case "Lomba": return <Trophy className="w-5 h-5" />;
      case "Seminar": return <Users className="w-5 h-5" />;
      case "Workshop": return <Settings className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden"
    >
      {/* Festive Background Decorations */}
      <div className="fixed -bottom-32 -left-32 w-80 h-80 bg-red-500/10 dark:bg-red-500/20 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="fixed -bottom-32 -right-32 w-80 h-80 bg-red-500/5 dark:bg-red-500/10 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* iOS Status Bar */}
      <div className="h-12 bg-white dark:bg-gray-900 sticky top-0 z-[50]" />

      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl px-6 py-4 sticky top-12 z-[50]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <motion.div 
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center ring-1 ring-gray-100 dark:ring-gray-800"
            >
              <User className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </motion.div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Selamat datang,</p>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">{username}</h1>
            </div>
          </div>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center relative ring-1 ring-gray-100 dark:ring-gray-800"
          >
            <Bell className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            <span className="absolute top-3.5 right-3.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
          </motion.button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari Event Kampus..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-[20px] text-base focus:outline-none focus:bg-white dark:focus:bg-gray-800 focus:ring-4 focus:ring-red-500/5 focus:border-red-500/20 dark:text-white transition-all"
          />
        </div>
      </div>

      <div className="pb-32 relative z-10">
        {/* Hot Events Banner */}
        {hotEvents.length > 0 && (
          <div className="mb-8 overflow-hidden">
            <div className="px-6 flex items-center gap-2 mb-4">
              <Flame className="w-5 h-5 text-red-500 fill-red-500" />
              <h2 className="text-lg font-extrabold text-gray-900 dark:text-white tracking-tight">HOT EVENTS</h2>
              <span className="px-2 py-0.5 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 text-[10px] font-bold rounded-full ml-1 animate-pulse">LIMITED QUOTA</span>
            </div>
            <div className="flex gap-4 overflow-x-auto px-6 pb-4 scrollbar-hide snap-x">
              {hotEvents.map((event) => (
                <motion.div
                  key={event.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/events/${event.id}`)}
                  className="flex-shrink-0 w-[280px] h-[160px] relative rounded-[28px] overflow-hidden snap-center shadow-lg group"
                >
                  <ImageWithFallback src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="px-2 py-0.5 bg-red-500 text-[10px] font-bold rounded-lg mb-2 inline-block">Sisa {event.quota - event.registered} Kuota</span>
                    <h3 className="font-bold text-base leading-tight line-clamp-2">{event.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Categories Section */}
        <div className="mb-8">
          <div className="px-6 flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Kategori</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto px-6 pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="flex flex-col items-center gap-2 flex-shrink-0"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                  activeCategory === cat ? "bg-red-500 text-white shadow-lg shadow-red-200 dark:shadow-red-900/20" : "bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 ring-1 ring-gray-100 dark:ring-gray-800"
                }`}>
                  {getCategoryIcon(cat)}
                </div>
                <span className={`text-[11px] font-bold ${activeCategory === cat ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"}`}>{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* All Events Section */}
        <div className="px-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
              {activeCategory === "Semua" ? "Semua Event" : `Event ${activeCategory}`}
            </h2>
          </div>

          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((event, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  key={event.id}
                  onClick={() => navigate(`/events/${event.id}`)}
                  className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-[28px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 dark:border-gray-800 active:scale-[0.98] transition-all cursor-pointer group"
                >
                  <div className="flex gap-4">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-700 ring-1 ring-gray-100 dark:ring-gray-700">
                      <ImageWithFallback src={event.image} alt={event.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                      <div>
                        <div className="flex justify-between items-start">
                          <span className="px-2.5 py-1 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2 inline-block">
                            {event.category}
                          </span>
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white leading-snug group-hover:text-red-500 transition-colors truncate">{event.title}</h3>
                      </div>
                      
                      <div className="space-y-1.5 mt-2">
                        <div className="flex items-center gap-2 text-[13px] text-gray-500 dark:text-gray-400 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-red-400" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[13px] text-gray-500 dark:text-gray-400 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-red-400" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="self-center">
                      <ChevronRight className="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-red-400 transition-colors" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredEvents.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-300 dark:text-gray-600" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">Event tidak ditemukan</p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Coba kategori atau kata kunci lain</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 pb-8 z-[60] px-6">
        <div className="flex justify-around items-center pt-4">
          <button
            onClick={() => setShowMenu(false)}
            className={`flex flex-col items-center gap-1.5 ${!showMenu ? "text-red-500" : "text-gray-400 dark:text-gray-500"}`}
          >
            <div className={`w-14 h-10 flex items-center justify-center rounded-2xl transition-all ${!showMenu ? "bg-red-50 dark:bg-red-500/10" : ""}`}>
              <Home className={`w-6 h-6 ${!showMenu ? "stroke-[2.5px]" : "stroke-2"}`} />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-widest">Home</span>
          </button>
          <button
            onClick={() => setShowScanner(true)}
            className="flex flex-col items-center gap-1.5 text-gray-400 dark:text-gray-500 active:text-red-500 group"
          >
            <div className="w-14 h-10 flex items-center justify-center rounded-2xl group-active:bg-red-50 dark:group-active:bg-red-500/10 transition-all">
              <ScanLine className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-widest">Scan QR</span>
          </button>
          <button
            onClick={() => setShowMenu(true)}
            className={`flex flex-col items-center gap-1.5 ${showMenu ? "text-red-500" : "text-gray-400 dark:text-gray-500"}`}
          >
            <div className={`w-14 h-10 flex items-center justify-center rounded-2xl transition-all ${showMenu ? "bg-red-50 dark:bg-red-500/10" : ""}`}>
              <MenuIcon className={`w-6 h-6 ${showMenu ? "stroke-[2.5px]" : "stroke-2"}`} />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-widest">Menu</span>
          </button>
        </div>
      </div>

      {/* Side Menu */}
      <AnimatePresence>
        {showMenu && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
              onClick={() => setShowMenu(false)}
            />

            {/* Menu Panel */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-[85%] max-w-sm h-full bg-white dark:bg-gray-900 shadow-[-20px_0_60px_-15px_rgba(0,0,0,0.1)] flex flex-col rounded-l-[40px] border-l border-gray-100 dark:border-gray-800"
            >
              {/* Status Bar */}
              <div className="h-14" />

              {/* Menu Header */}
              <div className="px-8 py-6 mb-4">
                <div className="flex items-center justify-between mb-8">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-16 h-16 bg-red-50 dark:bg-red-500/10 rounded-3xl flex items-center justify-center ring-1 ring-red-100 dark:ring-red-500/20"
                  >
                    <User className="w-8 h-8 text-red-500" />
                  </motion.div>
                  <button 
                    onClick={() => setShowMenu(false)}
                    className="p-3 bg-gray-50 dark:bg-gray-800 rounded-2xl text-gray-400 dark:text-gray-500 active:bg-gray-100 dark:active:bg-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">{username}</h3>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">Mahasiswa Aktif</p>
                </div>
              </div>

              {/* Menu Items */}
              <div className="flex-1 px-4 space-y-2 overflow-y-auto">
                {[
                  { icon: FileText, label: "Log Pendaftaran", count: registeredCount > 0 ? String(registeredCount) : undefined, route: "/event-log" },
                  { icon: HelpCircle, label: "Pusat Bantuan", route: null },
                  { icon: BookOpen, label: "Panduan Aplikasi", route: "/splash" },
                  { icon: Settings, label: "Pengaturan", route: "/settings" },
                ].map((item, i) => (
                  <motion.button
                    key={item.label}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + (i * 0.05) }}
                    onClick={() => { if (item.route) { setShowMenu(false); navigate(item.route); } }}
                    className="w-full px-4 py-4.5 flex items-center justify-between rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-700 group transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center group-hover:bg-red-50 dark:group-hover:bg-red-500/10 transition-colors">
                        <item.icon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-red-500" />
                      </div>
                      <span className="text-base font-bold text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">{item.label}</span>
                    </div>
                    {item.count && (
                      <span className="px-2.5 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full">
                        {item.count}
                      </span>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Footer Menu */}
              <div className="p-8 border-t border-gray-100 dark:border-gray-800 mb-8">
                <button 
                  onClick={() => {
                    localStorage.removeItem("campus_username");
                    navigate("/");
                  }}
                  className="w-full py-4.5 px-6 border-2 border-red-100 dark:border-red-500/20 text-red-500 rounded-2xl font-bold flex items-center justify-center gap-3 active:bg-red-50 dark:active:bg-red-500/10 transition-colors"
                >
                  Keluar Akun
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Barcode Scanner */}
      <AnimatePresence>
        {showScanner && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[200]"
          >
            <BarcodeScanner onScan={handleScan} onClose={() => setShowScanner(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}