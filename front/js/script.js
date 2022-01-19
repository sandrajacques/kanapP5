fetch("http://localhost:3000/api/products").then(function (response) {
    response.json().then(function (produits) {
        //document.getElementById("items").textContent=JSON.stringify(produits);
        for (let i = 0; i < produits.length; i++) {
            //console.log(produits[i].description);
            //console.log(produits[i].name);
            document.getElementById("items").insertAdjacentHTML(
                "beforeend",
                `<a href="./product.html?id=${produits[i]._id}">
                <article>
                <img src="${produits[i].imageUrl}" alt="${produits[i].altTxt}">
                <h3 class="productName">${produits[i].name}</h3>
                <p class="productDescription">${produits[i].description}</p>
                </article>
                </a>`
            );
        }
    });
});
