// import { v4 as uuidv4 } from 'uuid';

export class Todo {
  id: number;

  constructor(
      public text: string,
      public completed: boolean = false
  ) {
    // this.id = uuidv4();
  }
}
