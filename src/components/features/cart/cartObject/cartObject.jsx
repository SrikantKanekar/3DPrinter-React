import React from 'react';
import {Link} from "react-router-dom";
import QuantityButton from "../quantityButton/quantityButton";
import style from "./cartObject.module.css"

function CartObject(props) {
    return (
        <div className={style.object}>

            <div className={style.content}>

                <div className={style.image}>
                    <img src={props.object.imageUrl} alt=""/>
                </div>

                <div className={style.description}>
                    <div className={style.name}>
                        <Link to={`/objects/${props.object.id}`}>{props.object.name}</Link>
                    </div>
                    <div className={style.remove}>
                        <a
                            href="/"
                            onClick={e => props.handleCartRemove(e, props.object)}>remove</a>
                    </div>
                </div>
            </div>

            <div className={style.price}><i
                className="fa fa-inr"/> {props.price}
            </div>

            <div className={style.quantity}>
                <QuantityButton
                    object={props.object}
                    handleQuantityIncrease={props.handleQuantityIncrease}
                    handleQuantityDecrease={props.handleQuantityDecrease}
                />
            </div>
        </div>
    );
}

export default CartObject;