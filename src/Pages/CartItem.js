import React from 'react'

function CartItem(props) {
    return (
        <div>
            <ul class="list-group">
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <div class="ms-2 me-auto">
                        {/* item name */}
                        <div class="fw-bold">{props.item.title}</div>
                        {/* item price */}
                        $ {props.item.offerPrice}
                    </div>
                    {/* button to remove item from the cart */}
                    <button
                        onClick={() => {
                            props.handleRemoveCart(props.item);
                        }}
                        class="btn badge bg-danger rounded-pill"
                    >
                        X
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default CartItem