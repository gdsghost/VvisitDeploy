import { v4 as uuidv4 } from 'uuid';

/* Action types */
export const actions = {
    ADD_TO_CART: "ADD_TO_CART",
    UPDATE_CART: "UPDATE_CART",
    REMOVE_FROM_CART: "REMOVE_FROM_CART",
    SAVE_CART: "SAVE_CART",
    RESET_CART: "RESET_CART"
}

/* Action Creators */ 
export function addToCart(item, quantity, add_id, no_travellers,date,checkin,checkout,type,days,totalUnit,number) {
    return {
        type: actions.ADD_TO_CART,
        payload: { id: uuidv4(), quantity: quantity, details: item, add_id:add_id, no_travellers:no_travellers,date:date,checkin:checkin,checkout:checkout,type:type,days:days,totalUnit:totalUnit,number:number}
    }
}

export function updateCart(id, quantity) {
    return {
        type: actions.UPDATE_CART,
        payload: {id: id, quantity: quantity}
    }
}

export function removeFromCart(item) {
    return {
        type: actions.REMOVE_FROM_CART,
        payload: item
    }
}

export function saveCart(items) {
    return {
        type: actions.SAVE_CART,
        payload: { items: items }
    }
}

export function resetCart() {
    return {
        type: actions.RESET_CART,
    }
}



