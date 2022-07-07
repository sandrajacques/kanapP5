//Récupérer l'objet JSON (produitsChoisis) de la localStorage
const textProduitsChoisis = localStorage.getItem("produitsChoisis") || "[]"; //tableau vide si "produitsChoisis" est introuvable
let panierProduits = JSON.parse(textProduitsChoisis); //transformer un texte en objet

affichagePanier(); //execution de la fonction dès l'ouverture de la page cart.html

function affichagePanier() {
    //initialisation des variables pour le calcul du prix total et de la quantité totale
    let prixTotal = 0;
    let qteTotale = 0;

    for (const produit of panierProduits) {
        //parcourir les produits dans le tableau panierProduits
        prixTotal =
            prixTotal + parseFloat(produit.qte) * parseFloat(produit.prix); //calculer le prix total en cours
        qteTotale = qteTotale + parseInt(produit.qte);

        //insertion des données du produit en cours dans le DOM
        document.getElementById("cart__items").insertAdjacentHTML(
            "beforeend",
            `<article class="cart__item">
                <div class="cart__item__img">
                <img src="${produit.imgUrl}" alt="${produit.altTxt}">
                </div>
                <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${produit.nom}</h2>
                    <p>${produit.color}</p>
                    <p>${formatMonetaire(produit.prix)}€</p>
                </div>
                <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input id="${produit.id}-${produit.color}" 
                onchange="changerQte('${produit.id}','${
                produit.color
            }')" type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${
                produit.qte
            }">
                    </div>
                    <div class="cart__item__content__settings__delete">
                    <p onclick="supprimerProduit('${produit.id}','${
                produit.color
            }')" class="deleteItem">Supprimer</p>
                    </div>
                </div>
                </div>
            </article>`
        );
    } //fin de la boucle for

    document.getElementById("totalPrice").innerText =
        formatMonetaire(prixTotal);
    document.getElementById("totalQuantity").innerText = qteTotale;
}
/**
 * @param {number} prix en numérique et ajoute 2 chiffres après la virgule
 * @returns {string} prix formaté
 */
function formatMonetaire(prix) {
    const prixFormate = parseFloat(prix).toFixed(2);
    return prixFormate;
}
/**
 * Supprime un produit du panier identifié par son Id et sa couleur
 * et raffraichir l'affichage du panier
 * @param  {number} idDelete
 * @param  {string} colorDelete
 */
function supprimerProduit(idDelete, colorDelete) {
    let panierFiltre = panierProduits.filter(produit=>
        produit.id != idDelete || produit.color != colorDelete
    );
    //console.log("panierfiltre");

    let formatTextProduitChoisi = JSON.stringify(panierFiltre);
    localStorage.setItem("produitsChoisis", formatTextProduitChoisi); //stocker dans le stockage local
    document.getElementById("cart__items").innerHTML = "";

    panierProduits = panierFiltre;
    affichagePanier();
}

/**
 * @param  {} idProduit
 * @param  {} couleur
 */
function changerQte(idProduit, couleur) {
    //extraire le produit en cours
    let newQte = panierProduits.find(
        (p) => p.id == idProduit && p.color === couleur
    );

    let idInput = idProduit + "-" + couleur; //Trouver l'id de l'input de la quantité
    newQte.qte = document.getElementById(idInput).value;
    //supprimer le produit en cours du panier
    let panierFiltre = panierProduits.filter(
        (p) => p.id != idProduit || p.color != couleur
    );
    panierFiltre.push(newQte); //insérer le produit en cours avec la nouvelle quantité
    panierProduits = panierFiltre; //mise à jour de la liste du panier
    localStorage.setItem('produitsChoisis',JSON.stringify(panierProduits)); //mise à jour du panier dans le stockage local
    let prixTotal = 0;
    let qteTotale = 0;
    console.log("verification panier");
    console.log(panierProduits);
    for (const produit of panierProduits) {
        prixTotal =
            prixTotal + parseFloat(produit.qte) * parseFloat(produit.prix);
        console.log("prix total");
        console.log(prixTotal);
        qteTotale = qteTotale + parseInt(produit.qte);
    }
    document.getElementById("totalPrice").innerText =
        formatMonetaire(prixTotal);
    document.getElementById("totalQuantity").innerText = qteTotale;
}
function formulaireValide() {
    const regexName = /^[A-Z][A-Za-zéç]+(\s[A-Z][A-Za-zéç]+)*$/;
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const regexAddress = /^[A-Za-z0-9éç°',]+(\s[A-Za-z0-9éç°',]+)*$/;
    const regexCity = /^[A-Z][A-Za-zéç]+(\s[A-Z][A-Za-zéç]+)*$/;

    const prenom = document.getElementById("firstName").value;
    if (prenom === "") {
        alert("prenom vide");
        return false;
    }
    if (!regexName.test(prenom)) {
        alert("veuillez introduire un prénom valide");
        return false;
    }
    const nom = document.getElementById("lastName").value;
    if (nom === "") {
        alert("nom vide");
        return false;
    }
    if (!regexName.test(nom)) {
        alert("veuillez introduire un nom valide");
        return false;
    }
    const adresse = document.getElementById("address").value;
    if (adresse === "") {
        alert(" adresse vide");
        return false;
    }
    if (!regexAddress.test(adresse)) {
        alert("veuillez introduire une adresse valide");
        return false;
    }
    const ville = document.getElementById("city").value;
    if (ville === "") {
        alert("ville vide");
        return false;
    }
    if (!regexCity.test(ville)) {
        alert("veuillez introduire un nom de ville valide");
        return false;
    }
    const email = document.getElementById("email").value;
    if (email === "") {
        alert("email vide");
        return false;
    }
    if (!regexEmail.test(email)) {
        alert("veuillez introduire un email valide");
        return false;
    }
}

function validerCommande() {
    if (panierProduits.length === 0) {
        //vérifier si le panier est vide
        alert("Veuillez svp choisir au moins un produit");
        return;
    }

    if (formulaireValide() === false) {
        //vérifier si le formulaire est valide
        return;
    }

    //récupération des données depuis le DOM des input du formulaire
    const prenom = document.getElementById("firstName").value;
    const nom = document.getElementById("lastName").value;
    const adresse = document.getElementById("address").value;
    const ville = document.getElementById("city").value;
    const email = document.getElementById("email").value;

    //Création d'un objet JSON contenant les données du formulaire
    //La structure de l'objet est imposée par le back-end
    const infos = {
        firstName: prenom,
        lastName: nom,
        address: adresse,
        city: ville,
        email: email,
    };
    //création d'un objet JSON contenant les informations du client et un tableau des Id des produits
    //Les champs contact et products font partie de la structure exigée par le back-end
    const order = {
        contact: infos,
        products: panierProduits.map((produit) => produit.id),
    };
    //Renseigner les paramêtres de la requête http POST qui va envoyer les données au back-end
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
    };
    //envoyer les informations de la commande au back-end
    fetch("http://localhost:3000/api/products/order", requestOptions)
        .then((response) => {
            if (response.ok == true) {
                alert("Votre Commande reçu avec succés!");

                localStorage.removeItem("produitsChoisis"); //suppression du panier dans le local storage
                response.json().then((informationsData) => {
                    window.location.replace(
                        `confirmation.html?ic=${informationsData.orderId}`
                    ); //ouvrir une page avec js (redirect: redirige vers la page de confirmation)avec comme paramêtre "ic" = id de la commande
                });
                return;
            } else {
                alert("Erreur!");
                return;
            }
        })
        .catch((error) => {
            alert("Erreur: " + error);
        });
}
