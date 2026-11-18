# Wish List to Nihongo 🇯🇵

Checklist pribadi untuk persiapan kerja ke Jepang: roadmap 11 tahap, belajar harian, latihan Hiragana/Katakana, dokumen, jadwal ujian, tabungan, dan catatan. Website statis tanpa server dan tanpa dependensi.

## Menjalankan

Buka `index.html` di browser. Untuk fitur install di HP (PWA) dan mode offline, jalankan lewat server lokal atau hosting HTTPS:

```bash
python3 -m http.server 8000   # lalu buka http://localhost:8000
```

Deploy gratis: GitHub Pages (Settings → Pages → branch `main`, folder `/root`) atau Netlify.

## Struktur

| File | Isi |
| --- | --- |
| `index.html` | Kerangka halaman |
| `data.js` | Data roadmap, tautan resmi, daftar kana |
| `app.js` | Logika, tampilan, penyimpanan |
| `style.css` | Tampilan (termasuk mode gelap dan mobile) |
| `sw.js`, `manifest.json`, `icon.svg` | PWA / offline |

## Data

Semua data disimpan di `localStorage` browser, hanya di perangkat ini. Ganti HP atau hapus data browser berarti data hilang, jadi gunakan **Settings → Ekspor JSON** secara berkala. Impor akan memvalidasi isi file sebelum dipakai.

## Catatan

Persyaratan visa, bahasa, dan keterampilan bisa berubah. Isi roadmap dan tautan di halaman Sumber Resmi adalah panduan umum (terakhir diperbarui 18 November 2026); selalu cek sumber resmi.
