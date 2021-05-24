import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {FormControl} from '@angular/forms';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.scss']
})
export class EditpostComponent implements OnInit {
  public editPostFormGroup!: FormGroup;
  public postToBeEdited!: PostComponent;

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

  constructor() { }

  ngOnInit(): void {       
  }

  editPost() {
    
  }

}
