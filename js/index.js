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
const elements = {
	// create major page elements
	header: {
		// create header sub-elements
		nav: document.createElement("nav"),
		login: document.createElement("div"),
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

Object.entries(elements).forEach(e => {
	const section = {
		name: e[0],
		items: e[1],
		element: undefined
	};
	const section.element = document.createElement(section.name);

	body.append(section.element);
});
