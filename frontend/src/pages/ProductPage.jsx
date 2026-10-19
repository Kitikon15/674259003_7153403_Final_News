import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ProductList from "../components/ProductList";
import { getProducts, deleteProduct } from "../service/productService";
import alertService from "../service/alertService";
import { Plus, Package, AlertCircle, Search, ChevronLeft, ChevronRight } from "lucide-react";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // เพิ่ม State สำหรับระบบค้นหาและแบ่งหน้า
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // กำหนดจำนวนสินค้าต่อหน้า (ปรับเปลี่ยนได้ตามต้องการ)

  const location = useLocation();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "เกิดข้อผิดพลาดในการโหลดข้อมูลสินค้า");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (location.state?.message) {
      alertService.success(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleDeleteConfirm = async () => {
    if (!selectedProduct) return;
    try {
      setIsDeleting(true);
      await deleteProduct(selectedProduct.id);
      alertService.success("ลบสินค้าเรียบร้อยแล้ว!");
      setSelectedProduct(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alertService.error(err.message || "เกิดข้อผิดพลาดในการลบสินค้า");
    } finally {
      setIsDeleting(false);
    }
  };

  // 1. กรองรายการสินค้าตามคำค้นหา (Search Filter)
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 2. คำนวณการแบ่งหน้า (Pagination Logic)
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      {/* ส่วนหัว */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-base-100 p-6 rounded-2xl shadow-sm border border-base-200">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 text-primary rounded-xl">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-base-content">รายการสินค้าทั้งหมด</h1>
            <p className="text-xs sm:text-sm text-gray-400">จัดการรายการสินค้า ราคา และรายละเอียดในระบบ</p>
          </div>
        </div>
        <Link to="/product/new" className="btn btn-primary text-white gap-2 shadow-md hover:shadow-lg transition-all">
          <Plus className="w-5 h-5" /> เพิ่มสินค้าใหม่
        </Link>
      </div>

      {/* แถบค้นหาข้อมูล (Search Bar) */}
      <div className="mb-6 bg-base-100 p-4 rounded-xl shadow-sm border border-base-200">
        <div className="relative">
          <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="ค้นหาชื่อสินค้า..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // รีเซ็ตกลับไปหน้าแรกเมื่อพิมพ์ค้นหา
            }}
            className="input input-bordered w-full pl-10 focus:input-primary"
          />
        </div>
      </div>

      {/* แสดงรายการสินค้า (ส่งเฉพาะสินค้าในหน้านั้นๆ หรือทั้งหมดให้ ProductList จัดการ) */}
      <ProductList
        products={currentProducts}
        loading={loading}
        error={error}
        onDelete={(product) => setSelectedProduct(product)}
      />

      {/* ส่วนควบคุมการเปลี่ยนหน้า (Pagination Controls) */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="btn btn-sm btn-outline gap-1"
          >
            <ChevronLeft className="w-4 h-4" /> ก่อนหน้า
          </button>
          <span className="text-sm font-medium px-4">
            หน้าที่ {currentPage} จาก {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="btn btn-sm btn-outline gap-1"
          >
            ถัดไป <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Modal ยืนยันการลบ */}
      {selectedProduct && (
        <dialog className="modal modal-open bg-black/50">
          <div className="modal-box max-w-md border border-base-200 shadow-2xl">
            <div className="flex items-center gap-3 text-error mb-2">
              <AlertCircle className="w-6 h-6" />
              <h3 className="font-bold text-lg">ยืนยันการลบสินค้า</h3>
            </div>
            <p className="py-2 text-gray-300">
              คุณต้องการลบสินค้า <span className="font-bold text-white">"{selectedProduct.name}"</span> ใช่หรือไม่?
            </p>
            <p className="text-xs text-error/80">* การดำเนินการนี้ไม่สามารถย้อนกลับได้</p>
            <div className="modal-action gap-2 pt-2">
              <button
                onClick={() => setSelectedProduct(null)}
                disabled={isDeleting}
                className="btn btn-ghost btn-sm"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="btn btn-error btn-sm text-white">
                {isDeleting ? "กำลังลบ..." : "ลบสินค้า"}
              </button>
            </div>
          </div>
        </dialog>
      )}
    </main>
  );
};

export default ProductPage;
