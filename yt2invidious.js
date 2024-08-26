// ==UserScript==
// @name     yt2invidious oke
// @description Easily jump from yt to invidio.
// @updateURL https://openuserjs.org/meta/marcowahl/yt2invidious.meta.js
// @downloadURL https://openuserjs.org/install/marcowahl/yt2invidious.user.js
// @copyright 2019-2021, marcowahl (https://openuserjs.org/users/marcowahl)
// @version  2.0.2
// @include *youtube.com*
// @grant none
// @author Marco Wahl
// @namespace https://gitlab.com/marcowahl/yt2invidious
// @licence GPL-3.0-or-later; http://www.gnu.org/licenses/gpl-3.0.txt
// @homepageURL https://gitlab.com/marcowahl/yt2invidious
// @icon https://youtube.com/favicon.ico
// ==/UserScript==

function invidio_url() {
  const this_url = window.location.href
  const index_of_watch = this_url.indexOf("watch")
  let watch_spec = this_url.slice(index_of_watch)
  const index_of_ampersand = watch_spec.indexOf("&")
  if (-1 < index_of_ampersand)
    watch_spec = watch_spec.slice(0, index_of_ampersand)
  return "https://invidious.fdn.fr/" + watch_spec
  // https://invidious.fdn.fr/ 20200904: looks good.
  // https://invidiou.site/ 20200904: no videos.
}

const element = document.createElement("button")
element.innerHTML = "invidious"
element.style.left = "10px"
element.style.top = "0px"
element.style.padding = "10px 10px 20px 10px"
element.style.position = "fixed"
element.style.background = "orange"
element.style.zIndex = 99999
element.onclick = function () {
  window.location = invidio_url()
}
document.body.appendChild(element)

document.onfullscreenchange = function (event) {
  if (document.fullscreenElement) {
    document.body.removeChild(element)
  }
  else {
    document.body.appendChild(element)
  }
}

// {{{ changelog :

// [2021-07-14 Wed] Homepage url points directly to repo.  Update (c)
// year.

// [2020-09-04 Fri] 2.0.2 Switch to yewtu.be since invidiou.site did
// not provide any video.

// [2020-09-01 Tue] 2.0.0 invidio.us has closed down. Looks like
// invidiou.site is an alternative. Using this url.

// [2020-02-14 Fri] 1.2.0 No button when fullscreen.  (Thanks and all
// credits to infeeeee@gitlab.)

// [2020-02-07 Fri] 1.1.2 Fix cut off further parameters in the url.

// [2020-01-12 Sun] 1.1.1 Rollback to button since the link remains
// when switching to other videos.  I.e. the link does not follow the
// current video.

// [2020-01-12 Sun] 1.1.0 A simple link leads to invidious.  This
// replaces the former button.  This allows using the "open in new
// tab" feature.

// }}}

// {{{ contact :

// Post at https://openuserjs.org/scripts/marcowahl/yt2invidious/issues.

// Request a pull at https://gitlab.com/marcowahl/yt2invidious.

// }}}