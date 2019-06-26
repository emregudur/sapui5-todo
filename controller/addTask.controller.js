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
	return Controller.extend("todoapp.controller.addTask", {
		onInit: function() {
			base = this;
			this.loadTextEditor();
			this.loadAllInputData();
			//silinecekler
		},
		handleNav: function(evt) {
			var navCon = this.byId("navCon");
			var target = evt.getSource().data("target");
			if (target) {
				navCon.to(this.byId(target));
			} else {
				navCon.back();
			}
		},
		getRouter: function() {
			return this.getOwnerComponent().getRouter();
		},
		loadAllInputData: function() {
			var attModel = new sap.ui.model.json.JSONModel();
			base.getView().setModel(attModel);
			proje.getProje().then(async function(dbResponse) {
				var rs=await dbResponse;
				attModel.setProperty("/proje",JSON.parse(rs));
			});
			personel.getPersonel().then(async function(dbResponse) {
				var rs=await dbResponse;
				attModel.setProperty("/personeller",JSON.parse(rs));
			});
			oncelik.getOncelik().then(async function(dbResponse) {
				var rs=await dbResponse;
				attModel.setProperty("/oncelik",JSON.parse(rs));
			});
			mesaj.getMesaj().then(async function(dbResponse) {
				var rs=await dbResponse;
				attModel.setProperty("/mesaj",JSON.parse(rs));
			});
			kategori.getKategori().then(async function(dbResponse) {
				var rs=await dbResponse;
				attModel.setProperty("/kategori",JSON.parse(rs));
			});
			durum.getDurum().then(async function(dbResponse) {
				var rs=await dbResponse;
				attModel.setProperty("/durum",JSON.parse(rs));
			});
		},
		saveTask:function() {
			var view = base.getView();
			var core= sap.ui.getCore();
			var sorumluIDleri,bilgiIDleri;
			var proje = view.byId('proje').getSelectedKey();
			var sorumlu = view.byId('from').getTokens();
			var bilgi = view.byId('info').getTokens();
			var mesaj = view.byId('mesaj').getSelectedKey();
			var kategori = view.byId('kategori').getSelectedKey();
			var durum = view.byId('durum').getSelectedKey();
			var oncelik = view.byId('oncelik').getSelectedKey();
			var konu = view.byId('konu').getValue();
			var istanimi = core.byId('istanimiText').getValue();
			var current_datetime = new Date()
			var olusturmaTarihi = current_datetime.getDate() + "." + (current_datetime.getMonth() + 1) + "." + current_datetime.getFullYear();
			// task.add([Math.floor(Math.random(1000)*1000),"TK"+Math.floor(Math.random(1000)*1000),proje,sorumlu,bilgi,oncelik,])
			// 'id', 'ticketId', 'projeId', 'sorumlu', 'olusturan','bilgi', 'oncelik','kategori', 'konu','durum','mesajTipi','olusturulmaTarihi','guncellemeTarihi'],values);
			console.log(sorumlu,bilgi)
			for (var i = 0; i < view.byId('from').getTokens().length ;i++) {
				for (var j = 0; j < view.byId('info').getTokens().length ;j++) {
					task.add([Math.floor(Math.random(1000)*1000),"TK"+Math.floor(Math.random(1000)*1000),proje,view.byId('from').getTokens()[i].mProperties.key,sessionStorage.getItem('userID'),view.byId('info').getTokens()[j].mProperties.key,oncelik,kategori,konu,durum,mesaj,olusturmaTarihi,olusturmaTarihi,istanimi])
				}
			}
			this.getRouter().navTo("home");
		},
		alert:function(oEvent) {
			console.log(oEvent);
			alert();

		},
		loadTextEditor: function () {
			oRichTextEditor = new sap.ui.richtexteditor.RichTextEditor("istanimiText", {
				editorType: sap.ui.richtexteditor.EditorType.TinyMCE4,
				width: "100%",
				height: "300px",
				customToolbar: true,
				showGroupFont: true,
				showGroupLink: true,
				showGroupInsert: true,
				value: '',
				ready: function () {
					this.addButtonGroup("styleselect").addButtonGroup("table");
				}
			});

			base.getView().byId("isTanimi").addContent(oRichTextEditor);
		},
		navButtonBack:function() {
			history.go(-1);
		}
	});
});
