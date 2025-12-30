import {Component, computed, input} from '@angular/core';
import {GameTrophyCardComponent} from "../game-trophy-card/game-trophy-card.component";
import {Trophy} from "../../../core/models/dto/trophy";
import {GameGroupTrophies} from "../../../core/models/dto/game-group-trophies";
import {TrophyFilters} from "../../../core/models/filters/trophy-filters";

@Component({
    selector: 'tq-game-trophy-list',
    imports: [
        GameTrophyCardComponent
    ],
    templateUrl: './game-trophy-list.component.html',
    styleUrl: './game-trophy-list.component.scss',
})
export class GameTrophyListComponent {
    readonly trophies = input<Trophy[]>([]);
    readonly trophyFilters = input<TrophyFilters>({
        showHidden: false,
        earned: 'all',
    });

    private readonly _filteredTrophies = computed(() => {
        switch (this.trophyFilters().earned) {
            case 'all':
                return this.trophies();
            case 'earned':
                return this.trophies().filter(t => t.earnedDate !== null);
            case 'notEarned':
                return this.trophies().filter(t => t.earnedDate === null);
            default:
                return this.trophies();
        }
    });
    readonly baseGameTrophies = computed(() => this._filteredTrophies().filter(t => t.gameGroup === 'default'));
    readonly dlcs = computed(() => this._computeDlcGroups(this._filteredTrophies()));

    private _computeDlcGroups(trophies: Trophy[]): GameGroupTrophies[] {
        const groups: GameGroupTrophies[] = [];
        trophies
            .filter(t => t.gameGroup !== 'default')
            .forEach(t => {
                const group = groups.find(group => group.groupName === t.gameGroup)
                if (group === undefined) {
                    groups.push({groupName: t.gameGroup, trophies: [t]});
                }
                group?.trophies.push(t);
            });
        return groups;
    }
}
