/*
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
*/

//variables globales :
var order=[];//liste de l'ordre dans lequel les blocks seront exécutés
var blocks={count:0};//dictionaire contenant les instructions pour chaque bloc

function new_block(value){// TODO: add value = ifelse
  /*STR value.
    Ajoute un block au dictionaire 'blocks'
    Retourne l'identifiant du bloc*/
  id=blocks.count;
  blocks.count++;
  switch (value) {
    case "while"://si c'est une boucle while
      blocks[id] = ["while(","false","){"]; //ex: ["while(","false","){"]
      break;
    case "if":
      blocks[id] = ["if(","false","){"]; //ex: ["if(","false","){"]
      break;
    case "for"://si c'est une boucle for
      blocks[id] = ["for(int iterator"+id+"=0;iterator"+id+"<",0,";iterator"+id+"++){"]
      //ex: ["for(int int iterator0=0;iterator0<",0,";iterator++){"]
      break;
    default://si c'est juste une fonction
      blocks[id] = [value+"();"]; //ex: ["avancer();"]
  }
  return id;
}
function insert(bloc, pos) {
  /*insere un bloc après un autre*/
  // TODO
}
function pop(id) {// QUESTION: comment les while, for et if doivent ils être supprimés ?
  /*enleve un bloc déjà créé de la liste order,
    le bloc existe toujours et peut être réinséré*/
    // TODO:
}
function remove(id) {
  /*INT id
    supprime completement un bloc qui est déjà créé
    enleve ce bloc de la liste order
    libere une place dans le dictionaire*/
  remove(id);
  delete(blocks[id]);
}
function compile(blocdict, order) {
  /*renvoie une chaine de caractere correspondant a du code js*/
  // TODO
}
