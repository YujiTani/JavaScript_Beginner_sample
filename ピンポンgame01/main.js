'use strict';
// console.log("読み込みました。");

(() => {
    // ランダム整数の生成
    const random = (max, min) => {
        return Math.floor(Math.random() * (max - min) + min);
    }
    //SE読み込み
    const sound1 = new Audio("./sound/reflection.mp3");
    const sound2 = new Audio("./sound/nc218764.mp3");

    //クラスの作成
    class Ball {
        constructor(canvas) {
            this.canvas = canvas;
            this.ctx = this.canvas.getContext("2d");
            // console.log("ballctx", this.ctx);
            //ボールプロパティ
            //初期位置情報
            this.x = random(30 , 660);
            this.y = 30;
            //ボールの半径
            this.r = 20;
            //ボールの動く速度
            this.vx = random(3 , 5) * (Math.random() < 0.5 ? 1 : -1);
            this.vy = random(3, 5);
            this.isMissed = false;
        }

        getX() {
            return this.x;
        }

        getY() {
            return this.y;
        }

        getR() {
            return this.r;
        }

        bounce() {
            this.vy *= -1;
            sound1.play();
        }

        speedUp() {
            this.vx *= 1;
            this.vy *= 1;
            console.log("v" ,this.vx , this.vy);
        }

        reposition(paddleTop) {
            this.y = paddleTop - this.r;
        }

        getMiss() {
            return this.isMissed;
        }

        update() {
            if (this.y + this.r > this.canvas.height) {
                return this.isMissed = true;
            }
            //ボールの位置情報を更新する
            this.x += this.vx;
            this.y += this.vy;

            //ボールの大きさを更新する
            // this.r += this.vr;

            //跳ね返りの処理
            if (this.x - this.r < 0 || this.x + this.r > this.canvas.width) {
                //この座標になった時に速度を反転
                this.vx *= -1;
            }

            if (this.y - this.r < 0 ) {
                //この座標になった時に速度を反転
                this.vy *= -1;
            }

        }

        draw() {
            //リセット
            this.ctx.beginPath();
            //要素の中の色を決める
            this.ctx.fillStyle = "#f6f5f4";
            //円である事、大きさなどを定義する
            this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
            //実行する
            this.ctx.fill();

        }
    }

    class Paddle {
        constructor(canvas , game) {
            this.canvas = canvas;
            this.game = game;
            this.ctx = this.canvas.getContext("2d");
            //パドルのプロパティー
            this.w = 60;
            this.h = 10;

            //パドルの初期位置
            this.x = this.canvas.width / 2 - (this.w / 2);
            this.y = this.canvas.height - 32;
            
            this.mouseX = this.x;
            this.addHandler();

        }

        addHandler() {
            document.addEventListener("mousemove", (e) => {
                //マウスの位置はクライアントXで取得できるので、それで値を更新してあげる
                this.mouseX = e.clientX;
            });
        }

        update(ball) {
            //ボールの値を取得する
            const ballBottom = ball.getY() + ball.getR();
            const ballTop = ball.getY() - ball.getR();
            const ballCenter = ball.getX();

            //パドルの値を取得する
            const paddleTop = this.y;
            const paddleBottom = this.y + this.h;
            const paddleLeft = this.x;
            const paddleRight = this.x + this.w;

            // ボールの向きを変更する条件
            // ボールの下がパドルの上を超えた時、ボールの頭よりパドルの下が超えている時
            if (ballBottom > paddleTop &&
                ballTop < paddleBottom &&
                ballCenter > paddleLeft &&
                ballCenter < paddleRight) {
                
                ball.bounce();
                ball.reposition(paddleTop);
                this.game.addScore();
                this.game.countScore();
            }


            //マウスと動きのズレがあるので修正
            const rect = this.canvas.getBoundingClientRect();
            // console.log("rect", rect.left);
            this.x = this.mouseX - rect.left - (this.w / 2);

            if (this.x < 0) {
                this.x = 0;
            }

            if (this.x + this.w > this.canvas.width) {
                this.x = this.canvas.width - this.w;
            }

        }

        draw() {
            this.ctx.fillStyle = "#fdfdfd";
            this.ctx.fillRect(this.x, this.y, this.w, this.h);
        }
    }


    class Game {
        constructor(canvas) {
            this.canvas = canvas;
            this.ctx = this.canvas.getContext("2d");
            // console.log("gamectx", this.ctx);
            this.ball = new Ball(this.canvas);
            this.paddle = new Paddle(this.canvas , this);
            this.loop();
            this.isGameOver = false;
            this.score = 0;
        }

        addScore() {
            this.score += 2;
        }


        loop() {
            if (this.isGameOver) {
                return;
            }
            this.update();
            this.draw();

            window.requestAnimationFrame(() => {
                this.loop();
            });
        }

        update() {
            this.ball.update();
            this.paddle.update(this.ball);

            if (this.ball.getMiss() === true) {
                return this.isGameOver = true;
            }
        }

        draw() {
            if (this.isGameOver) {
                this.drawGameOver();
                return;
            }
            //描画のリセットを行う
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ball.draw();
            this.paddle.draw();
            this.drawScore();
        }

        drawGameOver() {
            sound2.play();
            this.ctx.font = '28px "Arial Black"';
            this.ctx.fillStyle = "tomato";
            this.ctx.fillText("GAME OVER", 230, 150);
        }

        drawScore() {
            this.ctx.font = '20px "Arial Black';
            this.ctx.fillStyle = "#fdfdfd"
            this.ctx.fillText("score " + this.score, 30, 25);
        }

        countScore() {
            switch (this.score) {
                case 10:
                    this.ball.speedUp();
                break;
                case 20:
                    this.ball.speedUp();
                    
                break;
                case 30:
                    this.ball.speedUp();
                        
                break;
                case 40:
                    this.ball.speedUp();
                default:
                    console.log(this.score);
                break;
                
                            }
                            }
}

    //ドキュメントを取得
    const $canvas = document.querySelector("canvas");
    // console.log("canvas", $canvas);
    //もし取得出来なければ、
    if (typeof $canvas.getContext === "undefined") {
        console.log("中止します。");
        return;
    }

    //インスタンスを作成する。
    new Game($canvas);
    // console.log({ Game });

}) ();