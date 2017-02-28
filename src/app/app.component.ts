import { Component } from '@angular/core';
import { Seat } from '../Models/Seat';
import { SeatStatus } from '../Models/SeatClassType';
import { SortService } from '../Services/SortService';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Koltuk sayısı giriniz';
  Container = [];
  columnCount: number;
  rowCount: number;
  selectedSortType: number = 1;
  selectedSeatType: number = 3;
  isIgnoreGaps: boolean = true;

  SortType;
  SeatType;
  constructor(private sortService: SortService) {
    this.SortType = sortService.SortType.sort(function (a, b) {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    this.SeatType = sortService.SeatType;
  }

  DrawSeats(currentList?: Array<Seat>, isIgnoreGaps?: boolean) {
    switch (this.SortType.filter(f => f.id == this.selectedSortType)[0].name) {
      case "Soldan Sağ":
        {
          this.Container = this.sortService.SortLeftToRight(this.rowCount, this.columnCount, currentList, isIgnoreGaps);
          break;
        }
      case "ZigZag Soldan Sağ":
        {
          this.Container = this.sortService.SortSnakeLeftToRight(this.rowCount, this.columnCount, currentList, isIgnoreGaps);
          break;
        }
      case "ZigZag Sağdan Sola":
        {
          this.Container = this.sortService.SortSnakeRightToLeft(this.rowCount, this.columnCount, currentList, isIgnoreGaps);
          break;
        }
      case "ZigZag Soldan Sağ Aşağıdan Başla":
        {
          this.Container = this.sortService.SortSnakeLeftToRightFromDown(this.rowCount, this.columnCount, currentList, isIgnoreGaps);
          break;
        }
      case "Sağdan Sola":
        {
          this.Container = this.sortService.SortRightToLeft(this.rowCount, this.columnCount, currentList, isIgnoreGaps);
          break;
        }
      case "Soldan Sağ Aşağıdan Başla":
        {
          this.Container = this.sortService.SortLeftToRightFromDown(this.rowCount, this.columnCount, currentList, isIgnoreGaps);
          break;
        }
      case "Sağdan Sola Aşağıdan Başla":
        {
          this.Container = this.sortService.SortRightToLeftFromDown(this.rowCount, this.columnCount, currentList, isIgnoreGaps);
          //this.Container = this.sortService.SortRightToLeftFormDown(this.rowCount, this.columnCount);
          break;
        }
      case "ZigZag Sağdan Sola Aşağıdan Başla":
        {
          this.Container = this.sortService.SortSnakeRightToLeftFromDown(this.rowCount, this.columnCount, currentList, isIgnoreGaps);
          break;
        }
    }
  }
  seatType = SeatStatus;

  BuySeat(seatList) {
    let isTriggerSort: boolean = false;
    let listOfSeats = [];
    if (seatList.length == undefined) {
      listOfSeats.push(seatList)
    }
    else {
      listOfSeats = seatList;
    }
    listOfSeats.forEach(seat => {
      if (seat.SeatClass == 1) {
        switch (this.selectedSeatType) {
          case 1: {
            seat.SeatCssClass = "green";
            seat.Src = "../assets/Images/green.png";
            seat.SeatClass = 1;
            break;
          }
          case 2: {
            seat.SeatCssClass = "blue";
            seat.Src = "../assets/Images/blue.png";
            seat.SeatClass = 2;
            break;
          }
          case 3: {
            seat.SeatCssClass = "red";
            seat.Src = "../assets/Images/red.png";
            seat.SeatClass = 3;
            break;
          }
          case 4: {
            seat.SeatCssClass = "grey";
            seat.Src = "../assets/Images/gray.png";
            seat.SeatClass = 4;
            isTriggerSort = true;
            break;
          }
        }
      }
      else {
        if (seat.SeatClass == 4) { isTriggerSort = true; }
        if (seat.SeatClass != this.selectedSeatType) {
          seat.SeatCssClass = this.sortService.SeatCss.filter(fi => fi.id == this.selectedSeatType)[0].name;
          seat.SeatClass = this.selectedSeatType;
        }
        else {
          seat.SeatCssClass = "green";
          seat.Src = "../assets/Images/green.png";
          seat.SeatClass = 1;
        }
      }
    })

    if (isTriggerSort) {
      //2li dizi içerisindeki tüm koltuklar(seat)ler tek bir diziye atanır.
      //Amaç: Servisde herbiri gezilerek eski durumları korunur.
      var currentList = [];
      for (var i = 0; i < this.Container.length; i++) {
        currentList = currentList.concat(this.Container[i]);
      }
      /*for (var i = 0; i < this.Container.length; i++) {
      this.Container[i].forEach(seatItem => {
      currentList.push(seatItem);
      });
      }*/
      //this.Container = this.sortService.SortLeftToRight(this.rowCount, this.columnCount, currentList, this.isIgnoreGaps);
      this.DrawSeats(currentList, this.isIgnoreGaps);
    }
  }
}