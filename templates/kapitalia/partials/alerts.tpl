{{{ if flash }}}
<div class="alert alert-{flash.type} alert-dismissible fade show kapitalia-alert" role="alert">
	<i class="fa {{{ if flash.type === 'success' }}}fa-check-circle{{{ else }}}fa-exclamation-circle{{{ end }}}"></i>
	{flash.message}
	<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Schließen"></button>
</div>
{{{ end }}}
