import { useEffect, useRef, useState } from "react";
import { X, Camera, CheckCircle2, AlertCircle, Scan } from "lucide-react";
import { Html5Qrcode } from "html5-qrcode";
import { motion, AnimatePresence } from "motion/react";

interface BarcodeScannerProps {
  onClose: () => void;
  onScan: (result: string) => void;
}

export function BarcodeScanner({ onClose, onScan }: BarcodeScannerProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isRunningRef = useRef(false);
  const closingRef = useRef(false);
  const [scanning, setScanning] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const stopScanner = () => {
    if (scannerRef.current && isRunningRef.current) {
      isRunningRef.current = false;
      scannerRef.current.stop().catch(() => {}).finally(() => {
        scannerRef.current?.clear();
      });
    }
  };

  useEffect(() => {
    const startScanner = async () => {
      try {
        const scanner = new Html5Qrcode("qr-reader");
        scannerRef.current = scanner;

        await scanner.start(
          { facingMode: "environment" },
          { fps: 15, qrbox: { width: 260, height: 260 } },
          (decodedText) => {
            isRunningRef.current = false;
            setScannedData(decodedText);
            setScanning(false);
            // Give a small delay for the success UI to show
            setTimeout(() => {
              onScan(decodedText);
            }, 800);
          },
          () => {}
        );

        isRunningRef.current = true;
        setScanning(true);
      } catch {
        setError("Izin kamera ditolak atau tidak ditemukan. Mohon aktifkan izin kamera di pengaturan browser.");
      }
    };

    startScanner();

    return () => { stopScanner(); };
  }, [onScan]);

  const handleClose = () => {
    if (closingRef.current) return;
    closingRef.current = true;
    stopScanner();
    onClose();
  };

  return (
    <>
      {/* Backdrop with sophisticated blur */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-md" 
        style={{ zIndex: 100 }} 
      />

      {/* Scanner Layer */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed inset-0"
        style={{ zIndex: 101, pointerEvents: "none" }}
      >
        <div className="flex flex-col items-center justify-center h-full">
          {/* Square Scanner Box */}
          <div className="relative w-[280px] h-[280px]">
            {/* Corner Markers */}
            <div className="absolute -top-1 -left-1 w-12 h-12 border-t-4 border-l-4 border-red-500 rounded-tl-3xl z-10" />
            <div className="absolute -top-1 -right-1 w-12 h-12 border-t-4 border-r-4 border-red-500 rounded-tr-3xl z-10" />
            <div className="absolute -bottom-1 -left-1 w-12 h-12 border-b-4 border-l-4 border-red-500 rounded-bl-3xl z-10" />
            <div className="absolute -bottom-1 -right-1 w-12 h-12 border-b-4 border-r-4 border-red-500 rounded-br-3xl z-10" />
            
            {/* Scanning Line Animation */}
            {scanning && (
              <motion.div 
                animate={{ top: ["5%", "95%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute left-2 right-2 h-[2px] bg-red-500/80 shadow-[0_0_15px_rgba(239,68,68,0.8)] z-20"
              />
            )}

            {/* The Actual Scanner Output */}
            <div
              id="qr-reader"
              className="w-full h-full rounded-[32px] overflow-hidden"
              style={{ pointerEvents: "auto" }}
            />
          </div>
        </div>
      </motion.div>

      {/* Interface Layer */}
      <div className="fixed inset-0 flex flex-col pointer-events-none" style={{ zIndex: 102 }}>
        {/* Header */}
        <div className="pt-16 px-8 pb-8 bg-gradient-to-b from-black/60 to-transparent pointer-events-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white text-2xl font-black tracking-tight">Scan Tiket</h1>
              <p className="text-white/60 text-sm font-bold uppercase tracking-widest mt-1">Arahkan ke QR Code</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleClose}
              className="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-2xl border border-white/10"
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>
          </div>
        </div>

        {/* Bottom Helper */}
        <div className="mt-auto pb-20 px-8">
          <AnimatePresence>
            {scanning && !scannedData && !error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-white/10 backdrop-blur-xl rounded-[32px] p-6 border border-white/10 flex items-center gap-5"
              >
                <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/20">
                  <Scan className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-black text-base tracking-tight">Menunggu Scan...</p>
                  <p className="text-white/60 text-[13px] font-bold">Pastikan pencahayaan cukup</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Full-screen Overlays for States */}
      <AnimatePresence>
        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[110] flex items-center justify-center px-10 bg-black/60 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-[40px] p-8 w-full max-w-sm text-center shadow-2xl"
            >
              <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-6 ring-1 ring-red-100">
                <AlertCircle className="w-10 h-10 text-red-500" />
              </div>
              <h2 className="text-xl font-black text-gray-900 mb-3 tracking-tight">Akses Ditolak</h2>
              <p className="text-sm text-gray-500 font-medium mb-8 leading-relaxed">{error}</p>
              <button
                onClick={handleClose}
                className="w-full py-4.5 bg-red-500 text-white rounded-2xl font-black shadow-lg shadow-red-100 active:bg-red-600 transition-all"
              >
                Kembali & Tutup
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Success State */}
        {scannedData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[110] flex items-center justify-center px-10 bg-red-500/20 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              className="bg-white rounded-[40px] p-8 w-full max-w-sm text-center shadow-2xl"
            >
              <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center mx-auto mb-6 ring-1 ring-green-100">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-xl font-black text-gray-900 mb-2 tracking-tight">Scan Berhasil!</h2>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-6">Data Terverifikasi</p>
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 mb-8 overflow-hidden">
                <p className="text-[13px] font-bold text-gray-600 break-all">{scannedData}</p>
              </div>
              <div className="flex items-center justify-center gap-2 text-green-600 font-black">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }} 
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-2 h-2 bg-green-500 rounded-full" 
                />
                <span>Memproses Data...</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
