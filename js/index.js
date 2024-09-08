// Copyright Victor Wade

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
class Menu {
	constructor(list) {
		this.menu = document.createElement("menu");

		this.add_items(list);
	}

	add_items(list) {
		list.forEach((e) => {
			const li = document.createElement("li");
			const element = e.element;

			li.append(element);
			this.menu.append(li);
		});
	}

	get element() {
		return this.menu;
	}
}
/** info = {
 * 	type: String,
 * 	header: String,
 * 	text: String,
 * 	menu: Array[Component],
 * }
 *
 */
class Card {
	constructor(info) {
		this.container = document.createElement(info.type || "card");

		const header = info.header || null;
		const footer = info.footer || null;
		const img = info.img || null;
		const text = info.text || null;
		const link = info.link || null;
		const menu = Array.isArray(info.menu) ? info.menu : null;
		const subcomponents = Array.isArray(info.subcomponents)
			? info.subcomponents
			: null;

		if (header) {
			this.header = document.createElement("div");

			this.header.className = "card-header";

			if (typeof header === "string") {
				const card_header_text = document.createElement("h2");
				card_header_text.innerText = header;
				this.header.append(card_header_text);
			} else {
				const card_header = header.element;
				this.header.append(card_header);
			}

			this.container.append(this.header);
		}
		{
			this.main = info.body || document.createElement("section");
			this.main.className = "card-main";

			if (img) {
				this.img = document.createElement("img");
				this.img.src = img;
				this.img.className = "card-img";

				this.main.append(this.img);
			}
			if (text) {
				this.text = document.createElement("text");
				this.text.innerText = text;
				this.text.className = "card-text";

				this.main.append(this.text);
			}
			if (link) {
				this.link = document.createElement("a");
				this.link.href = link.href;
				this.link.innerText = link.text || link.innerText;
				this.link.className = "card-hyperlink";

				this.main.append(this.link);
			}
			if (subcomponents) {
				subcomponents.forEach((e) => {
					const element = e.element;
					element.className = "card-main-item";

					this.main.append(element);
				});
			}
			if (menu) {
				this.menu = new Menu(menu);
				this.menu.element.className = "card-menu";

				this.main.append(this.menu.element);
			}
			this.container.append(this.main);
		}
		if (footer) {
			this.footer = document.createElement("div");

			this.footer.className = "card-footer";
			if (typeof footer === "string") {
				const card_footer_text = document.createElement("text");
				card_footer_text.innerText = footer;
				this.footer.append(card_footer_text);
			} else {
				const card_footer = footer.element;
				this.footer.append(card_footer);
			}
			this.container.append(this.footer);
		}
	}

	get element() {
		return this.container;
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
				subcomponents: [
					"Clothing & Shoes",
					"Electronics",
					"Books",
					"Food & Drinks",
					"Appliances",
					"Sports & Outdoor",
					"Toys & Baby",
					"Garden",
				].map((e) => {
					return new Card({ link: { text: e, href: "#" } });
				}),
			}),
			new Component({
				name: "section",
				class: "product-grid",
				subcomponents: Array(16)
					.fill()
					.map((e) => {
						return new Card({
							header: "Your Product!",
							text: "lorem ipsum",
							img: "#",
							footer: "Price: $$$",
							menu: [new Component({ name: "text", text: "some text" })],
						});
					}),
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
					new Menu(
						["Link 1", "Link 2", "Link 3", "Link 4"].map((context) => {
							return new Component({ name: "a", href: "#", text: context });
						})
					),
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
					new Menu(
						["Link 1", "Link 2", "Link 3", "Link 4"].map((context) => {
							return new Component({ name: "a", href: "#", text: context });
						})
					),
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
					new Menu(
						["Link 1", "Link 2", "Link 3", "Link 4"].map((context) => {
							return new Component({ name: "a", href: "#", text: context });
						})
					),
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
