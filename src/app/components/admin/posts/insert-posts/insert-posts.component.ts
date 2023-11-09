import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PostsService} from '../../../../shared/API-Service/services/posts.service';
import { CourseContentService } from '../../../../shared/API-Service/services/course-content.service';
import { Image } from './../../../../../images/images';


@Component({
  selector: 'app-insert-posts',
  templateUrl: './insert-posts.component.html',
  styleUrls: ['./insert-posts.component.css']
})
export class InsertPostsComponent implements OnInit {
  PostForm:FormGroup;
  PostFromData:FormData;
  imageLogo:string;
  Image:File;
  img:string = Image;
  coursecontent:any;
  button:boolean = false;
  update:boolean = false;
  recordtoupdate:any;
  constructor( private _PostsService:PostsService
             , private _Router:Router
             , private _FormBuilder:FormBuilder
             , private _CourseContentService:CourseContentService) { }

  ngOnInit(): void {

    this._PostsService.Data.subscribe((res) => {
      this.getdropdown();
      if( res != null){
        this.update = true;
        this.recordtoupdate = res;
        this.imageLogo = 'https://www.maapp.misrpedia.com/public/' + res.availbleOfferImage;
      this.initiate(res);
      }else{
        this.initiate();
      }
    })
  }

  initiate(data?:any){
    this.PostForm = this._FormBuilder.group({
      subjectContentId: [data?.subjectContentId || '', Validators.required],
      description: [data?.description || '', Validators.required],
      availableOfferName: [data?.availableOfferName || '', Validators.required],
      availableOfferVideo: [data?.availableOfferVideo || ''],
    });
  }
getdropdown(){
  this._CourseContentService.GetCourseContent().subscribe((res) => {
    this.coursecontent = res.data;
  })
}
  // imgFile
  getLogoUrl(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.Image = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageLogo = reader.result as string;
      };
    }
  }
  get fc(){
    return this.PostForm.controls;
  }
  appendPostData(){
    this.PostFromData = new FormData();
    this.PostFromData.append("subjectContentId", this.PostForm.value.subjectContentId);    
    this.PostFromData.append("description", this.PostForm.value.description);    
    this.PostFromData.append("availableOfferName", this.PostForm.value.availableOfferName);    
    this.PostFromData.append("availableOfferVideo", this.PostForm.value.availableOfferVideo);    
    this.PostFromData.append("image", this.Image);    
   }
  onSubmit(){
    this.button = true;
    if( this.PostForm.status == "VALID" && this.update == false){
      this.appendPostData();
      this._PostsService.Create(this.PostFromData).subscribe((res) => {
        Swal.fire({
         icon: "success",
         title: "تم تسجيل المنشور بنجاح",
         showConfirmButton: false,
         timer: 1500,
       }); 
       this.PostForm.reset();
       this._Router.navigate(['content/admin/ViewPosts']);
       },(err) => {
        this.button = false;
             Swal.fire({
               icon: 'error',
               title: 'خطأ',
               text: 'تأكد من ملئ جميع الخانات',
             });
             this.button = false;
       })
    }else if(this.PostForm.status == "VALID" && this.update == true){
      this.appendPostData();
      this._PostsService.Update(this.PostFromData , this.recordtoupdate.availableOffersId).subscribe((res) => {
        Swal.fire({
         icon: "success",
         title: "تم تعديل المنشور بنجاح",
         showConfirmButton: false,
         timer: 1500,
       }); 
       this.PostForm.reset();
       this._Router.navigate(['content/admin/ViewPosts']);
       },(err) => {
        this.button = false;
             Swal.fire({
               icon: 'error',
               title: 'خطأ',
               text: 'تأكد من ملئ جميع الخانات',
             });
             this.button = false;
       })
    }
    else{
      this.button = false;
             Swal.fire({
               icon: 'error',
               title: 'خطأ',
               text: 'تأكد من ملئ جميع الخانات',
             });
             this.button = false;
    }
   
  }
  

  ngOnDestroy(){
    this._PostsService.Data.next(null);
     }
}
