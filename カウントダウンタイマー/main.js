(() => {
    console.log("読み込みました。");

    //タイマーを表示させる対象のDOMを取得
    let countDownTimer = document.getElementById("js-start-message");
    let countDay = document.getElementById("js-day");
    let countHour = document.getElementById("js-hour");
    let countMinute = document.getElementById("js-minute");
    let countSecond = document.getElementById("js-second");

    console.log("カウント", countDay);

    //変数・定数の定義
    let currentTimeCD = new Date(); //現在の時刻
    const oneDay = 24 * 60 * 60 * 1000;  // 一日をミリ秒で表現した数値
    let d = 0;  // 日
    let h = 0;  // 時
    let m = 0;  // 分
    let s = 0;  // 秒
    
    console.log("現在の時刻" , currentTimeCD);

    class Timer {
        constructor(saleStartTime, saleEndTime, endMessage) {
            //プロパティを設定
            this.currentTimeCD;
            this.saleStartTime = new Date(saleStartTime); //セール開始時間
            this.saleEndTime = new Date(saleEndTime); //セール終了時間
            this.endMessage = endMessage; //終了時のメッセージ
            this.update();
        }
        

        update() {
            setInterval(() => {
                this.calcTime();
                this.showTime();
            }, 1000);
        }


        calcTime() {
            this.currentTimeCD = new Date(); //現在の時刻
            let untilStartTime = this.saleStartTime - this.currentTimeCD; //開始時刻までの時間を計算する セールスタートまでの時間 - 現在の時刻
            let untilFinishTime = this.saleEndTime - this.currentTimeCD; //終了時間までの時間を計算する セール終了時間 - 現在時刻
            // console.log("開始時間まで", untilStartTime);
            // console.log("終了時間まで", untilFinishTime);
           
            if (this.currentTimeCD < this.saleStartTime) { //現在時刻とセール開始時間を比較して開始時間が大きかった場合
              //Math.floorを使い整数にする。
              d = Math.floor(untilStartTime / oneDay);
              h = Math.floor((untilStartTime % oneDay) / (60 * 60 * 1000));
              m = Math.floor((untilStartTime % oneDay) / (60 * 1000)) % 60;
              s = Math.floor((untilStartTime % oneDay) / 1000) % 60 % 60;
            } else { //そうでない場合終了時間までを表示する。
              d = Math.floor(untilFinishTime / oneDay);
              h = Math.floor((untilFinishTime % oneDay) / (60 * 60 * 1000));
              m = Math.floor((untilFinishTime % oneDay) / (60 * 1000)) % 60;
              s = Math.floor((untilFinishTime % oneDay) / 1000) % 60 % 60;
            }
        }
        showTime() {
            if (this.currentTimeCD < this.saleStartTime) { //現在時刻とセール開始時刻を比較 セール開始時間の方が大きかった場合
                countDownTimer.innerText = 'SALE開始まで';
                countDay.innerText = d ;
                countHour.innerText = h;
                countMinute.innerText = m;
                countSecond.innerText = s;
            } else if (this.currentTimeCD >= this.saleStartTime && this.currentTimeCD <= this.saleEndTime) {
                countDownTimer.innerText = 'SALE終了まであと';
                countDay.innerText = d;
                countHour.innerText = h;
                countMinute.innerText = m;
                countSecond.innerText = s;
            } else { //どれでもない場合、終了メッセージを表示する
              countDownTimer.innerHTML = this.endMessage;
            }
        }
    }

    new Timer('2020/10/31 00:00:00', '2021/1/31 23:59:59', '終了！');


})();