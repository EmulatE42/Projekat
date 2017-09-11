import {Component, OnInit, ViewChild} from "@angular/core";
import {CalendarComponent} from "ap-angular2-fullcalendar";
import {Router} from "@angular/router";
import {SchedulerWorkService} from "../../../../services/scheduler_work/SchedulerWorkService";
import {SchedulerWork, Cook, EventScheduler, NewUser, Bartender} from "../../../../models";
import {UserService} from "../../../../services/user/UserService";


@Component({
  selector: 'my-component',
  templateUrl: './scheduleWorkView.component.html',
  styleUrls: ['./scheduleWorkView.component.css'],
  providers: [SchedulerWorkService]
})
export class ScheduleWorkBartender implements OnInit{
  @ViewChild('calendar') myCalendar: CalendarComponent;

  errorMessage: string;
  schedulerWork: SchedulerWork;
  user: Bartender;
  newUser: NewUser;
  events: EventScheduler[];

  constructor(private schedulerWorkService: SchedulerWorkService, private userService: UserService, private router: Router)
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

    this.userService.getRestaurant(this.user.id).subscribe(
      user => this.newUser = user,
      error =>  this.errorMessage = <any>error,
      () => this.com()
    );
  }

  com(): void{

    var startTime = this.newUser.startTime + ":00";
    var endTime = this.newUser.endTime + ":00";


    this.events.push({id:0,title:"Work",start:startTime, end:endTime, day:1});

    this.calendarOptions.events = this.events;
    this.myCalendar.fullCalendar('renderEvents', this.events, true);
    this.myCalendar.fullCalendar('refresh');


  }

  changeCalendarView(view) {
    this.myCalendar.fullCalendar('changeView', view);
  }

}

