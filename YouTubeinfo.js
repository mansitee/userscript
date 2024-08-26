// ==UserScript==
// @name         YouTube Info with Floating oke
// @namespace    https://example.com
// @version      1.0
// @description  Add a button to get YouTube video info with a floating card display
// @author       Your Name
// @match        https://m.youtube.com/watch?v=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Buat tombol
    var btn = document.createElement('button');
    btn.textContent = 'Get YouTube Info';
    btn.style.position = 'fixed';
    btn.style.top = '10px';
    btn.style.left = '50%';
    btn.style.transform = 'translateX(-50%)';
    btn.style.zIndex = '9999';
    btn.style.padding = '10px 20px';
    btn.style.fontSize = '16px';
    btn.style.backgroundColor = '#2196F3'; // Warna latar belakang biru
    btn.style.color = '#FFFFFF'; // Warna teks putih
    btn.style.border = 'none';
    btn.style.borderRadius = '5px';
    btn.style.cursor = 'pointer';

    // Buat kontainer melayang
    var floatingCard = document.createElement('div');
    floatingCard.id = 'floatingCard';
    floatingCard.style.position = 'fixed';
    floatingCard.style.top = '50px'; // Sesuaikan jarak dari atas
    floatingCard.style.left = '0px'; // Sesuaikan jarak dari kiri
    floatingCard.style.zIndex = '9999';
    floatingCard.style.backgroundColor = '#FFFFFF';
    floatingCard.style.padding = '10px';
    floatingCard.style.borderRadius = '10px';
    floatingCard.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)';
    floatingCard.style.display = 'none'; // Sembunyikan awalnya
    floatingCard.style.maxWidth = '95%'; // Batasi lebar
   floatingCard.style.overflowY = 'auto'; // Aktifkan scroll jika terlalu panjang

    floatingCard.style.overflow = 'hidden'; // Sembunyikan overflow
    floatingCard.style.border = '1px solid #ccc'; // Border 1px
    floatingCard.style.columnCount = '3'; // Tampilkan dalam 3 kolom

    // Fungsi untuk menampilkan hasil dalam bentuk kartu melayang
    function showResultCard(data) {
        // Bersihkan isi kartu sebelum menambahkan hasil baru
        floatingCard.innerHTML = '';

        // Tampilkan judul video dan deskripsi
        var title = document.createElement('div');
        title.textContent = 'Title: ' + (data.videoDetails.title || 'Unknown');
        title.style.fontWeight = 'bold'; title.style.fontSize = '18px';
        title.style.marginBottom = '10px';
        floatingCard.appendChild(title);

        var description = document.createElement('div');
        description.textContent = 'Description: ' + (data.videoDetails.shortDescription || 'No description available');
        description.style.marginBottom = '10px';
        floatingCard.appendChild(description);

        // Fungsi untuk membuat item kartu
        function createCardItem(label, format) {
            var cardItem = document.createElement('div');
            cardItem.style.border = '1px solid #ccc'; // Border 1px
            cardItem.style.borderRadius = '5px';
            cardItem.style.padding = '10px';   cardItem.style.marginBottom = '10px'; cardItem.style.fontSize = '16px';
            cardItem.style.cursor = 'pointer';

            var itemLabel = document.createElement('div');
            itemLabel.textContent = label;
            itemLabel.style.fontWeight = 'bold';
            cardItem.appendChild(itemLabel);

            var itemValue = document.createElement('div');
            itemValue.textContent = `${format.qualityLabel || format.audioQuality || 'Unknown'} - ${format.container}`;
            cardItem.appendChild(itemValue);

            // Tambahkan event listener untuk mengunduh saat kartu diklik
            cardItem.addEventListener('click', function() {
                window.open(format.url, '_blank');
            });

            floatingCard.appendChild(cardItem);
        }

        // Loop melalui setiap format video dan buat item kartu untuk itu
        data.formats.forEach(format => {
            if (format.mimeType.includes('video')) {
                createCardItem('Video Format', format);
            } else if (format.mimeType.includes('audio')) {
                createCardItem('Audio Format', format);
            }
        });

        // Tampilkan kartu melayang
        floatingCard.style.display = 'block';
    }

    // Event listener untuk mengambil data dan menampilkan atau menyembunyikan kartu saat tombol diklik
    btn.addEventListener('click', function() {
        if (floatingCard.style.display === 'block') {
            floatingCard.style.display = 'none';
            btn.textContent = 'Get YouTube Info';
        } else {
            var videoId = new URLSearchParams(window.location.search).get('v');
            var ytInfoURL = 'https://ytinfo.vercel.app/get?video=' + videoId;

            fetch(ytInfoURL)
                .then(response => response.json())
                .then(data => {
                    showResultCard(data);
                    btn.textContent = 'Close YouTube Info';
                })
                .catch(error => {
                    alert('Error fetching YouTube info: ' + error);
                });
        }
    });

    // Tambahkan tombol dan kartu ke body
    document.body.appendChild(btn);
    document.body.appendChild(floatingCard);
})();