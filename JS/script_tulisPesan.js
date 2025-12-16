//Bagian Logika Penyembunyian
    const inputTanggal = document.getElementById('tanggal');
    const containerRadio = document.getElementById('container-radio');
    const containerHasil = document.getElementById('tampilan-tanggal-dipilih');
    const teksHasil = document.getElementById('teks-tanggal-hasil');
    const btnReset = document.getElementById('btn-reset-tanggal');
    const radioButtons = document.getElementsByName('waktu');

    // Ketika Tanggal Dipilih
    inputTanggal.addEventListener('change', function() {
        if (this.value) {
            // Format tanggal agar cantik (Contoh: 29 November 2025)
            const dateObj = new Date(this.value);
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            const formattedDate = dateObj.toLocaleDateString('id-ID', options);

            // Masukkan teks ke container hasil
            teksHasil.innerHTML = "Akan dikirim pada: " + formattedDate;

            // Sembunyikan container radio button
            containerRadio.style.display = 'none';

            // Tampilkan container hasil tanggal
            containerHasil.style.display = 'block';

            // Uncheck (matikan) semua pilihan radio button agar tidak double input
            radioButtons.forEach(radio => radio.checked = false);
        }
    });

    // Ketika Tombol "Ganti / Batalkan" ditekan (Logika Sebaliknya)
    btnReset.addEventListener('click', function() {
        // Kosongkan nilai input tanggal
        inputTanggal.value = '';

        // Sembunyikan container hasil tanggal
        containerHasil.style.display = 'none';

        // Tampilkan kembali container radio button
        containerRadio.style.display = 'flex'; // Gunakan flex agar layoutnya kembali seperti semula
    });

// Bagian Tanggal Per Hari Ini
    // elemen h1 berdasarkan ID yang kita buat tadi
    const judulElement = document.getElementById('judul-hari-ini');

    // tanggal hari ini dari sistem komputer user
    const date = new Date();

    // format tanggal agar seperti contoh (Nov 29, 2025)
    // 'short' berarti singkatan bulan (Nov, Dec, Jan)
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('id-ID', options);

    // teks gabungan ke dalam h1
    judulElement.textContent = `Pesan Hari Ini - ${formattedDate}`;

// tambah kata
document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.getElementById("pesan");
    const counterText = document.querySelector(".bawah_menulis p:last-child");

    function hitungKata(teks) {
        return teks
            .trim()
            .split(/\s+/)
            .filter(kata => kata.length > 0).length;
    }

    function updateCounter() {
        const jumlahKata = hitungKata(textarea.value);
        counterText.innerHTML = `${jumlahKata} kata`;
    }

    // Hitung saat halaman pertama kali dibuka
    updateCounter();

    // Hitung setiap kali mengetik
    textarea.addEventListener("input", updateCounter);
});
