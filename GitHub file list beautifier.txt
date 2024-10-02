// ==UserScript==
// @name        GitHub file list beautifier
// @description Adds colors to files by type, displays small images in place of file-type icons in a repository source tree    
// @license     MIT
// @version     4.1.0.0
// @match       https://github.com/*
// @grant       none
// @run-at      document-start
// @grant       GM_xmlhttpRequest
// @grant       GM_getValue
// @grant       GM_setValue
// @compatible     chrome
// @compatible     firefox
// @compatible     edge
// @compatible     opera
// @compatible     safari
// @author      wOxxOm,人民的勤务员 <toniaiwanowskiskr47@gmail.com>
// @namespace  https://github.com/ChinaGodMan/UserScripts
// @license      MIT
// @supportURL              https://github.com/ChinaGodMan/UserScripts/issues
// @homepageURL   https://github.com/ChinaGodMan/UserScripts

// ==/UserScript==
'use strict'
let customColors = GM_getValue("fileTypesColors", {})
if (Object.keys(customColors).length === 0) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'https://raw.githubusercontent.com/ChinaGodMan/UserScripts/main/Script%20details/github-file-list-beautifier-plus/colors.json',

        onload: function (response) {
            try {
                customColors = JSON.parse(response.responseText)
                GM_setValue("fileTypesColors", customColors) // 保存到本地存储
                requestAnimationFrame(start)
            } catch (e) {
                console.error('解析颜色配置失败:', e)
            }
        },
        onerror: function () {
            console.error('加载颜色配置失败')
        }
    })
} else {
    requestAnimationFrame(start)
}
let savedConfig = {}
try {
    savedConfig = JSON.parse(localStorage.FileListBeautifier) || {}
} catch (e) { }
const config = Object.assign({},
    ...Object.entries({
        iconSize: 24,
        colorSeed1: 13,
        colorSeed2: 1299721,
        colorSeed3: 179426453,
    }).map(([k, v]) => ({ [k]: +savedConfig[k] || v })))
const IMG_CLS = 'wOxxOm-image-icon'
const rxImages = /^(png|jpe?g|bmp|gif|cur|ico|svg)$/i
const styleQueue = []
const { sheet } = document.documentElement.appendChild($create('style', {
    textContent: /*language=CSS*/ `
    .${IMG_CLS} {
      width: ${config.iconSize}px;
      height: ${config.iconSize}px;
      object-fit: scale-down;
      margin: 0 -4px;
    }
     .qinwuyuan-file-icon {
      width: 16px; 
      height: 16px; 
      object-fit: scale-down;
      margin: 0 -4px;
    }
    a[file-type=":folder"] {
      font-weight: bold;
    }
    `.replace(/;/g, '!important;'),
}))
const filetypes = {}
const ME = Symbol(GM_info.script.name)
const ob = new MutationObserver(start)
let lumaBias, lumaFix, lumaAmp
function start() {
    beautify()
    ob.observe(document, { subtree: true, childList: true })
}
function beautify() {
    for (const el of document.querySelectorAll('.react-directory-truncate, .js-navigation-open')) {
        if (ME in el)
            continue
        el[ME] = true
        const isOld = el.tagName === 'A'
        const a = isOld ? el : el.getElementsByTagName('a')[0]
        const url = a && a.href
        if (!url)
            continue
        const icon = el.closest(isOld ? '.js-navigation-item' : 'td').querySelector('svg')
        if (icon.classList.contains(isOld ? 'octicon-file-directory-fill' : 'icon-directory')) {
            a.setAttribute('file-type', ':folder')
            continue
        }
        const filename = url.split('/').pop()
        const ext = url.match(/\.(\w+)$|$/)[1] || filename
        a.setAttribute('file-type', ext)
        const customIcon = customColors[filename] && customColors[filename].icon
            ? customColors[filename].icon
            : (customColors[ext] && customColors[ext].icon) || null
        if (!filetypes[ext])
            addFileTypeStyle(ext)
        if (customIcon) {
            let iconUrl = customIcon
            if (iconUrl && !iconUrl.startsWith('https://')) {
                iconUrl = `https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/icons/${iconUrl}.svg`
                console.log(iconUrl)
            }
            const img = $create('img', {
                className: "qinwuyuan-file-icon",
                src: iconUrl,
                alt: ext,
            })
            icon.replaceWith(img)
        } else if (rxImages.test(ext)) {
            const m = url.match(/github\.com\/(.+?\/)blob\/(.*)$/)
            const next = icon.nextElementSibling
            if (!m || next && next[ME])
                continue
            icon.replaceWith($create('img', {
                [ME]: true,
                className: IMG_CLS,
                src: `https://raw.githubusercontent.com/${m[1]}${m[2]}`,
            }))
        }
    }
}

function addFileTypeStyle(type) {
    filetypes[type] = true
    if (!styleQueue.length)
        requestAnimationFrame(commitStyleQueue)
    styleQueue.push(type)
}
function commitStyleQueue() {
    if (!lumaAmp) initLumaScale()
    const seed2 = config.colorSeed2
    const seed3 = config.colorSeed3
    for (const type of styleQueue) {
        const colorConfig = customColors[type]
        if (colorConfig) {
            const color = colorConfig.color
            if (color) {
                sheet.insertRule(/*language=CSS*/ `
                a[file-type="${type}"]:not(#foo) {
                  color: ${color} !important;
                }
              `)
            }
        } else {
            const hash = calcSimpleHash(type)
            const H = hash % 360
            const Hq = H / 60
            const S = hash * seed2 % 50 + 50 | 0
            const redFix = (Hq < 1 ? 1 - Hq : Hq > 4 ? (Hq - 4) / 2 : 0)
            const blueFix = (Hq < 3 || Hq > 5 ? 0 : Hq < 4 ? Hq - 3 : 5 - Hq) * 3
            const L = hash * seed3 % lumaAmp + lumaBias + (redFix + blueFix) * lumaFix * S / 100 | 0
            sheet.insertRule(/*language=CSS*/ `
            a[file-type="${type}"]:not(#foo) {
              color: hsl(${H},${S}%,${L}%) !important;
            }
          `)
        }
    }
    styleQueue.length = 0
}
function calcSimpleHash(text) {
    let hash = 0
    for (let i = 0, len = text.length; i < len; i++)
        hash = ((hash << 5) - hash) + text.charCodeAt(i)
    return Math.abs(hash * config.colorSeed1 | 0)
}
function initLumaScale() {
    const [, r, g, b] = getComputedStyle(document.body).backgroundColor.split(/[^\d.]+/).map(parseFloat)
    const isDark = (r * .2126 + g * .7152 + b * .0722) < 128;
    [lumaBias, lumaAmp, lumaFix] = isDark ? [30, 50, 12] : [25, 15, 0]
}
function $create(tag, props) {
    return Object.assign(document.createElement(tag), props)
}
