import { Injectable } from '@angular/core';
import { Seat } from '../Models/Seat';
import { ISortService } from './ISortService';

@Injectable()
export class SortService implements ISortService {

    constructor() { }

    SortLeftToRight(rowCount: number, columnCount: number) {
        var Container = [];
        var seatCounter = 1;
        for (var r = 0; r < rowCount; r++) {
            var SeatList: Seat[] = [];
            for (var c = 0; c < columnCount; c++) {
                var st = new Seat(seatCounter, 10 * r, 10 * c, 1);
                SeatList.push(st);
                seatCounter++;
            }
            Container.push(SeatList);
        }
        return Container;
    }
    SortLeftToRightFromDown(rowCount: number, columnCount: number) {
        var Container = [];
        var seatCounter = 1;
        for (var r = 0; r < rowCount; r++) {
            var SeatList: Seat[] = [];
            for (var c = 0; c < columnCount; c++) {
                var st = new Seat(seatCounter, 10 * r, 10 * c, 1);
                SeatList.push(st);
                seatCounter++;
            }
            Container.push(SeatList);
        }
        return Container.reverse();
    }
    SortRightToLeft(rowCount: number, columnCount: number) {
        var Container = [];
        var seatCounter = 1;
        for (var r = 0; r < rowCount; r++) {
            var SeatList: Seat[] = [];
            var currentNo = seatCounter;
            for (var c = columnCount; c > 0; c--) {
                var st = new Seat(Number(currentNo) + Number(c) - 1, 10 * r, 10 * c, 1);
                SeatList.push(st);
                seatCounter++;
            }
            Container.push(SeatList);
        }
        return Container;
    }
    SortRightToLeftFormDown(rowCount: number, columnCount: number) {
        var Container = [];
        var seatCounter = 1;
        for (var r = 0; r < rowCount; r++) {
            var SeatList: Seat[] = [];
            var currentNo = seatCounter;
            for (var c = columnCount; c > 0; c--) {
                var st = new Seat(Number(currentNo) + Number(c) - 1, 10 * r, 10 * c, 1);
                SeatList.push(st);
                seatCounter++;
            }
            Container.push(SeatList);
        }
        return Container.reverse();
    }
    SortSnakeLeftToRight(rowCount: number, columnCount: number) {
        var isReversSort = false;
        var Container = [];
        var seatCounter = 1;
        for (var r = 0; r < rowCount; r++) {
            var SeatList: Seat[] = [];
            if (isReversSort == false) {
                for (var c = 0; c < columnCount; c++) {
                    var st = new Seat(seatCounter, 10 * r, 10 * c, 1);
                    SeatList.push(st);
                    seatCounter++;
                }
                isReversSort = true;
            }
            else if (isReversSort == true) {
                var currentNo = seatCounter;
                for (var c = columnCount; c > 0; c--) {
                    //console.log("c:" + c);
                    //console.log("count" + columnCount);
                    //console.log("currentNo" + currentNo);

                    var st = new Seat(Number(currentNo) + Number(c) - 1, 10 * r, 10 * c, 1);
                    SeatList.push(st);
                    seatCounter++;
                }
                isReversSort = false;
            }
            Container.push(SeatList);
        }
        return Container;
    }
    SortSnakeLeftToRightFromDown(rowCount: number, columnCount: number) {
        var isReversSort = false;
        var Container = [];
        var seatCounter = 1;
        for (var r = 0; r < rowCount; r++) {
            var SeatList: Seat[] = [];
            if (isReversSort == false) {
                for (var c = 0; c < columnCount; c++) {
                    var st = new Seat(seatCounter, 10 * r, 10 * c, 1);
                    SeatList.push(st);
                    seatCounter++;
                }
                isReversSort = true;
            }
            else if (isReversSort == true) {
                var currentNo = seatCounter;
                for (var c = columnCount; c > 0; c--) {
                    //console.log("c:" + c);
                    //console.log("count" + columnCount);
                    //console.log("currentNo" + currentNo);

                    var st = new Seat(Number(currentNo) + Number(c) - 1, 10 * r, 10 * c, 1);
                    SeatList.push(st);
                    seatCounter++;
                }
                isReversSort = false;
            }
            Container.push(SeatList);
        }
        return Container.reverse();
    }
    SortSnakeRightToLeft(rowCount: number, columnCount: number) {
        var isReversSort = true;
        var Container = [];
        var seatCounter = 1;
        for (var r = 0; r < rowCount; r++) {
            var SeatList: Seat[] = [];
            if (isReversSort == false) {
                for (var c = 0; c < columnCount; c++) {
                    var st = new Seat(seatCounter, 10 * r, 10 * c, 1);
                    SeatList.push(st);
                    seatCounter++;
                }
                isReversSort = true;
            }
            else if (isReversSort == true) {
                var currentNo = seatCounter;
                for (var c = columnCount; c > 0; c--) {
                    //console.log("c:" + c);
                    //console.log("count" + columnCount);
                    //console.log("currentNo" + currentNo);

                    var st = new Seat(Number(currentNo) + Number(c) - 1, 10 * r, 10 * c, 1);
                    SeatList.push(st);
                    seatCounter++;
                }
                isReversSort = false;
            }
            Container.push(SeatList);
        }
        return Container;
    }
    SortSnakeRightToLeftFromDown(rowCount: number, columnCount: number) {
        var isReversSort = true;
        var Container = [];
        var seatCounter = 1;
        for (var r = 0; r < rowCount; r++) {
            var SeatList: Seat[] = [];
            if (isReversSort == false) {
                for (var c = 0; c < columnCount; c++) {
                    var st = new Seat(seatCounter, 10 * r, 10 * c, 1);
                    SeatList.push(st);
                    seatCounter++;
                }
                isReversSort = true;
            }
            else if (isReversSort == true) {
                var currentNo = seatCounter;
                for (var c = columnCount; c > 0; c--) {
                    //console.log("c:" + c);
                    //console.log("count" + columnCount);
                    //console.log("currentNo" + currentNo);

                    var st = new Seat(Number(currentNo) + Number(c) - 1, 10 * r, 10 * c, 1);
                    SeatList.push(st);
                    seatCounter++;
                }
                isReversSort = false;
            }
            Container.push(SeatList);
        }
        return Container.reverse();
    }
    SortType = [
        {
            id: 1, name: "Soldan Sağ"
        },
        {
            id: 2, name: "ZigZag Soldan Sağ"
        },
        {
            id: 3, name: "Sağdan Sola"
        },
        {
            id: 4, name: "Soldan Sağ Aşağıdan Başla"
        },
        {
            id: 5, name: "Sağdan Sola Aşağıdan Başla"
        },
        {
            id: 6, name: "ZigZag Sağdan Sola"
        },
        {
            id: 7, name: "ZigZag Soldan Sağ Aşağıdan Başla"
        },
        {
            id: 8, name: "ZigZag Sağdan Sola Aşağıdan Başla"
        }
    ];
    SeatType = [
        {
            id: 1, name: "Açık"
        },
        {
            id: 2, name: "Polis"
        },
        {
            id: 3, name: "Satış"
        },
    ];
}