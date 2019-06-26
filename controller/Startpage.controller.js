jQuery.sap.require("todoapp.service.db");
jQuery.sap.require("todoapp.service.taskService");
jQuery.sap.require("todoapp.service.personelService");
sap.ui.define([
	"jquery.sap.global",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/format/NumberFormat",
	"sap/m/MessageToast",
	"sap/m/library"
], function(jQuery, Controller, JSONModel, NumberFormat, MessageToast, MobileLibrary) {
	"use strict";
	var base,attModel,personelIdUrlParam,_type;
	attModel = new sap.ui.model.json.JSONModel();
	return Controller.extend("todoapp.controller.Startpage", {
		onInit: function() {
			base=this;
			//this.getView().(oModel, "news");
			//this.getRouter().navTo("ToDoList");
			this.getRouterAttach();
			this.sessionControl();
			this.getUpdateUserName();
		},
		handleNav: function(evt) {
			var navCon = this.byId("navCon");
			var target = evt.getSource().data("target");
			console.log(evt)
			base.getView().byId('p1').setTitle(evt.getSource().getText());
			attModel.setProperty("/task",{});
			base.getView().byId("Table1").bindRows("/task");
			this.getTask(target,sessionStorage.getItem('userID'));
		},
		getRouterAttach:function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Task").attachPatternMatched(this._onObjectMatched, this);
		},
		sessionControl:function() {
			if (sessionStorage.getItem('userID')!=null) {
				this.getTask('sorumlu',sessionStorage.getItem('userID'));
			}else{
				this.getRouter().navTo('all');
			}
		},
		getUpdateUserName:function() {
			personel.getPersonel('personelId',sessionStorage.getItem('userID')).then(async function(personelTableResponse) {
				var personel = await JSON.parse(personelTableResponse);
				attModel.setProperty("/user",personel[0]);
				console.log(personel)
			});
		},
		_onObjectMatched: function (oEvent) {
			personelIdUrlParam=oEvent.getParameter('arguments').personelID;
			sessionStorage.setItem('userID',personelIdUrlParam);
			base.getTask('sorumlu',personelIdUrlParam);
			this.getRouter().navTo("home");
		},
		getTask:function(type,personelId) {
			task.getTaskWithJoin(type,personelId).then(async function(dbRespose) {
				base.getPersonel(type,await JSON.parse(dbRespose));
			});
			base.getUpdateUserName();
		},
		getPersonel:function(sorguTuru,allTask) {
			var dbResponseTask=allTask;
			var sqlType=sorguTuru;
 			personel.getPersonel().then(async function (dbResposePersonel) {
 				var personel=await JSON.parse(dbResposePersonel),sorumluId,olusturanId;
					for (var i = 0; i < Object.keys(dbResponseTask).length; i++) {
						sorumluId = dbResponseTask[i]['sorumlu'];
						olusturanId = dbResponseTask[i]['olusturan'];
						for (var j = 0; j < Object.keys(personel).length; j++) {
							if (personel[j].personelId == olusturanId) {
								dbResponseTask[i].olusturanAdi=personel[j].personelAdi+" "+personel[j].personelSoyadi;
							}
							if (personel[j].personelId == sorumluId) {
								dbResponseTask[i].sorumluAdi=personel[j].personelAdi+" "+personel[j].personelSoyadi;
							}
						}
					}
				base.getView().setModel(attModel);
				attModel.setProperty("/task",dbResponseTask);
				attModel.setProperty("/personeller",personel);
				base.getView().byId("Table1").bindRows("/task");	
 			});
		},
		navToAll:function(oEvent) {
			this.getRouter().navTo('all');
		},
		navToTask:function(event) {
			this.getRouter().navTo("addTask");
		},
		getRouter: function() {
			return this.getOwnerComponent().getRouter();
		}
	});
});
