import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Seat } from '../Models/Seat';
import { Coordinate } from '../Models/Coordinate';

@Component({    
    selector: 'seat',
    templateUrl: 'app.seat.html',
    styleUrls: ['app.seat.css']
})

export class SeatComponent implements OnInit 
{
    constructor(private renderer: Renderer) {}

    private _ContainerSeat=[];
    private event: MouseEvent;

    private clientX:number = 0;
    private clientY:number = 0;

    startSelect:string = 'none';
    startCoordinate:Coordinate;

    @ViewChild('resizable') private resizableElement: ElementRef; 
    private resizable: any;   

    @Input() set ContainerSeat(container) { this._ContainerSeat = container; }    
    @Output() clickSeat:EventEmitter<Seat>=new EventEmitter<Seat>();

    ngOnInit() { this.resizable = this.resizableElement.nativeElement; }
    TriggerEvent(seat) { this.clickSeat.emit(seat); }
    onMouseEnter(event: MouseEvent): void { this.event = event; }

    onMouseDown(event: MouseEvent): void 
    {
        this.startSelect = 'block';
        this.startCoordinate = new Coordinate(event.clientX, event.clientY);
        this.renderer.setElementStyle(this.resizable, 'left', event.clientX + "px");
        this.renderer.setElementStyle(this.resizable, 'top', event.clientY + "px");                
    }

    onMouseMove(event: MouseEvent):void 
    {
        if(this.startCoordinate)
        {
            if(event.buttons === 1)
            {
                this.renderer.setElementStyle(this.resizable, 'display','block');
                if(event.clientX < this.startCoordinate.X)
                {
                    this.renderer.setElementStyle(this.resizable, 'width', this.startCoordinate.X - event.clientX  + "px");
                    this.renderer.setElementStyle(this.resizable, 'height', this.startCoordinate.Y - event.clientY  + "px"); 
                    this.renderer.setElementStyle(this.resizable, 'left', event.clientX + "px");
                    this.renderer.setElementStyle(this.resizable, 'top', event.clientY + "px");                                
                }
                else
                {
                    this.renderer.setElementStyle(this.resizable, 'width', event.clientX - this.startCoordinate.X + "px");
                    this.renderer.setElementStyle(this.resizable, 'height', event.clientY - this.startCoordinate.Y + "px"); 
                }               
            }
            else if(event.buttons === 0)
            {
                this.renderer.setElementStyle(this.resizable, 'display','none');
            }           
        }
            
    }  

    onMouseLeave(event: MouseEvent):void {
        this.renderer.setElementStyle(this.resizable, 'display','none');
    }     
}