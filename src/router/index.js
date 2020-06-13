import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Catalog from '../views/Catalog.vue';
import Media from '../views/Media.vue';
import About from '../views/About.vue';
import Tailormade from '../views/TailorMade.vue';
import Sustainability from '../views/Sustainability.vue';
import Contact from '../views/Contact.vue';
import Category from '../views/Category.vue';
import Product from '../views/Product.vue';

Vue.use(VueRouter);

let routes = [
	{
		path: '/',
		name: 'home',
		component: Home
	},
	{
		path: '/catalog',
		name: 'catalog',
		component: Catalog
	},
	{
		path: '/media',
		name: 'media',
		component: Media
	},
	{
		path: '/about',
		name: 'about',
		component: About
	},
	{
		path: '/contact',
		name: 'contact',
		component: Contact
	},
	{
		path: '/sustainability',
		name: 'sustainability',
		component: Sustainability
	},
	{
		path: '/tailormade',
		name: 'tailormade',
		component: Tailormade
	},
	//Categories
	{
		path: '/glassware',
		name: 'glassware',
		component: Category,
		meta: {
			title: 'Glassware',
			banner: 'glassware.jpg',
			db: 'glasses'
		}
	},
	{
		path: '/barware',
		name: 'barware',
		component: Category,
		meta: {
			title: 'Barware',
			banner: 'barware.jpg',
			db: 'barwares'
		}
	},
	{
		path: '/eco',
		name: 'eco',
		component: Category,
		meta: {
			title: 'Unbreakable Drinkware',
			banner: 'eco.jpg',
			db: 'unbreakables'
		}
	},
	{
		path: '/tableware',
		name: 'tableware',
		component: Category,
		meta: {
			title: 'Creative Tableware',
			banner: 'tableware.jpg',
			db: 'tablewares'
		}
	},
	//Products
	{
		path: '/products/:id',
		name: 'product',
		component: Product,
		meta: {
			db: 'products'
		}
	},
	{
		path: '/glassware/:id',
		name: 'glassware_product',
		component: Product,
		meta: {
			db: 'glasses'
		}
	},
	{
		path: '/barware/:id',
		name: 'barware_product',
		component: Product,
		meta: {
			db: 'barwares'
		}
	},
	{
		path: '/eco/:id',
		name: 'eco_product',
		component: Product,
		meta: {
			db: 'unbreakables'
		}
	},
	{
		path: '/tableware/:id',
		name: 'tableware_product',
		component: Product,
		meta: {
			db: 'tablewares'
		}
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

export default router;
