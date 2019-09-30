// ==UserScript==
// @name     Add mappy to Risque
// @version  1
// @grant    none
// @match		 https://risque.itap.purdue.edu/Resources/
// ==/UserScript==

var sidenav = document.getElementsByClassName("sidenav")[0];
var sidenav_elements = sidenav.children[0].children;
var mappy_url = "http://128.210.166.189:8080/";
var mappy_url_internal = "http://10.160.1.21:8080/";

function containsMappy() {
  for (var i = 1; i < sidenav_elements.length; i++) {
   	if (sidenav_elements[i].innerText.toUpperCase().trim().includes('MAPPY'))
      return true;
  }
  return false;
}

function createSidenavElement(title, url) {
  var li = document.createElement('LI')
  var a = document.createElement('A')
  a.setAttribute('href', url);
  a.setAttribute('target', '_blank');
  a.innerText = title;
  li.appendChild(a);
  return li;
}

function addMappy() {
  var ele = createSidenavElement('mappy', mappy_url);
  sidenav_elements[sidenav_elements.length - 1].parentNode.insertBefore(ele, sidenav_elements[sidenav_elements.length - 1].nextSibling);
  var ele = createSidenavElement('mappy (In Office)', mappy_url_internal);
  sidenav_elements[sidenav_elements.length - 1].parentNode.insertBefore(ele, sidenav_elements[sidenav_elements.length - 1].nextSibling);
}


if (!containsMappy())
  addMappy();