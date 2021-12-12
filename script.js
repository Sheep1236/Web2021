function rederBoard(numRows,numCols){ //定义棋盘长宽的函数

    let boardEl = document.querySelector("#board");
    
    for (let i=0; i<numRows; i++) { //添加长
        let trEl = document.createElement("tr"); //创建tr
        for (let j=0; j < numCols; j++) { //添加宽
           
            let cellEl =document.createElement("div");//在cellEl中创建div，雷都位置

            cellEl.className = "cell";//为cellEl指定样式
            let tdEl = document.createElement("td"); //创建td

            
            tdEl.append (cellEl);//添加
            
            trEl.append(tdEl);
            
        }
        boardEl.append(trEl);

    }
}

rederBoard(15,20);//参数；长宽