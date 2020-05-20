import { MachineDto, ProjectDto } from '../../api/devToolsApi';
import { subMenuRender } from '../controls/SubMenu';
import { addressesListRender } from './AddressesListRender';

export interface ProjectListProps {
  machines: MachineDto[];
  projects: ProjectDto[];
  parentId: string;
}

export const renderAddressesSubMenu = (
  parentId: string,
  project: ProjectDto,
  machines: MachineDto[]
) => {
  addressesListRender({
    parentId,
    machines,
    addresses: project.addresses,
  });
};

export const projectListRender = ({
  parentId,
  projects,
  machines,
}: ProjectListProps) => {
  const projectItems = projects.map((x) => ({
    title: x.name,
    element: x,
  }));

  subMenuRender({
    items: projectItems,
    parentId: parentId,
    renderItemSubMenu: (parentId: string, element: ProjectDto) =>
      renderAddressesSubMenu(parentId, element, machines),
  });
};
