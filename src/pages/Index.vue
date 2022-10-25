<template>
	<div class="container">
		<div class="tab-group">
			<button
				class="btn btn-tab btn-all-promotions"
				:class="{ 'btn-tab-active': currentTab === 'AllPromotions' }"
				type="button"
				@click="changeTab('AllPromotions')"
			>
				All Promotions
			</button>
			<button
				class="btn btn-tab btn-new-customers"
				:class="{ 'btn-tab-active': currentTab === 'NewCustomers' }"
				type="button"
				@click="changeTab('NewCustomers')"
			>
				New Customers
			</button>
		</div>
		<transition name="fade">
			<div class="cards">
				<div class="card" v-for="promotion in promotions" :key="promotion.id">
					<img class="card-img" :src="promotion.heroImageUrl" :alt="promotion.name" />
					<div class="card-body">
						<h1 class="card-title">{{ promotion.name }}</h1>
						<p class="card-description">
							{{ promotion.description }}
						</p>
						<div class="btn-group">
							<button class="btn btn-card btn-terms" type="button">
								{{ promotion.termsAndConditionsButtonText }}
							</button>
							<button class="btn btn-card btn-join" type="button">
								{{ promotion.joinNowButtonText }}
							</button>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	data() {
		return {
			promotions: [],
			currentTab: 'AllPromotions',
		}
	},
	methods: {
		changeTab(selectedTab) {
			this.currentTab = selectedTab

			if (selectedTab === 'NewCustomers') {
				this.promotions = this.promotions
					.filter(promotion => promotion.onlyNewCustomers)
					.sort((current, next) => current.sequence - next.sequence)
			}

			if (selectedTab === 'AllPromotions') {
				this.promotions = this.getPromotions()
			}
		},
		async getPromotions() {
			try {
				let promotions = []
				let response = await fetch('/json/data.json')

				if (response && response.ok) {
					promotions = await response.json()
				} else {
					promotions = await fetch('http://www.mocky.io/v2/5bc3b9cc30000012007586b7').then(response =>
						response.json()
					)
				}

				if (promotions) {
					this.promotions = promotions.sort((current, next) => current.sequence - next.sequence)
				} else {
					this.promotions = []
				}
			} catch (error) {
				console.error('Unable to get promotions. Error: ', error)
			}
		},
	},
	mounted() {
		this.getPromotions()
	},
}
</script>
