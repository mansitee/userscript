// ==UserScript==
// @name         ytinfo.vercel.app  Download oke
// @namespace    https://example.com
// @version      1.4
// @description  Menambahkan tombol di tengah atas yang mengarahkan ke ytinfo.vercel.app/get?video= dengan URL halaman saat ini sebagai parameter query string, menampilkan hasilnya dalam popup dengan gaya, dan menambahkan tombol unduh
// @author       mansitee
// @match        https://m.youtube.com/watch?v=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Buat tombol
    var btn = document.createElement('button');
    btn.id = 'ytInfoButton';
    btn.textContent = 'YouTube Info';
    btn.title = 'Go to YouTube Info';
    btn.style.width = '160px'; // Lebar tombol
    btn.style.height = '40px'; // Tinggi tombol
    btn.style.padding = '5px';
    btn.style.fontSize = '16px';
    btn.style.backgroundColor = '#FFFFFF'; // Latar belakang putih
    btn.style.color = '#000000'; // Warna teks hitam
    btn.style.border = 'none';
    btn.style.borderRadius = '10px'; // Membuat sudut melengkung
    btn.style.cursor = 'pointer';
    btn.style.position = 'fixed';
    btn.style.top = '10px'; // Jarak dari atas halaman
    btn.style.left = '50%';
    btn.style.transform = 'translateX(-50%)';
    btn.style.zIndex = '9999';
    btn.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)'; // Menambahkan bayangan

    // Fungsi untuk membuat dan menampilkan popup dengan hasil
    function showResultPopup(data) {
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
        modalContainer.style.backgroundColor = '#FFFFFF';
        modalContainer.style.padding = '20px';
        modalContainer.style.borderRadius = '10px';
        modalContainer.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)';
        modalContainer.style.maxWidth = '80%';
        modalContainer.style.maxHeight = '80%';
        modalContainer.style.overflowY = 'auto';

        // Tambahkan judul ke modal
        var modalTitle = document.createElement('h2');
        modalTitle.textContent = 'YouTube Video Info';
        modalContainer.appendChild(modalTitle);

        // Tambahkan hasil ke modal dengan gaya
        var modalContent = document.createElement('div');
        modalContent.style.whiteSpace = 'pre-wrap'; // Membuat teks dapat membungkus ke baris berikutnya
        modalContent.style.wordWrap = 'break-word'; // Memastikan teks tidak meluap dari kontainer
        modalContent.style.fontFamily = 'Arial, sans-serif'; // Gaya font
        modalContent.style.fontSize = '14px'; // Ukuran font
        modalContent.style.color = '#333'; // Warna teks

        // Format hasil JSON sebagai teks
        var formattedData = JSON.stringify(data, null, 2);
        modalContent.textContent = formattedData;
        modalContainer.appendChild(modalContent);

        // Tambahkan tombol unduh untuk informasi JSON
        var downloadInfoButton = document.createElement('button');
        downloadInfoButton.textContent = 'Download Info';
        downloadInfoButton.style.marginTop = '10px';
        downloadInfoButton.style.padding = '10px 20px';
        downloadInfoButton.style.fontSize = '16px';
        downloadInfoButton.style.backgroundColor = '#4CAF50'; // Warna latar belakang hijau
        downloadInfoButton.style.color = '#FFFFFF'; // Warna teks putih
        downloadInfoButton.style.border = 'none';
        downloadInfoButton.style.borderRadius = '5px';
        downloadInfoButton.style.cursor = 'pointer';
        downloadInfoButton.addEventListener('click', function() {
            var blob = new Blob([formattedData], { type: 'application/json' });
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = 'video_info.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
        modalContainer.appendChild(downloadInfoButton);

        // Tambahkan tombol unduh untuk video jika ada link
        if (data.formats) {
            data.formats.forEach(format => {
                if (format.url) {
                    var downloadVideoButton = document.createElement('button');
                    downloadVideoButton.textContent = `Download (${format.quality})`;
                    downloadVideoButton.style.marginTop = '10px';
                    downloadVideoButton.style.marginLeft = '10px';
                    downloadVideoButton.style.padding = '10px 20px';
                    downloadVideoButton.style.fontSize = '16px';
                    downloadVideoButton.style.backgroundColor = '#2196F3'; // Warna latar belakang biru
                    downloadVideoButton.style.color = '#FFFFFF'; // Warna teks putih
                    downloadVideoButton.style.border = 'none';
                    downloadVideoButton.style.borderRadius = '5px';
                    downloadVideoButton.style.cursor = 'pointer';
                    downloadVideoButton.addEventListener('click', function() {
                        window.open(format.url, '_blank');
                    });
                    modalContainer.appendChild(downloadVideoButton);
                }
            });
        }

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

    // Event listener untuk mengambil data dan menampilkan popup saat tombol diklik
    btn.addEventListener('click', function() {
        var currentURL = window.location.href;
        var encodedURL = encodeURIComponent(currentURL);
        var ytInfoURL = 'https://ytinfo.vercel.app/get?video=' + encodedURL;

        fetch(ytInfoURL)
            .then(response => response.json())
            .then(data => {
                showResultPopup(data);
            })
            .catch(error => {alert('Error fetching YouTube info: ' + error);
            });
    });

    // Tambahkan tombol ke body
    document.body.appendChild(btn);

    // Fungsi untuk menampilkan hasil dalam bentuk kartu dengan pilihan unduh sesuai jenis file
    function showResultCard(data) {
        // Buat kartu container
        var cardContainer = document.createElement('div');
        cardContainer.style.display = 'flex';
        cardContainer.style.flexWrap = 'wrap';
        cardContainer.style.justifyContent = 'center';
        cardContainer.style.alignItems = 'center';

        // Loop melalui data formats
        data.formats.forEach(format => {
            // Buat kartu untuk setiap format
            var card = document.createElement('div');
            card.style.margin = '10px';
            card.style.padding = '20px';
            card.style.border = '1px solid #ccc';
            card.style.borderRadius = '10px';
            card.style.width = '200px';

            // Tambahkan judul kualitas
            var title = document.createElement('h3');
            title.textContent = format.qualityLabel || format.quality || 'Unknown Quality';
            card.appendChild(title);

            // Tambahkan jenis file
            var type = document.createElement('p');
            type.textContent = 'Type: ' + format.container || 'Unknown';
            card.appendChild(type);

            // Tambahkan ukuran file
            var size = document.createElement('p');
            size.textContent = 'Size: ' + format.contentLength || 'Unknown';
            card.appendChild(size);

            // Tambahkan tombol unduh
            var downloadButton = document.createElement('button');
            downloadButton.textContent = 'Download';
            downloadButton.style.marginTop = '10px';
            downloadButton.style.padding = '10px 20px';
            downloadButton.style.fontSize = '16px';
            downloadButton.style.backgroundColor = '#2196F3'; // Warna latar belakang biru
            downloadButton.style.color = '#FFFFFF'; // Warna teks putih
            downloadButton.style.border = 'none';
            downloadButton.style.borderRadius = '5px';
            downloadButton.style.cursor = 'pointer';
            downloadButton.addEventListener('click', function() {
                window.open(format.url, '_blank');
            });
            card.appendChild(downloadButton);

            // Tambahkan kartu ke dalam container
            cardContainer.appendChild(card);
        });

        // Tambahkan container kartu ke body
        document.body.appendChild(cardContainer);
    }
})();