import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Paged, Query } from '../movies.service.interface';

@Component({
  selector: 'aa-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {

  @Input() recordset!: Paged;

  @Output() paginate = new EventEmitter<Query>();

}
