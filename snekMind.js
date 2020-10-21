const db = (() =>{
    let snekWorld = [];
    for(let i = 0; i < 26; i++){
        let mainHtml =  `<div class="snekRow"></div>`
        document.querySelector(".snekWorld").insertAdjacentHTML("beforeend", mainHtml); 
    }
    let dworld = document.querySelector(".snekWorld").children;
    for(let k = 0; k < 26; k++){
        snekWorld.push([])
        for(let i = 0; i < 26; i++){
            dworld[k].insertAdjacentHTML("beforeend", `<div class="snekCube"></div>`);
            snekWorld[k].push(dworld[k].lastChild);
            }
    }
    return{
        board : snekWorld,

    };
    })();

const controller = (()=>{
    let head, dirV, dirH, posY, posX, gameOn, snekWorld, fruit;
    let body = [];
    let hiscores = [];
    let points = 0;
    let hs = document.querySelector(".snekScores");   
        document.addEventListener("keypress", e => {
            switch(e.key){
                case"w" || 38:
                    dirV = -1;
                    dirH = 0;
                    break;
                case "a":
                    dirV = 0;
                    dirH = -1;
                    break;
                case "d":
                    dirV = 0;
                    dirH = 1;
                    break;
                case "s":
                    dirV = 1;
                    dirH = 0;
                    break;
            }
            if("wads".includes(e.key) && !gameOn){
                gameOn = true;
                setHead();
                if(fruit){
                    fruit.className= "snekCube";
                }
                setFruit();
                run();
            }
    })

    const setHead = () =>{
        points = 0;
        addPts(0)
        posX = Math.floor(Math.random()* 20 + 3);
        posY = Math.floor(Math.random()* 20 + 3);
        head = snekWorld[posY][posX];
        head.className = "snekHead";
    }

    const grow = () => {
        body.unshift(head);
        moveHead();
        body[0].className = "snekBody";
    }
    const move = () => {
        if(head == fruit){
            grow()
            setFruit();
            addPts(1);
            return;
        }
        else if(body.length > 0){
            body.unshift(head);
            moveHead();
            if(body.includes(head)){
                loose()
                return;
            }
            body[0].className = "snekBody";
            body[body.length-1].className = "snekCube"
            body.splice(body.length -1, 1);
        }else{
            moveHead();
        }
        
    }
    const moveHead = ()=> {
        head.className = "snekCube";
        let nPosY = posY + dirV;
        let nPosX = posX + dirH;
        if((nPosX > -1 && nPosX < 26) && (nPosY > -1 && nPosY < 26)){
            head = snekWorld[nPosY][nPosX];
            head.className = "snekHead";
            posX = nPosX;
            posY = nPosY;
            }
        else{
            console.log("ulost")
            loose();
            return;
        }
        
    }
    const run = () =>{
        if (gameOn){
            setTimeout(()=>{
                move()
                run();
            },  100)
            }
    }

    const setWorld = w => {
        snekWorld = w;
        }
    
    const setFruit = ()=>{
        fruit = snekWorld[Math.floor(Math.random()*26)][Math.floor(Math.random()*26)];
        fruit.className = "snekSnack";
        if(body.includes(fruit)){
            fruit.className = "snekBody"
            setFruit()
        }
        
    }

    const loose = () => {
        gameOn = false;   
        body.forEach(e=> {
            e.className = "snekCube";
        });
        head.className = "snekCube";
        body=[];
        hiscores.push(prompt("Write your name here: ", "Noone: ") +" " + points);
        hs.insertAdjacentHTML("beforeend", `<li><p>${hiscores[hiscores.length - 1]}</p></li>`);
    }

    const addPts = (add) =>{
        document.querySelector(".snekPoints").textContent = points += add;
    }
    return{
        init : function(s){
            setWorld(s);
        
        }
    };
})();

controller.init(db.board);
    


   
        

    

