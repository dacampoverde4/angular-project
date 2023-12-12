import { Component, OnInit } from '@angular/core';
import { GenericResponse } from 'src/app/shared/types/generic-response';
import { MessagesService } from '../messages.service';
import { CreateCommentaryResponse, MessagesCommentary } from '../models/commentary.model';

@Component({
  selector: 'app-commentary',
  templateUrl: './commentary.component.html',
  styleUrls: ['./commentary.component.scss'],
})
export class CommentaryComponent implements OnInit {
  isAddNewModalOpen = false;
  newCommentaryTitle = '';
  newCommentary: MessagesCommentary = {
    commentary: undefined,
    sportName: 'Cricket',
    description: undefined,
  };

  constructor(
    private messagesService: MessagesService,
  ) {}

  ngOnInit(): void {}

  openAddNewModal(): void {
    this.isAddNewModalOpen = true;
  }

  addCommentary(): void {
    const commentary: MessagesCommentary = {
      commentary: btoa(this.newCommentary.commentary),
      description: btoa(this.newCommentary.description),
      sportName: this.newCommentary.sportName,
    };
    this.messagesService.createCommentary(commentary)
    .subscribe((res: GenericResponse<CreateCommentaryResponse>) => {
      if (res.errorCode === 0) {
        this.isAddNewModalOpen = false;
        this.newCommentaryTitle = '';
      } else {
        alert(res.errorDescription);
      }
    });
  }
}
