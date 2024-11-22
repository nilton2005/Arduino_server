import React, { useState, useEffect } from "react";
import { fetchProducts, updateStock } from "../api/api";
import SearchBar from "../components/SearchBar";
import ProductList from "../components/ProductList";

const Storekeeper = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isOn, setIsOn] = useState(false);

  // Función para cargar productos desde la API
  const loadProducts = async () => {
    try {
      const response = await fetchProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Efecto para cargar productos al iniciar
  useEffect(() => {
    loadProducts();

    // Configuración de polling (cada 5 segundos)
    const interval = setInterval(loadProducts, 5000);

    // Limpia el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, []);

  // Filtrar productos en tiempo real mientras se escribe en la barra de búsqueda
  const handleSearch = (query) => {
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  // Actualizar el stock de un producto
  const handleUpdateStock = async (id, newStock) => {
    try {
      await updateStock(id, newStock);
      setProducts((prev) =>
        prev.map((product) =>
          product.id === id ? { ...product, stock: newStock } : product
        )
      );
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  return (
    <div>
      
      <SearchBar onSearch={handleSearch} />
      <ProductList
        products={filteredProducts.length > 0 ? filteredProducts : products}
        onUpdateStock={handleUpdateStock}
      />
    </div>
  );
};

export default Storekeeper;
