// ==UserScript==
// @name            Endless Google Modern UI (Loader Centered with Message)
// @description     Load more results automatically with optimized modern UI and centered loading animation with message.
// @author          mansitee (modified)
// @namespace       mansitee@gms
// @homepageURL     https://mansitee.github.io
// @supportURL      https://mansitee.github.io
// @icon            https://github.com/tumpio/gmscripts/raw/master/Endless_Google/large.png
// @include         http://www.google.*
// @include         https://www.google.*
// @include         https://encrypted.google.*
// @run-at          document-start
// @version         1.4.0
// @license         MIT
// @noframes
// ==/UserScript==

if (location.href.includes("tbm=isch") || window.top !== window.self) return;

const centerElement = "#center_col";
const loadWindowSize = 1.6;
const filtersAll = ["#foot", "#bottomads"];
const filtersCol = [...filtersAll, "#extrares", "#imagebox_bigimages"];
let pageNumber = 1, prevScrollY = 0, nextPageLoading = false;

const modernCSS = `
/* Elemen loading */
.loading-spinner {
    position: fixed;
    top: 50%;
    left: 43%;
    transform: translateX(-50%);
    width: 36px;
    height: 36px;
    border: 3px solid #f2f2f2;
    border-top: 3px solid #4285f4;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    z-index: 1000;
}

.loading-text {
    position: fixed;
    top: 60%; /* Posisi teks di bawah spinner */
    left: 50%;
    transform: translateX(-50%);
    color: #000;
    font-size: 14px;
    font-family: Arial, sans-serif;
    background: rgba(255, 255, 255, 1.8); /* Warna latar teks */
    padding: 5px 10px;
    border-radius: 5px;
    text-align: center;
    z-index: 1001;
}

/* Animasi spinner */
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.page-number{display:none;}
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
    const spinner = document.createElement("div");
    spinner.className = "loading-spinner";
    document.body.appendChild(spinner);

    const message = document.createElement("div");
    message.className = "loading-text";
    message.textContent = "Sedang memuat halaman...";
    document.body.appendChild(message);
}

function requestNextPage() {
    if (nextPageLoading) return;
    nextPageLoading = true;

    document.querySelector(".loading-spinner").style.display = "block";
    document.querySelector(".loading-text").style.display = "block";

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
        document.querySelector(".loading-spinner").style.display = "none";
        document.querySelector(".loading-text").style.display = "none";
    }).catch(() => {
        nextPageLoading = false;
        document.querySelector(".loading-spinner").style.display = "none";
        document.querySelector(".loading-text").style.display = "none";
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