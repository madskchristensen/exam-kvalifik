import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '../../entities/Event';
//import { EventActions } from '../../store/actions/EventActions';
import { AppState, PostState } from '../../store/Store';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events!: Event[];
  eventClicked: EventEmitter<any> = new EventEmitter<any>();

  displayedColumns: string[] = ['title', 'startDate', 'endDate', 'location', 'status','edit'];
  constructor(private router: Router,  private ngRedux: NgRedux<AppState>) {}

  ngOnInit(): void {
    //this.eventActions.readEvents()
    //this.ngRedux.select(state => state.events).subscribe(res => {res?.events ? this.events = res.events : this.events = []})
  }

  editEvent(id: any) {
    this.eventClicked.emit(id);

    this.router.navigate(['edit-event', {myId: id}])
  }
}
