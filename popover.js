
var showPopOver = function(e) {
    var popOver = document.getElementById('popoverContainer')
		appendPopover(popOver, e)
		updatePopoverPosition(popOver, e.target)
		updatePopoverContent(e.target)
		popOver.style.display = 'block'
		setDeleteButtonTo(e.target)
		setUpdateButtonTo(e.target)
		elevateEntryBars(e.target)
};

function appendPopover(popOver, e){
	e.target.parentElement.appendChild(popOver)
}

function updatePopoverPosition(popOver, target){
	var styleOfTarget = window.getComputedStyle(target)
	popOver.style.top  = parseFloat(styleOfTarget.top) + parseFloat(styleOfTarget.height) - 100 + 'px'
	popOver.style.left = parseFloat(styleOfTarget.left) + parseFloat(styleOfTarget.width)/2 - 90 + 'px'
}

function updatePopoverContent(target){
	var start    = document.getElementById(   'startDesc').innerHTML = 'Start: ' + moment(getEntry(target.id).start).format('HH:mm')
	var end      = document.getElementById(     'endDesc').innerHTML = 'End: ' + moment(getEntry(target.id).end).format('HH:mm')
	var duration = document.getElementById('durationDesc').innerHTML = 'Dur: ' + calculateDuration(getEntry(target.id))
}

// modifies zindex of entryBars in current dayVisualization
// done to keep popover below neighbor entry bars and above all other ones.
function elevateEntryBars(target){
	var children = target.parentElement.childNodes
	for (var i = 0; i < children.length; i++) {
		if (children[i].className.includes('entryBar')) {
			children[i].style.zIndex = '4'
		}
	}
}

function setDeleteButtonTo(target){
	document.getElementById('deleteButton').setAttribute('onclick', `deleteEntry(${target.id})`)

}

function setUpdateButtonTo(target) {
	document.getElementById('toggleClassButton').setAttribute('onclick', `changeType(${target.id})`)
}

// resets all entryBar z-index property
function flattenEntryBars(){
	var entryBars = document.getElementsByClassName("entryBar")
	for (var i = 0; i < entryBars.length; i++) {
		entryBars[i].style.zIndex = '0'
	}
}

var holdPopOver = function(e) {
	document.getElementById('popoverContainer').style.display = 'block'
}

var hidePopOver = function(e) {
    document.getElementById('popoverContainer').style.display = 'none'
    document.getElementById('popoverContainer').style.zIndex = '3'
		flattenEntryBars()
};
