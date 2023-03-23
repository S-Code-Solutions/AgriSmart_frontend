import { Component, OnInit } from '@angular/core';
import {faFileAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  faFileAlt = faFileAlt;

  constructor() { }

  ngOnInit(): void {
  }

}
