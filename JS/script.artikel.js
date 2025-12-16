// bagian ikon+
const btnUpload = document.getElementById("btnUpload");
const fileInput = document.getElementById("upload_file");
const fileName = document.getElementById("fileName");

btnUpload.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", () => {
    fileName.textContent = fileInput.files[0]?.name || "";
});

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
            usernameEl.innerHTML = `@<input type="text" id="editUsername" value="${username}">`;
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

/// rekomendasi
document.addEventListener("DOMContentLoaded", () => {

    const rekomendasi = document.getElementById("rekomendasi");
    const kontenMengikuti = document.getElementById("kontenMengikuti");
    const kontenUntukmu = document.getElementById("kontenUntukmu");

    // TAB (link / tombol tab)
    const tabUntukmu = document.querySelector('[data-tab="untukmu"]');
    const tabMengikuti = document.querySelector('[data-tab="mengikuti"]');

    rekomendasi.addEventListener("click", (e) => {

        if (e.target.tagName === "BUTTON" && e.target.textContent === "Ikuti") {

            const account = e.target.closest(".recommend_account");
            const username = account.dataset.user;

            //Ubah tombol
            e.target.textContent = "Mengikuti";
            e.target.disabled = true;
            e.target.classList.remove("btn-primary");
            e.target.classList.add("btn-secondary");

            //Pindahkan akun ke tab Mengikuti
            kontenMengikuti.appendChild(account);

            //TAMPILKAN TAB MENGIKUTI (BUKAN UNTUKMU)
            kontenUntukmu.style.display = "none";
            kontenMengikuti.style.display = "block";

            //AKTIFKAN TAB "Mengikuti"
            tabUntukmu?.classList.remove("active");
            tabMengikuti?.classList.add("active");

            console.log(`Sekarang mengikuti ${username}`);
        }
    });

});

