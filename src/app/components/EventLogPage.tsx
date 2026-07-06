import { useNavigate } from "react-router";
import { ArrowLeft, Calendar, MapPin, CheckCircle2, ClipboardList, Trash2, X, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { getRegisteredEvents, removeEventRegistration } from "../utils/registrationCache";
import { mockEvents } from "../utils/eventsData";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner";

const cancelReasons = [
  "Ada jadwal kuliah mendadak",
  "Urusan keluarga",
  "Kurang tertarik dengan topik event",
  "Lokasi terlalu jauh",
  "Salah klik daftar",
  "Lainnya"
];

export function EventLogPage() {
  const navigate = useNavigate();
  const [registeredIds, setRegisteredIds] = useState(getRegisteredEvents());
  const [showCancelModal, setShowCancelModal] = useState<number | null>(null);
  const [selectedReason, setSelectedReason] = useState("");
  
  const registeredEvents = mockEvents.filter((e) => registeredIds.includes(e.id));

  const handleCancelRegistration = () => {
    if (!showCancelModal) return;
    if (!selectedReason) {
      toast.error("Pilih alasan pembatalan");
      return;
    }

    removeEventRegistration(showCancelModal);
    setRegisteredIds(getRegisteredEvents());
    toast.success("Pendaftaran berhasil dibatalkan");
    setShowCancelModal(null);
    setSelectedReason("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Status Bar */}
      <div className="h-12 bg-white" />

      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-100 flex items-center gap-3 sticky top-12 z-10">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/events")}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </motion.button>
        <div>
          <h1 className="font-bold text-gray-900">Log Pendaftaran</h1>
          <p className="text-xs text-gray-400">{registeredEvents.length} event terdaftar</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-5 pb-10">
        {registeredEvents.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center pt-20 text-center px-6"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mb-5">
              <ClipboardList className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="font-bold text-gray-800 text-lg mb-2">Belum Ada Pendaftaran</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Kamu belum mendaftar ke event manapun. Yuk jelajahi event yang tersedia!
            </p>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/events")}
              className="px-8 py-3.5 bg-red-500 text-white rounded-2xl font-bold shadow-lg shadow-red-100"
            >
              Jelajahi Event
            </motion.button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {registeredEvents.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
              >
                <div onClick={() => navigate(`/events/${event.id}`)} className="cursor-pointer">
                  {/* Image */}
                  <div className="relative h-32">
                    <ImageWithFallback
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    {/* Badge terdaftar */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-green-500 px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                      <span className="text-white text-[10px] font-bold">Terdaftar</span>
                    </div>
                    <span className="absolute bottom-3 left-3 text-white font-bold text-sm leading-tight pr-4">
                      {event.title}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="px-4 py-3 space-y-1.5">
                    <p className="text-xs font-semibold text-red-500">{event.organizer}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="w-3.5 h-3.5 shrink-0" />
                      <span>{event.date} · {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-4 pb-4">
                  <button
                    onClick={() => setShowCancelModal(event.id)}
                    className="w-full py-2.5 border-2 border-red-50 text-red-500 rounded-xl text-xs font-bold flex items-center justify-center gap-2 active:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Batalkan Pendaftaran
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Cancel Reason Modal */}
      <AnimatePresence>
        {showCancelModal !== null && (
          <div className="fixed inset-0 z-[100] flex flex-col justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
              onClick={() => {
                setShowCancelModal(null);
                setSelectedReason("");
              }}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative bg-white rounded-t-[40px] px-8 pt-4 pb-12 flex flex-col max-h-[90vh]"
            >
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-gray-900 tracking-tight">Batalkan Pendaftaran?</h2>
                  <p className="text-sm text-gray-500 font-medium">Kenapa anda ingin membatalkan?</p>
                </div>
              </div>

              <div className="space-y-2 mb-8 overflow-y-auto">
                {cancelReasons.map((reason) => (
                  <button
                    key={reason}
                    onClick={() => setSelectedReason(reason)}
                    className={`w-full text-left px-5 py-4 rounded-2xl text-sm font-bold transition-all border-2 ${
                      selectedReason === reason
                        ? "border-red-500 bg-red-50 text-red-600"
                        : "border-gray-50 bg-gray-50 text-gray-600 active:border-red-200"
                    }`}
                  >
                    {reason}
                  </button>
                ))}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setShowCancelModal(null);
                    setSelectedReason("");
                  }}
                  className="flex-1 py-4.5 bg-gray-100 text-gray-600 rounded-[20px] font-black text-sm active:bg-gray-200 transition-colors"
                >
                  Tutup
                </button>
                <button
                  onClick={handleCancelRegistration}
                  disabled={!selectedReason}
                  className="flex-[2] py-4.5 bg-red-500 text-white rounded-[20px] font-black text-sm shadow-xl shadow-red-100 active:bg-red-600 disabled:opacity-50 transition-all"
                >
                  Ya, Batalkan
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
