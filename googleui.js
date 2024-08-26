// ==UserScript==
// @name        Google Card-Style UI
// @description Greatly Beautify Google UI!
// @author      Fei Sun
// @version     2.0.3
// @include       *://*.google.*/search*
// @namespace https://openuserjs.org/users/Thesunfei
// @license MIT
// ==/UserScript==
/*jshint multistr: true */
let CSSBlock = document.createElement("style");
let commonCSSText = `
.vt6azd,.g,.tF2Cxc.asEBEc {
  margin-bottom:5px;
}
.cu-container {
  display: none;
}
.srp {
--center-width: 692px;
}
.v6U7rf{background-color:var(--xhUGwc);box-shadow:0px 2px 5px 0px rgba(60, 64, 67, 0.16);display:none;}

.Fh5muf{padding-top:10px;}

.hlcw0c .MjjYud {
padding:0;
box-shadow:none;
}
.HnP70e,.Ww4FFb {
  background:transparent;
}
.hpfc8d,.hlcw0c {
  padding:0;
}
`;
let darkCSSText = `
.dG2XIf,.sG4Xue,g-inner-card, .euDXsc .rmxqbe {
  background:transparent;
}
.MjjYud,.hlcw0c{
  padding:20px;
  background-color:#2d3137;
  margin-bottom:20px;
  border-radius:10px;
}
.k8XOCe {
background:#26272a;
}
.FalWJb {
background:transparent;
}
`;
let lightCSSText = `
.MjjYud,.hlcw0c{
  padding:20px;
  background-color:#fff;
  margin-bottom:5px;
  margin:15px;
  border-radius:10px;
  box-shadow:2px 2px 15px rgba(0,0,0,.08);
}`;
(function () {
  CSSBlock.innerHTML = commonCSSText;
  if (getComputedStyle(document.body)["background-color"] != "rgb(255, 255, 255)") {
    CSSBlock.innerHTML += darkCSSText;
  }
  else {
    CSSBlock.innerHTML += lightCSSText;
  }
  document.body.appendChild(CSSBlock);
})();