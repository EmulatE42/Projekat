import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from "@angular/core";
import { Router } from '@angular/router';
import * as firebase from 'firebase'
//import {$WebSocket} from 'angular2-websocket/angular2-websocket'
import {UserService} from "../../../../services/user/UserService";
import {Drink, Food, SchedulerWork, Waiter} from "../../../../models";
import {OrderService} from "../../../../services/order/OrderService";
import {forEach} from "@angular/router/src/utils/collection";
import {SchedulerWorkService} from "../../../../services/scheduler_work/SchedulerWorkService";



@Component({
  templateUrl: './scheduleTableView.component.html',
  styleUrls: ['./scheduleTableView.component.css'],
  providers: [UserService, SchedulerWorkService]
})

export class ScheduleTableView implements OnInit{

  user: Waiter;
  schedulerWork: SchedulerWork;
  errorMessage: string;




  constructor(private userService: UserService, private schedulerWorkService: SchedulerWorkService, private router: Router)
  {}

  @ViewChild('myCanvas') canvasRef: ElementRef;

  ngOnInit(): void {

      this.user = JSON.parse(sessionStorage.getItem("loginUser"));

      this.schedulerWorkService.getSchedulerWork(this.user.id).subscribe(
        schedulerWork => this.schedulerWork = schedulerWork,
        error =>  this.errorMessage = <any>error, () => this.com());


  }

  com(): void{
    let ctx = this.canvasRef.nativeElement.getContext('2d');

    var sPoint = 20;
    var ePoint = 20;
    var width = 100;
    var height = 100;
    var j = 1;
    for(var i = 1; i <= 9; i++)
    {
      ctx.beginPath();
      ctx.lineWidth = "6";
      ctx.font = "30px Arial";


      if( this.exist(i))
        ctx.fillStyle = 'blue';
      else
        ctx.fillStyle = 'gray';

      ctx.fillRect(sPoint, ePoint, width, height);
      ctx.fillStyle = 'black';
      ctx.fillText(i,sPoint+(width/2) - 10,ePoint+(height/2) + 10);
      ctx.stroke();


      sPoint = sPoint + width + 40;

      if(i % 3 == 0) {
        ePoint = ePoint + height + 40;
        sPoint = 20;
        j++;
      }
    }


  }

  exist(table: number) {

    for (var i = 0; i < this.schedulerWork.tables.length; i++) {

      if(table === this.schedulerWork.tables[i])
        return true;
    }
    return false;
  }

}
