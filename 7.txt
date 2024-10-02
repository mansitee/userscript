// ==UserScript==
// @name         Bottom Sheet with Menus Inside
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Menambahkan bottom sheet dengan menu horizontal dan menu kolom di dalamnya
// @match        *://*/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Menambahkan CSS untuk bottom sheet, tombol, dan menu
    GM_addStyle(`
        .bottom-sheet {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
     background:rgba(255,255,255, 0.7);
-webkit-backdrop-filter: blur(4px); backdrop-filter: blur(4px);
            box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.3);
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
            position: relative;
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
            background: #fff;
            color:#0056b3;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            z-index: 1001;
        }

        .toggle-btn:hover {
            background: #fff;
        }

        /* CSS untuk menu horizontal dalam bottom sheet */
        .menu-horizontal-wrapper {
            overflow-x: auto;
            white-space: nowrap;
            background: rgba(0,123,255,0.1);    padding: 10px 0;
            tbox-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
        }

        .menu-horizontal {
            display: inline-flex;
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .menu-horizontal li {
            display: inline;
        }

        .menu-horizontal a {
            display: block;
            padding: 10px 20px;
            color:#333;
            text-decoration: none;
            text-align: center;
        }

        .menu-horizontal a:hover {
            background-color: #575757;
        }

        /* CSS untuk menu kolom dalam bottom sheet */
        .menu-column-wrapper {
            margin-top: 10px; /* Memberi jarak dari menu horizontal */
            padding: 10px;
            tbackground-color: #f4f4f4;
        }

        .menu-column {
            display: flex;
            flex-direction: column;
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .menu-column li {
            margin: 5px 0;
        }

        .menu-column a {
            display: block;
            padding: 10px;
            tbackground: #ddd;
            color: #333;
            text-decoration: none;
            border-radius: 5px;
        }

        .menu-column a:hover {
            background: #bbb;
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
            <!-- Menu Horizontal -->
            <div class="menu-horizontal-wrapper">
                <ul class="menu-horizontal">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                    <li><a href="#blog">Blog</a></li>
                    <li><a href="#portfolio">Portfolio</a></li>
                    <!-- Tambahkan lebih banyak item jika diperlukan -->
                </ul>
            </div>

            <!-- Menu Kolom -->
            <div class="menu-column-wrapper">
                <ul class="menu-column">
                    <li><a href="#item1">Item 1</a></li>
                    <li><a href="#item2">Item 2</a></li>
                    <li><a href="#item3">Item 3</a></li>
                    <li><a href="#item4">Item 4</a></li>
                    <li><a href="#item5">Item 5</a></li>
                    <!-- Tambahkan lebih banyak item jika diperlukan -->
                </ul>
            </div>
        </div>
    `;

    document.body.appendChild(bottomSheet);

    // Menambahkan tombol untuk menampilkan/menutup bottom sheet
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'toggle-btn';
    toggleBtn.textContent = '[=]';

    toggleBtn.addEventListener('click', () => {
        bottomSheet.classList.toggle('show');
    });

    document.body.appendChild(toggleBtn);
})();
