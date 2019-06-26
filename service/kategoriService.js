var kategori={
	getKategori:function(where,whereVal) {
		return db.search('kategori',where,whereVal);
	},
	add:function(values) {
		return db.add('kategori',['id','kategoriId','kategoriText'],values);
	}
}