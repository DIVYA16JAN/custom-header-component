import {Component, ElementRef, OnDestroy} from '@angular/core';
import {IHeaderParams} from 'ag-grid-community';
import {IHeaderAngularComp} from 'ag-grid-angular';
import { RouterEvent } from '@angular/router';

interface MyParams extends IHeaderParams {
  menuIcon: string;
}

@Component({
  templateUrl: 'checkbox-header.component.html',
  styleUrls: ['checkbox-header.component.css']
})
export class CheckboxHeaderComponent implements OnDestroy, IHeaderAngularComp {
  selectedMbr = [];
  public params: MyParams;
  private elementRef: ElementRef;

  constructor(elementRef: ElementRef) {
    this.elementRef = elementRef;
   
  }

  agInit(params: MyParams): void {
    this.params = params;
    // this.params.column.addEventListener('sortChanged', this.onSortChanged.bind(this));
  }

  ngOnDestroy() {
    console.log(`Destroying HeaderComponent`);
  }

  onCheckboxValueChanged($event: Event) {
    const isSelected = ($event.target as any).checked;
   if (isSelected) {
      this.params.api.forEachNodeAfterFilter((rowNode, index) => {
        if (rowNode.data.opinion ===  'y') {
          rowNode.setSelected(true, false, true);
        }
      });
      this.params.api.refreshCells();
    }else{
      this.params.api.forEachNodeAfterFilter((rowNode, index) => {
        if (rowNode.data.opinion ===  'y') {
          rowNode.setSelected(false);
        }
      });
      this.params.api.refreshCells();
    }
  }
}
