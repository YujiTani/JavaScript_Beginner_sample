// 読み込み確認
// console.log("読み込みました。");
(() => {

    //変数を定義する
    const $doc = document;
    const $btn = $doc.getElementById("omikuji");
    const result = ["凶", "吉", "末吉", "大吉"];
    const min = 0;
    const max = result.length;


    //取得した要素を確認
    // console.log("doc" , $doc)
    // console.log("btn", $btn)
        ;
    const handleClick = (e) => {
        const n = Math.random();
        console.log(n);



        if (n < 0.05) {
            console.log("ルートイン");
            $btn.textContent = "大吉";
        } else if (n < 0.2) {
            $btn.textContent = "末吉";
        } else {
            $btn.textContent = "凶";

        }

        $btn.textContent = result[random(min, max)];

    }

    //クリックした時にイベントを発火する。
    $btn.addEventListener("click", (e) => handleClick());

    //ランダムな整数を生成
    const random = (min , max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }

    // console.log(Math.random());
    // console.log(Math.random() *3);
    // console.log(Math.floor(Math.random() * 3));
    // const n = 0;
    // console.log(Math.floor(Math.random() * (n + 1)));
    // const min = 1;
    // const max = 5;
    // console.log(min + Math.floor(Math.random() * (max + 1 - min)));

})();