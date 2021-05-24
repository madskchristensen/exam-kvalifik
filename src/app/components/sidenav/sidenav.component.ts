import { Component, OnInit } from '@angular/core';
import {NgRedux} from "@angular-redux/store";
import {AppState} from "../../store/Store";
import {PostActions} from "../../store/actions/PostActions";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  events: string[] = [];
  opened: boolean = true;

  constructor(private ngRedux: NgRedux<AppState>, private postActions: PostActions) { }
  ngOnInit(): void {
    this.postActions.readPosts();
  }

}
