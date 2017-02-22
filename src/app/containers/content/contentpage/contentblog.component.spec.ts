/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ContentblogComponent } from './contentblog.component';

describe('ContentpageComponent', () => {
  let component: ContentblogComponent;
  let fixture: ComponentFixture<ContentblogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentblogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
