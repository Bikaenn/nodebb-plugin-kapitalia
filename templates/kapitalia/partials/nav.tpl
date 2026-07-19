<nav class="kapitalia-nav navbar navbar-expand-md mb-4" role="navigation">
	<div class="container-fluid">
		<a class="navbar-brand kapitalia-logo" href="/kapitalia/dashboard" data-ajaxify="false">
			<i class="fa fa-chart-line"></i> Kapitalia
		</a>
		<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#kapitaliaNavbar">
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="kapitaliaNavbar">
			<ul class="navbar-nav me-auto">
				<li class="nav-item">
					<a class="nav-link {{{ if active.dashboard }}}active{{{ end }}}" href="/kapitalia/dashboard" data-ajaxify="false">
						<i class="fa fa-tachometer-alt"></i> Dashboard
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link {{{ if active.career }}}active{{{ end }}}" href="/kapitalia/career" data-ajaxify="false">
						<i class="fa fa-briefcase"></i> Karriere
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link {{{ if active.market }}}active{{{ end }}}" href="/kapitalia/market" data-ajaxify="false">
						<i class="fa fa-chart-bar"></i> Börse
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link {{{ if active.portfolio }}}active{{{ end }}}" href="/kapitalia/portfolio" data-ajaxify="false">
						<i class="fa fa-wallet"></i> Portfolio
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link {{{ if active.business }}}active{{{ end }}}" href="/kapitalia/business" data-ajaxify="false">
						<i class="fa fa-building"></i> Unternehmen
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link {{{ if active.missions }}}active{{{ end }}}" href="/kapitalia/missions" data-ajaxify="false">
						<i class="fa fa-tasks"></i> Missionen
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link {{{ if active.ranking }}}active{{{ end }}}" href="/kapitalia/ranking" data-ajaxify="false">
						<i class="fa fa-trophy"></i> Rangliste
					</a>
				</li>
			</ul>
		</div>
	</div>
</nav>
