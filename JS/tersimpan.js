// FUNGSI UTAMA: MENGAMBIL DAN MEMBUAT DATA ARTIKEL DARI KARTU HTML ---
function getArticleData(element) {
    const articleCard = element.closest('.konten_card');
    // Pastikan semua data diambil dengan fallback yang aman
    return {
        id: articleCard.dataset.articleId || Date.now(), 
        title: articleCard.dataset.title || 'Judul Tidak Diketahui',
        author: articleCard.dataset.author || 'Penulis Tidak Diketahui',
        summary: articleCard.dataset.summary || 'Tidak ada ringkasan.',
        ava: articleCard.dataset.ava || '',
        img: articleCard.dataset.img || '',
        tgl: articleCard.dataset.tgl || '',
        tags: articleCard.dataset.tags || '',
        timestamp: new Date().toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})
    };
}

// FUNGSI UTAMA: SIMPAN (Tersimpan) 
function simpanArtikel(element) {
    const savedArticleData = getArticleData(element);
    let savedArticles = JSON.parse(localStorage.getItem('savedArticles')) || [];

    // Cek apakah artikel sudah ada
    const isAlreadySaved = savedArticles.some(article => article.id === savedArticleData.id);

    if (!isAlreadySaved) {
        savedArticles.push(savedArticleData);
        localStorage.setItem('savedArticles', JSON.stringify(savedArticles));

        // Feedback visual di halaman artikel_emosional.html
        element.innerHTML = '<i class="fas fa-save"></i> Tersimpan';
        element.style.color = 'green';
        element.onclick = null; 
        alert(`Artikel "${savedArticleData.title}" berhasil disimpan!`);
    } 
}
window.simpanArtikel = simpanArtikel;


// === FUNGSI UTAMA: SUKA (LOGIKA TOGGLE & COUNTER) 

function sukaiArtikel(btn) {
    // Identifikasi Elemen Parent (Kartu)
    const card = btn.closest('.konten_card');
    const articleId = card.dataset.articleId;
    
    //Cari elemen angka (Counter) di dalam kartu ini
    // Mecari <small> pertama di dalam .bawah_like
    const footerSection = card.querySelector('.footer_konten_section');
    const countElement = footerSection.querySelector('.bawah_like small'); 

    //Tentukan Key untuk LocalStorage (Unik per artikel)
    const likeStatusKey = `status_like_${articleId}`; // true/false
    const likeCountKey = `count_like_${articleId}`;   // angka (misal: 23)

    //Ambil Data Saat Ini
    let isLiked = localStorage.getItem(likeStatusKey) === "true";
    // Ambil angka dari LocalStorage, jika tidak ada ambil dari teks HTML, jika error pakai 0
    let currentCount = Number(localStorage.getItem(likeCountKey)) || parseInt(countElement.textContent) || 0;

    //LOGIKA TOGGLE
    // Balik status: jika true jadi false, jika false jadi true
    isLiked = !isLiked; 

    if (isLiked) {
        // Jika jadi LIKE
        currentCount += 1;
        btn.innerHTML = '<i class="fas fa-heart" style="color: red;"></i> Suka';
        btn.classList.add('active');
        
        // Simpan data artikel ke array 'likedArticles' (untuk halaman Disukai)
        simpanKeArrayDisukai(card); 
    } else {
        // Jika jadi UNLIKE
        currentCount -= 1;
        // Jangan biarkan minus
        if (currentCount < 0) currentCount = 0; 
        
        btn.innerHTML = '<i class="fas fa-heart"></i> Suka'; // Kembali ke default
        btn.classList.remove('active');

        // Hapus data artikel dari array 'likedArticles'
        hapusDariArrayDisukai(articleId);
    }

    // Update UI (Tampilan Angka)
    countElement.textContent = currentCount + " suka";

    // Simpan Status & Angka Baru ke LocalStorage
    localStorage.setItem(likeStatusKey, isLiked);
    localStorage.setItem(likeCountKey, currentCount);
}

// --- FUNGSI BANTUAN: SIMPAN KE ARRAY GLOBAL (Agar muncul di halaman Disukai) ---
function simpanKeArrayDisukai(cardElement) {
    const data = getArticleData(cardElement.querySelector('.btn-like')); // Pakai helper yg sudah ada
    let likedArticles = JSON.parse(localStorage.getItem('likedArticles')) || [];
    
    // Cek duplikasi
    if (!likedArticles.some(a => a.id === data.id)) {
        likedArticles.push(data);
        localStorage.setItem('likedArticles', JSON.stringify(likedArticles));
    }
}

// --- FUNGSI BANTUAN: HAPUS DARI ARRAY GLOBAL ---
function hapusDariArrayDisukai(id) {
    let likedArticles = JSON.parse(localStorage.getItem('likedArticles')) || [];
    likedArticles = likedArticles.filter(a => a.id !== id);
    localStorage.setItem('likedArticles', JSON.stringify(likedArticles));
}

// --- FUNGSI LOAD STATUS SAAT REFRESH ---
// Fungsi ini memastikan saat halaman direload
function initializeLikeButtons() {
    const cards = document.querySelectorAll('.konten_card');

    cards.forEach(card => {
        const articleId = card.dataset.articleId;
        const btn = card.querySelector('.btn-like');
        const countElement = card.querySelector('.bawah_like small');

        const likeStatusKey = `status_like_${articleId}`;
        const likeCountKey = `count_like_${articleId}`;

        // Load Status Like
        const isLiked = localStorage.getItem(likeStatusKey) === "true";
        if (isLiked && btn) {
            btn.innerHTML = '<i class="fas fa-heart" style="color: red;"></i> Suka';
            btn.classList.add('active');
        }

        // Load Jumlah Angka
        const savedCount = localStorage.getItem(likeCountKey);
        if (savedCount && countElement) {
            countElement.textContent = savedCount + " suka";
        }
    });
}

// Panggil fungsi inisialisasi saat load
document.addEventListener('DOMContentLoaded', () => {
    initializeLikeButtons();
    // ... fungsi load lainnya ...
});

window.sukaiArtikel = sukaiArtikel;

// --- Bantuan untuk membuat HTML Card (Tidak perlu diubah) ---
function createCardHTML(article, removeFunction, imageAltText) {
    return `
        <div class="konten_card" data-article-id="${article.id}">
            <div class="header_konten_section">
                <img src="${article.ava}" alt="Avatar Penulis" width="40" height="40">
                <div class="konten_account">
                    <strong>${article.author}</strong> 
                    <small>@user_${article.author.replace(/\s/g, '_').toLowerCase()}</small>
                </div>
                <button class="btn btn-secondary" onclick="${removeFunction}('${article.id}')">Hapus</button> 
            </div>
            
            <div class="main_konten_section">
                <img src="${article.img}" alt="${imageAltText}" width="100" height="70">
                <h3>${article.title}</h3>
                <p>${article.summary}</p>
                
                <small>${article.tags}</small><br>
            </div>
            
            <hr>
            <div class="footer_konten_section"> 
                    <a href="javascript:void(0)" class="btn-like" onclick="sukaiArtikel(this)"><i class="fas fa-heart" style="color: red;"></i> Suka</a>
                    <a href="#" class="btn-komentar"><i class="fas fa-comment"></i> Komentar</a> 
                    <a href=""><i class="fas fa-share"></i> Bagikan</a>
                    <a href="#" class="btn-simpan" onclick="simpanArtikel(this)"><i class="fas fa-save"></i> Tersimpan</a>
                    <div class="bawah_like">
                        <small></small>
                        <small>${article.tgl}</small>
                    </div>
            </div>
                <div class="komentar-wrapper" style="display:none;">
                    <div class="daftar-komentar"></div>

                    <div class="form-komentar">
                        <input 
                            type="text" 
                            class="input-komentar" 
                            placeholder="Tulis komentar..." />
                        <button class="btn btn-primary btn-kirim-komentar">Kirim</button>
                    </div>
                </div>
            
        </div>
    `;
}


// komentar
document.addEventListener("click", function (e) {

  const btnKomentar = e.target.closest(".btn-komentar");
  if (btnKomentar) {
    e.preventDefault();

    const card = btnKomentar.closest(".konten_card");
    const wrapper = card.querySelector(".komentar-wrapper");

    console.log("Komentar diklik"); // DEBUG

    if (!wrapper) {
      console.error("komentar-wrapper tidak ditemukan");
      return;
    }

    wrapper.style.display =
      wrapper.style.display === "none" ? "block" : "none";

    tampilkanKomentar(card);
  }

  const btnKirim = e.target.closest(".btn-kirim-komentar");
  if (btnKirim) {
    const card = btnKirim.closest(".konten_card");
    const input = card.querySelector(".input-komentar");

    if (!input || input.value.trim() === "") return;

    simpanKomentar(card, input.value.trim());
    input.value = "";
    tampilkanKomentar(card);
  }
});


// Fungsi mendapatkan Key unik untuk LocalStorage berdasarkan ID Artikel
function getCommentKey(card) {
    const articleId = card.dataset.articleId || 'default';
    return 'komentar_' + articleId;
}

// FUNGSI SIMPAN KOMENTAR
function simpanKomentar(card, text) {
    const key = getCommentKey(card);
    
    // Ambil data lama, atau buat array baru jika belum ada
    let comments = JSON.parse(localStorage.getItem(key)) || [];
    
    // Tambahkan komentar baru ke array
    comments.push(text);
    
    // Simpan kembali ke LocalStorage
    localStorage.setItem(key, JSON.stringify(comments));
}

// FUNGSI TAMPILKAN KOMENTAR (Agar muncul kotak putih seperti gambar)
function tampilkanKomentar(card) {
    const list = card.querySelector(".daftar-komentar");
    const key = getCommentKey(card);
    const comments = JSON.parse(localStorage.getItem(key)) || [];

    // Kosongkan tampilan lama agar tidak duplikat
    list.innerHTML = "";

    // Loop semua komentar dan buat elemen HTML-nya
    comments.forEach(text => {
        const item = document.createElement("div");
        
        // Isi teks komentar
        item.textContent = text;

        item.style.backgroundColor = "#fff";       // Latar putih
        item.style.padding = "10px 15px";          // Jarak dalam
        item.style.marginTop = "10px";             // Jarak antar komentar
        item.style.borderRadius = "8px";           // Sudut melengkung
        item.style.border = "1px solid #eee";      // Garis tepi tipis
        item.style.fontSize = "0.95rem";           // Ukuran font
        item.style.color = "#333";                 // Warna teks
        item.style.boxShadow = "0 1px 2px rgba(0,0,0,0.05)"; // Bayangan halus

        // Masukkan ke dalam daftar
        list.appendChild(item); // appendChild: Komentar baru muncul di paling bawah
    });
}

// Load komentar saat halaman pertama kali dibuka (opsional, agar komentar tidak hilang saat refresh)
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.konten_card').forEach(card => {
        tampilkanKomentar(card);
    });
});

// --- FUNGSI LOAD SAVED ARTICLES ---
function loadSavedArticles() {
    const container = document.getElementById('konten_tersimpan');
    if (!container) return; 

    const savedArticles = JSON.parse(localStorage.getItem('savedArticles')) || [];
    container.innerHTML = ''; 

    if (savedArticles.length === 0) {
        container.innerHTML = `<div class="tulis_konten_card" style="text-align: center; padding: 20px;">
            <p>Belum ada artikel yang Anda simpan.</p>
            <a href="artikel_emosional.html" class="btn btn-primary" style="margin-top: 15px;">Cari Artikel</a>
        </div>`;
        return;
    }
    
    savedArticles.forEach(article => {
        container.innerHTML += createCardHTML(article, 'removeSavedArticle', 'Gambar Artikel Disimpan');
    });
}
window.loadSavedArticles = loadSavedArticles;

// --- FUNGSI LOAD LIKED ARTICLES ---
function loadLikedArticles() {
    const container = document.getElementById('konten_disukai');
    if (!container) return;

    const likedArticles = JSON.parse(localStorage.getItem('likedArticles')) || [];
    container.innerHTML = ''; 

    if (likedArticles.length === 0) {
        container.innerHTML = `<div class="tulis_konten_card" style="text-align: center; padding: 20px;">
            <p>Belum ada artikel yang Anda sukai.</p>
            <a href="artikel_emosional.html" class="btn btn-primary" style="margin-top: 15px;">Cari Artikel</a>
        </div>`;
        return;
    }

    likedArticles.forEach(article => {
        container.innerHTML += createCardHTML(article, 'removeLikedArticle', 'Gambar Artikel Disukai');
    });
}
window.loadLikedArticles = loadLikedArticles;

// --- FUNGSI HAPUS UMUM (Tidak perlu diubah) ---
function removeArticle(storageKey, articleIdToRemove, loadFunction) {
    if (!confirm('Apakah Anda yakin ingin menghapus artikel ini dari daftar Anda?')) {
        return;
    }
    
    let articles = JSON.parse(localStorage.getItem(storageKey)) || [];
    articles = articles.filter(article => article.id !== articleIdToRemove);
    localStorage.setItem(storageKey, JSON.stringify(articles));
    window[loadFunction]();
    alert('Artikel berhasil dihapus.');
}
window.removeArticle = removeArticle;

// --- FUNGSI HAPUS TERSIMPAN (Tidak perlu diubah) ---
function removeSavedArticle(articleIdToRemove) {
    removeArticle('savedArticles', articleIdToRemove, 'loadSavedArticles'); 
}
window.removeSavedArticle = removeSavedArticle;

// --- FUNGSI HAPUS DISUKAI (Tidak perlu diubah) ---
function removeLikedArticle(articleIdToRemove) {
    removeArticle('likedArticles', articleIdToRemove, 'loadLikedArticles'); 
}
window.removeLikedArticle = removeLikedArticle; 


// PEMUATAN AWAL: Panggil fungsi initialization dan load 
document.addEventListener('DOMContentLoaded', () => {
    // Dipanggil di artikel_emosional.html untuk mengatur status tombol awal
    if (document.querySelector('.konten_card')) {
        initializeArticleButtons();
    }
    // Dipanggil di artikel_tersimpan.html
    if (document.getElementById('konten_tersimpan')) {
        loadSavedArticles();
    }
    // Dipanggil di artikel_disukai.html
    if (document.getElementById('konten_disukai')) {
        loadLikedArticles();
    }
});