// ==UserScript==
// @name         Floating Button with Menu, Copy, Redirect, and Eruda
// @namespace    http://viayoo.com/
// @version      0.9
// @author       rusmansutardi
// @description  Add a floating button with a menu, including copy, redirect buttons, and Eruda debugger
// @match        *://*/*
// @match        *://*.google.*/*
// @match        *://*.youtube.*/*
// @match        *://*.github.*/*
// @match        *://*.bing.*/*
// @grant        GM_addStyle
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // Add custom styles for the floating button and menu
    GM_addStyle(`
.fm{background:rgba(255,255,255, 0.7);}
.fm .mg,.fm .mgs, .fm .copy, .fm button:hover {background: rgba(0,123,255,0.1);}
.fm, .fm .glink, .fm a, .fm button, .fm button:hover {-webkit-tap-highlight-color: transparent;}
.fm .glink, .fm .copy {text-align:center;}
.fm a:hover, .fm .copy, .fm .glink {font-weight:bold;color:#007bff;}


.floating{display:none;}

.fm {position:fixed;bottom:0; right:20px; border-radius:5px; -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px); z-index:999999999;transition: bottom 0.2s;animation:3s linear 0s 1 normal none running fadeIn; cursor:move;}

.fmd {display:grid; grid-template-columns:repeat(3, 1fr);}
.fm .mg{display:grid; grid-template-columns:repeat(3, 1fr);padding:5px;}

.fm .mgs {display:grid; grid-template-columns:repeat(3, 1fr);}

.fm a.glink {font-size:11px;}
.fm a.glink svg {font-size:30px;}
.fm .glink {twidth:100%;padding:0; border-radius:10px;font-family: Arial,sans-serif;display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-basis: 25%;
    text-decoration: none;
    color: #333;}
.fm .mg a {font-size:11px;} 
.fm .mg a .bold{font-size:13px; color:#007bff;box-shadow: 0 0px 8px rgba(0,0,0,0.3);padding:5px;}

.fm .mgs svg, .fm .mgs a {font-size:12px;color:#007bff;font-family: Arial, sans-serif; font-weight:bold;text-decoration: none; text-transform: uppercase; padding:10px 0 10px 0;text-align: center; border-radius:10px;}

.fm a, .fm button {display:block; padding:6px 10px; text-decoration: none; color:#333; border-bottom: 1px solid #eee; width:100%; background: none; border: none; text-align: left; cursor: move; font-size: 16px; transition: background-color 0.3s, opacity 0.3s; }
.fm a:hover {background:none; cursor:move; width:100%;}
.fm button:hover {opacity:0.8; color:#007bff;}
.fm a:last-child, .fm button:last-child {border-bottom: none;}
        .fm .copy { opacity: 0.8; padding: 10px; width: 100%; border-radius: 30px; border-top: 2px solid white; }
    `);

    // Floating button element
    const button = $('<div class="floating">+</div>');
    $('body').append(button);

    // Floating menu element with copy, redirect, savefrom, eruda buttons
    const menu = $(`<div class="fm"> <div class="fmd">
        <a href="https://www.google.com/search?hl=id&safe=off&q=${encodeURIComponent(window.location.href)}" target="_blank">GL NoSafe</a>
        <a href="https://yt1s.com/en/youtube-to-mp3?q=${encodeURIComponent(window.location.href)}" class="tglink" id="mgslink"> YT1s</a>
  <a href="https://w18.mp3-juices.nu/?source=${encodeURIComponent(window.location.href)}" class="tglink" id="mgslink"> MP3 Juices</a>
        <a href="https://www.xnxx.com/search/${encodeURIComponent(window.location.href)}" class="tglink" id="mgslink"> Xnxx Search</a>
    


 <div class="mgs">  <a href="https://w18.mp3-juices.nu/?source=${encodeURIComponent(window.location.href)}" class="bold" id="bold">Mp3</a> <a href="https://yandex.com/search/?text=" class="bold" id="bold">MA</a> <a href="https://m.youtube.com" class="bold" id="bold"> Yt</a>
        </div>

    <a href="https://mansitee.github.io/via/device.html" target="_blank"> Device Info</a>
        <button id="bing">Bing Search</button>
        <button id="savefrom">Savefrom</button>
        <button id="redirect">POOPlay</button>
       
  
       <button id="copy-link" class="copy"> Salin Link</button>

        <!-- Added Copy Link button -->
        <div class="mg">
            <a href="https://mansitee.github.io/app/" class="glink" id="glink-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <rect x="0" y="0" width="24" height="24" fill="#fff" rx="5" ry="5"/>
                    <circle cx="12" cy="8" r="4" fill="#007bff"/>
                    <path d="M12 14c-5.52 0-10 4.48-10 10h20c0-5.52-4.48-10-10-10z" fill="#007bff"/>
                </svg>
            </a>
            <a href="https://mansitee.github.io/app/l" class="glink" id="glink">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <rect x="0" y="0" width="24" height="24" fill="#fff" rx="5" ry="5"/>
                    <path d="M12 16.5l-6-6h4v-5h4v5h4l-6 6zm-6 1h12v2H6v-2z" fill="#007bff"/>
                </svg>
            </a>
            <a href="https://m.youtube.com" class="glink" id="glink">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <rect x="0" y="0" width="24" height="24" fill="#fff" rx="5" ry="5"/>
                    <circle cx="12" cy="1" r="5" fill="#007bff"/>
                    <path d="M12 14c-5.52 0-10 4.48-10 10h20c0-5.52-4.48-10-10-10z" fill="#007bff"/>
                </svg>
            </a>

        </div>  </div>
    </div>`);
    $('body').append(menu);

    // Toggle the menu visibility when the button is clicked
    button.on('click', function() {
        menu.toggle();
    });

    // Hide the menu if clicked outside
    $(document).on('click', function(event) {
        if (!$(event.target).closest('.floating, .fm').length) { menu.hide(); }
    });

    // Function URL redirection
    function redirectToNewUrl() {
        // Get the current URL
        const currentUrl = window.location.href;

        // Use regular expression to extract the ID from the URL
        const match = currentUrl.match(/\/[de]\/([a-zA-Z0-9]+)/);
        if (match && match[1]) {
            const id = match[1];
            // Create the new URL
            const newUrl = `https://poop.my/p0?id=${id}`;
            // Redirect to the new URL
            window.location.href = newUrl;
        } else {
            alert('URL Atau ID Tidak Valid, • Coba Cek Kembali URLnya. • Script Berjalan di /d/ Atau /e/, untuk https://doodcom.me/ gunakan /embed/!.');
        }
    }




    // Event handler for Redirect URL button
    $('#redirect').on('click', function() {
        redirectToNewUrl();
    });

    // Event handler for Copy Link button
    $('#copy-link').on('click', function() {
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('Link halaman berhasil disalin: ' + window.location.href);
        }).catch(err => {
            alert('Gagal menyalin link halaman: ' + err);
        });
    });

    // Event handler for SaveFrom button
    $('#savefrom').on('click', function() {
        const savefromUrl = `https://savefrom.net/?url=${encodeURIComponent(window.location.href)}`;
        window.open(savefromUrl, '_blank');
    });


    // Event handler for Bing Search button
    $('#bing').on('click', function() {
        const bingUrl = `https://www.bing.com/search?q=${encodeURIComponent(window.location.href)}`;
        window.open(bingUrl, '_blank');
    });


// Navbar script integration (now targeting .floating instead of .fixed-nav)

var nav = document.querySelector('.fm');
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
            nav.style.top = ''; // Reset top to default
            nav.style.bottom = '0px'; // Ensure it is visible at the bottom
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
   