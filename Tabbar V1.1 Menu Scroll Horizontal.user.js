// ==UserScript==
// @name         Tabbar V1.1 Menu Scroll Horizontal
// @namespace    Tabbar Browser APK
// @copyright    2024+, mansitee
// @version      1.1
// @description  Menyediakan tombol untuk menyalin link, mencari di mesin pencari, layanan unduhan, dan pengalihan URL dengan menu scroll horizontal
// @author       mansitee
// @match        https://*/*
// @match        *://*/*
// @run-at       document-end
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    // Fungsi untuk mendapatkan warna background dominan dari body
    function getBackgroundColor() {
        let bodyStyles = window.getComputedStyle(document.body);
        return bodyStyles.backgroundColor;
    }

    // Daftar tombol dan link
    const shareButtons = [
        { id: 'copyLinkButton', text: 'Copy Link', icon: '📋' },
        { id: 'searchButton', text: 'Search Engines', icon: '🔎' },
        { id: 'downloadButton', text: 'Download Services', icon: '⬇️' },
        { id: 'redirectButton', text: 'Redirect URL', icon: '🔃' },
        { id: 'githubSearchButton', text: 'GitHub Search', icon: '🧰' },
       { id: 'viaButton', text: 'GitHub Search', icon: '📹' }, // Tombol baru
    ];

    // Daftar search engine
    const searchEngines = [
        { text: 'Google', url: 'https://www.google.com/search?q=', icon: '🔎' },
{ text: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=', icon: '🔎' },
        { text: 'Microsoft Bing', url: 'https://www.bing.com/search?q=', icon: '🔍' },
{ text: 'QMamu', url: 'https://qmamu.com/search?q=', icon: '🔍' },
{ text: 'NONAde Search', url: 'https://www.nona.de/?q=', icon: '🔍' }, { text: 'QMamu India', url: 'https://qmamu.com/search?q=', icon: '🔍' },
    { text: 'Yahoo', url: 'https://search.yahoo.com/search?p=', icon: '🔍' },
    { text: 'Baidu', url: 'https://www.baidu.com/s?wd=', icon: '🔍' },
    { text: 'Yandex', url: 'https://yandex.com/search/?text=', icon: '🔍' },
{ text: 'QQ Search', url: 'https://v.qq.com/x/search/?q=', icon: '🔍' },
        { text: 'YouTube', url: 'https://www.youtube.com/results?search_query=', icon: '▶️' },
        { text: 'GitHub', url: 'https://github.com/search?q=', icon: '🧰' },
        
        { text: 'YouTube Music', url: 'https://music.youtube.com/search?q=', icon: '🎵' },
        { text: 'PornHub', url: 'https://www.pornhub.com/video/search?search=', icon: '🔞' },
        { text: 'TMDB', url: 'https://www.themoviedb.org/search?query=', icon: '🎬' },
      { text: 'IMDB', url: 'https://www.imdb.com/find?q=', icon: '🎬' },  
        { text: 'Shopee', url: 'https://shopee.co.id/search?keyword=', icon: '🛒' },
        { text: 'GRID ID', url: 'https://www.grid.id/search?q=', icon: '📰' },
        { text: 'Domain esia', url: 'https://www.domainesia.com/domain/?domain=', icon: '🪧' },
        
        { text: 'XNXX', url: 'https://www.xnxx.com/search/', icon: '🔞' },
        { text: 'Hotwap', url: 'https://hotwap.net/search-', icon: '🔞' },
        { text: 'Flaru Search', url: 'https://www.flaru.com/en/justpaste.it/', icon: '🔞' },
        { text: 'Info Device', url: 'https://mansitee.github.io/via/device.html', icon: '📱' },

    { text: 'Google Images', url: 'https://www.google.com/search?tbm=isch&q=', icon: '🖼️' },
    { text: 'Google News', url: 'https://news.google.com/search?q=', icon: '📰' },
       
    { text: 'YouTube Music', url: 'https://music.youtube.com/search?q=', icon: '🎧' },
    { text: 'Genius Lyrics', url: 'https://genius.com/search?q=', icon: '🎼' },
    { text: 'Wiki pedia', url: 'https://en.wikipedia.org/wiki/', icon: '🌏' },
    { text: 'Amazon', url: 'https://www.amazon.com/s?k=', icon: '🛒' },
    { text: 'Ebay', url: 'https://www.ebay.com/sch/i.html?_nkw=', icon: '🛒' },

{ text: 'Facebook', url: 'https://www.facebook.com/search/results.php?q=', icon: '👥' },
{ text: 'ACfun', url: 'https://www.acfun.cn/search?keyword=', icon: '▶️' },{ text: 'Nico Video', url: 'http://www.nicovideo.jp/search/', icon: '▶️' },{ text: 'Douban', url: 'https://www.douban.com/search?source=suggest&q=', icon: '🌐' },{ text: 'Docin', url: 'http://www.docin.com/search.do?searchcat=2&searchType_banner=p&nkey=', icon: '🌐' },{ text: 'Qoura', url: 'https://www.quora.com/search?q=', icon: '🌐' },{ text: 'MoeGirl', url: 'https://zh.moegirl.org.cn/index.php?search=', icon: '🙋' },{ text: 'Bilibili', url: 'http://search.bilibili.com/all?keyword=', icon: '▶️' },{ text: 'Iqiyi', url: 'http://so.iqiyi.com/so/q_', icon: '🎬' },{ text: 'Xvideos', url: 'https://www.xvideos.com/?k=', icon: '🔞' },
{ text: 'JAV Library', url: 'http://www.javlibrary.com/cn/vl_searchbyid.php?keyword=', icon: '🔞' },

    ];

    // Daftar layanan unduh
    const downloadServices = [
        { text: 'Save From net', url: 'https://savefrom.net/?url=', icon: '▶️' },
        { text: 'YT1s', url: 'https://yt1s.vin/en5?q=', icon: '▶️' },
        { text: 'YTd', url: 'https://ytd.ink/?lang=en', icon: '▶️' },
        { text: 'ENY2', url: 'https://en-y2mate.com', icon: '▶️' },
        { text: 'YTB save', url: 'https://ytbsave.com/en/youtube-to-mp4/', icon: '▶️' },
        { text: 'DDownr', url: 'https://ddownr.app/', icon: '▶️' },
        { text: 'SSVID net', url: 'https://www.ssvid.net', icon: '▶️' },
        { text: 'Loader', url: 'https://loader.to/api/button/?url=', icon: '📥' },
        { text: 'Loader', url: 'https://loader.to/api/button/?url=', icon: '📥' }
    ];

    // Buat kontainer untuk tombol
    const container = document.createElement('div');
    container.id = 'shareButtonContainer';
    container.style.position = 'fixed';
    container.style.bottom = '0';
    container.style.left = '50%';
    container.style.transform = 'translateX(-50%)';
    container.style.zIndex = '9999';
    container.style.display = 'flex';
    container.style.gap = '10px';
    container.style.padding = '5px 0 0 0';
    container.style.background = getBackgroundColor();
    container.style.borderRadius = '10px 10px 0 0';
    container.style.overflowX = 'auto';
    container.style.whiteSpace = 'nowrap';
    container.style.maxWidth = '100%';
    container.style.boxSizing = 'border-box';
    container.style.border = 'none';
container.style.justifyContent = 'center';
container.style.alignItems = 'center';
container.style.textAlign = 'center';


    // Fungsi untuk membuat tombol
    function createButton(button) {
        const btn = document.createElement('button');
btn.id = button.id;
btn.textContent = button.icon;
btn.title = button.text;
btn.style.width = '25px';
btn.style.height = '25px';
btn.style.fontSize = '15px';
btn.style.backgroundColor = '#FFF';
btn.style.color = 'rgba(0,0,0,1.9)';
btn.style.border = 'none';
btn.style.borderRadius = '10%';
btn.style.cursor = 'move';
btn.style.justifyContent = 'center';
        btn.style.alignItems = 'center';
        btn.style.textAlign = 'center';
        btn.style.padding = '0';
        btn.style.margin = '0';
        btn.style.lineHeight = '1';


        // Event listener untuk menu
        btn.addEventListener('click', () => {
            if (button.id === 'copyLinkButton') {
                navigator.clipboard.writeText(window.location.href);
                alert('URL Berhasil Disalin: ' + window.location.href);
            } else if (button.id === 'searchButton') {
                showDropdown('🔍 Mesin Penelusuran', searchEngines);
            } else if (button.id === 'downloadButton') {
                showDropdown('📥 Layanan Unduhan', downloadServices);
            } else if (button.id === 'redirectButton') {
                redirectToNewUrl();
            } else if (button.id === 'githubSearchButton') { window.open('https://mansitee.github.io/via/device.html', '_blank');
            } else if (button.id === 'viaButton') { window.open('v://history', '_blank');
            }
        });

        // Tambahkan tombol ke kontainer
        container.appendChild(btn);
    }


// Fungsi untuk menampilkan dropdown
function showDropdown(title, items) { // Cek apakah dropdown sudah ada
        let existingDropdown = document.getElementById('customDropdown');
        if (existingDropdown) {  existingDropdown.remove();
        }

       // Buat kontainer dropdown
const dropdownContainer = document.createElement('div');
dropdownContainer.id = 'customDropdown';
dropdownContainer.style.position = 'fixed';
dropdownContainer.style.bottom = '55px';
dropdownContainer.style.left = '50%';
dropdownContainer.style.transform = 'translateX(-50%)';
dropdownContainer.style.zIndex = '9999';
dropdownContainer.style.background = 'rgba(0,0,0,0.5)';
dropdownContainer.style.borderRadius = '10px';
dropdownContainer.style.tboxShadow = '1px 50px 70px rgba(0,0,0,0.3)';
dropdownContainer.style.maxWidth = '320px';
dropdownContainer.style.maxHeight = '80vh';
dropdownContainer.style.overflowX = 'auto'; 
dropdownContainer.style.padding = '10px';



 // Tambahkan judul ke dropdown
        const dropdownTitle = document.createElement('h3');
dropdownTitle.textContent = title;
dropdownTitle.style.fontSize = '25px';   
dropdownTitle.style.tbackgroundColor = '#f2f2f2';
dropdownTitle.style.color = '#fff';   
 dropdownTitle.style.marginBottom = '10px';      
dropdownTitle.style.padding = '10px';       
dropdownTitle.style.borderRadius = '10px 10px 5px 5px';  
dropdownTitle.style.justifyContent = 'center'; 
dropdownTitle.style.alignItems = 'center'; 
dropdownTitle.style.textAlign = 'center'; 
dropdownTitle.style.textShadow= '2px 2px #ccc'; dropdownContainer.appendChild(dropdownTitle);

 // Buat kontainer untuk tombol
        const buttonContainer = document.createElement('div');       buttonContainer.style.columnCount = '6';       buttonContainer.style.columnGap = '5px';

 // Fungsi tombol dalam dropdown
        function createDropdownButton(item) {
            const btn = document.createElement('button');

btn.innerHTML = `<bold style="border-radius:unset;margin:unset;box-shadow:inset 0 0 0 0px red, 0 2px 8px rgba(0,0,0,0.2); font-weight:bold;font-size:20px;border-radius:25px;tpadding:5px;">${item.icon}
</bold>  <hr/> ${item.text}`;
btn.title = item.text;
btn.style.width = '100%';
btn.style.padding = '5px';
btn.style.paddingTop = '15px';
btn.style.marginBottom = '5px';
btn.style.fontSize = '10px';
btn.style.background = 'linear-gradient(to top, #ccc, rgba(255,255,255,0.8))'; 
btn.style.color = '#000';
btn.style.border = '1px solid #ccc';
btn.style.borderRadius = '5px';
btn.style.cursor = 'move';
btn.style.boxShadow = '0px 0px 5px rgba(0,0,0,0.1)';           btn.addEventListener('click', () => {
                const itemURL = item.url + encodeURIComponent(window.location.href);
                window.open(itemURL, '_blank');
            });

            // Tambahkan tombol ke kontainer tombol
            buttonContainer.appendChild(btn);
        }

        // Panggil fungsi untuk membuat semua tombol dalam dropdown
        items.forEach(createDropdownButton);

        // Tambahkan tombol ke dropdown
        dropdownContainer.appendChild(buttonContainer);
        document.body.appendChild(dropdownContainer);

        // Event listener untuk menutup dropdown saat mengklik di luar kontainer dropdown
        document.addEventListener('click', (event) => {
            if (!dropdownContainer.contains(event.target) && !container.contains(event.target)) {
                dropdownContainer.remove();
            }
        });
    }

    // Fungsi untuk melakukan pengalihan URL
    function redirectToNewUrl() {
        // Ambil URL saat ini
        const currentUrl = window.location.href;

        // Gunakan regular expression untuk mengekstrak ID dari URL
        const match = currentUrl.match(/\/[de]\/([a-zA-Z0-9]+)/);
        if (match && match[1]) {
            const id = match[1];
            // Buat URL baru
            const newUrl = `https://poophd.net/playr.php?id=${id}`;
            // Redirect ke URL baru
            window.location.href = newUrl;
        } else {
            alert('URL Atau ID Tidak Valid, • Coba Cek Kembali URLnya. • Script Berjalan di /d/ Atau /e/ !.');
        }
    }

    // Panggil fungsi untuk membuat semua tombol
    shareButtons.forEach(createButton);

    // Tambahkan kontainer ke body dokumen segera setelah skrip dijalankan
    document.body.appendChild(container);
})();
