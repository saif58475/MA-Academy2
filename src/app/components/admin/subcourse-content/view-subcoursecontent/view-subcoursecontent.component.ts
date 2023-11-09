import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SubcoursecontentService } from './../../../../shared/API-Service/services/subcoursecontent.service';
import { CourseContentService } from './../../../../shared/API-Service/services/course-content.service';
import { CoursesService } from './../../../../shared/API-Service/services/courses.service';
@Component({
  selector: 'app-view-subcoursecontent',
  templateUrl: './view-subcoursecontent.component.html',
  styleUrls: ['./view-subcoursecontent.component.css']
})
export class ViewSubcoursecontentComponent implements OnInit {
  subsubjects:any [];
  filterstring:string;
  title='pagination';
page: number = 1;
  count :number = 0 ;
  tableSize: number = 20;
  constructor(private _SubcoursecontentService:SubcoursecontentService
             ,private _Router:Router
             ,private _CourseContentService:CourseContentService
             ,private _CoursesService:CoursesService) { }

  ngOnInit(): void {
    this.getsubcontent();
  }


  getsubcontent(){
    this._SubcoursecontentService.GetSubjectContent().subscribe((res) => {
      this.subsubjects = res.data;
    })
  }
  onTableDataChange(event:any){
    this.page = event;
    this.getsubcontent();
  }
  rearrangesubsubjectcontent(id : number){
    this._SubcoursecontentService.RearrangeSubjectContent.next(id);
    this._Router.navigate(['content/admin/Rearangesubcoursecontent']); 
  }
  async showBeforSubjectContent(beforesubjectcontentId){
    await Swal.fire({
      title: 'هل تريد اظهار او اخفاء هذا المحتوى ',
      input: 'select',
      inputOptions: {
        'show': 'اظهار هذا المحتوى',
        'notshow': 'اخفاء هذا المحتوى',
      },
      inputPlaceholder: 'اختر اخفاء او اظهار',
      showCancelButton: true,
      confirmButtonText: 'استمر',
      cancelButtonText:'الغاء',
      inputValidator: (value) => {
        return new Promise((resolve) => {
          switch(value){
          case 'show':
            this._SubcoursecontentService.showSubjectContent(beforesubjectcontentId, true).subscribe((res) => {
              Swal.fire({
                icon: "success",
                title: "تم اظهار المحتوى بنجاح",
                showConfirmButton: false,
                timer: 1500,
              });
            })
            document.getElementsByClassName('swal2-container')[0].remove();
            break;
          case 'notshow':
            this._SubcoursecontentService.showSubjectContent(beforesubjectcontentId, false).subscribe((res) => {
              Swal.fire({
                icon: "success",
                title: "تم اخفاء المحتوى بنجاح",
                showConfirmButton: false,
                timer: 1500,
              });
            })
            document.getElementsByClassName('swal2-container')[0].remove();
            break;
            default :
             alert('this is default');
             break;
          }
        })
      }
    })
  }
  addcontent(data:any){
    this._CourseContentService.insertnewcoursecontent.next(data);
    this._Router.navigate(['content/admin/InsertCourseLecture']);
  }
  
  delete(id : number){
    Swal.fire({
      title: 'هل تريد مسح الكورس ؟',
      text: "لن يكون لك صلاحية إعادته مره اخرى",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'الغاء',
      confirmButtonText: 'امسح العنصر !'
    }).then((result) => {
      if (result.isConfirmed) {
        this._SubcoursecontentService.DeleteSubjectContent(id).subscribe((res) => {
          Swal.fire({
            icon: "success",
            title: "تم المسح بنجاح",
            showConfirmButton: false,
            timer: 1500,
          });
       this.getsubcontent();
        },(err) => {
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text:err.error.message    
          })
          this.getsubcontent();
        },() => {
          console.log("completed");
        })
      }
    }) 
  }
  update(record:object){
    this._SubcoursecontentService.SubjectContent.next(record);
    this._Router.navigate(['content/admin/InsertSubCourseContent']);
  }

  GettheStudentsInTheSubSubjectContent(beforSubjectContentId:number){
    this._Router.navigate(['content/admin/ViewActivatedStudents/${id}'], { queryParams: { id: beforSubjectContentId } });
    //  this._CoursesService.GetCourse().subscribe((res) => {
    //  let subject = res.data.filter((T) => T.subjectId == id);
    //   this._Router.navigate([`content/admin/ViewActivatedStudents/${id}`], { queryParams: { id: beforSubjectContentId } });
    //  },(err) => {
    //   console.log('sorry');
    //  })
  }
  getallthecourses(id:number){
    this._Router.navigate(['content/admin/ViewCourseLecture/${id}'], { queryParams: { id: id } });
  }

}
