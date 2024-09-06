/** HTML Component
 *
 * @param {Object} collection
 * collection is a dict {} of items to include
 * child items should each be a Component type, apiece
 */
class Component {
	constructor(collection = null) {
		if (collection && collection.name) {
			this.type = collection.name;
			this.id = collection.id || null;
			this.src = collection.src || null;
			this.href = collection.href || null;
			this.text = collection.text || null;
			this.label = collection.class || collection.name;
			this.sublets = Array.isArray(collection.subcomponents)
				? collection.subcomponents
				: null;
		} else {
			console.error(
				`ERROR: Component object not properly confifgured: ${{
					is_defined: !!collection,
					has_type: !!collection.name,
					has_label: !!collection.class,
					has_child_elements:
						Array.isArray(collection.subcomponents) &&
						0 < collection.subcomponents.length,
				}}`
			);
		}
	}

	get children() {
		const elements = [];
		this.sublets.forEach((e) => {
			elements.push(e.export);
		});
		return elements;
	}

	get element() {
		return this.export;
	}

	get export() {
		if (!this.result) {
			this.result = document.createElement(this.type);
			if (this.id) this.result.id = this.id;
			if (this.src) this.result.src = this.src;
			if (this.href) this.result.href = this.href;
			this.result.innerText = this.text ? this.text : null;
			this.result.className = this.label;
			if (Array.isArray(this.sublets)) {
				this.sublets.forEach((e) => {
					this.result.append(e.element);
				});
			}
		}
		return this.result;
	}
}
class Card {
	constructor(info) {
		this.body = document.createElement("card");

		const header = info.header || null;
		const text = info.text || null;
		const menu = Array.isArray(info.menu) ? info.menu : null;

		if (header) {
			this.header = document.createElement("h2");
			this.header.innerText = header;
			this.header.className = "card-header";

			this.body.append(this.header);
		}
		if (text) {
			this.text = document.createElement("div");
			this.text.innerText = text;
			this.text.className = "card-text";

			this.body.append(this.text);
		}
		if (menu) {
			this.menu = document.createElement("menu");
			this.menu.className = "card-menu";

			menu.forEach((e) => {
				const li = document.createElement("li");

				// make modifications to the menu item
				e.className = "card-menu-item";

				// append each menu item to the list item
				li.append(e);

				this.menu.append(li);
			});

			this.body.append(this.menu);
		}
	}

	get card() {
		return this.body;
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
		name: "header", // contains the top nav bar and search bar
		class: "page",
		subcomponents: [
			new Component({
				name: "nav",
				class: "top-bar",
				subcomponents: [
					new Component({
						name: "menu",
						subcomponents: [
							"Big Deals",
							"Top Brands",
							"Suggestions",
							"Help & Contact", // This can go at the bottom, site map
						].map((e) => {
							return new Component({
								name: "li",
								subcomponents: [
									new Component({ name: "a", href: "#", text: e }),
								],
							});
						}),
					}),
					new Component({
						name: "div",
						class: "login",
					}),
				],
			}),
			new Component({
				name: "div",
				class: "search-header",
				subcomponents: [
					new Component({
						name: "h1",
						class: "logo",
						text: "Qwirty",
					}),
					new Component({
						name: "form",
						class: "search-bar",
						subcomponents: [
							new Component({ name: "input", class: "input" }),
							new Component({ name: "button", class: "button" }),
						],
					}),
					new Component({ name: "a", class: "advert", href: "#" }),
				],
			}),
		],
	}),
	new Component({
		name: "main",
		class: "page",
		subcomponents: [
			new Component({
				name: "nav",
				class: "nav-categories",
			}),
			new Component({
				name: "section",
				class: "product-grid",
			}),
		],
	}),
	new Component({
		name: "footer",
		class: "page",
		subcomponents: [
			new Component({
				name: "nav",
				class: "site-navigation",
				meta: "customer-support",
				subcomponents: [
					new Component({
						name: "h2",
						text: "Navigation Header-2",
					}),
					new Component({
						name: "menu",
						subcomponents: ["Link 1", "Link 2", "Link 3", "Link 4"].map(
							(context) => {
								return new Component({
									name: "li",
									subcomponents: [
										new Component({ name: "a", href: "#", text: context }),
									],
								});
							}
						),
					}),
				],
			}),
			new Component({
				name: "nav",
				class: "site-navigation",
				meta: "sales",
				subcomponents: [
					new Component({
						name: "h2",
						text: "Navigation Header-2",
					}),
					new Component({
						name: "menu",
						subcomponents: ["Link 1", "Link 2", "Link 3", "Link 4"].map(
							(context) => {
								return new Component({
									name: "li",
									subcomponents: [
										new Component({ name: "a", href: "#", text: context }),
									],
								});
							}
						),
					}),
				],
			}),
			new Component({
				name: "nav",
				class: "site-navigation",
				meta: "about-us",
				subcomponents: [
					new Component({
						name: "h2",
						text: "About Us",
					}),
					new Component({
						name: "menu",
						subcomponents: ["Link 1", "Link 2", "Link 3", "Link 4"].map(
							(context) => {
								return new Component({
									name: "li",
									subcomponents: [
										new Component({ name: "a", href: "#", text: context }),
									],
								});
							}
						),
					}),
				],
			}),
		],
	}),
];

/** I am considering a second version that will replace the header and footer
 * with statically placed elements that retain their position at the top and
 * bottom of the page regardless of the scroll position.
 *
 * A fixed location, if you will. */

/** For now, we continue as before. */
console.log(elements);
elements.forEach((e) => {
	e.children.forEach((e) => {
		const d = e;
		console.log(d.childNodes);
	});
	console.log(e.children);
});
elements.forEach((e) => {
	body.append(e.element);
});
