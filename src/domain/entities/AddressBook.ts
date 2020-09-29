export class AddressBook {

  id: string;
  fullName: string
  firstName: string;
  lastName: string;
  middleName: string;
  dob: string;
  age: number;

  constructor(id: string, fullName: string, firstName: string, lastName:string, middleName: string, dob:string, age:number) {
    this.id = id;
    this.fullName = fullName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.dob = dob;
    this.age = age;
  }
}
