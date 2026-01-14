import {Component, computed, input} from '@angular/core';
import {TrophyFilters} from "../../../core/models/filters/trophy-filters";
import {GameGroup} from "../../../core/models/trophy-set/game-group";
import {TrophySetTrophyCardComponent} from "../trophy-set-trophy-card/trophy-set-trophy-card.component";
import {EarnedTrophy} from "../../../core/api/dtos/trophy/earned-trophy";

@Component({
    selector: 'tq-trophy-set-trophy-list',
    imports: [
        TrophySetTrophyCardComponent
    ],
    templateUrl: './trophy-set-trophy-list.component.html',
    styleUrl: './trophy-set-trophy-list.component.scss',
})
export class TrophySetTrophyListComponent {
    readonly trophies = input<EarnedTrophy[]>([]);
    readonly trophyFilters = input<TrophyFilters>({
        showHidden: false,
        earned: 'all',
    });

    private readonly _filteredTrophies = computed(() => {
        switch (this.trophyFilters().earned) {
            case 'all':
                return this.trophies();
            case 'earned':
                return this.trophies().filter(t => t.earnedAt !== null);
            case 'notEarned':
                return this.trophies().filter(t => t.earnedAt === null);
            default:
                return this.trophies();
        }
    });
    readonly baseGameTrophies = computed(() => this._filteredTrophies().filter(t => t.gameGroupId === 'default'));
    readonly dlcs = computed(() => this._computeDlcGroups(this._filteredTrophies()));

    private _computeDlcGroups(trophies: EarnedTrophy[]): GameGroup[] {
        const groups: GameGroup[] = [];
        trophies
            .filter(t => t.gameGroupId !== 'default')
            .forEach(t => {
                const group = groups.find(group => group.groupName === t.gameGroupId);
                if (group === undefined) {
                    groups.push({groupName: t.gameGroupId, trophies: [t]});
                }
                group?.trophies.push(t);
            });
        return groups;
    }
}
