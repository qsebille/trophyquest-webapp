import {Directive, TemplateRef} from '@angular/core';

@Directive({selector: 'ng-template[appBlockHeader]'})
export class TrophyQuestBlockHeaderTemplate {
    constructor(public tpl: TemplateRef<any>) {
    }
}

@Directive({selector: 'ng-template[appBlockContent]'})
export class TrophyQuestBlockContentTemplate {
    constructor(public tpl: TemplateRef<any>) {
    }
}