import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
 _options: IPageOptions;
  totalPagesCount = 5;

  @Output() pageChanged = new EventEmitter<IPageOptions>();

  @Input()
  set options(_options: IPageOptions) {
    this._options = _options || { pageSize: 10, pageNo: 1, totalCount: 0 };
  }

  constructor() { }

  ngOnInit() {
  }

  get totalPages(): number {
    return this._options.pageSize > 0 ? Math.ceil(this._options.totalCount / this._options.pageSize) : 0;
  }

  get pages(): number[] {
    var numbers: number[] = [];

    if (this.totalPages <= this.totalPagesCount) {
      for (var x = 1; x <= this.totalPages; x++) {
        numbers.push(x);
      }

      return numbers;
    }

    var pageStartSpan = this._options.pageNo - Math.floor(this.totalPagesCount / 2);
    pageStartSpan = pageStartSpan < 1 ? 1 : pageStartSpan;
    var pageEndSpan = pageStartSpan + (this.totalPagesCount - 1);
    pageEndSpan = pageEndSpan > this.totalPages ? this.totalPages : pageEndSpan;

    if (pageEndSpan - pageStartSpan < (this.totalPagesCount - 1)) {
      pageStartSpan = pageEndSpan - (this.totalPagesCount - 1);
      pageStartSpan = pageStartSpan < 1 ? 1 : pageStartSpan;
    }

    for (var x = pageStartSpan; x <= pageEndSpan; x++) {
      numbers.push(x);
    }

    return numbers;
  }

  get firstPage() {
    return this.pages.length > 0 ? this.pages[0] : -1;
  }

  get lastPage() {
    return this.pages.length > 0 ? this.pages[this.pages.length - 1] : -1;
  }

  get startRecord() {
    return ((this._options.pageNo - 1) * this._options.pageSize) + 1;
  }

  get endRecord() {
    var lastRecord = (this._options.pageNo * this._options.pageSize);
    return lastRecord < this._options.totalCount ? lastRecord : this._options.totalCount;
  }

  onPageChanged(pageNo: number) {
    this._options.pageNo = pageNo;
    this.pageChanged.emit(this._options);
  }
}

export interface IPageOptions {
  pageSize: number;
  pageNo: number;
  totalCount: number;
}
