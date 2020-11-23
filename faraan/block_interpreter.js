//pour éviter tout conflict avec d'autres fichier, toute fonction ou variable globale sera de la forme BI_nom

function BI_query(id) {
  var buffer = "";
  var i,start;
  buffer = document.querySelector(id).innerHTML;
  i=0;
  while(i<buffer.length) {
    if (buffer.slice(i,i+7)=="<button") {
      start = i;
      i += 7;
      while ( buffer[i] != '>') {
        i++;
      }
      buffer = buffer.slice(0,start) + '<' +buffer.slice(i+1);
      i -= i-start;
    } else if (buffer.slice(i,i+8)=="</button") {
      buffer = buffer.slice(0,i)+buffer.slice(i+8);
      i -= 10;
    } else {
      i++;
    }
  }
  return buffer;
}

function BI_bloctojavascript(buffer) {
  var res = "";
  function matchwith (bloc,command) {
    if (buffer.slice(0,bloc.length) == bloc) {
      res += command;
      buffer = buffer.slice(bloc.length);
      return true;
    }
    return false;
  };
  while (buffer != "") {
    if (!(
      matchwith("<Avancer>", "avancer();") ||
      matchwith("<Tourner à gauche>", "tourneragauche();") ||
      matchwith("<Tourner à droite>", "tourneradroite();")
    )){
      console.error("BI_bloctojavascript ERROR 1 : unknown bloc !");
      return "";
    }
  }
  return res;
}

function BI_runcode(){
  eval(BI_bloctojavascript(BI_query("#depot")))
}
