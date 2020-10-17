//exemple de blocs :
["while(","a==0","){"]
["avancer();"]
["if(","true","){"]

//les blocs seront arangés dans des dictionaires, exemple:
var blocdict = {1:["while(","a==0","){"], 2:["avancer();"], 3:["if(","true","){"], 4:["avancer();"], length:4};

//pour connaitre l'ordre des blocs, on fait appel a une liste qui les ordonne. Un chiffre négatif représente une fin de bloc, exemple :
var order = [1,2,3,4,-2,-1];

//il suffit de faire une fonction qui renvoie ça a partir de ce qu'on a en haut :
"while(a==0){avancer();if(true){avancer()}}"

//à faire :
function new_block(value){
  /*création d'un nouveau bloc
    gestion des types de blocks (while, for, if, function)
    retourne l'identifiant du bloc*/
  return id;
}
function insert(bloc, pos) {
  /*insere un bloc après un autre*/
}
function remove(id) {
  /*enleve un bloc déjà créé de la liste order,
    le bloc existe toujours et peut être réinséré*/
}
function delete(id) {
  /*supprime completement un bloc qui est déjà créé
    libere une place dans le dictionaire
    enleve ce bloc de la liste order*/
}
function compile(blocdict, order) {
  /*renvoie une chaine de caractere correspondant a du code js*/
}
eval(compile(blocdict,order))//devrait executer le code et faire bouger la fusée
