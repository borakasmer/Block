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

  DrawSeats() {
    switch (this.SortType.filter(f => f.id == this.selectedSortType)[0].name) {
      case "Soldan Sağ":
        {
          this.Container = this.sortService.SortLeftToRight(this.rowCount, this.columnCount);
          break;
        }
      case "ZigZag Soldan Sağ":
        {
          this.Container = this.sortService.SortSnakeLeftToRight(this.rowCount, this.columnCount);
          break;
        }
      case "ZigZag Sağdan Sola":
        {
          this.Container = this.sortService.SortSnakeRightToLeft(this.rowCount, this.columnCount);
          break;
        }
      case "ZigZag Soldan Sağ Aşağıdan Başla":
        {
          this.Container = this.sortService.SortSnakeLeftToRightFromDown(this.rowCount, this.columnCount);
          break;
        }
      case "Sağdan Sola":
        {
          this.Container = this.sortService.SortRightToLeft(this.rowCount, this.columnCount);
          break;
        }
      case "Soldan Sağ Aşağıdan Başla":
        {
          this.Container = this.sortService.SortLeftToRightFromDown(this.rowCount, this.columnCount);
          break;
        }
      case "Sağdan Sola Aşağıdan Başla":
        {
          this.Container = this.sortService.SortRightToLeftFormDown(this.rowCount, this.columnCount);
          break;
        }
      case "ZigZag Sağdan Sola Aşağıdan Başla":
        {
          this.Container = this.sortService.SortSnakeRightToLeftFromDown(this.rowCount, this.columnCount);
          break;
        }
    }    
  }
  seatType = SeatStatus;

  BuySeat(seat: Seat) {
    if (seat.SeatClass == 1) {
      switch (this.selectedSeatType) {
        case 1: {
          seat.Src = "../assets/Images/green.png";
          seat.SeatClass=1;
          break;
        }
        case 2: {
          seat.Src = "../assets/Images/blue.png";
          seat.SeatClass=2;
          break;
        }
        case 3: {
          seat.Src = "../assets/Images/red.png";
          seat.SeatClass=3;
          break;
        }
      }
    }
    else {
      seat.Src = "../assets/Images/green.png";
      seat.SeatClass=1;
    }
  }
}
