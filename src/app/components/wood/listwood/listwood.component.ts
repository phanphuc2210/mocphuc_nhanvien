import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Wood } from 'src/app/models/wood.model';
import { WoodService } from 'src/app/services/wood.service';

@Component({
  selector: 'app-listwood',
  templateUrl: './listwood.component.html',
  styleUrls: ['./listwood.component.scss']
})
export class ListwoodComponent implements OnInit {
  woodList$!: Observable<Wood[]>

  constructor(private woodService: WoodService) {}

  ngOnInit(): void {
    this.woodList$ = this.woodService.getWoodList()
  }
}
