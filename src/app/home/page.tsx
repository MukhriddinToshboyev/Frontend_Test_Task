
import { Products } from '@/src/features/products/components/Products'
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="text-center py-10 text-xs font-mono uppercase">Yuklanmoqda...</div>}>
      <Products />
    </Suspense>
  );
}
