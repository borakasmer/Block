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
  selectedSortType: number = 9;
  selectedSeatType: number = 3;
  isIgnoreGaps: boolean = true;
  selectedCounterType: number = 0;
  isAddRow: boolean = false;
  isAddColumn: boolean = false;
  SortType;
  SeatType;
  seatStartNumber:number=1;
  constructor(private sortService: SortService) {
    this.SortType = sortService.SortType.sort(function (a, b) {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    this.SeatType = sortService.SeatType;
  }

  DrawSeats(currentList?: Array<Seat>, isIgnoreGaps?: boolean) {
    this.isAddRow = false;
    this.isAddColumn = false;
    switch (this.SortType.filter(f => f.id == this.selectedSortType)[0].name) {
      case "Soldan Sağ":
        {
          this.Container = this.sortService.SortLeftToRight(this.rowCount, this.columnCount,this.seatStartNumber, currentList, isIgnoreGaps, this.selectedCounterType);
          break;
        }
      case "ZigZag Soldan Sağ":
        {
          this.Container = this.sortService.SortSnakeLeftToRight(this.rowCount, this.columnCount,this.seatStartNumber, currentList, isIgnoreGaps, this.selectedCounterType);
          break;
        }
      case "ZigZag Sağdan Sola":
        {
          this.Container = this.sortService.SortSnakeRightToLeft(this.rowCount, this.columnCount,this.seatStartNumber, currentList, isIgnoreGaps, this.selectedCounterType);
          break;
        }
      case "ZigZag Soldan Sağ Aşağıdan Başla":
        {
          this.Container = this.sortService.SortSnakeLeftToRightFromDown(this.rowCount, this.columnCount,this.seatStartNumber, currentList, isIgnoreGaps, this.selectedCounterType);
          break;
        }
      case "Sağdan Sola":
        {
          this.Container = this.sortService.SortRightToLeft(this.rowCount, this.columnCount,this.seatStartNumber, currentList, isIgnoreGaps, this.selectedCounterType);
          break;
        }
      case "Soldan Sağ Aşağıdan Başla":
        {
          this.Container = this.sortService.SortLeftToRightFromDown(this.rowCount, this.columnCount,this.seatStartNumber, currentList, isIgnoreGaps, this.selectedCounterType);
          break;
        }
      case "Sağdan Sola Aşağıdan Başla":
        {
          this.Container = this.sortService.SortRightToLeftFromDown(this.rowCount, this.columnCount,this.seatStartNumber, currentList, isIgnoreGaps, this.selectedCounterType);
          //this.Container = this.sortService.SortRightToLeftFormDown(this.rowCount, this.columnCount);
          break;
        }
      case "ZigZag Sağdan Sola Aşağıdan Başla":
        {
          this.Container = this.sortService.SortSnakeRightToLeftFromDown(this.rowCount, this.columnCount,this.seatStartNumber, currentList, isIgnoreGaps, this.selectedCounterType);
          break;
        }
      case "Sıralı Soldan Sağ":
        {
          this.Container = this.sortService.OrderedSortLeftToRight(this.rowCount, this.columnCount,this.seatStartNumber, currentList, isIgnoreGaps, this.selectedCounterType);
          break;
        }
      case "Sıralı Sağdan Sola":
        {
          this.Container = this.sortService.OrderedSortRightToLeft(this.rowCount, this.columnCount,this.seatStartNumber, currentList, isIgnoreGaps, this.selectedCounterType);
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
            if (this.isIgnoreGaps) {
              isTriggerSort = true;
            }
            break;
          }
        }
      }
      else {
        if (seat.SeatClass == 4) { isTriggerSort = true; }
        if (seat.SeatClass != this.selectedSeatType) {
          seat.SeatCssClass = this.sortService.SeatCss.filter(fi => fi.id == this.selectedSeatType)[0].name;
          seat.SeatClass = this.selectedSeatType;
          if(seat.SeatClass==4){isTriggerSort = true;}
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

      //Eğer Sıralı dizilimlerde satır eklenmiş ise, belirlenen satır sayısı kadar değil Container'da olan satır sayısı kadar saydırılmalıdır.
      if (this.isAddRow) {
        this.AddRowOrderedSort(false);
      }
      else if (this.isAddColumn) {
        this.AddColumunOrderedSort(false);
      }
      else {
        this.DrawSeats(currentList, this.isIgnoreGaps);
      }
    }
  }
  //isAddNewRow: Yeni bir Row eklenmesi durumunda mı çağrıldı(Toplam satır sayısı +1 dönülür). Yok ise tek bir seat'ın tıklanması ile mi çağrıldı.(Toplam satır sayısı dönülür.)
  AddRowOrderedSort(isAddNewRow: boolean) {
    this.isAddRow = true; //Herhangi bir seat tıklanınca artık DrawSeats() yerine AddRowOrderedSort() methodu çağrılır.
    var currentList = [];
    for (var i = 0; i < this.Container.length; i++) {
      currentList = currentList.concat(this.Container[i]);
    }
    if (this.selectedSortType == 9) {
      if (!this.isAddColumn)
        this.Container = this.sortService.AddRowOrderedSortLeftToRight(Number(currentList.length / this.columnCount) + (isAddNewRow ? 1 : 0), this.columnCount,this.seatStartNumber, currentList, this.isIgnoreGaps, this.selectedCounterType,this.rowCount)
      else
        this.Container = this.sortService.AddRowOrderedSortLeftToRight(this.Container.length + (isAddNewRow ? 1 : 0), this.Container[0].length,this.seatStartNumber, currentList, this.isIgnoreGaps, this.selectedCounterType,this.rowCount)
    }
    else if (this.selectedSortType == 10) {
      //Önceden kolon eklenmemiş ise ilk sefer satır ekleniyor ise.
      if (!this.isAddColumn)
        this.Container = this.sortService.AddRowOrderedSortRightToLeft(Number(currentList.length / this.columnCount) + (isAddNewRow ? 1 : 0), this.columnCount,this.seatStartNumber, currentList, this.isIgnoreGaps, this.selectedCounterType,this.rowCount)
      //Önceden kolon eklenmiş ise buna satır ekleyebiliriz. "this.Container.length" yeni eklenmiş dahil toplam satır sayısıdır. "this.Container[0].length" yeni eklenmiş dahil toplam kolon sayısıdır.
      else
        this.Container = this.sortService.AddRowOrderedSortRightToLeft(this.Container.length + (isAddNewRow ? 1 : 0), this.Container[0].length,this.seatStartNumber, currentList, this.isIgnoreGaps, this.selectedCounterType,this.rowCount)
    }
  }

  AddColumunOrderedSort(isAddNewColumn: boolean) {
    this.isAddColumn = true; //Herhangi bir seat tıklanınca artık DrawSeats() yerine AddRowOrderedSort() methodu çağrılır.
    var currentList = [];
    for (var i = 0; i < this.Container.length; i++) {
      currentList = currentList.concat(this.Container[i]);
    }
    if (this.selectedSortType == 9) {
      //Önceden satır eklenmemiş ise ilk sefer kolon ekleniyor ise.
      if (!this.isAddRow)
        this.Container = this.sortService.AddColumnOrderedSortLeftToRight(this.rowCount, Number(currentList.length / this.rowCount) + (isAddNewColumn ? 1 : 0),this.seatStartNumber, currentList, this.isIgnoreGaps, this.selectedCounterType, this.columnCount)
      //Önceden satır eklenmiş ise buna kolon ekleyebiliriz. "this.Container.length" yeni eklenmiş dahil toplam satır sayısıdır. "this.Container[0].length" yeni eklenmiş dahil toplam kolon sayısıdır.
      else
        this.Container = this.sortService.AddColumnOrderedSortLeftToRight(this.Container.length, this.Container[0].length + (isAddNewColumn ? 1 : 0),this.seatStartNumber, currentList, this.isIgnoreGaps, this.selectedCounterType, this.Container[0].length)
    }
    else if (this.selectedSortType == 10) {
      if (!this.isAddRow)
        this.Container = this.sortService.AddColumnOrderedSortRightToLeft(this.rowCount, Number(currentList.length / this.rowCount) + (isAddNewColumn ? 1 : 0),this.seatStartNumber, currentList, this.isIgnoreGaps, this.selectedCounterType, this.columnCount)
      else
        this.Container = this.sortService.AddColumnOrderedSortRightToLeft(this.Container.length, this.Container[0].length + (isAddNewColumn ? 1 : 0),this.seatStartNumber, currentList, this.isIgnoreGaps, this.selectedCounterType, this.Container[0].length)
    }
  }
  Minus()
  {
    this.seatStartNumber>1?this.seatStartNumber--:this.seatStartNumber;
  }
  Plus(){
    this.seatStartNumber++;
  }
}