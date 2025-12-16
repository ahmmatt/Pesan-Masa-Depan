document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // DATA SURAT
    // ===============================
    const letters = [
        {
            judul: "Untuk diri ku di masa lalu",
            waktu: "Waktu yang dilalui — hampir 3 tahun",
            isi: "Untuk diriku di masa depan. Apa kabar? Semoga sehat ya diriku...",
            like: 22,
            share: 3
        },
        {
            judul: "Untuk diri ku di masa lalu",
            waktu: "Waktu yang dilalui — 2 tahun",
            isi: "Jika kamu membaca ini, berarti kamu sudah bertahan sejauh ini...",
            like: 15,
            share: 5
        },
        {
            judul: "Untuk diri ku di masa lalu",
            waktu: "Waktu yang dilalui — 1 tahun",
            isi: "Tidak apa-apa berjalan pelan, yang penting tidak berhenti...",
            like: 30,
            share: 7
        }
    ];

    let currentIndex = 0;

    // ===============================
    // ELEMENT
    // ===============================
    const judulSurat = document.getElementById("judulsurat");
    const waktuSurat = document.getElementById("waktusurat");
    const isiSurat = document.getElementById("isisurat");
    const likeCount = document.getElementById("likeCount");
    const shareCount = document.getElementById("shareCount");

    const btnPrev = document.getElementById("btnPrev");
    const btnNext = document.getElementById("btnNext");

    // ===============================
    // FUNGSI RENDER SURAT
    // ===============================
    function renderLetter(index) {
        const letter = letters[index];

        //ganti isi surat
        judulSurat.textContent = letter.judul;
        waktuSurat.textContent = letter.waktu;
        isiSurat.textContent = letter.isi;

        //update index aktif
        currentIndex = index;

       
        //meng-update like, komentar, share sesuai surat
        loadInteraksiSurat(index, letter);

        // Disable tombol
        btnPrev.style.pointerEvents = index === 0 ? "none" : "auto";
        btnPrev.style.opacity = index === 0 ? "0.4" : "1";

        btnNext.style.pointerEvents = index === letters.length - 1 ? "none" : "auto";
        btnNext.style.opacity = index === letters.length - 1 ? "0.4" : "1";
    }

    // ===============================
    // EVENT NAVIGASI
    // ===============================
    btnNext.addEventListener("click", (e) => {
        e.preventDefault();
        if (currentIndex < letters.length - 1) {
            renderLetter(currentIndex + 1);
        }
    });

    btnPrev.addEventListener("click", (e) => {
        e.preventDefault();
        if (currentIndex > 0) {
            renderLetter(currentIndex - 1);
        }
    });

    // ===============================
    // LOAD PERTAMA
    // ===============================
    renderLetter(currentIndex);

});
