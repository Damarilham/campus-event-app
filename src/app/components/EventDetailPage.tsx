import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Calendar, MapPin, Users, Clock, CheckCircle2, ChevronRight, Share2, Heart } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { useState } from "react";

const mockEvents = [
  {
    id: 1,
    title: "AI & Machine Learning Workshop",
    date: "April 15, 2026",
    time: "09:00 - 17:00 WIB",
    location: "Engineering Building, Room 301",
    category: "Hot",
    image: "https://images.unsplash.com/photo-1762968269894-1d7e1ce8894e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwY29uZmVyZW5jZSUyMHNlbWluYXJ8ZW58MXx8fHwxNzc1ODAxMDUxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    organizer: "Himpunan Mahasiswa Teknik Informatika",
    quota: 100,
    registered: 67,
    description: "Workshop intensif tentang kecerdasan buatan dan machine learning. Peserta akan belajar dasar-dasar ML, implementasi algoritma populer, dan studi kasus nyata menggunakan Python dan TensorFlow.",
    benefits: ["Sertifikat kehadiran", "Materi workshop eksklusif", "Akses rekaman sesi", "Networking dengan praktisi industri"],
  },
  {
    id: 2,
    title: "Spring Career Fair 2026",
    date: "April 18, 2026",
    time: "08:00 - 16:00 WIB",
    location: "Student Center Main Hall",
    category: "Hot",
    image: "https://images.unsplash.com/photo-1763739532819-401f6a041b54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXR3b3JraW5nJTIwYnVzaW5lc3MlMjBtZWV0aW5nfGVufDF8fHx8MTc3NTgwMTA1NHww&ixlib=rb-4.1.0&q=80&w=1080",
    organizer: "Pusat Karir Universitas",
    quota: 500,
    registered: 312,
    description: "Career Fair terbesar di kampus yang menghadirkan lebih dari 50 perusahaan nasional dan multinasional. Kesempatan emas untuk mencari magang, kerja paruh waktu, dan pekerjaan tetap.",
    benefits: ["Akses ke 50+ perusahaan", "Sesi CV review gratis", "Mock interview", "Seminar karir eksklusif"],
  },
  {
    id: 3,
    title: "Student Leadership Summit",
    date: "April 22, 2026",
    time: "08:30 - 17:30 WIB",
    location: "Conference Center",
    category: "Recent",
    image: "https://images.unsplash.com/photo-1693608231470-25e1b16a23b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwY2FtcHVzJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzc1NzExMTE0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    organizer: "Badan Eksekutif Mahasiswa",
    quota: 200,
    registered: 89,
    description: "Summit kepemimpinan mahasiswa yang mempertemukan para pemimpin organisasi kampus untuk berbagi pengalaman, belajar dari tokoh inspiratif, dan membangun jaringan antar organisasi.",
    benefits: ["Sertifikat kepemimpinan", "Mentoring dari alumni berprestasi", "Team building activities", "Makan siang bersama"],
  },
  {
    id: 4,
    title: "Guest Lecture: Sustainability",
    date: "April 25, 2026",
    time: "13:00 - 15:00 WIB",
    location: "Auditorium A",
    category: "Recent",
    image: "https://images.unsplash.com/photo-1759823656568-a13c88f8cf3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwZXZlbnQlMjBoYWxsfGVufDF8fHx8MTc3NTgwMTA1MXww&ixlib=rb-4.1.0&q=80&w=1080",
    organizer: "Fakultas Teknik Lingkungan",
    quota: 300,
    registered: 201,
    description: "Kuliah tamu dari pakar lingkungan internasional membahas tantangan dan solusi keberlanjutan di era modern. Diskusi mendalam tentang energi terbarukan, pengelolaan limbah, dan kebijakan lingkungan.",
    benefits: ["Sertifikat kehadiran", "Buku sustainability gratis", "Sesi tanya jawab langsung", "Akses jurnal eksklusif"],
  },
  {
    id: 5,
    title: "Hackathon 2026",
    date: "April 28, 2026",
    time: "07:00 - 07:00 WIB (+1 hari)",
    location: "Computer Science Building",
    category: "Hot",
    image: "https://images.unsplash.com/photo-1762968269894-1d7e1ce8894e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwY29uZmVyZW5jZSUyMHNlbWluYXJ8ZW58MXx8fHwxNzc1ODAxMDUxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    organizer: "UKM Coding Club",
    quota: 150,
    registered: 143,
    description: "Hackathon 24 jam bertemakan Smart Campus. Peserta akan membentuk tim 3-5 orang untuk membangun solusi inovatif berbasis teknologi bagi permasalahan kampus. Total hadiah senilai Rp 30 juta.",
    benefits: ["Total hadiah Rp 30 juta", "Mentoring dari engineer profesional", "Meal & snack selama event", "Sertifikat & merchandise eksklusif"],
  },
];

export function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

  const event = mockEvents.find((e) => e.id === Number(id));

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-gray-500 mb-6 font-medium">Event tidak ditemukan</p>
          <button 
            onClick={() => navigate("/events")} 
            className="px-6 py-3 bg-red-500 text-white rounded-2xl font-bold"
          >
            Kembali ke Home
          </button>
        </div>
      </div>
    );
  }

  const spotsLeft = event.quota - event.registered;
  const fillPercent = Math.round((event.registered / event.quota) * 100);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen bg-white"
    >
      {/* iOS Status Bar */}
      <div className="h-12 bg-white sticky top-0 z-50" />

      {/* Hero Image */}
      <div className="relative h-80">
        <ImageWithFallback
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Floating buttons */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/events")}
            className="w-12 h-12 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-2xl border border-white/20"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </motion.button>
          
          <div className="flex gap-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-2xl border border-white/20"
            >
              <Share2 className="w-5 h-5 text-white" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsLiked(!isLiked)}
              className="w-12 h-12 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-2xl border border-white/20"
            >
              <Heart className={`w-5 h-5 ${isLiked ? "text-red-500 fill-red-500" : "text-white"}`} />
            </motion.button>
          </div>
        </div>

        {/* Hero Title Overlay */}
        <div className="absolute bottom-6 left-6 right-6">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="px-3 py-1 bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg mb-3 inline-block"
          >
            {event.category}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white font-extrabold text-2xl leading-tight"
          >
            {event.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white/80 text-sm font-medium mt-1"
          >
            {event.organizer}
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8 pb-36">
        {/* Info Highlights */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-4 bg-gray-50 rounded-[24px] border border-gray-100">
            <Calendar className="w-6 h-6 text-red-500 mb-2" />
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Tanggal</p>
            <p className="text-sm font-bold text-gray-900 mt-0.5">{event.date}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-[24px] border border-gray-100">
            <Clock className="w-6 h-6 text-red-500 mb-2" />
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Waktu</p>
            <p className="text-sm font-bold text-gray-900 mt-0.5">{event.time}</p>
          </div>
        </div>

        {/* Location Info */}
        <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-[24px] border border-gray-100 mb-8">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center ring-1 ring-gray-100 shadow-sm shrink-0">
            <MapPin className="w-6 h-6 text-red-500" />
          </div>
          <div className="flex-1">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Lokasi Event</p>
            <p className="text-[15px] font-bold text-gray-900">{event.location}</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-300" />
        </div>

        {/* Attendance Info */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="font-bold text-gray-900">Kapasitas Peserta</h2>
            <p className="text-sm font-bold text-red-500">{event.registered} / {event.quota}</p>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-2 shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${fillPercent}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full"
            />
          </div>
          <p className="text-xs text-gray-400 font-medium px-1 italic">Tersisa {spotsLeft} kuota pendaftaran lagi</p>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-lg font-extrabold text-gray-900 mb-3">Tentang Event</h2>
          <p className="text-gray-600 leading-relaxed font-medium">{event.description}</p>
        </div>

        {/* Benefits */}
        <div className="mb-8">
          <h2 className="text-lg font-extrabold text-gray-900 mb-4">Keuntungan Peserta</h2>
          <div className="grid grid-cols-1 gap-3">
            {event.benefits.map((b, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
                key={i} 
                className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl"
              >
                <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-red-500" />
                </div>
                <span className="text-sm font-bold text-gray-700">{b}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 px-6 pt-4 pb-10 z-[60]">
        <div className="flex gap-4 items-center max-w-lg mx-auto">
          <div className="flex-1">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-0.5">Mulai Dari</p>
            <p className="text-lg font-black text-gray-900">FREE</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/events/${id}/register`)}
            disabled={spotsLeft === 0}
            className="flex-[2] py-4.5 bg-red-500 text-white rounded-[24px] font-extrabold text-lg shadow-xl shadow-red-200 active:bg-red-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none transition-all"
          >
            {spotsLeft === 0 ? "Kuota Penuh" : "Daftar Sekarang"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
