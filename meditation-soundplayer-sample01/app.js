(window.onload = () => {

    //DON取得
    const song = document.querySelector("audio");
    const play = document.querySelector(".play");
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector("video");

    //サウンド
    const sounds = document.querySelectorAll(".sound-picker button");
    //タイムディスプレイ
    const timeDisplay = document.querySelector(".time-display");
    const timeSelect = document.querySelectorAll(".time-select button");
    //サークルの外周 getTotalLength()で取得
    const outLineLength = outline.getTotalLength();
    //duration
    let fakeDuration = 600;
    let songDone = true;


    // console.log("song", song);
    console.log("play", play);
    // console.log("outline", outline);
    // console.log("video", video);
    // console.log("sounds", sounds);
    // console.log("timeDisplay", timeDisplay);
    // console.log("timeSelect", timeSelect);
    // console.log("outLineLength", outLineLength);

    outline.style.strokeDasharray = outLineLength;
    outline.style.strokeDashoffset = outLineLength;

    //pickup sound
    sounds.forEach(sound => {
        // console.log("sound", sound);
        sound.addEventListener("click", (e) => {
            // console.log("soundpickerが押されました。");
            // console.log("e" , e);
            song.src = e.currentTarget.getAttribute("data-sound");
            // console.log("取得した値", song.src);
            video.src = e.currentTarget.getAttribute("data-video");
            // console.log("現在の映像", video.src);
            songDone = true;
            checkPlaying(song);
        })
    })


    //play sound
    play.addEventListener("click", () => {
        // console.log("クリックされました。");
        checkPlaying(song);

    })
    
    //Select sound
    timeSelect.forEach(option => {
        // console.log("option" , option);
        option.addEventListener("click", (e) => {
            // console.log("ボタンが押されました。");
            fakeDuration = e.target.getAttribute("data-time");
            // console.log("fakeDuration", fakeDuration);
        })
    });


    //音楽が流れているかチェックする
    const checkPlaying = (song) => {
        if (songDone) {
            console.log("再生します");
            song.play();
            video.play();
            play.src = "./svg/pause.svg";
            songDone = false;
        } else {
            console.log("停止します");
            song.pause();
            video.pause();
            play.src = "./svg/play.svg";
            songDone = true;
        }
    }


    song.ontimeupdate = () => {
        // 現在のplay時間を取得
        let currentTime = song.currentTime;
        // console.log("currentTime", currentTime);
        //経過時間を計算する
        let elapsed = fakeDuration - currentTime;
        // console.log("elapsed", elapsed);
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);
        // console.log("seconds", seconds);
        // console.log("minutes", minutes);

        //Animate the circle
        let progress = outLineLength - (currentTime / fakeDuration) * outLineLength;
        // console.log("progress", progress);
        outline.style.strokeDashoffset = progress;

        //Animate text
        timeDisplay.textContent = minutes + ":" + seconds;

        //Song Stop
        if (currentTime >= fakeDuration) {
            song.pause();
            song.currentTime = 0;
            video.pause();
            play.src = "./svg/play.svg";
        }


    }
})();