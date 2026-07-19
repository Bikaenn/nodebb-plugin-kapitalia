<!-- IMPORT kapitalia/partials/nav.tpl -->

<div class="container-fluid kapitalia-page">
	<!-- IMPORT kapitalia/partials/stats-bar.tpl -->

	<h2 class="mb-4"><i class="fa fa-tasks"></i> Missionen</h2>

	<div class="row g-4">
		{{{ each missions }}}
		<div class="col-12 col-md-6">
			<div class="card kapitalia-card h-100
				{{{ if missions.status === 'completed' }}}border-success opacity-75{{{ end }}}">
				<div class="card-body">
					<div class="d-flex justify-content-between align-items-start mb-2">
						<h5 class="card-title mb-0">
							{{{ if missions.status === 'completed' }}}
							<i class="fa fa-check-circle text-success"></i>
							{{{ else }}}
							<i class="fa fa-circle-notch text-warning"></i>
							{{{ end }}}
							{missions.title}
						</h5>
						{{{ if missions.status === 'completed' }}}
						<span class="badge bg-success">Abgeschlossen</span>
						{{{ else }}}
						<span class="badge bg-warning text-dark">Aktiv</span>
						{{{ end }}}
					</div>
					<p class="card-text text-muted">{missions.description}</p>
					{{{ if missions.targetCount }}}
					<div class="progress mb-2" style="height:6px;">
						<div class="progress-bar" role="progressbar"
							style="width: {missions.progressPercent}%"></div>
					</div>
					<small class="text-muted">{missions.progress} / {missions.targetCount}</small>
					{{{ end }}}
				</div>
				<div class="card-footer d-flex gap-2">
					<span class="badge bg-success fs-6">+{missions.rewardCash} €</span>
					<span class="badge bg-info fs-6">+{missions.rewardXP} XP</span>
				</div>
			</div>
		</div>
		{{{ end }}}
		{{{ if !missions.length }}}
		<div class="col-12">
			<div class="card kapitalia-card">
				<div class="card-body text-center py-5 text-muted">
					<i class="fa fa-star fa-3x mb-3 text-warning"></i>
					<h4>Alle Missionen abgeschlossen!</h4>
					<p>Weitere Missionen werden in zukünftigen Updates hinzugefügt.</p>
				</div>
			</div>
		</div>
		{{{ end }}}
	</div>
</div>
