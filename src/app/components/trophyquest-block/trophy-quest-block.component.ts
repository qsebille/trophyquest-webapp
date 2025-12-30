import {Component, ContentChild} from '@angular/core';
import {TrophyQuestBlockContentTemplate, TrophyQuestBlockHeaderTemplate} from "../../templates/block.template";
import {NgTemplateOutlet} from "@angular/common";

@Component({
    selector: 'tq-trophyquest-block',
    imports: [
        NgTemplateOutlet
    ],
    templateUrl: './trophy-quest-block.component.html',
    styleUrl: './trophy-quest-block.component.scss',
})
export class TrophyQuestBlockComponent {
    @ContentChild(TrophyQuestBlockHeaderTemplate) headerTemplate?: TrophyQuestBlockHeaderTemplate;
    @ContentChild(TrophyQuestBlockContentTemplate) contentTemplate?: TrophyQuestBlockContentTemplate;
}
