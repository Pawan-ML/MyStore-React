import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleProduct = () => {

    const params = useParams();

    const [product, setProduct] = useState(null);

    useEffect(() => {
        getProductById();
    },[])

    const getProductById = () => {
        fetch(`http://localhost:8081/products/${params.id}`)
            .then((response) => {
                return response.json()
            }).then((data) => {
                setProduct(data); //setting product state
            }).catch((error) => {
                console.log(error);
            })
    }

    return (
        <>
            {product &&
                <div>
                    <h1>{product.name}</h1>
                    <div>{product.price} LKR</div>
                    <div>Stock: {product.qty}</div>
                </div>
            }
        </>
    )
}

export default SingleProduct;