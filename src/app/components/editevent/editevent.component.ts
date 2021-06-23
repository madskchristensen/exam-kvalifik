import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Event } from '../../entities/Event';
import { FormControl } from '@angular/forms';
import { EventActions } from 'src/app/store/actions/EventActions';
import { ActivatedRoute, Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { AppState } from 'src/app/store/Store';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editevent',
  templateUrl: './editevent.component.html',
  styleUrls: ['./editevent.component.scss']
})
export class EditeventComponent implements OnInit {
  public editEventFormGroup!: FormGroup;
  public eventToBeEdited!: Event;

  public minDate!: Date;

  // collections
  collections = new FormControl();

  // to be filled from collection db. Placeholder atm.
  collectionList: string[] = ['Semester start 2020', 'CBS Volunteers video series', 'Pride month 2020'];

  // groups
  groups = new FormControl();
  // to be filled from group/volunteer db. Placeholder atm.
  groupList: string[] = ['Board of directors', 'Events and social', 'Volunteer nr. 1'];

  // organisations
  organisations = new FormControl();
  // to be filled from organisations db. Placeholder atm.
  organisationList: string[] = ['CBS Diversity and Inclusion', 'CBS Icelandic Student Association', "CBS Finance Competition"];

  constructor(private fb: FormBuilder,  private router: Router, private toastr: ToastrService, private route: ActivatedRoute, private eventActions: EventActions,
    private ngRedux: NgRedux<AppState>) { }

  ngOnInit(): void {
    const id: string = this.route.snapshot.paramMap.get('myId') || "";

    this.minDate = new Date();

    if (id !== null) {
      this.ngRedux.select(state => state.events).subscribe(res => {
        if (res) {
          this.eventToBeEdited = res.events.find(event => event.id === id) || {} as Event;
        }
      });
    }
    // attach information to FormGroup
    this.editEventFormGroup = this.fb.group({
      title: [this.eventToBeEdited.title, Validators.required],
      startDate: [this.eventToBeEdited.startDate, Validators.required],
      startTime: [this.eventToBeEdited.startTime, Validators.required],
      endDate: [this.eventToBeEdited.endDate, Validators.required],
      endTime: [this.eventToBeEdited.endTime, Validators.required],
      description: [this.eventToBeEdited.description, Validators.required],
      pinned: [this.eventToBeEdited.pinned],
      location: [this.eventToBeEdited.location],
      schedule: [this.eventToBeEdited.schedule, Validators.required],

    });
  }

  editEvent() {
    if (this.editEventFormGroup.valid) {
      // check if delete was pressed
      if (document.activeElement?.getAttribute("name") === "delete-button") {
        // delete event
        this.eventActions.deleteEvent(this.eventToBeEdited);
        this.toastr.success('', 'Event deleted succesfully!');

      }
      else {
        // set pinned to false if null
        if (this.editEventFormGroup.value.pinned) {
          this.editEventFormGroup.value.pinned = false;
        }

        // add eventFormGroup values to event to be edited
        this.eventToBeEdited.title = this.editEventFormGroup.value.title;
        this.eventToBeEdited.startDate = this.editEventFormGroup.value.startDate;
        this.eventToBeEdited.startTime = this.editEventFormGroup.value.startTime;
        this.eventToBeEdited.endDate = this.editEventFormGroup.value.endDate;
        this.eventToBeEdited.endTime = this.editEventFormGroup.value.endTime;
        this.eventToBeEdited.description = this.editEventFormGroup.value.description;
        this.eventToBeEdited.pinned = this.editEventFormGroup.value.pinned;
        this.eventToBeEdited.location = this.editEventFormGroup.value.location;
        this.eventToBeEdited.schedule = this.editEventFormGroup.value.schedule;

        // check if save draft, publish or delete was pressed. As button is pressed the given button will always be the active element
        if (document.activeElement?.getAttribute("name") === "save-button") {
          this.eventToBeEdited.published = false;
        }
        else {
          this.eventToBeEdited.published = true;
        }

        // add event to DB
        this.eventActions.updateEvent(this.eventToBeEdited);
        this.toastr.success('', 'Event updated succesfully!');
      }
      // redirect
      this.router.navigate(['events']);
    }
    else {
      this.toastr.error('Please check if you have filled out all mandatory fileds in the form', 'Error!')
    }
  }
}
