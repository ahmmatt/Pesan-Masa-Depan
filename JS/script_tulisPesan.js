    // Ambil elemen-elemen yang dibutuhkan
    const inputTanggal = document.getElementById('tanggal');
    const containerRadio = document.getElementById('container-radio');
    const containerHasil = document.getElementById('tampilan-tanggal-dipilih');
    const teksHasil = document.getElementById('teks-tanggal-hasil');
    const btnReset = document.getElementById('btn-reset-tanggal');
    const radioButtons = document.getElementsByName('waktu');

    // FUNGSI 1: Ketika Tanggal Dipilih
    inputTanggal.addEventListener('change', function() {
        if (this.value) {
            // 1. Format tanggal agar cantik (Contoh: 29 November 2025)
            const dateObj = new Date(this.value);
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            const formattedDate = dateObj.toLocaleDateString('id-ID', options);

            // 2. Masukkan teks ke container hasil
            teksHasil.innerHTML = "Akan dikirim pada: " + formattedDate;

            // 3. Sembunyikan container radio button
            containerRadio.style.display = 'none';

            // 4. Tampilkan container hasil tanggal
            containerHasil.style.display = 'block';

            // 5. Uncheck (matikan) semua pilihan radio button agar tidak double input
            radioButtons.forEach(radio => radio.checked = false);
        }
    });

    // FUNGSI 2: Ketika Tombol "Ganti / Batalkan" ditekan (Logika Sebaliknya)
    btnReset.addEventListener('click', function() {
        // 1. Kosongkan nilai input tanggal
        inputTanggal.value = '';

        // 2. Sembunyikan container hasil tanggal
        containerHasil.style.display = 'none';

        // 3. Tampilkan kembali container radio button
        containerRadio.style.display = 'flex'; // Gunakan flex agar layoutnya kembali seperti semula
    });


    // 1. Ambil elemen h1 berdasarkan ID yang kita buat tadi
    const judulElement = document.getElementById('judul-hari-ini');

    // 2. Dapatkan tanggal hari ini dari sistem komputer user
    const date = new Date();

    // 3. Atur format tanggal agar seperti contoh (Nov 29, 2025)
    // 'en-US' akan menghasilkan format bahasa Inggris (Month dulu)
    // 'short' berarti singkatan bulan (Nov, Dec, Jan)
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('id-ID', options);

    // 4. Masukkan teks gabungan ke dalam h1
    judulElement.textContent = `Pesan Hari Ini - ${formattedDate}`;