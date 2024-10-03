// ==UserScript==
// @name         Modify XNXX URL
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Menambahkan 'videodownload' ke URL
// @match        https://www.xnxx.com/video-1biey115/spivi_busting_her_snatch_open_with_a_big_white_dildo
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Mendapatkan URL saat ini
    const currentUrl = window.location.href;

    // Membuat URL baru dengan menambahkan 'videodownload'
    const newUrl = currentUrl.replace('www.xnxx.com', 'www.xnxxvideodownload.com');

    // Mengalihkan ke URL baru
    window.location.href = newUrl;
})();
