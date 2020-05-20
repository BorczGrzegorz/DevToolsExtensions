import { ProductDto } from '../../api/devToolsApi';
import { subMenuRender } from '../controls/SubMenu';
import { projectListRender } from './ProjectListRender';

export interface ProductListProps {
  products: ProductDto[];
  parentId: string;
}

const renderProjectSubMenu = (parentId: string, product: ProductDto) => {
  projectListRender({
    parentId,
    projects: product.projects,
    machines: product.machines,
  });
};

export const productListRender = ({ products, parentId }: ProductListProps) => {
  if (products.length === 1) {
    renderProjectSubMenu(parentId, products[0]);
    return;
  }

  const productItems = products.map((x) => ({
    title: x.name,
    element: x,
  }));

  subMenuRender<ProductDto>({
    parentId,
    items: productItems,
    renderItemSubMenu: renderProjectSubMenu,
  });
};
