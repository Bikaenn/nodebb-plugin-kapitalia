<!-- IMPORT partials/nav.tpl -->

<div class="container-fluid kapitalia-page">
	<!-- IMPORT partials/stats-bar.tpl -->

	<h2 class="mb-4"><i class="fa fa-tachometer-alt"></i> Dashboard</h2>

	<div class="row g-4">
		<!-- Finanzen-Übersicht -->
		<div class="col-12 col-lg-6">
			<div class="card kapitalia-card">
				<div class="card-header"><i class="fa fa-coins"></i> Deine Finanzen</div>
				<div class="card-body">
					<table class="table table-sm table-borderless mb-0">
						<tbody>
							<tr>
								<td class="text-muted">Bargeld</td>
								<td class="text-end fw-bold text-success">{player.cash|fixed2} €</td>
							</tr>
							<tr>
								<td class="text-muted">Aktienwert</td>
								<td class="text-end fw-bold">{economy.stockValue|fixed2} €</td>
							</tr>
							<tr>
								<td class="text-muted">Unternehmenswert</td>
								<td class="text-end fw-bold">{economy.companyValue|fixed2} €</td>
							</tr>
							<tr class="table-active">
								<td><strong>Gesamtvermögen</strong></td>
								<td class="text-end fw-bold text-primary fs-5">{economy.netWorth|fixed2} €</td>
							</tr>
							<tr>
								<td class="text-muted">Passives Einkommen</td>
								<td class="text-end text-info">{economy.passiveIncome} €/min</td>
							</tr>
							<tr>
								<td class="text-muted">Weltrang</td>
								<td class="text-end">
									{{{ if rank }}}<span class="badge bg-warning text-dark"># {rank}</span>{{{ else }}}–{{{ end }}}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>

		<!-- Spieler-Profil -->
		<div class="col-12 col-lg-6">
			<div class="card kapitalia-card">
				<div class="card-header"><i class="fa fa-user"></i> Spieler</div>
				<div class="card-body">
					<table class="table table-sm table-borderless mb-0">
						<tbody>
							<tr>
								<td class="text-muted">Beruf</td>
								<td class="text-end"><span class="badge bg-secondary">{player.careerLabel}</span></td>
							</tr>
							<tr>
								<td class="text-muted">Level</td>
								<td class="text-end fw-bold">{player.level}</td>
							</tr>
							<tr>
								<td class="text-muted">XP</td>
								<td class="text-end">
									{player.xp} / {player.level|xpNeeded} XP
								</td>
							</tr>
							<tr>
								<td class="text-muted">Skillpunkte</td>
								<td class="text-end">{player.skillpoints}</td>
							</tr>
						</tbody>
					</table>
					<div class="progress mt-3" style="height: 8px;">
						<div class="progress-bar bg-success" role="progressbar"
							style="width: {player.xpPercent}%;"
							aria-valuenow="{player.xp}" aria-valuemin="0" aria-valuemax="{player.level|xpNeeded}">
						</div>
					</div>
					<small class="text-muted">XP bis Level-Up</small>
				</div>
				<div class="card-footer">
					<a href="/kapitalia/career" class="btn btn-sm btn-outline-primary" data-ajaxify="false">
						<i class="fa fa-briefcase"></i> Aufgabe lösen
					</a>
				</div>
			</div>
		</div>

		<!-- Aktive Missionen -->
		<div class="col-12 col-lg-6">
			<div class="card kapitalia-card">
				<div class="card-header"><i class="fa fa-tasks"></i> Aktive Missionen</div>
				<ul class="list-group list-group-flush">
					{{{ each missions }}}
					<li class="list-group-item d-flex justify-content-between align-items-center">
						<div>
							<strong>{missions.title}</strong><br>
							<small class="text-muted">{missions.description}</small>
						</div>
						<div class="text-end text-nowrap">
							<span class="badge bg-success">+{missions.rewardCash} €</span>
							<span class="badge bg-info">+{missions.rewardXP} XP</span>
						</div>
					</li>
					{{{ end }}}
					{{{ if !missions.length }}}
					<li class="list-group-item text-muted">Alle Missionen abgeschlossen! 🎉</li>
					{{{ end }}}
				</ul>
				<div class="card-footer">
					<a href="/kapitalia/missions" class="btn btn-sm btn-outline-secondary" data-ajaxify="false">
						Alle Missionen →
					</a>
				</div>
			</div>
		</div>

		<!-- Schnell-Navigation -->
		<div class="col-12 col-lg-6">
			<div class="card kapitalia-card">
				<div class="card-header"><i class="fa fa-rocket"></i> Schnell-Aktionen</div>
				<div class="card-body">
					<div class="d-grid gap-2">
						<a href="/kapitalia/career" class="btn btn-outline-primary" data-ajaxify="false">
							<i class="fa fa-briefcase"></i> Aufgabe lösen (Geld & XP verdienen)
						</a>
						<a href="/kapitalia/market" class="btn btn-outline-success" data-ajaxify="false">
							<i class="fa fa-chart-bar"></i> Zur Börse
						</a>
						<a href="/kapitalia/business" class="btn btn-outline-warning" data-ajaxify="false">
							<i class="fa fa-building"></i> Unternehmen kaufen
						</a>
						<a href="/kapitalia/ranking" class="btn btn-outline-secondary" data-ajaxify="false">
							<i class="fa fa-trophy"></i> Rangliste ansehen
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
