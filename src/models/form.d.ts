export interface FormValues {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  ataca: boolean;
  picture: FileList;
  country: string;
}

export interface FormStateValues extends Omit<FormValues, 'picture'> {
  pictureFile: string;
  createdAt: string;
}
