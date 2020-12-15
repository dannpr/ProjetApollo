class Image{
	constructor(url,width,height,left,top){
		this.url=url;
		this.width=width;
		this.height=height;
		this.left=left;
		this.top=top;
		this.position="absolute";
	}
	afficher(){
		var i=document.createElement("img");
		i.src=this.url;
		i.className='image',
		i.style.zIndex="1";
		i.style.position="absolute";
		i.style.top=this.top+"px";
		i.style.left=this.left+"px";
		i.style.width=this.width+"px";
		i.style.height=this.height+"px";
		var anim=document.querySelector(".animation");
		anim.append(i);
	}

}

class Fusee extends Image{
	constructor(left,top){
		super("fusee.png",20,40,left,top);
	}
	afficher_fusee(){
		var i=document.createElement("img");
		i.src=this.url;
		i.style.position="absolute";
		i.style.top=this.top+"px";
		i.style.left=this.left+"px";
		i.style.width=this.width+"px";
		i.style.height=this.height+"px";
		i.style.zIndex="2";
		i.style.animation="move 3s 2ms 1 linear";
		var anim=document.querySelector(".animation");
		anim.append(i);
	}

}

class Niveau{
	constructor(){
		this.obstacles=[];
		}
	ajouter(image){
		this.obstacles.push(image);
	}
	afficher_niveau(){
		for(var i=0;this.obstacles.length>i;i++){
			(this.obstacles[i]).afficher();
		}
	}
}

var m0=new Image("meteor.png",80,90,0,0);
var m1=new Image("meteor.png",80,90,150,90);
var niveau0= new Niveau(1);
niveau0.ajouter(m0);
var niveau1=new Niveau(1);
niveau1.ajouter(m1);

var Monjeu={
	fusee:new Fusee (180,430),
	niveau:[niveau0,niveau1],
	i:0,
}

console.log(Monjeu.niveau);
console.log(niveau0.obstacles);
console.log(Monjeu.fusee);

function affichage(){
	var level=Monjeu.i;
	var niveau=Monjeu.niveau[level];
	Monjeu.fusee.afficher_fusee();
	niveau.afficher_niveau();
}

Monjeu.i=1;
affichage();
