document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            
            // إزالة الأخطاء السابقة
            document.querySelectorAll('.field-error').forEach(el => el.remove());
            document.querySelectorAll('.form-input').forEach(input => {
                input.style.borderColor = '#e5e7eb';
            });
            
            let isValid = true;
            
            // التحقق من البريد الإلكتروني
            if (!email) {
                showFieldError('email', 'يرجى إدخال البريد الإلكتروني');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showFieldError('email', 'البريد الإلكتروني غير صحيح');
                isValid = false;
            }
            
            // التحقق من كلمة المرور
            if (!password) {
                showFieldError('password', 'يرجى إدخال كلمة المرور');
                isValid = false;
            } else if (password.length < 6) {
                showFieldError('password', 'كلمة المرور يجب أن تكون 6 أحرف على الأقل');
                isValid = false;
            }
            
            // إذا كانت البيانات صحيحة
            if (isValid) {
                showNotification('success', 'تم تسجيل الدخول بنجاح! جاري التحويل...');
                
                setTimeout(function() {
                    window.location.href = 'dashboard.html';
                }, 2000);
            }
        });
    }
    
    // دوال مساعدة
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showFieldError(fieldId, message) {
        const input = document.getElementById(fieldId);
        if (!input) return;
        
        input.style.borderColor = '#ef4444';
        
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
        error.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${message}`;
        
        input.parentNode.appendChild(error);
    }
    
    function showNotification(type, message) {
        const notification = document.createElement('div');
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
        
        setTimeout(function() {
            notification.style.opacity = '0';
            notification.style.transform = 'translate(-50%, -20px)';
            notification.style.transition = 'all 0.3s';
            
            setTimeout(function() {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // إضافة تأثير إظهار/إخفاء كلمة المرور
    const passwordField = document.getElementById('password');
    if (passwordField) {
        const wrapper = passwordField.parentNode;
        wrapper.style.position = 'relative';
        
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
        
        toggleBtn.addEventListener('click', function() {
            const type = passwordField.type === 'password' ? 'text' : 'password';
            passwordField.type = type;
            this.innerHTML = type === 'password' ? 
                '<i class="fa-regular fa-eye"></i>' : 
                '<i class="fa-regular fa-eye-slash"></i>';
        });
        
        wrapper.appendChild(toggleBtn);
    }
});