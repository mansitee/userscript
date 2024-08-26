// ==UserScript==
// @name         YouTube Downloader by Savefrom.net
// @namespace    https://viayoo.com/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @run-at       document-start
// @run-at       document-end
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    /*copylink*/
function createRedirectBtn() {
    var isRedirectBtn = document.getElementById('redirectBtn');
    if (isRedirectBtn) {
        isRedirectBtn.parentNode.removeChild(isRedirectBtn);
    }
    
    var redirectBtn = document.createElement("div");
    redirectBtn.id = "redirectBtn";
    redirectBtn.setAttribute("style", "font-size:4.0vw !important;width:5vw !important;height:5vw !important;line-height:10vw !important;text-align:center !important;tbackground-color:#fff!important;tbox-shadow:0px 1px 10px rgba(0,0,0,0.2) !important;color:#000 !important;position:fixed !important;top:0px !important;right:1.9vw !important;z-index:99999 !important;border-radius:30% !important;display:flex !important;align-items:center !important;justify-content:center !important; cursor: move;");

    var svgIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" class="feather feather-youtube" fill="#ff0000"><path d="M10,16.5V7.5L16,12M20,4.4C19.4,4.2 15.7,4 12,4C8.3,4 4.6,4.19 4,4.38C2.44,4.9 2,8.4 2,12C2,15.59 2.44,19.1 4,19.61C4.6,19.81 8.3,20 12,20C15.7,20 19.4,19.81 20,19.61C21.56,19.1 22,15.59 22,12C22,8.4 21.56,4.91 20,4.4Z" /></svg>
                    
    `;
    
    redirectBtn.innerHTML = svgIcon;
    
    // Fungsi untuk menangani pergerakan tombol
    function handleDrag(event) {
        event.preventDefault();
        var offsetX = event.clientX - initialX;
        var offsetY = event.clientY - initialY;
        newX = initialBtnX + offsetX;
        newY = initialBtnY + offsetY;
        redirectBtn.style.right = "unset";
        redirectBtn.style.left = newX + 'px';
        redirectBtn.style.top = newY + 'px';
    }
    
    var isDragging = false;
    var initialX;
    var initialY;
    var initialBtnX;
    var initialBtnY;
    redirectBtn.addEventListener('mousedown', function(event) {
        isDragging = true;
        initialX = event.clientX;
        initialY = event.clientY;
        var rect = redirectBtn.getBoundingClientRect();
        initialBtnX = rect.left;
        initialBtnY = rect.top;
        document.addEventListener('mousemove', handleDrag);
    });
    
    document.addEventListener('mouseup', function() {
        isDragging = false;
        document.removeEventListener('mousemove', handleDrag);
    });
    
    redirectBtn.onclick = function () {
        var currentURL = window.location.href;
        var saveFromURL = "https://savefrom.net/?url=" + encodeURIComponent(currentURL);
        window.open(saveFromURL, '_blank');
    };
    
    document.body.appendChild(redirectBtn);
};

createRedirectBtn();
})();