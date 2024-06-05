### Chạy

```bash
cp .env.example .env
npm run dev
```

Trang `blog` ở địa chỉ `/blog`.

### Yêu cầu
- Update style của trang `blog` cả mobile lẫn desktop (> 1024px width) theo design
- Bỏ qua phần `footer`, `header navigation`
- Ưu tiên dùng Tailwind class, utility class có sẵn trong `src/styles` và components trong `src/ui`
- Đối với style phức tạp, tạo file riêng nếu cần thiết, dùng SCSS (đặt tên class theo BEM convention).
