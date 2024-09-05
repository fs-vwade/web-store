/** HTML Component
 *
 * @param {Object} collection
 * collection is a dict {} of items to include
 * child items should each be a Component type, apiece
 */
class Component {
	constructor(collection:Object=null) {
		if (collection && collection.name) {
			this.type = collection.name;
			this.id = collection.id || null;
			this.src = collection.src || null;
			this.href = collection.href || null;
			this.text = collection.text || null;
			this.label = collection.class || collection.name;
			this.children = (
				Array.isArray(collection.subcomponents)
			) ? (
				collection.subcomponents
			) : (null);
		} else {
			console.error(
				`ERROR: Component object not properly confifgured: ${{
					is_defined: !! (collection),
					has_type: !! (collection.name),
					has_label: !! (collection.class),
					has_child_elements: (
						Array.isArray(collection.subcomponents) &&
						0 < collection.subcomponents.length
					),
				}}`
			);
		}
	}

	get element() {
		const result = document.createElement(this.type);
		if (this.id) result.id = this.id;
		if (this.src) result.src = this.src;
		if (this.href) result.href = this.href;
		result.innerText = this.text ? this.text : null;
		result.className = this.label;
		if (Array.isArray(this.children)){
			this.children.forEach(e => {
				item.append(e.element);
			})
		}
		return result;
	}
}

/** We create our page elements here
 * Looking at the example page, we need a header, main, and footer section
 *  - The header appears to contain two divs on either side of it
 *  - The main appears to be a flexbox with several sections in it
 *  - The footer appears to be a flexbox with several sections it it
 *  - The header's rightmost element responsively collapses into a menu icon
 * The main section contains several subsections
 *  - A div contains the site logo, a search bar, and a financing element
 *  - A nav contains a list of product categories
 *  - A section contains a grid of products
 * The footer contains three subsections for site navigation
 *  - Each div contains a header, horizontal bar, and a list of links
 *  - Each div flows vertically
 */
const body = document.body;
const elements = [
	new Component({
		name: "header",
		subcomponents: [
			new Component({
				name: "nav",
				class: "nav-header",
			}),
			new Component({
				name: "div",
				class: "login",
			}),
		],
	}),
	new Component({
		name: "main",
		subcomponents: [
			new Component({
				name: "div",
				class: "search-header",
				subcomponents: [
					new Component({name: "h1", class: "site-lettermark", text: "Qwirty"}),
					new Component({name: "form", class: "search-bar", subcomponents: [
						new Component({name: "input", class: "input"}),
						new Component({name: "button", class: "button"}),
					new Component({name: "a", class: "advert", href: "#"}),
				]
			}),
			new Component({
				name: "nav",
				class: "product-categories",
			}),
			new Component({
				name: "section",
				class: "product-grid",
			}),
		],
	}),
	new Component({
		name: "footer",
		subcomponents: [
			new Component({
				name: "nav",
				class: "site-navigation",
				meta: "customer-support",
				subcomponents: [
					new Component({
						name: "h2",
						text: "Navigation Header-2"
					}),
					new Component({
						name: "ul",
						subcomponents: [
							"Link 1",
							"Link 2",
							"Link 3",
							"Link 4",
						].forEach(context => {
							return new Component({name: "li", text: context})
						})
					}),
				]
			}),
			new Component({
				name: "nav",
				class: "site-navigation",
				meta: "sales",
				subcomponents: [
					new Component({
						name: "h2",
						text: "Navigation Header-2"
					}),
					new Component({
						name: "ul",
						subcomponents: [
							"Link 1",
							"Link 2",
							"Link 3",
							"Link 4",
						].forEach(context => {
							return new Component({name: "li", text: context})
						})
					}),
				]
			}),
			new Component({
				name: "nav",
				class: "site-navigation",
				meta: "about-us",
				subcomponents: [
					new Component({
						name: "h2",
						text: "Navigation Header-2"
					}),
					new Component({
						name: "ul",
						subcomponents: [
							"Link 1",
							"Link 2",
							"Link 3",
							"Link 4",
						].forEach(context => {
							return new Component({name: "li", text: context})
						})
					}),
				]
			}),
		],
	}),
];


tmp = {
	// create major page elements
	header: {
		name: "header"
		// create header sub-elements
		nav: {
			// create nav sub-elements
			name: "header",
			link
		},
		login: {
			name: "div",
		},
	},
	main: {
		// create main sub-elements
		search_subsection: document.createElement("div"),
		nav: document.createElement("nav"),
		products: document.createElement("section"),
	},
	footer: {
		// create footer sub-elements
		customer_care: document.createElement("div"),
		sales: document.createElement("div"),
		about_us: document.createElement("div"),
	},
};

/** I am considering a second version that will replace the header and footer
 * with statically placed elements that retain their position at the top and
 * bottom of the page regardless of the scroll position.
 *
 * A fixed location, if you will. */

/**
 *
 * @param {Object} container_item
 * @param {HTMLElement} parent_element
 */
function create_elements(container_item, parent_element) {

	Object.entries(elements).forEach(e => {
		const section = {
			name: e[0],
			items: e[1],
		}

		// create parent/base element
		const section.element = document.createElement(section.name);
		const section.element.className = section.name;

		// assign children elements to parent/base
		Object.entries(section.items).forEach(e => {
			if ((e[0] === "label")) {
			} else {
				create_elements(e[1], )
			}
		})
		//if ((e[0] === "label" && typeof(e[1]) === "string")) {
		//	const section = {
		//		element: document.createElement(e[1])}
		//} else {
		//}

	});

	parent_element.append(section.element);
}


