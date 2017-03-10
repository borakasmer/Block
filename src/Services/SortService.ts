import { Injectable } from '@angular/core';
import { Seat } from '../Models/Seat';
import { ISortService } from './ISortService';

@Injectable()
export class SortService implements ISortService {
    basePositionCordinate: number = 30;
    constructor() { }

    ConvertNumberToRoman(num): any {
        if (!+num)
            return false;
        var digits = String(+num).split(""),
            key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
                "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
                "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
            roman = "",
            i = 3;
        while (i--)
            roman = (key[+digits.pop() + (i * 10)] || "") + roman;
        return Array(+digits.join("") + 1).join("M") + roman;
    }
    //currentList var ise dizilmiş olna koltukların eski halleri gönderilmiş demektir.
    //isIgnoreGaps: Koltuk iptal işileminde, sıralama anında iptal edilen koltuk sayılsın mı sayılmasın mı?
    SortLeftToRight(rowCount: number, columnCount: number, seatStartNumber: number, currentList?: Seat[], isIgnoreGaps?: boolean, selectedCounterType?: number) {
        var Container = [];
        var seatCounter = 1;
        var seatCounterUnique = 1;
        //Tek ve çift sıralama için kullanılır. Sadece görüntüde vardır. Hesaplamalarda kullanılmaz. Yani Maskeleme yapmaktadır.
        var seatDisplayNumber: number = selectedCounterType != 0 ? selectedCounterType : 1;
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
        var seatDisplayNumber: number = selectedCounterType != 0 ? selectedCounterType : 1;
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
        var seatDisplayNumber: number = selectedCounterType != 0 ? selectedCounterType : 1;
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
        var seatDisplayNumber: number = selectedCounterType != 0 ? selectedCounterType : 1;
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
        var seatDisplayNumber: number = selectedCounterType != 0 ? selectedCounterType : 1;

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
                        currentSeat != null ? currentSeat.SeatClass : 1, seatCounterUnique, r + 1, Number(columnCount) - Number(c), seatDisplayNumber);

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
        var seatDisplayNumber: number = selectedCounterType != 0 ? selectedCounterType : 1;
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
                        currentSeat != null ? currentSeat.SeatClass : 1, seatCounterUnique, r + 1, Number(columnCount) - Number(c), seatDisplayNumber);

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
        var seatDisplayNumber: number = selectedCounterType != 0 ? selectedCounterType : 1;
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
                        currentSeat != null ? currentSeat.SeatClass : 1, seatCounterUnique, r + 1, Number(columnCount) - Number(c), seatDisplayNumber);
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
        var seatDisplayNumber: number = selectedCounterType != 0 ? selectedCounterType : 1;
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
                        currentSeat != null ? currentSeat.SeatClass : 1, seatCounterUnique, r + 1, Number(columnCount) - Number(c), seatDisplayNumber);
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
                        currentSeat != null ? currentSeat.SeatClass : 1, seatCounterUnique, r + 1, Number(c + 1), seatDisplayNumber);

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
        //Tek ve çift sıralama için kullanılır. Sadece görüntüde vardır. Hesaplamalarda kullanılmaz. Yani Maskeleme yapmaktadır.
        var seatDisplayNumber: number = selectedCounterType != 0 ? selectedCounterType : 1;

        seatStartNumber != 1 ? seatDisplayNumber = seatStartNumber : null;
        for (var r = 0; r < rowCount; r++) {
            var SeatList: Seat[] = [];
            for (var c = 0; c < columnCount; c++) {

                var id = Number(String(Number(r) + 1) + String(Number(c) + 1));
                //Eklenecek koltuğun eski durumu var mı diye bakılır? Varsa var olan güncel hali alınır.
                var currentSeat = currentList != null && currentList != undefined ?
                    currentList.filter(cur => cur.ID == id)[0] : null;

                //
                var st = new Seat(
                    //(currentSeat != null && currentSeat[0].SeatClass == 4 && isIgnoreGaps) ? null : seatCounter,
                    seatCounter,
                    this.basePositionCordinate * r, this.basePositionCordinate * c,
                    currentSeat != null ? currentSeat.SeatClass : 1, id, r + 1, c + 1, seatDisplayNumber);
                SeatList.push(st);
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
        //Tek ve çift sıralama için kullanılır. Sadece görüntüde vardır. Hesaplamalarda kullanılmaz. Yani Maskeleme yapmaktadır.
        var seatDisplayNumber: number = selectedCounterType != 0 ? selectedCounterType : 1;
        seatStartNumber != 1 ? seatDisplayNumber = seatStartNumber : null;
        for (var r = 0; r < rowCount; r++) {
            var SeatList: Seat[] = [];
            for (var c = 0; c < columnCount; c++) {

                var id = Number(String(Number(r) + 1) + String(Number(c) + 1));
                //Eklenecek koltuğun eski durumu var mı diye bakılır? Varsa var olan güncel hali alınır.
                var currentSeat = currentList != null && currentList != undefined ?
                    currentList.filter(cur => cur.ID == id)[0] : null;

                //
                var st = new Seat(
                    //(currentSeat != null && currentSeat[0].SeatClass == 4 && isIgnoreGaps) ? null : seatCounter,
                    seatCounter,
                    this.basePositionCordinate * r, this.basePositionCordinate * (columnCount - c - 1),
                    currentSeat != null ? currentSeat.SeatClass : 1, id, r + 1, c + 1, seatDisplayNumber);
                SeatList.push(st);
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
    AddRowOrderedSortLeftToRight(rowCount: number, columnCount: number, seatStartNumber: number, currentList?: Seat[], isIgnoreGaps?: boolean, selectedCounterType?: number, inputRowCount?: number, inputColumnCount?: number) {
        var Container = [];
        var seatCounter = 1;

        //Tek ve çift sıralama için kullanılır. Sadece görüntüde vardır. Hesaplamalarda kullanılmaz. Yani Maskeleme yapmaktadır.
        var seatDisplayNumber: number = selectedCounterType != 0 ? selectedCounterType : 1;
        seatStartNumber != 1 ? seatDisplayNumber = seatStartNumber : null;
        for (var r = 0; r < rowCount; r++) {
            var SeatList: Seat[] = [];
            for (var c = 0; c < columnCount; c++) {

                var id = Number(String(Number(r) + 1) + String(Number(c) + 1));
                //Eklenecek koltuğun eski durumu var mı diye bakılır? Varsa var olan güncel hali alınır.
                var currentSeat = currentList != null && currentList != undefined ?
                    currentList.filter(cur => cur.ID == id)[0] : null;

                //     
                //Yeni eklenen satır'a ait seatlerin hepsi iptal durumundadır. currentSeat'i null yani önceki değeri olmayan yeni eklenen seatler Açık yani 1'dir.Önceden eklenen seatler currentSeat ile bakılıp, önceki değeri alınır.           
                var st = new Seat(
                    //(currentSeat != null && currentSeat[0].SeatClass == 4 && isIgnoreGaps) ? null : seatCounter,
                    seatCounter,
                    this.basePositionCordinate * r, this.basePositionCordinate * c,
                    currentSeat != null ? currentSeat.SeatClass : (r == rowCount - 1 ? 4 : 1), id, r + 1, c + 1, seatDisplayNumber, ((r > inputRowCount - 1) || (c > inputColumnCount - 1)) ? true : false);
                SeatList.push(st);

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
    AddRowOrderedSortRightToLeft(rowCount: number, columnCount: number, seatStartNumber: number, currentList?: Seat[], isIgnoreGaps?: boolean, selectedCounterType?: number, inputRowCount?: number, inputColumnCount?: number) {
        var Container = [];
        var seatCounter = 1;
        var seatCounterUnique = 1;
        //Tek ve çift sıralama için kullanılır. Sadece görüntüde vardır. Hesaplamalarda kullanılmaz. Yani Maskeleme yapmaktadır.
        var seatDisplayNumber: number = selectedCounterType != 0 ? selectedCounterType : 1;
        seatStartNumber != 1 ? seatDisplayNumber = seatStartNumber : null;
        for (var r = 0; r < rowCount; r++) {
            var SeatList: Seat[] = [];
            for (var c = 0; c < columnCount; c++) {

                var id = Number(String(Number(r) + 1) + String(Number(c) + 1));
                //Eklenecek koltuğun eski durumu var mı diye bakılır? Varsa var olan güncel hali alınır.
                var currentSeat = currentList != null && currentList != undefined ?
                    currentList.filter(cur => cur.ID == id)[0] : null;

                //Yeni eklenen satır'a ait seatlerin hepsi iptal durumundadır. currentSeat'i null yani önceki değeri olmayan yeni eklenen seatler Açık yani 1'dir.Önceden eklenen seatler currentSeat ile bakılıp, önceki değeri alınır.           
                var st = new Seat(
                    seatCounter,
                    this.basePositionCordinate * r, this.basePositionCordinate * (columnCount - c - 1),
                    currentSeat != null ? currentSeat.SeatClass : (r == rowCount - 1 ? 4 : 1), id, r + 1, c + 1, seatDisplayNumber, ((r > inputRowCount - 1) || (c > inputColumnCount - 1)) ? true : false);
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

    AddColumnOrderedSortLeftToRight(rowCount: number, columnCount: number, seatStartNumber: number, currentList?: Seat[], isIgnoreGaps?: boolean, selectedCounterType?: number, inputColumnCount?: number, inputRowCount?: number) {
        var Container = [];
        var seatCounter = 1;
        //Tek ve çift sıralama için kullanılır. Sadece görüntüde vardır. Hesaplamalarda kullanılmaz. Yani Maskeleme yapmaktadır.
        var seatDisplayNumber: number = selectedCounterType != 0 ? selectedCounterType : 1;
        seatStartNumber != 1 ? seatDisplayNumber = seatStartNumber : null;
        //var newAddSeatCount: number = 0;//Yeni eklenen koltuk artımı
        for (var r = 0; r < rowCount; r++) {
            var SeatList: Seat[] = [];
            for (var c = 0; c < columnCount; c++) {
                var currentSeat;

                var id = Number(String(Number(r) + 1) + String(Number(c) + 1));
                // Gelen dizi içerisinde ilgili Seat'in olup olmadığı burda [] dizi ile bulunamıyor. Çünkü düzgün bir sıralı giiş yok. Bunun için mecburen ID'ye göre filter işlemine gidilmiştir.
                currentSeat = currentList != null && currentList != undefined ?
                    currentList.filter(cur => cur.ID == id)[0] : null;

                // LeftToRight'a göre değişen tek şey Top,Left position'dır.              
                var st = new Seat(
                    //(currentSeat != null && currentSeat[0].SeatClass == 4 && isIgnoreGaps) ? null : seatCounter,
                    seatCounter,
                    this.basePositionCordinate * r, this.basePositionCordinate * c,
                    currentSeat != null ? currentSeat.SeatClass : (c == columnCount - 1 ? 4 : 1),
                    //(c > inputColumnCount - 1) ? (Number(rowCount) * Number(inputColumnCount)) + newAddSeatCount : seatCounterUnique, r + 1, c + 1, seatDisplayNumber);
                    id, r + 1, c + 1, seatDisplayNumber, ((r > inputRowCount - 1) || (c > inputColumnCount - 1)) ? true : false);
                SeatList.push(st);
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

    AddColumnOrderedSortRightToLeft(rowCount: number, columnCount: number, seatStartNumber: number, currentList?: Seat[], isIgnoreGaps?: boolean, selectedCounterType?: number, inputColumnCount?: number, inputRowCount?: number) {
        var Container = [];
        var seatCounter = 1;
        var seatCounterUnique = 1;
        //Tek ve çift sıralama için kullanılır. Sadece görüntüde vardır. Hesaplamalarda kullanılmaz. Yani Maskeleme yapmaktadır.
        var seatDisplayNumber: number = selectedCounterType != 0 ? selectedCounterType : 1;
        seatStartNumber != 1 ? seatDisplayNumber = seatStartNumber : null;
        //var newAddSeatCount: number = 0;//Yeni eklenen koltuk artımı
        for (var r = 0; r < rowCount; r++) {
            var SeatList: Seat[] = [];
            for (var c = 0; c < columnCount; c++) {
                var currentSeat;

                var id = Number(String(Number(r) + 1) + String(Number(c) + 1));
                // Gelen dizi içerisinde ilgili Seat'in olup olmadığı burda [] dizi ile bulunamıyor. Çünkü düzgün bir sıralı giiş yok. Bunun için mecburen ID'ye göre filter işlemine gidilmiştir.
                currentSeat = currentList != null && currentList != undefined ?
                    currentList.filter(cur => cur.ID == id)[0] : null;

                // LeftToRight'a göre değişen tek şey Top,Left position'dır.                
                var st = new Seat(
                    //(currentSeat != null && currentSeat[0].SeatClass == 4 && isIgnoreGaps) ? null : seatCounter,
                    seatCounter,
                    this.basePositionCordinate * r, this.basePositionCordinate * (columnCount - c - 1),
                    currentSeat != null ? currentSeat.SeatClass : (c == columnCount - 1 ? 4 : 1),
                    id, r + 1, c + 1, seatDisplayNumber, ((r > inputRowCount - 1) || (c > inputColumnCount - 1)) ? true : false);
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