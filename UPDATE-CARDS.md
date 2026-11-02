# Cập nhật card từ bản bàn giao 4252ffb

## Website đã nối dữ liệu thật

Giữ nguyên vòng lặp sản phẩm, URL, hình ảnh và dữ liệu của hệ thống hiện tại.
Không thay toàn bộ index.html bằng bản demo: số lượng và thứ tự sản phẩm demo đã thay đổi.

Để cập nhật riêng giao diện card, sao chép assets/css/product-card.css và tải nó
SAU CSS hiện có, bao gồm cả các CSS section:

```html
<link rel="stylesheet" href="assets/css/main.css">
<link rel="stylesheet" href="assets/css/product-card.css">
```

Không cần đổi class hoặc thêm wrapper. Ba cấu trúc cũ vẫn được hỗ trợ:
.product-card, .exclusive-card và .elegance-card. CSS section vẫn quản lý số cột,
chiều rộng card và carousel. Các điều chỉnh này không tự thay layout toàn trang.

Nếu dùng toàn bộ assets/css/main.css của bản mới thì KHÔNG cần tải thêm
product-card.css: các style card đã được đóng gói sẵn trong main.css.

## Những cập nhật dữ liệu/HTML cần thực hiện theo design

- Flash Sale và Favorites: h3 hiển thị thương hiệu thực tế, p hiển thị tên sản phẩm.
  Thay nhãn mẫu "Sale" trong h3 khi ánh xạ dữ liệu. CSS không đổi được nội dung này.
- Exclusive: giữ nguyên các class __brand, __name, __old, __price, __buy.
  CSS đặt brand trước tên mà không cần đổi thứ tự phần tử của template cũ.
- Bộ sản phẩm: markup cũ chỉ có ảnh, tên và nút mua. Nếu cần nhóm giá theo design,
  thêm các trường sau làm con trực tiếp của .elegance-card, trước nút mua:

```html
<span class="elegance-card__brand">Nhãn bộ sản phẩm</span>
<p class="elegance-card__old"><del>Giá gốc</del> <span>Mức giảm</span></p>
<strong class="elegance-card__price">Giá bán</strong>
```

Ánh xạ các giá trị trên từ dữ liệu thật, không sao chép giá mẫu của demo.
Nếu không có nhóm giá, card cũ vẫn hiển thị được.
Khoảng cách từ giá bán đến nút mua là 16px; tên dài được giới hạn 2 dòng.

JavaScript carousel và các data-* cũ được giữ nguyên. Không cần chuyển sang
JavaScript render card hoặc kết nối window.TGNH_MOCK_DATA để hiển thị sản phẩm.

Hướng dẫn này chỉ dành cho card; thay đổi header/footer và asset toàn trang
cần được đối chiếu riêng với bản tích hợp của khách.
