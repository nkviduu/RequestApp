import { Component, OnInit } from '@angular/core';
import { IRequestItem } from '../models/request-item.interface';
import { ContentService } from '../services/content.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'rf-open-requests',
  template: `
  <div class="panel-collapsable" *ngIf="requests$ | async as requests">
    <input
      class="panel-collapsable__toggle"
      type="checkbox"
      id="openrequest-chb">
    <label for="openrequest-chb" class="panel-collapsable__title">
    Open Requests - {{ requests.length ? requests.length : 'none' }}.
    </label>
    <div class="panel-collapsable__body">
      <div
        *ngFor="let request of requests"
        class="openrequest-item"
        [class.selected]="request.id === currentRequestId"
        title="{{ request.content }}"
        >
        <div class="openrequest-item__date">({{ request.createdOn.toLocaleString() }})</div>
        <rf-open-request-item
          [content]="request.content"
          (select)="onSelect(request)"
        ></rf-open-request-item>
      </div>
    </div>
  </div>
  `
})
export class OpenRequestsComponent implements OnInit {
  // @Input() requests: IRequestItem[] = [];
  // @Input() selectedRecordId: number;
  // @Output() selected = new EventEmitter<IRequestItem>();
  // @Output() delete = new EventEmitter<IRequestItem>();

  requests$ = this.contentService.getOpenRequestStream()
    .pipe( map(requests => requests.length > 0 ? requests : null));

  constructor(private contentService: ContentService) {}

  ngOnInit() {
  }

  onSelect(request: IRequestItem) {
    // this.selected.next(request);
    this.contentService.restoreRequest(request.id);
  }

  get currentRequestId() {
    return this.contentService.getCurrentRecordId();
  }

  // deleteItem(request: IRequestItem, event: Event) {
  //   event.stopPropagation();
  //   this.delete.next(request);
  // }
}



