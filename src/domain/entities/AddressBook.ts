export class AddressBook {

  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  dob: string;

  constructor(id: number, firstName: string, lastName:string, middleName: string, dob:string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.dob = dob;
  }
}
