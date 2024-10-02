// ==UserScript==
// @name         Floating Assistant Button
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Adds a floating assistant button to the center of the page, which reveals a menu on click
// @author       You
// @match        *://*/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // Create the floating assistant button
    const button = document.createElement('div');
    button.style.position = 'fixed';
    button.style.bottom = '0px';
    button.style.left = '50%'; // Center horizontally

    button.style.transform = 'translateX(-50%)'; // Adjust for exact centering
    button.style.backgroundColor = '#fff';
    button.style.color = '#000';
    button.style.borderRadius = '50%';
    button.style.width = '50px';
    button.style.height = '50px';
    button.style.display = 'flex';
    button.style.alignItems = 'center';
    button.style.justifyContent = 'center';
    button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    button.style.zIndex = '10000';
    button.style.cursor = 'pointer';
     button.style.transition = 'background-color 0.3s, transform 0.3s';
    button.textContent = '➕'; // Button content

    // Create the floating assistant menu
    const assistantMenu = document.createElement('div');
    assistantMenu.style.position = 'fixed';
    assistantMenu.style.bottom = '80px'; // Place it above the button
    assistantMenu.style.left = '50%'; // Center horizontally
    assistantMenu.style.transform = 'translateX(-50%)'; // Adjust for exact centering
    assistantMenu.style.width = '250px';
    assistantMenu.style.backgroundColor = '#333';
    assistantMenu.style.color = '#fff';
    assistantMenu.style.borderRadius = '8px';
    assistantMenu.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    assistantMenu.style.zIndex = '10000';
    assistantMenu.style.padding = '10px';
    assistantMenu.style.boxSizing = 'border-box';
    assistantMenu.style.display = 'none'; // Initially hidden

    // Create the menu
    const menu = document.createElement('div');
    menu.style.display = 'flex';
    menu.style.justifyContent = 'space-around';
    menu.style.marginBottom = '10px';

    // Define menu items with links
    const menuItems = [
        { text: 'Home', href: 'https://example.com/home' },
        { text: 'About', href: 'https://example.com/about' },
        { text: 'Contact', href: 'https://example.com/contact' }
    ];

    menuItems.forEach(item => {
        const link = document.createElement('a');
        link.href = item.href;
        link.style.color = '#fff';
        link.style.textDecoration = 'none';
        link.style.fontSize = '14px';
        link.style.margin = '0 5px';
        link.textContent = item.text;
        link.addEventListener('click', (e) => {
            e.preventDefault();
            window.open(item.href, '_blank');
        });
        menu.appendChild(link);
    });

    // Create the content area
    const content = document.createElement('div');
    content.style.textAlign = 'center';
    content.innerHTML = '<h4>Assistant</h4><p>Here to help!</p>';

    // Append menu and content to the assistant menu
    assistantMenu.appendChild(menu);
    assistantMenu.appendChild(content);

    // Append button and menu to the body
    document.body.appendChild(button);
    document.body.appendChild(assistantMenu);

    // Toggle menu visibility on button click
    button.addEventListener('click', () => {
        assistantMenu.style.display = assistantMenu.style.display === 'none' ? 'block' : 'none';
    });
})();
