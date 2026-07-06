import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Calendar, MapPin, Users, Clock, CheckCircle2, ChevronRight, Share2, Heart } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { useState } from "react";
import { isEventRegistered } from "../utils/registrationCache";
import { mockEvents } from "../utils/eventsData";

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
  const alreadyRegistered = isEventRegistered(event.id);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen bg-white"
    >
      {/* iOS Status Bar */}
      <div className="h-12 bg-white sticky top-0 z-50" />

      {/* Floating Header (Sticky) */}
      <div className="fixed top-12 left-0 right-0 z-50 px-6 py-4 pointer-events-none">
        <div className="flex justify-between items-center max-w-lg mx-auto">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/events")}
            className="w-12 h-12 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-2xl border border-white/20 pointer-events-auto shadow-sm active:bg-white/40"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </motion.button>
          
          <div className="flex gap-3 pointer-events-auto">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-2xl border border-white/20 shadow-sm active:bg-white/40"
            >
              <Share2 className="w-5 h-5 text-white" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsLiked(!isLiked)}
              className="w-12 h-12 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-2xl border border-white/20 shadow-sm active:bg-white/40"
            >
              <Heart className={`w-5 h-5 ${isLiked ? "text-red-500 fill-red-500" : "text-white"}`} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-80">
        <ImageWithFallback
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

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
            whileHover={alreadyRegistered ? {} : { scale: 1.02 }}
            whileTap={alreadyRegistered ? {} : { scale: 0.98 }}
            onClick={() => !alreadyRegistered && spotsLeft > 0 && navigate(`/events/${id}/register`)}
            disabled={spotsLeft === 0 || alreadyRegistered}
            className={`flex-[2] py-4.5 rounded-[24px] font-extrabold text-lg transition-all ${
              alreadyRegistered
                ? "bg-green-50 text-green-600 border-2 border-green-200"
                : spotsLeft === 0
                ? "bg-gray-200 text-gray-400"
                : "bg-red-500 text-white shadow-xl shadow-red-200 active:bg-red-600"
            }`}
          >
            {alreadyRegistered ? (
              <span className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Sudah Terdaftar
              </span>
            ) : spotsLeft === 0 ? (
              "Kuota Penuh"
            ) : (
              "Daftar Sekarang"
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
