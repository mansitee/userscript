// ==UserScript==
// @name         Floating Button with Menu, Copy, Redirect, and Eruda
// @namespace    http://tampermonkey.net/
// @version      0.9
// @description  Add a floating button with a menu, including copy, redirect buttons, and Eruda debugger
// @match        *://*/*
// @grant        GM_addStyle
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // Add custom styles for the floating button and menu
    GM_addStyle(`
.floating-button {background-color: #007bff;color:#ffff;border-radius:50%;width:40px;height:40px; text-align:center;line-height: 40px;position: fixed;bottom:0px;
right:6%;tleft:45%;cursor:move;box-shadow:0 0px 8px rgba(0,0,0,0.3);
font-size:30px;z-index:999999999;
-webkit-tap-highlight-color: transparent;}

.floating-button:hover {background-color:rgba(0,123,255, 0.1);color: #007bff;}

.floating-menu {display:none; position:fixed;bottom:120px;right:20px;tbox-shadow:0 1px 2px 0 rgba(60,64, 67,0.3), 0 1px 3px 1px rgba(255,255,255,0.5); border-radius:5px;
transition:all 0.1s ease-in-out;
background-color:rgba(255,255,255, 0.5); -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px); z-index:999999999; -webkit-tap-highlight-color: transparent;}

.floating-menu:hover{box-shadow: 0 12px 28px -5px rgba(0,0,0,0.13);
-webkit-transform: translatey(5px);
transform: translatey(-10px); -webkit-transition: all 0.3s; transition: transform 0.35s ease-in-out, opacity 0.35s ease-in-out; opacity:0;}

.tfloating-menu:hover{ttransform: translate(50px);
  ttransition: transform 0.5s ease, opacity 0.2s ease;
  opacity:1;}


.floating-menu .menu-grid {display: grid;grid-template-columns: repeat(3,1fr); padding:5px; background-color:rgba(0,123,255, 0.1);}

.floating-menu a.grid-link {font-size:11px;}

.floating-menu .grid-link {
 width:100%;text-align: center; color: #007bff;font-weight: bold; padding:0px; border-radius: 10px; -webkit-tap-highlight-color: transparent;font-family: Arial, sans-serif;}

.floating-menu .grid-link:nth-of-type(2) {tbackground-color: #33c2ff;}
.floating-menu .grid-link:nth-of-type(3) {tbackground-color:#33ff57;}


.floating-menu a, .floating-menu button {display:block;padding:6px 10px;text-decoration:none;color: #333;border-bottom:1px solid #eee; width:100%;background:none;border: none;text-align:left;cursor:move;
font-size:16px; transition: background-color 0.3s, opacity 0.3s;-webkit-tap-highlight-color: transparent;}

.floating-menu a:hover {background: none;cursor:move;width:100%; font-weight:bold;color:#007bff; }

.floating-menu button:hover {background-color: rgba(0, 123, 255, 0.1); opacity: 0.8; -webkit-tap-highlight-color: transparent;color: #007bff; }

.floating-menu a:last-child, .floating-menu button:last-child {border-bottom: none;}

.floating-menu .copy {background-color:rgba(0,123,255, 0.1); opacity:0.8;font-weight: bold;color:#007bff;padding:10px; text-align:center;width:100%; border-radius:30px 30px 0 0; border-top:2px solid white; }  `);

    // Create the floating button element
    const button = $('<div class="floating-button">+</div>');
    $('body').append(button);

    // Create the floating menu element with copy, redirect, savefrom, and eruda buttons
    const menu = $(`<div class="floating-menu"> <a href="https://www.google.com/search?hl=id&safe=off&q=${encodeURIComponent(window.location.href)}" target="_blank">• Google No</a>


    <div class="menu-grid"> <a href="https://www.pornhub.com/video/search?search=${encodeURIComponent(window.location.href)}" class="grid-link" id="grid-link-1">PHUB</a>
<a href="https://www.xvideos.com/?k=${encodeURIComponent(window.location.href)}" class="grid-link" id="grid-link"> XVID</a>
<a href="https://www.xnxx.com/search/${encodeURIComponent(window.location.href)}" class="grid-link" id="grid-link-2"> XNXX</a>     </div> 
  
<a href="https://mansitee.github.io/via/device.html" target="_blank"> Device Info</a>
<button id="bing-url">Bing Search</button>
<button id="savefrom-url">Savefrom</button>
<button id="redirect-url">Redirect POOP</button>
<button id="eruda-toggle">Eruda Consol</button>
<button id="copy-link"class="copy"> Salin Link</button> 

<!-- Added Copy Link button -->
            


<div class="menu-grid"> <a href="https://mansitee.github.io/app/" class="grid-link" id="grid-link-1"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"> <rect x="0" y="0" width="24" height="24" fill="#fff" rx="5" ry="5"/> <circle cx="12" cy="8" r="4" fill="#007bff"/> <path d="M12 14c-5.52 0-10 4.48-10 10h20c0-5.52-4.48-10-10-10z" fill="#007bff"/> </svg> </a>
                
<a href="https://mansitee.github.io/app/l"class="grid-link" id="grid-link"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"> <rect x="0" y="0" width="24" height="24"fill="#fff" rx="5"ry="5"/> <path d="M12 16.5l-6-6h4v-5h4v5h4l-6 6zm-6 1h12v2H6v-2z"fill="#007bff"/>
</svg> </a>
 
<a href="https://m.youtube.com" class="grid-link" id="grid-link"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"> <rect x="0" y="0" width="24" height="24" rx="5" ry="5" fill="#fff"/> <path d="M8 16.5l8-4.5-8-4.5v9z" fill="#007bff"/> </svg> </a>
            </div>
        </div>
    `);
    $('body').append(menu);

    // Toggle the menu visibility when the button is clicked
    button.on('click', function() {
        menu.toggle();
    });

    // Hide the menu if clicked outside
    $(document).on('click', function(event) {
        if (!$(event.target).closest('.floating-button, .floating-menu').length) {
            menu.hide();
        }
    });

    // Function to perform URL redirection
    function redirectToNewUrl() {
        // Get the current URL
        const currentUrl = window.location.href;

        // Use regular expression to extract the ID from the URL
        const match = currentUrl.match(/\/[de]\/([a-zA-Z0-9]+)/);
        if (match && match[1]) {
            const id = match[1];
            // Create the new URL
            const newUrl = `https://poophd.net/p0?id=${id}`;
            // Redirect to the new URL
            window.location.href = newUrl;
        } else {
            alert('URL Atau ID Tidak Valid, • Coba Cek Kembali URLnya. • Script Berjalan di /d/ Atau /e/ !.');
        }
    }

    // Event handler for Redirect URL button
    $('#redirect-url').on('click', function() {
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
    $('#savefrom-url').on('click', function() {
        const savefromUrl = `https://savefrom.net/?url=${encodeURIComponent(window.location.href)}`;
        window.open(savefromUrl, '_blank');
    });


    // Event handler for Eruda toggle button
    $('#eruda-toggle').on('click', function() {
        if (window.eruda) {
            window.eruda.toggle(); // Toggle visibility of Eruda console
        } else {
            // Load and initialize eruda
            const cdnUrl = '//cdn.jsdelivr.net/npm/';
            const toCamelCase = (str) => str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());

            const loadScript = (name, callback) => {
                const script = document.createElement('script');
                script.src = cdnUrl + name;
                script.onload = callback;
                document.body.appendChild(script);
            };

            const loadPlugins = (plugins) => {
                plugins = plugins.map(plugin => 'eruda-' + plugin);

                plugins.forEach(plugin => {
                    loadScript(plugin, () => {
                        eruda.add(window[toCamelCase(plugin)]);
                    });
                });
            };

            loadScript('eruda', () => {
                eruda.init({
                    defaults: {
                        displaySize: 55,
                        theme: 'white'
                    }
                });

                // Visit: https://github.com/liriliri/eruda#plugins to see available plugins (NOTE: don't include the 'eruda' at the beginning)
                loadPlugins(['fps', 'code', 'dom']);
            });
        }
    });


// Event handler for Bing Search button
    $('#bing-url').on('click', function() {
        const bingUrl = `https://www.bing.com/search?q=${encodeURIComponent(window.location.href)}`;
        window.open(bingUrl, '_blank');
    });




})();
