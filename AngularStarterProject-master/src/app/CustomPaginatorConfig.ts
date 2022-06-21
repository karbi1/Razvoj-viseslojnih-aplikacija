import { MatPaginatorIntl } from '@angular/material/paginator'

export function CustomPaginator() {
  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = 'Redova po stranici:';
  customPaginatorIntl.nextPageLabel= 'Sledeca stranica';
  customPaginatorIntl.previousPageLabel = 'Prethodna stranica';
  

  return customPaginatorIntl;
}