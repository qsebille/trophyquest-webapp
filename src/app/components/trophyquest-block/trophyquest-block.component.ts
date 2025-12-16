import {Component, ContentChild} from '@angular/core';
import {BlockContentTemplate, BlockHeaderTemplate} from "../../templates/block.template";
import {NgTemplateOutlet} from "@angular/common";

@Component({
    selector: 'app-trophyquest-block',
    imports: [
        NgTemplateOutlet
    ],
    templateUrl: './trophyquest-block.component.html',
    styleUrl: './trophyquest-block.component.scss',
})
export class TrophyquestBlockComponent {
    @ContentChild(BlockHeaderTemplate) headerTemplate?: BlockHeaderTemplate;
    @ContentChild(BlockContentTemplate) contentTemplate?: BlockContentTemplate;
}
