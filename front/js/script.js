//envoyer une requête http GET au backend
//Afficher les données reçues sur la page d'accueil par la manipulation du DOM
fetch("http://localhost:3000/api/products")
    .then((response) => response.json())//extraire le contenu json de la réponse
    .then((produits) => {       
        for (let i = 0; i < produits.length; i++) {//parcourir le tableau json des produits
            //insérer chaque produit dans la page html
            document.getElementById("items").insertAdjacentHTML(
                //insérer à la fin de "items"
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

