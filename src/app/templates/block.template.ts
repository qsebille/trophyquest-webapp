import {Directive, TemplateRef} from '@angular/core';

@Directive({selector: 'ng-template[tqBlockHeader]'})
export class TrophyQuestBlockHeaderTemplate {
    constructor(public tpl: TemplateRef<any>) {
    }
}

@Directive({selector: 'ng-template[tqBlockContent]'})
export class TrophyQuestBlockContentTemplate {
    constructor(public tpl: TemplateRef<any>) {
    }
}