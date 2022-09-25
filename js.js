window.onload = init();
let currentPosition;
var arrowKey;
let snakeLength = [];

function init(){

    gridCreate();

    document.addEventListener("keydown", key =>
    {
        if (key.key == "ArrowRight" & arrowKey == "ArrowLeft" ^ key.key == "ArrowLeft" & arrowKey == "ArrowRight" ^ key.key == "ArrowDown" & arrowKey == undefined) 
            return;
        else if (key.key == "ArrowUp" & arrowKey == "ArrowDown" ^ key.key == "ArrowDown" & arrowKey == "ArrowUp")
            return;
        


        switch(key.key)
        {
            case "ArrowLeft":

                arrowKey = key.key;
                break;
            case "ArrowRight":

                arrowKey = key.key;
                break;
            case "ArrowUp":

                arrowKey = key.key;
                break;
            case "ArrowDown":

                arrowKey = key.key;
                break;
            default:
                arrowKey;
                break;
        }


    })

    setInterval(function() {program()},500);
    setInterval(function() {randomize(0,19)},2000);
    
    
}


function gridCreate()
{


    var map = document.getElementById("map");
    
        
    //20 squares in row
    for(i=0; i < 20; i++)
    {
    var row = map.appendChild(document.createElement("div"));
    row.className = "row";
    row.id = `row_${i}`
    var row = document.getElementById("map").lastChild;

        for(j=0; j < 20; j++)
        {
            var square = row.appendChild(document.createElement("div"));
            square.className = "normalSquare";
            square.id = `sq_${i}_${j}`;
        }
    }

}


function program()
{

    if(currentPosition == undefined)
    {
        currentPosition = document.getElementById("sq_10_9");
        snakeLength.push(currentPosition);
    }
    
    let move = new Move(currentPosition);


    switch(arrowKey)
        {
            case "ArrowLeft":
                move.left();
                break;
            case "ArrowRight":
                move.right();
                break;
            case "ArrowUp":
                move.up();
                break;
            case "ArrowDown":
                move.down();
                break;
            default:
                //want be execute
                move.up();
                break;
        }

}




class Move
{
    constructor(previousPosition)
    {
        this.cellData = previousPosition.id.toString().split('_');
        this.row = parseInt(this.cellData[1]);
        this.col = parseInt(this.cellData[2]);
        this.cell;
        this.previousPosition = previousPosition;
    }


    valid()
    {
        if (!this.cell)
        return false;
    
        currentPosition = this.cell;
        changeClass(this.cell, this.previousPosition);
        return true;
    }

    up()
    {
        this.cell = document.getElementById(`sq_${this.row-1}_${this.col}`);
        return this.valid();

    }

    down()
    {
        this.cell = document.getElementById(`sq_${this.row+1}_${this.col}`);
        return this.valid();
        
    }

    right()
    {
        this.cell = document.getElementById(`sq_${this.row}_${this.col+1}`);
        return this.valid();
        
    }

    left()
    {
        this.cell = document.getElementById(`sq_${this.row}_${this.col-1}`);
        return this.valid();
        
    }
}




function changeClass(cell, previousCell)
{


    if (cell.className == "mouseSquare")
    {

        cell.className = "bodySquare";
        
        snakeLength.splice(0,0,cell);
    } 
    else if (cell.className == "bodySquare")
    {
        gameOver();
    }
    else
    {
        cell.className = "bodySquare";
        snakeLength[snakeLength.length - 1].className = "normalSquare";
        snakeLength.splice(-1);
        snakeLength.splice(0,0,cell);
    }

}

function randomize(min, max)
{


    if (document.querySelectorAll(".mouseSquare").length >= 5)
        return;



    function randomMouse()
    {
        return Math.floor(Math.random()* (max - min + 1)) + min; 
    }
    
        let flag = false;
    do 
    {
        let row = randomMouse();
        let col = randomMouse();    

        let mouse = document.getElementById(`sq_${row}_${col}`);
        if (mouse.className != "normalSquare")
            flag == false;
        else    
        {
            mouse.className = "mouseSquare";
            flag == true
        }

    } while (flag != false);   

}