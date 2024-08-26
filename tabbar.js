// ==UserScript==
// @name         Tabbar, serta pelacak sumber daya dengan ikon file
// @namespace    https://example.com
// @version      0.7
// @description  Membagikan link halaman saat ini ke situs tertentu dengan tab bar bawah dan ikon teks, serta pelacak sumber daya dengan ikon file
// @author       mansitee
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Tambahkan gaya untuk latar belakang putih pada body
    document.body.style.backgroundColor = '#FFFFFF';

    // Daftar tombol dan link
    const shareButtons = [
        { id: 'savefromButton', text: 'Savefrom', url: 'https://savefrom.net/?url=', icon: '📥' },
        { id: 'yts1Button', text: 'YTS1.de', url: 'https://yt1s.vin/en5?q=', icon: 'YT' },
        { id: 'googleSearchButton', text: 'Google Search', url: 'https://www.google.com/search?q=', icon: '🔍' },
        { id: 'saveweb2zipButton', text: 'SaveWeb2Zip', url: 'https://ssyoutube.com/id114sk/+ encodeURIComponent(currentURL);', icon: '💾' },
        { id: 'poopButton', text: 'Poop', url: 'https://poop.com.co/playr.php?id=?', icon: 'pop' },
        { id: 'copyLinkButton', text: 'Copy Link', icon: '📋' },
        { id: 'resourceTrackerButton', text: 'Resource Tracker', icon: '📊' }
    ];

    // Buat kontainer untuk tombol
    var container = document.createElement('div');
    container.id = 'shareButtonContainer';
    container.style.position = 'fixed';
    container.style.bottom = '10px';
    container.style.left = '50%';
    container.style.transform = 'translateX(-50%)';
    container.style.zIndex = '9999';
    container.style.display = 'flex';
    container.style.gap = '10px';
    container.style.padding = '10px';
    container.style.backgroundColor = '#FFFFFF'; // Latar belakang putih
    container.style.borderRadius = '10px'; // Membuat sudut melengkung
    container.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)'; // Menambahkan bayangan

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

        // Event listener untuk membagikan link atau membuat log jaringan saat tombol diklik
        if (button.id === 'copyLinkButton') {
            btn.addEventListener('click', function() {
                var currentURL = window.location.href;
                navigator.clipboard.writeText(currentURL);
                alert('Url Sudah Di Salin: ' + currentURL);
            });
        } else if (button.id === 'resourceTrackerButton') {
            btn.addEventListener('click', function() {
                displayResourceLog();
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

    // Panggil fungsi untuk membuat semua tombol
    shareButtons.forEach(createButton);

    // Tambahkan kontainer ke body dokumen
    document.body.appendChild(container);

    // Fungsi untuk melacak sumber daya yang dimuat di halaman
    function displayResourceLog() {
        const resources = performance.getEntriesByType('resource');

        // Membuat container kartu
        let container = document.createElement('div');
        container.className = 'resource-container';

        // Menambahkan data ke dalam kartu
        resources.forEach(resource => {
            let card = document.createElement('div');
            card.className = 'resource-card';

            let resourceIcon = document.createElement('div');
            resourceIcon.className = 'resource-icon';
            resourceIcon.textContent = getFileIcon(resource.initiatorType);

            let resourceName = document.createElement('div');
            resourceName.className = 'resource-name';
            resourceName.textContent = resource.name;

            let resourceType = document.createElement('div');
            resourceType.className = 'resource-type';
            resourceType.textContent = resource.initiatorType;

            card.appendChild(resourceIcon);
            card.appendChild(resourceName);
            card.appendChild(resourceType);
            container.appendChild(card);
        });

        // Membuka jendela baru untuk menampilkan kartu
        let resourceLogWindow = window.open('', '_blank', 'width=360,height=400');
        resourceLogWindow.document.title = 'Resource Log';
        
        // Menambahkan container ke body jendela baru
        resourceLogWindow.document.body.appendChild(container);

        // Gaya CSS untuk body dan container
        const bodyStyle = `
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        `;

        const containerStyle = `
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
            max-width: 400px;
            width: 100%;
            overflow-y: auto;
            column-count: 2;
        `;

        const cardStyle = `
            display: flex;
            align-items: center;
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 5px;
            padding: 10px;
            margin: 10px 0;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            font-size: 24px;
            word-wrap: break-word;
        `;

        const iconStyle = `
            font-size: 24px;
            margin-right: 10px;
        `;

        const nameStyle = `
            flex: 1;
            font-weight: bold;
            overflow-x: auto;
        `;

        const typeStyle = `
            color: #666;
            font-size: 0.9em;
        `;

        // Menerapkan gaya ke elemen
        resourceLogWindow.document.body.style.cssText = bodyStyle;
        container.style.cssText = containerStyle;

        const cardElements = resourceLogWindow.document.querySelectorAll('.resource-card');
        const iconElements = resourceLogWindow.document.querySelectorAll('.resource-icon');
        const nameElements = resourceLogWindow.document.querySelectorAll('.resource-name');
        const typeElements = resourceLogWindow.document.querySelectorAll('.resource-type');

        cardElements.forEach(card => {
            card.style.cssText = cardStyle;
        });

        iconElements.forEach(icon => {
            icon.style.cssText = iconStyle;
        });

        nameElements.forEach(name => {
            name.style.cssText = nameStyle;
        });

        typeElements.forEach(type => {
            type.style.cssText = typeStyle;
        });
    }

    // Fungsi untuk mendapatkan ikon berdasarkan jenis inisiator
    function getFileIcon(initiatorType) {
        switch (initiatorType) {
            case 'script':
                return '📜';
            case 'link':
                return '🔗';
            case 'img':
                return '🖼️';
            case 'css':
                return '🎨';
            case 'xmlhttprequest':
                return '📡';
            case 'fetch':
                return '⚡';
            default:
                return '📁';
        }
    }

})();