"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
  selectCartSubtotal,
  selectDeliveryFee,
  selectCartDiscount,
  selectTotalSavings,
} from "../../store/cartSlice";
import {
  FiShoppingCart,
  FiPlus,
  FiMinus,
  FiTrash2,
  FiArrowLeft,
  FiTag,
  FiPackage,
} from "react-icons/fi";
import Link from "next/link";
import { useLanguage } from "../../contexts/LanguageProvider";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import Image from "next/image";
import { getProductImageUrl } from "../../utils/productImage";

const CartPage = () => {
  const { language, isRTL } = useLanguage();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { items, total, itemCount } = useAppSelector((state) => state.cart);
  const subtotal = useAppSelector(selectCartSubtotal);
  const deliveryFee = useAppSelector(selectDeliveryFee);
  const discount = useAppSelector(selectCartDiscount);
  const savings = useAppSelector(selectTotalSavings);

  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const notify = (
    msgAr: string,
    msgEn: string,
    type: "success" | "error" = "success"
  ) => {
    toast[type](language === "ar" ? msgAr : msgEn);
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(id));
      notify("تم إزالة المنتج من السلة", "Product removed from cart");
    } else {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
    notify("تم إزالة المنتج من السلة", "Product removed from cart");
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    notify("تم إفراغ السلة", "Cart cleared");
    setShowClearConfirm(false);
  };

  const handleCheckout = () => {
    if (!items || items.length === 0) {
      notify("السلة فارغة", "Cart is empty", "error");
      return;
    }
    router.push("/checkout");
  };

  if (items.length === 0) {
    return (
      <div
        className="min-h-screen bg-[#EEEFF1] dark:bg-gray-900 py-16"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="w-32 h-32 mx-auto mb-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <FiShoppingCart className="w-16 h-16 text-gray-400" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {language === "ar" ? "عربة التسوق فارغة" : "Your Cart is Empty"}
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              {language === "ar"
                ? "ابدأ التسوق وأضف بعض المنتجات الرائعة إلى سلة التسوق الخاصة بك"
                : "Start shopping and add some amazing products to your cart"}
            </p>

            <Link
              href="/categories"
              className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800 text-white font-semibold rounded-lg hover:bg-zinc-900 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              {!isRTL && <FiArrowLeft className="w-5 h-5" />}
              {language === "ar" ? "ابدأ التسوق" : "Start Shopping"}
              {isRTL && <FiArrowLeft className="w-5 h-5 rotate-180" />}
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#EEEFF1] dark:bg-gray-900 py-16"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {language === "ar" ? "عربة التسوق" : "Shopping Cart"}
          </h1>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <FiPackage className="w-5 h-5" />
            <span>
              {language === "ar"
                ? `${itemCount} ${itemCount === 1 ? "منتج" : "منتجات"} في السلة`
                : `${itemCount} ${itemCount === 1 ? "item" : "items"} in cart`}
            </span>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center flex-wrap gap-3">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {language === "ar" ? "المنتجات" : "Products"}
                </h2>
                {items.length > 0 && (
                  <button
                    onClick={() => setShowClearConfirm(true)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-2 rounded-lg transition-colors"
                  >
                    <FiTrash2 className="w-4 h-4" />
                    {language === "ar" ? "إفراغ السلة" : "Clear Cart"}
                  </button>
                )}
              </div>

              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <AnimatePresence mode="popLayout">
                  {items.map((item, index) => {
                    const productName =
                      language === "ar"
                        ? item.product?.name || ""
                        : item.product?.nameEn || "";
                    const productDescription =
                      language === "ar"
                        ? item.product?.description
                        : item.product?.descriptionEn;

                    return (
                      <motion.div
                        key={item.product?._id || `item-${index}`}
                        initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: isRTL ? -20 : 20, height: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        layout
                        className="p-6 flex flex-wrap items-center gap-4"
                      >
                        {/* Product Image */}
                        <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden relative">
                          <Image
                            src={getProductImageUrl(item.product)}
                            alt={productName}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-[150px]">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                            {productName}
                          </h3>
                          {productDescription && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-1">
                              {productDescription}
                            </p>
                          )}
                          <p className="text-zinc-700 dark:text-zinc-300 font-semibold mt-1">
                            {Number(item.product?.price || 0).toFixed(2)}{" "}
                            {language === "ar" ? "ج.م" : "EGP"}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item.product?._id || "",
                                (Number(item.quantity) || 0) - 1
                              )
                            }
                            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <FiMinus className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                          </button>

                          <span className="w-10 text-center font-medium text-gray-900 dark:text-white text-lg">
                            {Number(item.quantity) || 0}
                          </span>

                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item.product?._id || "",
                                (Number(item.quantity) || 0) + 1
                              )
                            }
                            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
                            disabled={
                              item.product?.stock !== undefined &&
                              (Number(item.quantity) || 0) >= (Number(item.product.stock) || 0)
                            }
                            aria-label="Increase quantity"
                          >
                            <FiPlus className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                          </button>
                        </div>

                        {/* Price & Remove */}
                        <div className="flex flex-col items-end gap-2 mt-2 sm:mt-0">
                          <div className="text-lg font-bold text-gray-900 dark:text-white">
                            {(
                              (Number(item.product?.price) || 0) *
                              (Number(item.quantity) || 0)
                            ).toFixed(2)}{" "}
                            {language === "ar" ? "ج.م" : "EGP"}
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.product?._id || "")}
                            className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                            aria-label="Remove item"
                          >
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            {/* Savings Banner */}
            {savings > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 flex items-center gap-3"
              >
                <FiTag className="w-6 h-6 text-zinc-600" />
                <div>
                  <p className="font-semibold text-zinc-800 dark:text-zinc-300">
                    {language === "ar" ? "أنت توفر" : "You Save"}
                  </p>
                  <p className="text-2xl font-bold text-zinc-600">
                    {savings.toFixed(2)} {language === "ar" ? "ج.م" : "EGP"}
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-24"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                {language === "ar" ? "ملخص الطلب" : "Order Summary"}
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>
                    {language === "ar" ? "المجموع الفرعي" : "Subtotal"}
                  </span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {(Number(subtotal) || 0).toFixed(2)} {language === "ar" ? "ج.م" : "EGP"}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-zinc-600">
                    <span>{language === "ar" ? "الخصم" : "Discount"}</span>
                    <span className="font-medium">
                      -{(Number(discount) || 0).toFixed(2)} {language === "ar" ? "ج.م" : "EGP"}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>{language === "ar" ? "التوصيل" : "Delivery"}</span>
                  <span
                    className={`font-medium ${deliveryFee === 0 ? "text-zinc-600" : ""}`}
                  >
                    {deliveryFee === 0
                      ? language === "ar"
                        ? "مجاني"
                        : "Free"
                      : `${deliveryFee} ${language === "ar" ? "ج.م" : "EGP"}`}
                  </span>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {language === "ar" ? "الإجمالي" : "Total"}
                    </span>
                    <span className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
                      {(Number(total) || 0).toFixed(2)} {language === "ar" ? "ج.م" : "EGP"}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-zinc-800 text-white font-semibold py-3 rounded-lg hover:bg-zinc-900 transition-all duration-200 mb-4 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {language === "ar" ? "إتمام الطلب" : "Proceed to Checkout"}
              </button>
 
              <Link
                href="/categories"
                className="block text-center text-zinc-600 hover:text-zinc-700 font-medium py-2 hover:bg-zinc-50 dark:hover:bg-zinc-900/20 rounded-lg transition-colors"
              >
                {language === "ar" ? "متابعة التسوق" : "Continue Shopping"}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Clear Cart Modal */}
      <AnimatePresence>
        {showClearConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowClearConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {language === "ar" ? "تأكيد إفراغ السلة" : "Confirm Clear Cart"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {language === "ar"
                  ? "هل أنت متأكد من رغبتك في إفراغ سلة التسوق؟ سيتم حذف جميع المنتجات."
                  : "Are you sure you want to clear your cart? All items will be removed."}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-[#EEEFF1] dark:hover:bg-gray-700 transition-colors"
                >
                  {language === "ar" ? "إلغاء" : "Cancel"}
                </button>
                <button
                  onClick={handleClearCart}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  {language === "ar" ? "إفراغ السلة" : "Clear Cart"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartPage;
