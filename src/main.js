import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueLocalStorage from 'vue-localstorage';
import * as VueGoogleMaps from 'vue2-google-maps';
import InfiniteLoading from 'vue-infinite-loading';
import axios from 'axios';

Vue.use(InfiniteLoading, {
	/* options */
});

Vue.use(VueGoogleMaps, {
	load: {
		key: 'AIzaSyBld_gVOd3C-MZvwQUVCBlOoQzHEkOdVvc',
		libraries: 'places', // necessary for places input
	},
});

Vue.use(VueLocalStorage, {
	name: 'ls',
	bind: true,
});

Vue.config.productionTip = false;

let token = Vue.ls.get('token');

window.$http = axios.create({
	baseURL: 'http://161.35.2.240/api/v1',
	// baseURL: 'http://localhost:8000/api/v1', // For Local
});

if (token && token != null) {
	window.$http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

new Vue({
	router,
	render: (h) => h(App),
}).$mount('#app');
