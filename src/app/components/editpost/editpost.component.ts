import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Post } from '../../entities/Post';
import { FormControl } from '@angular/forms';
import { PostActions } from 'src/app/store/actions/PostActions';
import { ActivatedRoute, Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { AppState } from 'src/app/store/Store';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.scss']
})
export class EditpostComponent implements OnInit {
  public editPostFormGroup!: FormGroup;
  public postToBeEdited!: Post;

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

  constructor(private fb: FormBuilder, private postActions: PostActions, private router: Router, private toastr: ToastrService, private route: ActivatedRoute,
    private ngRedux: NgRedux<AppState>) { }

  ngOnInit(): void {   
    const id: string = this.route.snapshot.paramMap.get('myId') || "";

    if (id !== null) {
      this.ngRedux.select(state => state.posts).subscribe(res => {
        if (res) {
          this.postToBeEdited = res.posts.find(post => post.id === id) || {} as Post;         
        }
      });
    }    

    this.editPostFormGroup = this.fb.group({
      title: [this.postToBeEdited.title, Validators.required],
      text: [this.postToBeEdited.text, Validators.required],
      pinned: [this.postToBeEdited.pinned],
      mediaType: [this.postToBeEdited.mediaType]
    });
  }

  editPost() {
    if (this.editPostFormGroup.valid) {

      // check if delete was pressed
      if (document.activeElement?.getAttribute("name") === "delete-button") {
        // delete post
        this.postActions.deletePost(this.postToBeEdited);
      }
      else {
        // set pinned to false if null
        if (!this.editPostFormGroup.value.pinned) {
          this.editPostFormGroup.value.pinned = false;
        }

        // set mediatype to "None" if null
        if (!this.editPostFormGroup.value.mediaType) {
          this.editPostFormGroup.value.mediaType = "None";
        }

        // add postFormGroup elements to 
        this.postToBeEdited.title = this.editPostFormGroup.value.title;
        this.postToBeEdited.text = this.editPostFormGroup.value.text;
        this.postToBeEdited.pinned = this.editPostFormGroup.value.pinned;
        this.postToBeEdited.mediaType = this.editPostFormGroup.value.mediaType;

        // check if save draft, publish or delete was pressed. As button is pressed the given button will always be the active element
        if (document.activeElement?.getAttribute("name") === "save-button") {
          this.postToBeEdited.published = false;
        }
        else {
          this.postToBeEdited.published = true;
        }

        // add post to DB
        this.postActions.updatePost(this.postToBeEdited);
        this.toastr.success('', 'Post saved succesfully!');

      }
  
      // redirect
      this.router.navigate(['posts']);
    }
    else {
      this.toastr.error('Please check if you have filled out all mandatory fileds in the form', 'Error!')
    }
  }
}
