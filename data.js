"use strict";
/* ===== DATA ROADMAP & KONTEN STATIS ===== */
const CONTENT_UPDATED = "2026-11-18";

const STAGES = [
["Japanese Basic Foundation","Bulan 1","Mengenal dan menguasai huruf dasar serta ungkapan sehari-hari.",["Mengenal huruf Hiragana","Menghafal seluruh Hiragana","Latihan membaca Hiragana","Mengenal huruf Katakana","Menghafal seluruh Katakana","Latihan membaca Katakana","Mempelajari salam dasar bahasa Jepang","Belajar memperkenalkan diri","Menghafal 100 kosakata dasar"]],
["Basic Japanese","Bulan 2–3","Membangun dasar tata bahasa dan percakapan.",["Mempelajari angka bahasa Jepang","Mempelajari hari, tanggal, dan waktu","Mempelajari kata kerja dasar","Mempelajari kata sifat","Mempelajari pola kalimat dasar","Mempelajari partikel bahasa Jepang","Menghafal 300 kosakata","Latihan listening dasar","Latihan percakapan sederhana","Menyelesaikan materi setara JLPT N5"]],
["JLPT N5 to N4 Preparation","Bulan 4–6","Menguatkan N5 dan mulai masuk materi N4.",["Memperkuat tata bahasa N5","Mempelajari Kanji dasar","Menghafal kosakata N5","Latihan membaca teks pendek","Latihan listening N5","Mengerjakan simulasi ujian N5","Memulai tata bahasa N4","Mempelajari Kanji N4","Menghafal kosakata N4","Latihan percakapan sehari-hari"]],
["Japanese N4 Preparation","Bulan 7–9","Menuntaskan materi N4 dan menentukan ujian bahasa.",["Menyelesaikan materi tata bahasa N4","Memperkuat Kanji N4","Menguasai kosakata N4","Latihan membaca teks tingkat N4","Latihan listening tingkat N4","Mengerjakan simulasi JLPT N4","Mempelajari materi JFT-Basic","Menentukan target ujian bahasa","Mengikuti ujian bahasa ketika sudah siap"]],
["Career Exploration","Bulan 10","Mengenal jalur dan bidang kerja di Jepang.",["Mengenal sistem Tokutei Ginou (SSW)","Mengenal sistem Employment for Skill Development (ESD)","Mengenal jalur profesional Engineer/IT","Mempelajari bidang manufaktur","Mempelajari bidang pengolahan makanan","Mempelajari bidang perhotelan","Mempelajari bidang pertanian","Mempelajari bidang pekerjaan lainnya","Membandingkan persyaratan setiap bidang","Memilih bidang pekerjaan utama","Memilih bidang pekerjaan alternatif"]],
["Skill Development","Bulan 11–12","Menyiapkan keterampilan sesuai bidang pilihan.",["Mempelajari kosakata pekerjaan","Mempelajari instruksi kerja bahasa Jepang","Mempelajari budaya kerja Jepang","Mempelajari keselamatan kerja","Mengikuti pelatihan sesuai bidang","Mempelajari materi ujian keterampilan","Mengikuti simulasi ujian keterampilan","Mempersiapkan ujian keterampilan resmi"]],
["Certification & Education","Menjelang kelulusan SMK","Menyelesaikan sekolah dan sertifikasi. Ujian bahasa dan keterampilan mengikuti persyaratan jalur yang dipilih; tidak semua sertifikat wajib untuk semua jalur.",["Menyelesaikan pendidikan SMK","Memiliki ijazah SMK","Memiliki sertifikat bahasa Jepang","Lulus ujian bahasa sesuai jalur","Mengikuti ujian keterampilan sesuai sektor jika diperlukan","Mengumpulkan sertifikat pelatihan","Menyiapkan CV","Menyiapkan dokumen pribadi"]],
["Document Preparation","Setelah lulus","Melengkapi dokumen yang dibutuhkan.",["Menyiapkan KTP","Menyiapkan Kartu Keluarga","Menyiapkan akta kelahiran","Menyiapkan ijazah","Membuat paspor","Menyiapkan sertifikat bahasa","Menyiapkan sertifikat keterampilan","Melakukan pemeriksaan kesehatan sesuai ketentuan","Menyiapkan dokumen pendukung penempatan"]],
["Job Hunting & Selection","Setelah dokumen siap","Mencari dan menyeleksi lowongan yang resmi dan aman.",["Mencari informasi lowongan resmi","Memeriksa legalitas lembaga penempatan","Memeriksa perusahaan penerima","Membandingkan beberapa lowongan","Mengikuti seleksi administrasi","Mengikuti wawancara","Mempelajari isi kontrak kerja","Memeriksa gaji dan potongan","Memeriksa fasilitas tempat tinggal","Memahami jam kerja dan lembur","Memastikan kontrak disetujui dengan pendampingan orang tua/wali"]],
["Visa & Departure Preparation","Menjelang keberangkatan","Mengurus izin dan persiapan perjalanan.",["Memastikan kontrak kerja","Mengurus Certificate of Eligibility (COE)","Mengurus visa kerja","Menyelesaikan administrasi penempatan Indonesia","Menyiapkan tiket perjalanan sesuai ketentuan","Menyiapkan tempat tinggal","Menyiapkan dana darurat","Mempelajari peraturan kehidupan di Jepang","Mengikuti orientasi pra-keberangkatan","Memastikan seluruh dokumen lengkap"]],
["READY TO JAPAN","Tahap akhir","Pengecekan terakhir sebelum berangkat.",["Semua dokumen sudah lengkap","Visa dan izin kerja sudah terbit","Kontrak kerja sudah dipahami","Tempat tinggal sudah jelas","Dana keberangkatan sudah tersedia","Sudah memahami hak dan kewajiban pekerja","Siap berangkat ke Jepang secara legal"]]
].map((s,i)=>({id:"s"+i,name:s[0],period:s[1],desc:s[2],tasks:s[3]}));

/* Catatan tambahan per tahap (indeks tahap -> teks). Bersifat panduan umum, bukan kepastian. */
const STAGE_INFO = {
 3:"JFT-Basic dan JLPT N4 sama-sama dipakai sebagai bukti kemampuan bahasa, tetapi jalur kerja berbeda bisa menerima salah satunya saja. Pastikan ujian mana yang diminta jalur pilihanmu sebelum mendaftar.",
 4:"Sistem ESD (Ikusei Shuro) disiapkan sebagai pengganti magang teknis dan direncanakan berlaku mulai 2027. Syarat dan jadwalnya masih bisa berubah, jadi pantau pengumuman resmi.",
 6:"Syarat usia, status siswa SMK, dan izin orang tua/wali bisa berbeda tiap jalur. Tanyakan ke guru BK atau pihak sekolah sebelum mendaftar.",
 7:"Lihat halaman Sumber Resmi untuk daftar tanda bahaya penipuan sebelum membayar apa pun."
};

const PATHS = {
 "":"Belum memilih jalur kerja. Setelah Tahap Career Exploration, pilih jalur di Settings supaya dashboard menampilkan catatan yang sesuai.",
 ssw:"SSW (Tokutei Ginou): umumnya perlu lulus tes keterampilan sektor dan bukti bahasa (JFT-Basic atau JLPT N4). Cek syarat sektor pilihanmu di portal resmi SSW.",
 esd:"ESD (Ikusei Shuro): sistem pengganti magang teknis yang direncanakan mulai 2027. Syarat dan jadwal masih bisa berubah; pantau pengumuman resmi.",
 eng:"Engineer/IT (visa profesional): biasanya mensyaratkan ijazah atau pengalaman di bidang terkait. Cek apakah latar belakang SMK-mu memenuhi syarat."
};
const PATH_NAME = {"":"Belum dipilih",ssw:"SSW (Tokutei Ginou)",esd:"ESD (Ikusei Shuro)",eng:"Engineer/IT"};

const DOCS=["KTP","Kartu Keluarga","Akta kelahiran","Ijazah","Paspor","Sertifikat bahasa","Sertifikat keterampilan","Hasil pemeriksaan kesehatan","CV","Dokumen pendukung penempatan"];
const QUOTES=["Small steps today, Japan tomorrow.","Konsisten 20 menit sehari lebih baik dari 5 jam sekali.","Nanakorobi yaoki: jatuh tujuh kali, bangkit delapan kali.","Mulai dari satu huruf, satu kata, satu langkah.","Persiapan yang jujur dan teliti melindungi masa depanmu."];
const PAGES=[["dashboard","Dashboard"],["roadmap","My Roadmap"],["learning","Japanese Learning"],["kana","Latihan Kana"],["career","Career Preparation"],["documents","Documents"],["schedule","Jadwal Penting"],["savings","Savings"],["resources","Sumber Resmi"],["notes","My Notes"],["settings","Settings"]];
const STATUS=["Belum tersedia","Sedang diproses","Sudah tersedia"];
const SNAME=["Belum dimulai","Sedang dikerjakan","Selesai"];

/* ===== HIRAGANA / KATAKANA DASAR (hiragana, romaji). Katakana dihitung dari kode karakter (+0x60). ===== */
const KANA=[
["あ","a"],["い","i"],["う","u"],["え","e"],["お","o"],
["か","ka"],["き","ki"],["く","ku"],["け","ke"],["こ","ko"],
["さ","sa"],["し","shi"],["す","su"],["せ","se"],["そ","so"],
["た","ta"],["ち","chi"],["つ","tsu"],["て","te"],["と","to"],
["な","na"],["に","ni"],["ぬ","nu"],["ね","ne"],["の","no"],
["は","ha"],["ひ","hi"],["ふ","fu"],["へ","he"],["ほ","ho"],
["ま","ma"],["み","mi"],["む","mu"],["め","me"],["も","mo"],
["や","ya"],["ゆ","yu"],["よ","yo"],
["ら","ra"],["り","ri"],["る","ru"],["れ","re"],["ろ","ro"],
["わ","wa"],["を","wo"],["ん","n"]
];

/* ===== SUMBER RESMI (verifikasi tautan sebelum dipakai; situs bisa berubah) ===== */
const LINKS=[
 {group:"Ujian bahasa",items:[
  ["JLPT (situs resmi)","https://www.jlpt.jp/e/","Informasi ujian, level N5–N1, dan contoh soal."],
  ["JFT-Basic","https://jft-basic.jp/","Tes bahasa Jepang dasar untuk kerja di Jepang."]
 ]},
 {group:"Jepang: izin kerja dan visa",items:[
  ["Immigration Services Agency (ISA)","https://www.moj.go.jp/isa/","Aturan visa, COE, dan status tinggal."],
  ["Portal Specified Skilled Worker (SSW)","https://www.ssw.go.jp/en/","Informasi resmi sistem SSW dan sektornya."]
 ]},
 {group:"Indonesia: penempatan dan perlindungan",items:[
  ["KP2MI","https://kp2mi.go.id/","Lembaga pelindungan pekerja migran Indonesia."],
  ["Kemnaker","https://kemnaker.go.id/","Informasi ketenagakerjaan dan lembaga penempatan."],
  ["Kementerian Luar Negeri RI","https://kemlu.go.id/","Layanan paspor dan perwakilan RI di Jepang."]
 ]},
 {group:"Belajar bahasa Jepang gratis",items:[
  ["NHK World: Learn Japanese","https://www3.nhk.or.jp/nhkworld/en/learnjapanese/","Pelajaran dasar dari NHK."],
  ["Japanese e-Learning Minato (Japan Foundation)","https://minato-jf.jp/","Kursus online gratis dari Japan Foundation."]
 ]}
];

const SCAM_FLAGS=[
 "Meminta biaya besar di depan, atau rincian biayanya tidak jelas dan tanpa kuitansi.",
 "Menjanjikan \"pasti lolos\", \"tanpa tes\", atau visa instan.",
 "Tidak bisa menunjukkan izin resmi sebagai lembaga penempatan, atau hanya punya akun media sosial tanpa kantor.",
 "Menahan paspor, ijazah asli, atau dokumen pribadimu.",
 "Kontrak kerja tidak diberikan sebelum kamu membayar, atau tidak bisa kamu baca dan pahami.",
 "Gaji, potongan, dan biaya tempat tinggal tidak dijelaskan secara tertulis.",
 "Menekan agar kamu cepat memutuskan, atau menyuruh berutang lewat pinjaman online ilegal.",
 "Melarang kamu bertanya ke orang tua, guru, atau instansi resmi."
];
const SCAM_CHECK=[
 "Cek izin lembaga penempatan langsung ke KP2MI atau dinas ketenagakerjaan, bukan hanya dari brosur.",
 "Minta kontrak tertulis dan baca bersama orang tua/wali serta guru BK.",
 "Bandingkan minimal dua lowongan sebelum memutuskan.",
 "Simpan semua bukti pembayaran dan percakapan."
];
