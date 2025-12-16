import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrophyquestBlockComponent } from './trophyquest-block.component';

describe('TrophyquestBlockComponent', () => {
  let component: TrophyquestBlockComponent;
  let fixture: ComponentFixture<TrophyquestBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrophyquestBlockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrophyquestBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
