function navToggle() {
	var btn = document.getElementById("nav__btn-toggle");
	var links = document.getElementById("nav__links-toggle");
	btn.classList.toggle("nav__btn-active");
	links.classList.toggle("nav__links-active");
}

function popupToggle() {
	var popup = document.getElementsByClassName("popup")[0];
	popup.classList.toggle("popup-opened");
}




function ReadMore(el, toggle_class) {
	var a = el.nextElementSibling;
	a.classList.toggle(toggle_class);
}

function siblings(elem) {
    return Array.from(elem.parentNode.children).filter(el => el !== elem);
}


function EnableChapter(chapter, el) {
	var a = ["standart", "admin", "dev", "economics", "games"];
	var b = 0;
	var c = [];

	el.classList.add("commands__chapter-active");
	var siblins = siblings(el);

	for(let sib of siblins) {
		sib.classList.remove("commands__chapter-active");
	}

	while (b <= a.length-1) {
		c.push(document.getElementsByClassName("commands__" + a[b]));
		b++;
	}
	var y = 0;
	// console.log(var user = detect.parse(navigator.userAgent).browser)
	for(let subArr of c ) {
		for(let elem of Array.from(subArr)) {
			if (elem.classList[1] === "commands__" + chapter) {
				elem.classList.add("commands__show");
			} else {
				elem.classList.remove("commands__show");
			}
		}	
	}

}
//Проверка бразуера
let web_url = `${window.location.origin}${window.location.pathname}`;

function getBrowser() {
    var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
    if(/trident/i.test(M[1])){
        tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
        return {name:'IE',version:(tem[1]||'')};
    }
    if(M[1]==='Chrome'){
        tem=ua.match(/\bOPR|Edge\/(\d+)/)
        if(tem!=null)   {return {name:'Opera', version:tem[1]};}
        }   
    M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
    return {
      name: M[0],
      version: M[1]
    };
}

function detectOS() {
    const platform = navigator.platform.toLowerCase(),
        iosPlatforms = ['iphone', 'ipad', 'ipod', 'ipod touch'];

    if (platform.includes('mac')) return 'MacOS';
    if (iosPlatforms.includes(platform)) return 'iOS';
    if (platform.includes('win')) return 'Windows';
    if (/android/.test(navigator.userAgent.toLowerCase())) return 'Android';
    if (/linux/.test(platform)) return 'Linux';

    return 'unknown';
}

const range = (l,r) => new Array((r + 1) - l).fill().map((_,k) => k + l);

const oldVersions = {
	"Windows": {
		"Chrome": range(49, 55),
		"Opera": range(1, 9),
		"Firefox": range(1, 12),
		"Safari": range(1, 6),
		"Msie": range(1, 9)
	},
	"Android": {
		"Chrome": range(1, 3),
		"Opera": range(1, 12),
		"Firefox": [],
		"Safari": range(1, 6),
		"Msie": range(1, 9)
	},
	"MacOS": {},
	"Linux": {},
	"iOS": {}

}
window.onload = function () {
	document.body.classList.add('loaded_hiding');
	window.setTimeout(function () {
    	document.body.classList.add('loaded');
   		document.body.classList.remove('loaded_hiding');
  }, 1000);
}
console.log(detectOS());
console.log(getBrowser().name);
console.log(getBrowser().version);

if (oldVersions[detectOS()][getBrowser().name].includes(parseInt(getBrowser().version))) { popupToggle() };