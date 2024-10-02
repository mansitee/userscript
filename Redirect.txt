// ==UserScript==
// @name         XVideos, DToE Redirect .oke
// @namespace    https://viayoo.com/
// @version      0.1.2
// @description  Redirect to embed URL for Xvideos
// @author       mansitee
// @match        https://www.xvideos.com/video.*
// @match        *://*/d/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_notification
// @grant        GM_xmlHttpRequest
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    const currentUrl = window.location.href;
    const videoIdMatch = currentUrl.match(/\/video\.([a-zA-Z0-9]+)/);
    
    if (videoIdMatch && videoIdMatch[1]) {
        const videoId = videoIdMatch[1];
        const newUrl = `https://www.xvideos.com/embedframe/${videoId}/`;
        window.location.replace(newUrl);
    }
    
    
    
    // Ensure the script runs only when the document is still loading
    const redirect = () => {
        // Get the current URL
        const currentURL = window.location.href;

        // Replace /d/ with /e/ in the URL
        const newURL = currentURL.replace('/d/', '/e/');

        // Redirect to the new URL
        if (currentURL !== newURL) {
            window.location.replace(newURL);
        }
    };

    // Run the redirect function
    redirect();
})();


