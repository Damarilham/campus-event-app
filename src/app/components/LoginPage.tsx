import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { User, Lock, Eye, EyeOff, CalendarDays, ArrowRight } from "lucide-react";

export function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim()) {
      setError("Username wajib diisi");
      return;
    }
    if (!password) {
      setError("Password wajib diisi");
      return;
    }
    if (password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);

    localStorage.setItem("campus_username", username.trim());
    navigate("/events");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      className="min-h-screen bg-white flex flex-col"
    >
      {/* Status Bar */}
      <div className="h-12" />

      {/* Top Section */}
      <div className="pt-8 pb-12 px-8 flex flex-col items-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-20 h-20 bg-red-50 rounded-[24px] flex items-center justify-center mb-6 shadow-sm ring-1 ring-red-100"
        >
          <CalendarDays className="w-10 h-10 text-red-500" />
        </motion.div>
        <motion.h1 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-900 text-3xl font-extrabold tracking-tight"
        >
          Campus Events
        </motion.h1>
        <motion.p 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-500 text-base mt-2 text-center"
        >
          Temukan & ikuti event kampusmu <br /> dengan pengalaman yang lebih seru.
        </motion.p>
      </div>

      {/* Form Section */}
      <div className="flex-1 px-8 pb-10">
        <form onSubmit={handleLogin} className="space-y-6">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-2 px-1">Username</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
              <input
                type="text"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError(""); }}
                placeholder="Masukkan username"
                autoComplete="username"
                className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-100 rounded-[20px] text-base focus:outline-none focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/5 transition-all"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <label className="block text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-2 px-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="Masukkan password"
                autoComplete="current-password"
                className="w-full pl-12 pr-12 py-4 bg-gray-50/50 border border-gray-100 rounded-[20px] text-base focus:outline-none focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/5 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </motion.div>

          {/* Error */}
          {error && (
            <motion.p 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-2xl px-4 py-3 font-medium"
            >
              {error}
            </motion.p>
          )}

          {/* Lupa password */}
          <div className="text-right px-1">
            <button type="button" className="text-sm text-red-500 font-bold hover:text-red-600">
              Lupa password?
            </button>
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-4.5 bg-red-500 text-white rounded-[22px] font-bold text-lg shadow-lg shadow-red-200 active:bg-red-600 disabled:opacity-60 flex items-center justify-center gap-3 transition-all"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                <span>Memproses...</span>
              </>
            ) : (
              <>
                <span>Masuk Sekarang</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </motion.button>
        </form>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-gray-400 mt-10 font-medium"
        >
          Belum punya akun?{" "}
          <button type="button" className="text-red-500 font-bold hover:underline">
            Daftar Disini
          </button>
        </motion.p>
      </div>
    </motion.div>
  );
}
