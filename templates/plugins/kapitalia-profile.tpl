{{{ if kapitalia }}}
<div class="card mb-3 kapitalia-profile-card">
	<div class="card-header">
		<i class="fa fa-chart-line text-primary"></i> Kapitalia – Finanz-Profil
	</div>
	<div class="card-body">
		<div class="row g-2 text-center">
			<div class="col-6 col-sm-4">
				<div class="small text-muted">Level</div>
				<div class="fw-bold">{kapitalia.level}</div>
			</div>
			<div class="col-6 col-sm-4">
				<div class="small text-muted">Beruf</div>
				<div class="fw-bold">{kapitalia.career}</div>
			</div>
			<div class="col-6 col-sm-4">
				<div class="small text-muted">Vermögen</div>
				<div class="fw-bold text-primary">{kapitalia.netWorth|fixed2} €</div>
			</div>
			<div class="col-6 col-sm-4">
				<div class="small text-muted">Aktienwert</div>
				<div class="fw-bold">{kapitalia.stockValue|fixed2} €</div>
			</div>
			<div class="col-6 col-sm-4">
				<div class="small text-muted">Passiv/min</div>
				<div class="fw-bold text-info">{kapitalia.passiveIncome} €</div>
			</div>
			<div class="col-6 col-sm-4">
				<div class="small text-muted">Weltrang</div>
				<div class="fw-bold">
					{{{ if kapitalia.rank }}}# {kapitalia.rank}{{{ else }}}–{{{ end }}}
				</div>
			</div>
		</div>
	</div>
	<div class="card-footer text-end">
		<a href="/kapitalia/dashboard" class="btn btn-sm btn-outline-primary" data-ajaxify="false">
			Spielen →
		</a>
	</div>
</div>
{{{ end }}}
