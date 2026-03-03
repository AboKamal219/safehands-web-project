// =============== صفحة تسجيل الدخول - تفاعلات وتجربة مستخدم ===============

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. التحقق من المدخلات وإرسال النموذج
    const loginForm = document.querySelector('form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault(); // منع إرسال النموذج للسيرفر
            
            // جلب قيم الحقول
            const email = document.querySelector('input[type="email"]').value.trim();
            const password = document.querySelector('input[type="password"]').value.trim();
            
            // إزالة أي رسائل خطأ سابقة
            removeAllErrors();
            
            // التحقق من المدخلات
            let isValid = true;
            
            if (!email) {
                showError('البريد الإلكتروني', 'يرجى إدخال البريد الإلكتروني');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('البريد الإلكتروني', 'البريد الإلكتروني غير صحيح');
                isValid = false;
            }
            
            if (!password) {
                showError('كلمة المرور', 'يرجى إدخال كلمة المرور');
                isValid = false;
            } else if (password.length < 6) {
                showError('كلمة المرور', 'كلمة المرور يجب أن تكون 6 أحرف على الأقل');
                isValid = false;
            }
            
            // إذا كانت البيانات صحيحة
            if (isValid) {
                // عرض رسالة نجاح
                showNotification('success', 'تم تسجيل الدخول بنجاح! جاري التحويل...');
                
                // محاكاة تحويل بعد ثانيتين
                setTimeout(function() {
                    window.location.href = 'dashboard.html'; // غيرها حسب الصفحة المطلوبة
                }, 2000);
            }
        });
    }
    
    // 2. إظهار وإخفاء كلمة المرور
    const passwordField = document.querySelector('input[type="password"]');
    
    if (passwordField) {
        // البحث عن الـ form-group المحتوية على كلمة المرور
        const passwordGroup = passwordField.closest('.form-group');
        
        if (passwordGroup) {
            // جعل الموضع نسبي لإضافة الأيقونة داخله
            passwordGroup.style.position = 'relative';
            
            // إنشاء زر إظهار/إخفاء كلمة المرور
            const toggleBtn = document.createElement('span');
            toggleBtn.innerHTML = '<i class="fa-regular fa-eye"></i>';
            toggleBtn.style.cssText = `
                position: absolute;
                left: 15px;
                top: 38px;
                cursor: pointer;
                color: #6b7280;
                z-index: 10;
                font-size: 18px;
            `;
            toggleBtn.setAttribute('title', 'إظهار/إخفاء كلمة المرور');
            
            // إضافة الحدث
            toggleBtn.addEventListener('click', function() {
                const type = passwordField.type === 'password' ? 'text' : 'password';
                passwordField.type = type;
                
                // تغيير الأيقونة
                if (type === 'password') {
                    this.innerHTML = '<i class="fa-regular fa-eye"></i>';
                } else {
                    this.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
                }
            });
            
            passwordGroup.appendChild(toggleBtn);
        }
    }
    
    // 3. إضافة خاصية "تذكرني"
    const form = document.querySelector('form');
    
    if (form) {
        // إنشاء عنصر تذكرني
        const rememberDiv = document.createElement('div');
        rememberDiv.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 15px 0 10px;
        `;
        
        rememberDiv.innerHTML = `
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                <input type="checkbox" id="rememberMe" style="width: 16px; height: 16px; cursor: pointer;">
                <span style="font-size: 14px; color: #4b5563;">تذكرني</span>
            </label>
            <a href="#" style="color: #2563eb; font-size: 13px; font-weight: 600; text-decoration: none;">
                نسيت كلمة المرور؟
            </a>
        `;
        
        // إدراجها قبل زر تسجيل الدخول
        const loginBtn = form.querySelector('.login-btn');
        if (loginBtn) {
            form.insertBefore(rememberDiv, loginBtn);
            
            // إزالة رابط "نسيت كلمة المرور" القديم إذا كان موجوداً
            const oldForgot = form.querySelector('.forgot-pass');
            if (oldForgot) {
                oldForgot.style.display = 'none';
            }
        }
    }
    
    // 4. تأثيرات على الحقول (focus/blur)
    const inputs = document.querySelectorAll('.form-input');
    
    inputs.forEach(input => {
        // تأثير focus
        input.addEventListener('focus', function() {
            this.style.borderColor = '#2563eb';
            this.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
        });
        
        // تأثير blur
        input.addEventListener('blur', function() {
            this.style.borderColor = '#e5e7eb';
            this.style.boxShadow = 'none';
        });
        
        // التحقق الفوري للبريد الإلكتروني
        if (input.type === 'email') {
            input.addEventListener('blur', function() {
                const value = this.value.trim();
                const errorElement = this.parentNode.querySelector('.field-error');
                
                if (value && !isValidEmail(value)) {
                    showFieldError(this, 'البريد الإلكتروني غير صحيح');
                } else if (errorElement) {
                    errorElement.remove();
                    this.style.borderColor = '#e5e7eb';
                }
            });
        }
        
        // التحقق الفوري لكلمة المرور
        if (input.type === 'password') {
            input.addEventListener('input', function() {
                const value = this.value.trim();
                const errorElement = this.parentNode.querySelector('.field-error');
                
                if (value && value.length < 6 && value.length > 0) {
                    showFieldError(this, 'كلمة المرور قصيرة (6 أحرف على الأقل)');
                } else if (errorElement) {
                    errorElement.remove();
                    this.style.borderColor = '#e5e7eb';
                }
            });
        }
    });
    
    // 5. رسائل ترحيبية متغيرة (للحيوية)
    const headerText = document.querySelector('.page-header p');
    if (headerText) {
        const messages = [
            'سجل دخولك للوصول إلى حسابك ومتابعة حجوزاتك',
            'نحن سعداء بعودتك! سجل دخولك الآن',
            'مرحباً بعودتك! حسابك في انتظارك',
            'سجل دخولك واستكمل رحلة الرعاية الصحية'
        ];
        
        // تغيير الرسالة كل 4 ثواني
        let index = 0;
        setInterval(function() {
            index = (index + 1) % messages.length;
            headerText.style.opacity = '0';
            
            setTimeout(function() {
                headerText.textContent = messages[index];
                headerText.style.opacity = '1';
                headerText.style.transition = 'opacity 0.5s';
            }, 300);
        }, 4000);
    }
    
    // 6. إضافة تأثير الكتابة لزر تسجيل الدخول
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 10px rgba(37, 99, 235, 0.3)';
        });
        
        loginBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(37, 99, 235, 0.2)';
        });
    }
    
    // 7. إضافة روابط سريعة تحت الفورم
    const registerLink = document.querySelector('.register-link');
    if (registerLink) {
        // إضافة زر العودة للرئيسية
        const backHome = document.createElement('div');
        backHome.style.cssText = 'text-align: center; margin-top: 15px; font-size: 14px;';
        backHome.innerHTML = '<a href="index.html" style="color: #6b7280; text-decoration: none;"><i class="fa-solid fa-arrow-right"></i> العودة للرئيسية</a>';
        
        registerLink.after(backHome);
    }
    
    // 8. لوحة مفاتيح افتراضية (للجوال) - تحسين تجربة
    if (window.innerWidth <= 768) {
        document.querySelector('input[type="email"]').setAttribute('inputmode', 'email');
        document.querySelector('input[type="password"]').setAttribute('inputmode', 'text');
    }
    
    // =============== دوال مساعدة ===============
    
    // دالة التحقق من صحة البريد الإلكتروني
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // دالة إظهار الخطأ العام
    function showError(fieldName, message) {
        // البحث عن الحقل المحدد
        const inputs = document.querySelectorAll('.form-input');
        let targetInput = null;
        
        if (fieldName === 'البريد الإلكتروني') {
            targetInput = document.querySelector('input[type="email"]');
        } else if (fieldName === 'كلمة المرور') {
            targetInput = document.querySelector('input[type="password"]');
        }
        
        if (targetInput) {
            showFieldError(targetInput, message);
        } else {
            alert(message); // Fallback
        }
    }
    
    // دالة إظهار الخطأ بجانب الحقل
    function showFieldError(input, message) {
        // إزالة أي خطأ سابق
        const existingError = input.parentNode.querySelector('.field-error');
        if (existingError) existingError.remove();
        
        // تحديد لون الحدود
        input.style.borderColor = '#ef4444';
        
        // إنشاء رسالة الخطأ
        const error = document.createElement('div');
        error.className = 'field-error';
        error.style.cssText = `
            color: #ef4444;
            font-size: 12px;
            margin-top: 5px;
            display: flex;
            align-items: center;
            gap: 5px;
        `;
        error.innerHTML = `<i class="fa-solid fa-circle-exclamation" style="font-size: 12px;"></i> ${message}`;
        
        input.parentNode.appendChild(error);
    }
    
    // دالة إزالة كل الأخطاء
    function removeAllErrors() {
        document.querySelectorAll('.field-error').forEach(el => el.remove());
        
        document.querySelectorAll('.form-input').forEach(input => {
            input.style.borderColor = '#e5e7eb';
        });
    }
    
    // دالة إظهار الإشعارات
    function showNotification(type, message) {
        // إزالة أي إشعار سابق
        const oldNotification = document.querySelector('.login-notification');
        if (oldNotification) oldNotification.remove();
        
        // إنشاء الإشعار
        const notification = document.createElement('div');
        notification.className = 'login-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'success' ? '#10b981' : '#3b82f6'};
            color: white;
            padding: 12px 25px;
            border-radius: 50px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 9999;
            font-weight: 500;
            direction: rtl;
            animation: slideDown 0.3s ease;
        `;
        
        notification.innerHTML = `
            <i class="fa-solid ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // إضافة الـ animation إذا مش موجودة
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
        
        // إخفاء الإشعار بعد 3 ثواني
        setTimeout(function() {
            notification.style.opacity = '0';
            notification.style.transform = 'translate(-50%, -20px)';
            notification.style.transition = 'all 0.3s';
            
            setTimeout(function() {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // 9. تفعيل اختصار Enter
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const submitBtn = document.querySelector('.login-btn');
            if (submitBtn && document.activeElement?.classList.contains('form-input')) {
                e.preventDefault();
                submitBtn.click();
            }
        }
    });
    
    // 10. تحميل البريد الإلكتروني من التخزين المحلي (إذا كان "تذكرني" مفعل)
    const savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) {
        const emailInput = document.querySelector('input[type="email"]');
        if (emailInput) {
            emailInput.value = savedEmail;
            
            // تفعيل checkbox تذكرني
            const rememberCheck = document.getElementById('rememberMe');
            if (rememberCheck) {
                rememberCheck.checked = true;
            }
        }
    }
    
    // حفظ البريد الإلكتروني عند اختيار "تذكرني"
    const rememberCheck = document.getElementById('rememberMe');
    if (rememberCheck) {
        rememberCheck.addEventListener('change', function() {
            const emailInput = document.querySelector('input[type="email"]');
            if (this.checked && emailInput.value) {
                localStorage.setItem('savedEmail', emailInput.value);
            } else {
                localStorage.removeItem('savedEmail');
            }
        });
    }
});