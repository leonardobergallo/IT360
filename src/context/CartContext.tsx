import React, { createContext, useContext, useState } from 'react'; export const CartContext = createContext(); export const useCart = () => useContext(CartContext);
