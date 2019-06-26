jQuery.sap.require("todoapp.service.db");
jQuery.sap.require("todoapp.service.durumService");
jQuery.sap.require("todoapp.service.kategoriService");
jQuery.sap.require("todoapp.service.mesajService");
jQuery.sap.require("todoapp.service.oncelikService");
jQuery.sap.require("todoapp.service.personelService");
jQuery.sap.require("todoapp.service.projeService");
jQuery.sap.require("todoapp.service.taskService");
sap.ui.define([
	"jquery.sap.global",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/format/NumberFormat",
	"sap/m/MessageToast",
	"sap/m/library",
	"sap/ui/richtexteditor/RichTextEditor",
	'sap/m/Token'
], function(jQuery, Controller, JSONModel, NumberFormat, MessageToast, MobileLibrary) {
	"use strict";
	var base,oRichTextEditor;
	return Controller.extend("todoapp.controller.all", {
		onInit: function() {
			base = this;
			this.loadAllData();
		},
		getRouter: function() {
			return this.getOwnerComponent().getRouter();
		},
		loadAllData:function() {
			var attModel = new sap.ui.model.json.JSONModel();
			base.getView().setModel(attModel);
			proje.getProje().then(async function(dbResponse) {
				var rs=await dbResponse;
				attModel.setProperty("/projeler",JSON.parse(rs));
			});
			personel.getPersonel().then(async function(dbResponse) {
				var rs=await dbResponse;
				attModel.setProperty("/personeller",JSON.parse(rs));
			});
		},
		navButtonBack:function() {
			history.go(-1);
		}
	});
});
