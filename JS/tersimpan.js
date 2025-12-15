// FUNGSI UTAMA: MENGAMBIL DAN MEMBUAT DATA ARTIKEL DARI KARTU HTML ---
function getArticleData(element) {
    const articleCard = element.closest('.konten_card');
    // Pastikan semua data diambil dengan fallback yang aman
    return {
        id: articleCard.dataset.articleId || Date.now(), 
        title: articleCard.dataset.title || 'Judul Tidak Diketahui',
        author: articleCard.dataset.author || 'Penulis Tidak Diketahui',
        summary: articleCard.dataset.summary || 'Tidak ada ringkasan.',
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
        element.innerHTML = '<i class="fas fa-check"></i> Tersimpan!';
        element.style.color = 'green';
        element.onclick = null; 
        alert(`Artikel "${savedArticleData.title}" berhasil disimpan!`);
    } else {
        alert('Artikel ini sudah tersimpan.');
    }
}
window.simpanArtikel = simpanArtikel;


// =================================================================
// === FUNGSI UTAMA: SUKA (Disukai) ===============================
// =================================================================

function sukaiArtikel(element) {
    const likedArticleData = getArticleData(element);
    let likedArticles = JSON.parse(localStorage.getItem('likedArticles')) || [];
    const isAlreadyLiked = likedArticles.some(article => article.id === likedArticleData.id);

    if (!isAlreadyLiked) {
        likedArticles.push(likedArticleData);
        localStorage.setItem('likedArticles', JSON.stringify(likedArticles));
        
        // Feedback visual di halaman artikel_emosional.html
        element.innerHTML = '<i class="fas fa-heart" style="color: red;"></i> Disukai!';
        element.onclick = null; 
        alert(`Anda menyukai artikel "${likedArticleData.title}"!`);
    } else {
        alert('Artikel ini sudah disukai.');
    }
}
window.sukaiArtikel = sukaiArtikel; 

//FUNGSI BARU: Memastikan Tombol Konsisten Saat Halaman Dimuat
function initializeArticleButtons() {
    const savedArticles = JSON.parse(localStorage.getItem('savedArticles')) || [];
    const likedArticles = JSON.parse(localStorage.getItem('likedArticles')) || [];

    // Dapatkan semua tombol 'Simpan' dan 'Suka'
    const articleCards = document.querySelectorAll('.konten_card');

    articleCards.forEach(card => {
        const articleId = card.dataset.articleId;

        if (articleId) {
            // 1. Cek Status Simpan
            const saveButton = card.querySelector('.btn-simpan');
            const isSaved = savedArticles.some(article => article.id === articleId);
            
            if (isSaved && saveButton) {
                saveButton.innerHTML = '<i class="fas fa-check"></i> Tersimpan!';
                saveButton.style.color = 'green';
                saveButton.onclick = null;
            }

            // 2. Cek Status Suka
            const likeButton = card.querySelector('.btn-like');
            const isLiked = likedArticles.some(article => article.id === articleId);

            if (isLiked && likeButton) {
                likeButton.innerHTML = '<i class="fas fa-heart" style="color: red;"></i> Disukai!';
                // Kami tidak menonaktifkan onclick di sini karena mungkin pengguna ingin batal suka (jika fungsionalitasnya ada)
            }
        }
    });
}


// =================================================================
// === FUNGSI LOAD (Untuk Halaman Tersimpan & Disukai) =============
// =================================================================

// --- Bantuan untuk membuat HTML Card (Tidak perlu diubah) ---
function createCardHTML(article, removeFunction, imageAltText) {
    return `
        <div class="konten_card" data-article-id="${article.id}">
            <div class="header_konten_section">
                <img src="placeholder_avatar.png" alt="Avatar Penulis" width="40" height="40">
                <div class="konten_account">
                    <strong>${article.author}</strong> 
                    <small>@user_${article.author.replace(/\s/g, '_').toLowerCase()}</small>
                </div>
                <button class="btn btn-secondary" onclick="${removeFunction}('${article.id}')">Hapus</button> 
            </div>
            
            <div class="main_konten_section">
                <img src="placeholder_gambar_artikel.png" alt="${imageAltText}" width="100" height="70">
                <h3>${article.title}</h3>
                <p>${article.summary}</p>
                
                <small>${article.tags}</small><br>
                <small>Disimpan: ${article.timestamp}</small>
            </div>
            
            <hr>
            <div class="footer_konten_section"> 
                <a href="artikel_emosional.html"><button class="btn btn-primary">Baca Artikel</button></a>
            </div>
        </div>
    `;
}

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
            <a href="artikel_emosional.html" class="btn btn-primary" style="margin-top: 15px;">Cari Artikel Emosional</a>
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