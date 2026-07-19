/**
 * Kapitalia – Client-side JavaScript
 * Minimal: UI-Hilfen only. Keine SPA-Navigation, keine Route-Navigation.
 */

'use strict';

(function () {
	// -------------------------------------------------------
	// Auto-dismiss alerts after 5 seconds
	// -------------------------------------------------------
	function initAlertDismiss() {
		const alerts = document.querySelectorAll('.kapitalia-alert');
		alerts.forEach(function (alert) {
			setTimeout(function () {
				if (alert && alert.parentNode) {
					alert.classList.remove('show');
					setTimeout(function () {
						if (alert.parentNode) alert.parentNode.removeChild(alert);
					}, 400);
				}
			}, 5000);
		});
	}

	// -------------------------------------------------------
	// Work form: AJAX submit with result display
	// -------------------------------------------------------
	function initWorkForm() {
		const form = document.getElementById('kapitalia-work-form');
		const resultEl = document.getElementById('kapitalia-work-result');
		if (!form || !resultEl) return;

		form.addEventListener('submit', function (e) {
			e.preventDefault();

			const formData = new FormData(form);
			const submitBtn = form.querySelector('[type=submit]');
			if (submitBtn) submitBtn.disabled = true;

			const body = new URLSearchParams();
			formData.forEach(function (val, key) { body.append(key, val); });

			fetch('/api/kapitalia/work/submit', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: body.toString(),
			})
				.then(function (r) { return r.json(); })
				.then(function (data) {
					resultEl.style.display = 'block';
					if (data.ok && data.correct) {
						resultEl.innerHTML =
							'<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' +
							'<strong class="result-correct">Richtig!</strong> ' +
							escapeHtml(data.message || '') +
							(data.reward ? ' <span class="badge bg-success">+' + data.reward.cash + ' €</span>' +
								'<span class="badge bg-info ms-1">+' + data.reward.xp + ' XP</span>' : '') +
							'</div>';
					} else if (data.ok) {
						resultEl.innerHTML =
							'<div class="alert alert-warning"><i class="fa fa-times-circle"></i> ' +
							'<strong class="result-wrong">Falsch.</strong> ' +
							escapeHtml(data.message || '') + '</div>';
					} else {
						resultEl.innerHTML =
							'<div class="alert alert-danger"><i class="fa fa-exclamation-triangle"></i> ' +
							escapeHtml(data.message || 'Fehler beim Einreichen.') + '</div>';
					}

					// Hide form after answer, reload for next task after 3s
					form.style.display = 'none';
					setTimeout(function () {
						window.location.reload();
					}, 3000);
				})
				.catch(function () {
					resultEl.style.display = 'block';
					resultEl.innerHTML =
						'<div class="alert alert-danger">Verbindungsfehler. Bitte versuche es erneut.</div>';
					if (submitBtn) submitBtn.disabled = false;
				});
		});
	}

	// -------------------------------------------------------
	// Utility: HTML escape
	// -------------------------------------------------------
	function escapeHtml(str) {
		return String(str)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;');
	}

	// -------------------------------------------------------
	// Highlight current nav item based on URL
	// -------------------------------------------------------
	function highlightNav() {
		const path = window.location.pathname;
		document.querySelectorAll('.kapitalia-nav .nav-link').forEach(function (link) {
			link.classList.remove('active');
			if (link.getAttribute('href') && path.startsWith(link.getAttribute('href'))) {
				link.classList.add('active');
			}
		});
	}

	// -------------------------------------------------------
	// Init on DOMContentLoaded
	// -------------------------------------------------------
	document.addEventListener('DOMContentLoaded', function () {
		initAlertDismiss();
		initWorkForm();
		highlightNav();
	});
})();
