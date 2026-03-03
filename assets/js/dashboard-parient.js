// =============== لوحة تحكم المريض - تفاعلات متكاملة ===============

class PatientDashboard {
    constructor() {
        this.bookings = [];
        this.favoriteNurses = [];
        this.notifications = [];
        this.userProfile = {
            name: 'محمد أحمد عبدالله',
            phone: '+20 100 123 4567',
            email: 'mohamed@example.com',
            memberSince: '2024-03-15'
        };
        this.init();
    }

    init() {
        this.loadBookings();
        this.loadFavoriteNurses();
        this.setupEventListeners();
        this.setupAutoRefresh();
        this.updateStats();
        this.setupKeyboardShortcuts();
        this.setupTooltips();
    }

    loadBookings() {
        // تحميل الحجوزات من localStorage أو استخدام البيانات الافتراضية
        const saved = localStorage.getItem('patientBookings');
        if (saved) {
            this.bookings = JSON.parse(saved);
        } else {
            this.bookings = [
                {
                    id: 'SH20250315001',
                    nurse: 'سارة محمود',
                    service: 'إعطاء حقنة + قياس ضغط',
                    date: '2025-03-15',
                    time: '2:00 م',
                    status: 'in-progress',
                    nurseAvatar: 'س'
                },
                {
                    id: 'SH20250314002',
                    nurse: 'محمد حسن',
                    service: 'تغيير جروح',
                    date: '2025-03-14',
                    time: '11:00 ص',
                    status: 'completed',
                    nurseAvatar: 'م'
                },
                {
                    id: 'SH20250313003',
                    nurse: 'هدى كمال',
                    service: 'إدارة أدوية أسبوعية',
                    date: '2025-03-13',
                    time: '10:00 ص',
                    status: 'completed',
                    nurseAvatar: 'ه'
                },
                {
                    id: 'SH20250312004',
                    nurse: 'علي محمد',
                    service: 'قياس ضغط + سكر',
                    date: '2025-03-12',
                    time: '3:00 م',
                    status: 'cancelled',
                    nurseAvatar: 'ع'
                },
                {
                    id: 'SH20250310005',
                    nurse: 'نورا أحمد',
                    service: 'استشارة تغذوية',
                    date: '2025-03-10',
                    time: '1:00 م',
                    status: 'completed',
                    nurseAvatar: 'ن'
                }
            ];
        }
    }

    loadFavoriteNurses() {
        // تحميل الممرضين المفضلين من localStorage
        const saved = localStorage.getItem('favoriteNurses');
        if (saved) {
            this.favoriteNurses = JSON.parse(saved);
        } else {
            this.favoriteNurses = [
                {
                    id: 'sara',
                    name: 'سارة محمود',
                    rating: 4.8,
                    specialty: 'حقن، رعاية مسنين',
                    avatar: 'س',
                    reviews: 127
                },
                {
                    id: 'mohamed',
                    name: 'محمد حسن',
                    rating: 5.0,
                    specialty: 'قياس ضغط، تخطيط قلب',
                    avatar: 'م',
                    reviews: 89
                },
                {
                    id: 'huda',
                    name: 'هدى كمال',
                    rating: 4.9,
                    specialty: 'إدارة أدوية، تغذية',
                    avatar: 'ه',
                    reviews: 156
                }
            ];
        }
    }

    setupEventListeners() {
        // أزرار الإجراءات في الجدول
        document.querySelectorAll('.btn-icon').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const action = btn.getAttribute('title');
                const bookingId = this.extractBookingId(btn);
                
                if (action === 'عرض التفاصيل') {
                    this.viewBooking(bookingId);
                } else if (action === 'التواصل مع الممرض') {
                    this.messageNurse(bookingId);
                } else if (action === 'إضافة تقييم') {
                    this.addReview(bookingId);
                } else if (action === 'حجز مرة أخرى') {
                    this.rebookService(bookingId);
                } else if (action === 'تحميل التقرير') {
                    this.downloadReport(bookingId);
                }
            });
        });

        // بطاقات الممرضين المفضلين
        document.querySelectorAll('.nurse-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.closest('.btn-icon')) {
                    const nurseName = item.querySelector('.nurse-name')?.textContent;
                    this.viewNurseProfile(nurseName);
                }
            });
        });

        // أزرار الإجراءات السريعة
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = btn.querySelector('.action-title')?.textContent;
                this.handleQuickAction(action);
            });
        });

        // زر تعديل الملف الشخصي
        const editProfileBtn = document.querySelector('[onclick="editProfile()"]');
        if (editProfileBtn) {
            editProfileBtn.addEventListener('click', () => this.editProfile());
        }

        // زر السجل الطبي
        const medicalHistoryBtn = document.querySelector('[onclick="viewMedicalHistory()"]');
        if (medicalHistoryBtn) {
            medicalHistoryBtn.addEventListener('click', () => this.viewMedicalHistory());
        }

        // زر الإعدادات
        const preferencesBtn = document.querySelector('[onclick="viewPreferences()"]');
        if (preferencesBtn) {
            preferencesBtn.addEventListener('click', () => this.viewPreferences());
        }

        // تحديث الحالة عند النقر على صف الجدول
        document.querySelectorAll('.bookings-table tbody tr').forEach(row => {
            row.addEventListener('click', () => {
                const bookingId = row.querySelector('.booking-id')?.textContent.trim();
                if (bookingId) {
                    this.viewBooking(bookingId);
                }
            });
            row.style.cursor = 'pointer';
        });
    }

    setupAutoRefresh() {
        // تحديث تلقائي كل دقيقة
        setInterval(() => {
            this.refreshData();
        }, 60000);
    }

    refreshData() {
        // محاكاة تحديث البيانات
        this.showNotification('جاري تحديث البيانات...', 'info', 2000);
        
        // تحديث حالة الحجوزات
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();
        
        document.querySelectorAll('.bookings-table tbody tr').forEach(row => {
            const timeCell = row.querySelector('td:nth-child(3)')?.textContent;
            if (timeCell && timeCell.includes(':')) {
                const [hour, minute] = timeCell.match(/(\d+):(\d+)/).slice(1).map(Number);
                const bookingTime = hour * 60 + minute;
                
                // إذا كان الموعد قد مضى والحالة ليست مكتملة أو ملغية
                if (currentTime > bookingTime) {
                    const statusSpan = row.querySelector('.booking-status');
                    if (statusSpan && !statusSpan.classList.contains('status-completed') && 
                        !statusSpan.classList.contains('status-cancelled')) {
                        statusSpan.innerHTML = '<i class="fas fa-clock"></i> متأخر';
                        statusSpan.className = 'booking-status status-warning';
                    }
                }
            }
        });
    }

    updateStats() {
        // حساب الإحصائيات
        const activeBookings = this.bookings.filter(b => 
            ['in-progress', 'pending', 'confirmed'].includes(b.status)
        ).length;
        
        const completedBookings = this.bookings.filter(b => b.status === 'completed').length;
        const pendingBookings = this.bookings.filter(b => b.status === 'pending').length;
        const avgRating = 4.8; // يمكن حسابه من التقييمات الفعلية

        // تحديث القيم في الواجهة
        const statValues = document.querySelectorAll('.stat-value');
        if (statValues.length >= 4) {
            statValues[0].textContent = activeBookings;
            statValues[1].textContent = completedBookings;
            statValues[2].textContent = pendingBookings;
            statValues[3].textContent = avgRating.toFixed(1);
        }
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl + N: حجز جديد
            if (e.ctrlKey && e.key === 'n') {
                e.preventDefault();
                window.location.href = 'homepage.html#booking';
            }
            
            // Ctrl + H: السجل الطبي
            if (e.ctrlKey && e.key === 'h') {
                e.preventDefault();
                this.viewMedicalHistory();
            }
            
            // Ctrl + F: الممرضون المفضلون
            if (e.ctrlKey && e.key === 'f') {
                e.preventDefault();
                document.querySelector('.favorite-nurses').scrollIntoView({ behavior: 'smooth' });
            }
            
            // ESC: إغلاق أي نافذة منبثقة
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    setupTooltips() {
        // إضافة tooltips للأزرار
        document.querySelectorAll('[title]').forEach(el => {
            el.addEventListener('mouseenter', (e) => {
                const title = el.getAttribute('title');
                if (title) {
                    const tooltip = document.createElement('div');
                    tooltip.className = 'tooltip';
                    tooltip.textContent = title;
                    tooltip.style.cssText = `
                        position: absolute;
                        background: var(--dark);
                        color: white;
                        padding: 5px 10px;
                        border-radius: 5px;
                        font-size: 12px;
                        z-index: 10000;
                        pointer-events: none;
                        transform: translateY(-100%);
                        margin-top: -10px;
                    `;
                    
                    const rect = el.getBoundingClientRect();
                    tooltip.style.left = rect.left + (rect.width / 2) + 'px';
                    tooltip.style.top = rect.top + 'px';
                    
                    document.body.appendChild(tooltip);
                    
                    el.addEventListener('mouseleave', () => {
                        tooltip.remove();
                    }, { once: true });
                }
            });
        });
    }

    // =============== دوال التفاعل مع الحجوزات ===============

    viewBooking(bookingId) {
        const booking = this.bookings.find(b => b.id === bookingId);
        if (booking) {
            const details = `
                🆔 رقم الحجز: ${booking.id}
                👩‍⚕️ الممرض: ${booking.nurse}
                🏥 الخدمة: ${booking.service}
                📅 التاريخ: ${booking.date}
                ⏰ الوقت: ${booking.time}
                📊 الحالة: ${this.getStatusText(booking.status)}
            `;
            
            this.showNotification(details, 'info', 5000);
        } else {
            this.showNotification('لم يتم العثور على الحجز', 'error');
        }
    }

    messageNurse(bookingId) {
        const booking = this.bookings.find(b => b.id === bookingId);
        if (booking) {
            if (confirm(`بدء محادثة مع الممرض/ة ${booking.nurse}؟`)) {
                this.showNotification(`تم فتح نافذة المحادثة مع ${booking.nurse}`, 'success');
                // window.location.href = `chat.html?nurse=${booking.nurseId}`;
            }
        }
    }

    addReview(bookingId) {
        const booking = this.bookings.find(b => b.id === bookingId);
        if (booking) {
            const rating = prompt('تقييمك للخدمة (من 1 إلى 5):', '5');
            if (rating && !isNaN(rating) && rating >= 1 && rating <= 5) {
                const comment = prompt('أضف تعليقاً (اختياري):');
                this.showNotification(`تم إضافة تقييم ${rating} نجوم. شكراً لمشاركتك!`, 'success');
            }
        }
    }

    rebookService(bookingId) {
        const booking = this.bookings.find(b => b.id === bookingId);
        if (booking) {
            if (confirm(`إعادة حجز خدمة ${booking.service} مع الممرض/ة ${booking.nurse}؟`)) {
                this.showNotification('جاري تحويلك لصفحة الحجز', 'info');
                // window.location.href = `homepage.html#booking?service=${booking.service}`;
            }
        }
    }

    downloadReport(bookingId) {
        const booking = this.bookings.find(b => b.id === bookingId);
        if (booking) {
            this.showNotification(`جاري تحميل تقرير الحجز ${booking.id}`, 'info');
            // محاكاة تحميل ملف
            setTimeout(() => {
                this.showNotification('تم تحميل التقرير بنجاح', 'success');
            }, 2000);
        }
    }

    editBooking(bookingId) {
        this.showNotification('جاري فتح صفحة تعديل الحجز', 'info');
        // window.location.href = `edit-booking.html?id=${bookingId}`;
    }

    remindBooking(bookingId) {
        const booking = this.bookings.find(b => b.id === bookingId);
        if (booking) {
            const minutes = prompt('تذكير قبل كم دقيقة؟ (30 دقيقة افتراضياً)', '30');
            if (minutes && !isNaN(minutes)) {
                setTimeout(() => {
                    this.showNotification(`🔔 تذكير: موعد ${booking.service} بعد ${minutes} دقيقة`, 'info');
                }, minutes * 60 * 1000);
                
                this.showNotification(`تم ضبط تذكير قبل ${minutes} دقيقة`, 'success');
            }
        }
    }

    // =============== دوال التفاعل مع الممرضين ===============

    viewNurseProfile(nurseName) {
        const nurse = this.favoriteNurses.find(n => n.name === nurseName);
        if (nurse) {
            const details = `
                👤 الممرض/ة: ${nurse.name}
                ⭐ التقييم: ${nurse.rating}/5
                📋 التخصص: ${nurse.specialty}
                💬 عدد التقييمات: ${nurse.reviews}
            `;
            
            this.showNotification(details, 'info', 5000);
        }
    }

    bookWithNurse(nurseId) {
        const nurse = this.favoriteNurses.find(n => n.id === nurseId);
        if (nurse) {
            if (confirm(`حجز خدمة مع الممرض/ة ${nurse.name}؟`)) {
                this.showNotification('جاري تحويلك لصفحة الحجز', 'info');
                // window.location.href = `homepage.html#booking?nurse=${nurseId}`;
            }
        }
    }

    addToFavorites(nurseId) {
        // إضافة للمفضلة (محاكاة)
        this.showNotification('تمت إضافة الممرض إلى المفضلة', 'success');
    }

    removeFromFavorites(nurseId) {
        if (confirm('إزالة الممرض من المفضلة؟')) {
            this.favoriteNurses = this.favoriteNurses.filter(n => n.id !== nurseId);
            localStorage.setItem('favoriteNurses', JSON.stringify(this.favoriteNurses));
            this.showNotification('تمت إزالة الممرض من المفضلة', 'success');
            
            // تحديث الواجهة
            this.renderFavoriteNurses();
        }
    }

    renderFavoriteNurses() {
        const nursesList = document.querySelector('.nurses-list');
        if (nursesList) {
            nursesList.innerHTML = this.favoriteNurses.map(nurse => `
                <div class="nurse-item" onclick="patientDashboard.viewNurseProfile('${nurse.name}')">
                    <div class="nurse-avatar">${nurse.avatar}</div>
                    <div class="nurse-details">
                        <div class="nurse-name">${nurse.name}</div>
                        <div class="nurse-rating">
                            ${this.renderStars(nurse.rating)}
                            <span style="font-size: 11px; color: var(--gray); margin-right: 5px;">${nurse.rating}</span>
                        </div>
                        <div class="nurse-specialty">${nurse.specialty}</div>
                    </div>
                    <button class="btn-icon" onclick="patientDashboard.bookWithNurse('${nurse.id}')">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            `).join('');
        }
    }

    renderStars(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        if (halfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        
        return stars;
    }

    // =============== دوال الملف الشخصي ===============

    editProfile() {
        const newName = prompt('الاسم الكامل:', this.userProfile.name);
        if (newName && newName !== this.userProfile.name) {
            this.userProfile.name = newName;
            document.querySelector('.user-name').textContent = newName;
            this.showNotification('تم تحديث الملف الشخصي', 'success');
        }
        
        const newPhone = prompt('رقم الهاتف:', this.userProfile.phone);
        if (newPhone && newPhone !== this.userProfile.phone) {
            this.userProfile.phone = newPhone;
            document.querySelectorAll('.user-meta-item')[0].innerHTML = `<i class="fas fa-phone"></i> ${newPhone}`;
        }
    }

    viewMedicalHistory() {
        const history = [
            '15 مارس 2025 - حقنة عضلية - سارة محمود',
            '10 مارس 2025 - استشارة تغذوية - نورا أحمد',
            '5 مارس 2025 - قياس ضغط - محمد حسن',
            '28 فبراير 2025 - تغيير جروح - محمد حسن',
            '20 فبراير 2025 - إدارة أدوية - هدى كمال'
        ];
        
        this.showNotification('السجل الطبي:\n' + history.join('\n'), 'info', 8000);
    }

    viewPreferences() {
        const preferences = [
            '🔔 الإشعارات: مفعلة',
            '📧 البريد الإلكتروني: mohamed@example.com',
            '📍 المنطقة المفضلة: مدينة نصر',
            '👥 إدارة أفراد العائلة: 3 أفراد'
        ];
        
        this.showNotification('الإعدادات:\n' + preferences.join('\n'), 'info', 5000);
    }

    viewHealthTips() {
        const tips = [
            '🥗 لمرضى السكري: اشرب 8 أكواب ماء يومياً',
            '❤️ لمرضى الضغط: قلل الملح في الطعام',
            '💪 ممارسة الرياضة: 30 دقيقة مشي يومياً',
            '😴 النوم الصحي: 7-8 ساعات يومياً'
        ];
        
        this.showNotification('نصائح صحية:\n' + tips.join('\n'), 'info', 8000);
    }

    // =============== دوال الإجراءات السريعة ===============

    handleQuickAction(action) {
        const actions = {
            'حجز جديد': () => window.location.href = 'homepage.html#booking',
            'اقتراحات ذكية': () => this.viewSmartSuggestions(),
            'تقييم الخدمات': () => this.viewRatingsReviews(),
            'السجل الطبي': () => this.viewMedicalHistory(),
            'الدعم الفني': () => this.contactSupport(),
            'أفراد العائلة': () => this.manageFamilyMembers()
        };
        
        if (actions[action]) {
            actions[action]();
        } else {
            this.showNotification('جاري تجهيز هذه الخدمة', 'info');
        }
    }

    viewSmartSuggestions() {
        const suggestions = [
            '🤝 ممرضون قريبون منك: 3 ممرضين متاحين',
            '📅 مواعيد متاحة: غداً 10:00 ص',
            '💊 تذكير أدوية: موعد دواء الضغط بعد ساعة',
            '🏥 خدمات مقترحة: فحص سكر تراكمي'
        ];
        
        this.showNotification('اقتراحات ذكية:\n' + suggestions.join('\n'), 'info', 8000);
    }

    viewRatingsReviews() {
        const reviews = [
            'سارة محمود: ⭐⭐⭐⭐⭐ - ممتازة جداً',
            'محمد حسن: ⭐⭐⭐⭐⭐ - محترف',
            'هدى كمال: ⭐⭐⭐⭐ - جيد جداً'
        ];
        
        this.showNotification('تقييماتك:\n' + reviews.join('\n'), 'info', 5000);
    }

    contactSupport() {
        const support = [
            '📞 هاتف: 19555',
            '💬 واتساب: 01012345678',
            '📧 بريد: support@safehands.com',
            '⏰ متاح 24/7'
        ];
        
        this.showNotification('الدعم الفني:\n' + support.join('\n'), 'info', 5000);
    }

    manageFamilyMembers() {
        const family = [
            '👤 محمد أحمد (أنت)',
            '👩 فاطمة محمد - 65 سنة',
            '👴 محمود علي - 70 سنة',
            '👧 سارة أحمد - 8 سنوات'
        ];
        
        this.showNotification('أفراد العائلة:\n' + family.join('\n'), 'info', 5000);
    }

    // =============== دوال مساعدة ===============

    getStatusText(status) {
        const statusMap = {
            'in-progress': 'قيد التنفيذ',
            'completed': 'مكتمل',
            'pending': 'قيد الانتظار',
            'cancelled': 'ملغي',
            'confirmed': 'مؤكد'
        };
        return statusMap[status] || status;
    }

    extractBookingId(element) {
        const row = element.closest('tr');
        if (row) {
            const idCell = row.querySelector('.booking-id');
            return idCell ? idCell.textContent.trim() : null;
        }
        return null;
    }

    closeAllModals() {
        document.querySelectorAll('.modal, .popup').forEach(modal => {
            modal.style.display = 'none';
        });
    }

    showNotification(message, type = 'info', duration = 3000) {
        // إزالة أي إشعار سابق
        const oldNotification = document.querySelector('.dashboard-notification');
        if (oldNotification) oldNotification.remove();
        
        // إنشاء الإشعار
        const notification = document.createElement('div');
        notification.className = 'dashboard-notification';
        
        const colors = {
            success: 'var(--success)',
            error: 'var(--danger)',
            info: 'var(--primary)',
            warning: 'var(--warning)'
        };
        
        const icons = {
            success: 'fa-circle-check',
            error: 'fa-circle-exclamation',
            info: 'fa-circle-info',
            warning: 'fa-triangle-exclamation'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${colors[type] || colors.info};
            color: white;
            padding: 15px 25px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
            z-index: 10000;
            max-width: 400px;
            width: 90%;
            direction: rtl;
            animation: slideDown 0.3s ease;
            display: flex;
            align-items: flex-start;
            gap: 10px;
            font-size: 14px;
            line-height: 1.6;
            white-space: pre-line;
        `;
        
        notification.innerHTML = `
            <i class="fas ${icons[type]}" style="font-size: 20px; flex-shrink: 0;"></i>
            <div style="flex: 1;">${message}</div>
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
}

// =============== تهيئة الصفحة ===============

let patientDashboard;

document.addEventListener('DOMContentLoaded', function() {
    // إنشاء كائن لوحة التحكم
    patientDashboard = new PatientDashboard();
    window.patientDashboard = patientDashboard;
    
    // تحميل البيانات بشكل تدريجي
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach((stat, index) => {
        const originalValue = stat.textContent;
        stat.textContent = '0';
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(20px)';
        stat.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            stat.textContent = originalValue;
            stat.style.opacity = '1';
            stat.style.transform = 'translateY(0)';
        }, 100 * index);
    });
    
    // إضافة تأثيرات على بطاقات الإحصائيات
    document.querySelectorAll('.stat-card').forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.stat-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.stat-icon i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
            }
        });
    });
    
    // تحديث التاريخ في التذييل
    const updateFooterDate = () => {
        const copyright = document.querySelector('.copyright');
        if (copyright) {
            const now = new Date();
            const options = { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };
            const dateStr = now.toLocaleDateString('ar-EG', options);
            copyright.innerHTML = `© 2025 Safe Hands. جميع الحقوق محفوظة. | آخر تحديث للبيانات: ${dateStr}`;
        }
    };
    
    updateFooterDate();
    setInterval(updateFooterDate, 60000); // تحديث كل دقيقة
    
    // إضافة مؤشر تحميل عند تغيير الصفحة
    window.addEventListener('beforeunload', () => {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255,255,255,0.9);
            z-index: 99999;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(5px);
        `;
        loader.innerHTML = '<div class="loading-spinner"></div><div style="margin-top: 60px; color: var(--primary);">جاري التحميل...</div>';
        document.body.appendChild(loader);
    });
    
    // حفظ آخر زيارة
    localStorage.setItem('lastVisit', new Date().toISOString());
    
    // عرض رسالة ترحيبية
    setTimeout(() => {
        const lastVisit = localStorage.getItem('lastVisit');
        if (lastVisit) {
            const lastDate = new Date(lastVisit);
            const now = new Date();
            const diffHours = Math.round((now - lastDate) / 1000 / 60 / 60);
            
            if (diffHours > 24) {
                patientDashboard.showNotification('مرحباً بعودتك! لديك حجوزات جديدة', 'info');
            } else if (diffHours > 1) {
                patientDashboard.showNotification('أهلاً بك في لوحة التحكم', 'success');
            }
        }
    }, 1500);
    
    // تحديث عداد الإشعارات
    const badge = document.querySelector('.badge');
    if (badge) {
        setInterval(() => {
            const random = Math.floor(Math.random() * 3) + 1;
            badge.textContent = random;
        }, 30000);
    }
});