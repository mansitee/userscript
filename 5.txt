// ==UserScript==
// @name         Floating Assistant
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds a floating assistant with a horizontal pop-up menu aligned with the button and scrollable horizontally with links
// @author       You
// @match        *://*/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // Create the floating assistant container
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.bottom = '10px'; // Position from the bottom
    container.style.left = '0px';   // Position from the left
    container.style.display = 'flex'; // Align items horizontally
    container.style.alignItems = 'center'; // Vertically center items
    container.style.zIndex = '10000000';

    // Create the floating assistant button
    const assistant = document.createElement('div');
    assistant.style.width = '50px';
    assistant.style.height = '40px';
    assistant.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'; // Semi-transparent white
    assistant.style.backdropFilter = 'blur(8px)'; // Apply background blur
    assistant.style.color = '#333';
    assistant.style.fontSize = '25px';
    assistant.style.fontWeight = 'bold'; // Make font bold
    assistant.style.fontFamily = 'Arial, sans-serif'; // Set font family
    assistant.style.display = 'flex';
    assistant.style.alignItems = 'center';
    assistant.style.justifyContent = 'center';
    assistant.style.borderRadius = '0 20px 20px 0'; // Rounded corners
    assistant.style.boxShadow = '2px 2px 10px rgba(0, 0, 0, 0.3)'; // Adjust box shadow
    assistant.style.cursor = 'move'; // Change cursor to pointer on hover
    assistant.style.position = 'relative'; // Position relative for menu positioning

    // Add SVG for the menu icon
    assistant.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6H21V8H3V6ZM3 11H21V13H3V11ZM3 16H21V18H3V16Z" fill="#333"/>
        </svg>
    `;

    // Create the menu element
    const menu = document.createElement('div');
    menu.style.position = 'absolute';
    menu.style.top = '50%'; 
    menu.style.left = '60px'; 
    menu.style.transform = 'translateY(-50%)'; 
    menu.style.width = '300px'; 
    menu.style.height = 'auto'; 
    menu.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'; 
    menu.style.backdropFilter = 'blur(4px)'; 
    menu.style.color = '#333';
    menu.style.fontSize = '16px';
    menu.style.fontWeight = 'normal';
    menu.style.fontFamily = 'Arial, sans-serif'; 
    menu.style.borderRadius = '10px';
    menu.style.boxShadow = '2px 2px 10px rgba(0, 0, 0, 0.3)'; 
    menu.style.zIndex = '10000001'; 
    menu.style.display = 'none'; 
    menu.style.flexDirection = 'row';
    menu.style.padding = '5px';
    menu.style.overflowX = 'auto';
    menu.style.overflowY = 'hidden'; 
    menu.style.whiteSpace = 'nowrap';
 menu.style.maxWidth = '500px';
    menu.style.minWidth = '200px';


    // Add menu items with links
    menu.innerHTML = `
        <a href="https://example.com/page1" style="display: inline-block; padding: 10px; border-right: 1px solid #ddd; text-decoration: none; color: #333; cursor: pointer;">Item 1</a>
        <a href="https://example.com/page2" style="display: inline-block; padding: 10px; border-right: 1px solid #ddd; text-decoration: none; color: #333; cursor: pointer;">Item 2</a>
        <a href="https://example.com/page3" style="display: inline-block; padding: 10px; border-right: 1px solid #ddd; text-decoration: none; color: #333; cursor: pointer;">Item 3</a>
        <a href="https://example.com/page4" style="display: inline-block; padding: 10px; border-right: 1px solid #ddd; text-decoration: none; color: #333; cursor: pointer;">Item 4</a>
        <a href="https://example.com/page5" style="display: inline-block; padding: 10px; border-right: 1px solid #ddd; text-decoration: none; color: #333; cursor: pointer;">Item 5</a>
        <a href="https://example.com/page6" style="display: inline-block; padding: 10px; border-right: 1px solid #ddd; text-decoration: none; color: #333; cursor: pointer;">Item 6</a>
        <a href="https://example.com/page7" style="display: inline-block; padding: 10px; border-right: 1px solid #ddd; text-decoration: none; color: #333; cursor: pointer;">Item 7</a>
        <a href="https://example.com/page8" style="display: inline-block; padding: 10px; border-right: 1px solid #ddd; text-decoration: none; color: #333; cursor: pointer;">Item 8</a>
        <a href="https://example.com/page9" style="display: inline-block; padding: 10px; text-decoration: none; color: #333; cursor: pointer;">Item 9</a>
    `;

    // Append the menu to the assistant
    assistant.appendChild(menu);

    // Add click event to toggle menu visibility
    assistant.addEventListener('click', () => {
        menu.style.display = menu.style.display === 'none' ? 'flex' : 'none';
    });

    // Append the floating assistant container to the body
    container.appendChild(assistant);
    document.body.appendChild(container);
})();
