import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';


Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  this.render('welcome', {
    to:"main"
  });
  this.render('navbar',{
	to:"navbar"
  });
});

Router.route('/join', function () {
  this.render('gamepin_form', {
    to:"main"
  });
  this.render('navbar',{
	to:"navbar"
  });
});

Router.route('/create', function () {
  this.render('world_form', {
    to:"main"
  });
  this.render('navbar',{
	to:"navbar"
  });
});

Router.route('/play', function () {
  this.render('game_page', {
    to:"main"
  });
  this.render('navbar',{
	to:"navbar"
  });
});

//Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
//  this.counter = new ReactiveVar(0);
//});

//Template.hello.helpers({
 // counter() {
 //   return Template.instance().counter.get();
 // },
//});

Template.welcome.events({

	"click .create_world_button":function(event){
		console.log("create world")
	}
})

Template.gamepin_form.events({

	"submit .js-gamepin-form":function(event){		
		gamepin = event.target.form_gamepin.value;
		name = event.target.form_name.value;
		console.log("gamepin: " + event.target.form_gamepin.value)
		console.log("name: " + event.target.form_name.value)
    if (Worlds.findOne({gamepin:gamepin})){
    	Meteor.call("addPlayer", gamepin, name)
		Session.set('gamepin', gamepin);
    };
    console.log("session gamepin: " + Session.get("gamepin"))
		//Meteor.call("addWorld", gamepin, name);
 //       if (Meteor.user()) {
//			Websites.insert({
//				title:event.target.form_title.value, 
//				createdOn:new Date(),
//				downvoters:[],
//				comments:[]
//			});

//        } else {
 //              alert("You must login to add a site!");
  //              }
		
		return false;// stop the form submit from reloading the page

	}
});

Template.world_form.events({

	"submit .js-world-form":function(event){		
		worldName = event.target.form_world_name.value;
		hostName = event.target.form_host_name.value;

		console.log("name: " + event.target.form_host_name.value)
		Meteor.call("addWorld", hostName, worldName);
 //       if (Meteor.user()) {
//			Websites.insert({
//				title:event.target.form_title.value, 
//				createdOn:new Date(),
//				downvoters:[],
//				comments:[]
//			});

//        } else {
 //              alert("You must login to add a site!");
  //              }
		
		return false;// stop the form submit from reloading the page

	}
});

Template.game_page.helpers({
	game:function(){
		//console.log("load game");

		var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { create: create, update: update });
		//var pin = Session.get({"gamepin"});
		//var dbWorld = Worlds.find({gamepin:pin});
		var bmd;
		var innerCircle;
		var outerCircle;

		function create() {

		//  Our BitmapData (same size as our canvas)
		bmd = game.make.bitmapData(800, 600);

		//  Add it to the world or we can't see it
		bmd.addToWorld();

		//  Create the Circles
		innerCircle = new Phaser.Circle(200, 200, 100);
		outerCircle = new Phaser.Circle(200, 200, 300);

		game.add.tween(innerCircle).to( { x: 100, y: 100, radius: 1 }, 3000, "Sine.easeInOut", true, 0, -1, true);

		}

		function update() {

		var grd = bmd.context.createRadialGradient(innerCircle.x, innerCircle.y, innerCircle.radius, outerCircle.x, outerCircle.y, outerCircle.radius);
		grd.addColorStop(0, '#8ED6FF');
		grd.addColorStop(1, '#003BA2');

		bmd.cls();
		bmd.circle(outerCircle.x, outerCircle.y, outerCircle.radius, grd);

}
	}
})