'use strict';

/*
function extract_filename(path) {
	if (path.substr(0, 12) === "C:\\fakepath\\")
		return path.substr(12); // modern browser
	var x;
	x = path.lastIndexOf('/');
	if (x >= 0) // Unix-based path
		return path.substr(x+1);
	x = path.lastIndexOf('\\');
	if (x >= 0) // Windows-based path
		return path.substr(x+1);
	return path; // just the filename
}

document.getElementById('load-img-input').addEventListener('input', (evt) => {
	console.log(extract_filename(evt.target.value));
});
*/

let dragged_image;

window.addEventListener('load', () => {
	let fragment = new DocumentFragment();
	for (let img_name of IMAGES) {
		let img = document.createElement('img');
		img.src = img_name;
		img.style.userSelect = 'none';
		img.classList.add('draggable');
		img.draggable = true;
		img.ondragstart = "event.dataTransfer.setData('text/plain', null)";
		img.addEventListener('mousedown', (evt) => {
			dragged_image = evt.target;
			dragged_image.classList.add("dragged");
		});
		fragment.appendChild(img);
	}

	let images = document.querySelector('.images');
	images.appendChild(fragment);

	document.querySelectorAll('.tierlist tr').forEach(make_accept_drop);
	make_accept_drop(document.querySelector('.images'));

	let title_label = document.querySelector('.title-label');
	let title_input = document.getElementById('title-input');
	
	function change_title(evt) {
		title_input.style.display = 'none';
		title_label.innerText = title_input.value;
		title_label.style.display = 'inline';
	}

	title_input.addEventListener('change', change_title);
	title_input.addEventListener('focusout', change_title);

	title_label.addEventListener('click', (evt) => {
		evt.target.style.display = 'none';
		title_input.value = title_label.innerText;
		title_input.style.display = 'inline';
	});
});

function end_drag(evt) {
	dragged_image?.classList.remove("dragged");
	dragged_image = null;
}

window.addEventListener('mouseup', end_drag);
window.addEventListener('dragend', end_drag);

function make_accept_drop(elem) {
	elem.classList.add('droppable');

	elem.addEventListener('dragenter', (evt) => {
		evt.target.classList.add('drag-entered');
	});
	elem.addEventListener('dragleave', (evt) => {
		evt.target.classList.remove('drag-entered');
	});
	elem.addEventListener('dragover', (evt) => {
		evt.preventDefault();
	});
	elem.addEventListener('drop', (evt) => {
		evt.preventDefault();
		evt.target.classList.remove('drag-entered');
		if (dragged_image && evt.target.classList.contains('droppable')) {
			dragged_image.parentNode.removeChild(dragged_image);
			event.target.appendChild(dragged_image);
		}
	});
}
