
function showPopover(){
	popover = document.getElementById('popoverContainer')
	if (POPOVER_AT == this && popover.classList.contains('isVisible')){
		popover.classList.remove('isVisible')
	} else {
		popover.classList.add('isVisible')
	}
	POPOVER_AT = this
	popover.appendAfter(this)
}

Element.prototype.appendAfter = function (element) {
	element.parentNode.insertBefore(this, element.nextSibling);
},false;