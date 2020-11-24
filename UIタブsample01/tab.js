//ファイルの読み込み確認
// alert('読み込みました。');

(() => {
    //ここに命令を書く

    //オブジェクトの取得
    const $doc = document;
    const $tab = $doc.getElementById("js-tab");
    const $nav = $tab.querySelectorAll('[data-nav]');
    const $content = $tab.querySelectorAll('[data-content]');
    const ACTIVE_CLASS = "is-active";

    const navLength = $nav.length;
    let navIndex = 0;


    //取得したデータの確認
    // console.log("$doc" ,$doc);
    // console.log("$tab"  ,$tab);
    // console.log("$nav"  ,$nav);
    // console.log("$content", $content);
    
    //初期化
    const init = () => {
        $content[0].style.display = 'block'
        $content[0].style.color = '#ff00ff'
        $content[0].style.fontSize = '20px'
    }

    init();

    //クリックしたら起こるイベント
    const handleClick = (e) => {
        //画面遷移をキャンセル
        e.preventDefault();
        // console.log("e!", e);

        //クリックされたnavとそのデータを取得する
        const $this = e.target;
        const targetVal = $this.dataset.nav;

        //対象外のnav,content全て一旦リセットする
        let index = 0;
        while (index < navLength) {
            $content[index].style.display = "none";
            $content[index].style.color = "none";
            $content[index].style.fontSize = "none";
            console.log($content[index].style.display);
            $nav[index].classList.remove(ACTIVE_CLASS);
            index++;
        }


        //対象のコンテンツをアクティブ化する
        $tab.querySelectorAll('[data-content="' + targetVal + '"]')[0].style.display = 'block';
        $tab.querySelectorAll('[data-content="' + targetVal + '"]')[0].style.color = '#ff00ff';
        $tab.querySelectorAll('[data-content="' + targetVal + '"]')[0].style.fontSize = '20px';
        $nav[targetVal].classList.add(ACTIVE_CLASS);

    }

    //全nav要素に対して関数を適用・発火
    while (navIndex < navLength) {
        //命令を書く
        $nav[navIndex].addEventListener("click", (e) => handleClick(e));
        navIndex++;
    }


})();