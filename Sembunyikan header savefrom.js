// ==UserScript==
// @name         Hapus Header di SaveFrom.net
// @namespace    https://savefrom.net/
// @version      1.1
// @description  Menghilangkan header di halaman SaveFrom.net
// @author       mansitee
// @match        https://savefrom.net/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Fungsi untuk menghilangkan elemen header
    function removeHeader() {
        // Target selector untuk header umum di SaveFrom.net
        const headerSelectors = [
            'header',           // Tag <header> umum
            '.header',          // Kelas .header
            '.topbar',          // Kelas topbar jika ada
            '#header',          // ID #header
            '#top',             // ID #top jika ada
            '.top-banner-wrapper',
          '.how-to-use-bottom', '.how-to-use-v2', 'footer','.norton','.sf-apk-promo',
 '.terms__string',     '.sf-apk-promo extra',  ];

        // Cek dan sembunyikan elemen berdasarkan selector
        headerSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(header => {
                if (header) {
                    header.style.display = 'none';
                }
            });
        });
    }

    // Panggil fungsi untuk menghilangkan header
    removeHeader();

    // Tambahkan observer untuk memastikan header hilang jika dimuat ulang secara dinamis
    const observer = new MutationObserver(removeHeader);
    observer.observe(document.body, { childList: true, subtree: true });
})();
