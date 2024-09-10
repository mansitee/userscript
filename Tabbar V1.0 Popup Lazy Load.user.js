// ==UserScript==
// @name         Tabbar V1.0 Popup Lazy Load
// @namespace    Tabbar Browser APK
// @copyright    2024+, mansitee
// @version      1.0
// @description  Menyediakan tombol untuk menyalin link, mencari di mesin pencari, dan layanan unduhan dengan popup dan lazy load
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

    // Daftar tombol dan link dengan ikon SVG
const shareButtons = [
    { 
        id: 'copyLinkButton', 
        text: 'Copy Link', 
        icon: `📋` 
    },
    { 
        id: 'searchButton', 
        text: 'Search Engines', 
        icon: `🔍`
    },
    { 
        id: 'downloadButton', 
        text: 'Download Services', 
        icon: `📥`
    }
];

    // Daftar search engine
    const searchEngines = [
        { text: 'Google', url: 'https://www.google.com/search?q=', icon: '🔎' },
        { text: 'YouTube', url: 'https://www.youtube.com/results?search_query=', icon: '▶️' },
        { text: 'GitHub', url: 'https://github.com/search?q=', icon: '🧰' },
        { text: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=', icon: '🔎' }
    ];

    // Daftar layanan unduh
    const downloadServices = [
        { text: 'SaveFrom', url: 'https://savefrom.net/?url=', icon: '▶️' },
        { text: 'YT1s', url: 'https://yt1s.vin/en5?q=', icon: '▶️' },
        { text: 'YTd', url: 'https://ytd.ink/?lang=en', icon: '▶️' }
    ];

    // Buat kontainer untuk tombol
    const container = document.createElement('div');
    container.id = 'shareButtonContainer';
    container.style.position = 'fixed';
    container.style.bottom = '0px';
    container.style.left = '50%';
    container.style.transform = 'translateX(-50%)';
    container.style.zIndex = '9999';
    container.style.display = 'flex';
    container.style.gap = '10px';
    container.style.padding = '0px';
    container.style.backgroundColor = '#fff';
    container.style.borderRadius = '20px';
    container.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
    container.style.overflowX = 'auto';
    container.style.whiteSpace = 'nowrap';

    // Fungsi untuk membuat tombol
    function createButton(button) {
        const btn = document.createElement('button');
        btn.id = button.id;
        btn.textContent = button.icon;
        btn.title = button.text;
        btn.style.width = '40px';
        btn.style.height = '40px';
        btn.style.fontSize = '20px';
        btn.style.backgroundColor = '#FFF';
        btn.style.color = '#000';
        btn.style.border = 'none';
        btn.style.borderRadius = '50%';
       btn.style.cursor = 'move';
        btn.style.tboxShadow = '0 0 10px rgba(0,0,0,0.1)';
        btn.style.position = 'relative';

        // Event listener untuk popup
        btn.addEventListener('click', () => {
            if (button.id === 'copyLinkButton') {
                navigator.clipboard.writeText(window.location.href);
                alert('URL copied: ' + window.location.href);
            } else if (button.id === 'searchButton') {
                openPopup('Search Engines', 'Choose a search engine to search for this page:', searchEngines);
            } else if (button.id === 'downloadButton') {
                openPopup('Download Services', 'Choose a download service for this video:', downloadServices);
            }
        });

        // Tambahkan tombol ke kontainer
        container.appendChild(btn);
    }

    // Fungsi untuk membuka popup
    function openPopup(title, description, items) {
        // Cek apakah popup sudah ada
        let existingPopup = document.getElementById('customPopup');
        if (existingPopup) {
            existingPopup.remove();
        }

        // Buat modal overlay
        const modalOverlay = document.createElement('div');
        modalOverlay.id = 'customPopup';
        modalOverlay.style.position = 'fixed';
        modalOverlay.style.top = '0';
        modalOverlay.style.left = '0';
        modalOverlay.style.width = '100%';
        modalOverlay.style.height = '100%';
        modalOverlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
        modalOverlay.style.zIndex = '10000';
        modalOverlay.style.display = 'flex';
        modalOverlay.style.justifyContent = 'center';
        modalOverlay.style.alignItems = 'center';

        // Buat kontainer modal
        const modalContainer = document.createElement('div');
        modalContainer.style.backgroundColor = '#ffffff';
        modalContainer.style.padding = '10px';
        modalContainer.style.margin = '10px';
        modalContainer.style.borderRadius = '15px';
        modalContainer.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
        modalContainer.style.display = 'flex';
        modalContainer.style.flexDirection = 'column';
        modalContainer.style.gap = '10px';
        modalContainer.style.width = '80%';
        modalContainer.style.maxWidth = '600px';
        modalContainer.style.overflowY = 'auto';
        modalContainer.style.maxHeight = '80vh';

        // Tambahkan judul ke modal
        const modalTitle = document.createElement('h2');
        modalTitle.textContent = title;
        modalTitle.style.fontSize = '22px';
        modalTitle.style.padding = '10px';
        modalTitle.style.backgroundColor = '#f0f0f0';
        modalTitle.style.borderRadius = '10px 10px 0 0';
        modalContainer.appendChild(modalTitle);

        

// Tambahkan keterangan ke modal
   const modalDescription = document.createElement('p');
modalDescription.textContent = description;      modalContainer.appendChild(modalDescription);


// Buat kontainer untuk tombol
   const buttonContainer = document.createElement('div');
buttonContainer.style.display = 'flex';       buttonContainer.style.flexDirection = 'column';
buttonContainer.style.gap = '10px';      modalContainer.appendChild(buttonContainer);

// Fungsi untuk membuat tombol dalam popup
function createPopupButton(item) {
const btn = document.createElement('button');
            btn.textContent = `${item.icon} ${item.text}`;
            btn.title = item.text;
            btn.style.width = '100%';
            btn.style.padding = '10px';
            btn.style.fontSize = '14px';
            btn.style.backgroundColor = '#f0f0f0';
            btn.style.color = '#000000';
            btn.style.border = '1px solid #ccc';
            btn.style.borderRadius = '10px';
            btn.style.cursor = 'move';
            btn.style.boxShadow = '0px 0px 5px rgba(0,0,0,0.1)';
            btn.addEventListener('click', () => {
                const itemURL = item.url + encodeURIComponent(window.location.href);
                window.open(itemURL, '_blank');
            });

            // Tambahkan tombol ke kontainer tombol
            buttonContainer.appendChild(btn);
        }

        // Lazy Load Konten Popup
        function loadPopupContent() {
            // Panggil fungsi untuk membuat semua tombol dalam popup
            items.forEach(createPopupButton);
        }

        // Tampilkan popup dan lazy load konten
        loadPopupContent();
        modalContainer.appendChild(buttonContainer);
        modalOverlay.appendChild(modalContainer);
        document.body.appendChild(modalOverlay);

        // Event listener untuk menutup modal saat mengklik di luar kontainer modal
        modalOverlay.addEventListener('click', (event) => {
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
