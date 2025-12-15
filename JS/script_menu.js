// emoji bagian menu
// memastikan bagian js di jalankan di seluruh elemen html dan
// mencegah error
document.addEventListener("DOMContentLoaded", () => {
    const emojis = document.querySelectorAll("#pilih_emotikon img");
    const motivasi = document.getElementById("motivasiSection");
    const emojiBox = document.getElementById("emojiDisplay");
    const judul = document.getElementById("judulMotivasi");
    const isi = document.getElementById("isimotivasi");

    emojis.forEach(emoji => {
        emoji.addEventListener("click", () => {

            // kalau sedang tampil DAN emoji yg sama diklik → sembunyikan
            if (motivasi.classList.contains("active") &&
                emojiBox.querySelector("img")?.src === emoji.src) {

                motivasi.classList.remove("active");
                emojiBox.innerHTML = "";
                return;
            }

            // tampilkan section motivasi
            motivasi.classList.add("active");

            // ganti emoji
            emojiBox.innerHTML = "";
            const img = document.createElement("img");
            img.src = emoji.src;
            img.alt = "emoji";
            emojiBox.appendChild(img);

            // ganti teks motivasi
            judul.textContent = emoji.dataset.judul;
            isi.textContent = emoji.dataset.isi;
        });
    });
});

// BAGIAN KOMENTAR, LOVE, SIMPAN, DAN SHARE
const letters = document.querySelectorAll(".letter-data");
let index = 0; //menyimpan posisi surat yang di tampilkan

// memanggil(lihat bagian dalam kurungnya)
const judul = document.getElementById("judulSurat");
const waktu = document.getElementById("waktuSurat");
const isi = document.getElementById("isiSurat");
const tanggal = document.getElementById("tanggalSurat");

// ini mengambil button (sesuai dalam kurung)
const prev = document.getElementById("btnPrev");
const next = document.getElementById("btnNext");
const likeBtn = document.getElementById("btnLike");
const shareBtn = document.getElementById("btnShare");
const commentBtn = document.getElementById("btnComment");

// menampilkan like&share 
const likeCount = document.getElementById("likeCount");
const shareCount = document.getElementById("shareCount");

// mengatur area komentar
const commentSection = document.getElementById("commentSection");
const commentInput = document.getElementById("commentInput");
const submitComment = document.getElementById("submitComment");
const commentList = document.getElementById("commentList");

// mengubah format tanggalnya
function formatTanggal(d) {
  return new Date(d).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

// menghitung jumlah kata dari isi surat
const kata = t => t.trim().split(/\s+/).length;

// load (memuat surat berdasarkan index)
function loadSurat() {
  const el = letters[index]; //mengambil data surat dari data
  const isiText = el.dataset.isi;
  const id = "surat_" + index; //membuatki id unik untuk localstorage

  judul.textContent = el.dataset.judul; //tiga ini untuk menampilkan isi surat
  waktu.textContent = el.dataset.waktu;
  isi.textContent = isiText;

  tanggal.textContent = //tampilkan tanggal&jumlah kata
    `${formatTanggal(el.dataset.mulai)} → ${formatTanggal(el.dataset.akhir)} • ${kata(isiText)} kata`;

  //dibawah itu, data tetap ada walauu di refrresh
  likeCount.textContent = localStorage.getItem(id + "_like") || 0;
  shareCount.textContent = localStorage.getItem(id + "_share") || 0;

  renderKomentar(); //load komentarnya
}

// navigasi surat
//tombol sebelumnya
prev.onclick = e => {
  e.preventDefault();
  if (index > 0) index--;
  loadSurat();
};

//tombol berikutnya
next.onclick = e => {
  e.preventDefault();
  if (index < letters.length - 1) index++;
  loadSurat();
};

// like suratnya
likeBtn.onclick = e => {
  e.preventDefault();
  const key = "surat_" + index + "_like"; //menambah jumlah like
  let count = Number(localStorage.getItem(key)) || 0; //disimpan di localstorage
  localStorage.setItem(key, ++count); 
  likeCount.textContent = count;
};

// share surat
shareBtn.onclick = e => {
  e.preventDefault();
  const key = "surat_" + index + "_share";
  let count = Number(localStorage.getItem(key)) || 0;
  localStorage.setItem(key, ++count);
  shareCount.textContent = count;
};

// komen toggle (kliktampil dan sembunyikan kome)
commentBtn.onclick = e => {
  e.preventDefault();
  commentSection.style.display =
    commentSection.style.display === "none" ? "block" : "none";
};

// kirim komentar
submitComment.onclick = () => {
  if (!commentInput.value.trim()) return; //mencegah komen kosong

  const key = "surat_" + index + "_comment";
  const comments = JSON.parse(localStorage.getItem(key)) || [];
  comments.push(commentInput.value);
  localStorage.setItem(key, JSON.stringify(comments));
  commentInput.value = ""; //simpNan komen surat

  //mengambil komen dari localstorage (menampilkan sebagai list li)
  renderKomentar();
};

// renderKomentar
function renderKomentar() {
  const key = "surat_" + index + "_comment";
  const comments = JSON.parse(localStorage.getItem(key)) || [];
  commentList.innerHTML = "";
  comments.forEach(c => {
    const li = document.createElement("li");
    li.textContent = c;
    commentList.appendChild(li);
  });
}

// menampilkan surat pertama saat halaman dibuka
loadSurat();