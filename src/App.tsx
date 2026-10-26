import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Check, ChevronDown, ExternalLink } from 'lucide-react'
import './App.css'

const courses = [
  ['Filosofi Pendidikan dan Pendidikan Nilai', 'Pemahaman mengenai sejarah, filosofi pendidikan, serta penanaman pendidikan nilai.', 'Pedagogik', 'SEMESTER 1'],
  ['Peserta Didik dan Pemahamannya', 'Dokumentasi proses memahami karakteristik, perkembangan, dan kebutuhan peserta didik.', 'Pedagogik', 'SEMESTER 1'],
  ['Pembelajaran Mendalam dan Asesmen Dasar', 'Rancangan modul ajar beserta instrumen asesmen dasar sebagai bukti pembelajaran mendalam.', 'Pedagogik', 'SEMESTER 1'],
  ['Pengalaman Lapangan (PPL) Terbimbing', 'Observasi, asistensi, dan praktik mengajar dengan pendampingan langsung di sekolah.', 'PPL', 'SEMESTER 1'],
  ['Pola Pikir Bertumbuh (Growth Mindset)', 'Jurnal refleksi diri mengenai perkembangan mindset dan cara merespons tantangan.', 'Refleksi', 'SEMESTER 1'],
  ['Pembelajaran Kreatif dan Inovatif', 'Media pembelajaran interaktif dan strategi kreatif yang dirancang untuk kelas.', 'PSE', 'SEMESTER 2'],
  ['Pembelajaran Sosial Emosional', 'Integrasi kompetensi sosial emosional untuk menciptakan lingkungan belajar yang aman.', 'PSE', 'SEMESTER 2'],
  ['Pembelajaran Mendalam dan Asesmen Lanjut', 'Instrumen evaluasi HOTS dan analisis penilaian tingkat lanjut.', 'Pedagogik', 'SEMESTER 2'],
  ['Praktik Pengalaman Lapangan Mandiri', 'Praktik mengajar mandiri dengan tanggung jawab penuh dalam mengelola kelas.', 'PPL', 'SEMESTER 2'],
  ['Projek Kepemimpinan', 'Proyek inovatif berbasis sekolah atau komunitas beserta evaluasinya.', 'Kepemimpinan', 'SEMESTER 2'],
  ['Pengembangan Keprofesian Berkelanjutan', 'Action plan pengembangan diri dan peta jalan profesional pasca PPG.', 'Refleksi', 'SEMESTER 2'],
]
const artifactLinks: Record<string, string | null> = {
  'Filosofi Pendidikan dan Pendidikan Nilai': 'https://drive.google.com/file/d/1GUEGxU0yZ94sl68Kjg81FXoOzmJAQTjw/view?usp=sharing',
  'Peserta Didik dan Pemahamannya': 'https://drive.google.com/file/d/1G0ewVMQ4_laNbtzn2EtcYVh_RoGpIG7k/view?usp=sharing',
  'Pembelajaran Mendalam dan Asesmen Dasar': 'https://drive.google.com/file/d/1F_SixNXjE47T2GJMsxBtBbGaOLQ0BQGX/view?usp=sharing',
  'Pengalaman Lapangan (PPL) Terbimbing': 'https://drive.google.com/file/d/1WtjtcIXF-asSthZYUvrcA-HlzQr1Dncv/view?usp=sharing',
  'Pola Pikir Bertumbuh (Growth Mindset)': 'https://drive.google.com/file/d/109jFjCKF9SmYwwhSsMFs9f2Qc1IM7-AC/view?usp=sharing',
  'Pembelajaran Kreatif dan Inovatif': 'https://drive.google.com/file/d/17hTBGudyRq4_-OVnwFhfygt8jLXIESrW/view?usp=sharing',
  'Pembelajaran Sosial Emosional': 'https://drive.google.com/file/d/1rXRf5ME--KkmW83FekLRgt3-4izcUqDq/view?usp=sharing',
  'Pembelajaran Mendalam dan Asesmen Lanjut': 'https://drive.google.com/file/d/1eNXlW2rF50xJGOAS-MOLRTU1aPymDfxI/view?usp=sharing',
  'Praktik Pengalaman Lapangan Mandiri': null,
  'Projek Kepemimpinan': 'https://drive.google.com/file/d/1AbqswMqESY-JF0wfUStRxN7U8zuaO4Zu/view?usp=sharing',
  'Pengembangan Keprofesian Berkelanjutan': 'https://drive.google.com/file/d/1L3mcZE0_5Kx5kYnUP_Y8T_O-PNuOxgJo/view?usp=sharing',
}
const journeyDetails: Record<string, { learning: string[]; skills: string[]; reflection: string }> = {
  'Filosofi Pendidikan dan Pendidikan Nilai': { learning: ['Filosofi pendidikan', 'Pendidikan nilai', 'Landasan pemikiran pendidikan'], skills: ['Reflektif', 'Landasan pedagogis'], reflection: 'Pembelajaran menjadi lebih bermakna ketika pendidik memahami landasan dan esensi nilai dari pendidikan.' },
  'Peserta Didik dan Pemahamannya': { learning: ['Karakteristik peserta didik', 'Perkembangan peserta didik', 'Keragaman kebutuhan belajar'], skills: ['Berpihak pada murid', 'Observasi'], reflection: 'Pemahaman yang utuh terhadap peserta didik membantu guru merancang pengalaman belajar yang relevan dan inklusif.' },
  'Pembelajaran Mendalam dan Asesmen Dasar': { learning: ['Prinsip pembelajaran mendalam', 'Perencanaan modul ajar', 'Asesmen diagnostik dan formatif'], skills: ['Perencanaan', 'Asesmen'], reflection: 'Perencanaan yang selaras dengan asesmen membuat proses belajar lebih terarah dan memberi ruang untuk perbaikan.' },
  'Pengalaman Lapangan (PPL) Terbimbing': { learning: ['Observasi budaya sekolah', 'Asistensi pembelajaran', 'Praktik mengajar terbimbing'], skills: ['Kolaboratif', 'Praktik pedagogis'], reflection: 'Pengalaman lapangan mempertemukan teori dengan situasi kelas yang nyata dan beragam.' },
  'Pola Pikir Bertumbuh (Growth Mindset)': { learning: ['Pola pikir bertumbuh', 'Jurnal refleksi diri', 'Respons terhadap tantangan'], skills: ['Reflektif', 'Tangguh'], reflection: 'Tantangan dalam proses belajar menjadi kesempatan untuk mengenali strategi baru dan terus bertumbuh.' },
  'Pembelajaran Kreatif dan Inovatif': { learning: ['Media pembelajaran interaktif', 'Strategi kreatif', 'Desain pengalaman belajar'], skills: ['Kreatif', 'Inovatif'], reflection: 'Kreativitas membantu guru menghadirkan pembelajaran yang dekat dengan konteks dan kebutuhan murid.' },
  'Pembelajaran Sosial Emosional': { learning: ['Kesadaran diri', 'Keterampilan berelasi', 'Budaya kelas yang aman'], skills: ['Empati', 'Regulasi diri'], reflection: 'Kesiapan sosial emosional menjadi fondasi agar murid dapat belajar, berkolaborasi, dan berkembang dengan nyaman.' },
  'Pembelajaran Mendalam dan Asesmen Lanjut': { learning: ['Asesmen HOTS', 'Analisis hasil belajar', 'Umpan balik bermakna'], skills: ['Analitis', 'Evaluatif'], reflection: 'Data asesmen membantu guru mengambil keputusan pembelajaran yang lebih tepat dan berpihak pada perkembangan murid.' },
  'Praktik Pengalaman Lapangan Mandiri': { learning: ['Pengelolaan kelas mandiri', 'Praktik mengajar', 'Evaluasi pembelajaran'], skills: ['Mandiri', 'Manajemen kelas'], reflection: 'Praktik mandiri melatih kesiapan profesional sekaligus kepekaan dalam membaca dinamika kelas.' },
  'Projek Kepemimpinan': { learning: ['Identifikasi kebutuhan sekolah', 'Perencanaan projek', 'Evaluasi dampak'], skills: ['Kepemimpinan', 'Kolaborasi'], reflection: 'Kepemimpinan pendidikan tumbuh melalui keberanian menginisiasi perubahan dan melibatkan komunitas.' },
  'Pengembangan Keprofesian Berkelanjutan': { learning: ['Evaluasi diri profesional', 'Action plan pengembangan', 'Peta jalan pasca PPG'], skills: ['Pembelajar sepanjang hayat', 'Perencanaan karier'], reflection: 'Pengembangan profesional yang konsisten menjaga semangat belajar dan kualitas kontribusi guru.' },
}
const courseDetailContent: Record<string, { summary: string; learning: string[]; skills: string[]; reflection: string }> = {
  'Filosofi Pendidikan dan Pendidikan Nilai': {
    summary: 'Mempelajari dasar berpikir pendidikan dan nilai karakter yang menjadi landasan dalam membimbing peserta didik.',
    learning: ['Landasan filosofis pendidikan', 'Nilai dan karakter dalam pembelajaran', 'Peran guru sebagai pembimbing'],
    skills: ['Reflektif', 'Berpihak pada murid', 'Filosofis'],
    reflection: 'Mempelajari filosofi dan pendidikan nilai memberikan fondasi moral yang kuat bagi perjalanan saya sebagai pendidik. Saya belajar bahwa setiap proses pembelajaran harus memiliki ruh yang menumbuhkan karakter, sehingga mampu memerdekakan siswa untuk berkembang sesuai potensi dan martabatnya.'
  },
  'Peserta Didik dan Pemahamannya': {
    summary: 'Memahami karakteristik, kebutuhan, dan perkembangan peserta didik agar pembelajaran lebih sesuai dan inklusif.',
    learning: ['Karakteristik peserta didik', 'Perkembangan psikologis dan sosial', 'Pemetaan kebutuhan belajar'],
    skills: ['Observasi', 'Empati', 'Analisis kebutuhan'],
    reflection: 'Mengajar bukan tentang memaksakan satu metode untuk semua orang, melainkan memahami perkembangan psikologis dan sosial siswa. Pengalaman belajar ini mengasah kemampuan saya untuk menganalisis kebutuhan belajar murid, sehingga dapat menyajikan pembelajaran yang relevan, aman, dan berpihak pada tumbuh kembang peserta didik'
  },
  'Pembelajaran Mendalam dan Asesmen Dasar': {
    summary: 'Mendesain pembelajaran yang bermakna dan menyusun asesmen yang sesuai dengan kebutuhan serta tahap perkembangan peserta didik.',
    learning: ['Modul ajar', 'Pembelajaran aktif', 'Asesmen diagnostik dan formatif'],
    skills: ['Merancang pembelajaran', 'Menyusun asesmen', 'Evaluatif'],
    reflection: 'Saya menyadari bahwa asesmen dan perencanaan pembelajaran adalah satu kesatuan yang tidak terpisahkan. Penerapan UbD melatih saya untuk merancang aktivitas belajar berdasarkan tujuan dan asesmen yang jelas, sementara pendekatan DUP memastikan bahwa setiap akses serta modalitas belajar siswa terfasilitasi sehingga proses pembelajaran menjadi lebih bermakna dan inklusif.'
  },
  'Pengalaman Lapangan (PPL) Terbimbing': {
    summary: 'Mengamati langsung praktik pembelajaran di sekolah dan belajar dari konteks nyata kelas serta interaksi guru-murid.',
    learning: ['Observasi pembelajaran', 'Asistensi guru pamong', 'Praktik mengajar terbimbing'],
    skills: ['Kolaboratif', 'Adaptif', 'Profesional'],
    reflection: 'Pengalaman lapangan membuka wawasan saya tentang realitas ruang kelas yang sesungguhnya. Melalui tahapan observasi, asistensi, dan praktik mengajar terbimbing, saya belajar mengintegrasikan teori pembelajaran ke dalam praktik nyata, merespons dinamika siswa secara adil, serta terus mengasah kemampuan adaptasi dan kolaborasi bersama Dosen Pembimbing Lapangan dan Guru Pamong.'
  },
  'Pola Pikir Bertumbuh (Growth Mindset)': {
    summary: 'Mengembangkan sikap belajar yang resilien, terbuka terhadap kritik, dan siap terus berkembang dalam proses profesional.',
    learning: ['Refleksi diri', 'Resiliensi', 'Pengembangan kemampuan melalui tantangan'],
    skills: ['Reflektif', 'Tangguh', 'Belajar sepanjang hayat'],
    reflection: 'Mempelajari pola pikir bertumbuh membuka kesadaran kritis saya tentang pentingnya memandang potensi tanpa batas, baik pada diri sendiri maupun pada peserta didik. Pengalaman ini menginspirasi saya untuk tidak hanya mengembangkan kapasitas pribadi, tetapi juga menciptakan lingkungan belajar yang menghargai proses, usaha, dan keberanian murid dalam mencoba.'
  },
  'Pembelajaran Kreatif dan Inovatif': {
    summary: 'Merancang strategi dan media pembelajaran yang kreatif agar proses belajar lebih menarik, efektif, dan relevan.',
    learning: ['Media pembelajaran inovatif', 'Metode kreatif', 'Desain pengalaman belajar'],
    skills: ['Kreatif', 'Inovatif', 'Komunikatif'],
    reflection: 'Mempelajari pembelajaran kreatif dan inovatif melatih saya untuk berpikir eksploratif dalam merancang strategi mengajar. Saya memahami pentingnya keberanian mencoba pendekatan baru yang berpusat pada siswa, sehingga ruang kelas dapat menjadi tempat yang dinamis untuk menumbuhkan daya pikir kritis, kolaborasi, dan rasa ingin tahu peserta didik.'
  },
  'Pembelajaran Sosial Emosional': {
    summary: 'Memahami pentingnya kesejahteraan sosial emosional dalam pembelajaran agar lingkungan kelas lebih aman dan suportif.',
    learning: ['Kesadaran diri', 'Pengelolaan emosi', 'Keterampilan sosial'],
    skills: ['Empati', 'Regulasi diri', 'Kolaborasi'],
    reflection: 'Mempelajari Pembelajaran Sosial Emosional membuka pandangan saya bahwa untuk membentuk karakter siswa, seorang guru harus terlebih dahulu memiliki regulasi emosi dan kesadaran diri yang baik. Pengalaman ini membekali saya dengan strategi pengajaran yang tidak hanya fokus pada materi, tetapi juga menumbuhkan keterampilan sosial, empati, dan ketangguhan mental peserta didik.'
  },
  'Pembelajaran Mendalam dan Asesmen Lanjut': {
    summary: 'Melanjutkan pengembangan profesional melalui perencanaan asesmen yang lebih kompleks dan berbasis kebutuhan belajar.',
    learning: ['Asesmen berbasis HOTS', 'Analisis hasil belajar', 'Umpan balik berkelanjutan'],
    skills: ['Analitis', 'Evaluatif', 'Strategis'],
    reflection: 'Saya menyadari bahwa asesmen lanjut adalah kunci untuk melakukan perbaikan pembelajaran secara terukur. Pengalaman belajar ini membekali saya kemampuan menganalisis data hasil belajar murid untuk menyesuaikan modul ajar, memberikan umpan balik yang konstruktif, serta memastikan setiap peserta didik mencapai kompetensi secara mendalam dan menyeluruh.'
  },
  'Praktik Pengalaman Lapangan Mandiri': {
    summary: 'Mengelola pembelajaran secara mandiri dengan penuh tanggung jawab untuk melatih kesiapan menjadi guru profesional.',
    learning: ['Pengelolaan kelas', 'Praktik pembelajaran mandiri', 'Evaluasi dan tindak lanjut'],
    skills: ['Mandiri', 'Manajemen kelas', 'Pengambilan keputusan'],
    reflection: 'Praktik mengajar secara mandiri memberikan kesempatan berharga untuk menguji seluruh teori pedagogi dan asesmen yang telah dipelajari. Mengemban tanggung jawab penuh dalam merancang, melaksanakan, hingga mengevaluasi pembelajaran membentuk ketahanan mental dan kepekaan saya sebagai pendidik profesional yang reflektif.'
  },
  'Projek Kepemimpinan': {
    summary: 'Mengembangkan projek kepemimpinan yang memberi dampak pada sekolah, murid, dan komunitas belajar.',
    learning: ['Perencanaan proyek', 'Implementasi inovasi', 'Evaluasi dampak'],
    skills: ['Kepemimpinan', 'Kolaborasi', 'Inovasi'],
    reflection: 'Melalui Projek Kepemimpinan, saya belajar bahwa kepemimpinan dalam pendidikan adalah tentang menggerakkan perubahan dan menghadirkan solusi nyata. Pengalaman merancang serta mengelola proyek berbasis sekolah/komunitas ini mengasah keterampilan kolaborasi, manajemen risiko, dan komunikasi saya untuk menciptakan inovasi berkelanjutan yang memberikan dampak positif bagi lingkungan sekitar.'
  },
  'Pengembangan Keprofesian Berkelanjutan': {
    summary: 'Merencanakan pengembangan diri secara berkelanjutan agar terus tumbuh sebagai pendidik sepanjang hayat.',
    learning: ['Evaluasi diri', 'Perencanaan karier', 'Pengembangan profesional'],
    skills: ['Pembelajar sepanjang hayat', 'Perencanaan', 'Inisiatif'],
    reflection: 'Pembelajaran ini menanamkan kesadaran bahwa menjadi guru profesional adalah perjalanan panjang yang memerlukan evaluasi dan komitmen berkesinambungan. Pengalaman ini menginspirasi saya untuk terus bertransformasi menjadi pendidik yang reflektif, berinisiatif, dan tangguh sebagai pembelajar sepanjang hayat.'
  },
}
// ============================================================================
// DATA PILAR PPL MANDIRI (6 PILAR)
// Untuk menambahkan link dokumen/video, isi nilai pada properti `driveUrl`
// Contoh: driveUrl: 'https://drive.google.com/file/d/.../view?usp=sharing'
// ============================================================================
export interface PPLPillarItem {
  id: 'rancangan' | 'materi' | 'media' | 'video' | 'nonmengajar' | 'penilaian'
  badge: string
  title: string
  subtitle: string
  description: string
  keyPoints: string[]
  driveUrl: string | null // <-- TEMPAT MELETAKKAN LINK DRIVE / YOUTUBE
  actionLabel: string
  fileType: string
}

const pplPillarsData: Record<'rancangan' | 'materi' | 'media' | 'video' | 'nonmengajar' | 'penilaian', PPLPillarItem> = {
  rancangan: {
    id: 'rancangan',
    badge: 'PILAR 01 · RANCANGAN PEMBELAJARAN',
    title: 'Analisis Produk Rancangan / Perencanaan Pembelajaran',
    subtitle: 'Evaluasi modul ajar berbasis prinsip Understanding by Design (UbD) dan diferensiasi pembelajaran.',
    description: 'Rancangan modul ajar disusun dengan menerapkan kerangka Understanding by Design (UbD) yang berorientasi pada capaian pembelajaran, diferensiasi konten/proses/produk, serta pengintegrasian pembelajaran sosial emosional (PSE).',
    keyPoints: [
      'Alur Tujuan Pembelajaran (ATP) terukur & berorientasi HOTS',
      'Penerapan diferensiasi berbasis asesmen diagnostik awal murid',
      'Integrasi kesepakatan kelas dan nilai karakter budi pekerti',
    ],
    driveUrl: 'https://drive.google.com/drive/folders/1iCqaKmyQzmKRJwBMKncWHRmMcu1Ayh1x?usp=sharing', // <-- Masukkan Link Google Drive Modul Ajar/RPP
    actionLabel: 'Buka Dokumen Modul Ajar (Google Drive)',
    fileType: 'Dokumen Modul Ajar & RPP',
  },
  materi: {
    id: 'materi',
    badge: 'PILAR 02 · BAHAN AJAR',
    title: 'Analisis Materi Pembelajaran yang Disusun & Diterapkan',
    subtitle: 'Kedalaman bahan ajar, kontekstualisasi kearifan lokal, dan penguatan literasi-numerasi.',
    description: 'Bahan ajar dirancang relevan dengan kehidupan nyata peserta didik, mengakomodasi kontekstualisasi masalah aktual di sekitar siswa, serta memfasilitasi peningkatan kecakapan literasi dan numerasi secara bertahap.',
    keyPoints: [
      'Struktur materi tersusun runut dari konsep konkret ke pemahaman abstrak',
      'Kontekstualisasi kearifan lokal dan situasi kehidupan nyata siswa',
      'Penyediaan sumber belajar pendukung multisumber yang inklusif',
    ],
    driveUrl: 'https://drive.google.com/drive/folders/1MfU5yHSTN5vfZ7C8cfhOLexFr0-co12r?usp=sharing', // <-- Masukkan Link Google Drive Bahan Ajar
    actionLabel: 'Buka Bahan & Materi Ajar (Google Drive)',
    fileType: 'Bahan Ajar & Handout',
  },
  media: {
    id: 'media',
    badge: 'PILAR 03 · MEDIA & ALAT BANTU',
    title: 'Analisis Media Pembelajaran yang Dipergunakan',
    subtitle: 'Efektivitas alat peraga konkret, media digital interaktif, dan keterlibatan visual siswa.',
    description: 'Pemanfaatan media pembelajaran interaktif (termasuk media digital & alat peraga konkret) untuk memicu atensi, memvisualisasikan konsep abstrak, dan memfasilitasi partisipasi aktif seluruh peserta didik.',
    keyPoints: [
      'Media visual dan interaktif yang memudahkan pemahaman konsep',
      'Kesesuaian media dengan modalitas belajar (audio, visual, kinestetik)',
      'Interaktivitas respons siswa saat proses kegiatan belajar berlangsung',
    ],
    driveUrl: 'https://drive.google.com/drive/folders/1eTuvFLLu50xWIj03XWnMv2YNoIXkYBGc?usp=sharing', // <-- Masukkan Link Google Drive / Canva Media
    actionLabel: 'Buka Media Pembelajaran (Drive / Canva)',
    fileType: 'Media Presentasi & Alat Bantu',
  },
  video: {
    id: 'video',
    badge: 'PILAR 04 · VIDEO PRAKTIK MENGAJAR',
    title: 'Analisis Video Pelaksanaan Praktik Mengajar Mandiri',
    subtitle: 'Rekaman video mengajar mandiri, sintaks pembelajaran nyata, alokasi waktu, dan interaksi murid.',
    description: 'Dokumentasi video pelaksanaan praktik mengajar mandiri menampilkan keterlaksanaan sintaks secara utuh dari kegiatan apersepsi, kegiatan inti berdiferensiasi, hingga asesmen formatif dan penutup reflektif.',
    keyPoints: [
      'Keterlaksanaan sintaks model pembelajaran (PBL / PJBL)',
      'Manajemen kelas efektif, artikulasi instruksi, dan apresiasi positif',
      'Kualitas interaksi dialogis dan iklim belajar yang aman & suportif',
    ],
    driveUrl: 'https://drive.google.com/drive/folders/1UT8w9SBxalVfmTkgenIfaufsMAZzezjf?usp=sharing', // <-- Masukkan Link YouTube / Google Drive Video Praktik
    actionLabel: 'Tonton Video Praktik Mengajar (YouTube / Drive)',
    fileType: 'Rekaman Video Praktik Mengajar',
  },
  nonmengajar: {
    id: 'nonmengajar',
    badge: 'PILAR 05 · TUGAS NON-MENGAJAR',
    title: 'Analisis Kegiatan Non-Mengajar di Sekolah Mitra',
    subtitle: 'Kontribusi tugas persekolahan: piket harian, upacara, pembinaan ekstrakurikuler, dan administrasi.',
    description: 'Keterlibatan aktif dalam seluruh ekosistem persekolahan sebagai bentuk internalisasi peran guru seutuhnya, meliputi pelaksanaan piket kedisiplinan gerbang, pembinaan upacara bendera, bimbingan ekskul, serta tata kelola administrasi sekolah mitra.',
    keyPoints: [
      'Pelaksanaan tugas piket harian dan pemantauan budaya 5S sekolah',
      'Pendampingan upacara bendera, apel pagi, dan kegiatan keagamaan',
      'Kolaborasi pembinaan bakat/ekskul siswa dan administrasi sekolah',
    ],
    driveUrl: 'https://drive.google.com/drive/folders/1eTuvFLLu50xWIj03XWnMv2YNoIXkYBGc?usp=sharing', // <-- Masukkan Link Google Drive Laporan Non-Mengajar
    actionLabel: 'Buka Laporan Kegiatan Non-Mengajar (Google Drive)',
    fileType: 'Laporan & Foto Non-Mengajar',
  },
  penilaian: {
    id: 'penilaian',
    badge: 'PILAR 06 · ASESMEN & EVALUASI',
    title: 'Instrumen Penilaian yang Dirancang beserta Analisisnya',
    subtitle: 'Kisi-kisi asesmen diagnostik, formatif, sumatif, rubrik penilaian, dan analisis ketercapaian.',
    description: 'Penyusunan instrumen evaluasi yang selaras dengan tujuan pembelajaran, mencakup asesmen awal (diagnostik), asesmen proses (formatif berkelanjutan), serta rubrik penilaian autentik ranah kognitif, afektif, dan psikomotorik.',
    keyPoints: [
      'Kesesuaian kisi-kisi dan indikator ketercapaian tujuan pembelajaran',
      'Rubrik penilaian holistik ranah kognitif, afektif, dan psikomotorik',
      'Analisis ketuntasan hasil belajar dan tindak lanjut remidial/pengayaan',
    ],
    driveUrl: 'https://drive.google.com/drive/folders/1eJqKv2fFSx198xtcT0auKqrybmJeSYN0?usp=sharing', // <-- Masukkan Link Google Drive Instrumen Penilaian
    actionLabel: 'Buka Instrumen Penilaian & Rubrik (Google Drive)',
    fileType: 'Kisi-kisi, Rubrik & Analisis Nilai',
  },
}

const gallery = [
  ['Praktik Mengajar di Kelas', 'Praktik Mengajar', '/gallery/Praktik-mengajar.jpeg'],
  ['Bimbingan Reflektif dengan Guru Pamong', 'Bimbingan & Mentoring', '/gallery/Bimbingan.jpeg'],
  ['Presentasi Produk Inovasi Pembelajaran', 'Presentasi & Inovasi', '/gallery/presentasi-siswa.jpeg'],
]

function App() {
  const [semester, setSemester] = useState('Semua')
  const [journeySemester, setJourneySemester] = useState('SEMESTER 1')
  const [openJourney, setOpenJourney] = useState(courses[0][0])
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [innovationTab, setInnovationTab] = useState<'identitas' | 'riset' | 'rancangan' | 'evaluasi'>('identitas')
  const [pplTab, setPplTab] = useState<'rancangan' | 'materi' | 'media' | 'video' | 'nonmengajar' | 'penilaian'>('rancangan')
  const [energyBoost, setEnergyBoost] = useState(85)
  const [sent, setSent] = useState(false)
  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }
  const openCourse = (title: string) => { setSelectedCourse(title); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const filteredCourses = semester === 'Semua' ? courses : courses.filter((course) => course[3] === semester)
  return <div className="reference-site">
    <header className="reference-header"><button className="reference-brand" onClick={() => go('beranda')}>
      <span>PP</span>
      <strong>Portfolio.</strong>
      </button><nav className="main-nav" aria-label="Navigasi utama">
        {[['beranda', 'Beranda'], ['tentang', 'Profil & Visi'], ['inovasi', 'Karya Inovasi'], ['ppl-mandiri', 'Praktik PPL'], ['matakuliah', 'Akademik'], ['galeri', 'Galeri'], ['artifak', 'Artifak'], ['kontak', 'Kontak']].map(([id, label]) => <button key={id} onClick={() => go(id)}>{label}</button>)}</nav></header>
    <main>{selectedCourse ? <CourseDetail title={selectedCourse} onBack={() => setSelectedCourse(null)} /> : <>
    <section id="beranda" className="landing-hero page-width">
    <div className="hero-orb" />
        <div className="hero-content">
            <div className="micro-label">✧ PORTOFOLIO PROFESIONAL PPG CALON GURU</div>
            <h1>MASWA<br /><span>ARBAURNIKA</span></h1>
            <p>Senantiasa berupaya memberikan yang terbaik dan melampaui batas kemampuan diri demi kemuliaan Tuhan yang lebih besar.</p>
        <div className="hero-buttons">
            <button className="primary-button" onClick={() => go('tentang')}>Jelajahi Portofolio <ArrowUpRight size={17} /></button>
            <button className="secondary-button" onClick={() => go('tentang')}>Lihat Profil</button>
        </div>
            <div className="hero-values"><span><i className="green" /> Belajar</span><span><i className="gold" /> Bertumbuh</span><span><i className="slate" /> Bermanfaat</span></div>
        </div>
            <div className="hero-card"><div className="hero-card-top"><span>PPG CALON GURU · 2026</span><span>◉</span></div>
            <div className="hero-card-body"><span>MASWA ARBAURNIKA</span><strong>Calon Guru<br />Profesional</strong><small>“Terus belajar untuk bertumbuh, dan terus bertumbuh untuk menjadi pribadi yang bermanfaat bagi sesama.”</small></div>
        </div>
        </section>
      <section className="marquee">
        <span>BELAJAR</span>
        <b>•</b><span>BERTUMBUH</span><b>•</b>
        <span>BERMANFAAT</span><b>•</b>
        <span>ARTIFAK · REFLEKSI · PRAKTIK</span>
        </section>
      <section id="tentang" className="about-section page-width section-space">
        <SectionTitle number="01" title="Identitas & Filosofi Pendidik" text="Profil diri, inspirasi perjalanan, motivasi, serta filosofi pendidikan yang menjadi pijakan dalam mengabdi sebagai calon guru profesional." />
        <div className="identity-layout">
            <div className="profile-photo">
                <img src="/profile-maswa.jpg" alt="Maswa Arbaurnika" />
                <div className="photo-label">
                    <strong>PROFIL DIRI</strong>
                <span>Kabupaten Sleman, Daerah Istimewa Yogyakarta</span>
                </div>
            </div>
        <div className="story-stack">
            <Story title="Cerita Personal" label="INSPIRASI PENDIDIK">Terinspirasi dari seorang guru yang selalu menunjukkan ketulusan dan dedikasi dalam membantu peserta didik untuk berkembang, bukan sekedar memberikan materi tetapi,
              juga membimbing dan memberikan arahan serta dukungan yang dibutuhkan. Hal ini membuat saya ingin menjadi seorang guru yang dapat memberikan dampak
              positif bagi peserta didik dan membatu mereka mecapai potensi terbaik mereka.
            </Story>
            <Story title="Motivasi Menjadi Guru" label="PANGGILAN JIWA">Bagi saya, menjadi seorang guru adalah panggilan untuk menjadi pembelajar seumur hidup. Saya ingin mendedikasikan ilmu dan proses bertumbuh untuk membantu orang lain mencapai potensi terbaik mereka.</Story>
        </div>
        </div>
        <div className="philosophy-grid">
            <div>
                <span className="micro-label">FILOSOFI PENDIDIKAN</span>
                <h2>Memberi yang<br /><em>terbaik bagi sesama.</em></h2>
            </div>
                {[['Karakter dan Kebenaran', 'Pendidikan adalah proses melahirkan kebenaran yang sudah ada di dalam jiwa siswa melalui dialog dan pertanyaan kritis, bukan menjejali pikiran dari luar.'], 
                ['Pengalaman dan Kebebasan', 'pendidikan harus menyelaraskan diri dengan tahap perkembangan alami anak, melindungi kebaikan bawaan mereka dari pengaruh buruk masyarakat.'], 
                ['Kemerdekaan dan Pembebasan', 'Pendidikan adalah usaha "menuntun" tumbuh kembangnya kodrat anak agar mencapai keselamatan dan kebahagiaan setinggi-tingginya. Berlandaskan Sistem Among (Ing Ngarsa Sung Tulada, Ing Madya Mangun Karsa, Tut Wuri Handayani), guru bertindak sebagai pamong, bukan penguasa.']]
                .map(([title, text]) => <div className="principle" key={title}><span>✦</span><h3>{title}</h3><p>{text}</p></div>)}</div>
        </section>
      <section id="visi-rtl" className="vision-section section-space">
        <div className="page-width">
          <SectionTitle number="02" title="Visi Pendidikan & Rencana Tindak Lanjut" text="Pandangan transformatif mengenai arah pendidikan nasional, komitmen pengembangan profesional, serta tiga rencana aksi konkret saat memulai karier." />
          
          <div className="vision-card">
            <span className="vision-badge">✦ TRANSFORMASI PENDIDIKAN NASIONAL</span>
            <h3>Menuntun Kodrat, Merayakan Keberagaman, & Memanusiakan Manusia</h3>
            <p>
              Setelah menyelesaikan rangkaian Program PPG Calon Guru, saya memandang bahwa pendidikan di Indonesia harus bertransformasi dari sekadar proses transfer pengetahuan <em>(transfer of knowledge)</em> menjadi proses <strong>menuntun kodrat dan memanusiakan manusia</strong>. Pendidikan tidak boleh lagi menyeragamkan potensi anak melalui tolok ukur tunggal yang kaku. Ruang kelas di Indonesia harus menjadi ekosistem belajar yang merdeka, aman, inklusif, dan membahagiakan <em>(student well-being)</em>, di mana setiap anak dirayakan keunikannya melalui pembelajaran berdiferensiasi. Integrasi antara kecakapan berpikir kritis (HOTS), penguatan karakter budi pekerti luhur bangsa, serta kematangan sosial emosional (PSE) adalah kunci agar generasi muda Indonesia tumbuh cerdas secara intelektual, peka berempati, dan tangguh secara moral dalam menyongsong masa depan.
            </p>
          </div>

          <div className="pro-steps-header">
            <span className="micro-label">KOMITMEN BERKELANJUTAN</span>
            <h3>4 Langkah Strategis Menjadi Guru Profesional</h3>
          </div>
          <div className="pro-steps-grid">
            <div className="pro-step-card">
              <div className="pro-step-top">
                <span className="pro-step-num">LANGKAH 01</span>
              </div>
              <h4>Praktisi Reflektif Berkelanjutan (Reflective Practitioner)</h4>
              <p>Membiasakan diri menulis jurnal refleksi seusai setiap siklus pembelajaran dan proaktif membuka ruang dialog evaluatif bersama rekan sejawat serta murid guna perbaikan mutu pedagogis secara konsisten.</p>
            </div>

            <div className="pro-step-card">
              <div className="pro-step-top">
                <span className="pro-step-num">LANGKAH 02</span>
              </div>
              <h4>Pembelajar Sepanjang Hayat (Lifelong Learner)</h4>
              <p>Senantiasa meng-upgrade wawasan keilmuan, pedagogi modern, dan literasi digital melalui pelatihan mandiri, sertifikasi berkelanjutan, serta melaksanakan Penelitian Tindakan Kelas (PTK) berbasis dinamika nyata kelas.</p>
            </div>

            <div className="pro-step-card">
              <div className="pro-step-top">
                <span className="pro-step-num">LANGKAH 03</span>
              </div>
              <h4>Kolaborator Komunitas Praktisi (Community of Practice)</h4>
              <p>Berperan aktif dalam forum MGMP/KKG, komunitas belajar sekolah, dan Platform Pembelajaran Guru untuk saling berbagi praktik baik (best practices) serta memecahkan problem pembelajaran secara kolektif.</p>
            </div>

            <div className="pro-step-card">
              <div className="pro-step-top">
                <span className="pro-step-num">LANGKAH 04</span>
              </div>
              <h4>Keteladanan Karakter Sistem Among (Ing Ngarsa Sung Tulada)</h4>
              <p>Menginternalisasi nilai budi pekerti luhur sebagai teladan moral di depan, pembangkit karsa dan semangat di tengah (Ing Madya Mangun Karsa), serta pendorong kemandirian murid dari belakang (Tut Wuri Handayani).</p>
            </div>
          </div>

          <div className="rtl-container">
            <div className="rtl-header">
              <span className="micro-label">RENCANA TINDAK LANJUT (RTL)</span>
              <h3>Tiga Hal Penting Saat Mengawali Karier Sebagai Guru</h3>
            </div>
            <div className="rtl-grid">
              <div className="rtl-card">
                <span className="rtl-number-badge">01</span>
                <span className="rtl-card-tag">Aksi Fondasi</span>
                <h4>Asesmen Diagnostik & Pemetaan Kebutuhan Belajar Murid</h4>
                <p>Mengawali tahun ajaran baru dengan asesmen diagnostik kognitif dan non-kognitif untuk memetakan kesiapan, minat, gaya belajar, serta latar sosio-emosional murid sebagai basis penyusunan Modul Ajar berdiferensiasi yang inklusif.</p>
              </div>

              <div className="rtl-card">
                <span className="rtl-number-badge">02</span>
                <span className="rtl-card-tag">Aksi Iklim Kelas</span>
                <h4>Membangun Budaya Kelas Positif & Terintegrasi PSE</h4>
                <p>Merumuskan kesepakatan kelas yang aman, adil, dan suportif bersama murid, serta mengintegrasikan 5 Kompetensi Sosial Emosional (KSE CASEL) ke dalam proses belajar agar tercipta iklim kelas yang bebas dari perundungan.</p>
              </div>

              <div className="rtl-card">
                <span className="rtl-number-badge">03</span>
                <span className="rtl-card-tag">Aksi Ekosistem</span>
                <h4>Menginisiasi Kolaborasi Segitiga Emas (Sekolah - Ortu - Mitra)</h4>
                <p>Membangun kemitraan komunikasi dua arah secara berkala dengan orang tua/wali murid serta berkolaborasi erat dengan Kepala Sekolah, rekan guru pamong, dan konselor sekolah untuk menjamin kesinambungan ekosistem belajar anak.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="inovasi" className="innovation-section section-space">
        <div className="page-width">
          <SectionTitle number="03" title="Karya Inovasi Pembelajaran: AktifClass" text="Aplikasi web interaktif untuk mentransformasi dinamika kelas, memberdayakan siswa pemalu, dan memicu keterlibatan aktif melalui gamifikasi kolaboratif." />
          
          <div className="innovation-hero-card">
            <div className="innovation-badge-group">
              <span className="innovation-badge">✦ WEB-BASED APPLICATION</span>
              <span className="innovation-badge accent">GAMIFIKASI PEMBELAJARAN</span>
              <span className="innovation-badge">INKLUSIVITAS KELAS</span>
              <span className="innovation-badge">PSYCHOLOGICAL SAFETY</span>
            </div>
            <h3>AktifClass: Platform Interaktif Peningkat Partisipasi & Keterlibatan Siswa</h3>
            <p className="lead">
              AktifClass dirancang khusus untuk mengatasi problem klasik di ruang kelas: ketimpangan partisipasi di mana hanya segelintir siswa vokal yang aktif berbicara, sementara siswa pemalu atau pasif merasa ragu dan takut dihakimi. Melalui integrasi fitur <em>Buzzer</em>, <em>Estafet Tantangan</em>, <em>Wall of Argument (Mode Anonim)</em>, <em>Randomizer</em>, dan <em>Class Energy Meter</em>, AktifClass menciptakan ruang belajar yang inklusif, adil, dan memotivasi seluruh murid secara kolektif.
            </p>

            <div className="innovation-tabs" role="tablist">
              {(
                [
                  ['identitas', '01 · Identitas Karya'],
                  ['riset', '02 · Gagasan & Riset'],
                  ['rancangan', '03 · Rancangan & Fitur'],
                  ['evaluasi', '04 · Evaluasi 3 Dimensi'],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  role="tab"
                  aria-selected={innovationTab === key}
                  className={`innovation-tab-btn ${innovationTab === key ? 'active' : ''}`}
                  onClick={() => setInnovationTab(key)}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="innovation-tab-panel">
              {innovationTab === 'identitas' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="tab-content-grid">
                  <div className="feature-box">
                    <div className="feature-box-top"><span className="feature-tag">Profil Karya</span></div>
                    <h5>Nama & Format Inovasi</h5>
                    <p><strong>Nama:</strong> AktifClass (Interactive Classroom Engagement System)</p>
                    <p><strong>Platform:</strong> Aplikasi Web Responsif (dapat diakses via browser HP/Laptop tanpa instalasi rumit).</p>
                    <p><strong>Pengembang:</strong> Maswa Arbaurnika (PPG Calon Guru 2026).</p>
                  </div>
                  <div className="feature-box">
                    <div className="feature-box-top"><span className="feature-tag">Target & Sasaran</span></div>
                    <h5>Sasaran Inovasi Pembelajaran</h5>
                    <p><strong>Pengguna Utama:</strong> Peserta didik dalam pembelajaran kolaboratif dan diskusi kelompok.</p>
                    <p><strong>Fokus Sasaran:</strong> Mengakomodasi siswa pasif, pemalu, atau introvert yang memiliki hambatan kecemasan sosial saat berbicara langsung di depan kelas.</p>
                    <p><strong>Output:</strong> Terwujudnya pemerataan keaktifan dan lingkungan belajar yang ramah serta aman secara psikologis.</p>
                  </div>
                </motion.div>
              )}

              {innovationTab === 'riset' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="tab-content-grid">
                  <div className="feature-box">
                    <div className="feature-box-top"><span className="feature-tag">Tantangan Kelas</span></div>
                    <h5>Tantangan Nyata di Ruang Kelas</h5>
                    <p>• <strong>Dominasi Minoritas:</strong> Hanya 2–3 siswa vokal yang selalu aktif, membuat murid lain merasa tidak memiliki ruang atau kesempatan.</p>
                    <p>• <strong>Kecemasan Berbicara (Speaking Anxiety):</strong> Takut salah, malu ditertawakan teman, atau cemas dihakimi saat menjawab pertanyaan guru.</p>
                    <p>• <strong>Penunjukan Manual yang Menegangkan:</strong> Cara guru menunjuk murid secara acak sering memicu kepanikan alih-alih keterlibatan belajar yang bermakna.</p>
                  </div>
                  <div className="feature-box">
                    <div className="feature-box-top"><span className="feature-tag">Gagasan & Landasan Teori</span></div>
                    <h5>Gagasan Solusi & Basis Riset</h5>
                    <p>• <strong>Psychological Safety (Amy Edmondson):</strong> Pembelajaran efektif hanya terwujud jika murid merasa aman mengambil risiko akademis tanpa ancaman penghakiman sosial—diakomodasi melalui <em>Mode Anonim</em>.</p>
                    <p>• <strong>Gamifikasi Kolaboratif (Deterding et al.):</strong> Mengubah poin individu menjadi akumulasi <em>Energi Kelas Kolektif</em>, sehingga seluruh murid merasa menjadi satu tim yang saling mendukung.</p>
                  </div>
                </motion.div>
              )}

              {innovationTab === 'rancangan' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="tab-content-single">
                  <div className="features-detail-grid">
                    <div className="feature-box">
                      <div className="feature-box-top"><span className="feature-tag">Fitur 01</span></div>
                      <h5>🔔 Digital Buzzer (Angkat Tangan Cepat)</h5>
                      <p>Tombol interaktif real-time untuk merespons pertanyaan guru secara cepat dan tercatat transparan, menghilangkan perdebatan siapa yang angkat tangan pertama kali.</p>
                    </div>
                    <div className="feature-box">
                      <div className="feature-box-top"><span className="feature-tag">Fitur 02</span></div>
                      <h5>🎯 Estafet Tantangan Antar-Kelompok</h5>
                      <p>Mekanisme dinamis di mana suatu kelompok dapat melempar pertanyaan kasus atau tantangan materi ke kelompok lain, melatih nalar kritis dan komunikasi sejawat.</p>
                    </div>
                    <div className="feature-box">
                      <div className="feature-box-top"><span className="feature-tag">Fitur 03</span></div>
                      <h5>💬 Wall of Argument & Mode Anonim</h5>
                      <p>Ruang berekspresi tertulis di mana murid dapat saling menyukai (like) argumen terbaik, dilengkapi opsi <em>Anonim</em> untuk melindungi kenyamanan siswa pemalu.</p>
                    </div>
                    <div className="feature-box">
                      <div className="feature-box-top"><span className="feature-tag">Fitur 04</span></div>
                      <h5>🎲 Acak Perwakilan Kelompok (Randomizer)</h5>
                      <p>Algoritma pemilih acak perwakilan presentasi agar seluruh anggota kelompok siap memahami materi dan tidak selalu mengandalkan ketua kelompok.</p>
                    </div>
                    <div className="feature-box">
                      <div className="feature-box-top"><span className="feature-tag">Fitur 05</span></div>
                      <h5>⚡ Class Energy Meter (Energi Kelas)</h5>
                      <p>Indikator energi kelas yang terus bertambah seiring keaktifan murid merespons, menjawab tantangan, dan berargumen, memicu antusiasme kolektif seluruh kelas.</p>
                    </div>
                  </div>

                  <div className="energy-meter-preview">
                    <div className="energy-meter-header">
                      <span>⚡ SIMULASI TINGKAT ENERGI KEAKTIFAN KELAS: {energyBoost}%</span>
                      <button
                        onClick={() => setEnergyBoost((prev) => (prev >= 100 ? 70 : prev + 5))}
                        style={{ background: '#f5a080', border: 'none', padding: '6px 12px', borderRadius: '3px', color: '#1c2024', fontWeight: 800, fontSize: '11px', cursor: 'pointer' }}
                      >
                        🔔 Tekan Buzzer (+5 Energy)
                      </button>
                    </div>
                    <div className="energy-meter-track">
                      <div className="energy-meter-fill" style={{ width: `${Math.min(energyBoost, 100)}%` }} />
                    </div>
                    <small style={{ color: '#b9d0c8', fontSize: '11px' }}>Uji coba interaktif: Klik tombol buzzer di atas untuk melihat peningkatan bar energi keaktifan kelas!</small>
                  </div>
                </motion.div>
              )}

              {innovationTab === 'evaluasi' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="eval-pillars-grid">
                  <div className="eval-card">
                    <div className="eval-card-top">
                      <span className="eval-card-icon">✦</span>
                      <span className="eval-card-tag">DIMENSI 01</span>
                    </div>
                    <h4>Kebaruan (Novelty)</h4>
                    <p>Menggantikan pencatatan keaktifan manual dengan ekosistem gamifikasi berbasis energi kolektif kelas, serta menyediakan fitur pelindung rasa nyaman (Mode Anonim) yang jarang ditemukan di aplikasi kelas konvensional.</p>
                  </div>
                  <div className="eval-card">
                    <div className="eval-card-top">
                      <span className="eval-card-icon">💡</span>
                      <span className="eval-card-tag">DIMENSI 02</span>
                    </div>
                    <h4>Kreativitas (Creativity)</h4>
                    <p>Mengintegrasikan dinamika <em>game-show</em> (buzzer & estafet tantangan) dengan prinsip Pembelajaran Sosial Emosional (PSE). Belajar terasa menyenangkan <em>(joyful learning)</em> tanpa unsur intimidasi.</p>
                  </div>
                  <div className="eval-card">
                    <div className="eval-card-top">
                      <span className="eval-card-icon">📈</span>
                      <span className="eval-card-tag">DIMENSI 03</span>
                    </div>
                    <h4>Kebermanfaatan (Impact)</h4>
                    <p>Tingkat keterlibatan murid pasif meningkat signifikan. Siswa pemalu mulai berani mengungkapkan gagasan bernalar kritis, dan tercipta rasa saling menghargai antar-kelompok dalam menyelesaikan tantangan materi.</p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
      <section id="ppl-mandiri" className="ppl-section section-space">
        <div className="page-width">
          <SectionTitle number="04" title="Praktik Pengalaman Lapangan (PPL) Mandiri" text="Fokus analisis klinis dan refleksi kritis pelaksanaan praktik mengajar mandiri di sekolah mitra." />
          
          <div className="ppl-shell">
            <div className="ppl-tabs-grid" role="tablist" aria-label="Pilih fokus analisis PPL mandiri">
              {(
                [
                  ['rancangan', '📋', 'Rancangan', 'Perencanaan Modul Ajar'],
                  ['materi', '📚', 'Materi Ajar', 'Analisis Bahan Pembelajaran'],
                  ['media', '🎨', 'Media Ajar', 'Media & Alat Bantu Belajar'],
                  ['video', '🎥', 'Video Praktik', 'Rekaman Mengajar Mandiri'],
                  ['nonmengajar', '🏫', 'Non-Mengajar', 'Kegiatan & Tugas Sekolah'],
                  ['penilaian', '📊', 'Penilaian', 'Instrumen & Analisis Hasil'],
                ] as const
              ).map(([key, icon, label]) => (
                <button
                  key={key}
                  role="tab"
                  aria-selected={pplTab === key}
                  className={`ppl-tab-btn ${pplTab === key ? 'active' : ''}`}
                  onClick={() => setPplTab(key)}
                >
                  <span className="ppl-tab-icon">{icon}</span>
                  <span className="ppl-tab-title">{label}</span>
                </button>
              ))}
            </div>

            <div className="ppl-panel">
              {(() => {
                const currentPpl = pplPillarsData[pplTab]
                return (
                  <motion.div key={pplTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="ppl-panel-content">
                    <div className="ppl-panel-header">
                      <span className="ppl-placeholder-badge">✦ {currentPpl.badge}</span>
                      <span className="ppl-filetype-badge">{currentPpl.fileType}</span>
                    </div>

                    <h4>{currentPpl.title}</h4>
                    <p className="ppl-subtitle">{currentPpl.subtitle}</p>
                    <p className="ppl-description">{currentPpl.description}</p>

                    <div className="ppl-points-box">
                      <strong>Fokus & Indikator Analisis:</strong>
                      <ul>
                        {currentPpl.keyPoints.map((point) => (
                          <li key={point}>
                            <Check size={14} className="ppl-check-icon" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="ppl-action-footer">
                      {currentPpl.driveUrl ? (
                        <a
                          href={currentPpl.driveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ppl-action-button active"
                        >
                          <span>{currentPpl.actionLabel}</span>
                          <ArrowUpRight size={15} />
                        </a>
                      ) : (
                        <div className="ppl-action-button disabled" title="Isi link pada variabel pplPillarsData di src/App.tsx">
                          <ExternalLink size={14} />
                          <span>Tautan Belum Dilampirkan (Isi pada `driveUrl`)</span>
                        </div>
                      )}
                      <small className="ppl-action-hint">
                        {currentPpl.driveUrl
                          ? '✓ Tautan terhubung & siap diverifikasi penguji'
                          : 'ℹ️ Masukkan link Drive/YouTube pada `pplPillarsData` untuk mengaktifkan tombol'}
                      </small>
                    </div>
                  </motion.div>
                )
              })()}
            </div>
          </div>
        </div>
      </section>
      <section id="perjalanan" className="journey-section section-space">
        <div className="page-width">
            <SectionTitle number="05" title="Perjalanan akademik menuju pertumbuhan profesional." text="Setiap pengalaman menjadi ruang untuk mempelajari konsep, mencoba praktik, lalu merefleksikan perbaikan." />
            <div className="journey-switcher" role="tablist" aria-label="Pilih semester perjalanan akademik">
              {['SEMESTER 1', 'SEMESTER 2'].map((item) => <button key={item} role="tab" aria-selected={journeySemester === item} className={journeySemester === item ? 'active' : ''} onClick={() => { setJourneySemester(item); setOpenJourney(courses.find((course) => course[3] === item)?.[0] ?? '') }}>{item.replace('SEMESTER ', 'Semester ')}</button>)}
            </div>
            <div className="journey-timeline">{courses.filter((course) => course[3] === journeySemester).map((course, index) => {
              const details = journeyDetails[course[0]]
              const isOpen = openJourney === course[0]
              return <motion.article className={`journey-item ${isOpen ? 'is-open' : ''}`} layout key={course[0]}>
                <span className="journey-dot" aria-hidden="true" />
                <button className="journey-heading" aria-expanded={isOpen} onClick={() => setOpenJourney(isOpen ? '' : course[0])}>
                  <span className="journey-number">{String(index + 1).padStart(2, '0')}</span>
                  <span><strong>{course[0]}</strong><small>{course[1]}</small></span>
                  <ChevronDown size={17} className={isOpen ? 'rotated' : ''} />
                </button>
                {isOpen && <div className="journey-details">
                  <div><strong>Pembelajaran Utama</strong><ul>{details.learning.map((item) => <li key={item}>{item}</li>)}</ul></div>
                  <div><strong>Kompetensi</strong><div className="journey-tags">{details.skills.map((item) => <span key={item}>{item}</span>)}</div><strong>Refleksi</strong><p>{details.reflection}</p></div>
                </div>}
              </motion.article>
            })}</div>
            </div>
      </section>
      <section id="matakuliah" className="courses-section section-space page-width">
        <SectionTitle number="06" title="Refleksi mata kuliah yang menunjukkan proses." text="Konsep diterjemahkan menjadi rancangan, praktik, dan refleksi dalam setiap pengalaman akademik." />
        <div className="course-switcher">{['Semua', 'SEMESTER 1', 'SEMESTER 2'].map((item) => <button key={item} className={semester === item ? 'active' : ''} onClick={() => setSemester(item)}>{item}</button>)}</div>
        <div className="course-grid">{filteredCourses.map((course, index) => <motion.article layout className="course-card" key={course[0]}>
            <div className="course-index">{String(index + 1).padStart(2, '0')}</div>
            <span>{course[2]} · {course[3]}</span>
            <h3>{course[0]}</h3>
            <p>{course[1]}</p>
            <button onClick={() => openCourse(course[0])}>Lihat detail <ArrowUpRight size={15} /></button>
            </motion.article>)}
            </div>
        </section>
      <section id="galeri" className="gallery-section section-space">
        <div className="page-width">
            <SectionTitle number="07" title="Dokumentasi kegiatan & praktik." text="Rekaman visual pengalaman nyata, praktik mengajar di kelas, bimbingan reflektif, serta pengimbasan inovasi pembelajaran." />
            <div className="gallery-grid">{gallery.map((item, index) => <motion.article whileHover={{ y: -5 }} key={item[0]} className={`gallery-card gallery-${index + 1}`}>
                <img src={item[2]} alt={item[0]} />
                <div><span>{item[1]}</span>
                <h3>{item[0]}</h3>
                <ArrowUpRight size={17} /></div>
                </motion.article>)}</div>
        </div>
      </section>
      <section id="artifak" className="artifact-section section-space page-width">
        <SectionTitle number="08" title="Bukti belajar yang dapat diverifikasi." text="Koleksi artifak resmi mata kuliah yang terdokumentasi dan dapat diakses." />
        <div className="artifact-list">{courses.map((course) => {
          const artifactUrl = artifactLinks[course[0]]
          return <div className="artifact-row" key={course[0]}>
            <span>{course[3]}</span>
            {artifactUrl ? <a href={artifactUrl} target="_blank" rel="noopener noreferrer"><h3>{course[0]}</h3></a> : <h3 className="artifact-unavailable">{course[0]}</h3>}
            {artifactUrl ? <a href={artifactUrl} target="_blank" rel="noopener noreferrer" aria-label={`Buka artifak ${course[0]}`}><ArrowUpRight size={16} /></a> : <span className="artifact-unavailable" aria-label={`Artifak ${course[0]} belum tersedia`}>-</span>}
          </div>
        })}
        </div>
      </section>
      <section id="kontak" className="contact-section page-width">
        <div><span className="micro-label">KONTAK</span>
        <h2>Mari terhubung<br /><em>secara profesional.</em></h2>
        <p>Terbuka untuk berdiskusi tentang pendidikan, kolaborasi, dan pengalaman belajar yang bermakna.</p></div>
        <form onSubmit={(event) => { event.preventDefault(); setSent(true) }}>{sent ? <div className="sent-state"><Check size={24} />
        <h3>Pesan terkirim.</h3>
        <p>Terima kasih. Saya akan segera menghubungi Anda.</p></div> : <><input required placeholder="Nama" /><input required type="email" placeholder="Email" /><input required placeholder="Subjek" /><textarea required rows={4} placeholder="Pesan" /><button className="primary-button" type="submit">Kirim pesan <ArrowUpRight size={17} /></button></>}</form></section>
    </>}</main><footer className="page-width footer"><div><strong>Maswa Arbaurnika</strong><span>Calon Guru Profesional · Portofolio PPG Calon Guru</span></div><span>© 2026 · Maswa Arbaurnika</span><div className="footer-links"><a href="mailto:maswaarbaurnika@gmail.com">Email</a><a href="#linkedin">LinkedIn</a><a href="#github">GitHub</a></div></footer>
  </div>
}
function SectionTitle({ number, title, text }: { number: string; title: string; text: string }) {
  const labels: Record<string, string> = {
    '01': 'TENTANG SAYA',
    '02': 'VISI & TINDAK LANJUT',
    '03': 'KARYA INOVASI UNGGULAN',
    '04': 'PRAKTIK PPL MANDIRI',
    '05': 'PERJALANAN AKADEMIK',
    '06': 'MATA KULIAH',
    '07': 'GALERI DOKUMENTASI',
    '08': 'ARTIFAK BUKTI BELAJAR',
  }
  return <div className="section-title"><div className="micro-label">{number} · {labels[number] ?? 'PORTOFOLIO'}</div><h2>{title}</h2><p>{text}</p></div>
}
function Story({ title, label, children }: { title: string; label: string; children: string }) { return <article className="story"><span>{label}</span><h3>{title}</h3><p>{children}</p></article> }
function CourseDetail({ title, onBack }: { title: string; onBack: () => void }) {
  const course = courses.find((item) => item[0] === title)
  const detail = courseDetailContent[title]
  if (!course || !detail) return null
  const artifactUrl = artifactLinks[title]
  return <section className="course-detail page-width">
    <button className="back-button" onClick={onBack}><ArrowLeft size={16} /> Kembali ke daftar mata kuliah</button>
    <div className="course-detail-hero">
      <span className="course-detail-badge">{course[2]} · {course[3]}</span>
      <h1>{course[0]}</h1>
      <p>{course[1]}</p>
    </div>
    <div className="detail-overview"><span>RANGKUMAN PEMBELAJARAN</span><strong>{detail.summary}</strong></div>
    <div className="detail-blocks">
      <article className="detail-block"><div className="detail-block-number">01</div><div><span className="detail-label">PEMBELAJARAN UTAMA</span><h2>Hal yang dipelajari</h2><ul>{detail.learning.map((item) => <li key={item}>{item}</li>)}</ul></div></article>
      <article className="detail-block"><div className="detail-block-number">02</div><div><span className="detail-label">KOMPETENSI</span><h2>Kemampuan yang berkembang</h2><div className="detail-tags">{detail.skills.map((item) => <span key={item}>{item}</span>)}</div></div></article>
      <article className="detail-block detail-reflection"><div className="detail-block-number">03</div><div><span className="detail-label">REFLEKSI</span><h2>Makna pengalaman</h2><p>{detail.reflection}</p></div></article>
    </div>
    <div className="detail-artifact"><div><span className="detail-label">ARTIFAK PEMBELAJARAN</span><h2>Lihat bukti belajar</h2><p>{artifactUrl ? 'Buka dokumen pendukung untuk mata kuliah ini.' : 'Dokumen pendukung untuk mata kuliah ini belum tersedia.'}</p></div>{artifactUrl ? <a href={artifactUrl} target="_blank" rel="noopener noreferrer">Lihat artifak <ExternalLink size={15} /></a> : <span className="artifact-action-disabled">Belum tersedia</span>}</div>
  </section>
}
export default App
