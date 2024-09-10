// ==UserScript==
// @name         Remove Google Consent
// @namespace    google
// @version      0.0.1
// @description  Autohide Accepts Cookies
// @author       uazo
// @match        https://*.google.com/search?*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    var prepareStyleSheet = function() {
        var style = document.createElement('style');
        //style.setAttribute('media', 'screen');
        style.appendChild(document.createTextNode(''));
        document.head.appendChild(style);
        style.sheet.insertRule('body { overflow:scroll !important;position:unset !important }');
    };
	
	var hideConsent = function() {
		document.getElementById("lb").style.display = "none";
	};

    var checkElementThenRun = function(selector, func) {
        var el = document.querySelector(selector);
        if ( el == null ) {
            if (window.requestAnimationFrame != undefined) {
                window.requestAnimationFrame(function(){ checkElementThenRun(selector, func)});
            } else {
                document.addEventListener('readystatechange', function(e) {
                    if (document.readyState == 'complete') {
                        func();
                    }
                });
            }
        } else {
            func();
        }
    }

    document.cookie = 'CONSENT=YES+IT.it+V13+BX;domain=.google.com';
    checkElementThenRun('head', prepareStyleSheet);
    checkElementThenRun('#lb', hideConsent);
})();