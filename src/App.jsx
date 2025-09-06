import React, { useState } from 'react';
import "./main";

// ProductCard component
const ProductCard = () => {
  return (
    <div className="border p-4 rounded-lg w-[220px] shadow-sm bg-white text-center hover:scale-[1.02] transition">
      <img
        src=".Tushenka.png" // O'zgartirildi
        alt="Конина тушеная Улан"
        className="mb-3 w-full h-auto"
      />
      <h3 className="text-sm font-medium mb-1">
        Конина тушеная Улан, есть возможность в 2 строки
      </h3>
      <p className="text-green-600 text-sm">
        В наличии: <span className="font-bold">11 шт.</span>
      </p>
      <p className="text-gray-600 text-sm mb-2">Вес: 130гр</p>
      <div className="mb-3">
        <span className="line-through text-gray-400 mr-2 text-sm">
          28 030 тг.
        </span>
        <span className="text-red-600 font-bold text-base">
          24 320 тг.
        </span>
      </div>
      <button className="bg-green-500 hover:bg-green-600 w-full text-white py-2 rounded text-sm">
        В корзину
      </button>
    </div>
  );
};

// ProductCardWithCounter component
const ProductCardWithCounter = () => {
  const [count, setCount] = useState(1);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count > 1 ? count - 1 : 1);

  return (
    <div className="border p-4 rounded-lg w-[220px] shadow-sm bg-white text-center hover:scale-[1.02] transition">
      <img
        src="/Tushenka.png" // O'zgartirildi
        alt="Конина тушеная Улан"
        className="mb-3 w-full h-auto"
      />
      <h3 className="text-sm font-medium mb-1">
        Конина тушеная Улан, есть возможность в 2 строки
      </h3>
      <p className="text-green-600 text-sm">
        В наличии: <span className="font-bold">11 шт.</span>
      </p>
      <p className="text-gray-600 text-sm mb-2">Вес: 130гр</p>
      <div className="mb-3">
        <span className="line-through text-gray-400 mr-2 text-sm">
          28 030 тг.
        </span>
        <span className="text-red-600 font-bold text-base">
          24 320 тг.
        </span>
      </div>
      <div className="flex items-center border rounded overflow-hidden">
        <button
          onClick={decrement}
          className="px-3 py-2 text-green-600 text-lg font-bold border-r"
        >
          −
        </button>
        <span className="px-4 py-2">{count}</span>
        <button
          onClick={increment}
          className="px-3 py-2 text-green-600 text-lg font-bold border-l"
        >
          +
        </button>
      </div>
    </div>
  );
};

// ProductSection component
const ProductSection = ({ title, showCounter = false }) => {
  return (
    <section className="mb-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <a href="#" className="text-green-600 text-sm">Смотреть все</a>
      </div>
      <div className="flex flex-wrap gap-5">
        {Array.from({ length: 8 }).map((_, idx) => (
          showCounter ? (
            <ProductCardWithCounter key={idx} />
          ) : (
            <ProductCard key={idx} />
          )
        ))}
      </div>
    </section>
  );
};

// Cart component
const Cart = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "МФК1: шоколадные конфеты", weight: "120гр", remaining: "2 кг", price: 24320, quantity: 1 },
    { id: 2, name: "МФК2: шоколадные конфеты", weight: "120гр", remaining: "2 кг", price: 24320, quantity: 1 },
    { id: 3, name: "МФК3: шоколадные конфеты", weight: "130гр", remaining: "2 кг", price: 24320, quantity: 1 }
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const deliveryCost = 1500;
  const minOrderAmount = 4000;

  const applyPromo = () => {
    if (promoCode === "PROMO3000") {
      setPromoDiscount(3000);
    } else {
      setPromoDiscount(0);
      alert("Недействительный промокод");
    }
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setProducts(products.map(product => 
      product.id === id ? {...product, quantity: newQuantity} : product
    ));
  };

  const removeProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const totalUnits = products.reduce((sum, product) => sum + product.quantity, 0);
  const totalWeight = products.reduce((sum, product) => {
    const weight = parseInt(product.weight);
    return sum + (weight * product.quantity);
  }, 0);
  
  const subtotal = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  const total = subtotal - promoDiscount + deliveryCost;

  return (
    <div className="cart-container">
      <h1>Корзина</h1>
      
      <div className="cart-content">
        <div className="products-section">
          {products.map(product => (
            <div key={product.id} className="product-item">
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.weight}</p>
                <p>Осталось {product.remaining}</p>
              </div>
              <div className="product-controls">
                <div className="quantity-control">
                  <button onClick={() => updateQuantity(product.id, product.quantity - 1)}>-</button>
                  <span>{product.quantity}</span>
                  <button onClick={() => updateQuantity(product.id, product.quantity + 1)}>+</button>
                </div>
                <div className="product-price">{product.price.toLocaleString()} тг.</div>
                <button className="remove-btn" onClick={() => removeProduct(product.id)}>Удалить</button>
              </div>
            </div>
          ))}
          
          <div className="promotions-section">
            <h2>Свежие акции</h2>
            <div className="promotion-item">
              <img src="/Tushenka.png" alt="Конная тушеная Улан" className="promotion-image" /> {/* Qo'shildi */}
              <h3>Конная тушеная Улан, есть возможность в 2 строки</h3>
              <p>В наличие: 11 кг.</p>
              <p>Все: 130гр</p>
              <div className="price-section">
                <span className="price">24 320 тг.</span>
                <button className="add-to-cart-btn">В корзину</button>
              </div>
            </div>
            
            <div className="promotion-item">
              <img src="/Tushenka.png" alt="Конная тушеная Улан" className="promotion-image" /> {/* Qo'shildi */}
              <h3>Конная тушеная Улан, есть возможность в 2 строки</h3>
              <p>В наличие: 11 кг.</p>
              <p>Все: 130гр</p>
              <div className="price-section">
                <span className="price">24 320 тг.</span>
                <button className="add-to-cart-btn">В корзину</button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="order-summary">
          <h2>Оформить заказ</h2>
          
          <div className="promo-section">
            <h3>Использовать промокод</h3>
            <div className="promo-input">
              <input 
                type="text" 
                value={promoCode} 
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Введите промокод"
              />
              <button onClick={applyPromo}>Применить</button>
            </div>
          </div>
          
          <div className="summary-details">
            <div className="summary-row">
              <span>Количество единиц</span>
              <span>{totalUnits}</span>
            </div>
            <div className="summary-row">
              <span>Итоговый вес</span>
              <span>{totalWeight} г.</span>
            </div>
            <div className="summary-row">
              <span>Тип заказа</span>
              <span>бандероль</span>
            </div>
            <div className="summary-row">
              <span>Сумма заказа</span>
              <span>{subtotal.toLocaleString()} тг.</span>
            </div>
            {promoDiscount > 0 && (
              <div className="summary-row discount">
                <span>Промокод</span>
                <span>-{promoDiscount.toLocaleString()} тг.</span>
              </div>
            )}
            <div className="summary-row">
              <span>Стоимость доставки</span>
              <span>{deliveryCost.toLocaleString()} тг.</span>
            </div>
            
            <div className="summary-total">
              <span>Итого:</span>
              <span>{total.toLocaleString()} тг.</span>
            </div>
          </div>
          
          <p className="min-order">Минимальная сумма заказа: {minOrderAmount.toLocaleString()} тг.</p>
          
          <button className="checkout-btn">Перейти к оформлению</button>
        </div>
      </div>
      
      <div className="footer-section">
        <div className="view-all">
          <h2>Смотреть все</h2>
          <div className="promotion-item">
            <img src="/Tushenka.png" alt="Конная тушеная Улан" className="promotion-image" /> {/* Qo'shildi */}
            <h3>Конная тушеная Улан, есть возможность в 2 строки</h3>
            <p>В наличие: 11 кг.</p>
            <p>Все: 130гр</p>
            <div className="price-section">
              <span className="price">24 320 тг.</span>
              <button className="add-to-cart-btn">В корзину</button>
            </div>
          </div>
        </div>
        
        <div className="company-info">
          <h2>О компании</h2>
          <ul>
            <li>Вопрос-Ответ</li>
            <li>Новости</li>
            <li>Контакты</li>
            <li>Пополнение баланса</li>
          </ul>
          
          <div className="contact-numbers">
            <p>8 800 000 50 11</p>
            <p>8 727 225 50 11</p>
          </div>
          
          <div className="footer-bottom">
            <p>2003 © Convent</p>
            <div className="footer-links">
              <a href="#">Памятка комфортация/комиссии</a>
              <a href="#">Публичная оферта</a>
              <a href="#">Условия интервала</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App component
const App = () => {
  const [cartCount, setCartCount] = useState(12);
  const [cartWeight, setCartWeight] = useState(2400);

  const newProducts = [
    { 
      name: "Конина тушеная Улан, есть возможность в 2 строки", 
      stock: 11, 
      weight: 130, 
      price: 24320,
      image: "/Tushenka.png" // Qo'shildi
    },
    { 
      name: "Конина тушеная Улан, есть возможность в 2 строки", 
      stock: 11, 
      weight: 130, 
      price: 24320,
      image: "/Tushenka.png" // Qo'shildi
    },
    { 
      name: "Конина тушеная Улан, есть возможность в 2 строки", 
      stock: 11, 
      weight: 130, 
      price: 24320,
      image: "/Tushenka.png" // Qo'shildi
    },
    { 
      name: "Конина тушеная Улан, есть возможность в 2 строки", 
      stock: 11, 
      weight: 130, 
      price: 24320,
      image: "/Tushenka.png" // Qo'shildi
    },
    { 
      name: "Конина тушеная Улан, есть возможность в 2 строки", 
      stock: 11, 
      weight: 130, 
      price: 24320,
      image: "/Tushenka.png" // Qo'shildi
    },
  ];

  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex space-x-6">
              <a href="#" className="text-gray-800 hover:text-blue-600 font-medium">Продукты</a>
              <a href="#" className="text-gray-800 hover:text-blue-600 font-medium">Еда быстрого приготовления</a>
              <a href="#" className="text-gray-800 hover:text-blue-600 font-medium">Консервы</a>
              <a href="#" className="text-gray-800 hover:text-blue-600 font-medium">Напитки</a>
              <a href="#" className="text-gray-800 hover:text-blue-600 font-medium">Бытовая химия</a>
              <a href="#" className="text-gray-800 hover:text-blue-600 font-medium">Уход за собой</a>
              <a href="#" className="text-gray-800 hover:text-blue-600 font-medium">Еще</a>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-800 font-medium">Корзина</span>
              <span className="bg-blue-600 text-white rounded-full px-2 py-1 text-xs font-bold">
                {cartCount}
              </span>
              <span className="text-gray-600 text-sm">{cartWeight} г.</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="max-w-lg">
            <h2 className="text-3xl font-bold mb-4">Всегда свежие молочные продукты</h2>
            <p className="mb-6">Только качественные товары, за которыми мы всегда следим</p>
            <button className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-md hover:bg-blue-100 transition duration-300">
              Подробнее
            </button>
          </div>
          <div className="hidden md:block">
            {/* Rasm qo'shildi */}
            <img 
              src="/Tushenka.png" 
              alt="Молочные продукты" 
              className="w-64 h-64 object-cover rounded-full"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 rounded-lg hover:bg-gray-100 cursor-pointer transition duration-300">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <img src="/Tushenka.png" alt="Горячие блюда" className="w-8 h-8 object-cover" /> {/* O'zgartirildi */}
              </div>
              <h3 className="font-semibold">Горячие блюда</h3>
              <p className="text-sm text-gray-600 mt-1">Вкуснейшие блюда из 4 ресторанов</p>
            </div>
            
            <div className="text-center p-4 rounded-lg hover:bg-gray-100 cursor-pointer transition duration-300">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <img src="/Tushenka.png" alt="Новички" className="w-8 h-8 object-cover" /> {/* O'zgartirildi */}
              </div>
              <h3 className="font-semibold">Новички</h3>
              <p className="text-sm text-gray-600 mt-1">Новые позиции</p>
            </div>
            
            <div className="text-center p-4 rounded-lg hover:bg-gray-100 cursor-pointer transition duration-300">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <img src="/Tushenka.png" alt="Акции" className="w-8 h-8 object-cover" /> {/* O'zgartirildi */}
              </div>
              <h3 className="font-semibold">Акции</h3>
              <p className="text-sm text-gray-600 mt-1">Лучшие цены</p>
            </div>
            
            <div className="text-center p-4 rounded-lg hover:bg-gray-100 cursor-pointer transition duration-300">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <img src="/Tushenka.png" alt="Комплекты" className="w-8 h-8 object-cover" /> {/* O'zgartirildi */}
              </div>
              <h3 className="font-semibold">Комплекты</h3>
              <p className="text-sm text-gray-600 mt-1">Все в одном</p>
            </div>
          </div>
        </div>
      </section>

      {/* New Products */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8"># Новинки</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {newProducts.map((product, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                {/* Rasm qo'shildi */}
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium text-gray-800 mb-2 h-12 overflow-hidden">{product.name}</h3>
                  <div className="flex justify-between text-sm text-gray-600 mb-3">
                    <span>В наличии: {product.stock} шт.</span>
                    <span>Вес: {product.weight}гр</span>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="font-bold text-lg">{product.price.toLocaleString('ru-RU')} тг.</span>
                    <button 
                      onClick={addToCart}
                      className="bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                      В корзину
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <button className="border border-blue-600 text-blue-600 font-medium py-2 px-6 rounded-md hover:bg-blue-600 hover:text-white transition duration-300">
              Смотреть все
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Информация</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">О компании</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Вопрос-Ответ</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Новости</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Контакты</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Пополнение баланса</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Правовая информация</h3>
              <ul className="space-y-2">
                <li><span className="text-gray-300">2019 © Convex</span></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Политика конфиденциальности</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Публичная оферта</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Условия возврата</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Контакты</h3>
              <p className="text-gray-300 mb-2">Бесплатно по Казахстану</p>
              <p className="text-xl font-medium mb-1">8 800 080 50 11</p>
              <p className="text-xl font-medium">8 727 225 50 11</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Export only the main App component
export default App;