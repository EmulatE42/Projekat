import {Component, OnInit} from '@angular/core';
import {ProbaService} from '../proba.service';
import {Guest} from '../model';
@Component({
  moduleId: module.id,
  selector: 'app-proba',
  templateUrl: './proba.component.html',
  styleUrls: ['./proba.component.css'],
  providers: [ProbaService]
})
export class ProbaComponent implements OnInit {

  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmReg : boolean;
  user: Guest;

  constructor(private probaService: ProbaService) {
    this.id = 5;
    this.confirmReg = false;
  }

  reg() {
    this.probaService.regi(this.id, this.first_name, this.last_name, this.email, this.password, this.confirmReg).subscribe(data => {
      this.user = data
    }, error => alert(error));
  }

  ngOnInit() {
  }

}
