

function appendPopover(e){                    // appends popOver to visual container
	var popOver = document.getElementById('popoverContainer')
	e.target.parentElement.appendChild(popOver)   // target in this case is hour segment. parentElement selects visualCont
	console.log(e.target)
}

function updatePopoverPosition(popOver, target){
	var targetStyle = window.getComputedStyle(target)
	popOver.style.top  = parseFloat(targetStyle.top) + parseFloat(targetStyle.height) - 100 + 'px'
	popOver.style.left = parseFloat(targetStyle.left) + parseFloat(targetStyle.width)/2 - 90 + 'px'
}

function elevateEntryBars(target){										// modifies zindex of entryBars in current visualCont
	var children = target.parentElement.childNodes		  // this is done to keep popover below entry bars in current visualCont and above all other entry bars.
	for (var i = 0; i < children.length; i++) {
		if (children[i].className.includes('entryBar')) {
			children[i].style.zIndex = '4'
		}
	}
}

function flattenEntryBars(){   													// resets all entryBar z-index property
	var entryBars = document.getElementsByClassName("entryBar")
	for (var i = 0; i < entryBars.length; i++) {
		entryBars[i].style.zIndex = '0'
	}
}

function updatePopoverContent(target){
	var start    = document.getElementById('startDesc').innerHTML = 'Start: ' + moment(getEntry(target.id).start).format('HH:mm')
	var end      = document.getElementById('endDesc').innerHTML = 'End: ' + moment(getEntry(target.id).end).format('HH:mm')
	var duration = document.getElementById('durationDesc').innerHTML = 'Dur: ' + calculateDuration(getEntry(target.id))
}

function updateDeleteButton(target){
	document.getElementById('deleteButton').setAttribute('onclick', `deleteEntry(${target.id})`)

}

// target correspond to the entryBar dom object that has an id attribute corresponding to its entry object.
function updateUpdateButton(target) {
	document.getElementById('toggleClassButton').setAttribute('onclick', `changeType(${target.id})`)
}

var holdPopOver = function(e) {
	document.getElementById('popoverContainer').style.display = 'block'
}

var showPopOver = function(e) {
    var popOver = document.getElementById('popoverContainer')
		popOver.style.display = 'block'
		updateDeleteButton(e.target)
		updateUpdateButton(e.target)
		elevateEntryBars(e.target)
		updatePopoverPosition(popOver, e.target)
		updatePopoverContent(e.target)
};

var hidePopOver = function(e) {
    document.getElementById('popoverContainer').style.display = 'none'
    document.getElementById('popoverContainer').style.zIndex = '3'
		flattenEntryBars()
};
