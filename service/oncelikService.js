var oncelik={
	getOncelik:function(where,whereVal) {
		return db.search('oncelik',where,whereVal);
	},
	add:function(values) {
		return db.add('oncelik',['id','oncelikId','oncelikText'],values);
	}
}