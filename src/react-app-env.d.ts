/// <reference types="react-scripts" />
interface Action {
  type: string;
  payload: any;
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  class: number;
  isTeacher: boolean;
}
