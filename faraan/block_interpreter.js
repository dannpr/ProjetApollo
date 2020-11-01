//pour éviter tout conflict avec d'autres fichier, toutefonction ou variable globale sera de la forme BI_nom
/*exemple de blocs :
    -bloc simples       ["avancer"]
    -bloc imbricable    ["while",bloc_condition,liste_de_blocs]
*/
//addin (seulement sur les bloc imbricables)
//addafter (soit bloc simples ou soit sur le vide)

//variables globales :
var BI_blocklist;
var BI_count;
BI_reset();//initialise les variables

function BI_newblock(name){
  /*STR -> int
    crée un bloc et retourne son identifiant.*/
  var id = BI_count;
  BI_count++;
  // TODO:

  return id;
}
function BI_addafter(bloc, id){
  /*BLOC * int -> int
    ajoute un bloc après le bloc indiqué
    retourne l'id du bloc ajouté*/
    // NOTE: BI_blocklist.splice(n, 0, bloc); insere bloc a la position n
    // NOTE: attention au imbrications
    // TODO
}
function BI_addin(bloc, id){
  /*BLOC * int -> int
    ajoute un bloc **en dernierre position** a l'interieur du bloc indiqué
    retourne l'id du bloc ajouté*/
    // NOTE: BI_blocklist.splice(n, 0, bloc); insere bloc a la position n
    // NOTE: attention au imbrications
    // TODO:

}

function BI_add(name,id){
  /*STR * int -> int
    synthèse des 3 fonctions précédentes
    créé un nouveau bloc
    détermine automatiquement si il faut utiliser BI_addin ou BI_addafter
    retourne l'identifiant du bloc créé*/
}

function BI_move(id,newpos){
  /*int * int -> void
    change un bloc de place*/
    // TODO:
}

function BI_remove(id){
  /*int -> void
    supprime un bloc*/
  // TODO: 
}

function BI_reset(){
  /*remet la liste a 0 (quand vide l'écran)*/
  BI_count=0;
  BI_blocklist = [];
}



function BI_runcode(){
  /*traduit la liste de bloc en JS et interprette le code obtenu*/
  // NOTE: doit prendre en compte les différents types de blocs
  // TODO:

}
