

window.onload = async function () {

	document.body.classList.add("loaded_hiding");
	window.setTimeout(function () {
		document.body.classList.add("loaded");
		document.body.classList.remove("loaded_hiding");
	}, 1000);

	var request = new XMLHttpRequest();
	request.open('GET', './settings.json');
	request.responseType = 'json';
	request.send();

	request.onload = function() {
		let settings = request.response
		с
		let progressBar = document.getElementsByClassName("servers__progress")[0]
		let progressWidth = (progressBar.getBoundingClientRect().width - 20).toFixed()
		// let settings = await (await fetch('./settings.json')).json()
		progressBar.style.setProperty("--width", progressWidth / settings.maxServers * settings.servers + "px")

		for (settings of Object.keys(settings)) {
			if (settings === "maxServers" || settings === "servers") {
				document.getElementById(`num__servers`).innerHTML = `${settings.servers}/${settings[settings]}`;
				continue;
			}
			document.getElementById(`num__${settings}`).innerHTML = settings[settings]
		}
	}
	

}

window.onresize = async () => {
	// let progressBar = document.getElementsByClassName("servers__progress")[0]
	// let progressWidth = (progressBar.getBoundingClientRect().width - 20).toFixed()
	// let settings = await (await fetch('./settings.json')).json()

	// progressBar.style.setProperty("--width", progressWidth / settings.maxServers * settings.servers + "px")
	// console.log(window.getComputedStyle(progressBar).getPropertyValue('--width'))
	// let progressScale = window.getComputedStyle(progressBar, ':after')

	
	// console.log(progressScale)
}

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

function enableChapter(chapterName, el) {
	let siblins = siblings(el);
	let chapters = document.getElementsByClassName("commands__com")

	el.classList.add("commands__chapter-active");
	siblins.map((sinling) => sinling.classList.remove("commands__chapter-active"))

	for (let chapter of chapters) {
		if (chapter.classList.contains(`commands__${chapterName}`)) chapter.classList.add("commands__show")
		else (chapter.classList.remove("commands__show"))
	}
}

function getBrowser() {
	var ua = navigator.userAgent,
		tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
	if (/trident/i.test(M[1])) {
		tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
		return { name: "IE", version: (tem[1] || "") };
	}
	if (M[1] === "Chrome") {
		tem = ua.match(/\bOPR|Edge\/(\d+)/)
		if (tem != null) { return { name: "Opera", version: tem[1] }; }
	}
	M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
	if ((tem = ua.match(/version\/(\d+)/i)) != null) { M.splice(1, 1, tem[1]); }
	return {
		name: M[0],
		version: M[1]
	};
}

function detectOS() {
	const platform = navigator.platform.toLowerCase(),
		iosPlatforms = ["iphone", "ipad", "ipod", "ipod touch"];

	if (platform.includes("mac")) return "MacOS";
	if (iosPlatforms.includes(platform)) return "iOS";
	if (platform.includes("win")) return "Windows";
	if (/android/.test(navigator.userAgent.toLowerCase())) return "Android";
	if (/linux/.test(platform)) return "Linux";

	return "unknown";
}

function range(l, r) { return new Array((r + 1) - l).fill().map((_, k) => k + l) }

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

if (oldVersions[detectOS()][getBrowser().name].includes(parseInt(getBrowser().version))) { popupToggle() };