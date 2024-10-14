// ==UserScript==
// @icon         https://ci.phncdn.com/www-static/favicon.ico
// @name         pornhub.com downloader
// @namespace    https://github.com/mansitee
// @version      0.1.3-01
// @description  Pornhub downloader
// @author       mansitee
// @match        *://*.pornhub.com/view_video.php?viewkey=*
// @match        *://*.pornhubpremium.com/view_video.php?viewkey=*
// @grant        unsafeWindow
// @grant        GM_setClipboard
// @grant        GM_download
// @grant        GM_addStyle
// @grant        GM_notification
// @require      https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js
// @downloadURL  https://raw.githubusercontent.com/mansitee/userscript/refs/heads/main/Pornhub downloader v1.2.user.js
// @updateURL    https://raw.githubusercontent.com/mansitee/userscript/refs/heads/main/Pornhub downloader v1.2.user.js
// ==/UserScript==

GM_addStyle(`
.download-urls ul {
  padding:10px;
  font:italic bold 15px sans-serif;color:#007bff;
display: grid;
  grid-template-columns: repeat(4, 1fr);gap:2px;}

.download-urls ul li {
  display: flex;
  align-items: center;
  height: 20px;padding: 0 5px;
  max-width:400px;}

.download-urls ul li a{
  font:italic bold 15px sans-serif;color:#fff;
border:1px solid #fff;border-radius:10px;
text-align:center;padding:5px;}

.download-urls h3{
  font:italic bold 17px sans-serif;color:#fff;
text-align:left;
padding-left:10px;}
`);


(function () {
  'use strict';

  const MutationObserver = unsafeWindow.MutationObserver || unsafeWindow.WebKitMutationObserver || unsafeWindow.MozMutationObserver;
  const mutationObserver = new MutationObserver(mutations => {
    mutationObserver.disconnect();
    setTimeout(() => {
      unsafeWindow.VideoParsing.init();
    }, 200);
  });
//PCKazuhiPC,Note that $ cannot be used as abbreviation in the judgment condition.，
  let playerdiv;//letYou can not assign a value first，Used here
  if (document.querySelector('#player')) {
    playerdiv = document.querySelector('#player');
  }
  else{
    console.log("Android");
    playerdiv = document.querySelector('.playerWrapper');
  }
  const playerDom = playerdiv;
//

  if (playerDom) {
    mutationObserver.observe(playerDom, {
      childList: true,
      subtree: true,
    });
  } else {
    console.warn('Video one-click download does not take effect！');
  }
})();

(function () {
  class VideoParsing {
    // according to key Get the value in the object with the first letter and return the array
    static getObjectValueByStartsWithChar(obj, char) {
      const vars = [];
      Object.keys(obj).forEach(key => {
        if (key.startsWith(char)) {
          vars.push({
            key: key,
            value: obj[key],
          });
        }
      });
      return vars;
    }

    // Get the download address information and return an array
    static getUrlInfo() {
      const flashvars = this.getObjectValueByStartsWithChar(unsafeWindow, 'flashvars_');
      if (!flashvars.length) {
        console.error('mistake，Video address not obtained！', flashvars);
        return;
      }

      let videosInfo = [];

      try {
        videosInfo = flashvars[0]['value']['mediaDefinitions'];
      } catch (e) {
        console.error('Error, failed to obtain video information!', e, flashvars);
        return;
      }

      let remoteAddress = undefined;
      let urlInfo = [];

      for (let i = 0; i < videosInfo.length; i++) {
        if (videosInfo[i]['remote']) {
          remoteAddress = videosInfo[i]['videoUrl'];
          break;
        }
      }

      // MP4 information
      if (remoteAddress) {
        $.ajax({
          url: remoteAddress,
          async: false,
          success: (data) => {
            if (data && data.length) {
              urlInfo = urlInfo.concat(data.map(item => ({
                quality: item.quality + '.' + item.format,
                url: item.videoUrl
              })));
            }
          }
        });
      }

      console.log(videosInfo);

      return urlInfo;
    }

    // Inject into download panel
    static injectUrls2Dom(urlInfo) {
      const li = [];

      urlInfo.forEach(item => {
        li.push(`
          <li>    
   <a target="_blank" class="download-url-copy"href="${item.url}">${item.quality}</a>
          
          </li>
        `);
      });
//pc and non-PC cases are added.
      $('.playerWrapper').after(`<div class="download-urls"><h3>Download  Available:</h3><ul>${li.join('')}</ul></div>`);
      $('#player').after(`<div class="download-urls"><h3>Download Available:</h3><ul>${li.join('')}</ul></div>`);
    }

    // initialization event
    static initEvens() {
      // Click to download and copy to the pasteboard
      $(document).on('click', '.download-url-copy', function (e) {
        e.preventDefault();
        GM_setClipboard($(this).data('href'));
        GM_notification('Download address copied successfully！', 'hint');
      });
    }

    static init() {
      this.injectUrls2Dom(this.getUrlInfo());
      this.initEvens();
    }
  }

  unsafeWindow.VideoParsing = VideoParsing;
})();
