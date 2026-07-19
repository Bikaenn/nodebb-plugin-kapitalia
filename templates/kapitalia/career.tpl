<!-- IMPORT partials/nav.tpl -->

<div class="container-fluid kapitalia-page">
	<!-- IMPORT partials/stats-bar.tpl -->

	<h2 class="mb-4"><i class="fa fa-briefcase"></i> Karriere</h2>

	<div class="row g-4">
		<!-- Aktuelle Aufgabe -->
		<div class="col-12 col-lg-7">
			<div class="card kapitalia-card">
				<div class="card-header d-flex justify-content-between align-items-center">
					<span><i class="fa fa-question-circle"></i> Aktuelle Aufgabe</span>
					<span class="badge bg-primary">{player.careerLabel}</span>
				</div>
				<div class="card-body">
					{{{ if currentTask }}}
					<p class="lead mb-3">{currentTask.question}</p>

					{{{ if currentTask.context.hint }}}
					<div class="alert alert-info py-2 mb-3">
						<small><i class="fa fa-lightbulb"></i> <strong>Hinweis:</strong> {currentTask.context.hint}</small>
					</div>
					{{{ end }}}

					<form id="kapitalia-work-form" method="POST" action="/api/kapitalia/work/submit">
						<input type="hidden" name="_csrf" value="{csrf}">
						<input type="hidden" name="taskId" value="{currentTask.id}">

						<div class="mb-3">
							{{{ each currentTask.options }}}
							<div class="form-check mb-2">
								<input class="form-check-input" type="radio" name="answer"
									id="opt_{@index}" value="{currentTask.options.value}" required>
								<label class="form-check-label" for="opt_{@index}">
									{currentTask.options.label}
								</label>
							</div>
							{{{ end }}}
						</div>

						<div class="d-flex justify-content-between align-items-center">
							<div>
								<span class="badge bg-success me-1">+{currentTask.reward.cash} €</span>
								<span class="badge bg-info me-1">+{currentTask.reward.xp} XP</span>
								{{{ if currentTask.reward.skillpoints }}}
								<span class="badge bg-warning text-dark">+{currentTask.reward.skillpoints} SP</span>
								{{{ end }}}
							</div>
							<button type="submit" class="btn btn-primary">
								<i class="fa fa-paper-plane"></i> Antwort einreichen
							</button>
						</div>
					</form>

					{{{ else }}}
					<div class="text-center py-4 text-muted">
						<i class="fa fa-hourglass fa-2x mb-2"></i><br>
						Keine aktive Aufgabe. Lade die Seite neu, um eine neue zu erhalten.
					</div>
					{{{ end }}}
				</div>
			</div>
		</div>

		<!-- Karriere-Info & Aufgaben-Historie -->
		<div class="col-12 col-lg-5">
			<div class="card kapitalia-card mb-3">
				<div class="card-header"><i class="fa fa-road"></i> Karrierestufen</div>
				<ul class="list-group list-group-flush">
					{{{ each careerInfo.allStages }}}
					<li class="list-group-item {{{ if careerInfo.allStages.id === player.career }}}list-group-item-primary{{{ end }}}">
						<div class="d-flex justify-content-between">
							<strong>{careerInfo.allStages.label}</strong>
							{{{ if careerInfo.allStages.id === player.career }}}
							<span class="badge bg-primary">Aktuell</span>
							{{{ end }}}
						</div>
						<small class="text-muted">{careerInfo.allStages.description}</small>
					</li>
					{{{ end }}}
				</ul>
			</div>

			<div class="card kapitalia-card">
				<div class="card-header"><i class="fa fa-history"></i> Letzte Aufgaben</div>
				<ul class="list-group list-group-flush">
					{{{ each taskHistory }}}
					<li class="list-group-item d-flex justify-content-between align-items-center">
						<span class="text-muted small">{taskHistory.type}</span>
						{{{ if taskHistory.correct }}}
						<span class="badge bg-success"><i class="fa fa-check"></i> Richtig</span>
						{{{ else }}}
						<span class="badge bg-danger"><i class="fa fa-times"></i> Falsch</span>
						{{{ end }}}
					</li>
					{{{ end }}}
					{{{ if !taskHistory.length }}}
					<li class="list-group-item text-muted">Noch keine Aufgaben bearbeitet.</li>
					{{{ end }}}
				</ul>
			</div>
		</div>
	</div>

	<!-- Work-Submit Result (injected by kapitalia.js) -->
	<div id="kapitalia-work-result" class="mt-3" style="display:none;"></div>
</div>
