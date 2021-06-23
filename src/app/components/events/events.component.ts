import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '../../entities/Event';
import { EventActions } from '../../store/actions/EventActions';
import { AppState, PostState } from '../../store/Store';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events!: Event[];
  currentEvents!: Event[];
  pastEvents!: Event[];
  currentDate!: Date;
  eventClicked: EventEmitter<any> = new EventEmitter<any>();
  displayedColumns: string[] = ['title', 'startDate', 'endDate', 'location', 'status','edit'];

  constructor(private router: Router,  private ngRedux: NgRedux<AppState>, private eventActions: EventActions) {}

  ngOnInit(): void {
    this.eventActions.readEvents();
    this.ngRedux
      .select((state) => state.events)
      .subscribe((res) => {
        res?.events ? (this.events = res.events) : (this.events = []);
      });
      
  }
  ngAfterContentChecked(): void {
    // filter out past events and push them to past events array
    this.filterEvents(this.events)
  }

  filterEvents(events: Event[]) {
    this.currentDate = new Date();
    
    this.currentEvents = events.filter(event => new Date(event.endDate).getTime() >= this.currentDate.getTime() );   
    this.pastEvents = events.filter(event => new Date(event.endDate).getTime() < this.currentDate.getTime() );   
  }

  editEvent(id: any) {
    this.router.navigate(['edit-event', {myId: id}])
  }
}
