//pour éviter tout conflict avec d'autres fichier, toute fonction ou variable globale sera de la forme BI_nom

function BI_query(id) {
  /*STR -> STR
    prends en parametre l'identifiant de la zone de depot
    renvoie  une liste de blocs sous forme de texte
    ex: "<Avancer><Tourner a droite><Avancer>"*/
  // String buffer
  var buffer = "";
  // int i, start
  var i,start;
  /*on recupere tout l'HTML contenu dans la zone de depot*/
  buffer = document.querySelector(id).innerHTML;
  /*on parcours et modifie le texte obtenu pour qu'il soit plus lisible*/
  i=0;
  while(i<buffer.length) {
    if (buffer.slice(i,i+7)=="<button") {
      /*si on detecte l'ouverture d'une balise <button>
        on retient l'indice ou commence la balise et on continue d'avancer*/
      start = i;
      i += 7;
      while ( buffer[i] != '>') {
        /*tant que la balise ne se referme pas, on continue d'avancer*/
        i++;
      }
      /*on remplace tout ce qu'on a lu par "<" et on reprends le texte la ou on s'est arrete*/
      buffer = buffer.slice(0,start) + '<' +buffer.slice(i+1);
      i -= i-start; //on modifie l'indice pour qu'on reprenne la lecture au bon endroit
    } else if (buffer.slice(i,i+8)=="</button") {
      /*si on detecte la fermeture d'une balise </button>
        on efface 8 caracteres suivant pour qu'il ne reste que ">" */
      buffer = buffer.slice(0,i)+buffer.slice(i+8);
      i -= 10;
    } else {
      /*sinon on continue d'avancer*/
      i++;
    }
  }
  return buffer;
}

function BI_bloctojavascript(buffer) {
  /*STR -> STR
    prends en parametre une liste de blocs sous forme de texte
    ex: "<Avancer><Tourner a droite><Avancer>"
    et renvoie une suite d'instructions JavaScript
    ex : "avancer();tourneradroite();avancer();"*/
  //String code
  var code = "";
  /*la fonction matchwith permet d'alleger l'ecriture du code*/
  function matchwith (bloc,command) {
    /*STR * STR -> BOOL
      si le prochain bloc de buffer == bloc
      on ajoute la commande command au resultat(var code) et on enleve bloc de buffer
      renvoie true si le bloc a ete reconnu, false sinon
      voir exemple d'utilisation plus bas*/
    if (buffer.slice(0,bloc.length) == bloc) {
      code += command;
      buffer = buffer.slice(bloc.length);
      return true;
    }
    return false;
  };
  /*on essaie de traduire tous les blocs jusqu'a ce que buffer soit vide
  ou qu'une fontion ne soit pas reconnue
  (rappel : une fois qu'un bloc est traduit il est retire de buffer)*/
  while (buffer != "") {
    if (!(//on essaie de traduire le bloc suivant
      matchwith("<Avancer>", "avancer(direction);") ||
      matchwith("<Tourner à gauche>", "tourner(direction,\"antihoraire\")") ||
      matchwith("<Tourner à droite>", "tourner(direction,\"horaire\");")
    )){// si le bloc suivant ne peut etre traduit, erreur et return
      console.error("BI_bloctojavascript ERROR 1 : unknown bloc !");
      return "";
    }
  }
  return code;
}

function BI_runcode(){
  /*execute les balises dans la zone de depot*/
  eval(BI_bloctojavascript(BI_query("#depot")));
}
