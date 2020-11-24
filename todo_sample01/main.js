(() => {
    'use strict';
    console.log("読み込みました。");

    //オブジェクトの取得
    // const $buttonList = document.querySelectorAll("button");
    const $add_input = document.getElementById("js-add-input");
    const $add_button = document.getElementById("js-add_button");
    const $ui = document.getElementById("ui");
    let text = "";

    // console.log("add_input", $add_input);
    // console.log("add_button", $add_button);
    // console.log("ui", $ui);


    const clickHandler = () => {
        text = $add_input.value;
        console.log("text" , text);

    }

    $add_button.addEventListener("click", (e) => {
        clickHandler();

        const li = document.createElement('li');
        li.innerText = text;
        // console.log(li);

        const doneButton = document.createElement('button');
        // console.log(doneButton);
        doneButton.innerText = "Done";
        doneButton.classList.add("todo_button");
        li.appendChild(doneButton);

        doneButton.addEventListener("click", (e) => {
            // console.log("クリックしました。");
            const oya = e.target.closest("li");
            // console.log(oya);
            oya.classList.toggle("done");
        })

        $ui.appendChild(li);

    });

})();