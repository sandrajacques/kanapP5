//récupération du bouton par son id et ajouter l'évènement click et l'associer avec la fonction AddToCart 
document.getElementById("addToCart").addEventListener("click", addToCart);

const productId = recupererIdUrl();

//faire "une requête http" (fetch par défaut c'est get)avec l'id du produit
//récupérer un produit par son id  
//function peut etre remplacé par =>(fonction fléché arrow function)
fetch(`http://localhost:3000/api/products/${productId}`)
.then((response)=>{    
    response.json().then((produit)=>{    
    //manipulation du DOM
        document.getElementById("title").textContent=produit.name;
        document.getElementById("description").textContent=produit.description;
        document.getElementById("price").textContent= formatMonetaire(produit.price);        
        document.getElementById("produit-image").innerHTML=`<img id="imageUrl"
        src="${produit.imageUrl}"
        alt="${produit.altTxt}"
    />`;
    for(let couleur of produit.colors){
        
        document.getElementById("colors")
        .insertAdjacentHTML("afterbegin",` <option value="${couleur}">${couleur}</option>`)
    };
    });
});


//le clic du bouton "ajouter au panier"
function addToCart() {
    
    let panier = JSON.parse(localStorage.getItem("produitsChoisis"));//getItem pour trouver un élément dans la localStorage    
    if (!panier){panier=[]};//si le produitsChoisis est introuvable alors on initialise un panier vide 

    // récupération de l'ID
    const productId = recupererIdUrl();

    //récupérer les informations du produit en cours depuis le DOM
    const nomProduit = document.getElementById("title").textContent;
    //const price = document.getElementById("price").textContent;
    const quantite = document.getElementById("quantity").value;  
    const color = document.getElementById("colors").value;
    const imageUrl = document.getElementById("imageUrl").getAttribute("src");
    const altImg = document.getElementById("imageUrl").getAttribute("alt");

    if (color==""){
        alert("Veuillez choisir une couleur");
        return;
    }

    //création d'un oblet JSON avec les informations du produit en cours
    let produitChoisi = {id:productId, nom:nomProduit, qte:quantite, color:color, imgUrl:imageUrl, altTxt:altImg};

    //vérification si le produit est déjà dans le panier avec le même ID et la meme couleur
    let produitExistant = panier.find(produit=>(produit.id==produitChoisi.id &&produit.color==produitChoisi.color));

    if(!produitExistant){
        panier.push(produitChoisi);
    }
    else{//augmenter la qte du produit existant
        produitExistant.qte=parseInt(produitExistant.qte)+parseInt(produitChoisi.qte);

        //supprime le produit choisi de la liste en utilisant la technique du filtrage 
        let panierFiltre = panier.filter(produit=>(produit.id!=produitExistant.id &&produit.color!=produitExistant.color));
        
        //ajoute le produit existant à la liste pour remplacer la qte existante
        panierFiltre.push(produitExistant);
        //mise à jour du panier 
        panier=panierFiltre;
    }

    //conversion de l'objet Panier JSON en texte
    let formatTextProduitChoisi = JSON.stringify(panier); 

    //mise à jour du panier dans le localStorage  
    localStorage.setItem("produitsChoisis",formatTextProduitChoisi);//stocker dans le stockage local
    //affichage d'un message de confirmation pour l'utilisateur
    alert("Votre produit a été ajouté au panier");
} 


function formatMonetaire(prix){//formater le prix en euros avec 2 chiffres après la virgule
    const prixFormate = parseFloat(prix).toFixed(2);
    return prixFormate;
}

function recupererIdUrl(){
    const textUrl = window.location.search;//récupérer l'url de la page en cours     
    const objetParamsUrl = new URLSearchParams(textUrl);//récupérer tous les paramêtres depuis l'Url 
    const productId = objetParamsUrl.get("id");//récupérer le paramêtre qui a pour nom "id"
    return productId;
}



