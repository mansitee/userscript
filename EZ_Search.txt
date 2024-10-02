// ==UserScript==
// @name        EZ_Search
// @description Quick access to multiple search engines + Endless scrolling
// @license     MIT
// @match       https://www.google.com/search*
// @match       https://yandex.com/search*
// @match       https://www.bing.com/search*
// @match       https://duckduckgo.com/*
// @match       https://www.startpage.com/do/search*
// @match       https://search.brave.com/search*
// @match       https://www.qwant.com/*
// @match       https://search.inetol.net/search*
// @match       https://search.yahoo.com/search*
// @match       https://www.perplexity.ai/search*
// @match       https://www.ecosia.org/search*
// @match       https://www.reddit.com/search*
// @match       https://medium.com/search*
// @match       https://en.wikipedia.org/wiki/Special:Search*
// @match       https://chatgpt.com/*
// @match       https://www.quora.com/search*
// @match       https://github.com/search*
// @match       https://stackoverflow.com/search*
// @match       https://libgen.is/search.php*
// @match       https://archive.org/search.php*
// @run-at      document-start
// @version 0.0.1.20240813130413
// @namespace https://greasyfork.org/users/1342408
// @downloadURL https://update.greasyfork.org/scripts/502156/EZ_Search.user.js
// @updateURL https://update.greasyfork.org/scripts/502156/EZ_Search.meta.js
// ==/UserScript==

(function() {
    'use strict';

    const engines = [
        ["Google", "https://www.google.com/search?q=", "https://www.google.com/favicon.ico"],
        ["Yandex", "https://yandex.com/search/?text=", "https://yandex.com/favicon.ico"],
        ["Bing", "https://www.bing.com/search?q=", "https://www.bing.com/favicon.ico"],
        ["DuckDuckGo", "https://duckduckgo.com/?q=", "https://www.duckduckgo.com/favicon.ico"],
        ["Startpage", "https://www.startpage.com/do/search?q=", "https://www.startpage.com/favicon.ico"],
        ["Brave", "https://search.brave.com/search?q=", "https://brave.com/static-assets/images/brave-favicon.png"],
        ["Qwant", "https://www.qwant.com/?q=", "https://www.qwant.com/favicon.ico"],
        ["Searx", "https://search.inetol.net/search?q=", "https://search.inetol.net/favicon.ico"],
        ["Yahoo", "https://search.yahoo.com/search?p=", "https://www.yahoo.com/favicon.ico"],
        ["Perplexity", "https://www.perplexity.ai/search?q=", "https://www.google.com/s2/favicons?domain=perplexity.ai&sz=32"],
        ["Ecosia", "https://www.ecosia.org/search?q=", "https://www.ecosia.org/favicon.ico"],
        ["Reddit", "https://www.reddit.com/search?q=", "https://www.reddit.com/favicon.ico"],
        ["Medium", "https://medium.com/search?q=", "https://www.google.com/s2/favicons?domain=medium.com&sz=32"],
        ["Wikipedia", "https://en.wikipedia.org/wiki/Special:Search?search=", "https://en.wikipedia.org/favicon.ico"],
        ["ChatGPT", "https://chatgpt.com/?q=", "https://chatgpt.com/favicon.ico"],
        ["Quora", "https://www.quora.com/search?q=", "https://www.quora.com/favicon.ico"],
        ["GitHub", "https://github.com/search?q=", "https://github.com/favicon.ico"],
        ["Stack Overflow", "https://stackoverflow.com/search?q=", "https://stackoverflow.com/favicon.ico"],
        ["LibGen", "https://libgen.is/search.php?req=", "https://libgen.is/favicon.ico"],
        ["Archive", "https://archive.org/search.php?query=", "https://archive.org/favicon.ico"]
    ];

    const centerElement = "#center_col";
    const loadWindowSize = 1.6;
    const filtersAll = ["#foot", "#bottomads"];
    const filtersCol = filtersAll.concat(["#extrares", "#imagebox_bigimages"]);
    let pageNumber = 1;
    let prevScrollY = 0;
    let nextPageLoading = false;

    const css = `
        .page-number {
            position: relative;
            display: flex;
            flex-direction: row-reverse;
            align-items: center;
            margin-bottom: 2em;
            color: #808080;
        }
        .page-number::before {
            content: "";
            background-color: #ededed;
            height: 1px;
            width: 100%;
            margin: 1em 3em;
        }
        .endless-msg {
            position: fixed;
            bottom: 0;
            left: 0;
            padding: 5px 10px;
            background: darkred;
            color: white;
            font-size: 11px;
            display: none;
        }
        .endless-msg.shown {
            display: block;
        }
        #engine-icons {
            position: fixed;
            top: 50%;
            left: 10px;
            transform: translateY(-50%);
            display: flex;
            flex-direction: column;
            gap: 10px;
            z-index: 10000;
        }
        #engine-icons a {
            width: 24px;
            height: 24px;
            display: block;
            transition: transform 0.2s;
        }
        #engine-icons a:hover {
            transform: scale(1.2);
        }
        #engine-icons img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    `;

    function getSearchQuery() {
        const params = new URLSearchParams(window.location.search);
        return ['q', 'text', 'p', 'query', 'search', 'req'].map(param => params.get(param)).find(Boolean) || '';
    }

    function createEngineIcons() {
        const container = document.createElement('div');
        container.id = 'engine-icons';

        const currentDomain = window.location.hostname.split('.').slice(-2, -1)[0];
        const searchTerms = encodeURIComponent(getSearchQuery());

        engines.forEach(([name, url, icon]) => {
            if (name.toLowerCase() !== currentDomain) {
                const link = document.createElement('a');
                link.href = `${url}${searchTerms}`;
                link.target = '_blank';
                link.title = name;

                const img = document.createElement('img');
                img.src = icon;
                img.alt = name;

                link.appendChild(img);
                container.appendChild(link);
            }
        });

        document.body.appendChild(container);
    }

    function requestNextPage() {
        nextPageLoading = true;
        let nextPage = new URL(location.href);
        if (!nextPage.searchParams.has("q")) return;
        nextPage.searchParams.set("start", String(pageNumber * 10));
        document.querySelector('.endless-msg').classList.add("shown");

        fetch(nextPage.href)
            .then(response => response.text())
            .then(text => {
                let parser = new DOMParser();
                let htmlDocument = parser.parseFromString(text, "text/html");
                let content = htmlDocument.querySelector(centerElement);
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
                    document.querySelector('.endless-msg').classList.remove("shown");
                    return;
                }

                pageNumber++;
                nextPageLoading = false;
                document.querySelector('.endless-msg').classList.remove("shown");
            });
    }

    function onScrollDocumentEnd() {
        let y = window.scrollY;
        let delta = y - prevScrollY;
        if (!nextPageLoading && delta > 0 && (y + window.innerHeight * loadWindowSize >= document.body.clientHeight)) {
            requestNextPage();
        }
        prevScrollY = y;
    }

    function filter(node, filters) {
        filters.forEach(filter => {
            let child = node.querySelector(filter);
            if (child) {
                child.parentNode.removeChild(child);
            }
        });
    }

    function init() {
        if (location.href.indexOf("tbm=isch") !== -1 || window.top !== window.self) return;

        prevScrollY = window.scrollY;
        window.addEventListener("scroll", onScrollDocumentEnd);
        filter(document, filtersAll);

        let style = document.createElement("style");
        style.textContent = css;
        document.head.appendChild(style);

        let msg = document.createElement("div");
        msg.className = "endless-msg";
        msg.innerText = "Loading next page...";
        document.body.appendChild(msg);

        createEngineIcons();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
