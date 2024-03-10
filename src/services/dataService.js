export async function getUser(){
    const token = JSON.parse(sessionStorage.getItem("token"));
    const cbid = JSON.parse(sessionStorage.getItem("cbid"));

    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    }

    const response = await fetch(`${process.env.REACT_APP_HOST}/users/${cbid}`, requestOptions);
    
    if(!response.ok){
        throw { message: response.statusText, status: response.status }
    }
    
    const data = await response.json();
    return data;
}

export async function getUserOrders(){
    const token = JSON.parse(sessionStorage.getItem("token"));
    const cbid = JSON.parse(sessionStorage.getItem("cbid"));

    const response = await fetch(`${process.env.REACT_APP_HOST}/660/orders?user.id=${cbid}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    });

    if(!response.ok){
        throw { message: response.statusText, status: response.status }
    }

    const data = await response.json();
    return data;
}

export async function createOrders(cartItems, cartTotalAmmount, user){
    const token = JSON.parse(sessionStorage.getItem("token"));
    const cbid = JSON.parse(sessionStorage.getItem("cbid"));

    const order = {
        cartList: cartItems,
        amount_paid: cartTotalAmmount,
        quantity: cartItems.length,
        user: {
            name: user.name,
            email: user.email,
            id: user.id
        }
    }

    const response = await fetch(`${process.env.REACT_APP_HOST}/660/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(order)
    })

    if(!response.ok){
        throw { message: response.statusText, status: response.status }
    }

    const data = await response.json();
    return data;
}