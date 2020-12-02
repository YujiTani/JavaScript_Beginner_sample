(() => {
    console.log("読み込みました。");
    
    const bruce = { 名前: "ブルース" };
    
    function update(birthYear, occupation, like) {
        this.生年 = birthYear,
        this.職業 = occupation,
        this.好み = like;
    }

    const updateBruce = update.bind(bruce, "1949");
    
    console.log("1st" , bruce);

    updateBruce("作詞家");

    console.log(bruce);

    updateBruce("作詞家","レモン");

    console.log(bruce);


})();