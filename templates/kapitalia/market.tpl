<!-- IMPORT kapitalia/partials/nav.tpl -->

<div class="container-fluid kapitalia-page">
	<!-- IMPORT kapitalia/partials/stats-bar.tpl -->
	<!-- IMPORT kapitalia/partials/alerts.tpl -->

	<div class="d-flex justify-content-between align-items-center mb-4">
		<h2 class="mb-0"><i class="fa fa-chart-bar"></i> Börse</h2>
		<span class="text-muted small"><i class="fa fa-sync"></i> Kurse aktualisieren sich alle 5 Minuten</span>
	</div>

	<div class="card kapitalia-card">
		<div class="card-body p-0">
			<div class="table-responsive">
				<table class="table table-hover align-middle mb-0">
					<thead class="table-light">
						<tr>
							<th>Symbol</th>
							<th>Unternehmen</th>
							<th>Kategorie</th>
							<th class="text-end">Kurs</th>
							<th class="text-end">Veränd. (%)</th>
							<th style="min-width:220px;">Kaufen</th>
						</tr>
					</thead>
					<tbody>
						{{{ each stocks }}}
						<tr>
							<td><strong class="text-primary">{stocks.symbol}</strong></td>
							<td>{stocks.name}</td>
							<td><span class="badge bg-secondary">{stocks.category}</span></td>
							<td class="text-end fw-bold">{stocks.price|fixed2} €</td>
							<td class="text-end">
								{{{ if stocks.change >= 0 }}}
								<span class="text-success"><i class="fa fa-arrow-up"></i> +{stocks.change}%</span>
								{{{ else }}}
								<span class="text-danger"><i class="fa fa-arrow-down"></i> {stocks.change}%</span>
								{{{ end }}}
							</td>
							<td>
								<form method="POST" action="/api/kapitalia/market/buy" class="d-flex gap-2 align-items-center">
									<input type="hidden" name="_csrf" value="{csrf}">
									<input type="hidden" name="symbol" value="{stocks.symbol}">
									<input type="number" name="amount" class="form-control form-control-sm" style="width:80px;"
										value="1" min="1" max="9999" required>
									<button type="submit" class="btn btn-sm btn-success text-nowrap">
										<i class="fa fa-shopping-cart"></i> Kaufen
									</button>
								</form>
							</td>
						</tr>
						{{{ end }}}
						{{{ if !stocks.length }}}
						<tr>
							<td colspan="6" class="text-center text-muted py-4">Keine Aktien verfügbar.</td>
						</tr>
						{{{ end }}}
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<div class="mt-3">
		<a href="/kapitalia/portfolio" class="btn btn-outline-secondary" data-ajaxify="false">
			<i class="fa fa-wallet"></i> Mein Portfolio ansehen
		</a>
	</div>
</div>
