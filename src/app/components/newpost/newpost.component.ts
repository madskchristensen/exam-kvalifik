import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Post } from '../../entities/Post';
import { FormControl } from '@angular/forms';
import { PostActions } from 'src/app/store/actions/PostActions';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.scss']
})

export class NewpostComponent implements OnInit {
  public newPostFormGroup!: FormGroup;
  public postToBeCreated!: Post;
  
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

  constructor(private fb: FormBuilder, private postActions: PostActions, private router: Router, private toastr: ToastrService) { 
  }

  ngOnInit(): void {     
    // create empty post objects
    this.postToBeCreated = {} as Post;

    // attach information to FormGroup
    this.newPostFormGroup = this.fb.group({
      title: ["", Validators.required],
      text: ["", Validators.required],
      pinned: "",
      mediaType: ""
    });
  }
  

  submitNewPost() {
    //console.log(this.newPostFormGroup);
    if (this.newPostFormGroup.valid) {

      // set pinned to false if null 
      if (!this.newPostFormGroup.value.pinned) {
        this.newPostFormGroup.value.pinned = false;
      }

      // set mediatype to "None" if null
      if (!this.newPostFormGroup.value.mediaType) {
        this.newPostFormGroup.value.mediaType = "None";
      }

      // attach FormGroup info to empoty post objects
      this.postToBeCreated = this.newPostFormGroup.value;
      
      // create date
      const todaysDate = new Date();

      // slicing on -2 to get last two digits
      const todaysMonth = ("0" + (todaysDate.getMonth() + 1).toString().slice(-2));
      const todaysDay = ("0" + todaysDate.getDate()).slice(-2);

      this.postToBeCreated.createdAt = todaysDay + "/" + todaysMonth + "/" + todaysDate.getFullYear();

      // set media reff empty for now
      this.postToBeCreated.mediaRef = "";

      // check if save or publish was pressed. As button is pressed the given button will always be the active element
      if (document.activeElement?.getAttribute("name") === "save-button") {
        this.postToBeCreated.published = false;
      }
      else {
        this.postToBeCreated.published = true;
      }

      // add post to DB
      this.postActions.addPost(this.postToBeCreated);

      // redirect
      this.toastr.success('', 'Post saved succesfully!');
      this.router.navigate(['posts']);

    }
    else {
      this.toastr.error('Please check if you have filled out all mandatory fileds in the form', 'Error!')
    }
  }
}
