import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProductType } from 'src/app/models/productType.model';
import { Wood } from 'src/app/models/wood.model';
import { Comment } from 'src/app/models/comment.model';
import { CommentService } from 'src/app/services/comment.service';
import { TypeService } from 'src/app/services/type.service';
import { WoodService } from 'src/app/services/wood.service';

@Component({
  selector: 'app-comment-statistical',
  templateUrl: './comment-statistical.component.html',
  styleUrls: ['./comment-statistical.component.scss'],
})
export class CommentStatisticalComponent implements OnInit {
  requestForm = this.fb.group({
    from: ['', Validators.required],
    to: ['', Validators.required],
    type: [''],
    wood: [''],
  });

  types!: ProductType[];
  woodTypes$!: Observable<Wood[]>;
  commentList!: Comment[];
  filterCommentList!: Comment[];

  quantityStar!: {
    one_star: number,
    two_star: number,
    three_star: number,
    four_star: number,
    five_star: number,
  }

  rating1 = 1;
  rating2 = 2;
  rating3 = 3;
  rating4 = 4;
  rating5 = 5;

  starLabel = [
    'Vui lòng đánh giá',
    'Rất không hài lòng',
    'Không hài lòng',
    'Bình thường',
    'Hài lòng',
    'Cực kì hài lòng',
  ];

  constructor(
    private fb: FormBuilder,
    private commentService: CommentService,
    private typeService: TypeService,
    private woodService: WoodService
  ) {
    this.requestForm.get('to')?.valueChanges.subscribe(val => {
      if(val) {
        if (this.requestForm.get('from')?.value) {
          const to = new Date(val);
          const from = new Date(this.requestForm.get('from')?.value!);

          if (to < from) {
            this.requestForm.get('to')?.setErrors({toDateInvalid: true})
          }
        }
      }
    })

    this.requestForm.get('from')?.valueChanges.subscribe(val => {
      if(val) {
        if (this.requestForm.get('to')?.value) {
          const from = new Date(val);
          const to = new Date(this.requestForm.get('to')?.value!);

          if (from > to) {
            this.requestForm.get('from')?.setErrors({fromDateInvalid: true})
          }
        }
      }
    })
  }

  ngOnInit(): void {
    this.typeService.getProductTypes().subscribe(res => {
      this.types = res.filter(val => val.active === 1);
    });
    this.woodTypes$ = this.woodService.getWoodList();

    this.commentService.analysis().subscribe(res => {
      this.quantityStar = res
    })

    this.commentService.getAll().subscribe(res => {
      this.commentList = res;
      this.filterCommentList = res;
    })
  }

  handleSubmit() {
    let from = this.requestForm.controls.from.value!;
    let to = this.requestForm.controls.to.value!;
    let type = this.requestForm.controls.type.value!;
    let wood = this.requestForm.controls.wood.value!;

    this.commentService.analysis(from,to,type, wood).subscribe(res => {
      this.quantityStar = res
    })

    this.commentService.getAll(from,to,type, wood).subscribe(res => {
      this.commentList = res;
      this.filterCommentList = res;
    })
  }

  quantityChildren(typeId: number): number {
    let quantity = 0;
    this.types.forEach(type => {
      if(type.parentId === typeId) {
        quantity++;
      }
    });

    return quantity;
  }

  filterComment(rating: number) {
    this.filterCommentList = this.commentList;
    this.filterCommentList = this.commentList.filter((comment) => comment.star === rating);
  }
}
