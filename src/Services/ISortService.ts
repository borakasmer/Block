export interface ISortService {
    SortLeftToRight(rowCount: number, columnCount: number,seatStartNumber:number);    
    SortRightToLeft(rowCount: number, columnCount: number,seatStartNumber:number);
    SortSnakeLeftToRight(rowCount: number, columnCount: number,seatStartNumber:number);
    SortLeftToRightFromDown(rowCount: number, columnCount: number,seatStartNumber:number);
    SortRightToLeftFromDown(rowCount: number, columnCount: number,seatStartNumber:number);
    SortSnakeRightToLeft(rowCount: number, columnCount: number,seatStartNumber:number);
    SortSnakeLeftToRightFromDown(rowCount: number, columnCount: number,seatStartNumber:number);
    SortSnakeRightToLeftFromDown(rowCount: number, columnCount: number,seatStartNumber:number);
    OrderedSortLeftToRight(rowCount: number, columnCount: number,seatStartNumber:number) ;
    OrderedSortRightToLeft(rowCount: number, columnCount: number,seatStartNumber:number) ;
    AddRowOrderedSortLeftToRight(rowCount: number, columnCount: number,seatStartNumber:number) ;
    AddRowOrderedSortRightToLeft(rowCount: number, columnCount: number,seatStartNumber:number) ;
    AddColumnOrderedSortLeftToRight(rowCount: number, columnCount: number,seatStartNumber:number) ;
    AddColumnOrderedSortRightToLeft(rowCount: number, columnCount: number,seatStartNumber:number) ;
    SortType;
    SeatType;
}