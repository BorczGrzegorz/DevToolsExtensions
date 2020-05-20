import { AddressDto, MachineDto } from '../../api/devToolsApi';
import { subMenuRender } from '../controls/SubMenu';
import { getEngine } from '../../engine/engine';
import { openCombinedAddress } from '../../common/helpers';

export interface MachineListProps {
  parentId: string;
  machines: MachineDto[];
  address: AddressDto;
}

export const machineListRender = ({
  parentId,
  machines,
  address,
}: MachineListProps) => {
  const machinesItems = machines.map((x) => ({
    title: x.name,
    element: x,
  }));

  subMenuRender({
    items: machinesItems,
    parentId,
    onClickItem: (machine) => {
      openCombinedAddress(machine, address);
    },
  });
};
