var mesaj={
	getMesaj:function(where,whereVal) {
		return db.search('mesaj',where,whereVal);
	},
	add:function(values) {
		return db.add('mesaj',['id','mesajId','mesajText'],values);
	}
}