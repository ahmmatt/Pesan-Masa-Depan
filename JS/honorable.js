document.addEventListener("DOMContentLoaded", function () {
    const followButtons = document.querySelectorAll(".btn-ikuti");

    followButtons.forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault(); // cegah reload <a href="#">

            if (this.classList.contains("mengikuti")) {
                // unfollow
                this.classList.remove("mengikuti");
                this.classList.remove("btn-secondary");
                this.classList.add("btn-primary");
                this.textContent = "Ikuti";
            } else {
                // follow
                this.classList.add("mengikuti");
                this.classList.remove("btn-primary");
                this.classList.add("btn-secondary");
                this.textContent = "Mengikuti";
            }
        });
    });
});
