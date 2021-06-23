import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Collection } from '../../entities/Collection';
import { FormControl } from '@angular/forms';
import { CollectionActions } from 'src/app/store/actions/CollectionActions';
import { ActivatedRoute, Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { AppState } from 'src/app/store/Store';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editcollection',
  templateUrl: './editcollection.component.html',
  styleUrls: ['./editcollection.component.scss']
})
export class EditcollectionComponent implements OnInit {

  public editCollectionFormGroup!: FormGroup;
  public collectionToBeEdited!: Collection;

  constructor(private fb: FormBuilder, private collectionActions: CollectionActions, private router: Router, private toastr: ToastrService, private route: ActivatedRoute,
    private ngRedux: NgRedux<AppState>) { }

  ngOnInit(): void {
    const id: string = this.route.snapshot.paramMap.get('myId') || "";

    if (id !== null) {
      this.ngRedux.select(state => state.collections).subscribe(res => {
        if (res) {
          this.collectionToBeEdited = res.collections.find(collection => collection.id === id) || {} as Collection;         
        }
      });
    }    

    this.editCollectionFormGroup = this.fb.group({
      title: [this.collectionToBeEdited.title, Validators.required],
      description: [this.collectionToBeEdited.description, Validators.required],
      pinned: [this.collectionToBeEdited.pinned],
      contents: [this.collectionToBeEdited.contentIds]
    });
  }

  editCollection() {
    if (this.editCollectionFormGroup.valid) {

      // check if delete was pressed
      if (document.activeElement?.getAttribute("name") === "delete-button") {
        // delete post
        this.collectionActions.deleteCollection(this.collectionToBeEdited);
        this.toastr.success('', 'Collection deleted succesfully!');

      }
      else {
        // set pinned to false if null
        if (!this.editCollectionFormGroup.value.pinned) {
          this.editCollectionFormGroup.value.pinned = false;
        }

        // add postFormGroup elements to post to be edited
        this.collectionToBeEdited.title = this.editCollectionFormGroup.value.title;
        this.collectionToBeEdited.description = this.editCollectionFormGroup.value.description;
        this.collectionToBeEdited.pinned = this.editCollectionFormGroup.value.pinned;
        this.collectionToBeEdited.contentIds = this.editCollectionFormGroup.value.contents;

        // check if save draft, publish or delete was pressed. As button is pressed the given button will always be the active element
        if (document.activeElement?.getAttribute("name") === "save-button") {
          this.collectionToBeEdited.published = false;
        }
        else {
          this.collectionToBeEdited.published = true;
        }

        // add post to DB
        this.collectionActions.updateCollection(this.collectionToBeEdited);
        this.toastr.success('', 'Collection updated succesfully!');

      }
  
      // redirect
      this.router.navigate(['collections']);
    }
    else {
      this.toastr.error('Please check if you have filled out all mandatory fileds in the form', 'Error!')
    }
  }

}
