var proje={
	getProje:function(where,whereVal) {
		return db.search('proje',where,whereVal);
	},
	add:function(values) {
		return db.add('proje',['id','projeId','projeAdi'],values);
	}
}