(() => {
  const apiUrl =
    "https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json";
  const storageKey = "favoritedProducts";

  const self = {
    init: () => {
      self.buildHTML();
      self.buildCSS();
      self.setEvents();
      self.loadProducts();
    },

    // navbar ve carousel html yapısı
    buildHTML: () => {
      const html = `
       <nav class="navbar">
          <div class="navbar-container">
            <div class="logo" style="margin:16px">
              <img src="./image/lcw_logo.png" alt="LCW">
            </div>
            <div class="search-box">
              <input type="text" placeholder="Ürün, kategori veya marka ara">
              <button>ARA</button>
            </div>
            <div class="navbar-buttons">
              <button>Giriş Yap</button>
              <button>Favorilerim</button>
              <button>Sepetim</button>
            </div>
          </div>
          <div class="menu-bar">
            <button>KADIN</button>
            <button>ERKEK</button>
            <button>ÇOCUK & BEBEK</button>
            <button>AYAKKABI</button>
            <button>AKSESUAR</button>
            <button>EV & YAŞAM</button>
            <button>KOZMETİK KİŞİSEL BAKIM</button>
            <button>TÜM KATEGORİLER</button>
            <button>WAIKIKILAND</button>
            <button class="outlet">OUTLET</button>
          </div>
        </nav>

        <div class="carousel-container">
          <h1>You Might Also Like</h1>
          <div class="carousel-wrapper">
            <button class="arrow left">&lt;</button>
            <div class="carousel">
              <div class="carousel-inner"></div>
            </div>
            <button class="arrow right">&gt;</button>
          </div>
        </div>
      `;
      $(".product-detail").append(html); // html sayfaya eklenir
    },

    // navbar ve carousel css yapısı
    buildCSS: () => {
      const css = `
      .navbar {
          background-color: #fff;
          border-bottom: 1px solid #e5e5e5;
          font-family: 'open Sans', sans-serif;
          padding: 10px 20px;
        }
        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo img {
          height: 40px;
        }
        .search-box {
          
         width: 800px;
          display: flex;
          align-items: center;
          margin: 0 20px;
        }
        .search-box input {
          flex-grow: 1;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px 0 0 4px;
        }
        .search-box button {
          padding: 8px 16px;
          border: none;
          background-color: #007bff;
          color: white;
          border-radius: 0 4px 4px 0;
          cursor: pointer;
        }

        .navbar-buttons {
         display: flex; 
         gap: 0; 
        }
        .navbar-buttons button {
          background: none;
          border: none;
          cursor: pointer;
          margin-left: 15px;
          display: flex;
          align-items: center;
        }
        .navbar-buttons button:after {
          content: '';
          display: block;
          width: 24px;
          height: 24px;
          background-size: cover;
          margin-left: 4px;
        }
        .menu-bar {
          display: flex;
          justify-content: flex-start;
          padding: 10px 0;
          border-top: 1px solid #e5e5e5;
          overflow-x: auto;
        }
        .menu-bar button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 10px 15px;
          white-space: nowrap;
          font-family: 'open Sans', sans-serif;
        }
        .outlet {
          color: red;
        }

        @media (max-width: 768px) {
          .search-box {
            margin: 10px 0;
          }
          .menu-bar {
            flex-wrap: wrap;
          }
        }

        /*Carousel-Container*/

        .carousel-container {
          position: relative;
          width: 100%;
          overflow: hidden;
          background-color: #f9f9f9;
          padding: 20px 0;
          font-family: 'open Sans', sans-serif;
        }
        .carousel-wrapper {
          display: flex;
          align-items: center;
        }
        .carousel {
          display: flex;
          overflow: hidden;
          width: 100%;
        }
        .carousel-inner {
          display: flex;
          transition: transform 0.5s ease;
          width: 100%;
        }
        .carousel-item {
          position: relative; /* Add this to enable absolute positioning of child elements */
          min-width: calc(100% / 6.5);
          box-sizing: border-box;
          padding: 10px;
          text-align: center;
        }
        .carousel-item img {
          width: 100%;
          height: auto;
        }
        .carousel-item .product-info {
          margin-top: 10px;
        }
        .carousel-item .product-name {
          font-size: 14px;
          font-weight: bold;
          color: #555;
        }
        .carousel-item .product-price {
          font-size: 14px;
          color: blue;
        }
        .arrow {
          background-color: #ddd;
          border: none;
          padding: 10px;
          cursor: pointer;
        }
        .arrow.left {
          margin-right: 10px;
        }
        .arrow.right {
          margin-left: 10px;
        }
        .heart {
          position: absolute; /* Position the heart icon absolutely */
          top: 10px; /* Adjust this value to move the icon up or down */
          right: 10px; /* Adjust this value to move the icon left or right */
          cursor: pointer;
          color: #fff;
          font-size: 1.5em;
          display: inline-block;
        }
        .heart.favorited {
          color: blue;
        }
        @media (max-width: 768px) {
          .carousel-item {
            min-width: calc(100% / 3.5);
          }
        }
      `;
      $("<style>").addClass("carousel-style").html(css).appendTo("head"); // css sayfaya eklenir
    },

    // carousel kaydırması, ürün tıklaması (bilgilendirme sayfası), favori ekleme-çıkarma
    setEvents: () => {
      $(".arrow.left").on("click", () => self.moveCarousel(-1));
      $(".arrow.right").on("click", () => self.moveCarousel(1));
      $(".carousel-inner").on("click", ".carousel-item", (e) => {
        const url = $(e.currentTarget).data("url");
        window.open(url, "_blank");
      });
      $(".carousel-inner").on("click", ".heart", (e) => self.toggleFavorite(e));
    },

    // ürünler yüklenir, render edilir
    loadProducts: () => {
      const favorited = JSON.parse(localStorage.getItem(storageKey)) || [];
      $.get(apiUrl, (data) => {
        const products = typeof data === "string" ? JSON.parse(data) : data;
        self.renderProducts(products, favorited);
      });
    },

    renderProducts: (products, favorited) => {
      const inner = $(".carousel-inner");
      inner.empty(); // carousel içeriği temizle
      products.forEach((product) => {
        const isFavorited = favorited.includes(product.id); // ürünün favorilerde kontrolü
        const html = `
          <div class="carousel-item" data-url="${product.url}" data-id="${
          product.id
        }">
            <img src="${product.img}" alt="${product.name}">
            <div class="product-info">
              <div class="product-name">${product.name}</div>
              <div class="product-price">${product.price} TL</div>
            </div>
            <div class="heart ${isFavorited ? "favorited" : ""}">&#10084;</div>
          </div>
        `;
        inner.append(html);
      });
      self.updateCarouselPosition(); //carousel güncelle
    },

    //carousel kaydırma işlevi
    moveCarousel: (direction) => {
      const inner = $(".carousel-inner");
      const itemWidth = $(".carousel-item").outerWidth(true); //carousel genişlik
      const totalItems = $(".carousel-item").length; // toplam ürün sayısı
      const visibleItems = 6.5; //görünen ürün sayısı
      const maxOffset = -(totalItems - visibleItems) * itemWidth; //max kaydırma mesafesi
      let currentOffset = parseInt(inner.css("transform").split(",")[4] || 0); //mevcut kaydırma mesafesi

      currentOffset += direction * itemWidth; // kaydırma yönüne göre günceller // kaydırma hareketi sınır aşmaması için sağ-sol kontrol edilir
      if (currentOffset > 0) {
        currentOffset = 0; //sağ sınırı kontrol et
      } else if (currentOffset < maxOffset) {
        currentOffset = maxOffset; // sol sınırı kontrol et
      }

      inner.css("transform", `translateX(${currentOffset}px)`); //carousel kaydır
    },

    //ürünü favorilere ekle/çıkar
    toggleFavorite: (e) => {
      e.stopPropagation();
      const heart = $(e.currentTarget);
      const productId = heart.closest(".carousel-item").data("id"); //ürün id
      const favorited = JSON.parse(localStorage.getItem(storageKey)) || []; //favori ürünleri al

      if (heart.hasClass("favorited")) {
        heart.removeClass("favorited"); // favori işareti kaldır
        localStorage.setItem(
          storageKey,
          JSON.stringify(favorited.filter((id) => id !== productId)) // id favorilerden kaldırılır
        );
      } else {
        heart.addClass("favorited"); // favori işareti ekle
        favorited.push(productId); // ürün ıd ekle
        localStorage.setItem(storageKey, JSON.stringify(favorited)); //güncelle-kaydet
      }
    },

    //carousel güncelle
    updateCarouselPosition: () => {
      const inner = $(".carousel-inner");
      inner.css("transform", "translateX(0)"); // başlangiç pozisyonuna getir
    },
  };

  self.init();
})();
