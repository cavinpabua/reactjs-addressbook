import { AddressBook } from "../entities/AddressBook";
import { AddressRepository } from "../repositories/AddressRepository";


export class AddressServiceImpl implements AddressRepository {
  itemRepo: AddressRepository;

  constructor(ir: AddressRepository) {
    this.itemRepo = ir;
  }

  async GetAddress(): Promise<AddressBook[]> {
    return this.itemRepo.GetAddress();
  }

  AddAddress(item:AddressBook) {
    if (item.firstName.length > 0)
    return this.itemRepo.AddAddress(item);
  }

  DeleteAddress(id:number) {
    return this.itemRepo.DeleteAddress(id);
  }
  UpdateAddress(item:AddressBook) {
    return this.itemRepo.UpdateAddress(item);
  }
}
