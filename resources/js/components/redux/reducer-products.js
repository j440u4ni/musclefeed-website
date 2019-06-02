import { constantsProducts } from './constants-products';

const weights = localStorage.getItem('weights');
const perfumes = localStorage.getItem('perfumes');
const categories = localStorage.getItem('categories');
const images = localStorage.getItem('images');
const products = localStorage.getItem('products');

const initial = (weights !== null && perfumes !== null && categories !== null && images !== null && products !== null) ? { weights: weights, perfumes: perfumes, categories: categories, images: images, products: products } 
    : { weights: null, perfumes: null,  categories: null, images: null, products: null };

export function reducerProducts(state = initial, action) {
    switch(action.type) { 
        case constantsProducts.fetchSpecificsSuccess: return { weights: action.weights, perfumes: action.perfumes, categories: action.categories, images: action.images };
        case constantsProducts.fetchSpecificsFailure: return { weights: null, perfumes: null,  categories: null };

        case constantsProducts.addProductImageSuccess: return { ...state, images: action.images };
        case constantsProducts.addProductImageFailure: return { ...state };

        case constantsProducts.deleteProductImageSuccess: return { ...state, images: action.images };
        case constantsProducts.deleteProductImageFailure: return { ...state };

        case constantsProducts.slideshowProductImageSuccess: return { ...state, images: action.images };
        case constantsProducts.slideshowProductImageFailure: return { ...state };

        case constantsProducts.addProductFailure: return { ...state };
        case constantsProducts.addProductSuccess: return { ...state, products: action.products };
        default: return state;
    }
}