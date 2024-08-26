// ==UserScript==
// @name         Tabbar V0.8
// @namespace    https://example.com
// @version      0.8
// @description  Membagikan link halaman saat ini ke situs tertentu dengan tab bar bawah dan ikon teks
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
        { id: 'savefromButton', text: 'Savefrom', url: 'https://savefrom.net/?url=', icon: '📥' },
        { id: 'yts1Button', text: 'YTS1.de', url: 'https://yt1s.vin/en5?q=', icon: 'YT' },
        { id: 'googleSearchButton', text: 'Google Search', url: 'https://www.google.com/search?q=', icon: '🔍' },
        { id: 'saveweb2zipButton', text: 'SaveWeb2Zip', url: 'https://ssyoutube.com/id114sk/?q=', icon: '💾' },
        { id: 'poopButton', text: 'Poop', url: 'https://poop.com.co/playr.php?id=?', icon: 'pop' },
        { id: 'copyLinkButton', text: 'Copy Link', icon: '📋' }
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
    container.style.borderRadius = '10px'; // Membuat sudut melengkung
    container.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)'; // Menambahkan bayangan
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

        // Event listener untuk membagikan link atau membuat log jaringan saat tombol diklik
        if (button.id === 'copyLinkButton') {
            btn.addEventListener('click', function() {
                var currentURL = window.location.href;
                navigator.clipboard.writeText(currentURL);
                alert('Url Sudah Di Salin: ' + currentURL);
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
})();