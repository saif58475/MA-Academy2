
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-my-account",
  templateUrl: "./my-account.component.html",
  styleUrls: ["./my-account.component.scss"],
})
export class MyAccountComponent implements OnInit {
  EmployeeName: string = "";
  companyId: string;



  constructor(private _Router: Router, ) {
    // this.EmployeeName = localStorage.getItem("CamelgateName");
    // this.camle = JSON.parse(localStorage.getItem("companyId"));

    // this.camle =this.companyId==null?  true:false
  }

  ngOnInit() { }

  logout() {
    const role = +localStorage.getItem("Authorization");
console.log(role);
    // window.location.reload(); 
    localStorage.clear();
    this._Router.navigate([""]);

  }
  Profile() {
    this.companyId = localStorage.getItem("");

    // this._CompanyService.Data.next(this.companyId);
  }
}
