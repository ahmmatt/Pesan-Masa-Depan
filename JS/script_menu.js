document.addEventListener("DOMContentLoaded", () => {
    const emojis = document.querySelectorAll("#pilih_emotikon img");
    const motivasi = document.getElementById("motivasiSection");
    const emojiBox = document.getElementById("emojiDisplay");
    const judul = document.getElementById("judulMotivasi");
    const isi = document.getElementById("isimotivasi");
    const tag1 = document.getElementById("tag1");
    const tag2 = document.getElementById("tag2");

    emojis.forEach(emoji => {
        emoji.addEventListener("click", () => {

            // kalau sedang tampil DAN emoji yg sama diklik → sembunyikan
            if (motivasi.classList.contains("active") &&
                emojiBox.querySelector("img")?.src === emoji.src) {

                motivasi.classList.remove("active");
                emojiBox.innerHTML = "";
                return;
            }

            // tampilkan section motivasi
            motivasi.classList.add("active");

            // ganti emoji
            emojiBox.innerHTML = "";
            const img = document.createElement("img");
            img.src = emoji.src;
            img.alt = "emoji";
            emojiBox.appendChild(img);

            // ganti teks motivasi
            judul.textContent = emoji.dataset.judul;
            isi.textContent = emoji.dataset.isi;
            tag1.textContent = emoji.dataset.tag1;
            tag2.textContent = emoji.dataset.tag2;

        });
    });
});

// ===============================
// LIKE, KOMENTAR, SHARE (PER SURAT)
// ===============================
document.addEventListener("DOMContentLoaded", () => {

  /* ========= LIKE ========= */
  const likeBtn = document.getElementById("btnLike");
  const likeCount = document.getElementById("likeCount");

  const likeKey = i => `surat_${i}_liked`;
  const likeCountKey = i => `surat_${i}_like_count`;

  function loadLike(index, defaultCount = 0) {
    const liked = localStorage.getItem(likeKey(index)) === "true";
    const count =
      Number(localStorage.getItem(likeCountKey(index))) || defaultCount;

    likeBtn.classList.toggle("active", liked);
    likeCount.textContent = count;
  }

  likeBtn.addEventListener("click", e => {
    e.preventDefault();

    let liked = localStorage.getItem(likeKey(currentIndex)) === "true";
    let count = Number(likeCount.textContent);

    liked = !liked;
    count += liked ? 1 : -1;

    localStorage.setItem(likeKey(currentIndex), liked);
    localStorage.setItem(likeCountKey(currentIndex), count);

    likeBtn.classList.toggle("active", liked);
    likeCount.textContent = count;
  });

  /* ========= SHARE (1x + UNSHARE | PER SURAT) ========= */
const shareBtn = document.getElementById("btnShare");
const shareCount = document.getElementById("shareCount");

const shareKey = i => `surat_${i}_shared`;
const shareCountKey = i => `surat_${i}_share_count`;

function loadShare(index, defaultCount = 0) {
    const shared = localStorage.getItem(shareKey(index)) === "true";
    const count =
        Number(localStorage.getItem(shareCountKey(index))) || defaultCount;

    shareBtn.classList.toggle("active", shared);
    shareCount.textContent = count;
}

shareBtn.addEventListener("click", e => {
    e.preventDefault();

    let shared = localStorage.getItem(shareKey(currentIndex)) === "true";
    let count = Number(shareCount.textContent);

    shared = !shared;
    count += shared ? 1 : -1;

    localStorage.setItem(shareKey(currentIndex), shared);
    localStorage.setItem(shareCountKey(currentIndex), count);

    shareBtn.classList.toggle("active", shared);
    shareCount.textContent = count;
});


  /* ========= KOMENTAR ========= */
  const commentBtn = document.getElementById("btnComment");
  const commentSection = document.getElementById("commentSection");
  const commentInput = document.getElementById("commentInput");
  const submitComment = document.getElementById("submitComment");
  const commentList = document.getElementById("commentList");

  const commentKey = i => `surat_${i}_comments`;

  commentBtn.addEventListener("click", e => {
    e.preventDefault();
    commentSection.style.display =
      commentSection.style.display === "none" ? "block" : "none";
  });

  function loadKomentar(index) {
    const comments = JSON.parse(
      localStorage.getItem(commentKey(index)) || "[]"
    );

    commentList.innerHTML = "";
    comments.forEach(text => {
      const li = document.createElement("li");
      li.textContent = text;
      commentList.appendChild(li);
    });
  }

  submitComment.addEventListener("click", () => {
    const text = commentInput.value.trim();
    if (!text) return;

    const comments = JSON.parse(
      localStorage.getItem(commentKey(currentIndex)) || "[]"
    );

    comments.push(text);
    localStorage.setItem(
      commentKey(currentIndex),
      JSON.stringify(comments)
    );

    commentInput.value = "";
    loadKomentar(currentIndex);
  });

  /* ========= DIPANGGIL SAAT GANTI SURAT ========= */
  window.loadInteraksiSurat = function (index, data) {
    currentIndex = index;
    loadLike(index, data.like);
    loadShare(index, data.share);
    loadKomentar(index);
  };

});

//Ikuti 
document.addEventListener("DOMContentLoaded", () => {

  const followButtons = document.querySelectorAll(".btn-follow");

  followButtons.forEach(btn => {
    const userId = btn.dataset.user;
    const key = "follow_" + userId;

    let isFollowing = localStorage.getItem(key) === "true";

    function render() {
      if (isFollowing) {
        btn.textContent = "Mengikuti";
        btn.classList.add("following");
      } else {
        btn.textContent = "Ikuti";
        btn.classList.remove("following");
      }
    }

    btn.addEventListener("mouseleave", () => {
      render();
    });

    // klik: toggle follow / unfollow
    btn.addEventListener("click", () => {
      isFollowing = !isFollowing;
      localStorage.setItem(key, isFollowing);
      render();
    });

    render();
  });

});
