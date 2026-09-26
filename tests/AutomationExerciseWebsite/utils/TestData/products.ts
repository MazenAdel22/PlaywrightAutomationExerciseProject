export type Products = {
    name: string;
    price: number;
    quantity: number;
    category: string;
    availability: string;
    condition: string;
    brand: string;
};

export const productsData = {
    paymentProducts: [
        {
            name: 'Frozen Tops For Kids',
            price: 278,
            quantity: 2,
            category: 'Kids > Tops & Shirts',
            availability: 'In Stock',
            condition: 'New',
            brand: 'Allen Solly Junior'
        },
        {
            name: 'Little Girls Mr. Panda Shirt',
            price: 1200,
            quantity: 1,
            category: 'Kids > Tops & Shirts',
            availability: 'In Stock',
            condition: 'New',
            brand: 'Kookie Kids'
        },
        {
            name: 'Premium Polo T-Shirts',
            price: 1500,
            quantity: 1,
            category: 'Men > Tshirts',
            availability: 'In Stock',
            condition: 'New',
            brand: 'Polo'
        },
        {
            name: 'Regular Fit Straight Jeans',
            price: 1200,
            quantity: 1,
            category: 'Men > Tshirts',
            availability: 'In Stock',
            condition: 'New',
            brand: 'H&M'
        }
    ] satisfies Products[],

        productsDetails: [
        {
            name: 'Winter Top',
            price: 600,
            quantity: 1,
            category: 'Women > Tops',
            availability: 'In Stock',
            condition: 'New',
            brand: 'Mast & Harbour'
        },
        {
            name: 'Fancy Green Top',
            price: 700,
            quantity: 1,
            category: 'Women > Tops',
            availability: 'In Stock',
            condition: 'New',
            brand: 'Polo'
        }
    ] satisfies Products[],

    excludedProducts:
        {
            name: 'Regular Fit Straight Jeans'
        }
    ,

    searchingSelections: {
        searchingProductsCases: [
            {
                testCaseName: 'should return matching products',
                searchingProductName: 'Jeans',
                count: 3,
                shouldHaveResults: true
            },
            {
                testCaseName: 'should return no products for an unknown search',
                searchingProductName: 'NonExistingProduct',
                count: 0,
                shouldHaveResults: false
            },
        ],

        category: {
            name: 'Top',
            title: 'Women - Tops Products',
            count: 6
        },

        brand: {
            name: 'Summer White Top',
            title: 'Brand - H&M Products',
            count: 5
        }
    },

    featureProducts: {
        name: 'Top',
        count: 34
    },

    recommendedItems: {
        name: 'Dress',
        count: 6
    },

    reviewProducts: {
        name: 'Madame Top For Women'
    }

};