import { MachineDto, AddressDto } from '../api/devToolsApi';
import { getEngine } from '../engine/engine';

const trimLeft = (address: string) => {
  if (address[0] === '/') {
    return address.substring(1, address.length);
  }

  return address;
};

const trimRight = (address: string) => {
  if (address[address.length - 1] === '/') {
    return address.substring(0, address.length - 1);
  }

  return address;
};

export const openCombinedAddress = (
  machine: MachineDto,
  address: AddressDto
) => {
  const trimmedAddress = trimLeft(address.path);
  const trimedMachine = trimRight(machine.address);
  getEngine().openTab(`${trimedMachine}/${trimmedAddress}`);
};
