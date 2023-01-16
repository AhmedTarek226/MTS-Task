import { Component, OnInit } from '@angular/core';
import { IDispute } from 'src/app/Models/dispute';
import { DisputeService } from 'src/app/Services/dispute.service';
import * as FileSaver from 'file-saver';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  disputes: IDispute[];
  search: string;
  loading: boolean;
  rows: number;
  totalRecords: number;
  rowsPerPageOptions: number[];
  cols: string[];
  selectedCols: string[];
  constructor(private disputeService: DisputeService) {
    this.disputes = [];
    this.search = '';
    this.loading = false;
    this.rows = 50;
    this.totalRecords = 0;
    this.rowsPerPageOptions = [10, 20, 30, 50];
    this.selectedCols = ['auth_ID', 'pan', 'auth_ID', 'amount', 'dispute_DATE'];
    this.cols = [];
    // this.disputes
  }

  ngOnInit(): void {
    this.getAllDisputes();
  }

  getAllDisputes(rows: number = 50, page: number = 0) {
    this.loading = true;
    this.disputeService.getAllDisputes(rows, page).subscribe({
      next: (data) => {
        this.disputes = data?.Disputes;
        this.totalRecords = data?.totalItems;
        this.cols = [...Object.keys(data?.Disputes[0]), 'Details'];
        console.log(Object.keys(data?.Disputes[0]));
      },
      complete: () => (this.loading = false),
    });
  }

  paginate(event: any) {
    this.getAllDisputes(event.rows, event.page);
  }
  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.disputes);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'products');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then((FileSaver) => {
      let EXCEL_TYPE =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE,
      });
      saveAs(
        data,
        fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
      );
    });
  }
  clear() {}
  upper() {
    this.search = this.search.toUpperCase();
  }

  viewDispute() {}
}
