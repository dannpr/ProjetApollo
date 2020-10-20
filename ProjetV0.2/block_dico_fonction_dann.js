//block avancer
action = {
  avancer : function(){
    console.log("avancer");
  },
  arreter : function(){
    console.log("arreter");
  },
  tantque : function(nom_actions) {
//while(/*posFuse!=posArrive*/){
      nom_actions.forEach((nom_action/*param*/) => {
        this[nom_action]();
      });
      //}
  }
};

//action[name]()
