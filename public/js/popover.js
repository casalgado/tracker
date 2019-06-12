function drawPopover() {
	var row = document.createElement('td');
	row.setAttribute('id', 'popoverContainer');
	row.setAttribute('class', 'popoverContainer');
	row.setAttribute('colspan', '2');
	row.innerHTML = '';
	var popoverBody = document.createElement('div');
	popoverBody.setAttribute('class', 'popoverBody');
	row.appendChild(popoverBody);
	return row;
}

function showPopover() {
	popoverSpeed = 150;
	if (this.classList.contains('hasPopover')) {
		this.classList.remove('hasPopover');
		popover = this.nextSibling;
		popover.firstChild.velocity({ height: '0px' }, { duration: popoverSpeed }).then(() => {
			popover.parentNode.removeChild(popover);
		});
	} else {
		this.classList.add('hasPopover');
		popover = drawPopover();
		popover.appendAfter(this);
		popover.firstChild.velocity({ height: '100px' }, { duration: popoverSpeed });
	}
}

(Element.prototype.appendAfter = function(element) {
	element.parentNode.insertBefore(this, element.nextSibling);
}),
	false;
