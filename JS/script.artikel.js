// bagian ikon+
const btnUpload = document.getElementById("btnUpload");
const fileInput = document.getElementById("upload_file");
const fileName = document.getElementById("fileName");

btnUpload.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", () => {
    fileName.textContent = fileInput.files[0]?.name || "";
});


// edit
document.addEventListener("DOMContentLoaded", () => {

    const profile = document.querySelector(".user_profile");
    const btnEdit = document.getElementById("btnEditProfile");

    const nameEl = profile.querySelector(".profile_name strong");
    const usernameEl = profile.querySelector(".profile_name small");
    const descEl = profile.querySelector(".profile-dec"); // FIX CLASS

    let isEdit = false;

    btnEdit.addEventListener("click", () => {

        if (!isEdit) {
            profile.classList.add("edit-mode");

            const name = nameEl.innerText;
            const username = usernameEl.innerText.replace("@", "");
            const desc = descEl.innerText;

            nameEl.innerHTML = `<input type="text" id="editName" value="${name}">`;
            usernameEl.innerHTML = `<input type="text" id="editUsername" value="${username}">`;
            descEl.innerHTML = `<textarea id="editDesc">${desc}</textarea>`;

            btnEdit.innerText = "Simpan";
            isEdit = true;

        } else {
            const newName = document.getElementById("editName").value;
            const newUsername = document.getElementById("editUsername").value;
            const newDesc = document.getElementById("editDesc").value;

            nameEl.innerText = newName;
            usernameEl.innerText = "@" + newUsername;
            descEl.innerText = newDesc;

            profile.classList.remove("edit-mode");
            btnEdit.innerText = "edit";
            isEdit = false;
        }
    });
});

// Variable untuk menyimpan tab yang sedang aktif
let currentTab = 'untukmu';

// FUNGSI Logika Tombol Ikuti/Mengikuti
function toggleFollow(btn) {
    const isFollowing = btn.classList.contains('btn-mengikuti');

    if (isFollowing) {
        // Unfollow
        btn.textContent = "Ikuti";
        btn.classList.remove('btn-mengikuti');
        btn.classList.add('btn-primary');
    } else {
        // Follow
        btn.textContent = "Mengikuti";
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-mengikuti');
    }

    // Jika user sedang di tab 'Mengikuti' dan melakukan unfollow,
    // refresh tab agar kartu langsung hilang
    if (currentTab === 'mengikuti') {
        filterTab('mengikuti');
    }
}

// FUNGSI Logika Pindah Tab & Filter Konten
function filterTab(tabName) {
    currentTab = tabName; 

    // Atur Visual Tab (Garis Biru)
    const tabUntukmu = document.getElementById('tabUntukmu');
    const tabMengikuti = document.getElementById('tabMengikuti');

    if (tabName === 'untukmu') {
        tabUntukmu.classList.add('active');
        tabMengikuti.classList.remove('active');
    } else {
        tabMengikuti.classList.add('active');
        tabUntukmu.classList.remove('active');
    }

    // Filter Kartu
    const allSections = document.querySelectorAll('.konten_section');

    allSections.forEach(section => {
        // Cari tombol ikuti DI DALAM section ini
        const btn = section.querySelector('.btn-ikuti');
        
        if (tabName === 'untukmu') {
            // Tab Untukmu: Tampilkan SEMUA
            section.style.display = 'block';
        } 
        else if (tabName === 'mengikuti') {
            // Tab Mengikuti:
            // Cek apakah tombol ada DAN memiliki class 'btn-mengikuti'
            if (btn && btn.classList.contains('btn-mengikuti')) {
                section.style.display = 'block'; 
            } else {
                section.style.display = 'none'; 
            }
        }
    });
}


