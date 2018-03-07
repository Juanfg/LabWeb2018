<template>
	<b-navbar toggleable="md" type="dark" variant="success">

   	<b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

   	<b-navbar-brand href="#">Shopping Cart</b-navbar-brand>

   	<b-collapse is-nav id="nav_collapse">

			<b-navbar-nav>
				<b-nav-item href="#">Home</b-nav-item>
			</b-navbar-nav>

			<!-- Right aligned nav items -->
			<b-navbar-nav class="ml-auto">
				<b-nav-item right href="#">User</b-nav-item>
			</b-navbar-nav>

    	</b-collapse>
  </b-navbar>
</template>
