// =============== تفاعلات صفحة تسجيل الممرضين ===============

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. رفع الملفات (محاكاة)
    const uploadBoxes = document.querySelectorAll('.upload-box');
    
    uploadBoxes.forEach(box => {
        box.addEventListener('click', function() {
            alert('سيتم فتح نافذة اختيار الملفات لرفع المستند المطلوب');
            
            // تغيير شكل الصندوق (تأثير بصري)
            this.style.borderColor = '#2563eb';
            this.style.backgroundColor = '#eff6ff';
            
            // إضافة اسم ملف وهمي
            const fileNameDiv = document.createElement('div');
            fileNameDiv.className = 'uploaded-file-name';
            fileNameDiv.style.cssText = 'color: #10b981; font-weight: 600; margin-top: 10px; font-size: 0.9rem;';
            fileNameDiv.innerHTML = '<i class="fa-solid fa-check-circle"></i> تم رفع الملف: document.pdf';
            
            // إزالة أي رسالة سابقة
            const oldMsg = this.querySelector('.uploaded-file-name');
            if (oldMsg) oldMsg.remove();
            
            this.appendChild(fileNameDiv);
        });
    });

    // 2. اختيار التخصصات المتعددة
    const selectItems = document.querySelectorAll('.select-item');
    
    selectItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (e.ctrlKey || e.metaKey) {
                // اختيار متعدد مع Ctrl
                this.classList.toggle('selected');
            } else {
                // اختيار واحد عادي
                const parent = this.parentElement;
                parent.querySelectorAll('.select-item').forEach(el => {
                    el.classList.remove('selected');
                });
                this.classList.add('selected');
            }
        });
    });

    // 3. التحقق من المدخلات قبل الإرسال
    const form = document.querySelector('form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // جلب الحقول المطلوبة
            const fullName = document.querySelector('input[placeholder*="الاسم الكامل"]').value.trim();
            const nationalId = document.querySelector('input[placeholder*="الرقم القومي"]').value.trim();
            const phone = document.querySelector('input[type="tel"]').value.trim();
            const email = document.querySelector('input[type="email"]').value.trim();
            const address = document.querySelector('textarea[placeholder*="العنوان"]').value.trim();
            const experience = document.querySelector('select').value;
            const price = document.querySelector('input[type="number"]').value.trim();
            const termsChecked = document.getElementById('terms')?.checked;
            
            // التحقق من الحقول المطلوبة
            let isValid = true;
            let errorMessage = '';
            
            if (!fullName) {
                errorMessage += '• الاسم الكامل مطلوب\n';
                isValid = false;
            }
            
            if (!nationalId) {
                errorMessage += '• الرقم القومي مطلوب\n';
                isValid = false;
            } else if (!/^\d{14}$/.test(nationalId)) {
                errorMessage += '• الرقم القومي يجب أن يكون 14 رقمًا\n';
                isValid = false;
            }
            
            if (!phone) {
                errorMessage += '• رقم الهاتف مطلوب\n';
                isValid = false;
            } else if (!/^01[0-9]{9}$/.test(phone)) {
                errorMessage += '• رقم الهاتف غير صحيح (يجب أن يبدأ بـ 01)\n';
                isValid = false;
            }
            
            if (!email) {
                errorMessage += '• البريد الإلكتروني مطلوب\n';
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                errorMessage += '• البريد الإلكتروني غير صحيح\n';
                isValid = false;
            }
            
            if (!address) {
                errorMessage += '• العنوان مطلوب\n';
                isValid = false;
            }
            
            if (!experience || experience === 'اختر عدد سنوات الخبرة') {
                errorMessage += '• سنوات الخبرة مطلوبة\n';
                isValid = false;
            }
            
            if (!price) {
                errorMessage += '• السعر بالساعة مطلوب\n';
                isValid = false;
            } else if (price < 50 || price > 500) {
                errorMessage += '• السعر يجب أن يكون بين 50 و 500 جنيه\n';
                isValid = false;
            }
            
            if (!termsChecked) {
                errorMessage += '• يجب الموافقة على الشروط والأحكام\n';
                isValid = false;
            }
            
            if (isValid) {
                alert('✅ تم إرسال طلب التسجيل بنجاح!\nسيتم مراجعة بياناتك خلال 24-48 ساعة.');
                
                // إعادة تعيين النموذج (اختياري)
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            } else {
                alert('❌ يرجى تصحيح الأخطاء التالية:\n' + errorMessage);
            }
        });
    }

    // 4. إضافة تأثيرات على الحقول
    const inputs = document.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        // تأثير focus
        input.addEventListener('focus', function() {
            this.style.borderColor = '#2563eb';
            this.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
        });
        
        // تأثير blur
        input.addEventListener('blur', function() {
            this.style.borderColor = '#cbd5e1';
            this.style.boxShadow = 'none';
        });
    });

    // 5. زر السابق (مش شغال حالياً لأنه مش موجود في الـ HTML)
    const prevBtn = document.querySelector('.btn-prev');
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            alert('هذه هي الخطوة الأولى، لا يمكن الرجوع');
        });
    }

    // 6. عرض رسالة تأكيد عند محاولة الخروج
    window.addEventListener('beforeunload', function(e) {
        // التحقق إذا كان أي حقل فيه بيانات
        const hasData = Array.from(inputs).some(input => {
            if (input.type === 'checkbox') return false;
            return input.value.trim() !== '';
        });
        
        if (hasData) {
            e.preventDefault();
            e.returnValue = 'لديك بيانات غير محفوظة، هل تريد المغادرة؟';
        }
    });

    // 7. تحسين تجربة إدخال الرقم القومي
    const nationalIdInput = document.querySelector('input[placeholder*="الرقم القومي"]');
    if (nationalIdInput) {
        nationalIdInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }

    // 8. تحسين تجربة إدخال رقم الهاتف
    const phoneInput = document.querySelector('input[type="tel"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }

    // 9. إظهار رسالة ترحيب في الـ hero
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        // تغيير النص كل 4 ثواني (لإضافة حيوية)
        const messages = [
            'كن جزءًا من شبكتنا المؤهلة للممرضين',
            'سجل الآن وابدأ في تقديم خدماتك',
            'نحن نبحث عن أمثالك من الممرضين المتميزين',
            'انضم إلى عائلة Safe Hands'
        ];
        
        const pElement = heroSection.querySelector('p');
        if (pElement) {
            let index = 0;
            setInterval(() => {
                index = (index + 1) % messages.length;
                pElement.style.opacity = '0';
                setTimeout(() => {
                    pElement.textContent = messages[index];
                    pElement.style.opacity = '1';
                }, 300);
            }, 4000);
        }
    }

    // 10. إضافة عداد للأحرف المتبقية للعنوان (اختياري)
    const addressTextarea = document.querySelector('textarea[placeholder*="العنوان"]');
    if (addressTextarea) {
        const counter = document.createElement('small');
        counter.style.cssText = 'display: block; margin-top: 5px; color: #94a3b8; font-size: 0.75rem;';
        counter.className = 'char-counter';
        addressTextarea.parentNode.appendChild(counter);
        
        const updateCounter = () => {
            const remaining = 200 - addressTextarea.value.length;
            counter.textContent = `المتبقي: ${remaining} حرف`;
            if (remaining < 20) {
                counter.style.color = '#ef4444';
            } else {
                counter.style.color = '#94a3b8';
            }
        };
        
        addressTextarea.addEventListener('input', updateCounter);
        updateCounter();
    }

    // 11. إضافة تأثير hover للأزرار
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // 12. إضافة خاصية حفظ البيانات مؤقتاً (localStorage)
    const saveDataLocally = () => {
        const data = {
            fullName: document.querySelector('input[placeholder*="الاسم الكامل"]')?.value || '',
            phone: document.querySelector('input[type="tel"]')?.value || '',
            email: document.querySelector('input[type="email"]')?.value || ''
        };
        
        localStorage.setItem('nurseRegistrationDraft', JSON.stringify(data));
    };

    // حفظ كل 5 ثواني
    setInterval(saveDataLocally, 5000);

    // استعادة البيانات المحفوظة
    const savedData = localStorage.getItem('nurseRegistrationDraft');
    if (savedData) {
        const data = JSON.parse(savedData);
        if (data.fullName) {
            document.querySelector('input[placeholder*="الاسم الكامل"]').value = data.fullName;
        }
        if (data.phone) {
            document.querySelector('input[type="tel"]').value = data.phone;
        }
        if (data.email) {
            document.querySelector('input[type="email"]').value = data.email;
        }
    }

    // 13. إضافة اختصارات لوحة المفاتيح
    document.addEventListener('keydown', function(e) {
        // Ctrl + S للحفظ
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            alert('تم حفظ مسودة الطلب مؤقتاً');
        }
        
        // Ctrl + Enter للإرسال
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            document.querySelector('button[type="submit"]')?.click();
        }
    });

    // 14. تفعيل أداة اختيار الوقت للـ schedule
    const scheduleCards = document.querySelectorAll('.schedule-card');
    scheduleCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // منع النقر إذا كان على الـ switch
            if (e.target.tagName === 'INPUT' || e.target.classList.contains('slider')) {
                return;
            }
            
            const checkbox = this.querySelector('input[type="checkbox"]');
            if (checkbox) {
                checkbox.checked = !checkbox.checked;
                
                // تغيير شكل الكارد
                if (checkbox.checked) {
                    this.style.borderColor = '#2563eb';
                    this.style.backgroundColor = '#eff6ff';
                } else {
                    this.style.borderColor = '#e2e8f0';
                    this.style.backgroundColor = '#fff';
                }
            }
        });
    });

    // 15. عرض إشعار ترحيبي
    setTimeout(() => {
        console.log('✅ صفحة تسجيل الممرضين جاهزة - Safe Hands');
    }, 1000);
});