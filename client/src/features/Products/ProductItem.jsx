import * as React from "react";
import { Rating } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDeleteProduct } from "./useDelete";
import { useRecoilValue } from "recoil";
import { authAtom } from "../../atoms/authAtom";
import { useAddCart } from "../Cart/useAddCart";
import { useCart } from "../Cart/useCart";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

export default function ProductItem({ product }) {
  const { isAuthenticated, user } = useRecoilValue(authAtom);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { deleteProduct } = useDeleteProduct();
  const { addToCart, isPending: addingToCart } = useAddCart();
  const { cart } = useCart();
  const { title, description, price, imageUrl, ratings, id } = product;
  const totalRating = ratings.reduce((acc, curr) => acc + curr.rating, 0);
  const avgRating =
    ratings.length > 0 ? Number(totalRating / ratings.length).toFixed(1) : 0;
  console.log(cart);
  const onDeleteHandler = () => {
    if (confirm("Are you sure you want to delete")) {
      deleteProduct(id);
    }
  };
  const addToCartHandler = () => {
    if (!isAuthenticated) return navigate("/auth");
    const body = {
      productId: id,
      cartId: cart?.id,
    };
    console.log(body);
    addToCart(body);
  };
  return (
    <Card>
      <Link to={`/products/${id}`}>
        <Card.Img height={400} variant="top" src={imageUrl} />
      </Link>

      <Card.Body>
        <Link to={`/products/${id}`}>
          <Card.Title>
            {title.length > 50 ? title.slice(0, 50) + "...." : title}
          </Card.Title>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <Rating
            name="read-only"
            value={+avgRating}
            readOnly
            precision={0.5}
          />
          <span>{avgRating}</span>
        </div>
        <p>
          Price: {price} <stroke></stroke>
        </p>
        <Card.Text>
          {description.length > 100
            ? description.slice(0, 100) + "...."
            : description}
        </Card.Text>
        <Card.Footer>
          {pathname !== "/admin" && (
            <Button
              disabled={addingToCart}
              onClick={addToCartHandler}
              variant="primary"
            >
              Add to cart
            </Button>
          )}
          {pathname === "/admin" && (
            <div style={{ display: "flex", gap: "5px" }}>
              <Button variant="danger" onClick={onDeleteHandler}>
                <FaTrashAlt />
              </Button>
              <Link to={`/products/${id}/edit`}>
                <Button variant="info">
                  <FaPencilAlt />
                </Button>
              </Link>
            </div>
          )}
        </Card.Footer>
      </Card.Body>
    </Card>
  );
}
