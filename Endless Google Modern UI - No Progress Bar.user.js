// ==UserScript==
// @name            Endless Google Modern UI (No Progress Bar)
// @description     Load more results automatically and endlessly with modern UI and loading animation (no progress bar).
// @author          mansitee
// @namespace       mansitee@gms
// @homepageURL     https://mansitee.github.io
// @supportURL      https://mansitee.github.io
// @icon            https://github.com/tumpio/gmscripts/raw/master/Endless_Google/large.png
// @include         http://www.google.*
// @include         https://www.google.*
// @include         https://encrypted.google.*
// @run-at          document-start
// @version         1.2.0
// @license         MIT
// @noframes
// ==/UserScript==

if (location.href.indexOf("tbm=isch") !== -1) return; // Jangan jalan di pencarian gambar
if (window.top !== window.self) return; // Jangan jalan di iframe

const centerElement = "#center_col";
const loadWindowSize = 1.6;
const filtersAll = ["#foot", "#bottomads"];
const filtersCol = filtersAll.concat(["#extrares", "#imagebox_bigimages"]);
let msg = "";

const modernCSS = `
/* Elemen loading */
.loading-spinner {
    position: fixed;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top: 4px solid #4285f4;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    z-index: 1001;
    display: none;
}

/* Animasi spinner */
@keyframes spin {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
}

/* Nomor halaman */
.page-number {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-family: 'Roboto', sans-serif;
    font-size: 24px;
    font-weight: bold;
    background: linear-gradient(45deg, #1a73e8, #4285f4);
    padding: 8px 16px;
    border-radius: 8px;
    margin: 16px auto;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    animation: fadeIn 0.3s ease-in-out;
}

/* Pesan loading */
.endless-msg {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    background: #4285f4;
    color: #fff;
    font-size: 16px;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    display: none;
}
.endless-msg.shown {
    display: block;
}

/* Fade in animasi */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
`;

let pageNumber = 1;
let prevScrollY = 0;
let nextPageLoading = false;

// Spinner element
const loadingSpinner = document.createElement("div");
loadingSpinner.className = "loading-spinner";
document.body.appendChild(loadingSpinner);

// Menampilkan spinner
function showLoading() {
    loadingSpinner.style.display = "block";
}

// Menyembunyikan spinner
function hideLoading() {
    loadingSpinner.style.display = "none";
}

// Meminta halaman berikutnya
function requestNextPage() {
    nextPageLoading = true;
    showLoading(); // Tampilkan spinner
    let nextPage = new URL(location.href);
    if (!nextPage.searchParams.has("q")) return;

    nextPage.searchParams.set("start", String(pageNumber * 10));
    !msg.classList.contains("shown") && msg.classList.add("shown");
    fetch(nextPage.href)
        .then(response => response.text())
        .then(text => {
            let parser = new DOMParser();
            let htmlDocument = parser.parseFromString(text, "text/html");
            let docElement = htmlDocument.documentElement;
            let content = docElement.querySelector(centerElement);

            content.id = "col_" + pageNumber;
            filter(content, filtersCol);

            content.style.marginLeft = '0';

            let pageMarker = document.createElement("div");
            pageMarker.textContent = String(pageNumber + 1);
            pageMarker.className = "page-number";

            let col = document.createElement("div");
            col.className = "next-col";
            col.appendChild(pageMarker);
            col.appendChild(content);
            document.querySelector(centerElement).appendChild(col);

            if (!content.querySelector("#rso")) {
                window.removeEventListener("scroll", onScrollDocumentEnd);
                nextPageLoading = false;
                msg.classList.contains("shown") && msg.classList.remove("shown");
                hideLoading(); // Sembunyikan spinner
                return;
            }

            pageNumber++;
            nextPageLoading = false;
            msg.classList.contains("shown") && msg.classList.remove("shown");
            hideLoading(); // Sembunyikan spinner
        })
        .catch(() => {
            hideLoading(); // Hilangkan spinner jika ada error
        });
}

function onScrollDocumentEnd() {
    let y = window.scrollY;
    let delta = y - prevScrollY;
    if (!nextPageLoading && delta > 0 && isDocumentEnd(y)) {
        requestNextPage();
    }
    prevScrollY = y;
}

function isDocumentEnd(y) {
    return y + window.innerHeight * loadWindowSize >= document.body.clientHeight;
}

function filter(node, filters) {
    for (let filter of filters) {
        let child = node.querySelector(filter);
        if (child) {
            child.parentNode.removeChild(child);
        }
    }
}

function init() {
    prevScrollY = window.scrollY;
    window.addEventListener("scroll", onScrollDocumentEnd);
    filter(document, filtersAll);

    let style = document.createElement("style");
    style.type = "text/css";
    style.appendChild(document.createTextNode(modernCSS));
    document.head.appendChild(style);

    msg = document.createElement("div");
    msg.setAttribute("class", "endless-msg");
    msg.innerText = "Sedang Memuat...";
    document.body.appendChild(msg);
}

document.addEventListener("DOMContentLoaded", init);