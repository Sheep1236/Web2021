function rederBoard(numRows,numCols,grid){ //定义棋盘长宽的函数,棋盘格初始化置零

    let boardEl = document.querySelector("#board");
    
    for (let i=0; i<numRows; i++) { //添加长
        let trEl = document.createElement("tr"); //创建tr（行）
        for (let j=0; j < numCols; j++) { //添加宽
           
            let cellEl =document.createElement("div");//在cellEl中创建div，雷都位置

            cellEl.className = "cell";//为cellEl指定样式
            //cellEl.innerText = grid[i][j].count; //cellEl中填写count值

            grid[i][j].cellEl = cellEl; //将cellEl也加入grid对象



            //if ( grid[i][j].count === -1) {  //雷用*表示
            //    cellEl.innerText = "*";    
            //} else {
//////////
            //  cellEl.innerText = grid[i][j].count; //不是雷还用数字
            //}
//////////

            cellEl.addEventListener("click", (e)=> { // 对棋盘格进行点击，实现切换状态，(e)=>之后为要响应的点击事件
                if (grid[i][j].count === -1) { //若count=-1则触雷，调explode函数
                    explode(grid, i, j, numRows, numCols)
                    

                    return;
                    
                }

                if (grid[i][j].count === 0 ) {  //如果count为0，则要周边搜索，并展开不为雷的棋盘格
                    searchClearArea(grid, i, j, numRows, numCols); //找安全区域，i，j起始（调searchClearArea函数）
                } else if (grid[i][j].count > 0) { //如果count大于0，
                    grid[i][j].clear = true; //赋值true
                    cellEl.classList.add("clear"); //并使该棋盘格clear


                    grid[i][j].cellEl.innerText = grid[i][j].count; //将该count值直接赋予该棋盘格
                }
                checkAllClear(grid);
                


            //cellEl.classList.add("clear");  //将棋盘格翻开
            });    


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
        
            grid[i][j] = {//初始化，存对象，存两个值clear和count

            clear: false, //clear属性，一开始没有棋盘格被检查
            count: 0  //（count值：0没雷，-1有雷，大于0表示有几个雷）
            }
        }

    }
    let mines = []; //空列表，cellSn雷号要放进去
    for (let k = 0; k < numMines; k++) { //对有雷的格子编号
        let cellSn = Math.trunc(Math.random() * numRows * numCols); //有雷的格子编号
                                //math取0~1     

        let row = Math.trunc(cellSn / numCols);//格子号整除列数确定第几行
        let col = cellSn % numCols;//格子号除行数余数确定是第几列

        console.log(cellSn, row, col);//打印

        grid[row][col].count = -1; ///将上述随机出的行列置1,返回count值
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
            if (grid[cellRow][cellCol] .count=== 0) { //找到为0的格子，准备遍历周边，0返回count
                console.log("target: ", cellRow, cellCol);//打印不是雷格子的位置
                let count = 0;
                for (let [arow, acol] of directions) {//遍历周边
                    let ambientRow = cellRow + arow;//定义0格子周边的格子
                    let ambientCol = cellCol + acol;
                    if (ambientRow < 0 || ambientRow >= numRows || ambientCol < 0 || ambientCol >= numCols) {//对0格周边遍历时也判断越界
                        continue;
                    }
                    if (grid[ambientRow][ambientCol].count === -1) {//找到周边是雷的格子，-1返回count值
                        console.log("danger!", ambientRow, ambientCol);//打印出雷的格子位置
                        count += 1;
                    }   
                } 
                if (count > 0) { //若不为0
                    grid[cellRow][cellCol].count= count;//将该格赋值为记的雷数,返回count值
                }
            }
               
        }    
         
    }                 
    //console.log(grid);
    return grid; //返回对象，并将grid参数传给rederBoard去绘制
}



function searchClearArea(grid, row, col, numRows, numCols) { // 搜索周边的函数，将grid, row, col, numRows, numCols参数全部传进去
    let gridCell = grid[row][col];
    gridCell.clear = true;
    gridCell.cellEl.classList.add("clear"); //若棋盘格为true则补充其为clear

    for (let [drow, dcol] of directions) { // 遍历周边区域，同上
        let cellRow = row + drow;
        let cellCol = col + dcol;
        console.log(cellRow, cellCol, numRows, numCols);
        if (cellRow < 0 || cellRow >= numRows || cellCol < 0 || cellCol >= numCols) {
            continue;
        }

        let gridCell = grid[cellRow][cellCol]; //右赋值给左

        console.log(cellRow, cellCol, gridCell);
        
        if (!gridCell.clear) { //遍历过没问题但未clear
            gridCell.clear = true;  //使其clear，再true使其安全
            gridCell.cellEl.classList.add("clear");




            if (gridCell.count === 0) { //count为0即安全，可以继续搜索
                searchClearArea(grid, cellRow, cellCol, numRows, numCols); // 遍历区域
            } else if (gridCell.count > 0) {
                gridCell.cellEl.innerText = gridCell.count;//若不为0，则clear后要显示
            }

        }
    }
}

//触雷机制
function explode(grid, row, col, numRows, numCols) { //先传参数
    grid[row][col].cellEl.classList.add("exploded");//加一个属性

    for (let cellRow = 0; cellRow < numRows; cellRow++) {
        for (let cellCol = 0; cellCol < numCols; cellCol++) {

            let cell =  grid[cellRow][cellCol];//增加一个属性   
           

            cell.clear = true;
            cell.cellEl.classList.add('clear'); //将所有棋盘格clear
            
            
            if (cell.count === -1) {
                cell.cellEl.classList.add('landmine'); // 将为雷的地方标记为landmine（类）
                
            }
            
        }
    }
    
    alert('游戏失败');
}



function checkAllClear(grid) {
    for (let row = 0; row < grid.length; row ++) {
        let gridRow = grid[row];
        for (let col = 0; col < gridRow.length; col ++) {
            let cell = gridRow[col];
            if (cell.count !== -1 && !cell.clear) {
                return false;
            }
        }
    }

    for (let row = 0; row < grid.length; row ++) {
        let gridRow = grid[row];
        for (let col = 0; col < gridRow.length; col ++) {
            let cell = gridRow[col];

            if (cell.count === -1) {
                cell.cellEl.classList.add('landmine');
            }

            cell.cellEl.classList.add("success");
            

            
        }
    }
    alert('恭喜你，游戏通过');
    return true;
    
}






let grid =  initialize(10,10,15); //设置长，宽，雷数


rederBoard(10,10,grid);//参数；长宽,初始化置零（count值：0没雷，-1有雷，大于0表示有几个雷）

//打印：  mine该棋盘格周边雷数  target该位置没雷  danger!该位置有雷


