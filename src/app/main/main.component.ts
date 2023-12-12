import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  loading = false;
  constructor(
    private common: CommonService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.common.listHierarchy();
    this.loadingService.loading$.subscribe((loading) => {
      setTimeout(() => {
        this.loading = loading;
      });
    });
  }
}
