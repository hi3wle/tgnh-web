# Các thay đổi so với bản bàn giao 4252ffb

Mốc đối chiếu: [4252ffb6e7d1d6a33526fc83f09c396e6b62ab03](https://github.com/hi3wle/tgnh-web/commit/4252ffb6e7d1d6a33526fc83f09c396e6b62ab03).
Danh sách dưới đây bao gồm cập nhật toàn trang và phần card dùng chung.
Bản bàn giao vẫn là HTML/CSS/JavaScript tĩnh, mở trực tiếp bằng index.html.

## 1. Header và navigation mobile

- Thanh chào cao 37px; hàng menu/logo/giỏ hàng cao 64px; hàng tìm kiếm cao 58px.
- Padding hai bên header mobile là 12px.
- Cập nhật logo, icon menu/giỏ hàng và cách bố trí tìm kiếm theo design mobile.
- Ẩn navigation ngang cũ ở mobile; thay bằng sidebar mở từ trái khi bấm hamburger.
- Sidebar có màn danh mục và các menu con, nút quay lại/đóng, backdrop, Escape và xử lý focus.
- Cập nhật hiệu ứng header khi cuộn xuống/lên; giữ khoảng trống để nội dung không nhảy khi header chuyển sang fixed.

## 2. Hero banner

- Thay banner Dấu ấn độc bản bằng ảnh desktop/mobile riêng; desktop có PNG fallback và WebP.
- Chỉnh tỷ lệ hero desktop; giữ nút previous/next ở desktop và vuốt chuyển slide ở mobile.
- Nút previous/next cố định 40×40px, mũi tên SVG 24px, nền trắng 50%, viền gradient 1px phía trong và blur nền.
- Thêm vòng hồng khi hover và trạng thái focus bàn phím; nút vẫn ẩn trên mobile.

## 3. Quyền lợi mua hàng

- Cập nhật nội dung: miễn phí vận chuyển đơn từ 600K, chính hãng 100% đầy đủ VAT, ưu đãi tháng sinh nhật, miễn phí gói quà.
- Thay icon bằng SVG: benefit-shipping.svg, benefit-authentic.svg, benefit-birthday.svg, benefit-gift.svg trong assets/images/icons/.
- Chỉnh khoảng cách với hero/Flash Sale và cách chia hàng theo breakpoint.

## 4. Card sản phẩm dùng chung

- Gom style card vào một nguồn; main.css đã chứa style này. Có thêm assets/css/product-card.css để cập nhật riêng card trên website đã tích hợp.
- Giữ class .product-card, .exclusive-card, .elegance-card và các class con đã bàn giao; không yêu cầu thêm wrapper __body.
- Flash Sale, Favorites và Ưu đãi đặc biệt: brand in đậm, tên sản phẩm không in đậm.
- Toàn bộ card có khoảng cách 16px từ giá bán đến nút Mua ngay; tên dài giới hạn 2 dòng.
- Căn hàng tên/giá/nút mua; ảnh bộ sản phẩm giữ tỷ lệ 1:1 sau khi tải.
- Card Ưu đãi đặc biệt và Bộ sản phẩm có hover ảnh như Favorites: lớp phủ, zoom ảnh, CTA Xem chi tiết và đổi màu tên. Giữ link ảnh cũ, không tạo link lồng nhau.
- Hiệu ứng hỗ trợ focus bàn phím, thiết bị cảm ứng và prefers-reduced-motion.

## 5. Flash Sale và Favorites

- Cập nhật artwork, banner 20.10 riêng trên mobile và layout responsive của Flash Sale.
- Flash Sale mobile dùng carousel ngang; chỉnh chiều rộng card.
- Flash Sale/Favorites hiển thị thương hiệu thay cho nhãn mẫu Sale.
- Cập nhật thứ tự sản phẩm demo ở Favorites, hiển thị tim trên mobile và thêm CTA khám phá.

## 6. Thương hiệu độc quyền và dải chữ chạy

- Đổi tiêu đề thành Thương hiệu độc quyền; chỉnh tỷ lệ ảnh/logo và spacing ba card.
- Dải chữ 100% chính hãng / Xuất hoá đơn VAT tự nhân bản theo chiều rộng màn hình.
- Hai nhóm chữ giống nhau nối vòng liên tục; tự dựng lại khi resize/font tải xong, không tích lũy bản sao; dừng chuyển động khi bật prefers-reduced-motion.

## 7. Ưu đãi, bộ sản phẩm và các section nội dung

- Banner ưu đãi full width ở mobile; chỉnh hình dáng card, bộ lọc và layout theo design mới.
- Demo Ưu đãi đặc biệt thay danh sách 33 card bằng 10 card; demo Bộ sản phẩm thay 32 card bằng 10 card và bổ sung nhãn/nhóm giá.
- Chỉnh typography tiêu đề, spacing giữa các section và card Chế tác cho sự thanh lịch; mobile giữ cuộn ngang.
- Thay nền Câu chuyện thương hiệu bằng asset desktop/mobile riêng.
- Cập nhật section kiến thức thành Tầng nước hoa là gì, có bao nhiêu tầng nước hoa?, có mở rộng/thu gọn nội dung.

## 8. Footer, navigation đáy và popup

- Footer dùng màu #ff3895; chỉnh typography, spacing, căn lề nội dung chính và phần SEO.
- Bố cục footer: 4 cột desktop, 2 cột tablet, 1 cột mobile.
- Đổi Quan điểm kinh doanh thành Triết lý thương hiệu; bỏ Hoạt động TGNH.
- Mục Hướng dẫn giữ bốn link theo design, đổi Member Card thành Thẻ thành viên; bỏ Gói quà miễn phí/Gift Voucher.
- Đổi số điện thoại thành 0916 660 519; giữ hotline 1900 636865.
- Chỉnh tỷ lệ icon social/thanh toán/chứng nhận; ẩn mục Tags top tìm kiếm trống trên mobile.
- Thay icon navigation đáy bằng asset mới theo design.
- Gỡ popup khuyến mãi tự mở và script khởi tạo popup khỏi trang bàn giao.

## File cần đối chiếu khi cập nhật

- index.html: thay đổi markup/nội dung các section, link và ảnh mới.
- assets/css/main.css: CSS toàn trang đã đóng gói, bao gồm style card dùng chung.
- assets/js/main.js: script đã đóng gói; các phần được đánh dấu bằng comment đường dẫn nguồn, ví dụ // assets/js/product-carousel.js và // assets/js/authenticity-strip.js.
- assets/images/: sao chép các asset mới đi kèm, đặc biệt ảnh hero/story/banner và SVG trong icons/.
- assets/css/product-card.css: chỉ dùng khi cần cập nhật riêng giao diện card.

## Website đã nối dữ liệu thật: cập nhật tối thiểu

1. Giữ vòng lặp sản phẩm, số lượng, URL, ảnh, giá và dữ liệu của hệ thống hiện tại. Không thay toàn bộ index.html bằng bản demo: danh sách demo đã đổi.
2. Để chỉ cập nhật card, sao chép product-card.css và tải SAU CSS hiện có, bao gồm các CSS section:

```html
<link rel="stylesheet" href="assets/css/main.css">
<link rel="stylesheet" href="assets/css/product-card.css">
```

Nếu dùng toàn bộ main.css mới thì không cần tải thêm product-card.css.
CSS card không tự cập nhật header/footer, số cột, carousel hoặc nội dung sản phẩm.

3. Flash Sale/Favorites: ánh xạ thương hiệu thật vào h3, tên vào p; CSS không thay được nhãn Sale đang ghi trong HTML.
4. Giữ các class __brand, __name, __old, __price, __buy của Exclusive. CSS sắp brand trước tên mà không buộc đổi thứ tự markup cũ.
5. Bộ sản phẩm cũ chỉ có ảnh, tên và nút mua. Để có nhóm giá theo design, thêm các phần sau làm con trực tiếp của .elegance-card, trước nút mua:

```html
<span class="elegance-card__brand">Nhãn bộ sản phẩm</span>
<p class="elegance-card__old"><del>Giá gốc</del> <span>Mức giảm</span></p>
<strong class="elegance-card__price">Giá bán</strong>
```

Dùng dữ liệu thật cho các giá trị trên; không sao chép giá mẫu. Khi chưa thêm nhóm giá, card cũ vẫn hiển thị được.

6. Để thêm hover ảnh cho Exclusive/Bộ sản phẩm, cập nhật khối xử lý card trong main.js tại phần comment // assets/js/product-carousel.js. Giữ phần carousel nếu hệ thống đã tùy chỉnh. Không bắt buộc render card bằng JavaScript hoặc dùng window.TGNH_MOCK_DATA.
7. Các cập nhật toàn trang cần đối chiếu riêng với template khách đã tích hợp; giữ lại ánh xạ backend và các tùy chỉnh riêng.

## Kiểm tra trước khi đưa lên website tích hợp

- Brand/tên/giá/URL là dữ liệu đúng của từng sản phẩm.
- Card không tràn, tên dài truncate, giá–nút mua cách 16px ở mobile/tablet/desktop.
- Carousel, next/previous hero, sidebar, tìm kiếm và các link tích hợp hoạt động đúng.
- Icon/ảnh mới tải đủ; hover hoạt động trên desktop, không cản chạm/cuộn ở mobile.
- Dải chữ chạy kín khi resize và ở màn hình rộng.
