import React, { useState, useEffect } from 'react';
import styles from './block1.module.css';
import { RiDeleteBinLine } from 'react-icons/ri'


function Block1() {
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [products, setProducts] = useState([]);
    const [inputValue, setInputValue] = useState(1);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleChange = (event) => {
        setInputValue(parseFloat(event.target.value))
      };

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, []);

  const handleQuantityChange = (productName, change) => {
    const existingProductIndex = products.findIndex(product => product.productName === productName);
    if (existingProductIndex !== -1) {
      const updatedProducts = [...products];
      updatedProducts[existingProductIndex].quantity += change;
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      setProducts(updatedProducts);
    }
  };

  const handleAddProduct = () => {
    const newProduct = { productName, quantity: parseInt(quantity) };
    const updatedProducts = [...products, newProduct];
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
    setProductName('');
    setQuantity('');
  };
  const handleDeleteProduct = (productName) => {
    const updatedProducts = products.filter(product => product.productName !== productName);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  return (
    <div className={styles.Block1}>
      <div className={styles.addT}>
        <input
          className={styles.inputN}
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Product Name"
        />
        <input
          className={styles.inputQ}
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
        />
        <button className={styles.button} onClick={handleAddProduct}>Add</button>
      </div>
      <h2 className={styles.inv}>Product inventory:</h2>
      <div className={styles.productsList}>
        {products.map((product, index) => (
          <div className={styles.product} key={index} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}>
            {hoveredIndex === index && (
                <button className={styles.btn} onClick={() => handleDeleteProduct(product.productName)} style={{ background: 'transparent', border: 'none' }}><RiDeleteBinLine /></button>
            )}
            <span>{product.productName}: {product.quantity}</span>
            <button className={styles.menos} onClick={() => handleQuantityChange(product.productName, parseFloat(-inputValue))}>-</button>
            <button className={styles.mais} onClick={() => handleQuantityChange(product.productName, parseFloat(inputValue))}>+</button>
            <input className={styles.inputA} value={inputValue} onChange={handleChange} type='number'/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Block1;