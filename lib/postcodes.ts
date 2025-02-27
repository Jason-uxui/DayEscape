// Dữ liệu mã bưu chính của Úc và thành phố tương ứng
// Lưu ý: Đây là dữ liệu mẫu, trong thực tế nên sử dụng API hoặc cơ sở dữ liệu đầy đủ hơn

export interface PostcodeData {
  postcode: string;
  location: string;
}

// Danh sách mã bưu chính cho các thành phố chính ở Úc
export const AUSTRALIA_POSTCODES: PostcodeData[] = [
  // Sydney
  { postcode: "2000", location: "Sydney, Australia" },
  { postcode: "2010", location: "Sydney, Australia" },
  { postcode: "2020", location: "Sydney, Australia" },
  { postcode: "2030", location: "Sydney, Australia" },
  { postcode: "2040", location: "Sydney, Australia" },
  { postcode: "2050", location: "Sydney, Australia" },
  { postcode: "2060", location: "Sydney, Australia" },
  { postcode: "2070", location: "Sydney, Australia" },
  
  // Melbourne
  { postcode: "3000", location: "Melbourne, Australia" },
  { postcode: "3010", location: "Melbourne, Australia" },
  { postcode: "3020", location: "Melbourne, Australia" },
  { postcode: "3030", location: "Melbourne, Australia" },
  { postcode: "3040", location: "Melbourne, Australia" },
  { postcode: "3050", location: "Melbourne, Australia" },
  { postcode: "3060", location: "Melbourne, Australia" },
  { postcode: "3070", location: "Melbourne, Australia" },
  
  // Brisbane
  { postcode: "4000", location: "Brisbane, Australia" },
  { postcode: "4010", location: "Brisbane, Australia" },
  { postcode: "4020", location: "Brisbane, Australia" },
  { postcode: "4030", location: "Brisbane, Australia" },
  { postcode: "4050", location: "Brisbane, Australia" },
  { postcode: "4060", location: "Brisbane, Australia" },
  { postcode: "4070", location: "Brisbane, Australia" },
  
  // Perth
  { postcode: "6000", location: "Perth, Australia" },
  { postcode: "6010", location: "Perth, Australia" },
  { postcode: "6020", location: "Perth, Australia" },
  { postcode: "6030", location: "Perth, Australia" },
  { postcode: "6050", location: "Perth, Australia" },
  { postcode: "6060", location: "Perth, Australia" },
  
  // Adelaide
  { postcode: "5000", location: "Adelaide, Australia" },
  { postcode: "5010", location: "Adelaide, Australia" },
  { postcode: "5020", location: "Adelaide, Australia" },
  { postcode: "5030", location: "Adelaide, Australia" },
  { postcode: "5040", location: "Adelaide, Australia" },
  
  // Gold Coast
  { postcode: "4210", location: "Gold Coast, Australia" },
  { postcode: "4211", location: "Gold Coast, Australia" },
  { postcode: "4212", location: "Gold Coast, Australia" },
  { postcode: "4215", location: "Gold Coast, Australia" },
  { postcode: "4217", location: "Gold Coast, Australia" },
  { postcode: "4220", location: "Gold Coast, Australia" },
  
  // Canberra
  { postcode: "2600", location: "Canberra, Australia" },
  { postcode: "2601", location: "Canberra, Australia" },
  { postcode: "2602", location: "Canberra, Australia" },
  { postcode: "2603", location: "Canberra, Australia" },
  { postcode: "2604", location: "Canberra, Australia" },
  { postcode: "2605", location: "Canberra, Australia" },
  { postcode: "2606", location: "Canberra, Australia" },
  
  // Hobart
  { postcode: "7000", location: "Hobart, Australia" },
  { postcode: "7001", location: "Hobart, Australia" },
  { postcode: "7004", location: "Hobart, Australia" },
  { postcode: "7005", location: "Hobart, Australia" },
  { postcode: "7007", location: "Hobart, Australia" },
  
  // Darwin
  { postcode: "0800", location: "Darwin, Australia" },
  { postcode: "0810", location: "Darwin, Australia" },
  { postcode: "0820", location: "Darwin, Australia" },
  { postcode: "0830", location: "Darwin, Australia" },
  { postcode: "0840", location: "Darwin, Australia" },
  
  // Cairns
  { postcode: "4870", location: "Cairns, Australia" },
  { postcode: "4878", location: "Cairns, Australia" },
  { postcode: "4879", location: "Cairns, Australia" },
  { postcode: "4880", location: "Cairns, Australia" },
  { postcode: "4881", location: "Cairns, Australia" },
];

// Hàm tìm kiếm địa điểm dựa trên mã bưu chính
export function findLocationByPostcode(postcode: string): string | null {
  const postcodeData = AUSTRALIA_POSTCODES.find(item => item.postcode === postcode);
  return postcodeData ? postcodeData.location : null;
}

// Hàm kiểm tra xem một chuỗi có phải là mã bưu chính hợp lệ không
export function isValidAustralianPostcode(input: string): boolean {
  // Mã bưu chính Úc thường là 4 chữ số
  return /^\d{4}$/.test(input);
}

// Hàm tìm kiếm các mã bưu chính phù hợp với một chuỗi đầu vào
export function findMatchingPostcodes(input: string): PostcodeData[] {
  if (!input || input.trim() === "") return [];
  
  const normalizedInput = input.trim();
  
  // Nếu đầu vào chỉ chứa số, tìm kiếm theo mã bưu chính
  if (/^\d+$/.test(normalizedInput)) {
    return AUSTRALIA_POSTCODES.filter(item => 
      item.postcode.startsWith(normalizedInput)
    );
  }
  
  return [];
} 