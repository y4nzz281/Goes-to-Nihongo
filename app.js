"use strict";
/* ===== DATA ROADMAP ===== */
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
const DOCS=["KTP","Kartu Keluarga","Akta kelahiran","Ijazah","Paspor","Sertifikat bahasa","Sertifikat keterampilan","Hasil pemeriksaan kesehatan","CV","Dokumen pendukung penempatan"];
const QUOTES=["Small steps today, Japan tomorrow.","Konsisten 20 menit sehari lebih baik dari 5 jam sekali.","Nanakorobi yaoki: jatuh tujuh kali, bangkit delapan kali.","Mulai dari satu huruf, satu kata, satu langkah.","Persiapan yang jujur dan teliti melindungi masa depanmu."];
const PAGES=[["dashboard","Dashboard"],["roadmap","My Roadmap"],["learning","Japanese Learning"],["career","Career Preparation"],["documents","Documents"],["savings","Savings"],["notes","My Notes"],["settings","Settings"]];
const STATUS=["Belum tersedia","Sedang diproses","Sudah tersedia"];
const NOTICE='<div class="warn">ℹ️ Persyaratan resmi (bahasa, keterampilan, visa, dokumen) dapat berubah dan berbeda tiap jalur kerja. Selalu cek informasi terbaru dari sumber resmi pemerintah dan lembaga penempatan yang berizin. Checklist ini alat bantu, bukan jaminan lolos persyaratan atau mendapat visa.</div>';

/* ===== STATE ===== */
const KEY="wish-list-to-nihongo-v1";
const today=()=>new Date().toISOString().slice(0,10);
const defaults=()=>{const d=new Date(),e=new Date();e.setFullYear(e.getFullYear()+2);
 return{name:"",start:today(),depart:e.toISOString().slice(0,10),weekly:150,done:{},notes:{},general:"",open:{},study:[],target:0,money:[],docs:{},customDocs:[],log:[],finished:null,quote:0}};
let S;
try{S=Object.assign(defaults(),JSON.parse(localStorage.getItem(KEY)||"{}"))}catch(e){S=defaults()}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){alert("Penyimpanan browser penuh atau diblokir.")}};
const $=s=>document.querySelector(s);
const esc=t=>String(t).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const rp=n=>"Rp "+Math.round(n).toLocaleString("id-ID");
const fd=d=>d?new Date(d+"T00:00").toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric"}):"-";
const bar=p=>`<div class="bar" role="progressbar" aria-valuenow="${p}" aria-valuemin="0" aria-valuemax="100"><i style="width:${p}%"></i></div>`;
const addLog=m=>{S.log.unshift({t:new Date().toLocaleString("id-ID"),m});S.log=S.log.slice(0,30)};

/* ===== PERHITUNGAN ===== */
const key=(i,j)=>i+"-"+j;
const sDone=i=>STAGES[i].tasks.filter((_,j)=>S.done[key(i,j)]).length;
const sPct=i=>Math.round(sDone(i)/STAGES[i].tasks.length*100);
const sComplete=i=>sDone(i)===STAGES[i].tasks.length;
const unlocked=i=>i===0||sComplete(i-1)||!!S.open[i];
const status=i=>sComplete(i)?2:sDone(i)>0?1:0;
const SNAME=["Belum dimulai","Sedang dikerjakan","Selesai"];
const total=STAGES.reduce((a,s)=>a+s.tasks.length,0);
const doneAll=()=>STAGES.reduce((a,_,i)=>a+sDone(i),0);
const pctAll=()=>Math.round(doneAll()/total*100);
const current=()=>{const i=STAGES.findIndex((_,i)=>!sComplete(i)&&unlocked(i));return i<0?STAGES.length-1:i};

/* ===== RENDER ===== */
function stageCard(i){
 const s=STAGES[i],lock=!unlocked(i),st=status(i),cd=S.done["end"+i];
 return `<section class="card stage ${lock?"lock":""} ${st===2?"done":""}" id="st${i}">
 <div class="head"><div><h3>Tahap ${i+1} — ${esc(s.name)}</h3><div class="mut">${esc(s.period)}</div></div>
 <span class="tag st${st+1}">${lock?"🔒 Terkunci":SNAME[st]}</span></div>
 <p>${esc(s.desc)}</p>${bar(sPct(i))}<div class="mut">${sDone(i)}/${s.tasks.length} tugas · ${sPct(i)}%${cd?" · Selesai "+fd(cd):""}</div>
 ${lock?`<div class="row"><button data-act="unlock" data-i="${i}">Buka tahap ini secara manual</button></div>`:""}
 <div>${s.tasks.map((t,j)=>`<label class="task ${S.done[key(i,j)]?"d":""}"><input type="checkbox" data-act="check" data-i="${i}" data-j="${j}" ${S.done[key(i,j)]?"checked":""} ${lock?"disabled":""}><span>${esc(t)}</span></label>`).join("")}</div>
 <label>Catatan pribadi tahap ini</label><textarea data-note="${i}" placeholder="Tulis catatan...">${esc(S.notes[i]||"")}</textarea></section>`}

const views={
dashboard(){
 const c=current(),p=pctAll(),days=Math.ceil((new Date(S.depart+"T00:00")-new Date())/864e5);
 const next=STAGES[c].tasks.find((_,j)=>!S.done[key(c,j)]);
 const win=sComplete(10)?`<div class="card win"><span class="sun"></span><h1>CONGRATULATIONS! YOUR JAPAN JOURNEY STARTS HERE 🇯🇵</h1><p>Selesai pada <b>${fd(S.finished)}</b> · Total waktu persiapan <b>${Math.max(1,Math.round((new Date(S.finished+"T00:00")-new Date(S.start+"T00:00"))/864e5))} hari</b>.</p><p class="mut">Checklist selesai tidak otomatis berarti memenuhi syarat kerja atau visa. Pastikan semua persyaratan resmi benar-benar terpenuhi sebelum berangkat.</p></div>`:"";
 return `<h1>Halo, ${esc(S.name||"Calon Pekerja Jepang")}! 👋</h1><p class="sub">Small Steps Today, Japan Tomorrow.</p>${win}
 <div class="card"><h2>🎯 Persiapan Kerja ke Jepang</h2><div class="big">${p}%</div>${bar(p)}<div class="mut">${doneAll()} selesai · ${total-doneAll()} belum selesai dari ${total} tugas</div></div>
 <div class="grid"><div class="card"><div class="mut">Sedang dikerjakan</div><b>Tahap ${c+1}: ${esc(STAGES[c].name)}</b>${bar(sPct(c))}</div>
 <div class="card"><div class="mut">Target berikutnya</div><b>${next?esc(next):"Semua tugas tahap ini selesai 🎉"}</b></div>
 <div class="card"><div class="mut">Menuju keberangkatan (${fd(S.depart)})</div><div class="big">${days>=0?days+" hari":"Lewat "+(-days)+" hari"}</div></div></div>
 <div class="card"><div class="head"><i>“${esc(QUOTES[S.quote%QUOTES.length])}”</i><button data-act="quote">Kutipan lain</button></div></div>
 <div class="card"><h2>Aktivitas terakhir</h2>${S.log.length?S.log.slice(0,6).map(l=>`<div class="li"><span>${esc(l.m)}</span><span class="mut">${esc(l.t)}</span></div>`).join(""):'<p class="mut">Belum ada aktivitas. Centang tugas pertamamu di My Roadmap.</p>'}</div>${NOTICE}`},
roadmap(){return `<h1>My Roadmap</h1><p class="sub">Selesaikan satu tahap untuk membuka tahap berikutnya.</p>${NOTICE}${STAGES.map((_,i)=>stageCard(i)).join("")}`},
career(){return `<h1>Career Preparation</h1><p class="sub">Tahap eksplorasi karier, pengembangan keterampilan, dan seleksi kerja.</p>${NOTICE}${[4,5,6,8].map(stageCard).join("")}`},
learning(){
 const wk=Date.now()-7*864e5,mins=S.study.filter(x=>new Date(x.date+"T00:00")>=wk).reduce((a,x)=>a+x.min,0);
 const wp=Math.min(100,Math.round(mins/Math.max(1,S.weekly)*100)),words=S.study.reduce((a,x)=>a+x.words,0),tm=S.study.reduce((a,x)=>a+x.min,0);
 return `<h1>Japanese Learning</h1><p class="sub">Catat belajarmu setiap hari.</p>
 <div class="grid"><div class="card"><div class="mut">7 hari terakhir</div><div class="big">${mins} / ${S.weekly} mnt</div>${bar(wp)}</div>
 <div class="card"><div class="mut">Total kosakata dikuasai</div><div class="big">${words}</div></div>
 <div class="card"><div class="mut">Total waktu belajar</div><div class="big">${Math.round(tm/60*10)/10} jam</div></div></div>
 <div class="card"><h2>Tambah sesi belajar</h2><div class="row"><input type="date" id="sd" value="${today()}"><input type="number" id="sm" min="1" placeholder="Durasi (menit)"><input id="st" placeholder="Materi (mis. Hiragana baris ka)"><input type="number" id="sw" min="0" placeholder="Kosakata baru"><button class="p" data-act="addStudy">Simpan</button></div></div>
 <div class="card"><h2>Riwayat</h2>${S.study.length?S.study.map((x,k)=>`<div class="li"><span><b>${esc(x.topic)}</b><br><span class="mut">${fd(x.date)} · ${x.min} menit · +${x.words} kosakata</span></span><button class="x" data-act="delStudy" data-k="${k}">Hapus</button></div>`).join(""):'<p class="mut">Belum ada riwayat belajar.</p>'}</div>`},
documents(){
 const all=[...DOCS,...S.customDocs],ok=all.filter(d=>S.docs[d]===2).length;
 return `<h1>Documents</h1><p class="sub">${ok} dari ${all.length} dokumen sudah tersedia.</p>${NOTICE}${bar(Math.round(ok/all.length*100))}
 <div class="card">${all.map((d,k)=>`<div class="li"><span>${esc(d)}</span><span><select data-doc="${esc(d)}">${STATUS.map((s,v)=>`<option value="${v}" ${(S.docs[d]||0)===v?"selected":""}>${s}</option>`).join("")}</select>${k>=DOCS.length?`<button class="x" data-act="delDoc" data-k="${k-DOCS.length}">Hapus</button>`:""}</span></div>`).join("")}</div>
 <div class="card"><h2>Tambah dokumen</h2><div class="row"><input id="nd" placeholder="Nama dokumen"><button class="p" data-act="addDoc">Tambah</button></div></div>`},
savings(){
 const bal=S.money.reduce((a,m)=>a+(m.type==="in"?m.amt:-m.amt),0),p=S.target?Math.max(0,Math.min(100,Math.round(bal/S.target*100))):0;
 return `<h1>Savings</h1><p class="sub">Tabungan persiapan Jepang.</p>
 <div class="card"><div class="mut">Terkumpul</div><div class="big">${rp(bal)}</div>${bar(p)}<div class="mut">${p}% dari target ${rp(S.target)}</div>
 <label>Target tabungan (Rp)</label><div class="row"><input type="number" id="tg" min="0" value="${S.target||""}"><button data-act="setTarget">Simpan target</button></div></div>
 <div class="card"><h2>Catat transaksi</h2><div class="row"><select id="mt"><option value="in">Pemasukan</option><option value="out">Pengeluaran</option></select><input type="number" id="ma" min="1" placeholder="Jumlah (Rp)"><input id="mn" placeholder="Catatan"><button class="p" data-act="addMoney">Simpan</button></div></div>
 <div class="card"><h2>Riwayat</h2>${S.money.length?S.money.map((m,k)=>`<div class="li"><span>${esc(m.note||(m.type==="in"?"Pemasukan":"Pengeluaran"))}<br><span class="mut">${fd(m.date)}</span></span><span><b style="color:${m.type==="in"?"var(--ok)":"var(--red)"}">${m.type==="in"?"+":"−"}${rp(m.amt)}</b> <button class="x" data-act="delMoney" data-k="${k}">Hapus</button></span></div>`).join(""):'<p class="mut">Belum ada transaksi.</p>'}</div>`},
notes(){return `<h1>My Notes</h1><p class="sub">Tersimpan otomatis.</p><div class="card"><h2>Catatan umum</h2><textarea data-gen style="min-height:140px" placeholder="Tulis apa saja...">${esc(S.general)}</textarea></div>
 <div class="card"><h2>Catatan per tahap</h2>${STAGES.map((s,i)=>`<label>Tahap ${i+1} — ${esc(s.name)}</label><textarea data-note="${i}">${esc(S.notes[i]||"")}</textarea>`).join("")}</div>`},
settings(){return `<h1>Settings</h1><p class="sub">Pengaturan dan cadangan data.</p>
 <div class="card"><label>Nama</label><input id="sn" value="${esc(S.name)}"><label>Tanggal mulai roadmap</label><input type="date" id="ss" value="${S.start}"><label>Target keberangkatan</label><input type="date" id="sdp" value="${S.depart}"><label>Target belajar mingguan (menit)</label><input type="number" id="sw2" min="1" value="${S.weekly}"><div class="row"><button class="p" data-act="saveSet">Simpan pengaturan</button></div></div>
 <div class="card"><h2>Cadangan data</h2><p class="mut">Data hanya tersimpan di browser ini. Ekspor secara berkala sebagai cadangan.</p><div class="row"><button data-act="export">Ekspor JSON</button><button data-act="import">Impor JSON</button><input type="file" id="imp" accept=".json" hidden></div></div>
 <div class="card"><h2>Atur ulang</h2><p class="mut">Menghapus semua progres, catatan, tabungan, dan riwayat.</p><button class="x" data-act="reset">Atur ulang semua progress</button></div>`}
};

function render(){
 const pg=location.hash.slice(1)in views?location.hash.slice(1):"dashboard";
 $("#nav").innerHTML=PAGES.map(([id,n])=>`<a href="#${id}" class="${id===pg?"on":""}">${n}</a>`).join("");
 $("#app").innerHTML=views[pg]();window.scrollTo(0,0)}

/* ===== EVENT ===== */
function rerender(){const y=scrollY;render();scrollTo(0,y)}
document.addEventListener("change",e=>{
 const t=e.target,a=t.dataset.act;
 if(a==="check"){const i=+t.dataset.i,j=+t.dataset.j,was=sComplete(i);
  if(t.checked)S.done[key(i,j)]=today();else delete S.done[key(i,j)];
  addLog((t.checked?"Selesai: ":"Dibatalkan: ")+STAGES[i].tasks[j]);
  if(sComplete(i)&&!was){S.done["end"+i]=today();addLog("Tahap "+(i+1)+" selesai 🎉")}
  if(!sComplete(i)){delete S.done["end"+i]}
  S.finished=sComplete(10)?(S.finished||today()):null;save();rerender()}
 else if(t.dataset.doc!==undefined){S.docs[t.dataset.doc]=+t.value;save();rerender()}
 else if(t.id==="imp"&&t.files[0]){const r=new FileReader();r.onload=()=>{try{const d=JSON.parse(r.result);if(typeof d!=="object"||!d.done)throw 0;
  if(confirm("Data saat ini akan diganti dengan data dari file. Lanjutkan?")){S=Object.assign(defaults(),d);save();render()}}catch(_){alert("File tidak valid.")}};r.readAsText(t.files[0])}
});
document.addEventListener("input",e=>{const t=e.target;
 if(t.dataset.note!==undefined){S.notes[t.dataset.note]=t.value;save()}
 if(t.dataset.gen!==undefined){S.general=t.value;save()}});
document.addEventListener("click",e=>{
 const b=e.target.closest("[data-act]");if(!b||b.type==="checkbox")return;
 const a=b.dataset.act,k=+b.dataset.k,v=id=>$("#"+id).value.trim();
 if(a==="unlock"){const i=+b.dataset.i;if(confirm("Buka Tahap "+(i+1)+" tanpa menyelesaikan tahap sebelumnya? Pastikan kamu memang sudah siap.")){S.open[i]=true;addLog("Tahap "+(i+1)+" dibuka manual");save();rerender()}}
 else if(a==="quote"){S.quote=(S.quote+1)%QUOTES.length;save();rerender()}
 else if(a==="addStudy"){if(!(+v("sm")>0)||!v("st"))return alert("Isi durasi dan materi.");S.study.unshift({date:v("sd")||today(),min:+v("sm"),topic:v("st"),words:+v("sw")||0});addLog("Belajar "+v("sm")+" menit: "+v("st"));save();rerender()}
 else if(a==="delStudy"){S.study.splice(k,1);save();rerender()}
 else if(a==="addDoc"){if(!v("nd"))return;S.customDocs.push(v("nd"));save();rerender()}
 else if(a==="delDoc"){delete S.docs[S.customDocs[k]];S.customDocs.splice(k,1);save();rerender()}
 else if(a==="setTarget"){S.target=Math.max(0,+v("tg")||0);save();rerender()}
 else if(a==="addMoney"){if(!(+v("ma")>0))return alert("Isi jumlah uang.");S.money.unshift({type:$("#mt").value,amt:+v("ma"),note:v("mn"),date:today()});save();rerender()}
 else if(a==="delMoney"){S.money.splice(k,1);save();rerender()}
 else if(a==="saveSet"){S.name=v("sn");S.start=v("ss")||S.start;S.depart=v("sdp")||S.depart;S.weekly=Math.max(1,+v("sw2")||150);save();alert("Pengaturan tersimpan.")}
 else if(a==="export"){const l=document.createElement("a");l.href=URL.createObjectURL(new Blob([JSON.stringify(S,null,2)],{type:"application/json"}));l.download="wish-list-to-nihongo-"+today()+".json";l.click()}
 else if(a==="import")$("#imp").click();
 else if(a==="reset"){if(confirm("Yakin hapus SEMUA data? Tindakan ini tidak bisa dibatalkan.")&&confirm("Konfirmasi terakhir: atur ulang semuanya?")){S=defaults();save();render()}}
});
addEventListener("hashchange",render);
render();
