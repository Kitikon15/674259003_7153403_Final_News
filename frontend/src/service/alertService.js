import Swal from 'sweetalert2';

/**
 * ช่วยแปลง Error Payload เป็นข้อความที่อ่านง่าย
 */
const getErrorMessage = (error) => {
  if (typeof error === 'string') return error;
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.response?.data?.error) return error.response.data.error;
  
  try {
    const parsed = JSON.parse(error?.message);
    return parsed.error || parsed.message || error.message;
  } catch {
    return error?.message || 'เกิดข้อผิดพลาดในการทำรายการ กรุณาลองใหม่อีกครั้ง';
  }
};

/**
 * Custom SweetAlert Config สำหรับดีไซน์ที่ดูดี มินิมอล
 */
const customSwal = Swal.mixin({
  customClass: {
    popup: 'rounded-2xl shadow-xl p-6 border border-gray-100',
    title: 'text-xl font-semibold text-gray-800',
    htmlContainer: 'text-sm text-gray-600 mt-2',
    confirmButton: 'px-5 py-2.5 rounded-xl font-medium text-white transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2',
    cancelButton: 'px-5 py-2.5 rounded-xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all focus:outline-none'
  },
  buttonsStyling: false,
});

const alertService = {
  // แจ้งเตือนสำเร็จ
  success: (titleOrMessage, text = '') => {
    const title = text ? titleOrMessage : 'ทำรายการสำเร็จ';
    const message = text || titleOrMessage;

    return customSwal.fire({
      icon: 'success',
      iconColor: '#10B981', // สี Emerald Green
      title: title,
      text: message,
      timer: 1800,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  },

  // แจ้งเตือนข้อผิดพลาด
  error: (error, title = 'เกิดข้อผิดพลาด') => {
    return customSwal.fire({
      icon: 'error',
      iconColor: '#EF4444', // สี Red
      title: title,
      text: getErrorMessage(error),
      confirmButtonText: 'เข้าใจแล้ว',
      customClass: {
        ...customSwal.customClass,
        confirmButton: `${customSwal.customClass.confirmButton} bg-red-500 hover:bg-red-600 focus:ring-red-400`
      }
    });
  },

  // แจ้งเตือนข้อมูลทั่วไป
  info: (message, title = 'แจ้งเตือน') => {
    return customSwal.fire({
      icon: 'info',
      iconColor: '#3B82F6', // สี Blue
      title: title,
      text: message,
      confirmButtonText: 'ตกลง',
      customClass: {
        ...customSwal.customClass,
        confirmButton: `${customSwal.customClass.confirmButton} bg-blue-500 hover:bg-blue-600 focus:ring-blue-400`
      }
    });
  },

  // แจ้งเตือนคำเตือน
  warn: (message, title = 'คำเตือน') => {
    return customSwal.fire({
      icon: 'warning',
      iconColor: '#F59E0B', // สี Amber
      title: title,
      text: message,
      confirmButtonText: 'ตกลง',
      customClass: {
        ...customSwal.customClass,
        confirmButton: `${customSwal.customClass.confirmButton} bg-amber-500 hover:bg-amber-600 focus:ring-amber-400`
      }
    });
  },

  // กล่องยืนยันทั่วไป (Dynamic Confirm)
  confirm: ({
    title = 'ยืนยันการทำรายการ?',
    text = 'คุณแน่ใจหรือไม่ที่จะดำเนินการต่อ',
    confirmText = 'ยืนยัน',
    cancelText = 'ยกเลิก',
    icon = 'question',
    isDanger = false
  } = {}) => {
    const confirmBtnClass = isDanger 
      ? 'bg-red-500 hover:bg-red-600 focus:ring-red-400' 
      : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-400';

    return customSwal.fire({
      icon,
      iconColor: isDanger ? '#EF4444' : '#6366F1',
      title,
      text,
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      reverseButtons: true,
      customClass: {
        ...customSwal.customClass,
        confirmButton: `${customSwal.customClass.confirmButton} ${confirmBtnClass} ml-3`
      }
    }).then((result) => result.isConfirmed);
  },

  // ยืนยันการลบแบบเจาะจง (Shorthand method)
  confirmDelete: (title = 'ยืนยันการลบรายการ', text = 'หากลบแล้ว ข้อมูลนี้จะไม่สามารถกู้คืนกลับมาได้') => {
    return alertService.confirm({
      title,
      text,
      confirmText: 'ลบข้อมูล',
      cancelText: 'ยกเลิก',
      icon: 'warning',
      isDanger: true
    });
  }
};

export const { success, error, info, warn, confirm, confirmDelete } = alertService;
export default alertService;
