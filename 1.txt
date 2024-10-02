// ==UserScript==
// @name        Drop Down Sidebar with Navbar Integration
// @namespace   example.com
// @version     1.0
// @grant       GM_addStyle
// @include     *
// ==/UserScript==

(function() {
  // Tambahkan gaya CSS menggunakan GM_addStyle
  GM_addStyle(`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

    #drop-down-sidebar {
      z-index: 999999; /* z-index tinggi agar di atas konten lain */
      width:80px;
      background-color: #333;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      overflow: auto;
      font-family: 'Roboto', sans-serif;
    }
    #drop-down-sidebar-panel {
      height: 40px;
      background-color: #444;
    }
    #drop-down-sidebar-panel button {
      float: right;
      margin-right: 10px;
      background-color: #555;
      color: #fff;
      border: none;
      padding: 5px 10px;
      cursor: pointer;
      font-family: 'Roboto', sans-serif;
    }
    #drop-down-sidebar-content {
      list-style-type: none;
      padding: 0;
    }
    #drop-down-sidebar-content a {
      color: #fff;
      display: block;
      padding: 10px;
      text-decoration: none;
    }
    #drop-down-sidebar-content a:hover {
      background-color: #666;
    }
    .floating {
      transition: top 0.3s, bottom 0.3s;
    }
  `);

  // Buat sidebar
  var sidebar = document.createElement('div');
  sidebar.id = 'drop-down-sidebar';

  // Tambahkan kontrol panel ke sidebar
  var panel = document.createElement('div');
  panel.id = 'drop-down-sidebar-panel';
  sidebar.appendChild(panel);

  // Tambahkan tombol toggle ke panel kontrol
  var toggleButton = document.createElement('button');
  toggleButton.innerHTML = 'Toggle Sidebar';
  toggleButton.addEventListener('click', function() {
    sidebar.style.display = (sidebar.style.display === 'none') ? 'block' : 'none';
  });
  panel.appendChild(toggleButton);

  // Tambahkan konten ke sidebar
  var content = document.createElement('ul');
  content.id = 'drop-down-sidebar-content';
  sidebar.appendChild(content);

  // Tambahkan tautan ke konten
  var links = [
    {'label': 'Beranda', 'url': 'https://example.com'},
    {'label': 'Tentang Kami', 'url': 'https://example.com/about'},
    {'label': 'Produk', 'url': 'https://example.com/products'},
    {'label': 'Kontak', 'url': 'https://example.com/contact'}
  ];

  for (var i = 0; i < links.length; i++) {
    var listItem = document.createElement('li');
    var link = document.createElement('a');
    link.href = links[i].url;
    link.innerHTML = links[i].label;
    listItem.appendChild(link);
    content.appendChild(listItem);
  }

  // Tambahkan sidebar ke halaman
  document.body.appendChild(sidebar);

  // Navbar script integration
  var nav = document.querySelector('.floating');
  if (nav) {
    var navHeight = 0,
        scrollCurr = 0,
        scrollPrev = 0,
        scrollDiff = 0;

    window.addEventListener('scroll', function() {
      navHeight = nav.offsetHeight;
      scrollCurr = window.pageYOffset;
      scrollDiff = scrollPrev - scrollCurr;

      // Update position based on scroll direction
      if (scrollDiff > 0) {
        // Scrolling up: show the navbar
        nav.style.top = '0px'; // Ensure it is visible at the top
        nav.style.bottom = ''; // Reset bottom to default
      } else if (scrollDiff < 0) {
        // Scrolling down: hide the navbar
        nav.style.top = ''; // Reset top to default
        nav.style.bottom = `-${navHeight}px`; // Hide navbar by moving it out of view
      }

      // Note last scroll position
      scrollPrev = scrollCurr;
    });
  }
})();
