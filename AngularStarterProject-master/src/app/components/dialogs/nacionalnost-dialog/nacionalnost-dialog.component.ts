import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Nacionalnost } from 'src/app/models/nacionalnost';
import { NacionalnostService } from 'src/app/services/nacionalnost.service';

@Component({
  selector: 'app-nacionalnost-dialog',
  templateUrl: './nacionalnost-dialog.component.html',
  styleUrls: ['./nacionalnost-dialog.component.css']
})
export class NacionalnostDialogComponent implements OnInit {
   
  public flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<NacionalnostDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Nacionalnost,
              public nacionalnostService: NacionalnostService
    ) { }

  ngOnInit(): void {
  }
  
  public add() : void {
    this.nacionalnostService.addNacionalnost(this.data).subscribe(() => {
      this.snackBar.open('Uspesno dodat nacionalnost: ' + this.data.naziv, 'OK', {
        duration: 25000
      })
    }),
      (error:Error) => {
        console.log(error.name + ' ' + error.message);
        this.snackBar.open('Doslo je do greske prilikom dodavanja', 'Zatvori', {
          duration: 25000
        })
      }
  }

  public update() : void{
    this.nacionalnostService.updateNacionalnost(this.data).subscribe(()=>{
      this.snackBar.open('Uspesno azurirana nacionalnost: ' + this.data.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Doslo je do greske prilikom azuriranja', 'Zatvori', {
        duration: 2500
      })
    }
  }

  public delete() : void{
    this.nacionalnostService.deleteNacionalnost(this.data.id).subscribe(()=>{
      this.snackBar.open('Uspesno obrisana nacioanlnost: ' + this.data.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Doslo je do greske prilikom brisanja', 'Zatvori', {
        duration: 1000
      })
    }
  }

  public cancel(): void {
    this.dialogRef.close();
     this.snackBar.open('Odustali ste', 'Zatvori',{
       duration: 1000
     })
  }
}
