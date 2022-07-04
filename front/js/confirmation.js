//"ic" 
const idcommande =recupererParamUrl("ic");

document.getElementById("orderId").innerText=idcommande;//inséré dans le DOM

function recupererParamUrl(parametreRecherche){
    const textUrl = window.location.search;//récupérer l'url de la page en cours     
    const objetParamsUrl = new URLSearchParams(textUrl);//récupérer tous les paramêtres depuis l'Url 
    const resultat = objetParamsUrl.get(parametreRecherche);//récupérer le paramêtre passé en argument
    return resultat;
}