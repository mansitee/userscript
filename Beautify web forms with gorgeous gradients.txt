// ==UserScript==
// @name Beautify web forms with gorgeous gradients
// @description  Automatically apply color gradients to all columns of the table to beautify it
// @grant        none
// @match        *://*/*
// @author       Yearly,人民的勤务员 <toniaiwanowskiskr47@gmail.com>
// @namespace    https://github.com/ChinaGodMan/UserScripts
// @supportURL              https://github.com/ChinaGodMan/UserScripts/issues
// @homepageURL   https://github.com/ChinaGodMan/UserScripts
// @license      MIT
// @icon         data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjgwMCIgdmlld0JveD0iMCAwIDExIDExIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiM0NEMiIGQ9Ik0wIDBoNHYzSDB6Ii8+PHBhdGggZmlsbD0iIzRDNCIgZD0iTTAgNGg0djNIMHoiLz48cGF0aCBmaWxsPSIjQzQ0IiBkPSJNMCA4aDR2M0gweiIvPjxwYXRoIGZpbGw9IiM0Q0MiIGQ9Ik01IDBoMTF2M0g1eiIvPjxwYXRoIGZpbGw9IiNDQzQiIGQ9Ik01IDRoMTF2M0g1eiIvPjxwYXRoIGZpbGw9IiNDNEMiIGQ9Ik01IDhoMTF2M0g1eiIvPjwvc3ZnPg==
// @compatible     chrome
// @compatible     firefox
// @compatible     edge
// @compatible     opera
// @compatible     safari
// @version 1.0.0.8
// @Created         2024-09-06 05:02:49
// @modified        2024-09-06 05:02:49
// ==/UserScript==
(function () {
    'use strict'
    const POLL_INTERVAL = 1000
    const HUE_RANGE = 120 // Hue range for the gradient (green to red or red to green)
    const SATURATION = '80%'
    const LIGHTNESS = '88%'
    function applyGradientToColumn(table, column) {
        const rowCount = table.rows.length
        Array.from(table.rows).forEach((row, index) => {
            const cell = row.cells[column]
            if (!cell) return
            // Calculate a hue based on the row index (no need to rely on cell content)
            const hue = (index / (rowCount - 1)) * HUE_RANGE
            // Apply the gradient color to the cell
            cell.style.backgroundColor = `hsl(${HUE_RANGE - hue}, ${SATURATION}, ${LIGHTNESS})`
        })
    }
    function initializeTable(table) {
        if (table.hasAttribute('data-gradient-initialized')) return
        table.setAttribute('data-gradient-initialized', 'true')
        const columnCount = table.rows[0]?.cells.length || 0
        for (let col = 0; col < columnCount; col++) {
            applyGradientToColumn(table, col)
        }
    }
    function initializeTables() {
        document.querySelectorAll('table:not([data-gradient-initialized])').forEach(initializeTable)
    }
    // Initial call and setup interval to handle dynamically loaded tables
    initializeTables()
    setInterval(initializeTables, POLL_INTERVAL)
})()