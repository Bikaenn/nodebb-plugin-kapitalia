<!-- IMPORT partials/nav.tpl -->

<div class="container-fluid kapitalia-page">
	<!-- IMPORT partials/stats-bar.tpl -->
	<!-- IMPORT partials/alerts.tpl -->

	<h2 class="mb-4"><i class="fa fa-wallet"></i> Portfolio</h2>

	{{{ if holdings.length }}}
	<div class="card kapitalia-card mb-4">
		<div class="card-header d-flex justify-content-between align-items-center">
			<span><i class="fa fa-chart-pie"></i> Meine Aktien</span>
			<span class="badge bg-primary">Gesamtwert: {economy.stockValue|fixed2} €</span>
		</div>
		<div class="card-body p-0">
			<div class="table-responsive">
				<table class="table table-hover align-middle mb-0">
					<thead class="table-light">
						<tr>
							<th>Symbol</th>
							<th>Unternehmen</th>
							<th class="text-end">Kurs</th>
							<th class="text-end">Veränd.</th>
							<th class="text-center">Anteile</th>
							<th class="text-end">Wert</th>
							<th style="min-width:220px;">Verkaufen</th>
						</tr>
					</thead>
					<tbody>
						{{{ each holdings }}}
						<tr>
							<td><strong class="text-primary">{holdings.symbol}</strong></td>
							<td>{holdings.name}</td>
							<td class="text-end fw-bold">{holdings.price|fixed2} €</td>
							<td class="text-end">
								{{{ if holdings.change >= 0 }}}
								<span class="text-success">+{holdings.change}%</span>
								{{{ else }}}
								<span class="text-danger">{holdings.change}%</span>
								{{{ end }}}
							</td>
							<td class="text-center">{holdings.qty}</td>
							<td class="text-end fw-bold">{holdings.value|fixed2} €</td>
							<td>
								<form method="POST" action="/api/kapitalia/market/sell" class="d-flex gap-2 align-items-center">
									<input type="hidden" name="_csrf" value="{csrf}">
									<input type="hidden" name="symbol" value="{holdings.symbol}">
									<input type="number" name="amount" class="form-control form-control-sm" style="width:80px;"
										value="1" min="1" max="{holdings.qty}" required>
									<button type="submit" class="btn btn-sm btn-danger text-nowrap">
										<i class="fa fa-times"></i> Verkaufen
									</button>
								</form>
							</td>
						</tr>
						{{{ end }}}
					</tbody>
					<tfoot class="table-light">
						<tr>
							<td colspan="5" class="text-end fw-bold">Gesamtwert:</td>
							<td class="text-end fw-bold text-primary">{economy.stockValue|fixed2} €</td>
							<td></td>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
	</div>
	{{{ else }}}
	<div class="card kapitalia-card">
		<div class="card-body text-center py-5 text-muted">
			<i class="fa fa-chart-line fa-3x mb-3"></i>
			<h4>Dein Portfolio ist leer</h4>
			<p>Kaufe Aktien auf der Börse, um dein Vermögen zu vermehren!</p>
			<a href="/kapitalia/market" class="btn btn-primary" data-ajaxify="false">
				<i class="fa fa-chart-bar"></i> Zur Börse
			</a>
		</div>
	</div>
	{{{ end }}}
</div>
