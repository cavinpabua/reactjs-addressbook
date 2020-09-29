import { AddressBook } from "../../domain/entities/AddressBook";
import { AddressRepository } from "../../domain/repositories/AddressRepository";
class AddressBookDTO {
  id: number= 0;
  firstName: string = "";
  lastName: string = "";
  middleName: string = "";
  dob: string = "";
}

const STORAGE_NAME = "AddressBook";

export class AddressRepositoryImpl implements AddressRepository {
  localStorageGet(name: string) {
    let item= localStorage.getItem(name);
    if (item !== null){
      return item
    }
    return  "{}"
  }
  localStorageSet(name: string, value:any) {
    localStorage.setItem(name, value);
  }
  isEmpty(obj: {}) {
    return Object.keys(obj).length === 0;
  }

  GetAddress(): any{
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    let itemArray = JSON.parse(<string>this.localStorageGet(STORAGE_NAME))
    if (!this.isEmpty(itemArray)) {
      return itemArray.obj.map((item: AddressBookDTO) => new AddressBook(item.id, item.firstName, item.lastName, item.middleName, item.dob));
    }

  }

  AddAddress(item:AddressBook) {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    let itemArray = JSON.parse(<string>this.localStorageGet(STORAGE_NAME))
    if (!this.isEmpty(itemArray)) {
      itemArray.obj.push(item)
      this.localStorageSet(STORAGE_NAME,JSON.stringify(itemArray))
    } else {
      itemArray = {
        "obj": []
      }
      itemArray.obj.push(item)
      this.localStorageSet(STORAGE_NAME,JSON.stringify(itemArray))
    }

    return itemArray['obj'].map((item: AddressBookDTO) => new AddressBook(item.id, item.firstName, item.lastName, item.middleName, item.dob));
  }

  DeleteAddress(id: number) {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    let itemArray = JSON.parse(<string>this.localStorageGet(STORAGE_NAME))
    itemArray.obj= itemArray.obj.filter(function(el: { id: number; }) { return el.id !== id});
    this.localStorageSet(STORAGE_NAME,JSON.stringify(itemArray))
  }

  UpdateAddress(item: AddressBook) {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    let itemArray = JSON.parse(<string>this.localStorageGet(STORAGE_NAME))
    let toUpdate = itemArray.obj.findIndex(((obj: { id: number; }) => obj.id === item.id));
    itemArray.obj[toUpdate].firstName = item.firstName
    itemArray.obj[toUpdate].middleName = item.middleName
    itemArray.obj[toUpdate].lastName = item.lastName
    itemArray.obj[toUpdate].dob = item.dob
    this.localStorageSet(STORAGE_NAME,JSON.stringify(itemArray))
  }

}
