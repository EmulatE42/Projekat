import {Component, OnInit, ViewChild} from "@angular/core";
import {CalendarComponent} from "ap-angular2-fullcalendar";
import {EventScheduler, SchedulerWork, Waiter} from "../../../models";
import {SchedulerWorkService} from "../../../services/scheduler_work/SchedulerWorkService";
import {Router} from "@angular/router";


@Component({
  selector: 'my-component',
  templateUrl: './waiterWorkShedulesView.component.html',
  styleUrls: ['./waiterWorkShedulesView.component.css'],
  providers: [SchedulerWorkService]
})
export class MyComponent implements OnInit{
  @ViewChild('calendar') myCalendar: CalendarComponent;

  errorMessage: string;
  schedulerWork: SchedulerWork;
  user: Waiter;
  events: EventScheduler[];

  constructor(private schedulerWorkService: SchedulerWorkService, private router: Router)
  {}

  calendarOptions =
    {
      height: 'auto',
      contentHeight: 'auto',
      fixedWeekCount: false,
      editable: false,
      eventLimit: true,
      defaultView: 'agendaWeek',
      slotDuration: '01:00:00',
      firstDay: 1,
      header: {
        left: '',
        right: ''
      },

      columnFormat: 'dddd',
      defaultDate: '2017-05-03',
      events: [


      ]
    };

  ngOnInit(): void {
    this.events = new Array<EventScheduler>();
    this.user = JSON.parse(sessionStorage.getItem("loginUser"));

    this.schedulerWorkService.getSchedulerWork(this.user.id).subscribe(
      schedulerWork => this.schedulerWork = schedulerWork,
      error =>  this.errorMessage = <any>error, () => this.com());
  }

  com(): void{

    this.events.push({id:0,title:"Work",start:this.schedulerWork.start, end:this.schedulerWork.end, day:1});

    this.calendarOptions.events = this.events;
    this.myCalendar.fullCalendar('renderEvents', this.events, true);
    this.myCalendar.fullCalendar('refresh');


  }

  changeCalendarView(view) {
    this.myCalendar.fullCalendar('changeView', view);
  }

}

