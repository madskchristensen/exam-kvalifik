import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Collection } from '../../entities/Collection';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CollectionActions } from 'src/app/store/actions/CollectionActions';
import { Post } from 'src/app/entities/Post';
import { Event } from 'src/app/entities/Event';
import { PostActions } from 'src/app/store/actions/PostActions';
import { EventActions } from 'src/app/store/actions/EventActions';
import { NgRedux } from '@angular-redux/store';
import { AppState } from 'src/app/store/Store';

@Component({
  selector: 'app-newcollection',
  templateUrl: './newcollection.component.html',
  styleUrls: ['./newcollection.component.scss']
})
export class NewcollectionComponent implements OnInit {

  public newCollectionFormGroup!: FormGroup;
  public collectionToBeCreated!: Collection;
  
  // posts
  posts = new FormControl();

  // to be filled from collection db. Placeholder atm.
  postList: Post[] = [];

  // events
  events = new FormControl();

  // to be filled from collection db. Placeholder atm.
  eventList: Event[] = [];

  constructor(private fb: FormBuilder, private collectionActions: CollectionActions, private postActions: PostActions, private eventActions: EventActions, private router: Router, private toastr: ToastrService,
    private ngRedux: NgRedux<AppState>) { }

  ngOnInit(): void {
    
    // make sure redux has newest posts
    this.postActions.readPosts();

    // load all collections into collectionList so they can be selected in form
    this.ngRedux.select(state => state.posts).subscribe(res => {

      this.postList = res!.posts;
    });

    // make sure redux has newest events
    this.eventActions.readEvents();

    // load all collections into collectionList so they can be selected in form
    this.ngRedux.select(state => state.events).subscribe(res => {

      this.eventList = res!.events;
    });

    this.collectionToBeCreated = {} as Collection;

    this.newCollectionFormGroup = this.fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      pinned: "",
      posts: "",
      events: ""
    });
  }

  submitNewCollection() {
    if (this.newCollectionFormGroup.valid) {
      // set pinned to false if null 
      if (!this.newCollectionFormGroup.value.pinned) {
        this.newCollectionFormGroup.value.pinned = false;
      }

      // attach FormGroup info to empoty post objects
      this.collectionToBeCreated = this.newCollectionFormGroup.value;
      
      // create date
      const todaysDate = new Date();

      // slicing on -2 to get last two digits
      const todaysMonth = ("0" + (todaysDate.getMonth() + 1).toString().slice(-2));
      const todaysDay = ("0" + todaysDate.getDate()).slice(-2);

      this.collectionToBeCreated.createdAt = todaysDay + "/" + todaysMonth + "/" + todaysDate.getFullYear();

      // check if save or publish was pressed. As button is pressed the given button will always be the active element
      if (document.activeElement?.getAttribute("name") === "save-button") {
        this.collectionToBeCreated.published = false;
      }
      else {
        this.collectionToBeCreated.published = true;
      }

      // add post to DB
      this.collectionActions.addCollection(this.collectionToBeCreated);

      // redirect
      this.toastr.success('', 'Collection saved succesfully!');
      this.router.navigate(['collections']);

    }
    else {
      this.toastr.error('Please check if you have filled out all mandatory fileds in the form', 'Error!')
    }
  }
}
