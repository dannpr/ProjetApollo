/*//exemple de blocs :
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

//var action_user=["avancer","arreter"];
//liste d'action de base vide et qui sera rempli avec la fonction insert block
var user_actions=['avancer', {nom: "tantque", params :["avancer","arreter"]}];


//à faire :
/*function new_block(value){
    création d'un nouveau bloc
    gestion des types de blocks (while, for, if, function)
    retourne l'identifiant du bloc
  return id;
}
//avec le drag and drop quand on posera avancer par exemple dans la zone de depot cela rajoutera dans la liste d'action a la postion n
function insert(pos) {
    insere un bloc après un autre voir drag and drop pour prendre la position de la fusée
}
function remove(id) {
    enleve un bloc déjà créé de la liste order,
    le bloc existe toujours et peut être réinséré
}
  function delete(id) {
  supprime completement un bloc qui est déjà créé
    libere une place dans le dictionaire
    enleve ce bloc de la liste order
}*/
function compile(/*action_user*/) {
  //renvoie une chaine de caractere correspondant a du code js
  //parcours du tableau et execution du dico

  user_actions.forEach((user_action) => {//trad : pour chaque element de la liste d'action ( qui peu etre une liste de dico )
    if(typeof user_action == 'object'){//si le type de user_action c'est un objet on "rentre" dans l'action et on dans params
      action[user_action.nom](user_action.params);
    }
    else{
      action[user_action]();
    }
  });

}
//eval(compile(blocdict,order))//devrait executer le code et faire bouger la fusée
