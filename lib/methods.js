Meteor.methods({
  // method to add a new document
  addWorld:function(hostName, worldName){
    var world;
    if (!this.userId){// not logged in
      console.log("please log in");
      return;
    }
    else if(Worlds.findOne({worldName:worldName})){
      console.log("There is already a world with that name");
      return;
    }
    else {
      gamepin = "1234";
      world = {owner:this.userId, createdOn:new Date(),hostName:hostName, worldName:worldName, gamepin:gamepin, 
        players:[{name:hostName, owner: this.userId, createdOn:new Date()}]};
      var id = Worlds.insert(world);
      console.log("addWorld method: got an id "+id);
      return id;
    }
  },
   addPlayer:function(gamepin, name){
    var world = Worlds.findOne({gamepin:gamepin});
    var player;
    if (world){// there is a world with that pin

      player = {owner:this.userId, createdOn:new Date(), name:name};

      Worlds.update({gamepin:gamepin},
        {$push:{
          "players":player
        }
      }
      );

      console.log("addPlayer update world");
     // return id;      
    }
    else {
      console.log("no world with that pin");
      return;
    }
  }, 
  // method to add editing users to a document
  // addEditingUser:function(){
  //   var doc, user, eusers;
  //   doc = Documents.findOne();
  //   if (!doc){return;}// no doc give up
  //   if (!this.userId){return;}// no logged in user give up
  //   // now I have a doc and possibly a user
  //   user = Meteor.user().profile;
  //   eusers = EditingUsers.findOne({docid:doc._id});
  //   if (!eusers){
  //     eusers = {
  //       docid:doc._id, 
  //       users:{}, 
  //     };
  //   }
  //   user.lastEdit = new Date();
  //   eusers.users[this.userId] = user;

  //   EditingUsers.upsert({_id:eusers._id}, eusers);
  // }
})
