import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcollectionComponent } from './newcollection.component';

describe('NewcollectionComponent', () => {
  let component: NewcollectionComponent;
  let fixture: ComponentFixture<NewcollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewcollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewcollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
