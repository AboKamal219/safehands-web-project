// =============== صفحة تسجيل الممرضين - تفاعلات وتجربة مستخدم ===============

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. نظام الخطوات (Stepper) - إضافة وتفعيل
    createStepper();
    
    // 2. رفع الملفات - معاينة وهمية
    setupFileUploads();
    
    // 3. اختيار التخصصات المتعددة
    setupSpecialtiesSelection();
    
    // 4. جدول العمل - تفعيل وإلغاء
    setupScheduleToggle();
    
    // 5. التحقق من المدخلات وإرسال النموذج
    setupFormValidation();
    
    // 6. معاينة البيانات قبل الإرسال
    setupReviewData();
    
    // 7. تأثيرات بصرية وإضافات
    setupVisualEffects();
    
    // =============== الدوال التفصيلية ===============
    
    function createStepper() {
        // إضافة الـ stepper إذا مش موجود
        if (!document.querySelector('.stepper')) {
            const form = document.querySelector('.main-form');
            if (form) {
                const stepper = document.createElement('div');
                stepper.className = 'stepper';
                stepper.innerHTML = `
                    <div class="step active" data-step="1">
                        <div class="circle">1</div>
                        <span>البيانات الشخصية</span>
                    </div>
                    <div class="step" data-step="2">
                        <div class="circle">2</div>
                        <span>المؤهلات</span>
                    </div>
                    <div class="step" data-step="3">
                        <div class="circle">3</div>
                        <span>تفاصيل العمل</span>
                    </div>
                    <div class="step" data-step="4">
                        <div class="circle">4</div>
                        <span>المراجعة</span>
                    </div>
                `;
                form.parentNode.insertBefore(stepper, form);
            }
        }
        
        // تقسيم النموذج إلى أقسام
        const sections = document.querySelectorAll('.main-form > .section-title');
        sections.forEach((section, index) => {
            section.setAttribute('data-section', index + 1);
            
            // إضافة أزرار التنقل بين الأقسام
            if (index < sections.length - 1) {
                const nextBtn = document.createElement('button');
                nextBtn.type = 'button';
                nextBtn.className = 'btn-next-section';
                nextBtn.innerHTML = 'التالي <i class="fa-solid fa-arrow-left"></i>';
                nextBtn.style.cssText = 'margin: 20px 0 30px; padding: 10px 25px; background: var(--primary-blue); color: white; border: none; border-radius: 8px; cursor: pointer; float: left;';
                nextBtn.addEventListener('click', () => goToStep(index + 2));
                section.parentNode.insertBefore(nextBtn, section.nextSibling);
            }
        });
    }
    
    function goToStep(step) {
        // تحديث الـ stepper
        document.querySelectorAll('.step').forEach(s => {
            s.classList.remove('active');
            if (s.dataset.step == step) s.classList.add('active');
        });
        
        // التمرير للقسم المطلوب
        const targetSection = document.querySelector(`[data-section="${step}"]`);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    function setupFileUploads() {
        const uploadBoxes = document.querySelectorAll('.upload-box');
        
        uploadBoxes.forEach(box => {
            // إضافة خاصية النقر للرفع
            box.addEventListener('click', function() {
                // إنشاء input file مؤقت
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*,.pdf';
                input.multiple = this.querySelector('.blue-text') ? true : false;
                
                input.addEventListener('change', function(e) {
                    const files = Array.from(this.files);
                    if (files.length > 0) {
                        // تغيير شكل الصندوق
                        box.style.borderColor = 'var(--success)';
                        box.style.backgroundColor = '#f0fdf4';
                        
                        // عرض أسماء الملفات
                        const fileNames = files.map(f => f.name).join(', ');
                        const infoSpan = box.querySelector('.file-info') || box.querySelector('.blue-text');
                        if (infoSpan) {
                            const originalText = infoSpan.textContent;
                            infoSpan.innerHTML = `<i class="fa-solid fa-check-circle" style="color: var(--success);"></i> تم رفع ${files.length} ملف`;
                            
                            // إضافة اسم الملف تحت
                            let fileNameDiv = box.querySelector('.uploaded-files');
                            if (!fileNameDiv) {
                                fileNameDiv = document.createElement('div');
                                fileNameDiv.className = 'uploaded-files';
                                fileNameDiv.style.cssText = 'margin-top: 10px; font-size: 12px; color: var(--success);';
                                box.appendChild(fileNameDiv);
                            }
                            fileNameDiv.innerHTML = `<i class="fa-regular fa-file"></i> ${fileNames.substring(0, 50)}...`;
                        }
                    }
                });
                
                input.click();
            });
            
            // تأثير سحب وإفلات وهمي
            box.addEventListener('dragover', (e) => {
                e.preventDefault();
                box.style.borderColor = 'var(--primary-blue)';
                box.style.backgroundColor = 'var(--light-blue)';
            });
            
            box.addEventListener('dragleave', () => {
                box.style.borderColor = '#e2e8f0';
                box.style.backgroundColor = '#f8fafc';
            });
            
            box.addEventListener('drop', (e) => {
                e.preventDefault();
                box.style.borderColor = 'var(--success)';
                box.style.backgroundColor = '#f0fdf4';
            });
        });
    }
    
    function setupSpecialtiesSelection() {
        const specialtyItems = document.querySelectorAll('.select-item');
        
        specialtyItems.forEach(item => {
            item.addEventListener('click', function(e) {
                if (e.ctrlKey || e.metaKey) {
                    // تحديد متعدد مع Ctrl
                    this.classList.toggle('selected');
                } else {
                    // تحديد فردي - إزالة الكل وإضافة هذا
                    specialtyItems.forEach(i => i.classList.remove('selected'));
                    this.classList.add('selected');
                }
                
                // تحديث العداد
                updateSelectedCount();
            });
        });
        
        function updateSelectedCount() {
            const selected = document.querySelectorAll('.select-item.selected').length;
            const hint = document.querySelector('.multi-select-box + .hint');
            if (hint && selected > 0) {
                hint.innerHTML = `<span style="color: var(--primary-blue); font-weight: bold;">${selected}</span> تخصصات مختارة`;
            }
        }
    }
    
    function setupScheduleToggle() {
        const switches = document.querySelectorAll('.schedule-card .switch input');
        
        switches.forEach(s => {
            s.addEventListener('change', function() {
                const card = this.closest('.schedule-card');
                if (this.checked) {
                    card.style.opacity = '1';
                    card.style.backgroundColor = '#fff';
                } else {
                    card.style.opacity = '0.6';
                    card.style.backgroundColor = '#f8fafc';
                }
            });
        });
    }
    
    function setupFormValidation() {
        const form = document.querySelector('.main-form');
        const submitBtn = form?.querySelector('.btn-submit');
        
        if (submitBtn) {
            submitBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // جمع كل الحقول المطلوبة
                const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
                const fileUploads = form.querySelectorAll('.upload-box');
                
                let isValid = true;
                let errorMessages = [];
                
                // التحقق من الحقول النصية
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        const label = field.closest('.form-group')?.querySelector('label')?.textContent || 'حقل';
                        errorMessages.push(`❌ ${label} مطلوب`);
                        
                        // تظليل الحقل
                        field.style.borderColor = '#ef4444';
                        setTimeout(() => field.style.borderColor = '#cbd5e1', 3000);
                    }
                });
                
                // التحقق من رفع الملفات
                fileUploads.forEach((box, index) => {
                    const hasFiles = box.querySelector('.uploaded-files');
                    if (!hasFiles && index < 2) { // أول صندوقين إجباريين
                        isValid = false;
                        errorMessages.push('❌ يجب رفع الصورة الشخصية والرخصة المهنية');
                        box.style.borderColor = '#ef4444';
                        setTimeout(() => box.style.borderColor = '#e2e8f0', 3000);
                    }
                });
                
                // التحقق من اختيار التخصصات
                const selectedSpecialties = document.querySelectorAll('.select-item.selected').length;
                if (selectedSpecialties === 0) {
                    isValid = false;
                    errorMessages.push('❌ يجب اختيار تخصص واحد على الأقل');
                }
                
                // التحقق من الموافقة على الشروط
                const termsCheck = document.getElementById('terms');
                if (!termsCheck?.checked) {
                    isValid = false;
                    errorMessages.push('❌ يجب الموافقة على الشروط والأحكام');
                    termsCheck?.closest('.checkbox-group')?.style.setProperty('color', '#ef4444', 'important');
                }
                
                if (isValid) {
                    // عرض رسالة نجاح
                    showNotification('success', 'تم إرسال طلب التسجيل بنجاح! سيتم مراجعة بياناتك خلال 24-48 ساعة');
                    
                    // محاكاة إرسال
                    setTimeout(() => {
                        window.location.href = 'registration-success.html';
                    }, 3000);
                } else {
                    // عرض الأخطاء
                    showNotification('error', errorMessages.join('<br>'));
                }
            });
        }
    }
    
    function setupReviewData() {
        const reviewItems = document.querySelectorAll('.dummy-line');
        
        reviewItems.forEach(item => {
            // تحويل العناصر الوهمية إلى عناصر حقيقية
            item.style.cssText = 'background: #f8fafc; padding: 15px; border-radius: 8px; display: flex; align-items: center; justify-content: space-between;';
            
            // إضافة زر تعديل
            const editBtn = document.createElement('span');
            editBtn.innerHTML = '<i class="fa-regular fa-pen-to-square" style="color: var(--primary-blue); cursor: pointer;"></i>';
            editBtn.addEventListener('click', function() {
                const step = this.closest('.review-item')?.querySelector('h4')?.textContent.includes('الشخصية') ? 1 : 
                            this.closest('.review-item')?.querySelector('h4')?.textContent.includes('المهنية') ? 2 : 3;
                goToStep(step);
            });
            
            item.appendChild(editBtn);
        });
    }
    
    function setupVisualEffects() {
        // تأثيرات على الأزرار
        const buttons = document.querySelectorAll('.btn-prev, .btn-next, .btn-submit, .btn-next-section');
        
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-2px)';
                btn.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.2)';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0)';
                btn.style.boxShadow = 'none';
            });
        });
        
        // إضافة أيقونات للحقول
        const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"]');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                const icon = input.closest('.form-group')?.querySelector('i');
                if (icon) icon.style.color = 'var(--primary-blue)';
            });
            
            input.addEventListener('blur', () => {
                const icon = input.closest('.form-group')?.querySelector('i');
                if (icon) icon.style.color = '#94a3b8';
            });
        });
        
        // عدادات للأرقام
        const numberInputs = document.querySelectorAll('input[type="number"]');
        numberInputs.forEach(input => {
            input.addEventListener('input', function() {
                const hint = this.closest('.form-group')?.querySelector('.hint');
                if (hint && this.value) {
                    hint.innerHTML = `القيمة المدخلة: ${this.value} جنية`;
                }
            });
        });
    }
    
    function showNotification(type, message) {
        // إزالة أي إشعار سابق
        const oldNotif = document.querySelector('.registration-notification');
        if (oldNotif) oldNotif.remove();
        
        // إنشاء الإشعار
        const notification = document.createElement('div');
        notification.className = 'registration-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            z-index: 9999;
            max-width: 400px;
            text-align: center;
            direction: rtl;
            animation: slideDown 0.3s ease;
        `;
        
        notification.innerHTML = `
            <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}" style="font-size: 24px; margin-bottom: 10px;"></i>
            <div style="font-weight: bold; margin-bottom: 5px;">${type === 'success' ? 'تم بنجاح' : 'خطأ'}</div>
            <div style="font-size: 14px;">${message}</div>
        `;
        
        document.body.appendChild(notification);
        
        // إضافة CSS للأنيميشن
        if (!document.getElementById('notifStyles')) {
            const style = document.createElement('style');
            style.id = 'notifStyles';
            style.textContent = `
                @keyframes slideDown {
                    from { transform: translate(-50%, -100%); opacity: 0; }
                    to { transform: translate(-50%, 0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
        // إخفاء بعد 5 ثواني للنجاح، 7 للخطأ
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translate(-50%, -20px)';
            notification.style.transition = 'all 0.3s';
            setTimeout(() => notification.remove(), 300);
        }, type === 'success' ? 5000 : 7000);
    }
    
    // 8. إضافة زر العودة للأعلى
    const scrollTopBtn = document.createElement('div');
    scrollTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 30px;
        width: 45px;
        height: 45px;
        background: var(--primary-blue);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        z-index: 999;
    `;
    document.body.appendChild(scrollTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // 9. إضافة تأثيرات على بطاقات الجدول
    const scheduleCards = document.querySelectorAll('.schedule-card');
    scheduleCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.switch')) {
                const toggle = this.querySelector('.switch input');
                if (toggle) {
                    toggle.checked = !toggle.checked;
                    toggle.dispatchEvent(new Event('change'));
                }
            }
        });
    });
    
    // 10. تحسين تجربة الإدخال
    const phoneInput = document.querySelector('input[type="tel"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            // تنسيق الرقم بشكل تلقائي
            let value = this.value.replace(/\D/g, '');
            if (value.startsWith('01')) {
                value = value.substring(0, 11);
            }
            this.value = value;
        });
    }
});