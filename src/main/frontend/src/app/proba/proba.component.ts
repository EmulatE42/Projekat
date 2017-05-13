import {Component, OnInit} from '@angular/core';
import {ProbaService} from '../proba.service';
import {User} from '../models';
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
  user: User;

  constructor(private probaService: ProbaService) {
    this.id = 5;
  }

  reg() {
    this.probaService.regi(this.id, this.first_name, this.last_name, this.email, this.password).subscribe(data => {
      this.user = data
    }, error => alert(error));
  }

  ngOnInit() {
  }

}
