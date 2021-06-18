class MineSweeper
{

    _model;
    _view;

    constructor() {
        if (!MineSweeper._instance) {
            MineSweeper._instance = this;
            this._model= new MineSweeperModel();
            this._view = new MineSweeperView();
        }
        return MineSweeper._instance;
    }

    setContainerHTMLElements(row, col, mcount, ngbtn, field)
    {
        this.addEvents(this.view.setContainerHTMLElements(row,col,mcount,ngbtn,field))
    }

    static addEvents(elements)
    {
        // elements[1].addEventListener("click",()=>
        // {
        //
        //     let isOpen = this.view.getIsParentOPen();
        //
        // })

        elements[0].addEventListener("click",() => {
        this.createNewGame()
        })
        elements[2].addEventListener("mousedown",() => {
            this.mouseDownOnField()
        })
        elements[2].addEventListener("mouseup",() => {
            this.mouseUpOnField()
        })
    }

    static mouseDownOnField()          //egér lenyomásra megjegyzi az időt , a hosszú gombnyomáshoz kell
    {
        if ((event.target.className.search("fpclass")!=-1)&&(event.which==1))
            this.model.setLastTime(new Date().valueOf())
    }

    static mouseUpOnField()
    {
        if ((event.target.className.search("fpclass")!=-1)&&(event.which==1)) {
            let clicks = this.model.clickHappened(event.target.getAttribute("data-coord"))
            if (clicks !== "lost") {
                this.view.displayResults(clicks);
            }
            else
            {
                this.view.displayMines(this.model.getMineCoords())
            }
        }
        console.log(this.model.checkWin())
        if(this.model.checkWin()) alert("You win");


    }

    static createNewGame()
    {
        let data = this.view.newGame();
        this.model.newGame(data);

    }

}
