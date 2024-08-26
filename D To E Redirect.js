// ==UserScript==
// @name         D To E Redirect oke
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Redirects from /d/ to /e/ on ds2play.com
// @author       Your Name
// @match        https://*/d/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    // Get the current URL
    const currentURL = window.location.href;

    // Replace /d/ with /e/ in the URL
    const newURL = currentURL.replace('/d/', '/e/');

    // Redirect to the new URL
    window.location.replace(newURL);
})();