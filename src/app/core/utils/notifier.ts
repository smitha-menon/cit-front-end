import { Injectable } from "@angular/core";
import { IndividualConfig, ToastrService } from "ngx-toastr";


@Injectable({
    providedIn: 'root',
  })

  export class NotifierService {

    options: IndividualConfig | any;

    constructor(private toastr: ToastrService) {
        this.options = this.toastr.toastrConfig;
    }

    success(title: string, message: string) {
        this.toastr.success(message, title);
        this.options.closeButton = true
      }
    
      error(title: string, message: string) {
        this.toastr.error(message, title);
      }
  }