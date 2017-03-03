import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer, HostListener, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DOCUMENT } from '@angular/platform-browser';
import { Seat } from '../Models/Seat';
import { Coordinate } from '../Models/Coordinate';


@Component({
    selector: 'seat',
    templateUrl: 'app.seat.html',
    styleUrls: ['app.seat.css']
})

export class SeatComponent implements OnInit {
    constructor(private renderer: Renderer, @Inject(DOCUMENT) private document: Document) { }
    private _ContainerSeat = [];
    private event: MouseEvent;
    private containerX: number = 0;
    private containerY: number = 0;
    private scrollTop: number = 0;
    private scrollLeft: number = 0;
    private isOnContainer: boolean = true;
    public startCoordinate: Coordinate;
    public endCoordinate: Coordinate;
    public RowName = [];

    @ViewChild('blockseatcontainer') private blockseatcontainerElement: ElementRef;
    @ViewChild('resizable') private resizableElement: ElementRef;
    private resizable: any;

    @Input() set ContainerSeat(container) { this._ContainerSeat = container; }
    @Output() clickSeat: EventEmitter<Seat[]> = new EventEmitter<Seat[]>();
    /*TriggerEvent(selectedSeats) {
        this.clickSeat.emit(selectedSeats);
    }*/
    /*@Output() clickSeat: EventEmitter<Seat> = new EventEmitter<Seat>();*/

    @HostListener("window:scroll", [])
    onWindowScroll() {
        this.scrollTop = this.document.body.scrollTop;
        this.scrollLeft = this.document.body.scrollLeft;
    }

    TriggerEvent(seat) {
        this.clickSeat.emit(seat);
    }

    ngOnInit() {
        this.resizable = this.resizableElement.nativeElement;
        this.containerX = this.blockseatcontainerElement.nativeElement.offsetLeft;
        this.containerY = this.blockseatcontainerElement.nativeElement.offsetTop + 35;
    }

    private onResize(event) {
        this.containerX = this.blockseatcontainerElement.nativeElement.offsetLeft;
        this.containerY = this.blockseatcontainerElement.nativeElement.offsetTop;
    }

    private onMouseEnter(event: MouseEvent): void {
        this.event = event;
        this.isOnContainer = true;
    }

    private onMouseDown(event: MouseEvent): void {
        //let startX: number = (event.clientX - this.containerX) < 0 ?  -(event.clientX - this.containerX) + this.scrollLeft : event.clientX - this.containerX + this.scrollLeft;
        //let startY: number = (event.clientY - this.containerY) < 0 ?  -(event.clientY - this.containerY) + this.scrollTop : event.clientY - this.containerY + this.scrollTop;   

        let startX: number = (event.clientX - this.containerX) < 0 ? -(event.clientX - this.containerX) : event.clientX - this.containerX;
        let startY: number = (event.clientY - this.containerY) < 0 ? -(event.clientY - this.containerY) : event.clientY - this.containerY;

        if (this.isOnContainer) {
            if (event.shiftKey) {
                /*
                if(this.scrollTop == 0 && this.scrollLeft == 0)
                {
                    startX = (event.clientX - this.containerX) < 0 ?  (event.clientX - this.containerX) : event.clientX - this.containerX;
                    startY = (event.clientY - this.containerY) < 0 ?  (event.clientY - this.containerY) : event.clientY - this.containerY;
                }

                if(this.scrollTop > 0 && this.scrollLeft == 0)
                {
                    startX = (event.clientX - this.containerX) < 0 ?  -(event.clientX - this.containerX) : event.clientX - this.containerX;
                    startY = (event.clientY - this.containerY) < 0 ?  -(event.clientY - this.containerY) + this.scrollTop : event.clientY - this.containerY + this.scrollTop;
                }

                if(this.scrollTop == 0 && this.scrollLeft > 0)
                {
                    startX = (event.clientX - this.containerX) < 0 ?  -(event.clientX - this.containerX) + this.scrollLeft : event.clientX - this.containerX + this.scrollLeft;
                    startY = (event.clientY - this.containerY) < 0 ?  -(event.clientY - this.containerY) : event.clientY - this.containerY;
                }

                if(this.scrollTop > 0 && this.scrollLeft > 0)
                {
                    startX = (event.clientX - this.containerX) < 0 ?  -(event.clientX - this.containerX) + this.scrollLeft : event.clientX - this.containerX + this.scrollLeft;
                    startY = (event.clientY - this.containerY) < 0 ?  -(event.clientY - this.containerY) + this.scrollTop : event.clientY - this.containerY + this.scrollTop;
                }
                */

                if (this.scrollLeft > 0)
                    if (startX > this.scrollLeft) startX += this.scrollLeft; else startX = event.clientX - this.containerX + this.scrollLeft;

                if (this.scrollTop > 0)
                    if (startY > this.scrollTop) startY += this.scrollTop; else startY = event.clientY - this.containerY + this.scrollTop;

                if (this.document.body.scrollHeight > window.screen.height) startX += 10;

                //if (startX < 20) startX = 0; 

                this.startCoordinate = new Coordinate(startX, startY);
            }
        }
    }

    private onMouseMove(event: MouseEvent): void {
        let endX: number = (event.clientX - this.containerX) < 0 ? -(event.clientX - this.containerX) : event.clientX - this.containerX;
        let endY: number = (event.clientY - this.containerY) < 0 ? -(event.clientY - this.containerY) : event.clientY - this.containerY;

        if (this.isOnContainer) {
            if (this.startCoordinate) {
                if (event.buttons === 1 && event.shiftKey) {
                    //if (this.document.body.scrollHeight > 0) endX += 20;

                    /*
                        if(this.scrollTop == 0 && this.scrollLeft == 0)
                        {
                            endX = (event.clientX - this.containerX) < 0 ?  -(event.clientX - this.containerX) : event.clientX - this.containerX;
                            endY = (event.clientY - this.containerY) < 0 ?  -(event.clientY - this.containerY) : event.clientY - this.containerY;
                        }
    
                        if(this.scrollTop > 0 && this.scrollLeft == 0)
                        {
                            endX = (event.clientX - this.containerX) < 0 ?  -(event.clientX - this.containerX) : event.clientX - this.containerX;
                            endY = (event.clientY - this.containerY) < 0 ?  -(event.clientY - this.containerY) + this.scrollTop : event.clientY - this.containerY + this.scrollTop;
                        }
    
                        if(this.scrollTop == 0 && this.scrollLeft > 0)
                        {
                            endX = (event.clientX - this.containerX) < 0 ?  -(event.clientX - this.containerX) + this.scrollLeft : event.clientX - this.containerX + this.scrollLeft;
                            endY = (event.clientY - this.containerY) < 0 ?  -(event.clientY - this.containerY) : event.clientY - this.containerY;
                        }
    
                        if(this.scrollTop > 0 && this.scrollLeft > 0)
                        {
                            endX = (event.clientX - this.containerX) < 0 ?  -(event.clientX - this.containerX) + this.scrollLeft : event.clientX - this.containerX + this.scrollLeft;
                            endY = (event.clientY - this.containerY) < 0 ?  -(event.clientY - this.containerY) + this.scrollTop : event.clientY - this.containerY + this.scrollTop;
                        }
                    */
                    if (this.scrollLeft > 0)
                        if (endX > this.scrollLeft) endX += this.scrollLeft; else endX = event.clientX - this.containerX + this.scrollLeft;

                    if (this.scrollTop > 0)
                        if (endY > this.scrollTop) endY += this.scrollTop; else endY = event.clientY - this.containerY + this.scrollTop;

                    if (this.document.body.scrollHeight > window.screen.height) endX += 10;

                    this.endCoordinate = new Coordinate(endX, endY);

                    //From right down to left up
                    if (this.startCoordinate.X > this.endCoordinate.X && this.startCoordinate.Y > this.endCoordinate.Y) {
                        this.renderer.setElementStyle(this.resizable, 'left', this.endCoordinate.X + "px");
                        this.renderer.setElementStyle(this.resizable, 'top', this.endCoordinate.Y + "px");
                        this.renderer.setElementStyle(this.resizable, 'width', this.startCoordinate.X - this.endCoordinate.X + "px");
                        this.renderer.setElementStyle(this.resizable, 'height', this.startCoordinate.Y - this.endCoordinate.Y + "px");
                    }

                    //From right up to left down
                    else if (this.startCoordinate.X > this.endCoordinate.X && this.startCoordinate.Y < this.endCoordinate.Y) {
                        this.renderer.setElementStyle(this.resizable, 'left', this.endCoordinate.X + "px");
                        this.renderer.setElementStyle(this.resizable, 'top', this.startCoordinate.Y + "px");
                        this.renderer.setElementStyle(this.resizable, 'width', this.startCoordinate.X - this.endCoordinate.X + "px");
                        this.renderer.setElementStyle(this.resizable, 'height', this.endCoordinate.Y - this.startCoordinate.Y + "px");
                    }

                    //From left down to right up
                    else if (this.startCoordinate.X < this.endCoordinate.X && this.startCoordinate.Y > this.endCoordinate.Y) {
                        this.renderer.setElementStyle(this.resizable, 'left', this.startCoordinate.X + "px");
                        this.renderer.setElementStyle(this.resizable, 'top', this.endCoordinate.Y + "px");
                        this.renderer.setElementStyle(this.resizable, 'width', this.endCoordinate.X - this.startCoordinate.X + "px");
                        this.renderer.setElementStyle(this.resizable, 'height', this.startCoordinate.Y - this.endCoordinate.Y + "px");
                    }

                    //From left up to right down 
                    else {
                        this.renderer.setElementStyle(this.resizable, 'left', this.startCoordinate.X + "px");
                        this.renderer.setElementStyle(this.resizable, 'top', this.startCoordinate.Y + "px");
                        this.renderer.setElementStyle(this.resizable, 'width', this.endCoordinate.X - this.startCoordinate.X + "px");
                        this.renderer.setElementStyle(this.resizable, 'height', this.endCoordinate.Y - this.startCoordinate.Y + "px");
                    }
                }
                else {
                    this.SetResizableRectangleToDefault();
                }
            }
        }

    }

    private onMouseUp(event: MouseEvent): void {
        if (this.isOnContainer) {
            this.endCoordinate = new Coordinate(event.clientX, event.clientY);
            let selectedSeats = [];
            if (this.startCoordinate && this.endCoordinate) {
                this.startCoordinate = new Coordinate(this.resizableElement.nativeElement.offsetLeft, this.resizableElement.nativeElement.offsetTop);
                this.endCoordinate = new Coordinate(this.startCoordinate.X + this.resizableElement.nativeElement.offsetWidth, this.startCoordinate.Y + this.resizableElement.nativeElement.offsetHeight);
                if (event.shiftKey)
                    this._ContainerSeat.forEach(row => {
                        row.forEach(rowseat => {
                            if (rowseat.Top > this.startCoordinate.Y - 25 && rowseat.Left > this.startCoordinate.X - 25 &&
                                rowseat.Top < this.endCoordinate.Y - 10 && rowseat.Left < this.endCoordinate.X - 10) {
                                selectedSeats.push(rowseat);
                            }
                        });
                    });
                this.TriggerEvent(selectedSeats);
                this.SetResizableRectangleToDefault();
            }
        }
        this.startCoordinate = new Coordinate(0, 0);
    }

    private onMouseLeave(event: MouseEvent): void {
        this.isOnContainer = false;
        this.SetResizableRectangleToDefault();
    }

    private SetResizableRectangleToDefault(): void {
        this.endCoordinate = new Coordinate(0, 0);
        this.renderer.setElementStyle(this.resizable, 'top', "0px");
        this.renderer.setElementStyle(this.resizable, 'left', "0px");
        this.renderer.setElementStyle(this.resizable, 'width', "1px");
        this.renderer.setElementStyle(this.resizable, 'height', "1px");
    }

    public myForm: FormGroup; 
    private SaveBlockInformation(form: any): void {
              console.log(form);
    }
}