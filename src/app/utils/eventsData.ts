export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  category: "Bootcamp" | "Lomba" | "Seminar" | "Workshop" | "Lainnya";
  image: string;
  organizer: string;
  quota: number;
  registered: number;
  description: string;
  benefits: string[];
}

export const mockEvents: Event[] = [
  {
    id: 1,
    title: "AI & Machine Learning Workshop",
    date: "April 15, 2026",
    time: "09:00 - 17:00 WIB",
    location: "Engineering Building, Room 301",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1762968269894-1d7e1ce8894e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwY29uZmVyZW5jZSUyMHNlbWluYXJ8ZW58MXx8fHwxNzc1ODAxMDUxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    organizer: "Himpunan Mahasiswa Teknik Informatika",
    quota: 100,
    registered: 95,
    description: "Workshop intensif tentang kecerdasan buatan dan machine learning. Peserta akan belajar dasar-dasar ML, implementasi algoritma populer, dan studi kasus nyata menggunakan Python dan TensorFlow.",
    benefits: ["Sertifikat kehadiran", "Materi workshop eksklusif", "Akses rekaman sesi", "Networking dengan praktisi industri"],
  },
  {
    id: 2,
    title: "National Tech Competition 2026",
    date: "April 18, 2026",
    time: "08:00 - 16:00 WIB",
    location: "Student Center Main Hall",
    category: "Lomba",
    image: "https://images.unsplash.com/photo-1763739532819-401f6a041b54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXR3b3JraW5nJTIwYnVzaW5lc3MlMjBtZWV0aW5nfGVufDF8fHx8MTc3NTgwMTA1NHww&ixlib=rb-4.1.0&q=80&w=1080",
    organizer: "Pusat Karir Universitas",
    quota: 50,
    registered: 42,
    description: "Lomba teknologi tingkat nasional yang menghadirkan tantangan inovatif bagi mahasiswa seluruh Indonesia.",
    benefits: ["Hadiah Jutaan Rupiah", "Sertifikat Nasional", "Relasi Nasional", "Seminar karir eksklusif"],
  },
  {
    id: 3,
    title: "Fullstack Web Bootcamp",
    date: "April 22, 2026",
    time: "08:30 - 17:30 WIB",
    location: "Conference Center",
    category: "Bootcamp",
    image: "https://images.unsplash.com/photo-1693608231470-25e1b16a23b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwY2FtcHVzJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzc1NzExMTE0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    organizer: "Badan Eksekutif Mahasiswa",
    quota: 30,
    registered: 25,
    description: "Bootcamp intensif selama 3 bulan untuk menjadi fullstack developer profesional.",
    benefits: ["Job Guarantee", "Mentoring dari alumni berprestasi", "Real-world Projects", "Makan siang bersama"],
  },
  {
    id: 4,
    title: "Sustainability Seminar 2026",
    date: "April 25, 2026",
    time: "13:00 - 15:00 WIB",
    location: "Auditorium A",
    category: "Seminar",
    image: "https://images.unsplash.com/photo-1759823656568-a13c88f8cf3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwZXZlbnQlMjBoYWxsfGVufDF8fHx8MTc3NTgwMTA1MXww&ixlib=rb-4.1.0&q=80&w=1080",
    organizer: "Fakultas Teknik Lingkungan",
    quota: 300,
    registered: 201,
    description: "Kuliah tamu dari pakar lingkungan internasional membahas tantangan dan solusi keberlanjutan.",
    benefits: ["Sertifikat kehadiran", "Buku sustainability gratis", "Sesi tanya jawab langsung", "Akses jurnal eksklusif"],
  },
  {
    id: 5,
    title: "Competitive Programming Contest",
    date: "April 28, 2026",
    time: "07:00 - 07:00 WIB (+1 hari)",
    location: "Computer Science Building",
    category: "Lomba",
    image: "https://images.unsplash.com/photo-1762968269894-1d7e1ce8894e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwY29uZmVyZW5jZSUyMHNlbWluYXJ8ZW58MXx8fHwxNzc1ODAxMDUxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    organizer: "UKM Coding Club",
    quota: 100,
    registered: 98,
    description: "Asah kemampuan problem solving kamu di kontes pemrograman paling bergengsi di kampus.",
    benefits: ["Hadiah menarik", "Mentoring dari engineer profesional", "Meal & snack selama event", "Sertifikat & merchandise eksklusif"],
  },
];
