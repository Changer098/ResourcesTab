// ==UserScript==
// @name     Resource Tab for Risque
// @version  0.2
// @grant    none
// @description  Adds a Resource "Tab" back to Risque
// @require	 https://cdn.jsdelivr.net/npm/micromodal/dist/micromodal.min.js
// @updateURL    https://raw.githubusercontent.com/Changer098/ResourcesTab/master/ResourceTab.user.js
// @downloadURL  https://raw.githubusercontent.com/Changer098/ResourcesTab/master/ResourceTab.user.js
// @include	 http://risque.itap.purdue.edu/*
// @include      https://risque.itap.purdue.edu/*
// ==/UserScript==
console.log("Loaded ResourceTab script THIS SHOULD UPDATE");
document.addEventListener('DOMContentLoaded', function() {
  ready();
});
var links = [
  ["Team Resource URLs", "https://wiki.itap.purdue.edu/pages/viewpage.action?spaceKey=DNwiki&title=Team+Resource+URLs"],
  ["BlueCat", "https://hostmaster.itap.purdue.edu/"],
  ["Cacti","https://nettools.itns.purdue.edu/cacti/"],
  ["Cisco Prime","https://prime22.itns.purdue.edu/"],
  ["Duke Current Power Outages Map","http://outagemap.duke-energy.com/in/default.html"],
  ["FootPrints","https://support.purdue.edu/"],
  ["LibreNMS","http://librenms.tcom.purdue.edu/"],
  ["Ookla Speedtest","http://speedtest.net/"],
  ["RANCID","https://rancid.itns.purdue.edu/"],
  ["SolarWinds","https://solarwinds.tcom.purdue.edu/"],
  ["Splunk","https://splunk.tcom.purdue.edu/"],
  ["Squared Up","https://status.itap.purdue.edu/SquaredUpv3/openaccess/"],
  ["StruxureWare (APC)","http://128.210.29.25/"],
  ["WeatherMap","https://nettools.itns.purdue.edu/weathermap/mapphp/rotate1.php"],
  ["Wiki","https://wiki.itap.purdue.edu/display/DNwiki/DNwiki+Home"]
];
//var MicroModal = require('micromodal');
MicroModal.init({
  onShow: modal => console.info(modal.id + ' is shown'), // [1]
  onClose: modal => console.info(modal.id + 'is hidden'), // [2]
  openTrigger: 'data-custom-open', // [3]
  closeTrigger: 'data-custom-close', // [4]
  disableScroll: true, // [5]
  disableFocus: false, // [6]
  awaitCloseAnimation: false, // [7]
  debugMode: true // [8]
});
function addStyle(rawStyle) {
  var style = document.createElement("STYLE");
  style.setAttribute('type', 'text/css');
  style.textContent = rawStyle;
  document.head.appendChild(style);
}
function addModal() {
  var div = document.createElement("DIV");
  div.innerHTML = `<div class='modal micromodal-slide' id='resourceModal' aria-hidden='true'>
<div class='modal__overlay' tabindex='-1' data-micromodal-close>
<div class='modal__container' role='dialog' aria-modal='true' aria-labelledby='resourceModal-title'>
<header class='modal__header'>
<h2 class='modal__title' id='resourceModal-title'>
Resources
</h2>
<button class='modal__close' aria-label='Close modal' data-micromodal-close></button>
</header>
<main class='modal__content' id='resourceModal-content'>
<ul id='resourceLinks' style='list-style-type: none; padding: 0'>
</ul>
</main>
</div>
</div>
</div>`;
  document.body.appendChild(div);
}
function addStyles() {
    addStyle(`.modal.is-open {
        display: block;
        }

        .modal {
        display: none;
        font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif;

        }

        .modal__overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        }

        .modal__container {
        background-color: #fff;
        padding: 30px;
        max-width: 500px;
        max-height: 100vh;
        border-radius: 4px;
        overflow-y: auto;
        box-sizing: border-box;
        }

        .modal__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        }

        .modal__title {
        margin-top: 0;
        margin-bottom: 0;
        font-weight: 600;
        font-size: 1.25rem;
        line-height: 1.25;
        color: #a37b2c;
        box-sizing: border-box;
        }

        .modal__close {
        background: transparent;
        border: 0;
        }

				.modal__header .modal__close:before {
        content: "X";
        }

        .modal__content {
        margin-top: 2rem;
        margin-bottom: 2rem;
        line-height: 1.5;
        color: rgba(0, 0, 0, .8);
        }

        .modal__btn {
        font-size: .875rem;
        padding-left: 1rem;
        padding-right: 1rem;
        padding-top: .5rem;
        padding-bottom: .5rem;
        background-color: #e6e6e6;
        color: rgba(0, 0, 0, .8);
        border-style: none;
        border-width: 0;
        cursor: pointer;
        -webkit-appearance: button;
        text-transform: none;
        overflow: visible;
        line-height: 1.15;
        margin: 0;
        will-change: transform;
        -moz-osx-font-smoothing: grayscale;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        transition: -webkit-transform .25s ease-out;
        transition: transform .25s ease-out;
        transition: transform .25s ease-out, -webkit-transform .25s ease-out;
        }
        .modal__btn:hover {
        background-color: rgb(153, 153, 153);
        color: white;
        }

        .modal__btn-primary {
        background-color: #00449e;
        color: #fff;
        }
        .modal__btn-link {
        width: 100%;
        }`);
}
function openModal() {
  MicroModal.show('resourceModal');
}
function createLinkButton(title, link) {
  var item = document.createElement("LI");
  var a = document.createElement("A");
  var button = document.createElement("BUTTON");
  button.className = "modal__btn";
  button.classList.add("modal__btn-link");
  var linkText = document.createTextNode(title);
  button.appendChild(linkText);
  a.appendChild(button);
  a.href=link;
  a.target = '_blank';
  item.appendChild(a);
  return item;
}
function populateLinks() {
  var linksList = document.getElementById("resourceLinks");
  var children = linksList.children;
  for (var i = 0; i < links.length; i++) {
    var link = links[i];
    var linkButton = createLinkButton(link[0], link[1]);
    linksList.appendChild(linkButton);
    //children[0].parentNode.insertAfter(linkButton, children[i]);
  }
}

function createButton() {
	var item = document.createElement("LI");
	var a = document.createElement('A');
	var linkText = document.createTextNode("Resources");
	a.appendChild(linkText);
	//a.title = "Resources";
	//a.href = "http://www.google.com";
	a.onclick=openModal;
	item.appendChild(a);
	return item;
}
function addButton() {
  var contents = document.getElementsByClassName("purdue-navbar-nav")[0].children; //collection of li
	var button = createButton();
  console.log("Created button: %o", button);
	var lastIndex = -1;
	for (var i = 0; i < contents.length; i++) {
		var element = contents[i];
		if (element.textContent == "Tickets") {
			lastIndex = i;
		      break;
		    }
		/*if (element.style.length > 0) {
			//found the index of the right side
			lastIndex = i;
			break;
		}*/
	}
	if (lastIndex != -1) {
		contents[lastIndex].parentNode.insertBefore(button, contents[lastIndex])
	}
}

function ready() {
  addStyles();
  addModal();
  console.log("Called ready()");
  populateLinks();
  addButton();
}
ready();
