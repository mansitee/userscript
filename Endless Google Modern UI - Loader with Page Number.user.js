// ==UserScript==
// @name            Endless Google Modern UI (Loader with Page Number)
// @description     Load more results automatically with a modern UI. Displays a card loader with bouncing balls in Google logo colors.
// @author          mansitee (modified)
// @namespace       mansitee@gms
// @homepageURL     https://mansitee.github.io
// @supportURL      https://mansitee.github.io
// @icon            https://github.com/tumpio/gmscripts/raw/master/Endless_Google/large.png
// @include         http://www.google.*
// @include         https://www.google.*
// @include         https://encrypted.google.*
// @run-at          document-start
// @version         1.6.2
// @license         MIT
// @noframes
// ==/UserScript==

if (location.href.includes("tbm=isch") || window.top !== window.self) return;

const centerElement = "#center_col";
const loadWindowSize = 1.6;
const filtersAll = ["#foot", "#bottomads"];
const filtersCol = [...filtersAll, "#extrares", "#imagebox_bigimages"];
let pageNumber = 1, nextPageLoading = false;

// CSS untuk loader dengan warna logo Google dan animasi bouncing
const modernCSS = `
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1001;
    display: none; /* Awalnya disembunyikan */
}
.ball {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    margin: 0 10px;
    animation: bounce 1s ease-in-out infinite;
}

/* Warna Google untuk setiap bola */
.ball:nth-child(1) {
    background-color: #4285F4; /* Biru */
    animation-delay: 0s;
}
.ball:nth-child(2) {
    background-color: #EA4335; /* Merah */
    animation-delay: 0.2s;
}
.ball:nth-child(3) {
    background-color: #FBBC04; /* Kuning */
    animation-delay: 0.4s;
}
.ball:nth-child(4) {
    background-color: #34A853; /* Hijau */
    animation-delay: 0.6s;
}

/* Animasi bouncing yang lebih lembut */
@keyframes bounce {
    0%, 100% {
        transform: translateY(0); /* Posisi awal */
    }
    50% {
        transform: translateY(-30px); /* Posisi melompat */
    }
}

/* Prefiks vendor untuk kompatibilitas browser */
@-webkit-keyframes bounce {
    0%, 100% {
        -webkit-transform: translateY(0);
    }
    50% {
        -webkit-transform: translateY(-30px);
    }
}
@-moz-keyframes bounce {
    0%, 100% {
        -moz-transform: translateY(0);
    }
    50% {
        -moz-transform: translateY(-30px);
    }
}
@-o-keyframes bounce {
    0%, 100% {
        -o-transform: translateY(0);
    }
    50% {
        -o-transform: translateY(-30px);
    }
}

.page-number {
    margin-top: 5px;
    color: #555;
    font-size: 20px;
    font-family: Arial, sans-serif;
    font-weight: bold;
    text-align: center;
}
`;

function init() {
    console.log("Inisialisasi dimulai."); // Debug
    window.addEventListener("scroll", onScrollDocumentEnd);
    injectCSS(modernCSS);
    createLoadingUI();
    console.log("Inisialisasi selesai."); // Debug
}

function injectCSS(css) {
    const style = document.createElement("style");
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
    console.log("CSS berhasil disisipkan."); // Debug
}

function createLoadingUI() {
    const loaderWrapper = document.createElement("div");
    loaderWrapper.className = "wrapper";

    const ball1 = document.createElement("div");
    ball1.className = "ball";
    const ball2 = document.createElement("div");
    ball2.className = "ball";
    const ball3 = document.createElement("div");
    ball3.className = "ball";
    const ball4 = document.createElement("div"); // Bola keempat
    ball4.className = "ball";

    loaderWrapper.appendChild(ball1);
    loaderWrapper.appendChild(ball2);
    loaderWrapper.appendChild(ball3);
    loaderWrapper.appendChild(ball4); // Tambahkan bola keempat

    document.body.appendChild(loaderWrapper);
    console.log("Elemen loader dengan 4 bola berhasil ditambahkan."); // Debug
}

function showLoader() {
    const loaderWrapper = document.querySelector(".wrapper");
    if (loaderWrapper) {
        loaderWrapper.style.display = "flex";
        console.log("Loader berhasil ditampilkan."); // Debug
    } else {
        console.log("Elemen loader tidak ditemukan."); // Debug
    }
}

function hideLoader() {
    const loaderWrapper = document.querySelector(".wrapper");
    if (loaderWrapper) {
        loaderWrapper.style.display = "none";
        console.log("Loader disembunyikan."); // Debug
    }
}

function requestNextPage() {
    if (nextPageLoading) return;
    nextPageLoading = true;

    showLoader(); // Tampilkan loader

    const nextPageURL = new URL(location.href);
    nextPageURL.searchParams.set("start", pageNumber * 10);

    fetch(nextPageURL.href).then(res => res.text()).then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const content = doc.querySelector(centerElement);

        if (content) {
            filterElements(content, filtersCol);
            appendContent(content);
            pageNumber++;
        } else {
            window.removeEventListener("scroll", onScrollDocumentEnd);
        }

        nextPageLoading = false;
        hideLoader(); // Sembunyikan loader
    }).catch(() => {
        nextPageLoading = false;
        hideLoader(); // Sembunyikan loader jika terjadi error
    });
}

function filterElements(container, filters) {
    filters.forEach(filter => {
        const element = container.querySelector(filter);
        if (element) element.remove();
    });
}

function appendContent(content) {
    content.style.marginTop = "20px";
    const marker = document.createElement("div");
    marker.className = "page-number";
    marker.textContent = `HALAMAN ${pageNumber + 1}`;
    const container = document.querySelector(centerElement);
    container.appendChild(marker);
    container.appendChild(content);
}

function onScrollDocumentEnd() {
    if (window.scrollY + window.innerHeight * loadWindowSize >= document.body.offsetHeight) {
        requestNextPage();
    }
}

document.addEventListener("DOMContentLoaded", init);