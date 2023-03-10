import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/models/comment.model';
import { Product } from 'src/app/models/product.model';
import { CommentService } from 'src/app/services/comment.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  productId!: string;
  product!: Product;
  commentList$!: Observable<Comment[]>

  starLabel = [
    'Vui lòng đánh giá',
    'Rất không hài lòng',
    'Không hài lòng',
    'Bình thường',
    'Hài lòng',
    'Cực kì hài lòng',
  ];

  constructor(private route: ActivatedRoute, private commentService: CommentService, private productService: ProductService) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id')!;
    this.commentList$ = this.commentService.getComments(this.productId)
    this.productService.getProduct(this.productId).subscribe(res => {
      this.product = res
    })
  }

  public goBack() {
    history.back()
  }
}
