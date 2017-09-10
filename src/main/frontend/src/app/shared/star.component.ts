import { Component, OnChanges, Input,
         Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'ai-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges {
    @Input() rating: number;
  @Input() mvp: boolean;
  @Input() editable: number;
  @Input() restoran:boolean;
    starWidth: number;
    lista : boolean[] = [];
    @Output() promenaaa: EventEmitter<string> =
        new EventEmitter<string>();

    constructor()
    {

    }

    ngOnChanges(): void {
      if (this.restoran)
      {
        this.drugo();
        return;
      }
      if (!this.mvp)
      {
      if ( this.editable++ > 1)
      {
        return;
      }

        this.starWidth = 86;
     // alert("RATING JE " + this.rating);
      var x = Math.round(this.rating);
      this.rating =x;
     // alert("X JE " + x);
      for (var i = 0 ; i < x ;i++)
      {
        this.lista[i] = true;
      }
      if (x<5)
      {
        for (var i = x ; i < this.lista.length;i++)
        {
          this.lista[i] = false;
        }
      }
    }
    else {
        this.starWidth = 86;
        // alert("RATING JE " + this.rating);
        var x = Math.round(this.rating);
        this.rating =x;
        // alert("X JE " + x);
        for (var i = 0 ; i < x ;i++)
        {
          this.lista[i] = true;
        }
        if (x<5)
        {
          for (var i = x ; i < this.lista.length;i++)
          {
            this.lista[i] = false;
          }
        }
      }
    }

   /* onClick(): void {
        this.ratingClicked.emit(`The rating ${this.rating} was clicked!`);
        this.ngOnChanges();
    }*/


  private drugo() {
    this.starWidth = this.rating * 86 / 5;
  }
}
