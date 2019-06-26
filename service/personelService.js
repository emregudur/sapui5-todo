var personel={
	getPersonel:function(where,whereVal) {
		return db.search('personel',where,whereVal);
	},
	add:function(values) {
		return db.add('personel',['id','personelId','personelSoyadi'],values);
	}
}