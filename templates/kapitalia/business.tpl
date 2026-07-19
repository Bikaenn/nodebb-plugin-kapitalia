<!-- IMPORT partials/nav.tpl -->

<div class="container-fluid kapitalia-page">
	<!-- IMPORT partials/stats-bar.tpl -->
	<!-- IMPORT partials/alerts.tpl -->

	<h2 class="mb-4"><i class="fa fa-building"></i> Unternehmen</h2>

	<div class="alert alert-info">
		<i class="fa fa-info-circle"></i>
		Unternehmen generieren <strong>passives Einkommen</strong> jede Minute – auch wenn du nicht online bist.
		Beim nächsten Login wird das aufgesammelte Einkommen gutgeschrieben.
	</div>

	<div class="row g-4">
		{{{ each companies }}}
		<div class="col-12 col-sm-6 col-xl-3">
			<div class="card kapitalia-card h-100 {{{ if companies.owned }}}border-success{{{ end }}}">
				<div class="card-header d-flex justify-content-between align-items-center">
					<strong>{companies.name}</strong>
					{{{ if companies.owned }}}
					<span class="badge bg-success"><i class="fa fa-check"></i> Im Besitz</span>
					{{{ end }}}
				</div>
				<div class="card-body">
					<p class="text-muted small mb-3">{companies.description}</p>
					<table class="table table-sm table-borderless mb-0">
						<tr>
							<td class="text-muted">Kaufpreis</td>
							<td class="text-end fw-bold">{companies.price|localNumber} €</td>
						</tr>
						<tr>
							<td class="text-muted">Einkommen</td>
							<td class="text-end text-info fw-bold">{companies.incomePerMinute} €/min</td>
						</tr>
						<tr>
							<td class="text-muted">Amortisation</td>
							<td class="text-end">{companies.price|amortYears} Min.</td>
						</tr>
					</table>
				</div>
				<div class="card-footer">
					{{{ if companies.owned }}}
					<button class="btn btn-success w-100" disabled>
						<i class="fa fa-check"></i> Bereits gekauft
					</button>
					{{{ else if companies.affordable }}}
					<form method="POST" action="/api/kapitalia/business/buy">
						<input type="hidden" name="_csrf" value="{csrf}">
						<input type="hidden" name="companyId" value="{companies.id}">
						<button type="submit" class="btn btn-warning w-100">
							<i class="fa fa-shopping-cart"></i> Kaufen ({companies.price|localNumber} €)
						</button>
					</form>
					{{{ else }}}
					<button class="btn btn-secondary w-100" disabled>
						<i class="fa fa-lock"></i> Zu teuer ({companies.price|localNumber} €)
					</button>
					{{{ end }}}
				</div>
			</div>
		</div>
		{{{ end }}}
	</div>

	{{{ if economy.passiveIncome }}}
	<div class="mt-4 p-3 bg-light rounded">
		<i class="fa fa-clock text-info"></i>
		Du verdienst aktuell <strong class="text-info">{economy.passiveIncome} €/min</strong> aus deinen Unternehmen.
	</div>
	{{{ end }}}
</div>
