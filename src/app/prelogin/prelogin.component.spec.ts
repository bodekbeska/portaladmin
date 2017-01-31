/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PreloginComponent } from './prelogin.component';

describe('PreloginComponent', () => {
  let component: PreloginComponent;
  let fixture: ComponentFixture<PreloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
