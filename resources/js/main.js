// =============== الصفحة الرئيسية - تفاعلات فقط ===============

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. التنقل السلس عند الضغط على روابط الهيدر
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // إزالة active من كل الروابط
            navLinks.forEach(l => l.classList.remove('active'));
            // إضافة active للرابط المضغوط
            this.classList.add('active');
            
            // التمرير السلس للقسم المطلوب
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // 2. زر القائمة في الموبايل
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // تغيير شكل الأيقونة
            const icon = this.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
        
        // إغلاق القائمة عند الضغط على رابط
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // 3. تأثير الهيدر عند التمرير
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // تفعيل الرابط النشط حسب القسم الظاهر
        updateActiveLinkOnScroll();
    });

    function updateActiveLinkOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const currentId = section.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // 4. زر العودة للأعلى
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 5. فتح وإغلاق نافذة الحجز
    const requestServiceBtn = document.getElementById('requestServiceBtn');
    const startBookingBtn = document.getElementById('startBookingBtn');
    const bookingModal = document.getElementById('bookingModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    
    function openModal() {
        if (bookingModal) {
            bookingModal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // منع التمرير
        }
    }
    
    function closeModal() {
        if (bookingModal) {
            bookingModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // إعادة التمرير
        }
    }
    
    if (requestServiceBtn) {
        requestServiceBtn.addEventListener('click', openModal);
    }
    
    if (startBookingBtn) {
        startBookingBtn.addEventListener('click', openModal);
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    // إغلاق النافذة عند الضغط خارج المحتوى
    if (bookingModal) {
        bookingModal.addEventListener('click', function(e) {
            if (e.target === bookingModal) {
                closeModal();
            }
        });
        
        // إغلاق بالضغط على ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && bookingModal.style.display === 'flex') {
                closeModal();
            }
        });
    }

    // 6. التنقل بين خطوات الحجز
    let currentStep = 1;
    const steps = [1, 2, 3, 4].map(num => document.getElementById(`step${num}`));
    const progressFill = document.getElementById('progressFill');
    
    // أزرار التنقل
    const nextToStep2 = document.getElementById('nextToStep2');
    const nextToStep3 = document.getElementById('nextToStep3');
    const nextToStep4 = document.getElementById('nextToStep4');
    const backToStep1 = document.getElementById('backToStep1');
    const backToStep2 = document.getElementById('backToStep2');
    const backToStep3 = document.getElementById('backToStep3');
    const confirmBooking = document.getElementById('confirmBooking');
    
    function showStep(step) {
        steps.forEach((s, index) => {
            if (s) {
                if (index + 1 === step) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            }
        });
        
        currentStep = step;
        
        // تحديث شريط التقدم
        if (progressFill) {
            const percentage = (step / 4) * 100;
            progressFill.style.width = `${percentage}%`;
        }
    }
    
    // التحقق من البيانات قبل الانتقال
    function validateStep1() {
        const name = document.getElementById('patientName')?.value;
        const phone = document.getElementById('patientPhone')?.value;
        const age = document.getElementById('patientAge')?.value;
        const gender = document.getElementById('patientGender')?.value;
        const address = document.getElementById('patientAddress')?.value;
        
        if (!name || !phone || !age || !gender || !address) {
            alert('يرجى إدخال جميع البيانات المطلوبة');
            return false;
        }
        return true;
    }
    
    function validateStep2() {
        const service = document.getElementById('serviceType')?.value;
        const date = document.getElementById('serviceDate')?.value;
        const time = document.getElementById('serviceTime')?.value;
        
        if (!service || !date || !time) {
            alert('يرجى اختيار الخدمة والتاريخ والوقت');
            return false;
        }
        return true;
    }
    
    function validateStep3() {
        const selectedNurse = document.querySelector('.nurse-card.selected');
        if (!selectedNurse) {
            alert('يرجى اختيار ممرض');
            return false;
        }
        return true;
    }
    
    if (nextToStep2) {
        nextToStep2.addEventListener('click', function() {
            if (validateStep1()) {
                showStep(2);
            }
        });
    }
    
    if (nextToStep3) {
        nextToStep3.addEventListener('click', function() {
            if (validateStep2()) {
                // هنا ممكن نجيب الممرضين المتاحين حسب الخدمة
                // بس هنكتفي بتحديث الشاشة
                showStep(3);
            }
        });
    }
    
    if (nextToStep4) {
        nextToStep4.addEventListener('click', function() {
            if (validateStep3()) {
                // تحديث ملخص الطلب
                updateSummary();
                showStep(4);
            }
        });
    }
    
    if (backToStep1) backToStep1.addEventListener('click', () => showStep(1));
    if (backToStep2) backToStep2.addEventListener('click', () => showStep(2));
    if (backToStep3) backToStep3.addEventListener('click', () => showStep(3));
    
    // تحديث ملخص الطلب
    function updateSummary() {
        const serviceSelect = document.getElementById('serviceType');
        const dateInput = document.getElementById('serviceDate');
        const timeSelect = document.getElementById('serviceTime');
        const durationSelect = document.getElementById('serviceDuration');
        const addressInput = document.getElementById('patientAddress');
        const urgencySelect = document.getElementById('urgencyLevel');
        const selectedNurse = document.querySelector('.nurse-card.selected');
        
        document.getElementById('summaryService').textContent = 
            serviceSelect?.selectedOptions[0]?.text.split(' - ')[0] || '-';
        document.getElementById('summaryDate').textContent = 
            dateInput?.value ? `${dateInput.value} - ${timeSelect?.selectedOptions[0]?.text}` : '-';
        document.getElementById('summaryNurse').textContent = 
            selectedNurse?.querySelector('h4')?.textContent || '-';
        document.getElementById('summaryDuration').textContent = 
            durationSelect?.selectedOptions[0]?.text || '1';
        document.getElementById('summaryAddress').textContent = 
            addressInput?.value || '-';
        document.getElementById('summaryUrgency').textContent = 
            urgencySelect?.selectedOptions[0]?.text || '-';
        
        // حساب السعر التقريبي
        let price = 0;
        const serviceValue = serviceSelect?.value;
        if (serviceValue === 'حقنة') price = 75;
        else if (serviceValue === 'رعاية المسنين') price = 150 * (parseInt(durationSelect?.value) || 1);
        else if (serviceValue === 'تغيير الجروح') price = 100;
        else if (serviceValue === 'تركيب كانيولا') price = 120;
        else if (serviceValue === 'فحص العلامات الحيوية') price = 60;
        else if (serviceValue === 'إدارة الأدوية') price = 80;
        
        document.getElementById('summaryPrice').textContent = `${price} جنية`;
    }
    // اختيار الممرض (ده هيفضل شغال مع البيانات الجاية من PHP)
    document.querySelectorAll('.nurse-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.nurse-card').forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
    // 8. تأكيد الحجز
    if (confirmBooking) {
        confirmBooking.addEventListener('click', function() {
            alert('تم إرسال طلب الحجز بنجاح! سيتم التواصل معك قريباً لتأكيد التفاصيل.');
            
            // إغلاق النافذة بعد التأكيد
            setTimeout(() => {
                closeModal();
                // إعادة تعيين الخطوات
                showStep(1);
                
                // إعادة تعيين الحقول (اختياري)
                document.querySelectorAll('input, select, textarea').forEach(field => {
                    if (field.type !== 'radio' && field.type !== 'checkbox') {
                        field.value = '';
                    }
                });
                document.querySelectorAll('.nurse-card').forEach(c => c.classList.remove('selected'));
            }, 1000);
        });
    }
    
    // 9. زر تشغيل الفيديو (تجريبي)
    const playVideoBtn = document.getElementById('playVideoBtn');
    if (playVideoBtn) {
        playVideoBtn.addEventListener('click', function() {
            alert('سيتم تشغيل فيديو تعريفي عن المنصة قريباً');
        });
    }

    // 10. تفعيل الرابط النشط عند تحميل الصفحة
    setTimeout(updateActiveLinkOnScroll, 100);
});