import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Igrac } from 'src/app/models/igrac';
import { Liga } from 'src/app/models/liga';
import { Tim } from 'src/app/models/tim';
import { TimService } from 'src/app/services/tim.service';
import { TimDialogComponent } from '../dialogs/tim-dialog/tim-dialog.component';

@Component({
  selector: 'app-tim',
  templateUrl: './tim.component.html',
  styleUrls: ['./tim.component.css']
})
export class TimComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'naziv', 'osnovan','sediste', 'liga', 'actions'];
  dataSource: MatTableDataSource<Tim>
  subscription: Subscription;
  selektovanTim: Tim;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  constructor(private timService: TimService,
              private dialog: MatDialog) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
   this.subscription = this.timService.getAllTims().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    ),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
    }
  }

  public openDialog(flag: number, id?: number, naziv? : String, osnovan?:Date, sediste?: String, liga?: Liga) {
      const dialogRef = this.dialog.open(TimDialogComponent, {data: {id,naziv,osnovan,sediste, liga}});
      dialogRef.componentInstance.flag = flag;
      dialogRef.afterClosed().subscribe(result => {
        if(result == 1){
          this.loadData();
        }
      })
  }

  selectRow(row){
    this.selektovanTim = row;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
