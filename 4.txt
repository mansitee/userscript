// ==UserScript==
// @name         Floating Assistant
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Adds a floating assistant to the bottom-right corner of the page with a blurred background
// @author       You
// @match        *://*/*
// @grant        none
// @run-at       document-start
// ==/UserScript==
 
(function() {
    'use strict';

    // Create the floating assistant element
    const assistant = document.createElement('div');
    assistant.style.position = 'fixed';
    assistant.style.bottom = '60%';
    assistant.style.left = '0px';
    assistant.style.width = '50px';
    assistant.style.height = '40px';
    assistant.style.backgroundColor = 'rgba(255, 255, 255, 0.4)'; // Semi-transparent white
    assistant.style.backdropFilter = 'blur(8px)'; // Apply background blur
    assistant.style.color = '#333';
    assistant.style.fontSize = '25px';
    assistant.style.fontWeight = 'bold';  // Make font bold
    assistant.style.fontFamily = 'Arial, sans-serif';  // Set font family
    assistant.style.display = 'flex';
    assistant.style.alignItems = 'center';
    assistant.style.justifyContent = 'center';
    assistant.style.borderRadius = '0px 20px 20px 0px';
    assistant.style.boxShadow = '2px 2px 10px rgba(0, 0, 0, 0.3)';  // Adjust box shadow
    assistant.style.zIndex = '10000000';

    // Add SVG for the menu icon
    assistant.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6H21V8H3V6ZM3 11H21V13H3V11ZM3 16H21V18H3V16Z" fill="#333"/>
        </svg>
    `;

    // Append the floating assistant to the body
    document.body.appendChild(assistant);
})();