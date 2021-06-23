import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Event } from '../../entities/Event';
import { FormControl } from '@angular/forms';
//import { PostActions } from 'src/app/store/actions/';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-newevent',
  templateUrl: './newevent.component.html',
  styleUrls: ['./newevent.component.scss']
})
export class NeweventComponent implements OnInit {

  public newEventFormGroup!: FormGroup;
  public eventToBeCreated!: Event;
  
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

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private datePipe: DatePipe) { 
  }

  ngOnInit(): void {
    // define minDate
    this.minDate = new Date();

    // create empty post objects
    this.eventToBeCreated = {} as Event;

    // attach information to FormGroup
    this.newEventFormGroup = this.fb.group({
      title: ["", Validators.required],
      startDate: ["", Validators.required],
      startTime: ["", Validators.required],
      endDate: ["", Validators.required],
      endTime: ["", Validators.required],
      description: ["", Validators.required],
      pinned: "",
      location: "",
      schedule: ["", Validators.required],

    });
  }

  submitNewEvent() {
    if (this.newEventFormGroup.valid) {
      // set pinned to false if null 
      if (!this.newEventFormGroup.value.pinned) {
        this.newEventFormGroup.value.pinned = false;
      }
      
      // attach FormGroup info to empoty post objects
      this.eventToBeCreated = this.newEventFormGroup.value;

      // transform date objects to only conntain dates
      // TO DO: maybe not neccesary. Where do we handle this?
      const transformedStartDate = this.datePipe.transform(this.newEventFormGroup.value.start, 'M/d/yy');
      const transformedEndDate = this.datePipe.transform(this.newEventFormGroup.value.end, 'M/d/yy');

      // TO DO
      // Add date time to newEvent object
      
      // check if save or publish was pressed. As button is pressed the given button will always be the active element
      if (document.activeElement?.getAttribute("name") === "save-button") {
        this.eventToBeCreated.published = false;
      }
      else {
        this.eventToBeCreated.published = true;
      }

      // add post to DB
      //this.eventActions.addPost(this.eventToBeCreated);

      this.toastr.success('', 'Event saved succesfully!');
      this.router.navigate(['events']);

    }
    else {
      this.toastr.error('Please check if you have filled out all mandatory fileds in the form', 'Error!')
    }
  }
}
