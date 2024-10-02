// ==UserScript==
// @name         Bottom Sheet with Toggle Button
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Menambahkan bottom sheet dengan tombol untuk menampilkan dan menutup
// @match        *://*/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Menambahkan CSS untuk bottom sheet dan tombol
    GM_addStyle(`
        .bottom-sheet {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background: white;
            tbox-shadow: 0 -2px 5px rgba(0, 0, 0, 0.3);
            transform: translateY(100%);
            transition: transform 0.3s ease-in-out;
            z-index: 1000;
        }

        .bottom-sheet.show {
            transform: translateY(0);
        }

        .bottom-sheet .header {
            padding: 10px;
            border-bottom: 1px solid #ddd;
            font-weight: bold;
        }

        .bottom-sheet .content {
            padding: 10px;
        }

        .bottom-sheet .close-btn {
            cursor: pointer;
            float: right;
            font-size: 18px;
            line-height: 18px;
        }

        .toggle-btn {
            position: fixed;
            top: 45%;
            left: 0px;
            font-size:34px;
            background: #fff;
            color:#0056b3;
            border: none;
            padding:2px 10px;
            border-radius:0 10px 10px 0;
            cursor: pointer;
            z-index: 1001;
        }

        .toggle-btn:hover {
            background: #0056b3;
           color:#fff;
        }
    `);

    // Menambahkan elemen bottom sheet ke body
    const bottomSheet = document.createElement('div');
    bottomSheet.className = 'bottom-sheet';
    bottomSheet.innerHTML = `
        <div class="header">
            Bottom Sheet
            <span class="close-btn" onclick="document.querySelector('.bottom-sheet').classList.remove('show')">&times;</span>
        </div>
        <div class="content">
            Ini adalah isi dari bottom sheet.
        </div>
    `;

    document.body.appendChild(bottomSheet);

    // Menambahkan tombol untuk menampilkan/menutup bottom sheet
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'toggle-btn';
    toggleBtn.textContent = '>=';

    toggleBtn.addEventListener('click', () => {
        bottomSheet.classList.toggle('show');
    });

    document.body.appendChild(toggleBtn);
})();
