// app.jsが読み込めているかチェック
// alert("読み込みました");


// 変数を定義する
const $button = document.getElementsByTagName("button");
const quizLength = quiz.length;
console.log("quiz.length:" + quizLength);
const $bottonLength = $button.length;
console.log("button.length:" + $bottonLength);
let quizIndex = 0;
let score = 0;

//クイズの問題文、選択肢を定義
const setupQuiz = () => {
    let Qestion = document.getElementById("js-question").textContent = quiz[quizIndex].question;
    //ボタンの数
    let buttonIndex = 0;
    while (buttonIndex < $bottonLength) {
        //ここに命令文
        $button[buttonIndex].textContent = quiz[quizIndex].answers[buttonIndex];
        //インデックスに+1
        buttonIndex++;
        console.log(buttonIndex);
    }
};

setupQuiz();

const clickHandler = (e) => {
    if (quiz[quizIndex].correct === e.target.textContent) {
        window.alert("正解です！");
        score++;
    } else {
        window.alert("不正解です！");
    }
    quizIndex++;
    if (quizIndex < quizLength) {
        //まだクイズがある場合こちらを実行
        //再度クイズのセットを行う。
        setupQuiz();
    } else {
        //もうクイズがなければこちらを実行
        window.alert("クイズは終了です。あなたの正解数は"　+ quizLength + "問中" + score + "問でした！またプレイしてくださいね。");
        score = 0;

    }
}

//クリックした時に発火する
let handlerIndex = 0;

while (handlerIndex < $bottonLength) {
    //ここに命令文を書く
    $button[handlerIndex].addEventListener("click", (e) => {
        // alert("クリックされました。");
        clickHandler(e);
    });
    handlerIndex++;
}
