import { Component, OnInit } from '@angular/core';

import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  productForm: FormGroup;
  id = '';
  prodName = '';
  prodDesc = '';
  prodPrice = '';
  //prodImage = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private formBuilder: FormBuilder, private router: Router , private route: ActivatedRoute, private authService: AuthService, private productService: ProductService) { }

  ngOnInit() {
    this.getProduct(this.route.snapshot.params.id);
    this.productForm = this.formBuilder.group({
      'prodName' : [null, Validators.required],
      'prodDesc' : [null, Validators.required],
      'prodPrice' : [null, Validators.required]
    });
  }

  getProduct(id: any) {
    this.productService.getProduct(id).subscribe((data: any) => {
      this.id = data.id;
      this.productForm.setValue({
        prodName: data.prodName,
        prodDesc: data.prodDesc,
        prodPrice: data.prodPrice,
      });
    });
  }
  onFormSubmit() {
    this.isLoadingResults = true;
    this.productService.updateProduct(this.id, this.productForm.value)
      .subscribe((res: any) => {
          this.isLoadingResults = false;
          this.router.navigate(['/products']);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  back() {
    this.router.navigate(['/products']);
  }

}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}