import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PlayersPage} from './players-page.component';
import {Router} from '@angular/router';
import {PlayerListStore} from '../../core/store/player-list-store';
import {PlayerSummary} from '../../core/models/dto/player-summary';
import {Component, EventEmitter, Input, Output} from '@angular/core';

describe('PlayersPage', () => {
  let component: PlayersPage;
  let fixture: ComponentFixture<PlayersPage>;
  let routerSpy: jasmine.SpyObj<Router>;
  let playerListStoreSpy: jasmine.SpyObj<PlayerListStore>;

  @Component({selector: 'app-player-card', template: ''})
  class MockPlayerCard {
    @Input({required: true}) playerSummary!: PlayerSummary;
    @Output() clickOnPseudo: EventEmitter<any> = new EventEmitter();
    @Output() clickOnGame: EventEmitter<any> = new EventEmitter();
  }

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    playerListStoreSpy = jasmine.createSpyObj('PlayerListStore', ['reset', 'search', 'playerSummaries', 'hasMorePlayers', 'loadMore', 'isLoading', 'isError']);

    playerListStoreSpy.playerSummaries.and.returnValue([]);
    routerSpy.navigate.and.returnValue(Promise.resolve(true));

    await TestBed.configureTestingModule({
      imports: [PlayersPage, MockPlayerCard],
      providers: [
        {provide: Router, useValue: routerSpy},
        {provide: PlayerListStore, useValue: playerListStoreSpy},
      ]
    }).compileComponents();
    TestBed.overrideComponent(PlayersPage, {set: {imports: [MockPlayerCard]}});

    fixture = TestBed.createComponent(PlayersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset search on init', () => {
    expect(playerListStoreSpy.reset).toHaveBeenCalled();
    expect(playerListStoreSpy.search).toHaveBeenCalled();
  });

  it('should navigate to profile page', () => {
    const mockPlayerSummary: PlayerSummary = {
      player: {
        id: '123',
        pseudo: 'John Doe',
        avatarUrl: 'avatar.png',
      },
      trophyCount: {platinum: 0, gold: 0, silver: 0, bronze: 0},
      totalGamesPlayed: 0,
      lastPlayedCollectionId: '',
      lastPlayedGameId: '',
      lastPlayedGameTitle: '',
      lastPlayedGameImageUrl: '',
    };

    component.goToProfile(mockPlayerSummary);
    expect(routerSpy.navigate).toHaveBeenCalledOnceWith(['/profile', mockPlayerSummary.player.id]);
  });

});
