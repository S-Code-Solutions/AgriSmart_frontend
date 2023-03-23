import { Component, OnInit } from '@angular/core';
import {faHandsHelping} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-colab-fn-c',
  templateUrl: './colab-fn-c.component.html',
  styleUrls: ['./colab-fn-c.component.scss']
})
export class ColabFnCComponent implements OnInit {

  faHandsHelping = faHandsHelping;

  constructor() { }

  ngOnInit(): void {
  }

}
