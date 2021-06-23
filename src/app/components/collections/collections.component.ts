import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Collection } from '../../entities/Collection';
import { CollectionActions } from '../../store/actions/CollectionActions';
import { AppState, PostState } from '../../store/Store';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit {
  search = '';
  collections!: Collection[];
  collectionClicked: EventEmitter<any> = new EventEmitter<any>();

  displayedColumns: string[] = ['title', 'created', 'contents', 'status', 'edit'];

  constructor(
    private router: Router,
    private collectionActions: CollectionActions,
    private ngRedux: NgRedux<AppState>
  ) {
  }

  ngOnInit(): void {
    this.ngRedux
      .select((state) => state.collections)
      .subscribe((res) => {
        res?.collections ? (this.collections = res.collections) : (this.collections = []);
      });
  }

  editCollection(id: any) {
    this.router.navigate(['edit-collection', {myId: id}])
  }

}
