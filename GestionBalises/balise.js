const baliseAll = document.querySelectorAll('.balise');
const box= document.querySelectorAll('.zonedepot');

baliseAll.forEach(balise =>{
  balise.addEventListener('dragstart', dragStart);
  balise.addEventListener('dragend', dragEnd);
});


  function dragStart(event){
    console.log("dragstart");
    event.dataTransfer.setData("text", event.target.name);
    this.className+='tenu';
  }

  function dragEnd(event){
    console.log("dragend");
    this.className='balise';
  }


box.forEach(vide =>{
  vide.addEventListener('dragover', dragOver);
  vide.addEventListener('dragenter', dragEnter);
  vide.addEventListener('dragleave', dragLeave);
  vide.addEventListener('drop', dragDrop);
});



function dragOver(e){
  console.log("dragover");

  e.preventDefault();
}

function dragEnter(e){
  console.log("dragenter");
  e.preventDefault();
  e.target.classList.add('hovered');
}

function dragLeave(event){
  console.log("dragleave");
  event.target.classList.remove('hovered');
}

function dragDrop(event){
  event.preventDefault();
  console.log("drop");
  const balise= event.dataTransfer.getData("text");
  if(balise==='Balise1')
    event.target.insertAdjacentHTML("beforeend", '<ul><button class="balise" draggable="true">Avancer</button></ul>');
  if(balise==='Balise2')
    event.target.insertAdjacentHTML("beforeend", '<ul><button class="balise" draggable="true">Tourner à gauche</button></ul>');
  if(balise==='Balise3')
    event.target.insertAdjacentHTML("beforeend", '<ul><button class="balise" draggable="true">Tourner à droite</button></ul>');
  if(balise==='Balise4')
    event.target.insertAdjacentHTML("beforeend", '<div><button class="balise" draggable="true">Boucle</button></div>');
  this.className='zonedepot';

}
