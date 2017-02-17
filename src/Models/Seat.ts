export class Seat {
    RowNumber: number;
    Top:number;
    Left:number;
    SeatClass:number;
    Src:string;
    constructor(rowNumber:number,top:number,left:number,seatClass:number)
    {
        this.Left=left;
        this.RowNumber=rowNumber;
        this.Top=top;
        this.SeatClass=seatClass;
        switch(this.SeatClass)
        {
            case 1:{
                this.Src="../assets/Images/green.png";
                break;
            }
             case 2:{
                this.Src="../assets/Images/blue.png";
                break;
            }
             case 3:{
                this.Src="../assets/Images/red.png";
                break;
            }
        }        
    }
}