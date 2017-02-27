export class Seat {
    RowNumber?: number;
    Top:number;
    Left:number;
    SeatClass:number;
    SeatCssClass:string;
    Src:string;
    ID:number;
    constructor(rowNumber:number,top:number,left:number,seatClass:number,id:number)
    {
        this.RowNumber=rowNumber;
        this.Top=top;
        this.Left=left;
        this.SeatClass=seatClass;
        this.ID=id;
        switch(this.SeatClass)
        {
            case 1:{
                this.SeatCssClass="green";
                this.Src="../assets/Images/green.png";
                break;
            }
             case 2:{
                this.SeatCssClass="blue";
                this.Src="../assets/Images/blue.png";
                break;
            }
             case 3:{
                this.SeatCssClass="red"; 
                this.Src="../assets/Images/red.png";
                break;
            }
             case 4:{
                this.SeatCssClass="grey";
                this.Src="../assets/Images/gray.png";
                break;
            }
        }        
    }
}