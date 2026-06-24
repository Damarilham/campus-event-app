import { useState } from "react";
import { Search, Calendar, MapPin, Bell, Home, Menu as MenuIcon, User, Settings, FileText, HelpCircle, BookOpen, ScanLine, ChevronRight, X } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useNavigate } from "react-router";
import { BarcodeScanner } from "./BarcodeScanner";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  category: string;
  image: string;
}

const mockEvents: Event[] = [
  {
    id: 1,
    title: "AI & Machine Learning Workshop",
    date: "April 15, 2026",
    location: "Engineering Building, Room 301",
    category: "Hot",
    image: "https://images.unsplash.com/photo-1762968269894-1d7e1ce8894e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwY29uZmVyZW5jZSUyMHNlbWluYXJ8ZW58MXx8fHwxNzc1ODAxMDUxfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    title: "Spring Career Fair 2026",
    date: "April 18, 2026",
    location: "Student Center Main Hall",
    category: "Hot",
    image: "https://images.unsplash.com/photo-1763739532819-401f6a041b54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXR3b3JraW5nJTIwYnVzaW5lc3MlMjBtZWV0aW5nfGVufDF8fHx8MTc3NTgwMTA1NHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    title: "Student Leadership Summit",
    date: "April 22, 2026",
    location: "Conference Center",
    category: "Recent",
    image: "https://images.unsplash.com/photo-1693608231470-25e1b16a23b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwY2FtcHVzJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzc1NzExMTE0fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 4,
    title: "Guest Lecture: Sustainability",
    date: "April 25, 2026",
    location: "Auditorium A",
    category: "Recent",
    image: "https://images.unsplash.com/photo-1759823656568-a13c88f8cf3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwZXZlbnQlMjBoYWxsfGVufDF8fHx8MTc3NTgwMTA1MXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 5,
    title: "Hackathon 2026",
    date: "April 28, 2026",
    location: "Computer Science Building",
    category: "Hot",
    image: "https://images.unsplash.com/photo-1762968269894-1d7e1ce8894e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwY29uZmVyZW5jZSUyMHNlbWluYXJ8ZW58MXx8fHwxNzc1ODAxMDUxfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function EventsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"Hot" | "Recent">("Hot");
  const [showMenu, setShowMenu] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const username = localStorage.getItem("campus_username") || "Pengguna";

  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = event.category === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleScan = (data: string) => {
    toast.success("QR Code scanned successfully!", {
      description: data,
    });
    setShowScanner(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white"
    >
      {/* iOS Status Bar */}
      <div className="h-12 bg-white sticky top-0 z-[50]" />

      {/* Header */}
      <div className="bg-white px-6 py-4 sticky top-12 z-[50]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <motion.div 
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center ring-1 ring-gray-100"
            >
              <User className="w-6 h-6 text-gray-700" />
            </motion.div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Selamat datang,</p>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">{username}</h1>
            </div>
          </div>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center relative ring-1 ring-gray-100"
          >
            <Bell className="w-6 h-6 text-gray-700" />
            <span className="absolute top-3.5 right-3.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
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
            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-[20px] text-base focus:outline-none focus:bg-white focus:ring-4 focus:ring-red-500/5 focus:border-red-500/20 transition-all"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-8 px-2">
          {["Hot", "Recent"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className="relative py-2 group"
            >
              <span className={`text-lg font-bold transition-colors ${
                activeTab === tab ? "text-gray-900" : "text-gray-400 group-hover:text-gray-600"
              }`}>
                {tab}
              </span>
              {activeTab === tab && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-red-500 rounded-full"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Events Section */}
      <div className="px-6 pt-2 pb-32">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">
            Upcoming Events <span className="text-gray-400 text-sm font-medium ml-1">(17 Jun)</span>
          </h2>
        </div>

        {/* Event Cards */}
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
                className="bg-white rounded-[28px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 active:scale-[0.98] transition-transform cursor-pointer group"
              >
                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100 ring-1 ring-gray-100">
                    <ImageWithFallback src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider mb-2 inline-block ${
                          event.category === 'Hot' ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-500'
                        }`}>
                          {event.category}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 leading-snug group-hover:text-red-500 transition-colors truncate">{event.title}</h3>
                    </div>
                    
                    <div className="space-y-1.5 mt-2">
                      <div className="flex items-center gap-2 text-[13px] text-gray-500 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-red-400" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[13px] text-gray-500 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-red-400" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="self-center">
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-red-400 transition-colors" />
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
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-gray-500 font-medium text-lg">Event tidak ditemukan</p>
            <p className="text-gray-400 text-sm mt-1">Coba kata kunci lain</p>
          </motion.div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 pb-8 z-[60] px-6">
        <div className="flex justify-around items-center pt-4">
          <button
            onClick={() => setShowMenu(false)}
            className={`flex flex-col items-center gap-1.5 ${!showMenu ? "text-red-500" : "text-gray-400"}`}
          >
            <div className={`w-14 h-10 flex items-center justify-center rounded-2xl transition-all ${!showMenu ? "bg-red-50" : ""}`}>
              <Home className={`w-6 h-6 ${!showMenu ? "stroke-[2.5px]" : "stroke-2"}`} />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-widest">Home</span>
          </button>
          <button
            onClick={() => setShowScanner(true)}
            className="flex flex-col items-center gap-1.5 text-gray-400 active:text-red-500 group"
          >
            <div className="w-14 h-10 flex items-center justify-center rounded-2xl group-active:bg-red-50 transition-all">
              <ScanLine className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-widest">Scan QR</span>
          </button>
          <button
            onClick={() => setShowMenu(true)}
            className={`flex flex-col items-center gap-1.5 ${showMenu ? "text-red-500" : "text-gray-400"}`}
          >
            <div className={`w-14 h-10 flex items-center justify-center rounded-2xl transition-all ${showMenu ? "bg-red-50" : ""}`}>
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
              className="relative w-[85%] max-w-sm h-full bg-white shadow-[-20px_0_60px_-15px_rgba(0,0,0,0.1)] flex flex-col rounded-l-[40px]"
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
                    className="w-16 h-16 bg-red-50 rounded-3xl flex items-center justify-center ring-1 ring-red-100"
                  >
                    <User className="w-8 h-8 text-red-500" />
                  </motion.div>
                  <button 
                    onClick={() => setShowMenu(false)}
                    className="p-3 bg-gray-50 rounded-2xl text-gray-400 active:bg-gray-100"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">{username}</h3>
                  <p className="text-gray-500 font-medium">Mahasiswa Aktif</p>
                </div>
              </div>

              {/* Menu Items */}
              <div className="flex-1 px-4 space-y-2">
                {[
                  { icon: FileText, label: "Log Pendaftaran", count: "12" },
                  { icon: Bell, label: "Notifikasi", count: "3" },
                  { icon: HelpCircle, label: "Pusat Bantuan" },
                  { icon: BookOpen, label: "Panduan Aplikasi" },
                  { icon: Settings, label: "Pengaturan" },
                ].map((item, i) => (
                  <motion.button 
                    key={item.label}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + (i * 0.05) }}
                    className="w-full px-4 py-4.5 flex items-center justify-between rounded-2xl hover:bg-gray-50 active:bg-gray-100 group transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-red-50 transition-colors">
                        <item.icon className="w-5 h-5 text-gray-600 group-hover:text-red-500" />
                      </div>
                      <span className="text-base font-bold text-gray-700 group-hover:text-gray-900">{item.label}</span>
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
              <div className="p-8 border-t border-gray-100 mb-8">
                <button 
                  onClick={() => {
                    localStorage.removeItem("campus_username");
                    navigate("/");
                  }}
                  className="w-full py-4.5 px-6 border-2 border-red-100 text-red-500 rounded-2xl font-bold flex items-center justify-center gap-3 active:bg-red-50 transition-colors"
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