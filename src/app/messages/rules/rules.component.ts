import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { GenericResponse } from 'src/app/shared/types/generic-response';
import { MessagesService } from '../messages.service';
import { MessagesRules, CreateRulesResponse } from '../models/rules.model';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {

  public Editor = ClassicEditor;
  public messageRules = '';
  constructor(
    private messagesService: MessagesService,
  ) { }

  ngOnInit(): void {
  }

  addRules(): void {
    const rules: MessagesRules = {
      rules: btoa(this.messageRules),
    };
    this.messagesService.createRules(rules)
    .subscribe((res: GenericResponse<CreateRulesResponse>) => {
      if (res.errorCode === 0) {
        console.log('Successfully created new rules');
      } else {
        alert(res.errorDescription);
      }
    });
  }
}
