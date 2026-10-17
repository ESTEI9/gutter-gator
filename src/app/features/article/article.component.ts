import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from '@core/components/footer/footer.component';

@Component({
    selector: 'gg-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss'],
    imports: [FooterComponent],
})
export class ArticleComponent implements OnInit {

    private activatedRoute = inject(ActivatedRoute);

    constructor() { }

    ngOnInit() {
        const category = this.activatedRoute.snapshot.paramMap.get('category'); // 1;
        const workType = this.activatedRoute.snapshot.paramMap.get('workType'); // installation
        const subType = this.activatedRoute.snapshot.paramMap.get('subType'); // gutters

        console.log(category, workType, subType);
    }

}
