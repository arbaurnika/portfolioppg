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
const artifactLinks: Record<string, string> = {
  'Filosofi Pendidikan dan Pendidikan Nilai': '#',
  'Peserta Didik dan Pemahamannya': '#',
  'Pembelajaran Mendalam dan Asesmen Dasar': '#',
  'Pengalaman Lapangan (PPL) Terbimbing': '#',
  'Pola Pikir Bertumbuh (Growth Mindset)': '#',
  'Pembelajaran Kreatif dan Inovatif': '#',
  'Pembelajaran Sosial Emosional': '#',
  'Pembelajaran Mendalam dan Asesmen Lanjut': '#',
  'Praktik Pengalaman Lapangan Mandiri': '#',
  'Projek Kepemimpinan': '#',
  'Pengembangan Keprofesian Berkelanjutan': '#',
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
const gallery = [
  ['Praktik Mengajar di Kelas', 'Praktik Mengajar', '/gallery/Praktik-mengajar.jpeg'],
  ['Bimbingan Reflektif dengan Guru Pamong', 'Bimbingan & Mentoring', '/gallery/Bimbingan.jpeg'],
  ['Bimbingan Akademik bersama Dosen Pembimbing', 'Bimbingan & Mentoring', '/gallery/Bimbingan-dengan-dosen.jpg'],
  ['Presentasi Produk Inovasi Pembelajaran', 'Presentasi & Inovasi', '/gallery/presentasi-siswa.jpeg'],
  ['Upacara Penerjunan Mahasiswa PPL', 'PPL & Lapangan', '#'],
]

function App() {
  const [semester, setSemester] = useState('Semua')
  const [journeySemester, setJourneySemester] = useState('SEMESTER 1')
  const [openJourney, setOpenJourney] = useState(courses[0][0])
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }
  const openCourse = (title: string) => { setSelectedCourse(title); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const filteredCourses = semester === 'Semua' ? courses : courses.filter((course) => course[3] === semester)
  return <div className="reference-site">
    <header className="reference-header"><button className="reference-brand" onClick={() => go('beranda')}>
      <span>PP</span>
      <strong>Portfolio.</strong>
      </button><nav className="main-nav" aria-label="Navigasi utama">
        {[['beranda', 'Beranda'], ['tentang', 'Tentang Saya'], ['perjalanan', 'Perjalanan'], ['matakuliah', 'Mata Kuliah'], ['galeri', 'Galeri'], ['kontak', 'Kontak']].map(([id, label]) => <button key={id} onClick={() => go(id)}>{label}</button>)}</nav></header>
    <main>{selectedCourse ? <CourseDetail title={selectedCourse} onBack={() => setSelectedCourse(null)} /> : <>
    <section id="beranda" className="landing-hero page-width">
    <div className="hero-orb" />
        <div className="hero-content">
            <div className="micro-label">✧ PORTOFOLIO PROFESIONAL PPG</div>
            <h1>MASWA<br /><span>ARBAURNIKA</span></h1>
            <p>Senantiasa berupaya memberikan yang terbaik dan melampaui batas kemampuan diri demi kemuliaan Tuhan yang lebih besar.</p>
        <div className="hero-buttons">
            <button className="primary-button" onClick={() => go('tentang')}>Jelajahi Portofolio <ArrowUpRight size={17} /></button>
            <button className="secondary-button" onClick={() => go('tentang')}>Lihat Profil</button>
        </div>
            <div className="hero-values"><span><i className="green" /> Belajar</span><span><i className="gold" /> Bertumbuh</span><span><i className="slate" /> Bermanfaat</span></div>
        </div>
            <div className="hero-card"><div className="hero-card-top"><span>PPG · 2026</span><span>◉</span></div>
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
      <section id="perjalanan" className="journey-section section-space">
        <div className="page-width">
            <SectionTitle number="02" title="Perjalanan akademik menuju pertumbuhan profesional." text="Setiap pengalaman menjadi ruang untuk mempelajari konsep, mencoba praktik, lalu merefleksikan perbaikan." />
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
        <SectionTitle number="03" title="Refleksi mata kuliah yang menunjukkan proses." text="Konsep diterjemahkan menjadi rancangan, praktik, dan refleksi dalam setiap pengalaman akademik." />
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
            <SectionTitle number="04" title="Dokumentasi kegiatan & praktik." text="Rekaman visual pengalaman nyata, praktik mengajar di kelas, bimbingan reflektif, serta pengimbasan inovasi pembelajaran." />
            <div className="gallery-grid">{gallery.map((item, index) => <motion.article whileHover={{ y: -5 }} key={item[0]} className={`gallery-card gallery-${index + 1}`}>
                <img src={item[2]} alt={item[0]} />
                <div><span>{item[1]}</span>
                <h3>{item[0]}</h3>
                <ArrowUpRight size={17} /></div>
                </motion.article>)}</div>
        </div>
      </section>
      <section className="artifact-section section-space page-width">
        <SectionTitle number="05" title="Bukti belajar yang dapat diverifikasi." text="Koleksi artifak menggunakan placeholder sampai file dan URL asli tersedia." />
        <div className="artifact-list">{courses.map((course) => <div className="artifact-row" key={course[0]}>
            <span>{course[3]}</span>
          <a href={artifactLinks[course[0]]} target="_blank" rel="noreferrer"><h3>{course[0]}</h3></a>
          <a href={artifactLinks[course[0]]} target="_blank" rel="noreferrer" aria-label={`Buka artifak ${course[0]}`}><ArrowUpRight size={16} /></a></div>)}
        </div>
      </section>
      <section id="kontak" className="contact-section page-width">
        <div><span className="micro-label">KONTAK</span>
        <h2>Mari terhubung<br /><em>secara profesional.</em></h2>
        <p>Terbuka untuk berdiskusi tentang pendidikan, kolaborasi, dan pengalaman belajar yang bermakna.</p></div>
        <form onSubmit={(event) => { event.preventDefault(); setSent(true) }}>{sent ? <div className="sent-state"><Check size={24} />
        <h3>Pesan terkirim.</h3>
        <p>Terima kasih. Saya akan segera menghubungi Anda.</p></div> : <><input required placeholder="Nama" /><input required type="email" placeholder="Email" /><input required placeholder="Subjek" /><textarea required rows={4} placeholder="Pesan" /><button className="primary-button" type="submit">Kirim pesan <ArrowUpRight size={17} /></button></>}</form></section>
    </>}</main><footer className="page-width footer"><div><strong>Maswa Arbaurnika</strong><span>Calon Guru Profesional · Portofolio PPG</span></div><span>© 2026 · Maswa Arbaurnika</span><div className="footer-links"><a href="mailto:maswaarbaurnika@gmail.com">Email</a><a href="#linkedin">LinkedIn</a><a href="#github">GitHub</a></div></footer>
  </div>
}
function SectionTitle({ number, title, text }: { number: string; title: string; text: string }) { return <div className="section-title"><div className="micro-label">{number} · {number === '01' ? 'TENTANG SAYA' : number === '02' ? 'PERJALANAN' : number === '03' ? 'MATA KULIAH' : number === '04' ? 'GALERI DOKUMENTASI' : 'ARTIFAK'}</div><h2>{title}</h2><p>{text}</p></div> }
function Story({ title, label, children }: { title: string; label: string; children: string }) { return <article className="story"><span>{label}</span><h3>{title}</h3><p>{children}</p></article> }
function CourseDetail({ title, onBack }: { title: string; onBack: () => void }) {
  const course = courses.find((item) => item[0] === title)
  const detail = courseDetailContent[title]
  if (!course || !detail) return null
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
    <div className="detail-artifact"><div><span className="detail-label">ARTIFAK PEMBELAJARAN</span><h2>Lihat bukti belajar</h2><p>Tambahkan link dokumen, video, atau portofolio untuk mata kuliah ini.</p></div><a href={artifactLinks[title]} target="_blank" rel="noreferrer">Lihat artifak <ExternalLink size={15} /></a></div>
  </section>
}
export default App
