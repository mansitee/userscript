// ==UserScript==
// @name        Draggable Slider Tabs with Horizontal Scroll and Links Grid
// @namespace   example.com
// @version     1.0
// @match        *://*/*
// @match        *://*.google.*/*
// @match        *://*.youtube.*/*
// @match        *://*.github.*/*
// @match        *://*.bing.*/*
// @grant       GM_addStyle
// @include     *
// @run-at       document-start
// ==/UserScript==

(function() {
  // Tambahkan gaya CSS menggunakan GM_addStyle
  GM_addStyle(`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

    .draggable-tabs-container {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      tbackground-color: #333;
      z-index: 999999;
      display: flex;
      align-items: center;
      overflow-x: auto; /* Tambahkan scroll horizontal */
      white-space: nowrap; /* Menghindari wrapping */
      box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);

background:rgba(255,255,255, 0.7);
-webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px); transition: bottom 0.2s;animation:3s linear 0s 1 normal none running fadeIn; cursor:move;
    }
    .draggable-tab {
      background:rgba(255,255,255, 0.7);
-webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px);
      color: #333;
      padding: 10px;
      margin: 5px; left:50px;
      cursor: grab;
      user-select: none;
      border-radius: 5px;
      transition: background-color 0.3s;
      display: inline-block; /* Menjaga tab di satu baris */
    }
    .draggable-tab:hover {
      background-color: #ccc;
    }
    .tab-content {
      display: none;
      padding: 10px;
      background:rgba(255,255,255, 0.7);
-webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px);
      position: fixed;
      bottom: 60px;
      left:0;
      width: 100%;
      border-top: 1px solid #ddd;
      tbox-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
      z-index: 1000000;
    }
    .tab-content.active {
      display: block;
    }
    .tab-content .link-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr); /* 3 kolom */
      gap: 10px; /* Spasi antara link */
    }
    .tab-content a {
      color: #007bff;
      text-decoration: none;
      font-weight: bold;
      display: block;
      padding: 10px;
      background-color: #eee;
      border-radius: 5px;
      transition: background-color 0.3s;
    }
    .tab-content a:hover {
      background-color: #ddd;
      text-decoration: underline;
    }
  `);

  // Buat container tab
  var container = document.createElement('div');
  container.className = 'draggable-tabs-container';

  // Buat tab dan konten
  var tabs = [
    {'label': 'Tab 1', 'content': `
      <div class="link-grid">
        <a href="https://example.com/page1">Link 1</a>
        <a href="https://example.com/page2">Link 2</a>
        <a href="https://example.com/page3">Link 3</a>
        <a href="https://example.com/page4">Link 4</a>
        <a href="https://example.com/page5">Link 5</a>
        <a href="https://example.com/page6">Link 6</a>
        <a href="https://example.com/page7">Link 7</a>
        <a href="https://example.com/page8">Link 8</a>
        <a href="https://example.com/page9">Link 9</a>
      </div>`},
    {'label': 'Tab 2', 'content': `
      <div class="link-grid">
        <a href="https://example.com/about">About Us</a>
        <a href="https://example.com/contact">Contact</a>
        <a href="https://example.com/services">Services</a>
        <a href="https://example.com/faq">FAQ</a>
        <a href="https://example.com/blog">Blog</a>
        <a href="https://example.com/portfolio">Portfolio</a>
        <a href="https://example.com/testimonials">Testimonials</a>
        <a href="https://example.com/careers">Careers</a>
        <a href="https://example.com/support">Support</a>
      </div>`},
    {'label': 'Tab 3', 'content': `
      <div class="link-grid">
        <a href="https://example.com/terms">Terms of Service</a>
        <a href="https://example.com/privacy">Privacy Policy</a>
        <a href="https://example.com/sitemap">Sitemap</a>
        <a href="https://example.com/returns">Returns</a>
        <a href="https://example.com/shipping">Shipping Info</a>
        <a href="https://example.com/delivery">Delivery</a>
        <a href="https://example.com/size-guide">Size Guide</a>
        <a href="https://example.com/discounts">Discounts</a>
        <a href="https://example.com/gift-cards">Gift Cards</a>
      </div>`},
{'label': 'Tab 1', 'content': `
      <div class="link-grid">
        <a href="https://example.com/page1">Link 1</a>
        <a href="https://example.com/page2">Link 2</a>
        <a href="https://example.com/page3">Link 3</a>
        <a href="https://example.com/page4">Link 4</a>
        <a href="https://example.com/page5">Link 5</a>
        <a href="https://example.com/page6">Link 6</a>
        <a href="https://example.com/page7">Link 7</a>
        <a href="https://example.com/page8">Link 8</a>
        <a href="https://example.com/page9">Link 9</a>
      </div>`},{'label': 'Tab 1', 'content': `
      <div class="link-grid">
        <a href="https://example.com/page1">Link 1</a>
        <a href="https://example.com/page2">Link 2</a>
        <a href="https://example.com/page3">Link 3</a>
        <a href="https://example.com/page4">Link 4</a>
        <a href="https://example.com/page5">Link 5</a>
        <a href="https://example.com/page6">Link 6</a>
        <a href="https://example.com/page7">Link 7</a>
        <a href="https://example.com/page8">Link 8</a>
        <a href="https://example.com/page9">Link 9</a>
      </div>`},{'label': 'Tab 1', 'content': `
      <div class="link-grid">
        <a href="https://example.com/page1">Link 1</a>
        <a href="https://example.com/page2">Link 2</a>
        <a href="https://example.com/page3">Link 3</a>
        <a href="https://example.com/page4">Link 4</a>
        <a href="https://example.com/page5">Link 5</a>
        <a href="https://example.com/page6">Link 6</a>
        <a href="https://example.com/page7">Link 7</a>
        <a href="https://example.com/page8">Link 8</a>
        <a href="https://example.com/page9">Link 9</a>
      </div>`},
  ];

  tabs.forEach(function(tab, index) {
    // Buat elemen tab
    var tabElement = document.createElement('div');
    tabElement.className = 'draggable-tab';
    tabElement.textContent = tab.label;
    tabElement.dataset.index = index;
    container.appendChild(tabElement);

    // Buat elemen konten tab
    var contentElement = document.createElement('div');
    contentElement.className = 'tab-content';
    contentElement.innerHTML = tab.content; // Gunakan innerHTML untuk menyertakan HTML
    document.body.appendChild(contentElement);
  });

  document.body.appendChild(container);

  // Menambahkan event listener untuk drag
  let activeTab = null;
  let offsetX = 0;

  document.querySelectorAll('.draggable-tab').forEach(tab => {
    tab.addEventListener('mousedown', function(e) {
      activeTab = this;
      offsetX = e.clientX - activeTab.getBoundingClientRect().left;
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  });

  function onMouseMove(e) {
    if (activeTab) {
      let left = e.clientX - offsetX;
      left = Math.max(left, 0);
      left = Math.min(left, container.scrollWidth - container.clientWidth);
      activeTab.style.transform = `translateX(${left}px)`;
    }
  }

  function onMouseUp() {
    if (activeTab) {
      activeTab.style.transform = 'translateX(0)';
      document.querySelectorAll('.tab-content')[activeTab.dataset.index].classList.add('active');
      document.querySelectorAll('.tab-content').forEach((content, idx) => {
        if (idx !== parseInt(activeTab.dataset.index)) {
          content.classList.remove('active');
        }
      });
      activeTab = null;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
  }
})();
