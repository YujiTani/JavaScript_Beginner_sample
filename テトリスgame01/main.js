'use strict';
// console.log("読み込みました。");

(() => {

    //テトロミノの中身
    let tetoro = [
        [0, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
    ];
    //フィールドの中身
    let field_unit = [
        [0 , 0 , 0 , 0 , 0 , 0 , 0, 0, 0 , 0],
        [0 , 0 , 0 , 0 , 0 , 0 , 0, 0, 0 , 0],
        [0 , 0 , 0 , 0 , 0 , 0 , 0, 0, 0 , 0],
        [0 , 0 , 0 , 0 , 0 , 0 , 0, 0, 0 , 0],
        [0 , 0 , 0 , 0 , 0 , 0 , 0, 0, 0 , 0],
        [0 , 0 , 0 , 0 , 0 , 0 , 0, 0, 0 , 0],
        [0 , 0 , 0 , 0 , 0 , 0 , 0, 0, 0 , 0],
        [0 , 0 , 0 , 0 , 0 , 0 , 0, 0, 0 , 0],
        [0 , 0 , 0 , 0 , 0 , 0 , 0, 0, 0 , 0],
        [0 , 0 , 0 , 0 , 0 , 0 , 0, 0, 0 , 0],
        [0 , 0 , 0 , 0 , 0 , 0 , 0, 0, 0 , 0],
        [0 , 0 , 0 , 0 , 0 , 0 , 0, 0, 0 , 0],
        [0 , 0 , 0 , 0 , 0 , 0 , 0, 0, 0 , 0],
        [0 , 0 , 0 , 0 , 0 , 0 , 0, 0, 0 , 0],
        [0 , 0 , 0 , 0 , 0 , 0 , 0, 0, 0 , 0],
        [0 , 0 , 0 , 0 , 0 , 0 , 0, 0, 0 , 0],
        [0 , 0 , 0 , 0 , 0 , 0 , 0, 0, 0 , 0],
        [0 , 0 , 0 , 0 , 0 , 0 , 0, 0, 0 , 0],
        [0 , 0 , 0 , 0 , 0 , 0 , 0, 0, 0 , 0],
        [0 , 0 , 0 , 0 , 0 , 0 , 0, 0, 0 , 0]
    ];


    field_unit[5][8] = 1;
    field_unit[19][0] = 1;
    field_unit[19][9] = 1;

    //変数・定数の定義
    const $canvas = document.querySelector("canvas");
    // console.log("canvas", $canvas);
    //もしcanvasがなかった場合。
    if (typeof $canvas.getContext === "undefined") {
        console.log("中止します");
    }



    //クラスの定義
    class Block {
        constructor(canvas) {
            this.canvas = canvas;
            this.ctx = this.canvas.getContext("2d");
            //ブロックプロパティ
            this.size = 30;
            //テトロミノのサイズ
            this.blocks = 4;
            //テトロミノの座標
            this.x = 0;
            this.y = 0;
            this.addHandler();
        
        }
        rotate() {
            let ntetro = [];
	
            for(let y=0; y<this.size ; y++ )
            {
                ntetro[y]=[];
                for(let x=0; x<this.size ; x++ )
                {
                    ntetro[y][x] = tetro[this.size -x- 1][y];
                }
            }
            
            return ntetro;
        
        }

        checkMove(mx, my) {
            for (let y = 0; y < this.blocks; y++) {
                for (let x = 0; x < this.blocks; x++) {
                    //新しくなる座標 現在の座標+移動する量＋テトロミノブロック
                    let nx = this.x + mx + x;
                    let ny = this.y + my + y;
                    if (tetoro[y][x]) {
                        //フィールドに何かあった場合、その時点でfalseを返す
                        if (
                            ny < 0 ||
                            nx < 0 ||
                            ny >= this.canvas.height ||
                            nx >= this.canvas.width  ||
                            field_unit[ny][nx]
                        ) {
                                return false;
                            }
                    }
                }
            }
            return true;
        }

        addHandler() {
            //キーボード操作を定義
            document.addEventListener("keydown", (e) => {
                // onkeydown keycode検索
                // console.log("e", e);
                switch (e.keyCode) {
                    case 37: //左
                        if (this.checkMove(-1 , 0)) {
                            this.x--;
                            console.log(e);
                        }
                        break;
                    case 39: //右
                        if (this.checkMove(1, 0)) {
                            this.x++;
                            console.log(e);

                        }
                        break;
                    case 40: //下
                        if (this.checkMove(0, 1)) {
                            this.y++;
                            console.log(e);

                        }
                        break;
                    case 32: //スペース
                
                        break;

                }
            });
        }
    
        update() {


        }

        draw() {

            //ブロックの描画
            for (let y = 0; y < this.blocks; y++) {
                for (let x = 0; x < this.blocks; x++) {
                    if (tetoro[y][x]) {
                        // console.log("処理開始");
                        //テトロが0じゃない時
                        let px = (this.x + x) * this.size;
                        let py = (this.y + y) * this.size;
                        this.ctx.fillStyle = "red";
                        this.ctx.fillRect(px, py, this.size, this.size);
                        this.ctx.strokeStyle = "Black";
                        this.ctx.strokeRect(px, py, this.size, this.size);
                        }
                    }
            }
        }
    }







    //クラスの作成
    class Game {
        constructor($canvas) {
            this.canvas = $canvas;
            // console.log("canvas", this.canvas);
            this.ctx = this.canvas.getContext("2d");
            // console.log("ctx", this.ctx);
            this.block = new Block(this.canvas);
            this.field = new Field(this.canvas , this.block);
            this.loop();
            this.canvas.width = this.field.screen_W;
            this.canvas.height = this.field.screen_H;
        
        }

        loop() {
            //読み込む
            this.update();
            this.draw();

            window.requestAnimationFrame(() => {
                this.loop();
            });
        }

        update() {
            this.block.update();
            this.field.update();

        }

        draw() {
            // console.log("描画しました。");
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.block.draw();
            this.field.draw(this.block);

        }


    }

    //クラス作成
    class Field {
        constructor(canvas , block) {
            this.canvas = canvas;
            this.block = block;
            // console.log(this.block);
            this.ctx = this.canvas.getContext("2d");
            this.w = 10;
            this.h = 20;
            this.screen_W = this.block.size * this.w;
            // console.log(this.screen_W);
            this.screen_H = this.block.size * this.h;
            // console.log(this.screen_H);

            }


        update() {

        }

    
        draw(block) {
            //フィールドの描画
            const BLOCK_SIZE = this.block.size;
            for (let y = 0; y < this.h; y++) {
                for (let x = 0; x < this.w; x++) {
                    if (field_unit[y][x] ) {
                        // console.log("処理開始");
                        let px = x * BLOCK_SIZE;
                        let py = y * BLOCK_SIZE;
                        this.ctx.fillStyle = "red";
                        this.ctx.fillRect(px, py, BLOCK_SIZE, BLOCK_SIZE);
                        this.ctx.strokeStyle = "Black";
                        this.ctx.strokeRect(px, py, BLOCK_SIZE, BLOCK_SIZE);
                        }
                    }
            }
        }
    }


    // ゲームスタート
    new Game($canvas);

})();