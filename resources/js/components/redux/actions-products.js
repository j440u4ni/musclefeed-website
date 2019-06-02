import React from 'react';
import { constantsProducts } from './constants-products';
import { message } from 'antd';

export function productSpecifics() {
    return (dispatch) => { const token = localStorage.getItem('user-token');
        fetch('https://musclefeed.co/api/v1/product/all-specifics', { method: 'GET', headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization' : 'Bearer ' + token } }) .then((first) => { return first.json(); })
            .then((second) => { 
                if(!second.hasOwnProperty('success')) { dispatch(failure()); }
                else {
                    localStorage.setItem('categories', JSON.stringify(second.categories));
                    localStorage.setItem('weights', JSON.stringify(second.weights));
                    localStorage.setItem('perfumes', JSON.stringify(second.perfumes));
                    localStorage.setItem('images', JSON.stringify(second.images));
                    dispatch(success(JSON.stringify(second.weights), JSON.stringify(second.perfumes), JSON.stringify(second.categories), JSON.stringify(second.images))); 
            }
            });
    };

    function success(weights, perfumes, categories, images) { return { type: constantsProducts.fetchSpecificsSuccess, weights: weights, perfumes: perfumes, categories: categories, images: images }; }
    function failure() { return { type: constantsProducts.fetchSpecificsFailure }; }
}

export function addCategory(name, description, parent, stop) {
    return (dispatch) => { const token = localStorage.getItem('user-token');
        fetch('https://musclefeed.co/api/v1/product/add-category', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization' : 'Bearer ' + token }, body: JSON.stringify({ name, description, parent }) }).then((first) => { return first.json(); })
            .then((second) => {
                if(!second.hasOwnProperty('success')) { dispatch(failure()); stop(); }
                else { dispatch(success()); window.location.reload(); }
            });
    };
    
    function success() { return { type: constantsProducts.addCategorySuccess }; }
    function failure() { return { type: constantsProducts.addCategoryFailure }; }
}
export function addPerfume(name, description, stop) {
    return (dispatch) => { const token = localStorage.getItem('user-token');
        fetch('https://musclefeed.co/api/v1/product/add-perfume', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization' : 'Bearer ' + token }, body: JSON.stringify({ name, description }) }).then((first) => { return first.json(); })
            .then((second) => {
                if(!second.hasOwnProperty('success')) { dispatch(failure()); stop(); }
                else { dispatch(success()); window.location.reload(); }
            });
    };
    function success() { return { type: constantsProducts.addPerfumeSuccess }; }
    function failure() { return { type: constantsProducts.addPerfumeFailure }; }
}
export function addWeight(name, weight, stop) {
    return (dispatch) => { const token = localStorage.getItem('user-token');
        fetch('https://musclefeed.co/api/v1/product/add-weight', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization' : 'Bearer ' + token }, body: JSON.stringify({ name: name, value: weight }) }).then((first) => { return first.json(); })
            .then((second) => { 
                if(!second.hasOwnProperty('success')) { dispatch(failure()); stop(); }
                else { dispatch(success()); window.location.reload(); }
            });
    };

    function success() { return { type: constantsProducts.addWeightSuccess }; }
    function failure() { return { type: constantsProducts.addWeightFailure }; }
}
export function addImage(image, stop) {
    return (dispatch) => {  const token = localStorage.getItem('user-token'); 
        fetch('https://musclefeed.co/api/v1/product/add-image', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization' : 'Bearer ' + token }, body: JSON.stringify({ image }) }).then((first) => { return first.json(); })
            .then((second) => { 
                if(!second.hasOwnProperty('success')) { dispatch(failure()); message.warn(<span className="button-text">Format image erronée.</span>); stop(); }
                else { dispatch(success(JSON.stringify(second.images))); localStorage.setItem('images', JSON.stringify(second.images)); window.location.reload(); }
            });
    };

    function success(images) { return { type: constantsProducts.addProductImageSuccess, images }; }
    function failure() { return { type: constantsProducts.addProductImageFailure }; }
}
export function deleteImage(id) {
    return (dispatch) => { const token = localStorage.getItem('user-token');
        fetch('https://musclefeed.co/api/v1/product/delete-image', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization' : 'Bearer ' + token }, body: JSON.stringify({ id }) }).then((first) => { return first.json(); })
            .then((second) => {
                if(!second.hasOwnProperty('success')) { dispatch(failure()); message.error(<span className="button-text">Suppression erronée</span>); window.location.reload(); }
                else { dispatch(success(JSON.stringify(second.images))); localStorage.setItem('images', JSON.stringify(second.images)); window.location.reload(); }
            });
    }

    function success(images) { return { type: constantsProducts.deleteProductImageSuccess, images }; }
    function failure() { return { type: constantsProducts.deleteProductImageFailure }; }
}
export function slideshowImage(id) {
    return (dispatch) => { const token = localStorage.getItem('user-token');
        fetch('https://musclefeed.co/api/v1/product/slideshow-image', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization' : 'Bearer ' + token }, body: JSON.stringify({ id }) }).then((first) => { return first.json(); })
            .then((second) => {
                if(!second.hasOwnProperty('success')) { dispatch(failure()); message.error(<span className="button-text">Impossible de changer</span>); window.location.reload(); }
                else { dispatch(success(JSON.stringify(second.images))); localStorage.setItem('images', JSON.stringify(second.images)); window.location.reload(); }
            });
    }

    function success(images) { return { type: constantsProducts.slideshowProductImageSuccess, images }; }
    function failure() { return { type: constantsProducts.slideshowProductImageFailure }; }
}