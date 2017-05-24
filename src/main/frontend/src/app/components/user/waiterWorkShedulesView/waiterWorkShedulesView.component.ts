import {Component, ViewChild} from "@angular/core";
import {CalendarComponent} from "ap-angular2-fullcalendar";


@Component({
  selector: 'my-component',
  templateUrl: './waiterWorkShedulesView.component.html',
  styleUrls: ['./waiterWorkShedulesView.component.css'],
})
export class MyComponent{
  @ViewChild(CalendarComponent) myCalendar: CalendarComponent;

  changeCalendarView(view) {
    this.myCalendar.fullCalendar('changeView', view);
  }

  calendarOptions:Object = {
    //height: 'parent',
    fixedWeekCount : false,
    //defaultDate: '2016-09-12',
    defaultView: 'agendaWeek',
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    events: [
      {
        title: 'All Day Event',
        start: '2016-09-01'
      },
      {
        title: 'Long Event',
        start: '2016-09-07',
        end: '2016-09-10'
      },
      {
        id: 999,
        title: 'Repeating Event',
        start: '2016-09-09T16:00:00'
      },
      {
        id: 999,
        title: 'Repeating Event',
        start: '2016-09-16T16:00:00'
      },
      {
        title: 'Conference',
        start: '2016-09-11',
        end: '2016-09-13'
      },
      {
        title: 'Click for Google',
        url: 'http://google.com/',
        start: '2016-09-28'
      }
    ]
  };
}

