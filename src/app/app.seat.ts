import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Seat } from '../Models/Seat';
import { Coordinate } from '../Models/Coordinate';

@Component({    
    selector: 'seat',
    templateUrl: 'app.seat.html'
})
export class SeatComponent implements OnInit {
    constructor() { }
    private _ContainerSeat=[];
    private event: MouseEvent;

    startSelect:boolean = false;
    startCoordinate:Coordinate;
    initialCoordinate:Coordinate;
    endCoordinate:Coordinate;

    private clientX = 0;
    private clientY = 0;

    @Input() 
    set ContainerSeat(container) {
        this._ContainerSeat = container;
    }
        
    @Output() clickSeat:EventEmitter<Seat>=new EventEmitter<Seat>();

    ngOnInit() { }

    TriggerEvent(seat)
    {
        this.clickSeat.emit(seat);
    }

    private onEvent(event: MouseEvent): void {
        this.event = event;
    }

    onMouseDown(event: MouseEvent): void {
        this.startSelect = true;
        this.event = event;
        this.startCoordinate = new Coordinate(event.clientX, event.clientY);
    }

    onCoordinates(event: MouseEvent):void {
        this.clientX = event.clientX;
        this.clientY = event.clientY;
    }  

    onMouseUp(event: MouseEvent):void {
        if(this.startSelect)
            this.endCoordinate = new Coordinate(event.clientX, event.clientY);
    }     
}