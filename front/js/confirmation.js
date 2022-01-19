/*let idcommande = localStorage.getItem("identifiantCommande");
*/

const textUrl = window.location.search;
console.log(textUrl);
const objetParamsUrl = new URLSearchParams(textUrl);
const idcommande = objetParamsUrl.get("ic");
console.log(idcommande);
document.getElementById("orderId").innerText=idcommande;