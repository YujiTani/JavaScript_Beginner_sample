$(document).ready(function () {
    'use strict';

    paper.install(window);
    paper.setup(document.getElementById("can"));

    // ここで描画する
    // let c = Shape.Circle(250, 200, 100);
    // c.fillColor = "red";

    let tool = new Tool();
    // tool.onMouseDown = (e) => {
    //     let c = Shape.Circle(e.point, 20);
    //     c.fillColor = "red";
    // }

    // paper.view.draw();

    let c = Shape.Circle(200, 200, 50);
    c.fillColor = "black";
    let text = new PointText(200, 200);
    text.justification = "center";
    text.fillColor = "white";
    text.fontSize = 20;
    text.content = "Hellow World";

    tool.onMouseDown = (e) => {
        let c = Shape.Circle(e.point, 20);
        c.fillColor = "green";
    }

});
