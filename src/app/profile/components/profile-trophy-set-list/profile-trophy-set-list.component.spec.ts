import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileTrophySetListComponent} from './profile-trophy-set-list.component';

describe('ProfileTrophySetListComponent', () => {
    let component: ProfileTrophySetListComponent;
    let fixture: ComponentFixture<ProfileTrophySetListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProfileTrophySetListComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ProfileTrophySetListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());
});
