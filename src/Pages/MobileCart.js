import React from 'react'

function MobileCart(props) {
    return (
        <div class="col mb-5">
            <div class="card h-100">
                {/* sale badge */}
                <div class="badge bg-white text-dark position-absolute sale">Sale</div>
                {/* image */}
                <img class="card-img-top" src={props.productData.img} alt="..." />
                {/* product details */}
                <div class="card-body p-4">
                    <div class="text-center">
                        <p class="fw-bolder title">{props.productData.title}</p>
                        {/* strike the price */}
                        <div>Original price:
                            <span class="text-muted text-decoration-line-through">{props.productData.price}</span><br></br>
                            <span><strong>Offer price: {props.productData.offerPrice} </strong></span>
                        </div>

                    </div>
                </div>
                {/* button */}
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center">
                        <button
                            // disabled={props.cartItems.some(obj => obj.id === props.productData.id)}
                            class="btn btn-outline-dark mt-auto" onClick={()=>props.handleCart(props.productData)}>Add Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MobileCart