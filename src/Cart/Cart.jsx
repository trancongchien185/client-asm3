import React, { useEffect, useState } from "react";

import ListCart from "./Component/ListCart";

import { Link, Redirect } from "react-router-dom";
import CartAPI from "../API/CartAPI";

import convertMoney from "../convertMoney";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";

function Cart(props) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const [total, setTotal] = useState();

  let user = JSON.parse(localStorage.getItem("user"));

  //State dùng để Load dữ liệu từ API

  const [loadData, setLoadData] = useState(false);

  //Hàm này dùng để load dữ liệu từ API
  //Khi người dùng đã đăng nhập
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      if (user) {
        const response = await CartAPI.getCarts("/carts");
        if (isMounted) {
          setCart(response);
          getTotal(response);
        }
      }
    };
    fetchData();
    setLoadData(false);

    return () => {
      isMounted = false;
    };
  }, [loadData, user]);

  //Hàm này dùng để tính tổng tiền carts
  function getTotal(carts) {
    let sub_total = 0;
    carts.map((value) => {
      return (sub_total +=
        parseInt(value.priceProduct) * parseInt(value.quantity));
    });
   
    setTotal(sub_total);
  }

  //Hàm này dùng để truyền xuống cho component con xử và trả ngược dữ liệu lại component cha
  const onDeleteCart = async (productId) => {
    if (user) {
      const response = await CartAPI.deleteToCart(productId);
      if (response) {
        user.cart = response;
        localStorage.setItem("user", JSON.stringify(user));
        setLoadData(true);
        toast.error("Bạn Đã Xóa Hàng Thành Công!");
      }
    }
  };

  //Hàm này dùng để truyền xuống cho component con xử và trả ngược dữ liệu lại component cha
  const onUpdateCount = async (productId, quantity) => {
    if (user) {
      // user đã đăng nhập
      //Sau khi nhận được dữ liệu ở component con truyền lên thì sẽ gọi API xử lý dữ liệu
      const response = await CartAPI.putToCart({ productId, quantity });
      if (response) {
        user.cart = response;
        localStorage.setItem("user", JSON.stringify(user));
        setLoadData(true);
        toast.warning("Bạn Đã Sửa Hàng Thành Công!");
      }
    }
  };

  //Hàm này dùng để redirect đến page checkout
  const [navigate, setNavigate] = useState(false);

  const onCheckout = () => {
    if (!user) {
      toast.error("Vui Lòng Kiểm Tra Lại Đăng Nhập!");
      return;
    }

    if (cart.length === 0) {
      toast.error("Vui Lòng Kiểm Tra Lại Giỏ Hàng!");

      return;
    }

    setNavigate(true);
  };

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="container">
          <section className="py-5 bg-light">
            <div className="container">
              <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
                <div className="col-lg-6">
                  <h1 className="h2 text-uppercase mb-0">Cart</h1>
                </div>
                <div className="col-lg-6 text-lg-right">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb justify-content-lg-end mb-0 px-0">
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Cart
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </section>
          <section className="py-5">
            <h2 className="h5 text-uppercase mb-4">Shopping cart</h2>
            <div className="row">
              <div className="col-lg-8 mb-4 mb-lg-0">
                <ListCart
                  listCart={cart}
                  onDeleteCart={onDeleteCart}
                  onUpdateCount={onUpdateCount}
                />

                <div className="bg-light px-4 py-3">
                  <div className="row align-items-center text-center">
                    <div className="col-md-6 mb-3 mb-md-0 text-md-left">
                      <Link
                        className="btn btn-link p-0 text-dark btn-sm"
                        to={`/shop`}
                      >
                        <i className="fas fa-long-arrow-alt-left mr-2"> </i>
                        Continue shopping
                      </Link>
                    </div>
                    <div className="col-md-6 text-md-right">
                      {navigate && <Redirect to={"/checkout"} />}
                      <span
                        className="btn btn-outline-dark btn-sm"
                        onClick={onCheckout}
                      >
                        Proceed to checkout
                        <i className="fas fa-long-arrow-alt-right ml-2"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card border-0 rounded-0 p-lg-4 bg-light">
                  <div className="card-body">
                    <h5 className="text-uppercase mb-4">Cart total</h5>
                    <ul className="list-unstyled mb-0">
                      <li className="d-flex align-items-center justify-content-between">
                        <strong className="text-uppercase small font-weight-bold">
                          Subtotal
                        </strong>
                        <span className="text-muted small">
                          {convertMoney(total)} VND
                        </span>
                      </li>
                      <li className="border-bottom my-2"></li>
                      <li className="d-flex align-items-center justify-content-between mb-4">
                        <strong className="text-uppercase small font-weight-bold">
                          Total
                        </strong>
                        <span>{convertMoney(total)} VND</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default Cart;
