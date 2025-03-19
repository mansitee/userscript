// ==UserScript==
// @name            Endless Google Modern UI (Loader with Page Number)
// @description     Load more results automatically with a modern UI. Displays a card loader with a detailed loader inside, loading message, and page number.
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

const modernCSS = `
/* Kartu loader */
@keyframes fadeInFromBelow {
    0% {
        transform: translate(-50%, 50%) scale(0.9); /* Muncul dari bawah */
        opacity: 0; /* Transparan awal */
    }
    100% {
        transform: translate(-50%, -50%) scale(1); /* Berada di posisi akhir */
        opacity: 1; /* Menjadi terlihat */
    }
}

.loader-card {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 50%) scale(0.9); /* Awal di bawah layar */
    background: #fff;
    padding: 20px;
    border-radius: 10%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid #4285f4;
    text-align: center;
    z-index: 1001;
    display: none;
    opacity: 0; /* Awalnya transparan */
    animation: fadeInFromBelow 1s ease-out forwards; /* Animasi muncul dari bawah */
}

.loader-inside {
    width: 50px;
    height: 50px;
    border: 5px solid #f2f2f2;
    border-top: 5px solid #4285f4;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 10px auto;
}

.loading-text {
    margin-top: 10px;
    color: #000;
    font-size: 15px;
    font-family: Arial, sans-serif;
}

.page-number {
    margin-top: 5px;
    color: #4285f4;
    font-size: 20px;
    font-family: Arial, sans-serif;
    font-weight: bold;
    text-align: center;
}

/* Animasi spin */
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
`;

function init() {
    window.addEventListener("scroll", onScrollDocumentEnd);
    injectCSS(modernCSS);
    createLoadingUI();
}

function injectCSS(css) {
    const style = document.createElement("style");
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
}

function createLoadingUI() {
    const loaderCard = document.createElement("div");
    loaderCard.className = "loader-card";

    // Tambahkan elemen loader di dalam kartu
    const loaderInside = document.createElement("div");
    loaderInside.className = "loader-inside"; // Loader animasi
    loaderCard.appendChild(loaderInside);

    const message = document.createElement("div");
    message.className = "loading-text";
    message.textContent = "Sedang memuat ";
    loaderCard.appendChild(message);

    const pageInfo = document.createElement("div");
    pageInfo.className = "page-number";
    pageInfo.textContent = `Halaman ${pageNumber}`;
    loaderCard.appendChild(pageInfo);

    document.body.appendChild(loaderCard);
}

function showLoader() {
    const loaderCard = document.querySelector(".loader-card");
    if (loaderCard) {
        loaderCard.style.display = "block";
        loaderCard.style.animation = "fadeInFromBelow 1s ease-out forwards"; // Jalankan animasi
        const pageInfo = loaderCard.querySelector(".page-number");
        if (pageInfo) pageInfo.textContent = `Halaman ${pageNumber + 1}`;
    }
}

function hideLoader() {
    const loaderCard = document.querySelector(".loader-card");
    if (loaderCard) {
        loaderCard.style.animation = ""; // Reset animasi
        setTimeout(() => {
            loaderCard.style.display = "none"; // Sembunyikan elemen
        }, 1000); // Waktu animasi
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
    marker.textContent = `Page ${pageNumber + 1}`;
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