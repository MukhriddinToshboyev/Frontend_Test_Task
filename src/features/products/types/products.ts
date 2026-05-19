// 1. Alohida bitta mahsulotning turi (Product Interface)
export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Array<{
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }>;
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  thumbnail: string;
  images: string[];
}

// 2. API ro'yxat qaytargandagi umumiy ko'rinishi (Pagination Response)
export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

// 3. API so'rov yuborayotganda filter yoki sahifa parametrlarining turi
export interface ProductRequest {
  limit?: number;
  skip?: number;
  select?: string;
}