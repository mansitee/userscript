// ==UserScript==
// @name         TamperTube 📺
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Simple youtube downloader with a selfmade API ! 📺
// @author       vodkarm
// @run-at       document-end
// @match        *://*.youtube.com/watch?v=*
// @match        https://*.youtube.com/*
// @match        https://m.youtube.com/*
// @match        https://www.youtube.com/*
// @license      MIT
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @downloadURL https://update.greasyfork.org/scripts/459671/TamperTube%20%F0%9F%93%BA.user.js
// ==/UserScript==

(function() {
    'use strict';
    // don't skid
    // author is vodkarm
    // github.com/vodkarm
    const el = document.createElement( 'div' );

    el.innerHTML = `<style>
@import url('https://fonts.googleapis.com/css2?family=Itim&display=swap');

h1 {font-size: 18px;}
* {font-size: 15px;}

.dialog {
    font-family: 'Itim', cursive;
	tposition: absolute;display:flex; 
	left: 50%;
	top:97%;height:40px;
 position:fixed;
	padding:0px;
	background:white;
	color: #fff;
	transform: translate(-50%, -50%);
	text-align: center;
	z-index: 999999;
	min-width: 400px;
	max-width: 400px; }

.dialog * {	color: #000;}

.close {
	position: absolute;
	right: 30px;
	top:5px;
	width: 20px;
	height: 20px;
	opacity: 0.5;
	cursor: pointer;
margin-left:20px;
background: #333;
}

.close:before, .close:after {
	content: ' ';
	position: absolute;
	left: 50%;
	top: 50%;
	width: 100%;
	height: 20%;
	transform: translate(-50%, -50%) rotate(-45deg);
	background: #fff;
}

.close:after {
	transform: translate(-50%, -50%) rotate(45deg);
}

.close:hover {
	opacity: 1;
}

.btn {cursor: pointer;
	padding:10px;
	background:#f2f2f2;
	tborder:1px solid rgba(0, 0, 0, 0.2); Border-radius:10px;
	font-size:16px;}

.btn:active {
	transform: scale(0.8);
}

.msg {
	position: absolute;
	left: 10px;
	bottom: 10px;
	color: #fff;
	background: rgba(0, 0, 0, 0.6);
	font-weight: bolder;
	padding: 15px;
	animation: msg 0.5s forwards, msg 0.5s reverse forwards 3s;
	z-index: 999999;
	pointer-events: none;
}

</style>
<div class="msg" style="display: none;"></div>
<div class="dialog">
    <div class="close" onclick="this.parentNode.style.display='none';"></div> 
	<div style="display:flex;  grid-gap:5px;margin-right:40px;margin-left:20px;overflow-x: auto; white-space: nowrap;">
		<div class="btn" onclick="alert('Pemuatan halaman mungkin lama jika Anda mencoba mendownload video panjang, harap bersabar :)'); window.open('https://yt1s.com/en/youtube-to-mp4?q=${window.location.href}', '_blank');">📺 YT1S</div>
		<div class="btn" onclick="alert('Pemuatan halaman mungkin lama jika Anda mencoba mendownload video panjang, harap bersabar:)'); window.open('https://id.savefrom.net/247/#url=${window.location.href}', '_blank');">🎧Savefrom</div>
        <div class="btn" onclick="window.open('https://github.com/vodkarm', '_blank')">💻 Github</div>

<div class="btn" onclick="window.open('https://github.com/vodkarm', '_blank')">💻 Github</div>

<div class="btn" onclick="window.open('https://github.com/vodkarm', '_blank')">💻 Github</div>
        <div class="btn" onclick="window.open('https://t.me/vodkarm', '_blank')">💬 Contact</div>
	</div>
</div>`;
    const msgEl = el.querySelector( '.msg' );
    const dialogEl = el.querySelector( '.dialog' );

    while ( el.children.length > 0 ) {

        document.body.appendChild( el.children[ 0 ] );

    }


})();