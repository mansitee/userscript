// ==UserScript==
// @name            Xvideos OK
// @namespace        https://greasyfork.org/es/users/758165-AlÉxito
// @include           https://www.xvideos.com/*
// @version           0.2
// @author            AlExito
// @description         Download videos from xvideos adult site directly without registration
// @grant            GM_xmlhttpRequest
// @grant            GM_download
// @license           MIT   feel free to modify improve and share
// @icon             https://static-cdn77.xvideos-cdn.com/v3/img/skins/default/logo/xv.black.16.png
// ==/UserScript==

function star() {
document.querySelector('#xvid').textContent = "Working....";
      var url = window.location.href;
GM_xmlhttpRequest({
  method: "GET",
  url: url,
  headers: {
    "Content-Type": "application/json"
  },
  onload: function(response) {
    const page = response.responseText.toString();
    const urlhigh = page.match(/.+html5player.setVideoUrlHigh.+/g).toString().replace("html5player.setVideoUrlHigh('", "").replace("');", "").replace(/\s/g, "");
    navigator.clipboard.writeText(urlhigh);
    var title = document.title.replace(" - XVIDEOS.COM", ".mp4");
      var arg = { url: urlhigh, name: title, saveAs: false };
      GM_download(arg);
      document.querySelector('#xvid').textContent = "Donwload";
  }
});
};
    function Boton2() {
        var aBoton2 = document.createElement("div");
        var aEtiqueta2 = document.createElement("p");
        aBoton2.id = "xvid";
        aBoton2.style.position = "absolute";
        aBoton2.style.zIndex = "10000";
        aBoton2.style.padding = "1px 5px 1px 5px";
        aBoton2.style.backgroundColor = "#35374a";
        aBoton2.style.width = "auto";
        aBoton2.style.cursor = "pointer";
        aBoton2.style.bottom = "10px";
        aBoton2.style.left = "-0px";
        aBoton2.style.display = "contents";
        aEtiqueta2.textContent = "Donwload OK";
        aEtiqueta2.style.color = "red";
       aBoton2.style.border = "2px solid #333";
aBoton2.style.borderRadius = "5px";  
aBoton2.style.textAlign = "center";  
aBoton2.style.fontWeight = "bold";
aBoton2.style.fontSize = "25px";  
aBoton2.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.2)"; 
        document.querySelector('#video-tabs').appendChild(aBoton2);
        aBoton2.appendChild(aEtiqueta2);

        aBoton2.onclick = function () {
          star();
        };
    }
Boton2();