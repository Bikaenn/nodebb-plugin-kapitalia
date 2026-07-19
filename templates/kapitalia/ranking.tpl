<!-- IMPORT kapitalia/partials/nav.tpl -->

<div class="container-fluid kapitalia-page">
	<!-- IMPORT kapitalia/partials/stats-bar.tpl -->

	<div class="d-flex justify-content-between align-items-center mb-4">
		<h2 class="mb-0"><i class="fa fa-trophy"></i> Rangliste</h2>
		{{{ if ownRank }}}
		<div class="alert alert-info py-2 mb-0">
			<i class="fa fa-user"></i> Dein Rang: <strong>#&thinsp;{ownRank}</strong>
		</div>
		{{{ end }}}
	</div>

	<div class="card kapitalia-card">
		<div class="card-body p-0">
			<div class="table-responsive">
				<table class="table table-hover align-middle mb-0">
					<thead class="table-light">
						<tr>
							<th style="width:60px;">#</th>
							<th>Spieler</th>
							<th class="text-end">Gesamtvermögen</th>
						</tr>
					</thead>
					<tbody>
						{{{ each top100 }}}
						<tr class="{{{ if top100.rank === 1 }}}table-warning{{{ end }}}
							{{{ if top100.rank === 2 }}}table-secondary{{{ end }}}
							{{{ if top100.rank === 3 }}}table-danger{{{ end }}}">
							<td>
								{{{ if top100.rank === 1 }}}<i class="fa fa-trophy text-warning"></i>
								{{{ else if top100.rank === 2 }}}<i class="fa fa-medal text-secondary"></i>
								{{{ else if top100.rank === 3 }}}<i class="fa fa-medal text-danger"></i>
								{{{ else }}}{top100.rank}
								{{{ end }}}
							</td>
							<td>
								<a href="/user/{top100.userslug}" class="d-flex align-items-center gap-2">
									{{{ if top100.picture }}}
									<img src="{top100.picture}" class="rounded-circle" width="28" height="28" alt="">
									{{{ end }}}
									<strong>{top100.username}</strong>
								</a>
							</td>
							<td class="text-end fw-bold text-primary">{top100.netWorth|fixed2} €</td>
						</tr>
						{{{ end }}}
						{{{ if !top100.length }}}
						<tr>
							<td colspan="3" class="text-center text-muted py-4">
								Noch keine Spieler auf der Rangliste. Starte das Spiel!
							</td>
						</tr>
						{{{ end }}}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
