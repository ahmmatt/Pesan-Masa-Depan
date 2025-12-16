document.addEventListener("DOMContentLoaded", () => {

  const tabUntukmu = document.getElementById("tabUntukmu");
  const tabMengikuti = document.getElementById("tabMengikuti");
  const semuaKonten = document.querySelectorAll(".konten_section");
  const followButtons = document.querySelectorAll(".btn-ikuti");

  let following = JSON.parse(localStorage.getItem("following")) || [];

  // =========================
  // INIT BUTTON STATE
  // =========================
  followButtons.forEach(btn => {
    const card = btn.closest(".konten_card");
    const user = card.dataset.user;

    if (following.includes(user)) {
      setFollowing(btn, true);
    }

    btn.addEventListener("click", () => {
      if (following.includes(user)) {
        // UNFOLLOW
        following = following.filter(u => u !== user);
        setFollowing(btn, false);
      } else {
        // FOLLOW
        following.push(user);
        setFollowing(btn, true);
      }

      localStorage.setItem("following", JSON.stringify(following));
    });
  });

  // =========================
  // TAB UNTUKMU
  // =========================
  tabUntukmu.addEventListener("click", (e) => {
    e.preventDefault();

    tabUntukmu.classList.add("active");
    tabMengikuti.classList.remove("active");

    semuaKonten.forEach(k => k.style.display = "block");
  });

  // =========================
  // TAB MENGIKUTI
  // =========================
  tabMengikuti.addEventListener("click", (e) => {
    e.preventDefault();

    tabMengikuti.classList.add("active");
    tabUntukmu.classList.remove("active");

    semuaKonten.forEach(section => {
      const card = section.querySelector(".konten_card");
      const user = card?.dataset.user;

      if (following.includes(user)) {
        section.style.display = "block";
      } else {
        section.style.display = "none";
      }
    });
  });

});

// =========================
// HELPER
// =========================
function setFollowing(btn, isFollowing) {
  if (isFollowing) {
    btn.textContent = "Mengikuti";
    btn.classList.add("mengikuti");
  } else {
    btn.textContent = "Ikuti";
    btn.classList.remove("mengikuti");
  }
}
/* =================================================
   MENAMPILKAN AKUN DI TAB MENGIKUTI
   (CLONE DARI PANEL REKOMENDASI)
   ================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const kontenMengikuti = document.getElementById("kontenMengikuti");

    // Ambil data dari localStorage
    const followingUsers = JSON.parse(localStorage.getItem("followingUsers")) || [];

    function buatItemMengikuti(account) {
        const nama = account.querySelector(".account_name strong").innerText;
        const username = account.querySelector(".account_name small").innerText;
        const avatar = account.querySelector("img").src;

        const div = document.createElement("div");
        div.className = "konten_card";

        div.innerHTML = `
            <div class="header_konten_section">
                <img src="${avatar}" width="40" height="40">
                <div class="konten_account">
                    <strong>${nama}</strong>
                    <small>${username}</small>
                </div>
            </div>
            <p style="font-size:0.9rem;color:#666">
                Kamu mengikuti ${nama}
            </p>
        `;

        return div;
    }

    // Render saat load (refresh)
    document.querySelectorAll(".recommend_account").forEach(account => {
        const user = account.dataset.user;

        if (followingUsers.includes(user)) {
            const item = buatItemMengikuti(account);
            kontenMengikuti.appendChild(item);
        }
    });

    // Render saat klik Ikuti
    document.addEventListener("click", (e) => {

        if (e.target.tagName === "BUTTON" && e.target.textContent.trim() === "Mengikuti") {

            const account = e.target.closest(".recommend_account");
            if (!account) return;

            const item = buatItemMengikuti(account);
            kontenMengikuti.appendChild(item);
        }
    });

});
