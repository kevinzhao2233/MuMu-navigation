document.addEventListener("touchend", function (event) {
	var event = event;
	var target = event.target;
	console.log(target);
	switch (target.id) {
		case "setBtn":
			getId("set").style.transform = "translateX(0)";
			getId("setBackground").style.display = "block";
			break;
		case "setBackground":
		case "setBack":
			getId("set").style.transform = "translateX(-60vw)";
			getId("setBackground").style.display = "none";
			break;
	}
})

function getId(id) {
	return document.getElementById(id);
}