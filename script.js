// two players - o and x 
// lets say starts with o 

// task1 : on tapping on any of the cell, o/x should get logged there

// add eventListener to all the cell ---> can be done by directly applying eventListener on parent only (event bubbling)




let winnerList = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
]


// we make an array which replicates each cells of board as its indices 
// we set values of each indices as "E" implying empty 

// as any of the cell be filled by "o"/ "x" by the user, backend mei we'll store that fillin using this array 
// we'll update that index value in this arr with that value (id of cells = index of this arr)

// this will also help us match and compare cells among winnerList.


//                 0    1    2    3    4    5    6    7    8
// board_array = ["E", "E", "E", "E", "E", "E", "E", "E", "E"]

// board_array = ["E", "0", "E", "0", "E", "E", "X", "X", "X"]
// [6,7,8] matches with x and [6,7,8] aere among winnerList, so X is winner 


const board_array = new Array(9).fill("E")
// console.log(board_array);// Array(9) ["E", "E", "E", "E", "E", "E", "E", "E", "E"]



// function isWinner to check if winner has been found --> it is used each time any one fills o/x on board 
function isWinner(){
    // for (let i of winnerList){
    //     console.log(i); // [0,1,2], [3,4,5], [6,7,8],.............
        
    // }

    // for (let [i1, i2, i3] of winnerList){
    //     console.log(i1); // 0
    //     console.log(i2); // 1
    //     console.log(i3); // 2...........
        
    // }

    // ******** destructuring the array first -> [0,1,2] to 0, 1 and 2 ---> and then compare each indexes ****

    for (let [index0, index1, index2] of winnerList){
        if (board_array[index0]!="E" && board_array[index0] === board_array[index1] && board_array[index1] === board_array[index2]){
            return 1 
        }

    }
    return 0
}


let turn = "o"
let total_turn = 0

// defined callback function which has to be sent inside the eventListener here only.

const callbacktoEvent = (event)=>{
    // parent finds out which child(cell) got clicked using event.target
    // and put o/x there based on whose turn it is
    
    // after that we also change the turn so next time other gets logged 
    
    
    const element = event.target


    if (board_array[element.id] ==="E")
    {
        total_turn ++
        if (turn === "o"){
            element.innerHTML = "o"
            board_array[element.id] = "o"
            // at each appending of any values, we check if winner has been found by comparing three cells (indices of board array) to be in winnerList or not 

            // isWinner func handles that for us. It checks if winner is found or not, if yees, returns 1 else returns 0
            if(isWinner()){
                const printWinningMessage = document.getElementById("winningMessage")
                printWinningMessage.innerHTML = "winner is " + "o"
                board.removeEventListener("click", callbacktoEvent)
                return // imp, as it should not go ahead with after printing result
            }
            turn = "x"
        }
        else{
            element.innerHTML = "x"
            board_array[element.id] = "x"
            if(isWinner()){
                document.getElementById("winningMessage").innerHTML = "winner is " + "x"
                board.removeEventListener("click", callbacktoEvent)
                return 
            }

            turn = "o"
        }

        // if the board has got filled completely and yet no winner found, then print draw

        if (total_turn == 9)
        {
            document.getElementById("winningMessage").innerHTML = "Match Drawn"
        }

    }

    
}





/// ******************* starting point ****************************
const board = document.querySelector(".board") // this is the parent to all the cell 


board.addEventListener("click", callbacktoEvent)
// task 2: how to decide on winner --> code part added above in start/top


// task 3:
// after we handle and the winner msg gets printed, the cells still get overwritten on pressed 
// to handle that, we include a if case--> that these ops gets done only when board_arr[element.id] =="E"


// task 4: 
// even when result declared, the vacant cells still gets filled on clicking . we need to stop that 
// we can do that by removing eventListener from the board once result gets printed 

// removeEventListener("click", callback function)

// we need to removeEventListener the moment winner gets announced 

// task 5:
// handle draw cases 
// draw happens when the board filled up and no one became winner 
// special case in draw: when at the very step, winner get decided, in that case the code doesnt print match drawn, 
// to handle that add return after winner thingy announced.