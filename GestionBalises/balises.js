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

// SUPPRESSION d'un block 
const deleteBox = document.querySelector('.delete');


// ajout de l'évènement quand on CLIQUE sur le bouton supprimer

deleteBox.addEventListener('click', () => {
  // Selection de tous les block présents dans la zone depot
  const blocks = document.querySelectorAll('ul button.balise');
  // parcours tous les block pour leur ajouter l'écouteur d'évènement onclick et le supprimer quand il est déclenché
  
  blocks.forEach(e => {
    e.addEventListener('click', e.remove);
    e.stopPropagation();
  })

});

/*création d'un écouteur de CLAVIER pour supprimer
une balise avec la touche delete

        selection des balises dans la zone dépôt
        const blocksList = document.querySelectorAll('ul button.balise');

        blocksList.forEach(e => {
        blocks.forEach(e => {
                //e.addEventListener('click', deleteb(e));
                //e.stopPropagation();
        })
        function delete(b){
            b.addEventListener("keydown", keyDown())
        }

        le joueur clique sur un block à supprimer 
        le joueur presse la touche delete de son clavier*/



