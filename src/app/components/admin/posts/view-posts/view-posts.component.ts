import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PostsService } from './../../../../shared/API-Service/services/posts.service';

@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.component.html',
  styleUrls: ['./view-posts.component.css']
})
export class ViewPostsComponent implements OnInit {
posts :any;
page: number = 1;
  count :number = 0 ;
  tableSize: number = 20;
  constructor( private _PostsService:PostsService
             , private _Router:Router) { }

  ngOnInit(): void {
    this.getPosts();
  }


  getPosts(){
  this._PostsService.Get().subscribe((res) => {
    this.posts = res.data;
  })
  }
  onTableDataChange(event:any){
    this.page = event;
    this.getPosts();
      }
  update(record:object){
    this._PostsService.Data.next(record);
    this._Router.navigate(['content/admin/InsertPosts']);
  }
  delete(id:number){
    Swal.fire({
      title: 'هل تريد مسح المنشور ؟',
      text: "لن يكون لك صلاحية إعادته مره اخرى",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'الغاء',
      confirmButtonText: 'امسح العنصر !'
    }).then((result) => {
      if (result.isConfirmed) {
        this._PostsService.Delete(id).subscribe((res) => {
          Swal.fire({
            icon: "success",
            title: "تم المسح بنجاح",
            showConfirmButton: false,
            timer: 1500,
          });
       this.getPosts();
        },(err) => {
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text:err.error.message    
          })
          this.getPosts();
      //     Swal.fire({
      //       icon: "success",
      //       title: "تم المسح بنجاح",
      //       showConfirmButton: false,
      //       timer: 1500,
      //     });
      //  this.getcourses();
        },() => {
          console.log("completed");
        })
      }
    }) 
  }
}
