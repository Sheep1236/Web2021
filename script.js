function rederBoard(numRows,numCols,grid){ //定义棋盘长宽的函数,棋盘格初始化置零

    let boardEl = document.querySelector("#board");
    
    for (let i=0; i<numRows; i++) { //添加长
        let trEl = document.createElement("tr"); //创建tr（行）
        for (let j=0; j < numCols; j++) { //添加宽
           
            let cellEl =document.createElement("div");//在cellEl中创建div，雷都位置

            cellEl.className = "cell";//为cellEl指定样式
            cellEl.innerText = grid[i][j];
            let tdEl = document.createElement("td"); //创建td（列）

            
            tdEl.append (cellEl);//添加
            
            trEl.append(tdEl);
            
        }
        boardEl.append(trEl);

    }
}

const directions = [ //方向
    [-1, -1], [-1, 0], [-1, 1], // TL, TOP, TOP-RIGHT 定义的8个方向
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1],
]







function initialize(numRows, numCols,numMines) {  //初始化，对棋盘格赋值,雷数
    let grid = new Array(numRows);  //添加行
    for (let i = 0; i < numRows; i++) {  //添加列
        grid[i] = new Array(numCols); //对列定义一个数组
        for (let j = 0; j < numCols; j++) { //棋盘格置零
        
            grid[i][j] = 0 //初始化，行号/列号
        }

    }
    let mines = []; //空列表，cellSn雷号要放进去
    for (let k = 0; k < numMines; k++) { //对有雷的格子编号
        let cellSn = Math.trunc(Math.random() * numRows * numCols); //有雷的格子编号
                                //math取0~1     

        let row = Math.trunc(cellSn / numCols);//格子号整除列数确定第几行
        let col = cellSn % numCols;//格子号除行数余数确定是第几列

        console.log(cellSn, row, col);//打印

        grid[row][col] = -1; ///将上述随机出的行列置1
        mines.push([row, col]);
    }




    //计算有雷的周边为0的，0的周边雷数
    for (let [row, col] of mines) { //row，col从0开始，遍历雷的周边
        console.log("mine: ", row, col);//打印
        for (let [drow, dcol] of directions) {  //遍历周边8个方向
            let cellRow = row + drow;//定义8个方向的格子位置
            let cellCol = col + dcol;
            if (cellRow < 0 || cellRow >= numRows || cellCol < 0 || cellCol >= numCols) {//对边界进行判断，不能越界
                continue;

            }
            if (grid[cellRow][cellCol] === 0) { //找到为0的格子，准备遍历周边
                console.log("target: ", cellRow, cellCol);//打印不是雷格子的位置
                let count = 0;
                for (let [arow, acol] of directions) {//遍历周边
                    let ambientRow = cellRow + arow;//定义0格子周边的格子
                    let ambientCol = cellCol + acol;
                    if (ambientRow < 0 || ambientRow >= numRows || ambientCol < 0 || ambientCol >= numCols) {//对0格周边遍历时也判断越界
                        continue;
                    }
                    if (grid[ambientRow][ambientCol] === -1) {//找到周边是雷的格子
                        console.log("danger!", ambientRow, ambientCol);//打印出雷的格子位置
                        count += 1;
                    }   
                } 
                if (count > 0) { //若不为0
                    grid[cellRow][cellCol]= count;//将该格赋值为记的雷数
                }
            }
               
        }    
         
    }                 
    //console.log(grid);
    return grid;
}

let grid =  initialize(15,20,50);


rederBoard(15,20,grid);//参数；长宽,初始化置零


