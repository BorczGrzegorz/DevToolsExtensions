import { MachineDto, AddressDto } from '../../api/devToolsApi';
import { subMenuRender } from '../controls/SubMenu';
import { machineListRender } from './MachineListRender';
import { getEngine } from '../../engine/engine';

export interface AddressesListRender {
  machines: MachineDto[];
  addresses: AddressDto[];
  parentId: string;
}

export const addressesListRender = ({
  machines,
  addresses,
  parentId,
}: AddressesListRender) => {
  const addressesItems = addresses.map((x) => ({
    title: x.name,
    element: x,
  }));

  subMenuRender({
    parentId,
    items: addressesItems,
    onClickItem: (address) => {
      if (!address.isSingleUrl) {
        return;
      }

      getEngine().openTab(address.path);
    },
    renderItemSubMenu: (parentId, address) => {
      if (address.isSingleUrl) {
        return;
      }

      machineListRender({
        parentId,
        machines,
        address,
      });
    },
  });
};
