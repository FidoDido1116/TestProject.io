
/* PERSONALISATION */

const birthdayPerson = "My Dinosue";

document.getElementById("heroName").textContent =
    birthdayPerson;


/* PHOTO GALLERY */

const photos = [
    {
        src: "images/Photo1.jpeg",
        caption: "One of my fav picture of you"
    },
    {
        src: "images/Photo2.jpeg",
        caption: "One of my favourite days with you bcs I look good in this picture xD"
    },
    {
        src: "images/Photo3.jpeg",
        caption: "More memories waiting to happen"
    }
];

let currentPhoto = 0;

const galleryImage =
    document.getElementById("galleryImage");

const photoCaption =
    document.getElementById("photoCaption");

const photoCount =
    document.getElementById("photoCount");

const dotsContainer =
    document.getElementById("galleryDots");


function showPhoto(index) {

    currentPhoto =
        (index + photos.length) % photos.length;

    galleryImage.src = photos[currentPhoto].src;

    galleryImage.alt =
        photos[currentPhoto].caption;

    photoCaption.textContent =
        photos[currentPhoto].caption;

    photoCount.textContent =
        `${String(currentPhoto + 1).padStart(2, "0")} / ${String(photos.length).padStart(2, "0")}`;

    [...dotsContainer.children].forEach((dot, i) => {
        dot.classList.toggle("active", i === currentPhoto);
    });
}


// Create gallery navigation dots

photos.forEach((photo, index) => {

    const dot = document.createElement("button");

    dot.type = "button";

    dot.setAttribute(
        "aria-label",
        `Show photo ${index + 1}`
    );

    dot.addEventListener("click", () => {
        showPhoto(index);
    });

    dotsContainer.appendChild(dot);

});

document.getElementById("prevPhoto")
    .addEventListener("click", () => {
        showPhoto(currentPhoto - 1);
    });

document.getElementById("nextPhoto")
    .addEventListener("click", () => {
        showPhoto(currentPhoto + 1);
    });

showPhoto(0);


/* BLOW OUT BIRTHDAY CANDLES */

document.getElementById("blowButton")
    .addEventListener("click", () => {

        document.getElementById("candles")
            .classList.add("blown");

        document.getElementById("wishMessage")
            .textContent =
            "May every beautiful wish find its way to you. Happy birthday! 💗";

        launchConfetti(130);

    });


/* SECRET BIRTHDAY LETTER */

const letterButton =
    document.getElementById("openLetter");

const letterPaper =
    document.getElementById("letterPaper");


letterButton.addEventListener("click", () => {

    const opening = letterPaper.hidden;

    letterPaper.hidden = !opening;

    letterButton.querySelector(".envelope-hint")
        .textContent =
        opening ? "Tap to close" : "Tap to open";

    if (opening) {

        letterPaper.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }

});


/* BACKGROUND MUSIC */

const music =
    document.getElementById("birthdayMusic");

const musicButton =
    document.getElementById("musicButton");


musicButton.addEventListener("click", async () => {

    try {

        if (music.paused) {

            await music.play();

            musicButton.classList.add("playing");

            musicButton.setAttribute(
                "aria-pressed",
                "true"
            );

            document.getElementById("musicLabel")
                .textContent = "Pause our song";

        } else {

            music.pause();

            musicButton.classList.remove("playing");

            musicButton.setAttribute(
                "aria-pressed",
                "false"
            );

            document.getElementById("musicLabel")
                .textContent = "Play our song";

        }

    } catch (error) {

        alert(
            "Add your music file at music/birthday-song.mp3, then try again."
        );

    }

});


/* CONFETTI AND FIREWORKS */

const canvas =
    document.getElementById("celebrationCanvas");

const ctx = canvas.getContext("2d");

let particles = [];

let animationRunning = false;


function resizeCanvas() {

    const ratio =
        window.devicePixelRatio || 1;

    canvas.width =
        window.innerWidth * ratio;

    canvas.height =
        window.innerHeight * ratio;

    ctx.setTransform(
        ratio, 0, 0, ratio, 0, 0
    );

}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();


/* CONFETTI EFFECT */

function launchConfetti(amount = 100) {

    const colors = [
        "#e98cae",
        "#ffd166",
        "#b8e0d2",
        "#cdb4db",
        "#ffafcc",
        "#ffffff"
    ];

    for (let i = 0; i < amount; i++) {

        particles.push({

            x: Math.random() * window.innerWidth,

            y: -20 -
                Math.random() * window.innerHeight * .4,

            vx: (Math.random() - .5) * 5,

            vy: 2 + Math.random() * 5,

            size: 4 + Math.random() * 6,

            rotation: Math.random() * 6,

            spin: (Math.random() - .5) * .2,

            color: colors[
                Math.floor(Math.random() * colors.length)
            ],

            life: 130 + Math.random() * 80,

            shape: Math.random() > .5
                ? "rect"
                : "circle"

        });

    }

    runAnimation();

}


/* FIREWORKS EFFECT */

function launchFireworks() {

    const colors = [
        "#e98cae",
        "#ffd166",
        "#cdb4db",
        "#ffffff",
        "#ff8fab"
    ];

    for (let burst = 0; burst < 5; burst++) {

        const cx =
            window.innerWidth * (.15 + Math.random() * .7);

        const cy =
            window.innerHeight * (.15 + Math.random() * .45);

        for (let i = 0; i < 38; i++) {

            const angle =
                (Math.PI * 2 * i) / 38;

            const speed =
                1.5 + Math.random() * 4;

            particles.push({

                x: cx,

                y: cy,

                vx: Math.cos(angle) * speed,

                vy: Math.sin(angle) * speed,

                size: 2 + Math.random() * 3,

                color: colors[
                    Math.floor(Math.random() * colors.length)
                ],

                life: 55 + Math.random() * 35,

                shape: "circle",

                gravity: .035

            });

        }

    }

    runAnimation();

}


/* ANIMATION ENGINE */

function runAnimation() {

    if (animationRunning) return;

    animationRunning = true;

    function frame() {

        ctx.clearRect(
            0,
            0,
            window.innerWidth,
            window.innerHeight
        );

        particles = particles.filter(p =>
            p.life > 0 &&
            p.y < window.innerHeight + 40
        );

        particles.forEach(p => {

            p.x += p.vx;

            p.y += p.vy;

            p.vy += p.gravity || .035;

            p.rotation =
                (p.rotation || 0) + (p.spin || .04);

            p.life--;

            ctx.save();

            ctx.translate(p.x, p.y);

            ctx.rotate(p.rotation);

            ctx.fillStyle = p.color;

            if (p.shape === "rect") {

                ctx.fillRect(
                    -p.size / 2,
                    -p.size / 2,
                    p.size,
                    p.size * 1.7
                );

            } else {

                ctx.beginPath();

                ctx.arc(
                    0,
                    0,
                    p.size,
                    0,
                    Math.PI * 2
                );

                ctx.fill();

            }

            ctx.restore();

        });

        if (particles.length) {

            requestAnimationFrame(frame);

        } else {

            ctx.clearRect(
                0,
                0,
                window.innerWidth,
                window.innerHeight
            );

            animationRunning = false;

        }

    }

    requestAnimationFrame(frame);

}


/* FINAL CELEBRATION BUTTON */

document.getElementById("celebrateButton")
    .addEventListener("click", () => {

        launchConfetti(220);

        launchFireworks();

    });


/* FLOATING HEARTS */

const heartLayer =
    document.querySelector(".floating-hearts");


function addFloatingHeart() {

    const heart =
        document.createElement("span");

    heart.className = "float-heart";

    heart.textContent =
        Math.random() > .5 ? "♡" : "♥";

    heart.style.left =
        `${Math.random() * 100}%`;

    heart.style.fontSize =
        `${12 + Math.random() * 20}px`;

    heart.style.animationDuration =
        `${8 + Math.random() * 8}s`;

    heartLayer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 17000);

}


// Initial floating hearts

for (let i = 0; i < 12; i++) {

    setTimeout(addFloatingHeart, i * 450);

}


// Continuously create floating hearts

setInterval(addFloatingHeart, 1300);
