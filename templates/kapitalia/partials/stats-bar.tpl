<div class="kapitalia-stats-bar row g-2 mb-4">
	<div class="col-6 col-sm-4 col-md-2">
		<div class="stat-card">
			<div class="stat-label"><i class="fa fa-money-bill-wave"></i> Bargeld</div>
			<div class="stat-value text-success">{player.cash|moneyFormat} €</div>
		</div>
	</div>
	<div class="col-6 col-sm-4 col-md-2">
		<div class="stat-card">
			<div class="stat-label"><i class="fa fa-coins"></i> Vermögen</div>
			<div class="stat-value text-primary">{economy.netWorth|moneyFormat} €</div>
		</div>
	</div>
	<div class="col-6 col-sm-4 col-md-2">
		<div class="stat-card">
			<div class="stat-label"><i class="fa fa-star"></i> Level</div>
			<div class="stat-value">{player.level}</div>
		</div>
	</div>
	<div class="col-6 col-sm-4 col-md-2">
		<div class="stat-card">
			<div class="stat-label"><i class="fa fa-graduation-cap"></i> XP</div>
			<div class="stat-value">{player.xp}</div>
		</div>
	</div>
	<div class="col-6 col-sm-4 col-md-2">
		<div class="stat-card">
			<div class="stat-label"><i class="fa fa-briefcase"></i> Beruf</div>
			<div class="stat-value">{player.careerLabel}</div>
		</div>
	</div>
	<div class="col-6 col-sm-4 col-md-2">
		<div class="stat-card">
			<div class="stat-label"><i class="fa fa-clock"></i> /min</div>
			<div class="stat-value text-info">{economy.passiveIncome} €</div>
		</div>
	</div>
</div>
