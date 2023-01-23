import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product.model';
@Component({
  selector: 'app-category',
  // templateUrl: './category.component.html',
  template: `<app-products [products]="products"></app-products>`,
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryId: string | null = null;
  products!: Product[];
  limit = 10;
  offset = 0;
  constructor(private route: ActivatedRoute, private productsService: ProductsService) { }

  ngOnInit(): void {
    // const categoryId = this.route.snapshot.paramMap.get('id');
    // console.log(categoryId);

    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.categoryId = params.get('id');
          if (this.categoryId) {
            return this.productsService.getByCategory(this.categoryId, this.limit, this.offset);
          }
          return []
        })
      )
      .subscribe(products => {
        this.products = products;
      })
  }

}
