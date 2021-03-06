// const apiUrl = "http://localhost:3000/"
const apiUrl = "https://reaktor-assignment-warehouse.herokuapp.com/"
const productNode = document.getElementById("products")
const spinnerNode = document.getElementById("spinner-container")

async function displayProducts(category) {

	productNode.innerHTML = ''
	spinnerNode.classList.add("loader");

	products = await fetchProducts(category)
	let productsHtml = new Array()
	if (products["err"] != null) {
		productsHtml.push(products["err"])
	} else {
		for (let i=0; i<products.length; i++){
			productsHtml.push('<tr><td>')
			for (let attribute in products[i]) {
				productsHtml.push(products[i][attribute])
				productsHtml.push('</td><td>')
			}
			productsHtml.pop()
			productsHtml.push('</td></tr>')
		}
	}
	productNode.innerHTML = productsHtml.join('')

	spinnerNode.classList.remove("loader");
}

async function fetchProducts(category) {
	let response = await fetch(apiUrl +"products/"+ category)
	let products = await response.json()
	return products
}
