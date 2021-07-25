import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef } from '@angular/core';
import {CheckboxHeaderComponent} from './checkbox-header/checkbox-header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Header with Checkbox to apply to all dropdown options.';
  frameworkComponents: any;
  private elementRef: ElementRef;
  constructor(elementRef: ElementRef) {
    this.elementRef = elementRef;
    this.frameworkComponents = {
      headerWithCheckbox: CheckboxHeaderComponent
    };
  }
  columnDefs = [
    {headerName: 'Make', field: 'make',
    filter: 'agTextColumnFilter',
    filterParams: {
      newRowsAction: 'keep',
      applyButton: false 
    },
    floatingFilterComponentParams: { suppressFilterButton: true},
 },
    {headerName: 'Model', field: 'model' },
    {headerName: 'Price', field: 'price'},
    {headerName: 'Opinion', field: '', editable: true, checkboxSelection: true,
   /* cellRenderer: params => {
      return `<input type='checkbox' class=${params.data.opinion==='n' ? 'unchecked' : 'checked'} />`;
  },*/
    cellStyle: params => 
      params.data.opinion === 'n' ? {
        'pointer-events': 'none',opacity: '0.5'} :'',
      headerComponent: 'headerWithCheckbox',
    }
    
  ];
  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000, opinion: 'y' },
    { make: 'honda', model: 'Mondeo', price: 32000, opinion: 'n' },
    { make: 'Porsche', model: 'Boxter', price: 72000, opinion: 'n' },
    {make: 'Toyota', model: 'Celica', price: 35000, opinion: 'y' },
    { make: 'Ford', model: 'Mondeo', price: 32000, opinion: 'n' },
    { make: 'Porsche', model: 'Boxter', price: 72000, opinion: 'y' },
    { make: 'swift', model: 'Celica', price: 35000, opinion: 'n' },
    { make: 'Ford', model: 'Mondeo', price: 32000, opinion: 'y' },
    { make: 'ferrari', model: 'Boxter', price: 72000, opinion: 'y' },
    { make: 'maruti', model: 'Celica', price: 35000, opinion: 'y' },
    { make: 'Ford', model: 'Mondeo', price: 32000, opinion: 'n' },
    { make: 'Porsche', model: 'Boxter', price: 72000, opinion: 'n' },
    {make: 'Toyota', model: 'Celica', price: 35000, opinion: 'n' },
    { make: 'Ford', model: 'Mondeo', price: 32000, opinion: 'y' },
    { make: 'Porsche', model: 'Boxter', price: 72000, opinion: 'y' },
    { make: 'renault', model: 'Celica', price: 35000, opinion: 'n' },
    { make: 'Ford', model: 'Mondeo', price: 32000, opinion: 'y' },
    { make: 'maruti', model: 'Boxter', price: 72000, opinion: 'y' },
  ];

  rowSelection = 'multiple';
  mbrList=[];
  
  onSelectionChanged(event) {
    console.log(event); // verify that the method is fired upon selection
    // do the rest
  }
  floatingFilter(event){
    let headerCheckbox = document.getElementsByClassName('header-checkbox');
    let filterRowList=event.api.rowModel.getNodesInRangeForSelection();
    let selectedList = event.api.getSelectedNodes();
    var filterEnableRow=0, selectedRow=0;
    if(event.api.isAnyFilterPresent()){
      for(var x=0; x<selectedList.length; x++){
        var isfilterSelected = filterRowList.find(row => row.data.make === selectedList[x].data.make && row.data.opinion === 'y');
        if(isfilterSelected){
          this.mbrList.push(isfilterSelected);
          filterEnableRow++;
          selectedRow++;
        }
        else{
          selectedList[x].setSelected(false);
        }
      }
      if(filterEnableRow === selectedRow && filterEnableRow!== 0 && selectedRow!==0){
        headerCheckbox.checked =true;
      }
      else{
        document.querySelector('.header-checkbox').checked =false;
      }
    } 
    else{
      event.api.forEachNodeAfterFilter((rowNode, index) => {
        if (rowNode.data.opinion ===  'y') {
          filterEnableRow++;
        }
      });
      if(filterEnableRow === selectedList.length && filterEnableRow!== 0 && selectedList.length!==0){
        headerCheckbox.checked =true;
      }
      else{
        document.querySelector('.header-checkbox').checked =false;
      }
    }
  }
  onRowSelected(event) {
    let filterEnableRow=0;
    event.api.forEachNodeAfterFilter((rowNode, index) => {
      if (rowNode.data.opinion ===  'y') {
        filterEnableRow++;
      }
    });
    if(filterEnableRow !== event.api.getSelectedNodes().length){
      document.querySelector('.header-checkbox').checked =false;
    }
    else{
      document.querySelector('.header-checkbox').checked =true;
    }
    console.log(event);
    console.log(event.api.getSelectedNodes());
  }
  onSave(event){
    this.mbrList=[];
    let filterRowList=event.api.rowModel.getNodesInRangeForSelection();
      let selectedList = event.api.getSelectedNodes();
      var filterEnableRow=0, selectedRow=0;
      for(var x=0; x<selectedList.length; x++){
        var isfilterSelected = filterRowList.find(row => row.data.make === selectedList[x].data.make && row.data.opinion === 'y');
        if(isfilterSelected){
          this.mbrList.push(isfilterSelected);
        }
      }
  }
}
