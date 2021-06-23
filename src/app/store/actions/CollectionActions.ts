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

  }

  updateCollection(updatedCollection: Collection) {

  }

  readCollections() {

  }

  deleteCollection(collectionToDelete: Collection) {

  }
}
