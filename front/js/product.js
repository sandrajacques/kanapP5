//recuperer id d'un produit depuis l'url depuis la page en cours
const textUrl = window.location.search;
console.log(textUrl);
const objetParamsUrl = new URLSearchParams(textUrl);
const productId = objetParamsUrl.get("id");
console.log(productId);

//faire "une requête http" (fetch par défaut c'est get)avec l'id du produit
//récupérer un produit par son id  
//function peut etre remplacé par =>(fonction fléché arrow function)
fetch(`http://localhost:3000/api/products/${productId}`)
.then((response)=>{
    console.log(response);
    response.json().then((produit)=>{
    console.log(produit);
    //manipulation du DOM
        document.getElementById("title").textContent=produit.name;
        document.getElementById("description").textContent=produit.description;
        document.getElementById("price").textContent= formatMonetaire(produit.price);
        document.getElementById("produit-image").innerHTML=`<img id="imageUrl"
        src="${produit.imageUrl}"
        alt="${produit.altTxt}"
    />`;
    for(let couleur of produit.colors){
        console.log(couleur);
        document.getElementById("colors")
        .insertAdjacentHTML("afterbegin",` <option value="${couleur}">${couleur}</option>`)
    };
    });
});


//le clic du bouton "ajouter au panier"
function addToCart() {
    
    let panier = JSON.parse(localStorage.getItem("produitsChoisis"));
    if (!panier){panier=[]};

    // récupération de l'ID
    const textUrl = window.location.search;
    const objetParamsUrl = new URLSearchParams(textUrl);
    const productId = objetParamsUrl.get("id");
    console.log(productId);

    const nomProduit = document.getElementById("title").textContent;
    const price = document.getElementById("price").textContent;
    const quantite = document.getElementById("quantity").value;
  //const description = document.getElementById("description").textContent;
    const color = document.getElementById("colors").value;
    const imageUrl = document.getElementById("imageUrl").getAttribute("src");
    const altImg = document.getElementById("imageUrl").getAttribute("alt");

    let produitChoisi = {id:productId, nom:nomProduit, prix:price, qte:quantite, color:color, imgUrl:imageUrl, altTxt:altImg};
    let produitExistant = panier.find(produit=>(produit.id==produitChoisi.id &&produit.color==produitChoisi.color));
    if(!produitExistant){
        panier.push(produitChoisi);
    }
    else{produitExistant.qte=parseInt(produitExistant.qte)+parseInt(produitChoisi.qte);
        let panierFiltre = panier.filter(produit=>(produit.id!=produitExistant.id &&produit.color!=produitExistant.color));
        panierFiltre.push(produitExistant);
        panier=panierFiltre;
    }

    let formatTextProduitChoisi = JSON.stringify(panier);    
    localStorage.setItem("produitsChoisis",formatTextProduitChoisi);//stocker dans le stockage local
alert("Votre produit a été ajouté au panier");
} 


function formatMonetaire(prix){
    const prixFormate = parseFloat(prix).toFixed(2);
    return prixFormate;
}



