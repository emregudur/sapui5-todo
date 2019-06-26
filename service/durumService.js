var durum={
	getDurum:function(where,whereVal) {
		return db.search('durum',where,whereVal);
	},
	add:function(values) {
		return db.add('durum',['id','durumId','durumText'],values);
	}
}