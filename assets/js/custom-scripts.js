'use strict';

/*
 * Site scripts (vanilla JS, no jQuery).
 * - Smooth scrolling is handled by CSS (scroll-behavior + scroll-padding-top).
 * - Scroll-spy is handled by Bootstrap via data-bs-spy on <body>.
 * - The special-items modal is filled from the card whose button opened it.
 */
document.addEventListener('DOMContentLoaded', () => {
	// Collapse the mobile menu after a nav link is clicked
	const menu = document.getElementById('navbarNav');
	if (menu) {
		const collapse = bootstrap.Collapse.getOrCreateInstance(menu, { toggle: false });
		menu.querySelectorAll('.nav-link').forEach((link) => {
			link.addEventListener('click', () => {
				if (menu.classList.contains('show')) {
					collapse.hide();
				}
			});
		});
	}

	// One shared modal for all special items: title and image come from the card, text from data-description
	const itemModal = document.getElementById('itemModal');
	if (itemModal) {
		itemModal.addEventListener('show.bs.modal', (event) => {
			const trigger = event.relatedTarget;
			const cardImg = trigger.closest('figure').querySelector('img');
			const modalImg = itemModal.querySelector('.modal-body img');
			itemModal.querySelector('.modal-title').textContent = trigger.closest('figcaption').querySelector('h5').textContent;
			modalImg.src = cardImg.src;
			modalImg.alt = cardImg.alt;
			itemModal.querySelector('.modal-body p').textContent = trigger.dataset.description;
		});
	}

	// Bootstrap client-side form validation
	document.querySelectorAll('.needs-validation').forEach((form) => {
		form.addEventListener('submit', (event) => {
			if (!form.checkValidity()) {
				event.preventDefault();
				event.stopPropagation();
			}
			form.classList.add('was-validated');
		});
	});
});
