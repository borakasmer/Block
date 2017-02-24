import { Injectable } from '@angular/core';
import { Seat } from '../Models/Seat';
import { ISortService } from './ISortService';

@Injectable()
export class SortService implements ISortService {
    basePositionCordinate: number = 50;
    constructor() { }

    //currentList var ise dizilmiş olna koltukların eski halleri gönderilmiş demektir.
    //isIgnoreGaps: Koltuk iptal işileminde, sıralama anında iptal edilen koltuk sayılsın mı sayılmasın mı?
    SortLeftToRight(rowCount: number, columnCount: number, currentList?: Seat[], isIgnoreGaps?: boolean) {
        var Container = [];
        var seatCounter = 1;
        var seatCounterUnique = 1;
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
                    currentSeat != null ? currentSeat.SeatClass : 1, seatCounterUnique);
                SeatList.push(st);
                seatCounterUnique++;
                if (st.SeatClass == 4 && isIgnoreGaps) {

                }
                else {
                    seatCounter++;
                }
            }
            Container.push(SeatList);
        }
        return Container;
    }
    SortLeftToRightFromDown(rowCount: number, columnCount: number, currentList?: Seat[], isIgnoreGaps?: boolean) {
        var Container = [];
        var seatCounter = 1;
        var seatCounterUnique = 1;

        for (var r = 0; r < rowCount; r++) {
            var SeatList: Seat[] = [];
            for (var c = 0; c < columnCount; c++) {

                //Eklenecek koltuğun eski durumu var mı diye bakılır? Varsa var olan güncel hali alınır.
                var currentSeat = currentList != null && currentList != undefined ?
                    //currentList.filter(se => se.ID == seatCounterUnique) : null;
                    currentList[(rowCount - r) * columnCount - (columnCount - c)] : null;

                //

                var st = new Seat(seatCounter, this.basePositionCordinate * (rowCount - 1 - r), this.basePositionCordinate * c,
                    currentSeat != null ? currentSeat.SeatClass : 1, seatCounterUnique);
                SeatList.push(st);
                seatCounterUnique++;
                if (st.SeatClass == 4 && isIgnoreGaps) {

                }
                else {
                    seatCounter++;
                }
            }
            Container.push(SeatList);
        }
        return Container.reverse();
        //return Container;
    }
    /*SortRightToLeft(rowCount: number, columnCount: number, currentList?: Seat[], isIgnoreGaps?: boolean) {
    var Container = [];
    var seatCounter = 1; //Seat'in ID alanına denk gelmektedir. 
    var activeCounter = 1; //Toplam Aktif Satır sayısı pasive olmaması durumunda bir sonraki satıra toplam satır sayısı olarak aktarılması için arttırılır.
    
    for (var r = 0; r < rowCount; r++) {
    var SeatList: Seat[] = [];
    var currentNo = activeCounter;//ilgili aynı sıradaki herbir colomun için aynı olan satırın, ilk elemanını sıra sayısı.
    var posCount = 0;
    
    //Bir sonraki satırda kaç eleman ekleneceği pasif olmayanlarını sayısı bulunarak belirlenir.
    var colCount = 0;
    if (currentList != null && currentList != undefined) {
    for (var c = columnCount; c > 0; c--) {
    if (currentList[Number(seatCounter) + Number(c) - 2].SeatClass != 4) {
    colCount++;
    }
    }
    }
    else {
    //Eğer gelen hiçbir geçerli liste yok ise o zaman colon sayısı kadar yani tam değer alınır.
    colCount = columnCount;
    }
    //Bir sonraki satırdaki toplam pozitif kayıt sayısı bulunmuştur.
    
    for (var c = columnCount; c > 0; c--) {
    //Eklenecek koltuğun eski durumu var mı diye bakılır? Varsa var olan güncel hali alınır.
    var currentSeat = currentList != null && currentList != undefined ?
    currentList.filter(se => se.ID == seatCounter) : null;
    
    var st = new Seat(Number(currentNo) + Number(colCount) - 1, this.basePositionCordinate * r, this.basePositionCordinate * posCount,
    currentSeat != null ? currentSeat[0].SeatClass : 1, seatCounter);
    SeatList.push(st);
    posCount++;
    seatCounter++;
    
    if (st.SeatClass == 4 && isIgnoreGaps) {
    //pasif durumda hiç bir işlem yapılmaz boş geçilir.
    }
    else {
    colCount--;//Aktıf olduğu için değer 1 azaltılır.
    activeCounter++ //Toplam Aktif Satır sayısı bir sonraki satıra aktarılır.
    }
    }
    Container.push(SeatList);
    }
    return Container;
    }*/
    SortRightToLeft(rowCount: number, columnCount: number, currentList?: Seat[], isIgnoreGaps?: boolean) {
        var Container = [];
        var seatCounter = 1;
        var seatCounterUnique = 1;
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
                    currentSeat != null ? currentSeat.SeatClass : 1, seatCounterUnique);
                SeatList.push(st);
                seatCounterUnique++;
                if (st.SeatClass == 4 && isIgnoreGaps) {

                }
                else {
                    seatCounter++;
                }
            }
            Container.push(SeatList.reverse());
            //Container.push(SeatList);
        }
        return Container;
    }
    /*SortRightToLeftFormDown(rowCount: number, columnCount: number) {
    var Container = [];
    var seatCounter = 1;
    for (var r = 0; r < rowCount; r++) {
    var SeatList: Seat[] = [];
    var currentNo = seatCounter;
    for (var c = columnCount; c > 0; c--) {
    var st = new Seat(Number(currentNo) + Number(c) - 1, this.basePositionCordinate * (rowCount - 1 - r), this.basePositionCordinate * (columnCount - c), 1, seatCounter);
    SeatList.push(st);
    seatCounter++;
    }
    Container.push(SeatList);
    }
    return Container.reverse();
    }*/
    SortRightToLeftFromDown(rowCount: number, columnCount: number, currentList?: Seat[], isIgnoreGaps?: boolean) {
        var Container = [];
        var seatCounter = 1;
        var seatCounterUnique = 1;
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
                    currentSeat != null ? currentSeat.SeatClass : 1, seatCounterUnique);
                SeatList.push(st);
                seatCounterUnique++;
                if (st.SeatClass == 4 && isIgnoreGaps) {

                }
                else {
                    seatCounter++;
                }
            }
            Container.push(SeatList.reverse());
        }
        return Container.reverse();
    }
    /*SortSnakeLeftToRight(rowCount: number, columnCount: number) {
    var isReversSort = false;
    var Container = [];
    var seatCounter = 1;
    for (var r = 0; r < rowCount; r++) {
    var SeatList: Seat[] = [];
    if (isReversSort == false) {
    for (var c = 0; c < columnCount; c++) {
    var st = new Seat(seatCounter, this.basePositionCordinate * r, this.basePositionCordinate * c, 1, seatCounter);
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
    
    var st = new Seat(Number(currentNo) + Number(c) - 1, this.basePositionCordinate * r, this.basePositionCordinate * (columnCount - c), 1, seatCounter);
    SeatList.push(st);
    seatCounter++;
    }
    isReversSort = false;
    }
    Container.push(SeatList);
    }
    return Container;
    }*/
    SortSnakeLeftToRight(rowCount: number, columnCount: number, currentList?: Seat[], isIgnoreGaps?: boolean) {
        var isReversSort = false;
        var Container = [];
        var seatCounter = 1;
        var seatCounterUnique = 1;

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
                        currentSeat != null ? currentSeat.SeatClass : 1, seatCounterUnique);
                    SeatList.push(st);
                    seatCounterUnique++;
                    if (st.SeatClass == 4 && isIgnoreGaps) {

                    }
                    else {
                        seatCounter++;
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
                        currentSeat != null ? currentSeat.SeatClass : 1, seatCounterUnique);

                    SeatList.push(st);
                    seatCounterUnique++;
                    if (st.SeatClass == 4 && isIgnoreGaps) {

                    }
                    else {
                        seatCounter++;
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
    /*SortSnakeLeftToRightFromDown(rowCount: number, columnCount: number) {
    var isReversSort = false;
    var Container = [];
    var seatCounter = 1;
    for (var r = 0; r < rowCount; r++) {
    var SeatList: Seat[] = [];
    if (isReversSort == false) {
    for (var c = 0; c < columnCount; c++) {
    var st = new Seat(seatCounter, this.basePositionCordinate * (rowCount - r - 1), this.basePositionCordinate * c, 1, seatCounter);
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
    
    var st = new Seat(Number(currentNo) + Number(c) - 1, this.basePositionCordinate * (rowCount - r - 1), this.basePositionCordinate * (columnCount - c), 1, seatCounter);
    SeatList.push(st);
    seatCounter++;
    }
    isReversSort = false;
    }
    Container.push(SeatList);
    }
    return Container.reverse();
    }*/
    SortSnakeLeftToRightFromDown(rowCount: number, columnCount: number, currentList?: Seat[], isIgnoreGaps?: boolean) {
        var isReversSort = false;
        var Container = [];
        var seatCounter = 1;
        var seatCounterUnique = 1;

        for (var r = 0; r < rowCount; r++) {
            var SeatList: Seat[] = [];
            if (isReversSort == false) {
                for (var c = 0; c < columnCount; c++) {

                    //Eklenecek koltuğun eski durumu var mı diye bakılır? Varsa var olan güncel hali alınır.
                    var currentSeat = currentList != null && currentList != undefined ?
                        //currentList.filter(se => se.ID == seatCounterUnique) : null;
                        currentList[(rowCount - r) * columnCount - (columnCount - c)] : null;                                                

                    var st = new Seat(seatCounter, this.basePositionCordinate * (rowCount - 1 - r), this.basePositionCordinate * c,
                        currentSeat != null ? currentSeat.SeatClass : 1, seatCounterUnique);
                    SeatList.push(st);
                    seatCounterUnique++;
                    if (st.SeatClass == 4 && isIgnoreGaps) {

                    }
                    else {
                        seatCounter++;
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
                        currentList[Number(rowCount)*Number(columnCount)-seatCounterUnique]:null;

                    var st = new Seat(seatCounter,
                        this.basePositionCordinate * (rowCount - 1 - r), this.basePositionCordinate * (columnCount - c - 1),
                        currentSeat != null ? currentSeat.SeatClass : 1, seatCounterUnique);

                    SeatList.push(st);
                    seatCounterUnique++;
                    if (st.SeatClass == 4 && isIgnoreGaps) {

                    }
                    else {
                        seatCounter++;
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
    /*SortSnakeRightToLeft(rowCount: number, columnCount: number) {
    var isReversSort = true;
    var Container = [];
    var seatCounter = 1;
    for (var r = 0; r < rowCount; r++) {
    var SeatList: Seat[] = [];
    if (isReversSort == false) {
    for (var c = 0; c < columnCount; c++) {
    var st = new Seat(seatCounter, this.basePositionCordinate * r, this.basePositionCordinate * c, 1, seatCounter);
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
    
    var st = new Seat(Number(currentNo) + Number(c) - 1, this.basePositionCordinate * r, this.basePositionCordinate * (columnCount - c), 1, seatCounter);
    SeatList.push(st);
    seatCounter++;
    }
    isReversSort = false;
    }
    Container.push(SeatList);
    }
    return Container;
    }*/
    SortSnakeRightToLeft(rowCount: number, columnCount: number, currentList?: Seat[], isIgnoreGaps?: boolean) {
        var isReversSort = true;
        var Container = [];
        var seatCounter = 1;
        var seatCounterUnique = 1;

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
                        currentSeat != null ? currentSeat.SeatClass : 1, seatCounterUnique);
                    SeatList.push(st);
                    seatCounterUnique++;
                    if (st.SeatClass == 4 && isIgnoreGaps) {

                    }
                    else {
                        seatCounter++;
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
                        currentSeat != null ? currentSeat.SeatClass : 1, seatCounterUnique);

                    SeatList.push(st);
                    seatCounterUnique++;
                    if (st.SeatClass == 4 && isIgnoreGaps) {

                    }
                    else {
                        seatCounter++;
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
    /* SortSnakeRightToLeftFromDown(rowCount: number, columnCount: number) {
    var isReversSort = true;
    var Container = [];
    var seatCounter = 1;
    for (var r = 0; r < rowCount; r++) {
    var SeatList: Seat[] = [];
    if (isReversSort == false) {
    for (var c = 0; c < columnCount; c++) {
    var st = new Seat(seatCounter, this.basePositionCordinate * (rowCount - r - 1), this.basePositionCordinate * c, 1, seatCounter);
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
    
    var st = new Seat(Number(currentNo) + Number(c) - 1, this.basePositionCordinate * (rowCount - r - 1), this.basePositionCordinate * (columnCount - c), 1, seatCounter);
    SeatList.push(st);
    seatCounter++;
    }
    isReversSort = false;
    }
    Container.push(SeatList);
    }
    return Container.reverse();
    }*/
    SortSnakeRightToLeftFromDown(rowCount: number, columnCount: number, currentList?: Seat[], isIgnoreGaps?: boolean) {
        var isReversSort = true;
        var Container = [];
        var seatCounter = 1;
        var seatCounterUnique = 1;

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
                        currentSeat != null ? currentSeat.SeatClass : 1, seatCounterUnique);
                    SeatList.push(st);
                    seatCounterUnique++;
                    if (st.SeatClass == 4 && isIgnoreGaps) {

                    }
                    else {
                        seatCounter++;
                    }
                }
                isReversSort = true;
            }
            else if (isReversSort == true) {
                var currentNo = seatCounter;
                for (var c = 0; c < columnCount; c++) {                         
                    //Eklenecek koltuğun eski durumu var mı diye bakılır? Varsa var olan güncel hali alınır.
                    var currentSeat = currentList != null && currentList != undefined ?                       
                        currentList[Number(rowCount)*Number(columnCount)-seatCounterUnique]:null;

                    var st = new Seat(seatCounter,
                        this.basePositionCordinate * (rowCount - 1 - r), this.basePositionCordinate * (columnCount - c - 1),
                        //currentSeat != null ? currentSeat[0].SeatClass : 1, seatCounterUnique);
                        currentSeat != null ? currentSeat.SeatClass : 1, seatCounterUnique);

                    SeatList.push(st);
                    seatCounterUnique++;
                    if (st.SeatClass == 4 && isIgnoreGaps) {

                    }
                    else {
                        seatCounter++;
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
        {
            id: 4, name: "İptal"
        }
    ];
}