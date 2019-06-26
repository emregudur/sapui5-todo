
var db={
// select task.*, personel.*, proje.* from task left join personel,proje on task.id=123 AND personel.personelId = task.sorumlu AND task.projeId = proje.projeId 
	createDB:function() {
	},
	loadData:function() {
		this.add('task',['id', 'ticketId', 'projeId', 'sorumlu', 'olusturan','bilgi', 'oncelik','kategori', 'konu','durum','mesajTipi','olusturulmaTarihi','guncellemeTarihi','isTanimi'],[1,'TK123','P1','PERS1','PERS5','PERS1','1','01','Deneme','01','01','21.06.2019','21.06.2019','<p style="text-align: left;"><span style="font-family: verdana, geneva, sans-serif; font-size: 10pt;">deneme</span></p>']);
		this.add('task',['id', 'ticketId', 'projeId', 'sorumlu', 'olusturan','bilgi', 'oncelik','kategori', 'konu','durum','mesajTipi','olusturulmaTarihi','guncellemeTarihi','isTanimi'],[2,'TK123','P2','PERS2','PERS3','PERS1','1','01','Deneme','01','01','21.06.2019','21.06.2019','<p style="text-align: left;"><span style="font-family: verdana, geneva, sans-serif; font-size: 10pt;">deneme</span></p>']);
		this.add('task',['id', 'ticketId', 'projeId', 'sorumlu', 'olusturan','bilgi', 'oncelik','kategori', 'konu','durum','mesajTipi','olusturulmaTarihi','guncellemeTarihi','isTanimi'],[3,'TK123','P3','PERS3','PERS3','PERS2','1','01','Deneme','01','01','21.06.2019','21.06.2019','<p style="text-align: left;"><span style="font-family: verdana, geneva, sans-serif; font-size: 10pt;">deneme</span></p>']);
		this.add('task',['id', 'ticketId', 'projeId', 'sorumlu', 'olusturan','bilgi', 'oncelik','kategori', 'konu','durum','mesajTipi','olusturulmaTarihi','guncellemeTarihi','isTanimi'],[4,'TK123','P4','PERS4','PERS2','PERS5','1','01','Deneme','01','01','21.06.2019','21.06.2019','<p style="text-align: left;"><span style="font-family: verdana, geneva, sans-serif; font-size: 10pt;">deneme</span></p>']);
		this.add('task',['id', 'ticketId', 'projeId', 'sorumlu', 'olusturan','bilgi', 'oncelik','kategori', 'konu','durum','mesajTipi','olusturulmaTarihi','guncellemeTarihi','isTanimi'],[5,'TK123','P5','PERS5','PERS1','PERS5','1','01','Deneme','01','01','21.06.2019','21.06.2019','<p style="text-align: left;"><span style="font-family: verdana, geneva, sans-serif; font-size: 10pt;">deneme</span></p>']);
		this.add('proje',['id','projeId','projeAdi'],[1,'P1','IGA']);
		this.add('proje',['id','projeId','projeAdi'],[2,'P2','SAP DANIŞMANLIK']);
		this.add('proje',['id','projeId','projeAdi'],[3,'P3','Aka Otomotiv']);
		this.add('proje',['id','projeId','projeAdi'],[4,'P4','Sivas Beton']);
		this.add('proje',['id','projeId','projeAdi'],[5,'P5','AROBUS SAP DESTEK']);
		this.add('personel',['id','personelId','personelAdi','personelSoyadi'],[1,'PERS1','Emre','güdür']);
		this.add('personel',['id','personelId','personelAdi','personelSoyadi'],[2,'PERS2','Ahmet','yıldırım']);
		this.add('personel',['id','personelId','personelAdi','personelSoyadi'],[4,'PERS3','Murat','şimşek']);
		this.add('personel',['id','personelId','personelAdi','personelSoyadi'],[5,'PERS4','Yasin','Aydın']);
		this.add('personel',['id','personelId','personelAdi','personelSoyadi'],[6,'PERS5','Özgür','Özayhan']);
		this.add('mesaj',['id','mesajId','mesajText'],[1,'01','Servis Talebi']);
		this.add('mesaj',['id','mesajId','mesajText'],[2,'02','Problem']);
		this.add('durum',['id','durumId','durumText'],[3,'01','Yeni']);
		this.add('durum',['id','durumId','durumText'],[4,'02','Planlanıyor']);
		this.add('durum',['id','durumId','durumText'],[5,'03','Tamamlandı']);
		this.add('durum',['id','durumId','durumText'],[6,'04','İptal Edildi']);
		this.add('kategori',['id','kategoriId','kategoriText'],[1,'01','SAPUI5']);
		this.add('kategori',['id','kategoriId','kategoriText'],[2,'02','E-Arşiv']);
		this.add('kategori',['id','kategoriId','kategoriText'],[3,'03','E-Sağlık']);
		this.add('oncelik',['id','oncelikId','oncelikText'],[1,'1','Çok yüksek']);
		this.add('oncelik',['id','oncelikId','oncelikText'],[2,'2','Yüksek']);
		this.add('oncelik',['id','oncelikId','oncelikText'],[3,'3','Orta']);
		this.add('oncelik',['id','oncelikId','oncelikText'],[4,'4','Düşük']);
	},
	add:function(tablo,colums,values) {
		var cols="",vals="",sql;
		var addChar=",";
		for (var i =0; i < colums.length ; i++) {
			cols+=colums[i];
			if (typeof values[i]==='number') {
				vals+=values[i];
			}else{
				vals+="'"+values[i]+"'";
			}
			if (colums.length-1!=i) {
				cols+=addChar;
				vals+=addChar;
			}
		}
		sql="insert into " + tablo + "("+cols+")values"+"("+vals+")";
		console.log(sql);
		return new Promise(function (resolve, reject) {
	        dbObj.transaction(function (tx) {
	            tx.executeSql(sql,[],function (tx,results) {
	                resolve(JSON.stringify(results.rows));
	            });
	        });
	    });	
	},
	remove:function(tablo,where,whereValue) {
		var sql;
		if (where!="") {
			if (whereValue>-1) {
				sql="delete from "+ tablo+" where "+ where +"="+whereValue+"";	
			}else{
				sql="delete from "+ tablo+" where "+ where +"='"+whereValue+"'";	
			}
		}
		console.log(sql);
		return new Promise(function (resolve, reject) {
	        dbObj.transaction(function (tx) {
	            tx.executeSql(sql,[],function (tx,results) {
	                resolve(JSON.stringify(results.rows));
	            });
	        });
	    });
	},	
	update:function (tablo,colums,values,where,whereValue) {
		var returnText="update "+tablo+" set ";
		for (var i = 0; i < colums.length; i++) {
			if (typeof values[i] === 'number') {
				returnText+=colums[i]+"="+values[i]+"";
			}else{
				returnText+=colums[i]+"='"+values[i]+"'";
			}
			if (colums.length-1!=i) {
				returnText+=", ";
			}
		}
		if (typeof whereValue === 'number') {
			returnText+=" where "+where+"="+whereValue+"";
		}else{
			returnText+=" where "+where+"='"+whereValue+"'";
		}
		console.log(returnText);
		return new Promise(function (resolve, reject) {
	        dbObj.transaction(function (tx) {
	            tx.executeSql(returnText,[],function (tx,results) {
	                resolve(JSON.stringify(results.rows));
	            });
	        });
	    });
	},
	oneColSearch:function(table, where, whereValue, col) {
		var add="",sql;
		if (where!==undefined) {
			if (typeof whereValue === 'number') {
				add=whereValue;
			}else{
				add="'"+whereValue+"'";
			}
			sql="select "+col.toString()+" from " + tablo +" where " + where +"="+add+""
		}else{
			sql="select "+col.toString()+" from " + tablo +" order by rowid desc";
		}
		return new Promise(function (resolve, reject) {
	        dbObj.transaction(function (tx) {
	            tx.executeSql(sql,[],function (tx,results) {
	                resolve(JSON.stringify(results.rows));
	            });
	        });
	    });
	    console.log(sql);
	},
	search:function(tablo,where,whereValue) {
		var add="",sql;
		if (where!==undefined) {
			if (typeof whereValue === 'number') {
				add=whereValue;
			}else{
				add="'"+whereValue+"'";
			}
			sql="select * from " + tablo +" where " + where +"="+add+""
		}else{
			sql="select * from " + tablo +" order by rowid desc";
		}
		return new Promise(function (resolve, reject) {
	        dbObj.transaction(function (tx) {
	            tx.executeSql(sql,[],function (tx,results) {
	                resolve(JSON.stringify(results.rows));
	            });
	        });
	    });
	    console.log(sql);
	},
	multiSearch:function(tablo, where, whereValue) {
		var sql,add="";
		for (var i = 0; i < whereValue.length; i++) {
			if (typeof where === 'object') {
				add+=where[i];
			}else{
				add+=where;
			}
			if (typeof whereValue === 'object') {
				if (typeof whereValue === 'number') {
					add+="="+ whereValue[i];
				}else{
					add+="='"+ whereValue[i]+"'";
				}
			}
			if (whereValue.length-1 != i) {
				add+=" OR ";
			}
		}
		sql="SELECT * FROM "+ tablo +" WHERE "+ add; 
	    console.log(sql);
		return new Promise(function (resolve, reject) {
	        dbObj.transaction(function (tx) {
	            tx.executeSql(sql,[],function (tx,results) {
	                resolve(JSON.stringify(results.rows));
	            });
	        });
	    });
	},
	leftJoinSearch:function(where, whereValue) {
		var whereValueSqlText;
		if (typeof whereValue === 'number') {
			whereValueSqlText=whereValue;
		}else{
			whereValueSqlText="'"+whereValue+"'";
		}
		var sql="select task.*, personel.*, proje.*, durum.*, kategori.*, mesaj.*, oncelik.* from task left join personel,proje,durum,kategori,mesaj,oncelik on"+
		" task."+where+"="+ whereValueSqlText +""+
		" AND task."+ where +" = personel.personelId AND task.projeId = proje.projeId AND task.durum = durum.durumId AND task.kategori = kategori.kategoriId AND task.mesajTipi = mesaj.mesajId AND task.oncelik = oncelik.oncelikId";
		console.log(sql)
		return new Promise(function (resolve, reject) {
	        dbObj.transaction(function (tx) {
	            tx.executeSql(sql,[],function (tx,results) {
	                resolve(JSON.stringify(results.rows));
	            });
	        });
	    });
	}
}