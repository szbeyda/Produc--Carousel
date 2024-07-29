# Ürün Karuseli Projesi

Bu proje, ürünleri sergileyen ve favorilere ekleyebileceğiniz bir karusel bileşeni içerir. Proje, modern web teknolojileri kullanılarak geliştirilmiştir ve kullanıcıların ürünleri kolayca görüntülemesini sağlar.

## Özellikler

- **Responsive Tasarım**: Karusel, masaüstü, tablet ve mobil cihazlarda uyumlu bir şekilde çalışır.
- **Favori İşlevselliği**: Kullanıcılar ürünleri favorilere ekleyebilir ve favori ürünlerini yerel depolama aracılığıyla saklayabilir.
- **Ürün Detayları**: Kullanıcılar ürünleri tıklayarak detaylı sayfalara yönlendirilir.

## Kullanım

1. **HTML ve CSS Yapısı**:

   - Karusel ve navbar bileşenleri HTML ve CSS ile yapılandırılmıştır.
   - Karusel öğeleri responsive bir şekilde tasarlanmıştır.

2. **JavaScript İşlevselliği**:
   - **`self.init()`**: Projeyi başlatır, HTML ve CSS oluşturur, etkinlikleri ayarlar ve ürünleri yükler.
   - **`self.buildHTML()`**: HTML yapısını oluşturur ve sayfaya ekler.
   - **`self.buildCSS()`**: Karuselin ve navbar'ın stilini tanımlar.
   - **`self.setEvents()`**: Etkinlik dinleyicilerini ayarlar (örneğin, buton tıklamaları).
   - **`self.loadProducts()`**: Ürünleri API'den yükler ve render eder.
   - **`self.renderProducts()`**: Ürünleri karuselde görüntüler ve favori durumlarını ayarlar.
   - **`self.moveCarousel()`**: Karuseli sağa veya sola kaydırır.
   - **`self.toggleFavorite()`**: Ürünleri favorilere ekler veya favori işaretini kaldırır.
   - **`self.updateCarouselPosition()`**: Karuselin pozisyonunu günceller.

## Kurulum

1. **HTML, CSS ve JavaScript Dosyalarını Ekleyin**:

   - HTML yapısını ve CSS stillerini uygun dosyalara ekleyin.
   - JavaScript kodunu bir dosyaya kaydedin ve HTML belgesine bağlayın.

2. **API URL'sini Kontrol Edin**:
   - Ürünleri almak için kullanılan API URL'sinin doğru olduğundan emin olun.
