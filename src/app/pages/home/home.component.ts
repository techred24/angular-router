import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products!: Product[];
  limit = 10;
  offset = 0;
  productId: string | null = null;
  constructor(private productsService: ProductsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productsService.getAll(this.limit, this.offset).subscribe((data) => {
      this.products = data;
      this.offset += this.limit;
    });
    // console.log(this.route.queryParams)
    this.route.queryParamMap.subscribe(params => {
      this.productId = params.get('product');
    });
  }
  onLoadMore() {
    this.productsService.getAll(this.limit, this.offset).subscribe((data) => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }
}