import React, {Component} from 'react';
import objectService from "../../../../services/objectService";
import {Link} from "react-router-dom";
import "./objects.css"
import cart from "../../../../services/cartService";
import {toast} from "react-toastify";

class Objects extends Component {
    state = {
        objects: []
    }

    async componentDidMount() {
        const {data: objects} = await objectService.getAll()
        this.setState({objects})
    }

    handleAddToCart = async (e, object) => {
        e.preventDefault()
        try {
            await cart.add(object.id)
            const objects = [...this.state.objects]
            const index = objects.indexOf(object)
            objects[index].status = "CART"
            this.setState({objects})
        }
        catch (e){
            toast.dark(e.message)
        }
    }

    render() {
        const objects = this.state.objects
        const {length: count} = objects

        return (
            <div className="container">
                <div className="row">
                    <div className="col">

                        <div className="sorting_bar">
                            <div className="results">Showing <span>{count}</span> objects</div>

                            {count && (
                                <div className="sorting_container">
                                    <ul className="sorting">
                                        <li>
                                            <span className="sorting_text">Sort by</span>
                                            <i className="fa fa-chevron-down" aria-hidden="true"/>
                                            <ul>
                                                <li className="sorting_button"
                                                    data-isotope-option='{ "sortBy": "original-order" }'>
                                                    <span>Date</span>
                                                </li>
                                                <li className="sorting_button"
                                                    data-isotope-option='{ "sortBy": "status" }'>
                                                    <span>Status</span>
                                                </li>
                                                <li className="sorting_button"
                                                    data-isotope-option='{ "sortBy": "name" }'>
                                                    <span>Name</span>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {count && (
                    <div className="row">
                        {objects.map(object =>
                            <div className="col-3 product" key={object.id}>
                                <div className="product_image">
                                    <img src={object.imageUrl} alt=""/>
                                </div>
                                <div className="product_content">
                                    <div className="product_title">
                                        <Link to={`/objects/${object.id}`}>{object.name}</Link>
                                    </div>

                                    {!object.slicingDetails.uptoDate && (
                                        <div className="slicing_pending">
                                            Slicing pending
                                        </div>
                                    )}

                                    {object.slicingDetails.uptoDate && object.status === "NONE" && (
                                        <div className="slicing_done">
                                            <div className="add_to_cart">
                                                <a href="/" onClick={e => this.handleAddToCart(e, object)}>
                                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                                                         x="0px" y="0px"
                                                         viewBox="0 0 489 489"
                                                        //style="enable-background: new 00 489 489;"
                                                         xmlSpace="preserve">
                                                        <g>
                                                            <path d="M440.1,422.7l-28-315.3c-0.6-7-6.5-12.3-13.4-12.3h-57.6C340.3,42.5,297.3,0,244.5,0s-95.8,42.5-96.6,95.1H90.3
                                                                    c-7,0-12.8,5.3-13.4,12.3l-28,315.3c0,0.4-0.1,0.8-0.1,1.2c0,35.9,32.9,65.1,73.4,65.1h244.6c40.5,0,73.4-29.2,73.4-65.1
                                                                    C440.2,423.5,440.2,423.1,440.1,422.7z M244.5,27c37.9,0,68.8,30.4,69.6,68.1H174.9C175.7,57.4,206.6,27,244.5,27z M366.8,462
                                                                    H122.2c-25.4,0-46-16.8-46.4-37.5l26.8-302.3h45.2v41c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5v-41h139.3v41
                                                                    c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5v-41h45.2l26.9,302.3C412.8,445.2,392.1,462,366.8,462z"/>
                                                        </g>
                                                    </svg>
                                                </a>
                                            </div>
                                            <div className="price">
                                                <i className="fa fa-inr"/><span>{object.slicingDetails.totalPrice}</span>
                                            </div>
                                        </div>
                                    )}

                                    {object.status !== "NONE" && (
                                        <div className="status_cart">
                                            {object.status}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }
}

export default Objects;