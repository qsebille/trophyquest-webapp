import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ProfileCollectionCardComponent} from './profile-collection-card.component';
import {PlayerCollection} from '../../core/models/dto/player-collection';

describe('ProfileCollectionCardComponent', () => {
    let component: ProfileCollectionCardComponent;
    let fixture: ComponentFixture<ProfileCollectionCardComponent>;

    const mockCollection: PlayerCollection = {
        collectionId: '001',
        collectionTitle: 'Collection 1',
        collectionPlatform: 'PS5',
        collectionImageUrl: 'collection.png',
        gameId: 'game-001',
        gameTitle: 'Game 1',
        gameImageUrl: 'game.png',
        collectionTrophies: {platinum: 1, gold: 2, silver: 3, bronze: 4},
        earnedTrophies: {platinum: 1, gold: 2, silver: 3, bronze: 4}
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProfileCollectionCardComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ProfileCollectionCardComponent);
        component = fixture.componentInstance;

        fixture.componentRef.setInput('collection', mockCollection);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
