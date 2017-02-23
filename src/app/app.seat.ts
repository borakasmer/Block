import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Seat } from '../Models/Seat';
import { Coordinate } from '../Models/Coordinate';

@Component({
    selector: 'seat',
    templateUrl: 'app.seat.html',
    styleUrls: ['app.seat.css']
})

export class SeatComponent implements OnInit {
    constructor(private renderer: Renderer) { }

    private _ContainerSeat = [];
    private event: MouseEvent;
    private containerX: number = 0;
    private containerY: number = 0;
    private startSelect: string = 'none';
    public startCoordinate: Coordinate;
    public endCoordinate: Coordinate;

    @ViewChild('blockseatcontainer') private blockseatcontainerElement: ElementRef;
    @ViewChild('resizable') private resizableElement: ElementRef;
    private resizable: any;

    @Input() set ContainerSeat(container) { this._ContainerSeat = container; }
    @Output() clickSeat: EventEmitter<Seat> = new EventEmitter<Seat>();
    TriggerEvent(seat) {
        this.clickSeat.emit(seat);
    }

    ngOnInit() {
        this.resizable = this.resizableElement.nativeElement;
        this.containerX = this.blockseatcontainerElement.nativeElement.offsetLeft;
        this.containerY = this.blockseatcontainerElement.nativeElement.offsetTop;
    }

    onMouseEnter(event: MouseEvent): void {
        this.event = event;
    }

    onMouseDown(event: MouseEvent): void {
        this.startSelect = 'block';
        this.startCoordinate = new Coordinate(event.clientX, event.clientY);
        if(event.shiftKey)
        {
            this.renderer.setElementStyle(this.resizable, 'left', event.clientX + "px");
            this.renderer.setElementStyle(this.resizable, 'top', event.clientY + "px");
        }
    }

    onMouseMove(event: MouseEvent): void {
        if (this.startCoordinate) {
            if (event.buttons === 1 && event.shiftKey) {
                this.renderer.setElementStyle(this.resizable, 'display', 'block');
                if (event.clientX < this.startCoordinate.X) {
                    this.renderer.setElementStyle(this.resizable, 'width', this.startCoordinate.X - event.clientX + "px");
                    this.renderer.setElementStyle(this.resizable, 'height', this.startCoordinate.Y - event.clientY + "px");
                    this.renderer.setElementStyle(this.resizable, 'left', event.clientX + "px");
                    this.renderer.setElementStyle(this.resizable, 'top', event.clientY + "px");
                }
                else {
                    this.renderer.setElementStyle(this.resizable, 'width', event.clientX - this.startCoordinate.X + "px");
                    this.renderer.setElementStyle(this.resizable, 'height', event.clientY - this.startCoordinate.Y + "px");
                }
            }
            else if (event.buttons === 0) {
                this.renderer.setElementStyle(this.resizable, 'display', 'none');
            }
        }

    }

    onMouseUp(event: MouseEvent): void {
        this.endCoordinate = new Coordinate(event.clientX, event.clientY);
        if (this.startCoordinate && this.endCoordinate) {
            if (event.clientX < this.startCoordinate.X) {
                this.endCoordinate = this.startCoordinate;
                this.startCoordinate = new Coordinate(event.clientX, event.clientY);
            }
            else {
                this.endCoordinate = new Coordinate(event.clientX, event.clientY);
            }

            if(event.shiftKey)
                this._ContainerSeat.forEach(row => {
                    row.forEach(rowseat => {
                        if ((rowseat.Top + this.containerY + 50) > this.startCoordinate.Y
                            && (rowseat.Left + this.containerX + 25) > this.startCoordinate.X
                            && (rowseat.Top + this.containerY + 50) < this.endCoordinate.Y
                            && (rowseat.Left + this.containerX + 25) < this.endCoordinate.X) {
                            this.TriggerEvent(rowseat);
                        }
                });
            });
        }
    }

    onMouseLeave(event: MouseEvent): void {
        this.renderer.setElementStyle(this.resizable, 'display', 'none');
    }
}