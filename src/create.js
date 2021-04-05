export function create(){
    const fs = require('fs')
 
let personne = {
   "prenom" : "Marie",
   "age" : 45,
   "passion" : "loisirs créatifs, histoire",
   "taille" : 172
}
let donnees = JSON.stringify(personne)
 
fs.writeFile('personne2.json', donnees, function(erreur) {
    if (erreur) {
        console.log(erreur)}
})
}

