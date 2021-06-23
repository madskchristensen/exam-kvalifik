import {Injectable} from "@angular/core";
import {NgRedux} from "@angular-redux/store";
import {AppState} from "../Store";
import {CollectionsService} from "../../services/collections/collections.service";
import {Collection} from "../../entities/Collection";

@Injectable({ providedIn: "root" })
export class CollectionActions {
  constructor (private ngRedux: NgRedux<AppState>, private collectionsService: CollectionsService) {
  }

  // enums to be used in reducer to switch on type of action
  static ADD_COLLECTION: string = "ADD_COLLECTION";
  static UPDATE_COLLECTION: string = "UPDATE_COLLECTION";
  static READ_COLLECTIONS: string = "READ_COLLECTIONS";
  static DELETE_COLLECTION: string = "DELETE_COLLECTION";

  addCollection(newCollection: Collection) {
    this.collectionsService.add(newCollection).subscribe((res: any) => {

      // res contains the documents id in firebase, so add this as a property to the post object.
      newCollection.id = res.name;

      this.ngRedux.dispatch({
        type: CollectionActions.ADD_COLLECTION,
        payload: newCollection
      });
    });
  }

  readCollections() {
    let collections: Collection[] = [];

    this.collectionsService.getAll().subscribe((res: any) => {
      // service returns json tree containing all posts -> convert to array
      for (let id in res) {
        res[id].id = id // add id property to every post object
        collections.push(res[id] as Collection) // add post to post array
      }

      this.ngRedux.dispatch({
        type: CollectionActions.READ_COLLECTIONS,
        payload: collections
      });
    });
  }

  updateCollection(updatedCollection: Collection) {
    this.collectionsService.update(updatedCollection).subscribe(() => {

      this.ngRedux.dispatch({
        type: CollectionActions.UPDATE_COLLECTION,
        payload: updatedCollection
      });
    });
  }

  deleteCollection(collectionToDelete: Collection) {
    this.collectionsService.delete(collectionToDelete).subscribe(() => {

      this.ngRedux.dispatch({
        type: CollectionActions.DELETE_COLLECTION,
        payload: collectionToDelete
      });
    });
  }
}
