// =============== 1. نظام الإشعارات ===============
const notificationBtn = document.getElementById('notificationBtn');
const notificationDropdown = document.getElementById('notificationDropdown');
const markAllReadBtn = document.getElementById('markAllReadBtn');
const notificationList = document.getElementById('notificationList');
const notificationCount = document.getElementById('notificationCount');

const notifications = [
    { id: 1, title: 'تم تأكيد موعدك', message: 'تم تأكيد موعدك مع الممرضة سارة غداً 10:00 ص', time: 'منذ ساعة', icon: 'fa-check-circle', color: 'var(--success)', unread: true },
    { id: 2, title: 'تذكير بموعد', message: 'لديك موعد بعد ساعتين مع أحمد محمد', time: 'منذ 3 ساعات', icon: 'fa-clock', color: 'var(--warning)', unread: true },
    { id: 3, title: 'تقييم الخدمة', message: 'كيف كانت تجربتك مع فاطمة علي؟ قيمها الآن', time: 'منذ يوم', icon: 'fa-star', color: 'var(--primary)', unread: true },
    { id: 4, title: 'عرض خاص', message: 'احصل على خصم 20% على خدمات التمريض', time: 'منذ يومين', icon: 'fa-tag', color: 'var(--secondary)', unread: false },
];

function updateNotificationBadge() {
    const unreadCount = notifications.filter(n => n.unread).length;
    notificationCount.textContent = unreadCount;
}

function renderNotifications() {
    if (!notificationList) return;

    let html = '';
    notifications.forEach(n => {
        html += `
            <div class="notification-item ${n.unread ? 'unread' : ''}" onclick="markAsRead(${n.id})">
                <div class="notification-icon" style="background: ${n.color}20; color: ${n.color};">
                    <i class="fas ${n.icon}"></i>
                </div>
                <div class="notification-content">
                    <h4>${n.title}</h4>
                    <p>${n.message}</p>
                    <div class="notification-time">${n.time}</div>
                </div>
            </div>
        `;
    });

    notificationList.innerHTML = html || '<div style="padding: 30px; text-align: center; color: var(--gray);">لا توجد إشعارات</div>';
}

if (notificationBtn) {
    notificationBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notificationDropdown.classList.toggle('show');
    });
}

document.addEventListener('click', (e) => {
    if (!e.target.closest('.notification-container')) {
        notificationDropdown?.classList.remove('show');
    }
});

if (markAllReadBtn) {
    markAllReadBtn.addEventListener('click', () => {
        notifications.forEach(n => n.unread = false);
        renderNotifications();
        updateNotificationBadge();
    });
}

window.markAsRead = function(id) {
    const notification = notifications.find(n => n.id === id);
    if (notification && notification.unread) {
        notification.unread = false;
        renderNotifications();
        updateNotificationBadge();
    }
};

window.viewAllNotifications = function() {
    alert('سيتم فتح صفحة جميع الإشعارات');
    notificationDropdown?.classList.remove('show');
};

renderNotifications();
updateNotificationBadge();

// =============== 2. نظام المودال الشامل ===============

window.openModal = function(title, bodyContent, footerContent = '') {
    const modal = document.getElementById('universalModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalFooter = document.getElementById('modalFooter');

    modalTitle.textContent = title;
    modalBody.innerHTML = bodyContent;
    modalFooter.innerHTML = footerContent;

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
};

window.closeModal = function() {
    const modal = document.getElementById('universalModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
};

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// =============== 3. بيانات الممرضين (للبحث) ===============
const nursesData = [
    { id: 'sara', name: 'سارة محمود', specialty: 'تمريض عام - رعاية مسنين', rating: 4.9, reviews: 127, price: 150, avatar: 'س', available: true },
    { id: 'ahmed', name: 'أحمد محمد', specialty: 'حقن وتركيب محاليل', rating: 4.7, reviews: 98, price: 130, avatar: 'أ', available: true },
    { id: 'fatima', name: 'فاطمة علي', specialty: 'رعاية مسنين - قياس ضغط وسكر', rating: 5.0, reviews: 156, price: 180, avatar: 'ف', available: false },
    { id: 'mahmoud', name: 'محمود إبراهيم', specialty: 'تمريض عام - تغيير جروح', rating: 4.8, reviews: 112, price: 140, avatar: 'م', available: true },
    { id: 'nadia', name: 'نادية حسن', specialty: 'رعاية أطفال - تمريض منزلي', rating: 4.9, reviews: 89, price: 160, avatar: 'ن', available: true },
    { id: 'khaled', name: 'خالد عمر', specialty: 'تمريض طوارئ - إنعاش قلبي', rating: 4.6, reviews: 73, price: 170, avatar: 'خ', available: false },
];

// =============== 4. دوال البحث عن ممرض ===============

function generateNurseCards(filteredNurses = nursesData) {
    if (!filteredNurses || filteredNurses.length === 0) {
        return `
            <div style="text-align: center; padding: 40px; color: var(--gray);">
                <i class="fas fa-user-slash" style="font-size: 40px; margin-bottom: 15px; display: block;"></i>
                <p>لا يوجد ممرضين مطابقين للبحث</p>
            </div>
        `;
    }

    return filteredNurses.map(nurse => `
        <div class="search-result-item" onclick="selectNurse('${nurse.id}')" style="display: flex; align-items: center; padding: 15px; border: 1px solid var(--light-gray); border-radius: var(--radius-sm); margin-bottom: 10px; cursor: pointer; transition: var(--transition); background: white;">
            <div style="width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), var(--secondary)); display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 20px; margin-left: 15px; flex-shrink: 0;">
                ${nurse.avatar}
            </div>

            <div style="flex: 1; min-width: 0;">
                <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
                    <span style="font-weight: 600;">${nurse.name}</span>
                    ${nurse.available ? 
                        '<span style="background: rgba(16, 185, 129, 0.1); color: var(--success); padding: 2px 8px; border-radius: 12px; font-size: 11px;">متاح الآن</span>' : 
                        '<span style="background: rgba(107, 114, 128, 0.1); color: #6B7280; padding: 2px 8px; border-radius: 12px; font-size: 11px;">غير متاح</span>'
                    }
                </div>
                <div style="font-size: 13px; color: var(--gray); margin: 3px 0;">${nurse.specialty}</div>
                <div style="display: flex; gap: 15px; font-size: 12px;">
                    <span style="color: var(--warning);"><i class="fas fa-star"></i> ${nurse.rating} (${nurse.reviews})</span>
                    <span style="color: var(--primary); font-weight: 600;">${nurse.price} ج.م/ساعة</span>
                </div>
            </div>

            <i class="fas fa-chevron-left" style="color: var(--gray);"></i>
        </div>
    `).join('');
}

window.filterNurses = function() {
    const searchInput = document.getElementById('nurseSearchInput');
    const specialtySelect = document.getElementById('specialtyFilter');
    const ratingSelect = document.getElementById('ratingFilter');
    const priceSelect = document.getElementById('priceFilter');

    if (!searchInput || !specialtySelect || !ratingSelect || !priceSelect) return;

    const searchTerm = searchInput.value.toLowerCase();
    const specialty = specialtySelect.value;
    const ratingMin = parseFloat(ratingSelect.value) || 0;
    const priceMax = parseFloat(priceSelect.value) || Infinity;

    const filtered = nursesData.filter(nurse => {
        const matchesSearch = searchTerm === '' || 
            nurse.name.includes(searchTerm) || 
            nurse.specialty.includes(searchTerm);

        const matchesSpecialty = specialty === '' || nurse.specialty.includes(specialty);

        const matchesRating = nurse.rating >= ratingMin;

        const matchesPrice = nurse.price <= priceMax;

        return matchesSearch && matchesSpecialty && matchesRating && matchesPrice;
    });

    const resultsDiv = document.getElementById('searchResults');
    if (resultsDiv) {
        resultsDiv.innerHTML = generateNurseCards(filtered);
    }
};

window.selectNurse = function(nurseId) {
    closeModal();
    viewNurseDetails(nurseId);
};

// =============== 5. مودال البحث عن ممرض ===============
window.findNurse = function() {
    const bodyContent = `
        <div style="text-align: center; margin-bottom: 20px;">
            <i class="fas fa-search" style="font-size: 50px; color: var(--primary); margin-bottom: 15px;"></i>
            <h3>ابحث عن ممرض</h3>
            <p style="color: var(--gray);">ابحث عن الممرض المناسب حسب التخصص والتقييم والسعر</p>
        </div>

        <!-- شريط البحث -->
        <div class="form-group">
            <div style="position: relative;">
                <i class="fas fa-search" style="position: absolute; right: 15px; top: 50%; transform: translateY(-50%); color: var(--gray);"></i>
                <input type="text" class="form-control" id="nurseSearchInput" placeholder="ابحث باسم الممرض أو التخصص..." style="padding-right: 45px;" onkeyup="filterNurses()">
            </div>
        </div>

        <!-- فلاتر البحث -->
        <div style="display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap;">
            <select class="form-control" style="flex: 1; min-width: 120px;" onchange="filterNurses()" id="specialtyFilter">
                <option value="">كل التخصصات</option>
                <option value="تمريض عام">تمريض عام</option>
                <option value="رعاية مسنين">رعاية مسنين</option>
                <option value="حقن">حقن وتركيب محاليل</option>
                <option value="جروح">تغيير جروح</option>
                <option value="قياس">قياس ضغط وسكر</option>
            </select>

            <select class="form-control" style="flex: 1; min-width: 120px;" onchange="filterNurses()" id="ratingFilter">
                <option value="">كل التقييمات</option>
                <option value="4.5">أكثر من 4.5 ⭐</option>
                <option value="4">أكثر من 4 ⭐</option>
                <option value="3.5">أكثر من 3.5 ⭐</option>
            </select>

            <select class="form-control" style="flex: 1; min-width: 120px;" onchange="filterNurses()" id="priceFilter">
                <option value="">كل الأسعار</option>
                <option value="100">أقل من 100 ج.م</option>
                <option value="150">أقل من 150 ج.م</option>
                <option value="200">أقل من 200 ج.م</option>
            </select>
        </div>

        <!-- نتائج البحث -->
        <div id="searchResults" style="max-height: 300px; overflow-y: auto;">
            ${generateNurseCards()}
        </div>
    `;

    const footerContent = `
        <button class="btn btn-outline" onclick="closeModal()">
            <i class="fas fa-times"></i>
            إغلاق
        </button>
    `;

    openModal('البحث عن ممرض', bodyContent, footerContent);
};

// =============== 6. عرض تفاصيل الممرض ===============
window.viewNurseDetails = function(nurseId) {
    const nurses = {
        'sara': {
            name: 'سارة محمود',
            specialty: 'تمريض عام - رعاية مسنين',
            rating: 4.9,
            reviews: 127,
            experience: '6 سنوات',
            phone: '01012345678',
            price: '150 ج.م/ساعة',
            bio: 'ممرضة متخصصة في رعاية المسنين ومرضى السكري، خبرة في التعامل مع الحالات الحرجة.'
        },
        'ahmed': {
            name: 'أحمد محمد',
            specialty: 'تمريض منزلي - حقن وتركيب محاليل',
            rating: 4.7,
            reviews: 98,
            experience: '4 سنوات',
            phone: '01098765432',
            price: '130 ج.م/ساعة',
            bio: 'ممرض متخصص في الحقن وتركيب الكانيولا، خبرة في متابعة حالات ما بعد العمليات.'
        },
        'fatima': {
            name: 'فاطمة علي',
            specialty: 'رعاية مسنين - قياس ضغط وسكر',
            rating: 5.0,
            reviews: 156,
            experience: '8 سنوات',
            phone: '01055555555',
            price: '180 ج.م/ساعة',
            bio: 'ممرضة ذات خبرة عالية في رعاية المسنين ومرضى الضغط والسكر، متفرغة للرعاية المنزلية.'
        },
        'mahmoud': {
            name: 'محمود إبراهيم',
            specialty: 'تمريض عام - تغيير جروح',
            rating: 4.8,
            reviews: 112,
            experience: '5 سنوات',
            phone: '01011112222',
            price: '140 ج.م/ساعة',
            bio: 'ممرض متخصص في العناية بالجروح وتغيير الضمادات، خبرة في التمريض المنزلي.'
        },
        'nadia': {
            name: 'نادية حسن',
            specialty: 'رعاية أطفال - تمريض منزلي',
            rating: 4.9,
            reviews: 89,
            experience: '3 سنوات',
            phone: '01033334444',
            price: '160 ج.م/ساعة',
            bio: 'ممرضة أطفال متخصصة في رعاية الأطفال حديثي الولادة ومرضى الأطفال.'
        },
        'khaled': {
            name: 'خالد عمر',
            specialty: 'تمريض طوارئ - إنعاش قلبي',
            rating: 4.6,
            reviews: 73,
            experience: '7 سنوات',
            phone: '01055556666',
            price: '170 ج.م/ساعة',
            bio: 'ممرض طوارئ متخصص في الإنعاش القلبي الرئوي والإسعافات الأولية.'
        }
    };

    const n = nurses[nurseId] || nurses.sara;

    const bodyContent = `
        <div style="text-align: center; margin-bottom: 20px;">
            <div style="width: 100px; height: 100px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), var(--secondary)); display: flex; align-items: center; justify-content: center; margin: 0 auto 15px; color: white; font-size: 40px; font-weight: 700;">${n.name.charAt(0)}</div>
            <h2 style="font-size: 22px;">${n.name}</h2>
            <div style="color: var(--gray);">${n.specialty}</div>
            <div style="display: flex; justify-content: center; gap: 10px; margin: 10px 0;">
                <span style="color: var(--warning);">
                    <i class="fas fa-star"></i> ${n.rating}
                </span>
                <span style="color: var(--gray);">(${n.reviews} تقييم)</span>
            </div>
        </div>

        <div class="info-row">
            <i class="fas fa-briefcase" style="color: var(--primary);"></i>
            <span>الخبرة: ${n.experience}</span>
        </div>
        <div class="info-row">
            <i class="fas fa-phone" style="color: var(--primary);"></i>
            <span dir="ltr">${n.phone}</span>
        </div>
        <div class="info-row">
            <i class="fas fa-tag" style="color: var(--primary);"></i>
            <span>السعر: ${n.price}</span>
        </div>

        <div style="margin-top: 15px; padding: 15px; background: var(--light-gray); border-radius: var(--radius);">
            <p style="color: var(--dark);">${n.bio}</p>
        </div>
    `;

    const footerContent = `
        <button class="btn btn-outline" onclick="closeModal()">إغلاق</button>
        <button class="btn btn-primary" onclick="bookNurse('${nurseId}')">
            <i class="fas fa-calendar-plus"></i>
            حجز الخدمة
        </button>
    `;

    openModal('تفاصيل الممرض/ة', bodyContent, footerContent);
};

// =============== 7. حجز خدمة جديدة ===============
window.bookNurse = function(nurseId) {
    closeModal();
    bookNewAppointment();
};

window.bookNewAppointment = function() {
    const bodyContent = `
        <div style="text-align: center; margin-bottom: 20px;">
            <i class="fas fa-calendar-plus" style="font-size: 50px; color: var(--primary); margin-bottom: 15px;"></i>
            <h3>حجز خدمة جديدة</h3>
        </div>

        <div class="form-group">
            <label class="form-label">نوع الخدمة</label>
            <select class="form-control" id="serviceType">
                <option>تمريض منزلي - عام</option>
                <option>رعاية مسنين</option>
                <option>إعطاء حقن</option>
                <option>قياس ضغط وسكر</option>
                <option>تركيب كانيولا</option>
            </select>
        </div>

        <div class="form-group">
            <label class="form-label">اختر ممرض/ة</label>
            <select class="form-control" id="nurseSelect">
                <option value="sara">سارة محمود (4.9 ⭐) - 150 ج.م/ساعة</option>
                <option value="ahmed">أحمد محمد (4.7 ⭐) - 130 ج.م/ساعة</option>
                <option value="fatima">فاطمة علي (5.0 ⭐) - 180 ج.م/ساعة</option>
            </select>
        </div>

        <div class="form-group">
            <label class="form-label">التاريخ</label>
            <input type="date" class="form-control" id="bookingDate">
        </div>

        <div class="form-group">
            <label class="form-label">الوقت</label>
            <select class="form-control" id="bookingTime">
                <option>9:00 صباحاً</option>
                <option>10:00 صباحاً</option>
                <option>11:00 صباحاً</option>
                <option>12:00 ظهراً</option>
                <option>2:00 مساءً</option>
                <option>4:00 مساءً</option>
            </select>
        </div>

        <div class="form-group">
            <label class="form-label">ملاحظات إضافية</label>
            <textarea class="form-control" rows="3" id="bookingNotes" placeholder="أي ملاحظات طبية أو تعليمات خاصة..."></textarea>
        </div>
    `;

    const footerContent = `
        <button class="btn btn-outline" onclick="closeModal()">إلغاء</button>
        <button class="btn btn-success" onclick="confirmBooking()">
            <i class="fas fa-check"></i>
            تأكيد الحجز
        </button>
    `;

    openModal('حجز خدمة جديدة', bodyContent, footerContent);
};

window.confirmBooking = function() {
    alert('✅ تم إرسال طلب الحجز بنجاح! سيتم تأكيد الحجز خلال 30 دقيقة.');
    closeModal();
};

// =============== 8. إعادة جدولة موعد ===============
window.rescheduleAppointment = function(appointmentId) {
    const bodyContent = `
        <div style="text-align: center; margin-bottom: 20px;">
            <i class="fas fa-calendar-alt" style="font-size: 50px; color: var(--warning); margin-bottom: 15px;"></i>
            <h3>إعادة جدولة الموعد</h3>
            <p style="color: var(--gray);">اختر التاريخ والوقت الجديد للموعد</p>
        </div>

        <div class="form-group">
            <label class="form-label">التاريخ الجديد</label>
            <input type="date" class="form-control">
        </div>

        <div class="form-group">
            <label class="form-label">الوقت الجديد</label>
            <select class="form-control">
                <option>9:00 صباحاً</option>
                <option>10:00 صباحاً</option>
                <option>11:00 صباحاً</option>
                <option>12:00 ظهراً</option>
                <option>2:00 مساءً</option>
                <option>4:00 مساءً</option>
            </select>
        </div>

        <div class="form-group">
            <label class="form-label">سبب إعادة الجدولة</label>
            <textarea class="form-control" rows="2" placeholder="اختياري..."></textarea>
        </div>
    `;

    const footerContent = `
        <button class="btn btn-outline" onclick="closeModal()">إلغاء</button>
        <button class="btn btn-primary" onclick="confirmReschedule()">
            <i class="fas fa-check"></i>
            تأكيد
        </button>
    `;

    openModal('إعادة جدولة الموعد', bodyContent, footerContent);
};

window.confirmReschedule = function() {
    alert('✅ تم تحديث الموعد بنجاح! سيتم إرسال تأكيد للممرض.');
    closeModal();
};

// =============== 9. إلغاء موعد ===============
window.cancelAppointment = function(appointmentId) {
    const bodyContent = `
        <div style="text-align: center;">
            <i class="fas fa-exclamation-triangle" style="font-size: 60px; color: var(--danger); margin-bottom: 15px;"></i>
            <h3 style="margin-bottom: 10px;">تأكيد إلغاء الموعد</h3>
            <p style="color: var(--gray);">هل أنت متأكد من إلغاء هذا الموعد؟</p>
            <p style="color: var(--danger); font-size: 14px; margin-top: 10px;">ملاحظة: الإلغاء قبل 3 ساعات من الموعد لا يستحق رسوم.</p>
        </div>
    `;

    const footerContent = `
        <button class="btn btn-outline" onclick="closeModal()">عودة</button>
        <button class="btn btn-danger" onclick="confirmCancel()">
            <i class="fas fa-times"></i>
            تأكيد الإلغاء
        </button>
    `;

    openModal('إلغاء الموعد', bodyContent, footerContent);
};

window.confirmCancel = function() {
    alert('✅ تم إلغاء الموعد بنجاح');
    closeModal();
};

// =============== 10. تتبع الممرض ===============
window.trackNurse = function(appointmentId) {
    const bodyContent = `
        <div style="text-align: center; margin-bottom: 20px;">
            <i class="fas fa-map-marked-alt" style="font-size: 60px; color: var(--primary); margin-bottom: 15px;"></i>
            <h3>تتبع الممرضة</h3>
        </div>

        <div style="background: var(--light-gray); padding: 20px; border-radius: var(--radius); margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                <span>الموقع الحالي:</span>
                <span style="font-weight: 600;">شارع النحاس - مدينة نصر</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                <span>الوقت المتوقع للوصول:</span>
                <span style="font-weight: 600; color: var(--success);">8 دقائق</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
                <span>المسافة المتبقية:</span>
                <span style="font-weight: 600;">1.5 كم</span>
            </div>
        </div>

        <div style="height: 200px; background: linear-gradient(145deg, #f0f0f0, #e0e0e0); border-radius: var(--radius); display: flex; align-items: center; justify-content: center; color: var(--gray);">
            <i class="fas fa-map" style="font-size: 40px; margin-left: 10px;"></i>
            <span>خريطة الموقع هنا</span>
        </div>
    `;

    const footerContent = `
        <button class="btn btn-primary" onclick="closeModal()">تم</button>
    `;

    openModal('تتبع الممرضة', bodyContent, footerContent);
};

// =============== 11. تقييم الخدمة ===============
window.rateService = function(serviceId) {
    const bodyContent = `
        <div style="text-align: center; margin-bottom: 20px;">
            <i class="fas fa-star" style="font-size: 50px; color: var(--warning); margin-bottom: 15px;"></i>
            <h3>قيم الخدمة</h3>
            <p style="color: var(--gray);">كيف كانت تجربتك مع الممرض/ة؟</p>
        </div>

        <div class="rating-stars">
            <i class="fas fa-star rating-star" onclick="setRating(1)"></i>
            <i class="fas fa-star rating-star" onclick="setRating(2)"></i>
            <i class="fas fa-star rating-star" onclick="setRating(3)"></i>
            <i class="fas fa-star rating-star" onclick="setRating(4)"></i>
            <i class="fas fa-star rating-star" onclick="setRating(5)"></i>
        </div>

        <div class="form-group" style="margin-top: 20px;">
            <label class="form-label">اكتب تقييمك (اختياري)</label>
            <textarea class="form-control" rows="3" id="reviewText" placeholder="شارك تجربتك مع الآخرين..."></textarea>
        </div>
    `;

    const footerContent = `
        <button class="btn btn-outline" onclick="closeModal()">إلغاء</button>
        <button class="btn btn-primary" onclick="submitRating()">
            <i class="fas fa-paper-plane"></i>
            إرسال التقييم
        </button>
    `;

    openModal('تقييم الخدمة', bodyContent, footerContent);

    window.currentRating = 0;
};

window.setRating = function(rating) {
    const stars = document.querySelectorAll('.rating-star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
    window.currentRating = rating;
};

window.submitRating = function() {
    alert(`✅ تم إرسال تقييمك (${window.currentRating || 0} نجوم) بنجاح! شكراً لك.`);
    closeModal();
};

// =============== 12. عرض تفاصيل الخدمة السابقة ===============
window.viewServiceDetails = function(serviceId) {
    const bodyContent = `
        <div style="text-align: center; margin-bottom: 20px;">
            <h3>تفاصيل الخدمة #${serviceId}</h3>
        </div>

        <div class="info-row">
            <span class="detail-label">التاريخ:</span>
            <span>15 مارس 2025</span>
        </div>
        <div class="info-row">
            <span class="detail-label">الوقت:</span>
            <span>10:00 صباحاً</span>
        </div>
        <div class="info-row">
            <span class="detail-label">الممرض/ة:</span>
            <span>سارة محمود</span>
        </div>
        <div class="info-row">
            <span class="detail-label">الخدمة:</span>
            <span>إعطاء حقنة عضلية</span>
        </div>
        <div class="info-row">
            <span class="detail-label">المدة:</span>
            <span>30 دقيقة</span>
        </div>
        <div class="info-row">
            <span class="detail-label">السعر:</span>
            <span style="color: var(--primary); font-weight: 600;">250 ج.م</span>
        </div>

        <button class="btn btn-outline btn-sm" style="width: 100%; margin-top: 20px;" onclick="rateService('${serviceId}')">
            <i class="fas fa-star"></i>
            تقييم الخدمة
        </button>
    `;

    const footerContent = `
        <button class="btn btn-primary" onclick="closeModal()">إغلاق</button>
    `;

    openModal('تفاصيل الخدمة', bodyContent, footerContent);
};

// =============== 13. التواصل مع الممرض ===============
window.contactNurse = function(nurseId) {
    const phones = {
        'sara': '01012345678',
        'ahmed': '01098765432',
        'fatima': '01055555555',
        'mahmoud': '01011112222',
        'nadia': '01033334444',
        'khaled': '01055556666'
    };
    const phone = phones[nurseId] || '01012345678';
    if (confirm(`📞 هل تريد الاتصال بالرقم ${phone}؟`)) {
        window.location.href = `tel:${phone}`;
    }
};

// =============== 14. دوال عامة أخرى ===============
window.contactSupport = function() {
    alert('📞 سيتم التواصل مع الدعم الفني على الرقم: 19885');
};

window.viewAllHistory = function() {
    alert('📋 سيتم فتح صفحة كل الزيارات السابقة');
};

window.viewFullMedicalHistory = function() {
    alert('📁 سيتم فتح الملف الطبي الكامل');
};

// =============== 15. تأثيرات بصرية ===============
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.stat-card, .favorite-nurse-item, .appointment-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'all 0.3s ease';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

console.log('✅ صفحة المريض جاهزة 100% - كل حاجة شغالة');

window.viewAllHistory = function() {
const bodyContent = `
    <div style="text-align: center; margin-bottom: 20px;">
        <i class="fas fa-history" style="font-size: 50px; color: var(--primary); margin-bottom: 15px;"></i>
        <h3>كل الزيارات السابقة</h3>
    </div>
    
    <div style="max-height: 400px; overflow-y: auto;">
        <div class="history-item" style="display: flex; justify-content: space-between; align-items: center; padding: 15px; border-bottom: 1px solid var(--light-gray);">
            <div>
                <div style="font-weight: 600;">15 مارس 2025</div>
                <div style="font-size: 13px; color: var(--gray);">سارة محمود - حقنة عضلية</div>
            </div>
            <span style="color: var(--primary); font-weight: 600;">250 ج.م</span>
        </div>
        <div class="history-item" style="display: flex; justify-content: space-between; align-items: center; padding: 15px; border-bottom: 1px solid var(--light-gray);">
            <div>
                <div style="font-weight: 600;">10 مارس 2025</div>
                <div style="font-size: 13px; color: var(--gray);">أحمد محمد - قياس ضغط</div>
            </div>
            <span style="color: var(--primary); font-weight: 600;">180 ج.م</span>
        </div>
        <div class="history-item" style="display: flex; justify-content: space-between; align-items: center; padding: 15px; border-bottom: 1px solid var(--light-gray);">
            <div>
                <div style="font-weight: 600;">5 مارس 2025</div>
                <div style="font-size: 13px; color: var(--gray);">فاطمة علي - رعاية مسنين</div>
            </div>
            <span style="color: var(--primary); font-weight: 600;">1,200 ج.م</span>
        </div>
    </div>
`;

const footerContent = `<button class="btn btn-primary" onclick="closeModal()">إغلاق</button>`;

openModal('سجل الزيارات', bodyContent, footerContent);
};
window.viewFullMedicalHistory = function() {
const bodyContent = `
    <div style="text-align: center; margin-bottom: 20px;">
        <i class="fas fa-file-medical" style="font-size: 50px; color: var(--primary); margin-bottom: 15px;"></i>
        <h3>الملف الطبي الكامل</h3>
    </div>
    
    <div class="info-row">
        <span>فصيلة الدم:</span>
        <span style="font-weight: 600; color: var(--primary);">O+</span>
    </div>
    <div class="info-row">
        <span>الوزن:</span>
        <span>85 كجم</span>
    </div>
    <div class="info-row">
        <span>الطول:</span>
        <span>175 سم</span>
    </div>
    
    <div style="margin-top: 20px;">
        <h4 style="margin-bottom: 10px;">الأمراض المزمنة</h4>
        <p>ضغط الدم المرتفع - سكري نوع 2</p>
    </div>
    
    <div style="margin-top: 20px;">
        <h4 style="margin-bottom: 10px;">الحساسية</h4>
        <p>حساسية بنسلين - حساسية صدرية</p>
    </div>
    
    <div style="margin-top: 20px;">
        <h4 style="margin-bottom: 10px;">الأدوية المنتظمة</h4>
        <p>أملوديبين 5 مجم - ميتفورمين 500 مجم</p>
    </div>
`;

const footerContent = `
    <button class="btn btn-primary" onclick="closeModal()">
        <i class="fas fa-check"></i>
        تم
    </button>
`;

openModal('الملف الطبي', bodyContent, footerContent);
};