var task={
	getTask:function(where,whereValue) {
		return db.search('task', where, whereValue);
	},
	add:function(values) {
		return db.add('task',['id', 'ticketId', 'projeId', 'sorumlu', 'olusturan','bilgi', 'oncelik','kategori', 'konu','durum','mesajTipi','olusturulmaTarihi','guncellemeTarihi','isTanimi'],values);
	},
	remove:function(where, whereValue) {
		return db.remove('task',where,whereValue);
	},
	update:function(colums,values,where,whereValue) {
		return db.update('task',colums,values,where,whereValue);
	},
	getTaskWithJoin:function(where, whereValue) {
		return db.leftJoinSearch(where, whereValue);
	},
	getTaskCreatedPersonalName: function(whereValue) {
		return db.multiSearch('personel', 'personelId', whereValue);
	}
}
