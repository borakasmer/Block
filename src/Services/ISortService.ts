export interface ISortService {
    SortLeftToRight(rowCount: number, columnCount: number);    
    SortRightToLeft(rowCount: number, columnCount: number);
    SortSnakeLeftToRight(rowCount: number, columnCount: number);
    SortLeftToRightFromDown(rowCount: number, columnCount: number);
    SortRightToLeftFormDown(rowCount: number, columnCount: number);
    SortSnakeRightToLeft(rowCount: number, columnCount: number);
    SortSnakeLeftToRightFromDown(rowCount: number, columnCount: number);
    SortSnakeRightToLeftFromDown(rowCount: number, columnCount: number);

    SortType;
    SeatType;
}