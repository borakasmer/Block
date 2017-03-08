import { Injectable } from '@angular/core';
import { Seat } from '../Models/Seat';
import { ISortService } from './ISortService';

@Injectable()
export class SortService implements ISortService {
    basePositionCordinate: number = 30;
    constructor() { }

    //currentList var ise dizilmiş olna koltukların eski halleri gönderilmiş demektir.
    //isIgnoreGaps: Koltuk iptal işileminde, sıralama anında iptal edilen koltuk sayılsın mı sayılmasın mı?
    SortLeftToRight(rowCount: number, columnCount: number, seatStartNumber: number, currentList?: Seat[], isIgnoreGaps?: boolean, selectedCounterType?: number) {
        var Container = [];
        var seatCounter = 1;
        var seatCounterUnique = 1;
        //Tek ve çift sıralama için kullanılır. Sadece görüntüde vardır. Hesaplamalarda kullanılmaz. Yani Maskeleme yapmaktadır.
        var seatDisplayNumber:number = selectedCounterType != 0 ? selectedCounterType : 1;
        seatStartNumber != 1 ? seatDisplayNumber = seatStartNumber : null;
        for (var r = 0; r < rowCount; r++) {
            var SeatList: Seat[] = [];
            for (var c = 0; c < columnCount; c++) {

                //Eklenecek koltuğun eski durumu var mı diye bakılır? Varsa var olan güncel hali alınır.
                var currentSeat = currentList != null && currentList != undefined ?
                    //currentList.filter(se => se.ID == seatCounterUnique) : null;
                    currentList[seatCounterUnique - 1] : null;

                //
                var st = new Seat(
                    //(currentSeat != null && currentSeat[0].SeatClass == 4 && isIgnoreGaps) ? null : seatCounter,
                    seatCounter,
                    this.basePositionCordinate * r, this.basePositionCordinate * c,
                    currentSeat != null ? currentSeat.SeatClass : 1, seatCounterUnique, r + 1, c + 1, seatDisplayNumber);
                SeatList.push(st);
                seatCounterUnique++;
                if (st.SeatClass == 4 && isIgnoreGaps) {

                }
                else {
                    seatCounter++;                    
                    seatDisplayNumber = Number(seatDisplayNumber) + Number(selectedCounterType != 0 ? 2 : 1);
                }
            }
            Container.push(SeatList);
        }
        return Container;
    }
    SortLeftToRightFromDown(rowCount: number, columnCount: number, seatStartNumber: number, currentList?: Seat[], isIgnoreGaps?: boolean, selectedCounterType?: number) {
        var Container = [];
        var seatCounter = 1;
        var seatCounterUnique = 1;
        //Tek ve çift sıralama için kullanılır. Sadece görüntüde vardır. Hesaplamalarda kullanılmaz. Yani Maskeleme yapmaktadır.
        var seatDisplayNumber:number = selectedCounterType != 0 ? selectedCounterType : 1;
        seatStartNumber != 1 ? seatDisplayNumber = seatStartNumber : null;

        for (var r = 0; r < rowCount; r++) {
            var SeatList: Seat[] = [];
            for (var c = 0; c < columnCount; c++) {

                //Eklenecek koltuğun eski durumu var mı diye bakılır? Varsa var olan güncel hali alınır.
                var currentSeat = currentList != null && currentList != undefined ?
                    //currentList.filter(se => se.ID == seatCounterUnique) : null;
                    currentList[(rowCount - r) * columnCount - (columnCount - c)] : null;

                //

                var st = new Seat(seatCounter, this.basePositionCordinate * (rowCount - 1 - r), this.basePositionCordinate * c,
                    currentSeat != null ? currentSeat.SeatClass : 1, seatCounterUnique, r + 1, c + 1, seatDisplayNumber);
                SeatList.push(st);
                seatCounterUnique++;
                if (st.SeatClass == 4 && isIgnoreGaps) {

                }
                else {
                    seatCounter++;                    
                    seatDisplayNumber = Number(seatDisplayNumber) + Number(selectedCounterType != 0 ? 2 : 1);
                }
            }
            Container.push(SeatList);
        }
        return Container.reverse();
        //return Container;
    }
    SortRightToLeft(rowCount: number, columnCount: number, seatStartNumber: number, currentList?: Seat[], isIgnoreGaps?: boolean, selectedCounterType?: number) {
        var Container = [];
        var seatCounter = 1;
        var seatCounterUnique = 1;
        //Tek ve çift sıralama için kullanılır. Sadece görüntüde vardır. Hesaplamalarda kullanılmaz. Yani Maskeleme yapmaktadır.
        var seatDisplayNumber:number = selectedCounterType != 0 ? selectedCounterType : 1;
        seatStartNumber != 1 ? seatDisplayNumber = seatStartNumber : null;

        for (var r = 0; r < rowCount; r++) {
            var SeatList: Seat[] = [];
            for (var c = 0; c < columnCount; c++) {
                //Eklenecek koltuğun eski durumu var mı diye bakılır? Varsa var olan güncel hali alınır.
                var currentSeat = currentList != null && currentList != undefined ?
                    //currentList.filter(se => se.ID == seatCounterUnique) : null; 
                    //currentList[columnCount * (r + 1) - (columnCount - (c + 1)) - 1] : null;
                    currentList[columnCount * (r + 1) - c - 1] : null;

                //
                var st = new Seat(
                    //(currentSeat != null && currentSeat[0].SeatClass == 4 && isIgnoreGaps) ? null : seatCounter,
                    seatCounter,
                    this.basePositionCordinate * r, this.basePositionCordinate * (columnCount - c - 1),
                    currentSeat != null ? currentSeat.SeatClass : 1, seatCounterUnique, r + 1, c + 1, seatDisplayNumber);
                SeatList.push(st);
                seatCounterUnique++;
                if (st.SeatClass == 4 && isIgnoreGaps) {

                }
                else {

                    seatCounter++;                    
                    seatDisplayNumber = Number(seatDisplayNumber) + Number(selectedCounterType != 0 ? 2 : 1);
                }
            }
            Container.push(SeatList.reverse());
            //Container.push(SeatList);
        }
        return Container;
    }
    SortRightToLeftFromDown(rowCount: number, columnCount: number, seatStartNumber: number, currentList?: Seat[], isIgnoreGaps?: boolean, selectedCounterType?: number) {
        var Container = [];
        var seatCounter = 1;
        var seatCounterUnique = 1;
        //Tek ve çift sıralama için kullanılır. Sadece görüntüde vardır. Hesaplamalarda kullanılmaz. Yani Maskeleme yapmaktadır.
        var seatDisplayNumber:number = selectedCounterType != 0 ? selectedCounterType : 1;
        seatStartNumber != 1 ? seatDisplayNumber = seatStartNumber : null;

        for (var r = 0; r < rowCount; r++) {
            var SeatList: Seat[] = [];
            for (var c = 0; c < columnCount; c++) {

                //Eklenecek koltuğun eski durumu var mı diye bakılır? Varsa var olan güncel hali alınır.
                var currentSeat = currentList != null && currentList != undefined ?
                    //currentList.filter(se => se.ID == seatCounterUnique) : null;
                    currentList[currentList.length - seatCounterUnique] : null;

                //
                var st = new Seat(
                    //(currentSeat != null && currentSeat[0].SeatClass == 4 && isIgnoreGaps) ? null : seatCounter,
                    seatCounter,
                    this.basePositionCordinate * (rowCount - 1 - r), this.basePositionCordinate * (columnCount - c - 1),
                    currentSeat != null ? currentSeat.SeatClass : 1, seatCounterUnique, r + 1, c + 1, seatDisplayNumber);
                SeatList.push(st);
                seatCounterUnique++;
                if (st.SeatClass == 4 && isIgnoreGaps) {

                }
                else {
                    seatCounter++;                    
                    seatDisplayNumber = Number(seatDisplayNumber) + Number(selectedCounterType != 0 ? 2 : 1);
                }
            }
            Container.push(SeatList.reverse());
        }
        return Container.reverse();
    }
    SortSnakeLeftToRight(rowCount: number, columnCount: number, seatStartNumber: number, currentList?: Seat[], isIgnoreGaps?: boolean, selectedCounterType?: number) {
        var isReversSort = false;
        var Container = [];
        var seatCounter = 1;
        var seatCounterUnique = 1;
        //Tek ve çift sıralama için kullanılır. Sadece görüntüde vardır. Hesaplamalarda kullanılmaz. Yani Maskeleme yapmaktadır.
        var seatDisplayNumber:number = selectedCounterType != 0 ? selectedCounterType : 1;

        seatStartNumber != 1 ? seatDisplayNumber = seatStartNumber : null;
        for (var r = 0; r < rowCount; r++) {
            var SeatList: Seat[] = [];
            if (isReversSort == false) {
                for (var c = 0; c < columnCount; c++) {

                    //Eklenecek koltuğun eski durumu var mı diye bakılır? Varsa var olan güncel hali alınır.
                    var currentSeat = currentList != null && currentList != undefined ?
                        //currentList.filter(se => se.ID == seatCounterUnique) : null;
                        currentList[seatCounterUnique - 1] : null;

                    var st = new Seat(seatCounter, this.basePositionCordinate * r, this.basePositionCordinate * c,
                        //currentSeat != null ? currentSeat[0].SeatClass : 1, seatCounterUnique);
                        currentSeat != null ? currentSeat.SeatClass : 1, seatCounterUnique, r + 1, c + 1, seatDisplayNumber);
                    SeatList.push(st);
                    seatCounterUnique++;
                    if (st.SeatClass == 4 && isIgnoreGaps) {

                    }
                    else {
                        seatCounter++;                        
                        seatDisplayNumber = Number(seatDisplayNumber) + Number(selectedCounterType != 0 ? 2 : 1);
                    }
                }
                isReversSort = true;
            }
            else if (isReversSort == true) {
                var currentNo = seatCounter;
                for (var c = 0; c < columnCount; c++) {

                    //Eklenecek koltuğun eski durumu var mı diye bakılır? Varsa var olan güncel hali alınır.
                    var currentSeat = currentList != null && currentList != undefined ?
                        //currentList.filter(se => se.ID == seatCounterUnique) : null;
                        //currentList[columnCount * (r + 1) - (columnCount - (c + 1)) - 1] : null;
                        currentList[columnCount * (r + 1) - c - 1] : null;
                    var st = new Seat(seatCounter,
                        this.basePositionCordinate * r, this.basePositionCordinate * (columnCount - c - 1),
                        //currentSeat != null ? currentSeat[0].SeatClass : 1, seatCounterUnique);
                        currentSeat != null ? currentSeat.SeatClass : 1, seatCounterUnique, r + 1, c + 1, seatDisplayNumber);

                    SeatList.push(st);
                    seatCounterUnique++;
                    if (st.SeatClass == 4 && isIgnoreGaps) {

                    }
                    else {
                        seatCounter++;                        
                        seatDisplayNumber = Number(seatDisplayNumber) + Number(selectedCounterType != 0 ? 2 : 1);
                    }
                }
                isReversSort = false;
            }

            //Container.push(SeatList);

            if (isReversSort) {
                Container.push(SeatList);
            }
            else {
                Container.push(SeatList.reverse());
            }
        }
        return Container;
    }
    SortSnakeLeftToRightFromDown(rowCount: number, columnCount: number, seatStartNumber: number, currentList?: Seat[], isIgnoreGaps?: boolean, selectedCounterType?: number) {
        var isReversSort = false;
        var Container = [];
        var seatCounter = 1;
        var seatCounterUnique = 1;
        //Tek ve çift sıralama için kullanılır. Sadece görüntüde vardır. Hesaplamalarda kullanılmaz. Yani Maskeleme yapmaktadır.
        var seatDisplayNumber:number = selectedCounterType != 0 ? selectedCounterType : 1;
        seatStartNumber != 1 ? seatDisplayNumber = seatStartNumber : null;

        for (var r = 0; r < rowCount; r++) {
            var SeatList: Seat[] = [];
            if (isReversSort == false) {
                for (var c = 0; c < columnCount; c++) {

                    //Eklenecek koltuğun eski durumu var mı diye bakılır? Varsa var olan güncel hali alınır.
                    var currentSeat = currentList != null && currentList != undefined ?
                        //currentList.filter(se => se.ID == seatCounterUnique) : null;
                        currentList[(rowCount - r) * columnCount - (columnCount - c)] : null;

                    var st = new Seat(seatCounter, this.basePositionCordinate * (rowCount - 1 - r), this.basePositionCordinate * c,
                        currentSeat != null ? currentSeat.SeatClass : 1, seatCounterUnique, r + 1, c + 1, seatDisplayNumber);
                    SeatList.push(st);
                    seatCounterUnique++;
                    if (st.SeatClass == 4 && isIgnoreGaps) {

                    }
                    else {
                        seatCounter++;
                        seatDisplayNumber = Number(seatDisplayNumber) + Number(selectedCounterType != 0 ? 2 : 1);
                    }
                }
                isReversSort = true;
            }
            else if (isReversSort == true) {
                var currentNo = seatCounter;
                for (var c = 0; c < columnCount; c++) {

                    //Eklenecek koltuğun eski durumu var mı diye bakılır? Varsa var olan güncel hali alınır.
                    var currentSeat = currentList != null && currentList != undefined ?
                        //currentList.filter(se => se.ID == seatCounterUnique) : null;
                        currentList[Number(rowCount) * Number(columnCount) - seatCounterUnique] : null;

                    var st = new Seat(seatCounter,
                        this.basePositionCordinate * (rowCount - 1 - r), this.basePositionCordinate * (columnCount - c - 1),
                        currentSeat != null ? currentSeat.SeatClass : 1, seatCounterUnique, r + 1, c + 1, seatDisplayNumber);

                    SeatList.push(st);
                    seatCounterUnique++;
                    if (st.SeatClass == 4 && isIgnoreGaps) {

                    }
                    else {
                        seatCounter++;                        
                        seatDisplayNumber = Number(seatDisplayNumber) + Number(selectedCounterType != 0 ? 2 : 1);
                    }
                }
                isReversSort = false;
            }
            if (isReversSort) {
                Container.push(SeatList);
            }
            else {
                Container.push(SeatList.reverse());
            }
        }
        return Container.reverse();
        //return Container;
    }
    SortSnakeRightToLeft(rowCount: number, columnCount: number, seatStartNumber: number, currentList?: Seat[], isIgnoreGaps?: boolean, selectedCounterType?: number) {
        var isReversSort = true;
        var Container = [];
        var seatCounter = 1;
        var seatCounterUnique = 1;
        //Tek ve çift sıralama için kullanılır. Sadece görüntüde vardır. Hesaplamalarda kullanılmaz. Yani Maskeleme yapmaktadır.
        var seatDisplayNumber:number = selectedCounterType != 0 ? selectedCounterType : 1;
        seatStartNumber != 1 ? seatDisplayNumber = seatStartNumber : null;

        for (var r = 0; r < rowCount; r++) {
            var SeatList: Seat[] = [];
            if (isReversSort == false) {
                for (var c = 0; c < columnCount; c++) {

                    //Eklenecek koltuğun eski durumu var mı diye bakılır? Varsa var olan güncel hali alınır.
                    var currentSeat = currentList != null && currentList != undefined ?
                        //currentList.filter(se => se.ID == seatCounterUnique) : null;
                        currentList[seatCounterUnique - 1] : null;

                    var st = new Seat(seatCounter, this.basePositionCordinate * r, this.basePositionCordinate * c,
                        //currentSeat != null ? currentSeat[0].SeatClass : 1, seatCounterUnique);
                        currentSeat != null ? currentSeat.SeatClass : 1, seatCounterUnique, r + 1, c + 1, seatDisplayNumber);
                    SeatList.push(st);
                    seatCounterUnique++;
                    if (st.SeatClass == 4 && isIgnoreGaps) {

                    }
                    else {
                        seatCounter++;                        
                        seatDisplayNumber = Number(seatDisplayNumber) + Number(selectedCounterType != 0 ? 2 : 1);
                    }
                }
                isReversSort = true;
            }
            else if (isReversSort == true) {
                var currentNo = seatCounter;
                for (var c = 0; c < columnCount; c++) {

                    //Eklenecek koltuğun eski durumu var mı diye bakılır? Varsa var olan güncel hali alınır.
                    var currentSeat = currentList != null && currentList != undefined ?
                        //currentList.filter(se => se.ID == seatCounterUnique) : null;
                        //currentList[columnCount * (r + 1) - (columnCount - (c + 1)) - 1] : null;
                        currentList[columnCount * (r + 1) - c - 1] : null;
                    var st = new Seat(seatCounter,
                        this.basePositionCordinate * r, this.basePositionCordinate * (columnCount - c - 1),
                        //currentSeat != null ? currentSeat[0].SeatClass : 1, seatCounterUnique);
                        currentSeat != null ? currentSeat.SeatClass : 1, seatCounterUnique, r + 1, c + 1, seatDisplayNumber);

                    SeatList.push(st);
                    seatCounterUnique++;
                    if (st.SeatClass == 4 && isIgnoreGaps) {

                    }
                    else {
                        seatCounter++;                        
                        seatDisplayNumber = Number(seatDisplayNumber) + Number(selectedCounterType != 0 ? 2 : 1);
                    }
                }
                isReversSort = false;
            }

            //Container.push(SeatList);

            if (isReversSort) {
                Container.push(SeatList);
            }
            else {
                Container.push(SeatList.reverse());
            }
        }
        return Container;
    }
    SortSnakeRightToLeftFromDown(rowCount: number, columnCount: number, seatStartNumber: number, currentList?: Seat[], isIgnoreGaps?: boolean, selectedCounterType?: number) {
        var isReversSort = true;
        var Container = [];
        var seatCounter = 1;
        var seatCounterUnique = 1;
        //Tek ve çift sıralama için kullanılır. Sadece görüntüde vardır. Hesaplamalarda kullanılmaz. Yani Maskeleme yapmaktadır.
        var seatDisplayNumber:number = selectedCounterType != 0 ? selectedCounterType : 1;
        seatStartNumber != 1 ? seatDisplayNumber = seatStartNumber : null;

        for (var r = 0; r < rowCount; r++) {
            var SeatList: Seat[] = [];
            if (isReversSort == false) {
                for (var c = 0; c < columnCount; c++) {

                    //Eklenecek koltuğun eski durumu var mı diye bakılır? Varsa var olan güncel hali alınır.
                    var currentSeat = currentList != null && currentList != undefined ?
                        //currentList.filter(se => se.ID == seatCounterUnique) : null;
                        //currentList[columnCount * (r + 1) - (columnCount - (c + 1)) - 1] : null; 
                        currentList[(rowCount - r) * columnCount - (columnCount - c)] : null;

                    var st = new Seat(seatCounter, this.basePositionCordinate * (rowCount - 1 - r), this.basePositionCordinate * c,
                        currentSeat != null ? currentSeat.SeatClass : 1, seatCounterUnique, r + 1, c + 1, seatDisplayNumber);
                    SeatList.push(st);
                    seatCounterUnique++;
                    if (st.SeatClass == 4 && isIgnoreGaps) {

                    }
                    else {
                        seatCounter++;                        
                        seatDisplayNumber = Number(seatDisplayNumber) + Number(selectedCounterType != 0 ? 2 : 1);
                    }
                }
                isReversSort = true;
            }
            else if (isReversSort == true) {
                var currentNo = seatCounter;
                for (var c = 0; c < columnCount; c++) {
                    //Eklenecek koltuğun eski durumu var mı diye bakılır? Varsa var olan güncel hali alınır.
                    var currentSeat = currentList != null && currentList != undefined ?
                        currentList[Number(rowCount) * Number(columnCount) - seatCounterUnique] : null;

                    var st = new Seat(seatCounter,
                        this.basePositionCordinate * (rowCount - 1 - r), this.basePositionCordinate * (columnCount - c - 1),
                        //currentSeat != null ? currentSeat[0].SeatClass : 1, seatCounterUnique);
                        currentSeat != null ? currentSeat.SeatClass : 1, seatCounterUnique, r + 1, c + 1, seatDisplayNumber);

                    SeatList.push(st);
                    seatCounterUnique++;
                    if (st.SeatClass == 4 && isIgnoreGaps) {

                    }
                    else {
                        seatCounter++;                        
                        seatDisplayNumber = Number(seatDisplayNumber) + Number(selectedCounterType != 0 ? 2 : 1);
                    }
                }
                isReversSort = false;
            }
            //Container.push(SeatList);

            if (isReversSort) {
                Container.push(SeatList);
            }
            else {
                Container.push(SeatList.reverse());
            }
        }
        return Container.reverse();
        //return Container;
    }
    OrderedSortLeftToRight(rowCount: number, columnCount: number, seatStartNumber: number, currentList?: Seat[], isIgnoreGaps?: boolean, selectedCounterType?: number) {
        var Container = [];
        var seatCounter = 1;
        var seatCounterUnique = 1;
        //Tek ve çift sıralama için kullanılır. Sadece görüntüde vardır. Hesaplamalarda kullanılmaz. Yani Maskeleme yapmaktadır.
        var seatDisplayNumber:number = selectedCounterType != 0 ? selectedCounterType : 1;

        seatStartNumber != 1 ? seatDisplayNumber = seatStartNumber : null;
        for (var r = 0; r < rowCount; r++) {
            var SeatList: Seat[] = [];
            for (var c = 0; c < columnCount; c++) {

                //Eklenecek koltuğun eski durumu var mı diye bakılır? Varsa var olan güncel hali alınır.
                var currentSeat = currentList != null && currentList != undefined ?
                    //currentList.filter(se => se.ID == seatCounterUnique) : null;
                    currentList[seatCounterUnique - 1] : null;

                //
                var st = new Seat(
                    //(currentSeat != null && currentSeat[0].SeatClass == 4 && isIgnoreGaps) ? null : seatCounter,
                    seatCounter,
                    this.basePositionCordinate * r, this.basePositionCordinate * c,
                    currentSeat != null ? currentSeat.SeatClass : 1, seatCounterUnique, r + 1, c + 1, seatDisplayNumber);
                SeatList.push(st);
                seatCounterUnique++;
                if (st.SeatClass == 4 && isIgnoreGaps) {

                }
                else {
                    seatCounter++;                    
                    seatDisplayNumber = Number(seatDisplayNumber) + Number(selectedCounterType != 0 ? 2 : 1);
                }
            }
            seatCounter = 1;
            seatDisplayNumber = selectedCounterType != 0 ? selectedCounterType : 1;
            seatStartNumber != 1 ? seatDisplayNumber = seatStartNumber : null;//Başlangıç değeri verildi ise bu değere göre yeni dizim oluşturulur.
            Container.push(SeatList);
        }
        return Container;
    }
    OrderedSortRightToLeft(rowCount: number, columnCount: number, seatStartNumber: number, currentList?: Seat[], isIgnoreGaps?: boolean, selectedCounterType?: number) {
        var Container = [];
        var seatCounter = 1;
        var seatCounterUnique = 1;
        //Tek ve çift sıralama için kullanılır. Sadece görüntüde vardır. Hesaplamalarda kullanılmaz. Yani Maskeleme yapmaktadır.
        var seatDisplayNumber:number = selectedCounterType != 0 ? selectedCounterType : 1;
        seatStartNumber != 1 ? seatDisplayNumber = seatStartNumber : null;
        for (var r = 0; r < rowCount; r++) {
            var SeatList: Seat[] = [];
            for (var c = 0; c < columnCount; c++) {

                //Eklenecek koltuğun eski durumu var mı diye bakılır? Varsa var olan güncel hali alınır.
                var currentSeat = currentList != null && currentList != undefined ?
                    //currentList.filter(se => se.ID == seatCounterUnique) : null; 
                    //currentList[columnCount * (r + 1) - (columnCount - (c + 1)) - 1] : null;
                    currentList[columnCount * (r + 1) - c - 1] : null;

                //
                var st = new Seat(
                    //(currentSeat != null && currentSeat[0].SeatClass == 4 && isIgnoreGaps) ? null : seatCounter,
                    seatCounter,
                    this.basePositionCordinate * r, this.basePositionCordinate * (columnCount - c - 1),
                    currentSeat != null ? currentSeat.SeatClass : 1, seatCounterUnique, r + 1, c + 1, seatDisplayNumber);
                SeatList.push(st);
                seatCounterUnique++;
                if (st.SeatClass == 4 && isIgnoreGaps) {

                }
                else {
                    seatCounter++;                    
                    seatDisplayNumber = Number(seatDisplayNumber) + Number(selectedCounterType != 0 ? 2 : 1);                  
                }
            }
            Container.push(SeatList.reverse());
            seatCounter = 1;
            seatDisplayNumber = selectedCounterType != 0 ? selectedCounterType : 1;
            seatStartNumber != 1 ? seatDisplayNumber = seatStartNumber : null;//Başlangıç değeri verildi ise bu değere göre yeni dizim oluşturulur.
            //Container.push(SeatList);
        }
        return Container;
    }
    AddRowOrderedSortLeftToRight(rowCount: number, columnCount: number, seatStartNumber: number, currentList?: Seat[], isIgnoreGaps?: boolean, selectedCounterType?: number, inputRowCount?: number) {
        var Container = [];
        var seatCounter = 1;
        var seatCounterUnique = 1;
        //Tek ve çift sıralama için kullanılır. Sadece görüntüde vardır. Hesaplamalarda kullanılmaz. Yani Maskeleme yapmaktadır.
        var seatDisplayNumber:number = selectedCounterType != 0 ? selectedCounterType : 1;
        seatStartNumber != 1 ? seatDisplayNumber = seatStartNumber : null;
        for (var r = 0; r < rowCount; r++) {
            var SeatList: Seat[] = [];
            for (var c = 0; c < columnCount; c++) {

                //Eklenecek koltuğun eski durumu var mı diye bakılır? Varsa var olan güncel hali alınır.
                var currentSeat = currentList != null && currentList != undefined ?
                    //currentList.filter(se => se.ID == seatCounterUnique) : null;
                    currentList[seatCounterUnique - 1] : null;

                //     
                //Yeni eklenen satır'a ait seatlerin hepsi iptal durumundadır. currentSeat'i null yani önceki değeri olmayan yeni eklenen seatler Açık yani 1'dir.Önceden eklenen seatler currentSeat ile bakılıp, önceki değeri alınır.           
                var st = new Seat(
                    //(currentSeat != null && currentSeat[0].SeatClass == 4 && isIgnoreGaps) ? null : seatCounter,
                    seatCounter,
                    this.basePositionCordinate * r, this.basePositionCordinate * c,
                    currentSeat != null ? currentSeat.SeatClass : (r == rowCount - 1 ? 4 : 1), seatCounterUnique, r + 1, c + 1, seatDisplayNumber, (r > inputRowCount - 1) ? true : false);
                SeatList.push(st);
                seatCounterUnique++;
                if (st.SeatClass == 4 && isIgnoreGaps) {

                }
                else {
                    seatCounter++;                    
                    seatDisplayNumber = Number(seatDisplayNumber) + Number(selectedCounterType != 0 ? 2 : 1);
                }
            }
            seatCounter = 1;
            seatDisplayNumber = selectedCounterType != 0 ? selectedCounterType : 1;
            seatStartNumber != 1 ? seatDisplayNumber = seatStartNumber : null;//Başlangıç değeri verildi ise bu değere göre yeni dizim oluşturulur.            
            Container.push(SeatList);
        }
        return Container;
    }
    AddRowOrderedSortRightToLeft(rowCount: number, columnCount: number, seatStartNumber: number, currentList?: Seat[], isIgnoreGaps?: boolean, selectedCounterType?: number, inputRowCount?: number) {
        var Container = [];
        var seatCounter = 1;
        var seatCounterUnique = 1;
        //Tek ve çift sıralama için kullanılır. Sadece görüntüde vardır. Hesaplamalarda kullanılmaz. Yani Maskeleme yapmaktadır.
        var seatDisplayNumber:number = selectedCounterType != 0 ? selectedCounterType : 1;
        seatStartNumber != 1 ? seatDisplayNumber = seatStartNumber : null;
        for (var r = 0; r < rowCount; r++) {
            var SeatList: Seat[] = [];
            for (var c = 0; c < columnCount; c++) {

                //Eklenecek koltuğun eski durumu var mı diye bakılır? Varsa var olan güncel hali alınır.
                var currentSeat = currentList != null && currentList != undefined ?
                    currentList[columnCount * (r + 1) - c - 1] : null;

                //Yeni eklenen satır'a ait seatlerin hepsi iptal durumundadır. currentSeat'i null yani önceki değeri olmayan yeni eklenen seatler Açık yani 1'dir.Önceden eklenen seatler currentSeat ile bakılıp, önceki değeri alınır.           
                var st = new Seat(
                    seatCounter,
                    this.basePositionCordinate * r, this.basePositionCordinate * (columnCount - c - 1),
                    currentSeat != null ? currentSeat.SeatClass : (r == rowCount - 1 ? 4 : 1), seatCounterUnique, r + 1, c + 1, seatDisplayNumber, (r > inputRowCount - 1) ? true : false);
                SeatList.push(st);
                seatCounterUnique++;
                if (st.SeatClass == 4 && isIgnoreGaps) {

                }
                else {
                    seatCounter++;                    
                    seatDisplayNumber = Number(seatDisplayNumber) + Number(selectedCounterType != 0 ? 2 : 1);
                }
            }
            Container.push(SeatList.reverse());// Ters yöne sıralama için yapılır.
            seatCounter = 1;
            seatDisplayNumber = selectedCounterType != 0 ? selectedCounterType : 1;
            seatStartNumber != 1 ? seatDisplayNumber = seatStartNumber : null;//Başlangıç değeri verildi ise bu değere göre yeni dizim oluşturulur.
            //Container.push(SeatList);
        }
        return Container;
    }
    AddColumnOrderedSortLeftToRight(rowCount: number, columnCount: number, seatStartNumber: number, currentList?: Seat[], isIgnoreGaps?: boolean, selectedCounterType?: number, inputColumnCount?: number) {
        var Container = [];
        var seatCounter = 1;
        var seatCounterUnique = 1;
        //Tek ve çift sıralama için kullanılır. Sadece görüntüde vardır. Hesaplamalarda kullanılmaz. Yani Maskeleme yapmaktadır.
        var seatDisplayNumber:number = selectedCounterType != 0 ? selectedCounterType : 1;
        seatStartNumber != 1 ? seatDisplayNumber = seatStartNumber : null;
        //var newAddSeatCount: number = 0;//Yeni eklenen koltuk artımı
        for (var r = 0; r < rowCount; r++) {
            var SeatList: Seat[] = [];
            for (var c = 0; c < columnCount; c++) {
                var currentSeat;
                //Eklenecek koltuğun eski durumu var mı diye bakılır? Varsa var olan güncel hali alınır.
                //[Son kolon'a gelinmiş ise tüm seatsayısı + C şeklinde koltuk aranır.](c > inputColumnCount - 1) Amaç: Yeni eklenen kolon mu diye sorgulamak.
                if (c > inputColumnCount - 1) {
                    //Yeni eklnen koltuk ID için tüm koltuk sayısı + yeni eklenen koltuk sayısı
                    //newAddSeatCount += 1;
                    //var id = (Number(rowCount) * Number(inputColumnCount)) + newAddSeatCount;
                    //Yeni id değeri yeni eklenen koltuk için önceki eklenen koltukların toplamı + herbir SATIRA göre +1 artan bir değerdir. 
                    //3*3 lük bir blokda aynı satırda olan 4. kolon ID=10 iken 5. kolon ID=13 dür. 
                    var id = (Number(rowCount) * Number(inputColumnCount)) + (rowCount * (c - inputColumnCount)) + (r + 1);
                    // Gelen dizi içerisinde ilgili Seat'in olup olmadığı burda [] dizi ile bulunamıyor. Çünkü düzgün bir sıralı giiş yok. Bunun için mecburen ID'ye göre filter işlemine gidilmiştir.
                    currentSeat = currentList != null && currentList != undefined ?
                        currentList.filter(cur => cur.ID == id)[0] : null;
                }
                else {
                    //İlk sıralama durumunda dizilen kolonlar. Yeni eklenen koltuk işlemleri burada yok.
                    currentSeat = currentList != null && currentList != undefined ?
                        currentList.filter(se => se.ID == seatCounterUnique)[0] : null;
                    //currentList[seatCounterUnique - 1] : null;
                }
                // LeftToRight'a göre değişen tek şey Top,Left position'dır.              
                var st = new Seat(
                    //(currentSeat != null && currentSeat[0].SeatClass == 4 && isIgnoreGaps) ? null : seatCounter,
                    seatCounter,
                    this.basePositionCordinate * r, this.basePositionCordinate * c,
                    currentSeat != null ? currentSeat.SeatClass : (c == columnCount - 1 ? 4 : 1),
                    //(c > inputColumnCount - 1) ? (Number(rowCount) * Number(inputColumnCount)) + newAddSeatCount : seatCounterUnique, r + 1, c + 1, seatDisplayNumber);
                    (c > inputColumnCount - 1) ? (Number(rowCount) * Number(inputColumnCount)) + (rowCount * (c - inputColumnCount)) + (r + 1) : seatCounterUnique, r + 1, c + 1, seatDisplayNumber, (c > inputColumnCount - 1) ? true : false);
                SeatList.push(st);
                c > inputColumnCount - 1 ? seatCounterUnique : seatCounterUnique++; //Eğer Yeni eklenen kolon ise counter artmaz. Çünkü yeni eklenen koltukların ID'si farklı bir algoritma ile bulunuyor."seatCounterUnique" kullanılmıyor.
                if (st.SeatClass == 4 && isIgnoreGaps) {

                }
                else {
                    seatCounter++;                    
                    seatDisplayNumber = Number(seatDisplayNumber) + Number(selectedCounterType != 0 ? 2 : 1);
                }
            }
            seatCounter = 1;
            seatDisplayNumber = selectedCounterType != 0 ? selectedCounterType : 1;
            seatStartNumber != 1 ? seatDisplayNumber = seatStartNumber : null;//Başlangıç değeri verildi ise bu değere göre yeni dizim oluşturulur.
            Container.push(SeatList);
        }
        return Container;
    }
    AddColumnOrderedSortRightToLeft(rowCount: number, columnCount: number, seatStartNumber: number, currentList?: Seat[], isIgnoreGaps?: boolean, selectedCounterType?: number, inputColumnCount?: number) {
        var Container = [];
        var seatCounter = 1;
        var seatCounterUnique = 1;
        //Tek ve çift sıralama için kullanılır. Sadece görüntüde vardır. Hesaplamalarda kullanılmaz. Yani Maskeleme yapmaktadır.
        var seatDisplayNumber:number = selectedCounterType != 0 ? selectedCounterType : 1;
        seatStartNumber != 1 ? seatDisplayNumber = seatStartNumber : null;
        //var newAddSeatCount: number = 0;//Yeni eklenen koltuk artımı
        for (var r = 0; r < rowCount; r++) {
            var SeatList: Seat[] = [];
            for (var c = 0; c < columnCount; c++) {
                var currentSeat;
                //Eklenecek koltuğun eski durumu var mı diye bakılır? Varsa var olan güncel hali alınır.
                //[Son kolon'a gelinmiş ise tüm seatsayısı + C şeklinde koltuk aranır.](c > inputColumnCount - 1) Amaç: Yeni eklenen kolon mu diye sorgulamak.
                if (c > inputColumnCount - 1) {
                    //Yeni eklnen koltuk ID için tüm koltuk sayısı + yeni eklenen koltuk sayısı
                    //newAddSeatCount += 1;
                    //var id = (Number(rowCount) * Number(inputColumnCount)) + newAddSeatCount;
                    //Yeni id değeri yeni eklenen koltuk için önceki eklenen koltukların toplamı + herbir SATIRA göre +1 artan bir değerdir. 
                    //3*3 lük bir blokda aynı satırda olan 4. kolon ID=10 iken 5. kolon ID=13 dür.
                    var id = (Number(rowCount) * Number(inputColumnCount)) + (rowCount * (c - inputColumnCount)) + (r + 1);
                    // Gelen dizi içerisinde ilgili Seat'in olup olmadığı burda [] dizi ile bulunamıyor. Çünkü düzgün bir sıralı giiş yok. Bunun için mecburen ID'ye göre filter işlemine gidilmiştir.
                    currentSeat = currentList != null && currentList != undefined ?
                        currentList.filter(cur => cur.ID == id)[0] : null;
                }
                else {
                    //İlk sıralama durumunda dizilen kolonlar. Yeni eklenen koltuk işlemleri burada yok.
                    currentSeat = currentList != null && currentList != undefined ?
                        currentList.filter(se => se.ID == seatCounterUnique)[0] : null;
                    //currentList[seatCounterUnique - 1] : null;
                }
                // LeftToRight'a göre değişen tek şey Top,Left position'dır.                
                var st = new Seat(
                    //(currentSeat != null && currentSeat[0].SeatClass == 4 && isIgnoreGaps) ? null : seatCounter,
                    seatCounter,
                    this.basePositionCordinate * r, this.basePositionCordinate * (columnCount - c - 1),
                    currentSeat != null ? currentSeat.SeatClass : (c == columnCount - 1 ? 4 : 1),
                    //(c > inputColumnCount - 1) ? (Number(rowCount) * Number(inputColumnCount)) + newAddSeatCount : seatCounterUnique, r + 1, c + 1, seatDisplayNumber);
                    (c > inputColumnCount - 1) ? (Number(rowCount) * Number(inputColumnCount)) + (rowCount * (c - inputColumnCount)) + (r + 1) : seatCounterUnique, r + 1, c + 1, seatDisplayNumber, (c > inputColumnCount - 1) ? true : (c > inputColumnCount - 1) ? true : false);
                SeatList.push(st);
                c > inputColumnCount - 1 ? seatCounterUnique : seatCounterUnique++; // Eğer Yeni eklenen kolon ise counter artmaz. Çünkü yeni eklenen koltukların ID'si farklı bir algoritma ile bulunuyor."seatCounterUnique" kullanılmıyor.
                if (st.SeatClass == 4 && isIgnoreGaps) {

                }
                else {
                    seatCounter++;                    
                    seatDisplayNumber = Number(seatDisplayNumber) + Number(selectedCounterType != 0 ? 2 : 1);
                }
            }
            seatCounter = 1;
            seatDisplayNumber = selectedCounterType != 0 ? selectedCounterType : 1;
            seatStartNumber != 1 ? seatDisplayNumber = seatStartNumber : null;//Başlangıç değeri verildi ise bu değere göre yeni dizim oluşturulur.
            Container.push(SeatList.reverse());
        }
        return Container;
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
        },
        {
            id: 9, name: "Sıralı Soldan Sağ"
        },
        {
            id: 10, name: "Sıralı Sağdan Sola"
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
        {
            id: 4, name: "İptal"
        }
    ];
    SeatCss = [
        {
            id: 1, name: "green"
        },
        {
            id: 2, name: "blue"
        },
        {
            id: 3, name: "red"
        },
        {
            id: 4, name: "grey"
        }
    ];
}