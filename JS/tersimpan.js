// --- FUNGSI 1: Menyimpan Artikel ke Local Storage (Dipanggil dari artikel_emosional.html) ---

function simpanArtikel(element) {
    // Cari elemen konten_card terdekat yang menyimpan semua data artikel
    const articleCard = element.closest('.konten_card');
    
    // Ambil data dari data-attribute yang sudah kita tambahkan
    const articleId = articleCard.dataset.articleId || Date.now(); 
    const title = articleCard.dataset.title || 'Judul Tidak Diketahui';
    const author = articleCard.dataset.author || 'Penulis Tidak Diketahui';
    const summary = articleCard.dataset.summary || 'Tidak ada ringkasan.';
    const tags = articleCard.dataset.tags || '';

    const savedArticleData = {
        id: articleId,
        title: title.trim(),
        author: author.trim(),
        summary: summary.trim(),
        tags: tags.trim(),
        timestamp: new Date().toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})
    };

    // Ambil array tersimpan dari Local Storage
    let savedArticles = JSON.parse(localStorage.getItem('savedArticles')) || [];

    // Cek apakah artikel sudah ada
    const isAlreadySaved = savedArticles.some(article => article.id === savedArticleData.id);

    if (!isAlreadySaved) {
        savedArticles.push(savedArticleData);
        localStorage.setItem('savedArticles', JSON.stringify(savedArticles));

        // Feedback visual
        element.innerHTML = '<i class="fas fa-check"></i> Tersimpan!';
        element.style.color = 'green';
        element.onclick = null; // Menonaktifkan klik ulang
        alert(`Artikel "${savedArticleData.title}" berhasil disimpan!`);
    } else {
        alert('Artikel ini sudah tersimpan.');
    }
}

// Tambahkan ke window agar dapat diakses oleh atribut onclick di HTML
window.simpanArtikel = simpanArtikel;


// --- FUNGSI 2: Menampilkan Artikel di Halaman Tersimpan (Dipanggil di artikel_tersimpan.html) ---

function loadSavedArticles() {
    const container = document.getElementById('konten_tersimpan');
    if (!container) return; // Pastikan elemen penampung ada

    const savedArticles = JSON.parse(localStorage.getItem('savedArticles')) || [];

    // Bersihkan kontainer
    container.innerHTML = ''; 

    if (savedArticles.length === 0) {
        // Tampilkan pesan jika kosong
        container.innerHTML = `
            <div class="tulis_konten_card" style="text-align: center; padding: 20px;">
                <p>Belum ada artikel yang Anda simpan.</p>
                <a href="artikel_emosional.html" class="btn btn-primary" style="margin-top: 15px;">Cari Artikel</a>
            </div>
        `;
        return;
    }

    // Iterasi dan buat HTML untuk setiap artikel yang tersimpan
    savedArticles.forEach(article => {
        const articleHTML = `
            <div class="konten_card" data-article-id="${article.id}">
                <div class="header_konten_section">
                    <img src="placeholder_avatar.png" alt="Avatar Penulis" width="40" height="40">
                    <div class="konten_account">
                        <strong>${article.author}</strong> 
                        <small>@user_${article.author.replace(/\s/g, '_').toLowerCase()}</small>
                    </div>
                    <button class="btn btn-secondary" onclick="removeArticle('${article.id}')">Hapus</button> 
                </div>
                
                <div class="main_konten_section">
                    <img src="placeholder_gambar_artikel.png" alt="Gambar Artikel Tersimpan" width="100" height="70">
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
        container.innerHTML += articleHTML;
    });
}


// --- FUNGSI 3: Menghapus Artikel ---

function removeArticle(articleIdToRemove) {
    if (!confirm('Apakah Anda yakin ingin menghapus artikel ini dari daftar tersimpan?')) {
        return;
    }
    
    let savedArticles = JSON.parse(localStorage.getItem('savedArticles')) || [];
    
    // Hapus artikel berdasarkan ID
    savedArticles = savedArticles.filter(article => article.id !== articleIdToRemove);

    // Simpan kembali daftar yang baru
    localStorage.setItem('savedArticles', JSON.stringify(savedArticles));

    // Muat ulang daftar
    loadSavedArticles();
}

// Tambahkan ke window agar dapat diakses oleh atribut onclick di HTML
window.removeArticle = removeArticle;


// Panggil fungsi loadSavedArticles saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('konten_tersimpan')) {
        loadSavedArticles();
    }
});