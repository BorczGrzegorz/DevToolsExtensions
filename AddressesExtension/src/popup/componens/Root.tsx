import * as React from 'react';
import { getEngine } from '../../engine/engine';
import { Settings } from '../../models/Settings';
import { SETTINGS_KEY } from './../../models/Settings';
import { ProductDto, getProducts } from './../../api/devToolsApi';
import { LoadingPage } from './LoadingPage';
import { ProductSelectionList } from './product-selection/ProductSelectionList';
import { ChangeProductSelection } from './product-selection/ChangeProductSelection';
import { ProjectList } from './projects/ProjectList';

export const Root = () => {
    const [products, setProducts] = React.useState<ProductDto[]>([]);
    const [selectedProduct, setSelectedProduct] = React.useState<ProductDto | null>(null);

    const loadData = async () => {
        const products = await getProducts();
        setProducts(products);
        const settings = await getEngine().getFromStore<Settings | null>(SETTINGS_KEY);
        if (settings && settings.lastSelectedProduct) {
            const selectedProduct = products.find(x => x.name === settings.lastSelectedProduct);
            if (selectedProduct) {
                getEngine().saveInStore<Settings>(SETTINGS_KEY, { ...settings, lastSelectedProduct: selectedProduct.name });
                setSelectedProduct(selectedProduct);
            }
        }
    }


    React.useEffect(() => {
        loadData();
    }, [])

    const onSelectProduct = async (productName: string) => {
        const selectedProduct = products.find(x => x.name === productName) as ProductDto;
        const settings = await getEngine().getFromStore<Settings>(SETTINGS_KEY);
        getEngine().saveInStore<Settings>(SETTINGS_KEY, { ...settings, lastSelectedProduct: selectedProduct.name });
        setSelectedProduct(selectedProduct);
    }

    if (products.length === 0) {
        return <LoadingPage />;
    }

    if (!selectedProduct) {
        return <ProductSelectionList products={products} onSelectProduct={onSelectProduct} />
    }

    return (
        <>
            {products.length !== 0 && <ChangeProductSelection text={selectedProduct.name} onClick={() => setSelectedProduct(null)} />}
            {selectedProduct && <ProjectList product={selectedProduct} />}
        </>
    );
} 