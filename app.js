"use strict";
/* Data roadmap dan konten statis ada di data.js */

/* ===== UTIL ===== */
const $ = s => document.querySelector(s);
const esc = t => String(t).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const pad = n => String(n).padStart(2, "0");
const ymd = d => d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); // tanggal LOKAL, bukan UTC
const today = () => ymd(new Date());
const isObj = x => !!x && typeof x === "object" && !Array.isArray(x);
const isDate = s => typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s) && !isNaN(new Date(s + "T00:00"));
const str = (x, n = 200) => typeof x === "string" ? x.slice(0, n) : "";
const num = (x, d = 0) => { const n = Number(x); return Number.isFinite(n) ? n : d; };
const rp = n => "Rp " + Math.round(n).toLocaleString("id-ID");
const fd = d => isDate(d) ? new Date(d + "T00:00").toLocaleDateString("id-ID", {day: "numeric", month: "long", year: "numeric"}) : "-";
const daysTo = d => Math.round((new Date(d + "T00:00") - new Date(today() + "T00:00")) / 864e5); // tengah malam vs tengah malam
const bar = p => `<div class="bar" role="progressbar" aria-valuenow="${p}" aria-valuemin="0" aria-valuemax="100"><i style="width:${p}%"></i></div>`;
const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

let toastTimer;
function toast(m) {
 const t = $("#toast"); if (!t) return;
 t.textContent = m; t.classList.add("show");
 clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), 3500);
}

/* ===== STATE ===== */
const KEY = "wish-list-to-nihongo-v1", VERSION = 2;

const defaults = () => {
 const e = new Date(); e.setFullYear(e.getFullYear() + 2);
 return {v: VERSION, name: "", path: "", start: today(), depart: ymd(e), weekly: 150,
  done: {}, notes: {}, general: "", open: {}, study: [], target: 0, money: [],
  docs: {}, customDocs: [], log: [], finished: null, quote: 0,
  events: [], lastExport: null, hideDone: false, kana: {right: 0, total: 0}};
};

/* Membersihkan data dari localStorage / file impor: tipe dipaksa benar, field aneh dibuang. */
function clean(raw) {
 const o = defaults();
 if (!isObj(raw)) return o;
 o.name = str(raw.name, 60);
 o.path = ["ssw", "esd", "eng"].includes(raw.path) ? raw.path : "";
 if (isDate(raw.start)) o.start = raw.start;
 if (isDate(raw.depart)) o.depart = raw.depart;
 o.weekly = Math.max(1, Math.round(num(raw.weekly, 150)));
 if (isObj(raw.done)) for (const [k, v] of Object.entries(raw.done)) {
  const m = /^(\d+)-(\d+)$/.exec(k), e = /^end(\d+)$/.exec(k);
  if (m && STAGES[+m[1]] && +m[2] < STAGES[+m[1]].tasks.length && v) o.done[k] = isDate(v) ? v : today();
  else if (e && STAGES[+e[1]] && isDate(v)) o.done[k] = v;
 }
 if (isObj(raw.notes)) for (const [k, v] of Object.entries(raw.notes)) if (/^\d+$/.test(k) && STAGES[+k] && typeof v === "string") o.notes[k] = v.slice(0, 5000);
 o.general = str(raw.general, 20000);
 if (isObj(raw.open)) for (const [k, v] of Object.entries(raw.open)) if (/^\d+$/.test(k) && STAGES[+k] && v) o.open[k] = true;
 if (Array.isArray(raw.study)) o.study = raw.study.filter(x => isObj(x) && num(x.min) > 0 && str(x.topic).trim()).slice(0, 2000)
  .map(x => ({date: isDate(x.date) ? x.date : today(), min: Math.round(num(x.min)), topic: str(x.topic, 100), words: Math.max(0, Math.round(num(x.words)))}));
 o.target = Math.max(0, num(raw.target));
 if (Array.isArray(raw.money)) o.money = raw.money.filter(x => isObj(x) && (x.type === "in" || x.type === "out") && num(x.amt) > 0).slice(0, 5000)
  .map(x => ({type: x.type, amt: num(x.amt), note: str(x.note, 100), date: isDate(x.date) ? x.date : today()}));
 if (isObj(raw.docs)) for (const [k, v] of Object.entries(raw.docs)) if ([0, 1, 2].includes(v)) o.docs[k.slice(0, 100)] = v;
 if (Array.isArray(raw.customDocs)) {
  const seen = new Set(DOCS.map(d => d.toLowerCase()));
  for (const d of raw.customDocs) {
   const t = str(d, 100).trim();
   if (t && !seen.has(t.toLowerCase())) { seen.add(t.toLowerCase()); o.customDocs.push(t); }
   if (o.customDocs.length >= 100) break;
  }
 }
 if (Array.isArray(raw.log)) o.log = raw.log.filter(x => isObj(x) && typeof x.m === "string").slice(0, 30).map(x => ({t: str(x.t, 50), m: str(x.m, 200)}));
 o.finished = isDate(raw.finished) ? raw.finished : null;
 o.quote = Math.max(0, Math.floor(num(raw.quote)));
 if (Array.isArray(raw.events)) o.events = raw.events.filter(x => isObj(x) && isDate(x.date) && str(x.title).trim()).slice(0, 200)
  .map(x => ({date: x.date, title: str(x.title, 100), done: !!x.done}));
 o.lastExport = typeof raw.lastExport === "string" && !isNaN(Date.parse(raw.lastExport)) ? raw.lastExport : null;
 o.hideDone = !!raw.hideDone;
 if (isObj(raw.kana)) { o.kana.total = Math.max(0, Math.floor(num(raw.kana.total))); o.kana.right = Math.min(o.kana.total, Math.max(0, Math.floor(num(raw.kana.right)))); }
 return o;
}

let S;
try {
 const raw = localStorage.getItem(KEY);
 S = clean(raw ? JSON.parse(raw) : {});
} catch (e) {
 try { localStorage.setItem(KEY + "-corrupt", localStorage.getItem(KEY) || ""); } catch (_) {}
 S = defaults();
}
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { toast("Penyimpanan browser penuh atau diblokir. Ekspor data kamu sekarang."); } };
const addLog = m => { S.log.unshift({t: new Date().toLocaleString("id-ID"), m}); S.log = S.log.slice(0, 30); };

/* ===== PERHITUNGAN ===== */
const key = (i, j) => i + "-" + j;
const sDone = i => STAGES[i].tasks.filter((_, j) => S.done[key(i, j)]).length;
const sPct = i => Math.round(sDone(i) / STAGES[i].tasks.length * 100);
const sComplete = i => sDone(i) === STAGES[i].tasks.length;
// Tahap terbuka jika: pertama, tahap sebelumnya selesai, dibuka manual, atau sudah punya progres (agar tidak terkunci dari datanya sendiri)
const unlocked = i => i === 0 || sComplete(i - 1) || !!S.open[i] || sDone(i) > 0;
const status = i => sComplete(i) ? 2 : sDone(i) > 0 ? 1 : 0;
const total = STAGES.reduce((a, s) => a + s.tasks.length, 0);
const doneAll = () => STAGES.reduce((a, _, i) => a + sDone(i), 0);
const pctAll = () => Math.round(doneAll() / total * 100);
const allComplete = () => STAGES.every((_, i) => sComplete(i));
const current = () => { const i = STAGES.findIndex((_, i) => !sComplete(i) && unlocked(i)); return i < 0 ? STAGES.length - 1 : i; };
const syncFinished = () => { S.finished = allComplete() ? (S.finished || today()) : null; };
syncFinished();

const studyStreak = () => {
 const set = new Set(S.study.map(x => x.date)); const d = new Date(); let n = 0;
 if (!set.has(ymd(d))) d.setDate(d.getDate() - 1);
 while (set.has(ymd(d))) { n++; d.setDate(d.getDate() - 1); }
 return n;
};
const lastDays = n => { const out = []; for (let k = n - 1; k >= 0; k--) { const d = new Date(); d.setDate(d.getDate() - k); out.push(ymd(d)); } return out; };
const backupDue = () => {
 if (!(doneAll() > 0 || S.study.length || S.money.length || S.events.length)) return null;
 if (!S.lastExport) return "Kamu belum pernah mengekspor cadangan data.";
 const d = Math.floor((Date.now() - Date.parse(S.lastExport)) / 864e5);
 return d >= 14 ? `Cadangan terakhir ${d} hari lalu.` : null;
};

/* ===== RENDER ===== */
const NOTICE = `<div class="warn">ℹ️ Persyaratan resmi (bahasa, keterampilan, visa, dokumen) dapat berubah dan berbeda tiap jalur kerja. Selalu cek informasi terbaru dari sumber resmi pemerintah dan lembaga penempatan yang berizin. Checklist ini alat bantu, bukan jaminan lolos persyaratan atau mendapat visa. <span class="mut">Isi roadmap diperbarui ${fd(CONTENT_UPDATED)}.</span></div>`;

const hideToggle = () => `<label class="inline"><input type="checkbox" data-act="hide" ${S.hideDone ? "checked" : ""}> Sembunyikan tugas yang sudah selesai</label>`;

function stageCard(i) {
 const s = STAGES[i], lock = !unlocked(i), st = status(i), cd = S.done["end" + i];
 const rows = s.tasks.map((t, j) => ({t, j})).filter(x => !(S.hideDone && S.done[key(i, x.j)]));
 return `<section class="card stage ${lock ? "lock" : ""} ${st === 2 ? "done" : ""}" id="st${i}">
 <div class="head"><div><h3>Tahap ${i + 1}: ${esc(s.name)}</h3><div class="mut">${esc(s.period)}</div></div>
 <span class="tag st${st + 1}">${lock ? "🔒 Terkunci" : SNAME[st]}</span></div>
 <p>${esc(s.desc)}</p>${STAGE_INFO[i] ? `<p class="note">${esc(STAGE_INFO[i])}</p>` : ""}${bar(sPct(i))}<div class="mut">${sDone(i)}/${s.tasks.length} tugas · ${sPct(i)}%${cd ? " · Selesai " + fd(cd) : ""}</div>
 ${lock ? `<div class="row"><button data-act="unlock" data-i="${i}">Buka tahap ini secara manual</button></div>` : ""}
 <div>${rows.length ? rows.map(({t, j}) => `<label class="task ${S.done[key(i, j)] ? "d" : ""}"><input type="checkbox" data-act="check" data-i="${i}" data-j="${j}" ${S.done[key(i, j)] ? "checked" : ""} ${lock ? "disabled" : ""}><span>${esc(t)}</span></label>`).join("") : '<p class="mut">Semua tugas tahap ini sudah selesai.</p>'}</div>
 <label for="note${i}">Catatan pribadi tahap ini</label><textarea id="note${i}" data-note="${i}" placeholder="Tulis catatan...">${esc(S.notes[i] || "")}</textarea></section>`;
}

/* --- Kuis kana (state sesi, tidak disimpan kecuali skor total) --- */
const KQ = {set: "hira", cur: null, right: 0, total: 0};
const kanaChar = (k, set) => set === "kata" ? String.fromCharCode(k[0].charCodeAt(0) + 0x60) : k[0];
function nextQ() {
 const sets = KQ.set === "both" ? ["hira", "kata"] : [KQ.set];
 const set = sets[Math.floor(Math.random() * sets.length)];
 const item = KANA[Math.floor(Math.random() * KANA.length)];
 const opts = new Set([item[1]]);
 while (opts.size < 4) opts.add(KANA[Math.floor(Math.random() * KANA.length)][1]);
 KQ.cur = {ch: kanaChar(item, set), ans: item[1], opts: shuffle([...opts]), picked: null};
}
function quizHTML() {
 const q = KQ.cur, answered = q.picked !== null;
 const cls = o => !answered ? "" : o === q.ans ? "right" : o === q.picked ? "wrong" : "";
 return `<div class="kana-big" lang="ja" aria-label="Karakter yang ditanyakan">${esc(q.ch)}</div>
 <div class="kopts">${q.opts.map(o => `<button data-act="kq" data-v="${esc(o)}" class="${cls(o)}" ${answered ? "disabled" : ""}>${esc(o)}</button>`).join("")}</div>
 <p class="mut" role="status">${!answered ? "Pilih cara baca yang benar." : q.picked === q.ans ? "Benar! 🎉" : "Kurang tepat. Jawabannya: <b>" + esc(q.ans) + "</b>"}</p>
 ${answered ? '<button class="p" data-act="knext">Soal berikutnya</button>' : ""}
 <p class="mut">Skor sesi ini: ${KQ.right}/${KQ.total} · Total sepanjang waktu: ${S.kana.right}/${S.kana.total}${S.kana.total ? " (" + Math.round(S.kana.right / S.kana.total * 100) + "%)" : ""}</p>`;
}

const views = {
dashboard() {
 const c = current(), p = pctAll(), days = daysTo(S.depart);
 const next = STAGES[c].tasks.find((_, j) => !S.done[key(c, j)]);
 const upcoming = S.events.filter(e => !e.done).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3);
 const bk = backupDue();
 const win = allComplete() ? `<div class="card win"><span class="sun"></span><h1>CONGRATULATIONS! YOUR JAPAN JOURNEY STARTS HERE 🇯🇵</h1><p>Selesai pada <b>${fd(S.finished)}</b> · Total waktu persiapan <b>${Math.max(1, Math.round((new Date(S.finished + "T00:00") - new Date(S.start + "T00:00")) / 864e5))} hari</b>.</p><p class="mut">Checklist selesai tidak otomatis berarti memenuhi syarat kerja atau visa. Pastikan semua persyaratan resmi benar-benar terpenuhi sebelum berangkat.</p></div>` : "";
 return `<h1>Halo, ${esc(S.name || "Calon Pekerja Jepang")}! 👋</h1><p class="sub">Small Steps Today, Japan Tomorrow.</p>${win}
 ${bk ? `<div class="warn">💾 ${bk} Data hanya tersimpan di browser ini. <a href="#settings">Ekspor sekarang</a>.</div>` : ""}
 <div class="card"><h2>🎯 Persiapan Kerja ke Jepang</h2><div class="big">${p}%</div>${bar(p)}<div class="mut">${doneAll()} selesai · ${total - doneAll()} belum selesai dari ${total} tugas</div></div>
 <div class="grid"><a class="card linkcard" href="#roadmap" data-act="goStage" data-i="${c}"><div class="mut">Sedang dikerjakan</div><b>Tahap ${c + 1}: ${esc(STAGES[c].name)}</b>${bar(sPct(c))}</a>
 <a class="card linkcard" href="#roadmap" data-act="goStage" data-i="${c}"><div class="mut">Target berikutnya</div><b>${next ? esc(next) : "Semua tugas tahap ini selesai 🎉"}</b></a>
 <div class="card"><div class="mut">Menuju keberangkatan (${fd(S.depart)})</div><div class="big">${days > 0 ? days + " hari" : days === 0 ? "Hari ini!" : "Lewat " + (-days) + " hari"}</div></div></div>
 <div class="card"><h2>Jalur kerja: ${esc(PATH_NAME[S.path])}</h2><p>${esc(PATHS[S.path])}</p></div>
 <div class="card"><h2>Jadwal terdekat</h2>${upcoming.length ? upcoming.map(e => `<div class="li"><span>${esc(e.title)}<br><span class="mut">${fd(e.date)}</span></span><span class="tag ${daysTo(e.date) < 0 ? "st1 late" : "st2"}">${eventLabel(e.date)}</span></div>`).join("") : '<p class="mut">Belum ada jadwal. Tambahkan tanggal ujian atau deadline di <a href="#schedule">Jadwal Penting</a>.</p>'}</div>
 <div class="card"><div class="head"><i>“${esc(QUOTES[S.quote % QUOTES.length])}”</i><button data-act="quote">Kutipan lain</button></div></div>
 <div class="card"><h2>Aktivitas terakhir</h2>${S.log.length ? S.log.slice(0, 6).map(l => `<div class="li"><span>${esc(l.m)}</span><span class="mut">${esc(l.t)}</span></div>`).join("") : '<p class="mut">Belum ada aktivitas. Centang tugas pertamamu di My Roadmap.</p>'}</div>${NOTICE}`;
},
roadmap() { return `<h1>My Roadmap</h1><p class="sub">Selesaikan satu tahap untuk membuka tahap berikutnya.</p>${NOTICE}<div class="card">${hideToggle()}</div>${STAGES.map((_, i) => stageCard(i)).join("")}`; },
career() { return `<h1>Career Preparation</h1><p class="sub">Tahap eksplorasi karier, pengembangan keterampilan, dan seleksi kerja.</p>${NOTICE}<div class="card">${hideToggle()}</div>${[4, 5, 6, 8].map(stageCard).join("")}`; },
learning() {
 const days = lastDays(7), mins = S.study.filter(x => days.includes(x.date)).reduce((a, x) => a + x.min, 0);
 const wp = Math.min(100, Math.round(mins / S.weekly * 100)), words = S.study.reduce((a, x) => a + x.words, 0), tm = S.study.reduce((a, x) => a + x.min, 0);
 const per = days.map(d => S.study.filter(x => x.date === d).reduce((a, x) => a + x.min, 0)), mx = Math.max(1, ...per);
 const st = studyStreak();
 return `<h1>Japanese Learning</h1><p class="sub">Catat belajarmu setiap hari.</p>
 <div class="grid"><div class="card"><div class="mut">7 hari terakhir</div><div class="big">${mins} / ${S.weekly} mnt</div>${bar(wp)}</div>
 <div class="card"><div class="mut">Hari berturut-turut belajar</div><div class="big">${st} hari${st >= 3 ? " 🔥" : ""}</div></div>
 <div class="card"><div class="mut">Total kosakata dikuasai</div><div class="big">${words}</div></div>
 <div class="card"><div class="mut">Total waktu belajar</div><div class="big">${Math.round(tm / 60 * 10) / 10} jam</div></div></div>
 <div class="card"><h2>Menit belajar per hari</h2><div class="wk" role="img" aria-label="Grafik menit belajar 7 hari terakhir">${days.map((d, k) => `<div class="wkc"><span class="mut">${per[k] || ""}</span><i style="height:${Math.round(per[k] / mx * 70)}px"></i><span class="mut">${new Date(d + "T00:00").toLocaleDateString("id-ID", {weekday: "short"})}</span></div>`).join("")}</div></div>
 <div class="card"><h2>Tambah sesi belajar</h2><div class="row"><input type="date" id="sd" value="${today()}" aria-label="Tanggal"><input type="number" id="sm" min="1" placeholder="Durasi (menit)" aria-label="Durasi menit"><input id="st" placeholder="Materi (mis. Hiragana baris ka)" aria-label="Materi" maxlength="100"><input type="number" id="sw" min="0" placeholder="Kosakata baru" aria-label="Kosakata baru"><button class="p" data-act="addStudy">Simpan</button></div></div>
 <div class="card"><h2>Riwayat</h2>${S.study.length ? S.study.map((x, k) => `<div class="li"><span><b>${esc(x.topic)}</b><br><span class="mut">${fd(x.date)} · ${x.min} menit · +${x.words} kosakata</span></span><button class="x" data-act="delStudy" data-k="${k}">Hapus</button></div>`).join("") : '<p class="mut">Belum ada riwayat belajar.</p>'}</div>`;
},
kana() {
 if (!KQ.cur) nextQ();
 return `<h1>Latihan Kana</h1><p class="sub">Kenali Hiragana dan Katakana dasar. Latihan ini tidak mengubah checklist roadmap.</p>
 <div class="card"><label for="kset">Huruf yang dilatih</label><select id="kset" data-act="kset"><option value="hira" ${KQ.set === "hira" ? "selected" : ""}>Hiragana</option><option value="kata" ${KQ.set === "kata" ? "selected" : ""}>Katakana</option><option value="both" ${KQ.set === "both" ? "selected" : ""}>Keduanya</option></select></div>
 <div class="card center" id="kquiz">${quizHTML()}</div>
 <details class="card"><summary>Tabel Hiragana dan Katakana</summary><div class="kgrid" lang="ja">${KANA.map(k => `<div class="kcell"><b>${k[0]} ${kanaChar(k, "kata")}</b><span class="mut" lang="id">${k[1]}</span></div>`).join("")}</div><p class="mut">Ini 46 huruf dasar. Huruf bertitik (が, ぱ), huruf kecil, dan gabungan (きゃ) dipelajari setelah ini.</p></details>`;
},
documents() {
 const all = [...DOCS, ...S.customDocs], ok = all.filter(d => S.docs[d] === 2).length;
 return `<h1>Documents</h1><p class="sub">${ok} dari ${all.length} dokumen sudah tersedia.</p>${NOTICE}${bar(Math.round(ok / all.length * 100))}
 <div class="card">${all.map((d, k) => `<div class="li"><span>${esc(d)}</span><span class="act"><select data-doc="${esc(d)}" aria-label="Status ${esc(d)}">${STATUS.map((s, v) => `<option value="${v}" ${(S.docs[d] || 0) === v ? "selected" : ""}>${s}</option>`).join("")}</select>${k >= DOCS.length ? `<button class="x" data-act="delDoc" data-k="${k - DOCS.length}">Hapus</button>` : ""}</span></div>`).join("")}</div>
 <div class="card"><h2>Tambah dokumen</h2><div class="row"><input id="nd" placeholder="Nama dokumen" aria-label="Nama dokumen" maxlength="100"><button class="p" data-act="addDoc">Tambah</button></div></div>`;
},
schedule() {
 const list = S.events.map((e, k) => ({e, k})).sort((a, b) => a.e.done - b.e.done || a.e.date.localeCompare(b.e.date));
 return `<h1>Jadwal Penting</h1><p class="sub">Tanggal ujian, pendaftaran, dan deadline dokumen.</p>
 <div class="card"><h2>Tambah jadwal</h2><div class="row"><input type="date" id="ed" value="${today()}" aria-label="Tanggal"><input id="et" placeholder="Mis. Ujian JLPT N5 / daftar JFT-Basic" aria-label="Nama jadwal" maxlength="100"><button class="p" data-act="addEvent">Tambah</button></div></div>
 <div class="card">${list.length ? list.map(({e, k}) => `<div class="li ${e.done ? "dim" : ""}"><label class="task ${e.done ? "d" : ""}"><input type="checkbox" data-act="evDone" data-k="${k}" ${e.done ? "checked" : ""}><span>${esc(e.title)}<br><span class="mut">${fd(e.date)}</span></span></label><span class="act">${e.done ? "" : `<span class="tag ${daysTo(e.date) < 0 ? "st1 late" : "st2"}">${eventLabel(e.date)}</span>`}<button class="x" data-act="delEvent" data-k="${k}">Hapus</button></span></div>`).join("") : '<p class="mut">Belum ada jadwal.</p>'}</div>
 <div class="warn">Tanggal ujian resmi bisa berubah. Cek jadwal terbaru di situs penyelenggara (lihat <a href="#resources">Sumber Resmi</a>).</div>`;
},
savings() {
 const bal = S.money.reduce((a, m) => a + (m.type === "in" ? m.amt : -m.amt), 0), p = S.target ? Math.max(0, Math.min(100, Math.round(bal / S.target * 100))) : 0;
 const left = Math.max(0, S.target - bal), months = Math.max(0, daysTo(S.depart) / 30.4);
 const plan = S.target && left > 0 ? (months >= 1 ? `Untuk mencapai target sebelum keberangkatan, sisihkan sekitar <b>${rp(left / months)}</b> per bulan (${Math.floor(months)} bulan lagi).` : "Tanggal keberangkatan kurang dari sebulan lagi; sisa target " + rp(left) + ".") : "";
 return `<h1>Savings</h1><p class="sub">Tabungan persiapan Jepang.</p>
 <div class="card"><div class="mut">Terkumpul</div><div class="big">${rp(bal)}</div>${bar(p)}<div class="mut">${p}% dari target ${rp(S.target)}</div>${plan ? `<p>${plan}</p>` : ""}
 <label for="tg">Target tabungan (Rp)</label><div class="row"><input type="number" id="tg" min="0" value="${S.target || ""}"><button data-act="setTarget">Simpan target</button></div></div>
 <div class="card"><h2>Catat transaksi</h2><div class="row"><select id="mt" aria-label="Jenis"><option value="in">Pemasukan</option><option value="out">Pengeluaran</option></select><input type="number" id="ma" min="1" placeholder="Jumlah (Rp)" aria-label="Jumlah"><input type="date" id="md" value="${today()}" aria-label="Tanggal"><input id="mn" placeholder="Catatan" aria-label="Catatan" maxlength="100"><button class="p" data-act="addMoney">Simpan</button></div></div>
 <div class="card"><h2>Riwayat</h2>${S.money.length ? S.money.map((m, k) => `<div class="li"><span>${esc(m.note || (m.type === "in" ? "Pemasukan" : "Pengeluaran"))}<br><span class="mut">${fd(m.date)}</span></span><span class="act"><b class="${m.type === "in" ? "pos" : "neg"}">${m.type === "in" ? "+" : "−"}${rp(m.amt)}</b> <button class="x" data-act="delMoney" data-k="${k}">Hapus</button></span></div>`).join("") : '<p class="mut">Belum ada transaksi.</p>'}</div>`;
},
resources() {
 return `<h1>Sumber Resmi</h1><p class="sub">Rujukan untuk memeriksa informasi sebelum bertindak.</p>${NOTICE}
 ${LINKS.map(g => `<div class="card"><h2>${esc(g.group)}</h2>${g.items.map(([t, u, d]) => `<div class="li"><span><a href="${esc(u)}" target="_blank" rel="noopener noreferrer">${esc(t)}</a><br><span class="mut">${esc(d)}</span></span></div>`).join("")}</div>`).join("")}
 <div class="card scam"><h2>⚠️ Waspada calo dan penipuan penempatan</h2><p>Hentikan proses dan tanyakan dulu jika kamu menemukan salah satu tanda ini:</p><ul>${SCAM_FLAGS.map(f => `<li>${esc(f)}</li>`).join("")}</ul><h3>Cara memeriksa</h3><ul>${SCAM_CHECK.map(f => `<li>${esc(f)}</li>`).join("")}</ul></div>
 <p class="mut">Tautan bisa berubah. Jika ada yang tidak terbuka, cari nama lembaganya langsung di mesin pencari.</p>`;
},
notes() { return `<h1>My Notes</h1><p class="sub">Tersimpan otomatis.</p><div class="card"><h2>Catatan umum</h2><textarea data-gen aria-label="Catatan umum" style="min-height:140px" placeholder="Tulis apa saja...">${esc(S.general)}</textarea></div>
 <div class="card"><h2>Catatan per tahap</h2>${STAGES.map((s, i) => `<label for="nn${i}">Tahap ${i + 1}: ${esc(s.name)}</label><textarea id="nn${i}" data-note="${i}">${esc(S.notes[i] || "")}</textarea>`).join("")}</div>`; },
settings() { return `<h1>Settings</h1><p class="sub">Pengaturan dan cadangan data.</p>
 <div class="card"><label for="sn">Nama</label><input id="sn" value="${esc(S.name)}" maxlength="60"><label for="sp">Jalur kerja yang dipilih</label><select id="sp">${Object.entries(PATH_NAME).map(([v, n]) => `<option value="${v}" ${S.path === v ? "selected" : ""}>${n}</option>`).join("")}</select><label for="ss">Tanggal mulai roadmap</label><input type="date" id="ss" value="${S.start}"><label for="sdp">Target keberangkatan</label><input type="date" id="sdp" value="${S.depart}"><label for="sw2">Target belajar mingguan (menit)</label><input type="number" id="sw2" min="1" value="${S.weekly}"><div class="row"><button class="p" data-act="saveSet">Simpan pengaturan</button></div></div>
 <div class="card"><h2>Cadangan data</h2><p class="mut">Data hanya tersimpan di browser ini. Ekspor secara berkala sebagai cadangan.${S.lastExport ? " Terakhir diekspor: " + new Date(S.lastExport).toLocaleString("id-ID") + "." : ""}</p><div class="row"><button data-act="export">Ekspor JSON</button><button data-act="import">Impor JSON</button><input type="file" id="imp" accept=".json,application/json" hidden></div></div>
 <div class="card"><h2>Atur ulang</h2><p class="mut">Menghapus semua progres, catatan, tabungan, dan riwayat.</p><button class="x" data-act="reset">Atur ulang semua progress</button></div>`; }
};

function eventLabel(d) { const n = daysTo(d); return n === 0 ? "Hari ini" : n > 0 ? "H-" + n : "Terlewat " + (-n) + " hari"; }

/* ===== ROUTER ===== */
let pendingScroll = null, firstRender = true;
function render(navigated) {
 const h = location.hash.slice(1), pg = Object.prototype.hasOwnProperty.call(views, h) ? h : "dashboard";
 $("#nav").innerHTML = PAGES.map(([id, n]) => `<a href="#${id}" class="${id === pg ? "on" : ""}" ${id === pg ? 'aria-current="page"' : ""}>${n}</a>`).join("");
 const on = $("#nav a.on"), nv = $("#nav");
 if (on && nv.scrollWidth > nv.clientWidth) nv.scrollLeft = on.offsetLeft - nv.clientWidth / 2 + on.offsetWidth / 2;
 $("#app").innerHTML = views[pg]();
 document.title = (pg === "dashboard" ? "" : PAGES.find(p => p[0] === pg)[1] + " · ") + "Wish List to Nihongo 🇯🇵";
 if (pendingScroll) { const el = document.getElementById(pendingScroll); pendingScroll = null; if (el) { el.scrollIntoView(); return; } }
 window.scrollTo(0, 0);
 if (navigated && !firstRender) { const t = $("#app h1"); if (t) { t.setAttribute("tabindex", "-1"); t.focus({preventScroll: true}); } }
 firstRender = false;
}
function rerender() {
 const y = scrollY, a = document.activeElement; let sel = null;
 if (a && a.dataset && a.dataset.act === "check") sel = `[data-act="check"][data-i="${a.dataset.i}"][data-j="${a.dataset.j}"]`;
 render(false); scrollTo(0, y);
 if (sel) { const e = $(sel); if (e) e.focus({preventScroll: true}); }
}

/* ===== EVENT ===== */
document.addEventListener("change", e => {
 const t = e.target, a = t.dataset.act;
 if (a === "check") {
  const i = +t.dataset.i, j = +t.dataset.j, was = sComplete(i);
  if (t.checked) S.done[key(i, j)] = today(); else delete S.done[key(i, j)];
  addLog((t.checked ? "Selesai: " : "Dibatalkan: ") + STAGES[i].tasks[j]);
  if (sComplete(i) && !was) { S.done["end" + i] = today(); addLog("Tahap " + (i + 1) + " selesai 🎉"); }
  if (!sComplete(i)) delete S.done["end" + i];
  syncFinished(); save(); rerender();
 } else if (a === "hide") { S.hideDone = t.checked; save(); rerender(); }
 else if (a === "kset") { KQ.set = t.value; nextQ(); $("#kquiz").innerHTML = quizHTML(); }
 else if (a === "evDone") { const ev = S.events[+t.dataset.k]; if (ev) { ev.done = t.checked; save(); rerender(); } }
 else if (t.dataset.doc !== undefined) { S.docs[t.dataset.doc] = +t.value; save(); rerender(); }
 else if (t.id === "imp" && t.files[0]) {
  const r = new FileReader();
  r.onload = () => {
   try {
    const d = JSON.parse(r.result);
    if (!isObj(d) || !isObj(d.done)) throw new Error("bukan file cadangan");
    if (confirm("Data saat ini akan diganti dengan data dari file. Lanjutkan?")) { S = clean(d); syncFinished(); save(); render(false); toast("Data berhasil diimpor."); }
   } catch (_) { toast("File tidak valid. Gunakan file hasil Ekspor JSON dari aplikasi ini."); }
   t.value = "";
  };
  r.readAsText(t.files[0]);
 }
});
document.addEventListener("input", e => {
 const t = e.target;
 if (t.dataset.note !== undefined) { S.notes[t.dataset.note] = t.value; save(); }
 if (t.dataset.gen !== undefined) { S.general = t.value; save(); }
});
document.addEventListener("click", e => {
 const b = e.target.closest("[data-act]");
 if (!b || ["INPUT", "SELECT", "TEXTAREA"].includes(b.tagName)) return;
 const a = b.dataset.act, k = +b.dataset.k, v = id => ($("#" + id).value || "").trim();
 if (a === "goStage") { e.preventDefault(); pendingScroll = "st" + b.dataset.i; if (location.hash === "#roadmap") render(false); else location.hash = "roadmap"; }
 else if (a === "unlock") { const i = +b.dataset.i; if (confirm("Buka Tahap " + (i + 1) + " tanpa menyelesaikan tahap sebelumnya? Pastikan kamu memang sudah siap.")) { S.open[i] = true; addLog("Tahap " + (i + 1) + " dibuka manual"); save(); rerender(); } }
 else if (a === "quote") { S.quote = (S.quote + 1) % QUOTES.length; save(); rerender(); }
 else if (a === "addStudy") {
  const d = v("sd"), m = Math.round(+v("sm")), t = v("st"), w = Math.max(0, Math.round(+v("sw") || 0));
  if (!(m > 0) || !t) return toast("Isi durasi dan materi.");
  if (!isDate(d)) return toast("Tanggal tidak valid.");
  S.study.unshift({date: d, min: m, topic: t.slice(0, 100), words: w}); addLog("Belajar " + m + " menit: " + t); save(); rerender();
 }
 else if (a === "delStudy") { S.study.splice(k, 1); save(); rerender(); }
 else if (a === "addDoc") {
  const n = v("nd"); if (!n) return;
  if ([...DOCS, ...S.customDocs].some(d => d.toLowerCase() === n.toLowerCase())) return toast("Dokumen itu sudah ada di daftar.");
  S.customDocs.push(n.slice(0, 100)); save(); rerender();
 }
 else if (a === "delDoc") { delete S.docs[S.customDocs[k]]; S.customDocs.splice(k, 1); save(); rerender(); }
 else if (a === "addEvent") {
  const d = v("ed"), t = v("et");
  if (!isDate(d)) return toast("Pilih tanggal yang valid.");
  if (!t) return toast("Isi nama jadwal.");
  S.events.push({date: d, title: t.slice(0, 100), done: false}); save(); rerender();
 }
 else if (a === "delEvent") { S.events.splice(k, 1); save(); rerender(); }
 else if (a === "setTarget") { S.target = Math.max(0, +v("tg") || 0); save(); rerender(); }
 else if (a === "addMoney") {
  const amt = +v("ma"), d = v("md");
  if (!(amt > 0)) return toast("Isi jumlah uang.");
  if (!isDate(d)) return toast("Tanggal tidak valid.");
  S.money.unshift({type: $("#mt").value === "out" ? "out" : "in", amt, note: v("mn").slice(0, 100), date: d}); save(); rerender();
 }
 else if (a === "delMoney") { S.money.splice(k, 1); save(); rerender(); }
 else if (a === "saveSet") {
  const st = v("ss") || S.start, dp = v("sdp") || S.depart;
  if (!isDate(st) || !isDate(dp)) return toast("Tanggal tidak valid.");
  if (dp <= st) return toast("Target keberangkatan harus setelah tanggal mulai.");
  S.name = v("sn").slice(0, 60); S.path = ["ssw", "esd", "eng"].includes($("#sp").value) ? $("#sp").value : "";
  S.start = st; S.depart = dp; S.weekly = Math.max(1, Math.round(+v("sw2") || 150)); save(); toast("Pengaturan tersimpan.");
 }
 else if (a === "export") {
  S.lastExport = new Date().toISOString(); save();
  const l = document.createElement("a"); l.href = URL.createObjectURL(new Blob([JSON.stringify(S, null, 2)], {type: "application/json"}));
  l.download = "wish-list-to-nihongo-" + today() + ".json"; l.click(); setTimeout(() => URL.revokeObjectURL(l.href), 1000);
  toast("Cadangan diunduh."); rerender();
 }
 else if (a === "import") $("#imp").click();
 else if (a === "reset") { if (confirm("Yakin hapus SEMUA data? Tindakan ini tidak bisa dibatalkan.") && confirm("Konfirmasi terakhir: atur ulang semuanya?")) { S = defaults(); save(); render(false); } }
 else if (a === "kq") {
  const q = KQ.cur; if (!q || q.picked !== null) return;
  q.picked = b.dataset.v; KQ.total++; S.kana.total++;
  if (q.picked === q.ans) { KQ.right++; S.kana.right++; }
  save(); $("#kquiz").innerHTML = quizHTML(); const nb = $("#kquiz [data-act=knext]"); if (nb) nb.focus();
 }
 else if (a === "knext") { nextQ(); $("#kquiz").innerHTML = quizHTML(); }
});
addEventListener("hashchange", () => render(true));
render(false);

if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
 addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
}
