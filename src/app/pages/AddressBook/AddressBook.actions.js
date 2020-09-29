import {
  LIST_LOAD_REQUEST,
  LIST_LOAD_SUCCESS,
  LIST_LOAD_FAILURE,
} from "./AddressBook.types";
import { AddressServiceImpl } from "../../../domain/usecases/AddressService";
import { AddressRepositoryImpl } from "../../../data/repositories/AddressRepositoryImpl";

export const refreshList = async (dispatch) => {
  dispatch({ type: LIST_LOAD_REQUEST });

  try {
    const todoRepo = new AddressRepositoryImpl();
    const itemService = new AddressServiceImpl(todoRepo);
    const items = await itemService.GetAddress();
    dispatch({ type: LIST_LOAD_SUCCESS, payload: items });
  } catch (error) {
    dispatch({ type: LIST_LOAD_FAILURE, error });
  }
};

export const addAddress = async (payload) => {
  const todoRepo = new AddressRepositoryImpl();
  const itemService = new AddressServiceImpl(todoRepo);

  const items = await itemService.GetAddress();
  let new_id = 1;
  try {
    new_id =
      Math.max.apply(
        Math,
        items.map(function (o) {
          return o.id;
        })
      ) + 1;
    if (new_id === -Infinity) {
      new_id = 1;
    }
  } catch (e) {}

  let params = {
    id: new_id,
    firstName: payload.firstName,
    middleName: payload.middleName,
    lastName: payload.lastName,
    dob: payload.dob
  };
  await itemService.AddAddress(params);
  return { type: LIST_LOAD_SUCCESS, id: new_id, payload };
};

export const deleteAddress = async (id) => {
  try {
    const todoRepo = new AddressRepositoryImpl();
    const todoService = new AddressServiceImpl(todoRepo);
    await todoService.DeleteAddress(id);
  } catch (error) {
    alert(error);
  }
};

export const UpdateAddress = async (todo) => {
  try {
    const todoRepo = new AddressRepositoryImpl();
    const todoService = new AddressServiceImpl(todoRepo);
    await todoService.UpdateAddress(todo);
  } catch (error) {
    alert(error);
  }
};
