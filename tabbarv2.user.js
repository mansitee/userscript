// ==UserScript==
// @name         Tabbar dengan ikon file dan popup search engine
// @namespace    https://example.com
// @version      0.9
// @description  Membagikan link halaman saat ini ke situs tertentu dengan tab bar bawah dan ikon teks, termasuk pilihan search engine dan layanan unduh dalam popup
// @author       mansitee
// @match        https://*/*
// @grant        none
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
        { id: 'googleSearchButton', text: 'Google Search', url: 'https://www.xnxx.com/search/', icon: '🔞' },
        { id: 'poopButton', text: 'Poop', url: 'https://poop.com.co/playr.php?id=?', icon: '🆔' },
        { id: 'copyLinkButton', text: 'Copy Link', icon: '📋' },
        { id: 'searchButton', text: 'Search Engines', icon: '🔎' }, // Tombol untuk membuka popup search engine.
        { id: 'downloadButton', text: 'Download Services', icon: '⬇️' } // Tombol untuk membuka popup layanan unduh.
    ];

    // Daftar search engine
    const searchEngines = [
        { id: 'searchGoogle', text: 'Google', url: 'https://www.google.com/search?q=', icon: '🔎' },
        { id: 'searchYouTube', text: 'YouTube', url: 'https://www.youtube.com/results?search_query=', icon: '▶️' },
        { id: 'searchGitHub', text: 'GitHub', url: 'https://github.com/search?q=', icon: '🧰' },
        { id: 'searchDuckDuckGo', text: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=', icon: '🔎' },
        { id: 'searchYahoo', text: 'Yahoo', url:'https://search.yahoo.com/search?p=', icon: '🔎' },
        { id: 'searchBing', text: 'Bing', url:'https://www.bing.com/search?q=', icon: '🔎' },
        { id: 'searchStartpage', text: 'Startpage', url: 'https://www.startpage.com/sp/search/', icon: '🔎' },
        { id: 'searchThemoviedb', text: 'Themoviedb', url: 'www.themoviedb.org/search?query=', icon: '🎬' },
        { id: 'searchBrave', text: 'Brave Search', url:'https://search.brave.com/search?q=', icon: '🔎' },
        { id: 'searchSpotify', text: 'Spotify Recent', url:'https://open.spotify.com/search/recent/', icon: '🎵' },
        { id: 'searchYoutubemusic', text: 'Youtube Music', url:'https://music.youtube.com/explore', icon: '🎵' },
        { id: 'searchYandex', text: 'Yandex', url: 'https://www.yandex.com/search/?text=', icon: '🔎' },
    ];

    // Daftar layanan unduh
    const downloadServices = [
        { id: 'downloadSaveFrom', text: 'SaveFrom', url: 'https://savefrom.net/?url=', icon: '▶️' },
        { id: 'downloadYT1s', text: 'YT1s', url: 'https://yt1s.vin/en5?q=', icon: '▶️' },
        { id: 'downloadYTd', text: 'YTd', url: 'https://ytd.ink/?lang=en', icon: '▶️' },
        { id: 'downloadY2', text: 'Y2', url: 'https://en-y2mate.com', icon: '▶️' },
        { id: 'downloadSSYouTube', text: 'SSYouTube', url: 'https://ssyoutube.com/id114sk/?q=', icon: '▶️' },
        { id: 'downloadYtddeno', text: 'Ytddeno', url: 'https://youtube-downloader.deno.dev/', icon: '▶️' },
        { id: 'downloadDdownr', text: 'Ddownr', url: 'https://ddownr.app/', icon: '▶️' },
        { id: 'downloadPoopplayer', text: 'Poop Player ID', url: 'https://poop.com.co/playr.php?id=', icon: '🔥' },
        { id: 'downloadYt1ss', text: 'Yt1ss', url: 'https://yt1ss.pro/en158/', icon: '🎦' },
        { id: 'downloadYtvd', text: 'Youvie', url: 'https://harshilchovatiya.github.io/Youtube-Video-Downloder/', icon: '🎦' },
        { id: 'downloadOke', text: 'Oke Unduhan', url: 'https://ytinfo.vercel.app/get?video=', icon: '🎦' },
    ];

    // Buat kontainer untuk tombol
    var container = document.createElement('div');
    container.id = 'shareButtonContainer';
    container.style.position = 'fixed';
    container.style.bottom = '0px';
    container.style.left = '50%';
    container.style.transform = 'translateX(-50%)';
    container.style.zIndex = '9999';
    container.style.display = 'flex';
    container.style.gap = '10px';
    container.style.padding = '10px';
    container.style.backgroundColor = getBackgroundColor(); // Mengatur latar belakang sesuai warna dominan
    container.style.borderRadius = '20px 20px 0 0'; // Membuat sudut melengkung
    container.style.tboxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)'; // Menambahkan bayangan
    container.style.overflowX = 'auto'; // Menambahkan scroll horizontal
    container.style.whiteSpace = 'nowrap'; // Mengatur agar tombol tidak turun ke baris baru

    // Fungsi untuk membuat tombol
    function createButton(button) {
        var isButton = document.getElementById(button.id);
        if (isButton) {
            return; // Tombol sudah ada, keluar dari fungsi
        }

        var btn = document.createElement('button');
        btn.id = button.id;
        btn.textContent = button.icon;
        btn.title = button.text;
        btn.style.width = '40px'; // Lebar tetap untuk setiap tombol
        btn.style.height = '40px'; // Tinggi tetap untuk setiap tombol
        btn.style.padding = '5px';
        btn.style.fontSize = '20px';
        btn.style.backgroundColor = '#FFFFFF'; // Latar belakang putih
        btn.style.color = '#000000'; // Warna teks hitam
        btn.style.border = 'none';
        btn.style.borderRadius = '50%'; // Membuat tombol menjadi lingkaran
        btn.style.cursor = 'pointer'; 
        btn.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)';

        // Event listener untuk membagikan link atau membuat log jaringan saat tombol diklik
        if (button.id === 'copyLinkButton') {
            btn.addEventListener('click', function() {
                var currentURL = window.location.href;
                navigator.clipboard.writeText(currentURL);
                alert('Url Sudah Di Salin: ' + currentURL);
            });
        } else if (button.id === 'searchButton') {
            btn.addEventListener('click', function() {
                openPopup('Search dan Unduhan', 'Pilih search dan Unduh untuk mencari:', searchEngines);
            });
        } else if (button.id === 'downloadButton') {
            btn.addEventListener('click', function() {
                openPopup('Download Services', 'Pilih layanan download untuk video ini:', downloadServices);
            });
        } else {
            btn.addEventListener('click', function() {
                var currentURL = window.location.href;
                var shareURL = button.url + encodeURIComponent(currentURL);
                window.open(shareURL, '_blank');
            });
        }

        // Tambahkan tombol ke kontainer
        container.appendChild(btn);
    }

    // Fungsi untuk membuka popup
    function openPopup(title, description, items) {
        // Buat modal overlay
        var modalOverlay = document.createElement('div');
        modalOverlay.style.position = 'fixed';
        modalOverlay.style.top = '0';
        modalOverlay.style.left = '0';
        modalOverlay.style.width = '100%';
        modalOverlay.style.height = '100%';
        modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        modalOverlay.style.zIndex = '10000';
        modalOverlay.style.display = 'flex';
        modalOverlay.style.justifyContent = 'center';
        modalOverlay.style.alignItems = 'center';

        // Buat kontainer modal
        var modalContainer = document.createElement('div');
        modalContainer.style.backgroundColor = '#ffffff';   
        modalContainer.style.padding = '0 10px 10px 10px';
        modalContainer.style.margin = '15px';  
        modalContainer.style.borderRadius = '15px';
        modalContainer.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)';
        modalContainer.style.display = 'flex';
        modalContainer.style.flexDirection = 'column';
        modalContainer.style.gap = '10px';
        modalContainer.style.flexWrap = 'wrap';
        modalContainer.style.justifyContent = 'center';
        modalContainer.style.alignItems = 'center';

        // Tambahkan judul ke modal
        var modalTitle = document.createElement('h2');
        modalTitle.textContent = title; 
        modalTitle.style.fontSize = '22px';
        modalTitle.style.padding = '10px 10px 10px 10px ';
        modalTitle.style.backgroundColor = getBackgroundColor();  
        modalTitle.style.borderRadius = '0 0 20px 20px'; 
        modalContainer.appendChild(modalTitle);

        // Tambahkan keterangan ke modal
        var modalDescription = document.createElement('p');
        modalDescription.textContent = description;
        modalContainer.appendChild(modalDescription);

        // Buat kontainer untuk tombol
        var buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.gap = '10px';
        buttonContainer.style.flexWrap = 'wrap';
        buttonContainer.style.justifyContent = 'center';
        modalContainer.appendChild(buttonContainer);

        // Fungsi untuk membuat tombol dalam popup
        function createPopupButton(item) {
            var btn = document.createElement('button');
            btn.id = item.id;
            btn.textContent = `${item.icon} ${item.text}`;
            btn.title = item.text;
            btn.style.width = 'auto';
            btn.style.height = 'auto';
            btn.style.padding = '5px';        
            btn.style.fontSize = '16px';
            btn.style.backgroundColor = '#f7f7f7';
            btn.style.color = '#000000';
            btn.style.border = '1px solid rgba(168, 166, 166, 0.72)';
            btn.style.borderRadius = '10px';
            btn.style.cursor = 'pointer';
            btn.style.tboxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)';
            btn.addEventListener('click', function() {
                var currentURL = window.location.href;
                var itemURL = item.url + encodeURIComponent(currentURL);
                window.open(itemURL, '_blank');
            });

            // Tambahkan tombol ke kontainer tombol
            buttonContainer.appendChild(btn);
        }

       // Panggil fungsi untuk membuat semua tombol dalam popup
        items.forEach(createPopupButton);

        // Tambahkan modal container ke modal overlay
        modalOverlay.appendChild(modalContainer);

        // Tambahkan modal overlay ke body
        document.body.appendChild(modalOverlay);

        // Event listener untuk menutup modal saat mengklik di luar kontainer modal
        modalOverlay.addEventListener('click', function(event) {
            if (event.target === modalOverlay) {
                document.body.removeChild(modalOverlay);
            }
        });
    }

    // Panggil fungsi untuk membuat semua tombol
    shareButtons.forEach(createButton);

    // Tambahkan kontainer ke body dokumen segera setelah skrip dijalankan
    document.body.appendChild(container);
})();