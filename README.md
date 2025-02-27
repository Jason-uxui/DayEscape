# DayEscape

DayEscape là một nền tảng đặt phòng khách sạn và trải nghiệm "daycation" (kỳ nghỉ ngắn trong ngày) tại các khách sạn và resort.

## Tổng quan về dự án

DayEscape là một ứng dụng web được phát triển bằng Next.js, một framework React hiện đại. Dự án này là một nền tảng đặt phòng khách sạn hoặc trải nghiệm "daycation" (kỳ nghỉ ngắn trong ngày) tại các khách sạn và resort.

## Công nghệ sử dụng

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI (với nhiều components như Dialog, Popover, Tabs...)
- **Database**: Supabase (Backend as a Service)
- **Authentication**: Supabase Auth
- **Maps**: Mapbox GL
- **Form Handling**: React Hook Form với Zod validation
- **Date Handling**: date-fns

## Cấu trúc dự án

- **app/**: Chứa các trang của ứng dụng theo cấu trúc App Router của Next.js 14
- **components/**: Chứa các thành phần UI có thể tái sử dụng
- **contexts/**: Quản lý trạng thái toàn cục (Auth, Cart)
- **lib/**: Tiện ích và kết nối API (Supabase)
- **types/**: Định nghĩa kiểu dữ liệu TypeScript
- **public/**: Tài nguyên tĩnh
- **styles/**: CSS toàn cục

## Tính năng chính

- **Trang chủ**: Hiển thị các phần giới thiệu về dịch vụ
- **Đăng nhập/Đăng ký**: Hệ thống xác thực người dùng
- **Tìm kiếm khách sạn**: Tìm kiếm và hiển thị danh sách khách sạn
- **Chi tiết khách sạn**: Xem thông tin chi tiết về khách sạn
- **Đặt phòng/dịch vụ**: Hệ thống giỏ hàng và thanh toán
- **Quản lý đặt phòng**: Xem, hủy đặt phòng
- **Bản đồ**: Hiển thị vị trí khách sạn trên bản đồ
- **Trang đối tác**: Phần dành cho đối tác khách sạn

## Mô hình dữ liệu

- **Hotel**: Thông tin về khách sạn (tên, địa chỉ, vị trí, trạng thái...)
- **Product**: Các dịch vụ/sản phẩm của khách sạn (có thể là phòng, spa, bể bơi...)
- **User**: Thông tin người dùng (được quản lý qua Supabase Auth)
- **Booking**: Thông tin đặt phòng/dịch vụ

## Kiến trúc ứng dụng

- **Client-side**: Next.js với App Router
- **Server-side**: Sử dụng Server Components và Server Actions của Next.js
- **Database**: Supabase (PostgreSQL)
- **State Management**: React Context API

## Điểm mạnh

- Sử dụng các công nghệ hiện đại (Next.js 14, TypeScript, Tailwind)
- Cấu trúc dự án rõ ràng, tổ chức tốt
- UI components được tách biệt và có thể tái sử dụng
- Tích hợp với Supabase giúp phát triển nhanh chóng

## Các hướng phát triển tiềm năng

- **Tối ưu hóa SEO**: Cải thiện metadata và cấu trúc dữ liệu
- **Tích hợp thanh toán**: Thêm các cổng thanh toán như Stripe
- **Đa ngôn ngữ**: Hỗ trợ nhiều ngôn ngữ
- **PWA**: Chuyển đổi thành Progressive Web App
- **Analytics**: Tích hợp phân tích người dùng
- **Tối ưu hiệu suất**: Cải thiện tốc độ tải trang và trải nghiệm người dùng

## Quy trình phát triển

- Tạo các branch riêng cho từng tính năng mới
- Viết tests để đảm bảo chất lượng code
- Thiết lập CI/CD pipeline
- Triển khai staging environment để kiểm thử trước khi đưa lên production

## Cài đặt và chạy dự án

1. Clone repository:
```bash
git clone https://github.com/Jason-uxui/DayEscape.git
cd DayEscape
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Tạo file .env.local với các biến môi trường cần thiết:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Chạy dự án ở môi trường development:
```bash
npm run dev
```

5. Build dự án cho production:
```bash
npm run build
npm start
``` 