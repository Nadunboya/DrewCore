"use client";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/store";
import Breadcrumb from "../Common/Breadcrumb";
import Billing from "./Billing";

type OrderItem = {
  id: number;
  title: string;
  price: number;
  discountedPrice: number;
  quantity: number;
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
};

const Checkout = () => {
  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [notes, setNotes] = useState("");
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  useEffect(() => {
    setOrderItems(
      cartItems.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        discountedPrice: item.discountedPrice,
        quantity: item.quantity,
        imgs: item.imgs,
      })),
    );
  }, [cartItems]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const draftOrder = {
        items: orderItems.map((item) => ({
          id: item.id,
          name: item.title,
          price: item.discountedPrice,
          quantity: item.quantity,
          subtotal: item.discountedPrice * item.quantity,
        })),
        total: orderItems.reduce(
          (acc, item) => acc + item.discountedPrice * item.quantity,
          0,
        ),
        notes,
      };

      localStorage.setItem("pendingOrder", JSON.stringify(draftOrder));
    }
  }, [notes, orderItems]);

  const updateQuantity = (id: number, quantity: number) => {
    setOrderItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item,
      ),
    );
  };

  const removeItem = (id: number) => {
    setOrderItems((currentItems) =>
      currentItems.filter((item) => item.id !== id),
    );
  };

  const handlePlaceOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (typeof window !== "undefined") {
      const form = event.currentTarget;
      const firstName =
        (
          form.querySelector(
            'input[name="firstName"]',
          ) as HTMLInputElement | null
        )?.value || "";
      const lastName =
        (
          form.querySelector(
            'input[name="lastName"]',
          ) as HTMLInputElement | null
        )?.value || "";

      const countryName =
        (
          form.querySelector(
            'select[name="countryName"]',
          ) as HTMLSelectElement | null
        )?.value || "";
      const address =
        (form.querySelector('input[name="address"]') as HTMLInputElement | null)
          ?.value || "";
      const town =
        (form.querySelector('input[name="town"]') as HTMLInputElement | null)
          ?.value || "";
      const country =
        (form.querySelector('input[name="country"]') as HTMLInputElement | null)
          ?.value || "";
      const phone =
        (form.querySelector('input[name="phone"]') as HTMLInputElement | null)
          ?.value || "";
      const email =
        (form.querySelector('input[name="email"]') as HTMLInputElement | null)
          ?.value || "";

      const finalOrder = {
        items: orderItems.map((item) => ({
          id: item.id,
          name: item.title,
          price: item.discountedPrice,
          quantity: item.quantity,
          subtotal: item.discountedPrice * item.quantity,
        })),
        total: orderItems.reduce(
          (acc, item) => acc + item.discountedPrice * item.quantity,
          0,
        ),
        notes,
        customer: {
          firstName,
          lastName,
          countryName,
          address,
          town,
          country,
          phone,
          email,
        },
        placedAt: new Date().toISOString(),
      };

      localStorage.setItem("placedOrder", JSON.stringify(finalOrder));

      const orderLines = finalOrder.items
        .map(
          (item) =>
            `- ${item.name} x${item.quantity} @ LKR ${item.price} = LKR ${item.subtotal}`,
        )
        .join("\n");

      const message = [
        "New Order Request",
        "",
        `Address: ${finalOrder.customer.address || "N/A"}`,
        `Town/City: ${finalOrder.customer.town || "N/A"}`,
        `Country: ${finalOrder.customer.country || "N/A"}`,
        `Phone: ${finalOrder.customer.phone || "N/A"}`,
        `Email: ${finalOrder.customer.email || "N/A"}`,
        "",
        "Order Items:",
        orderLines || "- No items",
        "",
        `Notes: ${finalOrder.notes || "No notes"}`,
        "",
        `Total: LKR ${finalOrder.total}`,
      ].join("\n");

      const whatsappUrl = `https://wa.me/94775491362?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      setIsOrderPlaced(true);
    }
  };

  return (
    <>
      <Breadcrumb title={"Checkout"} pages={["checkout"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <form onSubmit={handlePlaceOrder}>
            <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-11">
              {/* <!-- checkout left --> */}
              <div className="lg:max-w-[670px] w-full">
                {/* <!-- billing details --> */}
                <Billing />

                {/* <!-- others note box --> */}
                <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5 mt-7.5">
                  <div>
                    <label htmlFor="notes" className="block mb-2.5">
                      Other Notes (optional)
                    </label>

                    <textarea
                      name="notes"
                      id="notes"
                      rows={5}
                      placeholder="Notes about your order, e.g. special notes for delivery."
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full p-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                      value={notes}
                      onChange={(event) => setNotes(event.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* // <!-- checkout right --> */}
              <div className="max-w-[455px] w-full">
                {/* <!-- order list box --> */}
                <div className="bg-white shadow-1 rounded-[10px]">
                  <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
                    <h3 className="font-medium text-xl text-dark">
                      Review Your Order
                    </h3>
                  </div>

                  <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
                    <div className="flex items-center justify-between py-5 border-b border-gray-3">
                      <div>
                        <h4 className="font-medium text-dark">Product</h4>
                      </div>
                      <div>
                        <h4 className="font-medium text-dark text-right">
                          Subtotal
                        </h4>
                      </div>
                    </div>

                    {orderItems.length > 0 ? (
                      orderItems.map((item) => (
                        <div
                          key={item.id}
                          className="py-5 border-b border-gray-3"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <p className="text-dark font-medium">
                                {item.title}
                              </p>
                              <p className="text-sm text-gray-500 mt-1">
                                LKR {item.discountedPrice} each
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-dark">
                                LKR {item.discountedPrice * item.quantity}
                              </p>
                            </div>
                          </div>

                          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                            <label className="text-sm text-dark">
                              Qty
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(event) =>
                                  updateQuantity(
                                    item.id,
                                    Number(event.target.value),
                                  )
                                }
                                className="ml-2 w-20 rounded-md border border-gray-3 px-2 py-1"
                              />
                            </label>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="text-sm text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="py-4 text-sm text-gray-500">
                        Your order is empty. Add items before checkout.
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-5">
                      <div>
                        <p className="font-medium text-lg text-dark">Total</p>
                      </div>
                      <div>
                        <p className="font-medium text-lg text-dark text-right">
                          LKR
                          {orderItems.reduce(
                            (acc, item) =>
                              acc + item.discountedPrice * item.quantity,
                            0,
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5"
                  disabled={orderItems.length === 0}
                >
                  {isOrderPlaced ? "Order Placed" : "Place Order"}
                </button>

                {isOrderPlaced && (
                  <p className="mt-3 text-sm text-green-600">
                    Your order details have been saved and are ready for the
                    next step.
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Checkout;
