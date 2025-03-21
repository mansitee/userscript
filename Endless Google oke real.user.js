// ==UserScript==
// @name            Endless Google oke real
// @description     Load more results automatically and endlessly.
// @author          mansitee
// @namespace       mansitee@gms
// @homepageURL     https://mansitee.github.io
// @supportURL      https://mansitee.github.io
// @icon            https://github.com/tumpio/gmscripts/raw/master/Endless_Google/large.png
// @include         http://www.google.*
// @include         https://www.google.*
// @include         https://encrypted.google.*
// @run-at          document-start
// @version         0.0.8
// @license         MIT
// @noframes
// ==/UserScript==

if (location.href.indexOf("tbm=isch") !== -1) // NOTE: Don't run on image search
    return;
if (window.top !== window.self) // NOTE: Do not run on iframes
    return;

const centerElement = "#center_col";
const loadWindowSize = 1.6;
const filtersAll = ["#foot", "#bottomads"];
const filtersCol = filtersAll.concat(["#extrares", "#imagebox_bigimages"]);
let   msg = "";

const css = `
.page-number{position:relative;
display:flex;justify-content: center;align-items:center; 
flex-direction:row-reverse;
background: linear-gradient(to right, #4285f4, #d96570);
-webkit-background-clip:text; -webkit-text-fill-color:transparent;color:transparent;text-align:center;font-size:28px;font-weight:600;font-family:'Poppins', sans-serif; padding:10px 5px; margin-bottom:0.4em;left:50%;transform:translateX(-50%);border:none;}


.page-number::before{content: "#Penelusuran";tdisplay: block;
background: linear-gradient(to right, #4285f4, #d96570);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
tcolor:transparent;
font-size:17px;text-align: center;border-radius:10px;padding:5px 5px;margin:0.1em 0.4em;overflow:hidden;position:relative;}

.page-number::after{content: "🌍Halaman ";font-size:17px;
border-radius:10px;padding:5px 5px;
margin:0.1em 0.4em;white-space: nowrap;}



@keyframes beforeEffect {
0% {content:"⏳";color:#4382EC;
    transform:scale(1);}
50% {content:"⌛";color:#6FA1F2;
    transform:scale(1.2);}
100% {content:"⏳";color: #4382EC;transform:scale(1);} }

.endless-msg::before {content: "⏳";font-size:22px;animation: beforeEffect 2s infinite;}

.endless-msg{position:fixed;bottom:30px;left:0;right:0;twidth:100%;width: fit-content;margin:0 auto; background-color:#fff;color:#4382EC;font-size:20px;padding:10px;text-align:center;display:none; border-radius:14px;box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04); animation:slideIn 0.5s; }

.endless-msg.shown {display:block;}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; } }
.next-col{animation:slideIn 1s;}

@keyframes slideIn {
  from {transform:translateY(50px); opacity: 0; }
  to {transform:translateY(0); opacity:1;} }
`;

let pageNumber = 1;
let prevScrollY = 0;
let nextPageLoading = false;

function requestNextPage() {
    nextPageLoading = true;
    let nextPage = new URL(location.href);
    if (!nextPage.searchParams.has("q")) return;

    nextPage.searchParams.set("start", String(pageNumber * 10));
    !msg.classList.contains("shown") && msg.classList.add("shown");
    fetch(nextPage.href)
.then(response => response.text())
.then(text => {let parser = new DOMParser();
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

            // Set images source address
            try {
                let thumbnails = text.match(/google\.ldi=({.+?})/);
                let thumbnailsObj = JSON.parse(thumbnails && thumbnails[1]);
                for (let id in thumbnailsObj) {
                    docElement.querySelector("#"+id).src = unescapeHex(thumbnailsObj[id]);
                }
            } catch(e) {}

            function setImagesSrc({id}) {
                let pattern = new RegExp("var\\ss='(\\S+)';var\\sii=\\[[a-z0-9_',]*?'"+id+"'[a-z0-9_',]*?\\];");
                let imageSource = text.match(pattern);
                if (imageSource != null && imageSource[1]) {
                    docElement.querySelector("#"+id).src = unescapeHex(imageSource[1]);
                }
            }
            docElement.querySelectorAll('g-img > img[id]').forEach(setImagesSrc);
            docElement.querySelectorAll('div > img[id^=dimg_]').forEach(setImagesSrc);

            docElement.querySelectorAll('img[data-src]').forEach((img) => {
                img.src = img.dataset.src;
                img.style.visibility = 'visible';
            });

            col.appendChild(content);
            document.querySelector(centerElement).appendChild(col);

            if (!content.querySelector("#rso")) {
                // end of results
                window.removeEventListener("scroll", onScrollDocumentEnd);
                nextPageLoading = false;
                msg.classList.contains("shown") && msg.classList.remove("shown");
                return;
            }

            pageNumber++;
            nextPageLoading = false;
            msg.classList.contains("shown") && msg.classList.remove("shown");
        });
}

function unescapeHex(hex) {
    if (typeof hex != "string") { return ""; }
    return hex.replace(/\\x([0-9a-f]{2})/ig, function(_, chunk) {
        return String.fromCharCode(parseInt(chunk, 16));
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
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
    msg = document.createElement("div");
    msg.setAttribute("class", "endless-msg");
    msg.innerText = "Sedang Memuat";
    document.body.appendChild(msg);
}

document.addEventListener("DOMContentLoaded", init);

