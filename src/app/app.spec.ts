import {TestBed} from '@angular/core/testing';
import {App} from './app';
import {Component} from '@angular/core';

describe('App', () => {
  @Component({selector: 'app-navbar', template: ''})
  class MockNavbarComponent {
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, MockNavbarComponent],
    }).compileComponents();

    TestBed.overrideComponent(App, {
      set: {
        template: '<app-navbar></app-navbar>',
        imports: [MockNavbarComponent],
      }
    });
  });


  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
