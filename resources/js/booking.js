// تهيئة المتغيرات العامة
let selectedTime = '';
let totalPrice = 0;
const basePrices = {
    'حقنة': 75,
    'رعاية المسنين': 150,
    'تغيير الجروح': 100,
    'تركيب كانيولا': 120,
    'فحص العلامات الحيوية': 60,
    'إدارة الأدوية': 80,
    'other': 0
};
// انتظار تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    setMinDate();
    updatePrice();
});
// تعيين أقل تاريخ متاح (اليوم)
function setMinDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('bookingDate').min = today;
    document.getElementById('bookingDate').value = today;
}
// تهيئة جميع مستمعي الأحداث
function initializeEventListeners() {
    // اختيار الوقت
    document.querySelectorAll('.time-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.time-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            selectedTime = this.dataset.time;
            document.getElementById('bookingTime').value = selectedTime;
        });
    });
    // زيادة عدد المرضى
    document.getElementById('increasePeople').addEventListener('click', function() {
        let count = parseInt(document.getElementById('peopleCount').textContent);
        if (count < 10) {
            count++;
            document.getElementById('peopleCount').textContent = count;
            document.getElementById('people').value = count;
            updatePrice();
        }
    });
    // تقليل عدد المرضى
    document.getElementById('decreasePeople').addEventListener('click', function() {
        let count = parseInt(document.getElementById('peopleCount').textContent);
        if (count > 1) {
            count--;
            document.getElementById('peopleCount').textContent = count;
            document.getElementById('people').value = count;
            updatePrice();
        }
    });
    // تغيير نوع الخدمة
    document.getElementById('serviceType').addEventListener('change', function() {
        const customService = document.getElementById('customServiceSection');
        if (this.value === 'other') {
            customService.style.display = 'block';
        } else {
            customService.style.display = 'none';
        }
        updatePrice();
    });
    // التحقق من صحة رقم الهاتف أثناء الكتابة
    document.getElementById('phone').addEventListener('input', function(e) {
        this.value = this.value.replace(/[^0-9]/g, '');
        if (this.value.length > 11) {
            this.value = this.value.slice(0, 11);
        }
    });
    // تقديم النموذج - فقط التحقق من الصحة وإظهار النتائج
    document.getElementById('bookingForm').addEventListener('submit', handleSubmit);
}
// تحديث السعر
function updatePrice() {
    const serviceType = document.getElementById('serviceType').value;
    const peopleCount = parseInt(document.getElementById('peopleCount').textContent);
    let servicePrice = 0;
    if (serviceType && basePrices[serviceType] !== undefined) {
        servicePrice = basePrices[serviceType] * peopleCount;
    }
    const serviceFee = servicePrice * 0.1; // 10% رسوم خدمة
    totalPrice = servicePrice + serviceFee;
    // تحديث العرض
    document.getElementById('servicePrice').textContent = servicePrice + ' جنية';
    document.getElementById('serviceFee').textContent = serviceFee + ' جنية';
    document.getElementById('totalPrice').textContent = totalPrice + ' جنية';
}
// التحقق من صحة النموذج
function validateForm() {
    const errors = [];
    // التحقق من الوقت
    if (!selectedTime) {
        errors.push('يرجى اختيار الوقت');
    }
    // التحقق من التاريخ
    const bookingDate = document.getElementById('bookingDate').value;
    if (!bookingDate) {
        errors.push('يرجى اختيار التاريخ');
    }
    // التحقق من نوع الخدمة
    const serviceType = document.getElementById('serviceType').value;
    if (!serviceType) {
        errors.push('يرجى اختيار نوع الخدمة');
    }
    // التحقق من الخدمة المخصصة
    if (serviceType === 'other') {
        const customService = document.getElementById('customService').value.trim();
        if (!customService) {
            errors.push('يرجى وصف الخدمة المطلوبة');
        }
    }
    // التحقق من الاسم الأول
    const firstName = document.getElementById('firstName').value.trim();
    if (!firstName) {
        errors.push('يرجى إدخال الاسم الأول');
    } else if (firstName.length < 2) {
        errors.push('الاسم الأول يجب أن يكون حرفين على الأقل');
    }
    // التحقق من الاسم الأخير
    const lastName = document.getElementById('lastName').value.trim();
    if (!lastName) {
        errors.push('يرجى إدخال الاسم الأخير');
    } else if (lastName.length < 2) {
        errors.push('الاسم الأخير يجب أن يكون حرفين على الأقل');
    }
    // التحقق من البريد الإلكتروني
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        errors.push('يرجى إدخال البريد الإلكتروني');
    } else if (!emailRegex.test(email)) {
        errors.push('يرجى إدخال بريد إلكتروني صحيح');
    }
    // التحقق من رقم الهاتف
    const phone = document.getElementById('phone').value.trim();
    const phoneRegex = /^01[0-9]{9}$/;
    if (!phone) {
        errors.push('يرجى إدخال رقم الهاتف');
    } else if (!phoneRegex.test(phone)) {
        errors.push('يرجى إدخال رقم هاتف مصري صحيح (11 رقم)');
    }
    // التحقق من العمر
    const age = document.getElementById('patientAge').value;
    if (!age) {
        errors.push('يرجى إدخال عمر المريض');
    } else if (age < 1 || age > 120) {
        errors.push('العمر يجب أن يكون بين 1 و 120');
    }
    // التحقق من العنوان
    const address = document.getElementById('address').value.trim();
    if (!address) {
        errors.push('يرجى إدخال العنوان');
    } else if (address.length < 10) {
        errors.push('العنوان يجب أن يكون 10 أحرف على الأقل');
    }
    return errors;
}
// إظهار رسالة الخطأ
function showError(message) {
    const errorAlert = document.getElementById('errorAlert');
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorAlert.style.display = 'flex';   
    // إخفاء رسالة النجاح إذا كانت ظاهرة
    document.getElementById('successAlert').style.display = 'none';
    // تمرير إلى رسالة الخطأ
    errorAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // إخفاء الرسالة بعد 5 ثواني
    setTimeout(() => {
        errorAlert.style.display = 'none';
    }, 5000);
}
// إظهار رسالة النجاح
function showSuccess() {
    const successAlert = document.getElementById('successAlert');
    successAlert.style.display = 'flex';   
    // إخفاء رسالة الخطأ إذا كانت ظاهرة
    document.getElementById('errorAlert').style.display = 'none';
    // تمرير إلى رسالة النجاح
    successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // إخفاء الرسالة بعد 5 ثواني
    setTimeout(() => {
        successAlert.style.display = 'none';
    }, 5000);
}
// معالجة تقديم النموذج - بدون أي اتصال بالسيرفر
function handleSubmit(e) {
    e.preventDefault();
    // التحقق من صحة البيانات
    const errors = validateForm();
    if (errors.length > 0) {
        showError(errors[0]); // عرض أول خطأ
        return;
    }
    // إظهار مؤشر التحميل (للتأثير البصري فقط)
    document.getElementById('loading').style.display = 'block';
    document.getElementById('submitBtn').disabled = true;
    // تجميع بيانات النموذج لعرضها في الكونسول (للتأكد)
    const formData = {
        bookingDate: document.getElementById('bookingDate').value,
        bookingTime: selectedTime,
        serviceType: document.getElementById('serviceType').value,
        serviceTypeText: document.getElementById('serviceType').selectedOptions[0].text,
        people: document.getElementById('peopleCount').textContent,
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        fullName: document.getElementById('firstName').value.trim() + ' ' + document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        patientAge: document.getElementById('patientAge').value,
        address: document.getElementById('address').value.trim(),
        comments: document.getElementById('comments').value.trim(),
        customService: document.getElementById('customService').value.trim(),
        newsletter: document.getElementById('newsletter').checked,
        totalPrice: totalPrice,
        servicePrice: document.getElementById('servicePrice').textContent,
        serviceFee: document.getElementById('serviceFee').textContent
    };
    console.log('📝 بيانات الحجز (سيتم إرسالها للـ PHP):', formData);
    // محاكاة تأثير التحميل (للشكل فقط)
    setTimeout(() => {
        // إخفاء مؤشر التحميل
        document.getElementById('loading').style.display = 'none';
        document.getElementById('submitBtn').disabled = false;
        // عرض رسالة النجاح
        showSuccess();
        // هنا يمكن إعادة توجيه المستخدم أو إرسال النموذج تقليدياً        
        // console.log('✅ تم التحقق من البيانات بنجاح، جاهز للإرسال للـ PHP');
    }, 1500); // 1.5 ثانية تأثير بصري
}
// إعادة تعيين النموذج
function resetForm() {
    // إعادة تعيين الحقول
    document.getElementById('bookingForm').reset();   
    // إعادة تعيين الوقت
    document.querySelectorAll('.time-option').forEach(opt => opt.classList.remove('selected'));
    selectedTime = '';
    document.getElementById('bookingTime').value = '';
    // إعادة تعيين عدد المرضى
    document.getElementById('peopleCount').textContent = '1';
    document.getElementById('people').value = '1';
    // إخفاء قسم الخدمة المخصصة
    document.getElementById('customServiceSection').style.display = 'none';
    // إعادة تعيين التاريخ إلى اليوم
    setMinDate();
    // تحديث السعر
    updatePrice();
}
// إضافة وظيفة لحساب السعر بناءً على نوع الخدمة (للاستخدام الخارجي)
window.calculatePrice = function(serviceType, hours = 1) {
    const prices = {
        'حقنة': 75,
        'رعاية المسنين': 150,
        'تغيير الجروح': 100,
        'تركيب كانيولا': 120,
        'فحص العلامات الحيوية': 60,
        'إدارة الأدوية': 80
    };   
    if (serviceType === 'رعاية المسنين') {
        return prices[serviceType] * hours;
    }
    return prices[serviceType] || 0;
};
// تصدير الوظائف للاستخدام العالمي
window.bookingApp = {
    updatePrice,
    validateForm,
    resetForm
};