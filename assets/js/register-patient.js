// =============== صفحة تسجيل المريض - تفاعلات وتجربة مستخدم ===============

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. التحقق من صحة البيانات وإرسال النموذج
    const registrationForm = document.getElementById('patientRegistrationForm');
    const submitBtn = document.getElementById('login');
    
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // جمع قيم الحقول
            const fullName = document.getElementById('patientFullName')?.value.trim();
            const nationalId = document.getElementById('patientNationalId')?.value.trim();
            const phone = document.getElementById('patientPhone')?.value.trim();
            const email = document.getElementById('patientEmail')?.value.trim();
            const password = document.getElementById('patientPassword')?.value;
            const confirmPassword = document.getElementById('patientConfirmPassword')?.value;
            const address = document.getElementById('patientAddress')?.value.trim();
            const birthDate = document.getElementById('patientBirthDate')?.value;
            const gender = document.querySelector('input[name="gender"]:checked')?.value;
            
            // إزالة أي رسائل خطأ سابقة
            removeAllErrors();
            
            // مصفوفة لتخزين الأخطاء
            let errors = [];
            
            // التحقق من الاسم الكامل
            if (!fullName) {
                showFieldError('patientFullName', 'الاسم الكامل مطلوب');
                errors.push('الاسم الكامل مطلوب');
            } else if (fullName.length < 5) {
                showFieldError('patientFullName', 'الاسم يجب أن يكون 5 أحرف على الأقل');
                errors.push('الاسم قصير جداً');
            }
            
            // التحقق من الرقم القومي
            if (!nationalId) {
                showFieldError('patientNationalId', 'الرقم القومي مطلوب');
                errors.push('الرقم القومي مطلوب');
            } else if (!/^\d{14}$/.test(nationalId)) {
                showFieldError('patientNationalId', 'الرقم القومي يجب أن يكون 14 رقمًا بالضبط');
                errors.push('الرقم القومي غير صحيح');
            }
            
            // التحقق من رقم الهاتف
            if (!phone) {
                showFieldError('patientPhone', 'رقم الهاتف مطلوب');
                errors.push('رقم الهاتف مطلوب');
            } else if (!/^01[0125][0-9]{8}$/.test(phone)) {
                showFieldError('patientPhone', 'رقم الهاتف غير صحيح (يجب أن يبدأ بـ 01 ويتبعه 9 أرقام)');
                errors.push('رقم الهاتف غير صحيح');
            }
            
            // التحقق من البريد الإلكتروني
            if (!email) {
                showFieldError('patientEmail', 'البريد الإلكتروني مطلوب');
                errors.push('البريد الإلكتروني مطلوب');
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showFieldError('patientEmail', 'البريد الإلكتروني غير صحيح');
                errors.push('البريد الإلكتروني غير صحيح');
            }
            
            // التحقق من كلمة المرور
            if (!password) {
                showFieldError('patientPassword', 'كلمة المرور مطلوبة');
                errors.push('كلمة المرور مطلوبة');
            } else if (password.length < 8) {
                showFieldError('patientPassword', 'كلمة المرور يجب أن تكون 8 أحرف على الأقل');
                errors.push('كلمة المرور قصيرة جداً');
            }
            
            // التحقق من تطابق كلمة المرور
            if (password !== confirmPassword) {
                showFieldError('patientConfirmPassword', 'كلمة المرور غير متطابقة');
                errors.push('كلمة المرور غير متطابقة');
            }
            
            // التحقق من العنوان
            if (!address) {
                showFieldError('patientAddress', 'العنوان مطلوب');
                errors.push('العنوان مطلوب');
            } else if (address.length < 10) {
                showFieldError('patientAddress', 'العنوان قصير جداً');
                errors.push('العنوان قصير جداً');
            }
            
            // التحقق من تاريخ الميلاد
            if (!birthDate) {
                showFieldError('patientBirthDate', 'تاريخ الميلاد مطلوب');
                errors.push('تاريخ الميلاد مطلوب');
            } else {
                const age = calculateAge(birthDate);
                if (age < 1) {
                    showFieldError('patientBirthDate', 'العمر غير صحيح');
                    errors.push('العمر غير صحيح');
                }
            }
            
            // التحقق من الجنس
            if (!gender) {
                errors.push('يرجى اختيار الجنس');
                document.querySelectorAll('input[name="gender"]').forEach(radio => {
                    radio.closest('label').style.color = 'var(--danger)';
                });
            }
            
            // إذا كان هناك أخطاء، عرضها
            if (errors.length > 0) {
                showNotification('error', errors.join('<br>'));
                return;
            }
            
            // عرض رسالة نجاح مع بيانات ملخصة
            const successMessage = `
                <strong>تم التسجيل بنجاح! 🎉</strong><br>
                مرحباً بك ${fullName}<br>
                سيتم تفعيل حسابك خلال 24 ساعة<br>
                تم إرسال رابط التفعيل إلى ${email}
            `;
            
            showNotification('success', successMessage, 8000);
            
            // تعطيل الزر مؤقتاً لمنع الإرسال المتكرر
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.6';
            
            // محاكاة إرسال النموذج
            setTimeout(() => {
                // إعادة تعيين النموذج
                registrationForm.reset();
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                
                // تحويل المستخدم لصفحة تأكيد بعد 3 ثواني
                // window.location.href = 'registration-success.html';
            }, 3000);
        });
    }
    
    // 2. إظهار وإخفاء كلمة المرور
    setupPasswordToggle('patientPassword', 'patientConfirmPassword');
    
    // 3. تنسيق تلقائي لرقم الهاتف
    const phoneInput = document.getElementById('patientPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.startsWith('01')) {
                value = value.substring(0, 11);
            }
            this.value = value;
        });
    }
    
    // 4. التحقق الفوري من الرقم القومي
    const nationalIdInput = document.getElementById('patientNationalId');
    if (nationalIdInput) {
        nationalIdInput.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '').substring(0, 14);
            
            if (this.value.length === 14) {
                // استخراج تاريخ الميلاد من الرقم القومي
                const century = this.value.charAt(0);
                const year = this.value.substring(1, 3);
                const month = this.value.substring(3, 5);
                const day = this.value.substring(5, 7);
                
                let fullYear;
                if (century === '2') fullYear = '19' + year;
                else if (century === '3') fullYear = '20' + year;
                
                if (fullYear && month <= 12 && day <= 31) {
                    const birthDate = `${fullYear}-${month}-${day}`;
                    const dateInput = document.getElementById('patientBirthDate');
                    if (dateInput && !dateInput.value) {
                        dateInput.value = birthDate;
                        showFieldSuccess('patientBirthDate', 'تم استخراج تاريخ الميلاد من الرقم القومي');
                    }
                }
                
                // تحديد الجنس من الرقم القومي
                const genderDigit = parseInt(this.value.charAt(12));
                const genderRadios = document.querySelectorAll('input[name="gender"]');
                if (genderDigit % 2 === 0) {
                    genderRadios[1].checked = true; // أنثى
                } else {
                    genderRadios[0].checked = true; // ذكر
                }
            }
        });
    }
    
    // 5. حساب العمر تلقائياً من تاريخ الميلاد
    const birthDateInput = document.getElementById('patientBirthDate');
    if (birthDateInput) {
        birthDateInput.addEventListener('change', function() {
            const age = calculateAge(this.value);
            if (age > 0) {
                const ageDisplay = document.createElement('div');
                ageDisplay.className = 'age-display';
                ageDisplay.style.cssText = 'margin-top: 5px; color: var(--success); font-size: 14px;';
                ageDisplay.innerHTML = `<i class="fa-solid fa-check-circle"></i> العمر: ${age} سنة`;
                
                const existingDisplay = this.parentNode.querySelector('.age-display');
                if (existingDisplay) existingDisplay.remove();
                this.parentNode.appendChild(ageDisplay);
            }
        });
    }
    
    // 6. تأثيرات بصرية على الحقول
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach(input => {
        // تأثير focus
        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--primary)';
            this.style.boxShadow = '0 0 0 3px rgba(45, 91, 255, 0.1)';
            
            // إضافة أيقونة
            const icon = document.createElement('i');
            icon.className = 'fa-regular fa-pen-to-square';
            icon.style.cssText = 'position: absolute; left: 15px; top: 45px; color: var(--primary);';
            
            const parent = this.parentNode;
            parent.style.position = 'relative';
            
            const existingIcon = parent.querySelector('.focus-icon');
            if (existingIcon) existingIcon.remove();
            
            icon.classList.add('focus-icon');
            parent.appendChild(icon);
        });
        
        // تأثير blur
        input.addEventListener('blur', function() {
            this.style.borderColor = 'var(--light-gray)';
            this.style.boxShadow = 'none';
            
            const icon = this.parentNode.querySelector('.focus-icon');
            if (icon) icon.remove();
        });
    });
    
    // 7. إضافة عداد الأحرف
    const textarea = document.getElementById('patientAddress');
    if (textarea) {
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.style.cssText = 'text-align: left; font-size: 12px; color: var(--gray); margin-top: 5px;';
        counter.innerHTML = '<span>0</span>/500 حرف';
        textarea.parentNode.appendChild(counter);
        
        textarea.addEventListener('input', function() {
            const count = this.value.length;
            const span = counter.querySelector('span');
            span.textContent = count;
            
            if (count > 450) {
                span.style.color = count > 500 ? 'var(--danger)' : 'var(--warning)';
            } else {
                span.style.color = 'var(--gray)';
            }
            
            if (count > 500) {
                this.value = this.value.substring(0, 500);
            }
        });
    }
    
    // 8. إضافة مؤشر قوة كلمة المرور
    const passwordInput = document.getElementById('patientPassword');
    if (passwordInput) {
        const strengthMeter = document.createElement('div');
        strengthMeter.style.cssText = 'margin-top: 10px;';
        strengthMeter.innerHTML = `
            <div style="display: flex; gap: 5px; margin-bottom: 5px;">
                <div class="strength-bar" style="height: 5px; flex: 1; background: #eee; border-radius: 5px;"></div>
                <div class="strength-bar" style="height: 5px; flex: 1; background: #eee; border-radius: 5px;"></div>
                <div class="strength-bar" style="height: 5px; flex: 1; background: #eee; border-radius: 5px;"></div>
                <div class="strength-bar" style="height: 5px; flex: 1; background: #eee; border-radius: 5px;"></div>
            </div>
            <div class="strength-text" style="font-size: 12px; color: var(--gray);">قوة كلمة المرور: ضعيفة</div>
        `;
        passwordInput.parentNode.appendChild(strengthMeter);
        
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const strength = calculatePasswordStrength(password);
            const bars = strengthMeter.querySelectorAll('.strength-bar');
            const text = strengthMeter.querySelector('.strength-text');
            
            bars.forEach((bar, index) => {
                bar.style.backgroundColor = index < strength.level ? strength.color : '#eee';
            });
            
            text.innerHTML = `قوة كلمة المرور: ${strength.message}`;
            text.style.color = strength.color;
        });
    }
    
    // 9. زر العودة للأعلى
    const scrollTopBtn = document.createElement('div');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 30px;
        width: 45px;
        height: 45px;
        background: var(--primary);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
        box-shadow: 0 4px 12px rgba(45, 91, 255, 0.3);
        z-index: 999;
    `;
    document.body.appendChild(scrollTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
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
    
    // 10. إضافة رسالة ترحيبية متغيرة
    const pageHeader = document.querySelector('.page-header p');
    if (pageHeader) {
        const messages = [
            'سجل الآن واحصل على خدمات التمريض المنزلي بجودة عالية وسهولة',
            'انضم إلى آلاف المرضى الذين يثقون في خدماتنا',
            'خدمات تمريضية منزلية على مدار الساعة',
            'فريق متكامل من الممرضين المؤهلين لخدمتك'
        ];
        
        let index = 0;
        setInterval(() => {
            index = (index + 1) % messages.length;
            pageHeader.style.opacity = '0';
            setTimeout(() => {
                pageHeader.textContent = messages[index];
                pageHeader.style.opacity = '1';
                pageHeader.style.transition = 'opacity 0.5s';
            }, 300);
        }, 4000);
    }
    
    // =============== الدوال المساعدة ===============
    
    function showFieldError(fieldId, message) {
        const field = document.getElementById(fieldId);
        if (!field) return;
        
        // إزالة أي خطأ سابق
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) existingError.remove();
        
        // تغيير لون الحدود
        field.style.borderColor = 'var(--danger)';
        
        // إضافة رسالة الخطأ
        const error = document.createElement('div');
        error.className = 'field-error';
        error.style.cssText = `
            color: var(--danger);
            font-size: 12px;
            margin-top: 5px;
            display: flex;
            align-items: center;
            gap: 5px;
        `;
        error.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${message}`;
        
        field.parentNode.appendChild(error);
    }
    
    function showFieldSuccess(fieldId, message) {
        const field = document.getElementById(fieldId);
        if (!field) return;
        
        const success = document.createElement('div');
        success.className = 'field-success';
        success.style.cssText = `
            color: var(--success);
            font-size: 12px;
            margin-top: 5px;
            display: flex;
            align-items: center;
            gap: 5px;
        `;
        success.innerHTML = `<i class="fa-solid fa-check-circle"></i> ${message}`;
        
        field.parentNode.appendChild(success);
        
        setTimeout(() => success.remove(), 3000);
    }
    
    function removeAllErrors() {
        document.querySelectorAll('.field-error, .field-success').forEach(el => el.remove());
        
        document.querySelectorAll('.form-control').forEach(input => {
            input.style.borderColor = 'var(--light-gray)';
        });
        
        document.querySelectorAll('input[name="gender"]').forEach(radio => {
            radio.closest('label').style.color = '';
        });
    }
    
    function calculateAge(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        
        return age;
    }
    
    function calculatePasswordStrength(password) {
        let strength = 0;
        
        if (password.length >= 8) strength += 1;
        if (password.length >= 10) strength += 1;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
        
        const levels = ['ضعيفة جداً', 'ضعيفة', 'متوسطة', 'جيدة', 'قوية', 'قوية جداً'];
        const colors = ['#ef4444', '#ef4444', '#f59e0b', '#f59e0b', '#10b981', '#10b981'];
        
        return {
            level: strength,
            message: levels[strength] || 'ضعيفة',
            color: colors[strength] || '#ef4444'
        };
    }
    
    function setupPasswordToggle(...passwordFieldIds) {
        passwordFieldIds.forEach(id => {
            const field = document.getElementById(id);
            if (!field) return;
            
            const parent = field.parentNode;
            parent.style.position = 'relative';
            
            const toggleBtn = document.createElement('span');
            toggleBtn.innerHTML = '<i class="fa-regular fa-eye"></i>';
            toggleBtn.style.cssText = `
                position: absolute;
                left: 15px;
                top: 40px;
                cursor: pointer;
                color: var(--gray);
                z-index: 10;
                font-size: 18px;
            `;
            
            toggleBtn.addEventListener('click', function() {
                const type = field.type === 'password' ? 'text' : 'password';
                field.type = type;
                this.innerHTML = type === 'password' ? 
                    '<i class="fa-regular fa-eye"></i>' : 
                    '<i class="fa-regular fa-eye-slash"></i>';
            });
            
            parent.appendChild(toggleBtn);
        });
    }
    
    function showNotification(type, message, duration = 5000) {
        // إزالة أي إشعار سابق
        const oldNotification = document.querySelector('.registration-notification');
        if (oldNotification) oldNotification.remove();
        
        // إنشاء الإشعار
        const notification = document.createElement('div');
        notification.className = 'registration-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'success' ? 'var(--success)' : 'var(--danger)'};
            color: white;
            padding: 20px 30px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
            z-index: 9999;
            max-width: 400px;
            width: 90%;
            text-align: center;
            direction: rtl;
            animation: slideDown 0.3s ease;
        `;
        
        notification.innerHTML = `
            <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}" style="font-size: 30px; margin-bottom: 10px;"></i>
            <div style="font-size: 16px; line-height: 1.6;">${message}</div>
        `;
        
        document.body.appendChild(notification);
        
        // إضافة CSS للأنيميشن إذا لم يكن موجوداً
        if (!document.getElementById('notificationStyles')) {
            const style = document.createElement('style');
            style.id = 'notificationStyles';
            style.textContent = `
                @keyframes slideDown {
                    from { transform: translate(-50%, -100%); opacity: 0; }
                    to { transform: translate(-50%, 0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
        // إخفاء الإشعار بعد المدة المحددة
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translate(-50%, -20px)';
            notification.style.transition = 'all 0.3s';
            
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }
    
    // 11. إضافة تأثير تحميل وهمي عند النقر على زر التسجيل
    const originalText = submitBtn?.innerHTML;
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            if (!this.disabled) {
                this.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جاري التسجيل...';
            }
            
            // إعادة النص الأصلي بعد 3 ثواني (في حالة الفشل)
            setTimeout(() => {
                if (!this.disabled) {
                    this.innerHTML = originalText;
                }
            }, 3000);
        });
    }
});