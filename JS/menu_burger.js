document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks && navbar) {
        hamburger.addEventListener('click', () => {
            // 1. Mengaktifkan Burger Icon menjadi 'X'
            hamburger.classList.toggle('is-active');

            // 2. Mengaktifkan Menu Navigasi
            navLinks.classList.toggle('is-open');

            // 3. Menambahkan class ke navbar untuk efek (misalnya: fixed background)
            navbar.classList.toggle('menu-open');
        });
        
        // Opsional: Tutup menu saat link diklik (untuk pengalaman seluler yang lebih baik)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('is-active');
                navLinks.classList.remove('is-open');
                navbar.classList.remove('menu-open');
            });
        });
    }
});