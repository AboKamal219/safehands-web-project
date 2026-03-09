// =============== لوحة تحكم الممرض - تفاعلات كاملة ===============

document.addEventListener('DOMContentLoaded', function() {
    
    // =============== 1. نظام الإشعارات ===============
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    const markAllReadBtn = document.getElementById('markAllReadBtn');
    const notificationList = document.getElementById('notificationList');
    const notificationCount = document.getElementById('notificationCount');
    
    // بيانات وهمية للإشعارات
    const notifications = [
        { id: 1, title: 'طلب جديد', message: 'تم إضافة طلب جديد من المريض أحمد محمود', time: 'منذ 5 دقائق', icon: 'fa-calendar-check', color: 'var(--primary)', unread: true },
        { id: 2, title: 'تم إلغاء طلب', message: 'تم إلغاء طلب رقم SH20250315003', time: 'منذ ساعة', icon: 'fa-times-circle', color: 'var(--danger)', unread: true },
        { id: 3, title: 'تقييم جديد', message: 'حصلت على تقييم 5 نجوم من فاطمة علي', time: 'منذ 3 ساعات', icon: 'fa-star', color: 'var(--warning)', unread: false },
        { id: 4, title: 'تحديث الجدول', message: 'تم إضافة موعد جديد غداً الساعة 10 صباحاً', time: 'منذ يوم', icon: 'fa-calendar-alt', color: 'var(--secondary)', unread: false },
    ];
    
    // تحديث عداد الإشعارات
    function updateNotificationBadge() {
        const unreadCount = notifications.filter(n => n.unread).length;
        notificationCount.textContent = unreadCount;
        
        // تحديث العداد الصغير كمان
        const smallBadge = document.querySelector('.header-actions > div > span');
        if (smallBadge) {
            smallBadge.textContent = unreadCount;
            smallBadge.style.display = unreadCount > 0 ? 'flex' : 'none';
        }
    }
    
    // تعبئة قائمة الإشعارات
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
    
    // فتح/غلق قائمة الإشعارات
    if (notificationBtn) {
        notificationBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notificationDropdown.classList.toggle('show');
        });
    }
    
    // إغلاق الإشعارات عند الضغط خارجها
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.notification-container')) {
            notificationDropdown?.classList.remove('show');
        }
    });
    
    // تعليم الكل كمقروء
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', () => {
            notifications.forEach(n => n.unread = false);
            renderNotifications();
            updateNotificationBadge();
        });
    }
    
    // دالة تعليم إشعار كمقروء
    window.markAsRead = function(id) {
        const notification = notifications.find(n => n.id === id);
        if (notification && notification.unread) {
            notification.unread = false;
            renderNotifications();
            updateNotificationBadge();
        }
    };
    
    // عرض جميع الإشعارات
    window.viewAllNotifications = function() {
        alert('سيتم فتح صفحة جميع الإشعارات');
        notificationDropdown?.classList.remove('show');
    };
    
    // تهيئة الإشعارات
    renderNotifications();
    updateNotificationBadge();
    
    // =============== 2. المودال الشامل ===============
    
    // إنشاء المودال إذا لم يكن موجوداً
    if (!document.getElementById('universalModal')) {
        const modalHTML = `
            <div class="modal" id="universalModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title" id="modalTitle"></h3>
                        <button class="modal-close" onclick="closeModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body" id="modalBody"></div>
                    <div class="modal-footer" id="modalFooter"></div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
    
    // دالة فتح المودال
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
    
    // دالة إغلاق المودال
    window.closeModal = function() {
        const modal = document.getElementById('universalModal');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    };
    
    // إغلاق المودال بالضغط على ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    // =============== 3. تفاصيل المريض ===============
    window.viewPatientInfo = function(patientId) {
        const patients = {
            'fatima': {
                name: 'فاطمة علي',
                age: 70,
                gender: 'أنثى',
                phone: '01012345678',
                address: 'مصر الجديدة',
                condition: 'ضغط مرتفع - قلب',
                history: 'مريض مزمن منذ 5 سنوات',
                lastVisit: '2025-03-14',
                nextVisit: '2025-03-16',
                medications: 'أدوية ضغط يومياً'
            },
            'patient1': {
                name: 'أحمد محمود',
                age: 45,
                gender: 'ذكر',
                phone: '01098765432',
                address: 'مدينة نصر',
                condition: 'مريض سكري - حساسية بنسلين',
                history: 'تم اكتشاف المرض منذ 3 سنوات',
                lastVisit: '2025-03-10',
                nextVisit: '2025-03-15',
                medications: 'أنسولين مرتين يومياً'
            }
        };
        
        const p = patients[patientId] || patients.fatima;
        
        const bodyContent = `
            <div style="text-align: center; margin-bottom: 20px;">
                <div style="width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), var(--secondary)); display: flex; align-items: center; justify-content: center; margin: 0 auto 15px; color: white; font-size: 32px; font-weight: 700;">${p.name.charAt(0)}</div>
                <h2 style="font-size: 22px; margin-bottom: 5px;">${p.name}</h2>
                <div style="display: flex; justify-content: center; gap: 10px; color: var(--gray);">
                    <span><i class="fas fa-venus-mars"></i> ${p.gender}</span>
                    <span><i class="fas fa-birthday-cake"></i> ${p.age} سنة</span>
                </div>
            </div>
            
            <div style="background: var(--light-gray); border-radius: var(--radius); padding: 15px; margin-bottom: 15px;">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; color: var(--primary);">
                    <i class="fas fa-exclamation-triangle"></i>
                    <span style="font-weight: 600;">${p.condition}</span>
                </div>
                <p style="color: var(--gray); font-size: 14px;">${p.history}</p>
            </div>
            
            <div class="info-row">
                <i class="fas fa-phone" style="color: var(--primary);"></i>
                <span dir="ltr">${p.phone}</span>
            </div>
            <div class="info-row">
                <i class="fas fa-map-marker-alt" style="color: var(--primary);"></i>
                <span>${p.address}</span>
            </div>
            <div class="info-row">
                <i class="fas fa-calendar-check" style="color: var(--primary);"></i>
                <span>آخر زيارة: ${p.lastVisit}</span>
            </div>
            <div class="info-row">
                <i class="fas fa-calendar-alt" style="color: var(--primary);"></i>
                <span>الزيارة القادمة: ${p.nextVisit}</span>
            </div>
            
            <div style="margin-top: 15px; padding: 15px; background: #fef3c7; border-radius: var(--radius);">
                <div style="display: flex; align-items: center; gap: 10px; color: #d97706; margin-bottom: 5px;">
                    <i class="fas fa-pills"></i>
                    <span style="font-weight: 600;">الأدوية</span>
                </div>
                <p style="color: #92400e; font-size: 14px;">${p.medications}</p>
            </div>
            
            <style>
                .info-row {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    padding: 12px 0;
                    border-bottom: 1px solid var(--light-gray);
                }
            </style>
        `;
        
        const footerContent = `
            <button class="btn btn-outline" onclick="closeModal()">
                <i class="fas fa-times"></i>
                إغلاق
            </button>
            <button class="btn btn-primary" onclick="callPatient('${p.phone}')">
                <i class="fas fa-phone"></i>
                اتصال
            </button>
            <button class="btn btn-success" onclick="addMedicalReport()">
                <i class="fas fa-file-medical"></i>
                إضافة تقرير
            </button>
        `;
        
        openModal('تفاصيل المريض', bodyContent, footerContent);
    };
    
    // =============== 4. تحديث الحالة ===============
    window.updateStatus = function(orderId, status) {
        const statusNames = {
            'arrived': 'وصلت إلى الموقع',
            'on-way': 'في الطريق',
            'completed': 'تم إكمال الخدمة'
        };
        
        const bodyContent = `
            <div style="text-align: center; margin-bottom: 20px;">
                <i class="fas fa-check-circle" style="font-size: 60px; color: var(--success); margin-bottom: 15px;"></i>
                <h3 style="margin-bottom: 10px;">تأكيد تحديث الحالة</h3>
                <p style="color: var(--gray);">هل أنت متأكد من تحديث حالة الطلب <strong>${orderId}</strong> إلى "${statusNames[status]}"؟</p>
            </div>
        `;
        
        const footerContent = `
            <button class="btn btn-outline" onclick="closeModal()">
                <i class="fas fa-times"></i>
                إلغاء
            </button>
            <button class="btn btn-success" onclick="confirmStatusUpdate('${orderId}', '${status}')">
                <i class="fas fa-check"></i>
                تأكيد
            </button>
        `;
        
        openModal('تحديث الحالة', bodyContent, footerContent);
    };
    
    window.confirmStatusUpdate = function(orderId, status) {
        alert(`تم تحديث حالة الطلب ${orderId} بنجاح`);
        closeModal();
    };
    
    // =============== 5. إضافة ملاحظات ===============
    window.addNotes = function(orderId) {
        const bodyContent = `
            <div class="form-group">
                <label style="font-weight: 600; margin-bottom: 10px; display: block;">إضافة ملاحظات طبية للطلب ${orderId}</label>
                <textarea id="noteText" rows="5" style="width: 100%; padding: 12px; border: 2px solid var(--light-gray); border-radius: var(--radius-sm); font-family: 'Tajawal', sans-serif;" placeholder="أدخل ملاحظاتك هنا..."></textarea>
            </div>
        `;
        
        const footerContent = `
            <button class="btn btn-outline" onclick="closeModal()">
                <i class="fas fa-times"></i>
                إلغاء
            </button>
            <button class="btn btn-primary" onclick="saveNote('${orderId}')">
                <i class="fas fa-save"></i>
                حفظ الملاحظات
            </button>
        `;
        
        openModal('إضافة ملاحظات', bodyContent, footerContent);
    };
    
    window.saveNote = function(orderId) {
        const note = document.getElementById('noteText')?.value;
        if (note) {
            alert(`تم حفظ الملاحظات للطلب ${orderId}`);
            closeModal();
        } else {
            alert('الرجاء إدخال الملاحظات أولاً');
        }
    };
    
    // =============== 6. تقرير طبي ===============
    window.addMedicalReport = function() {
        const bodyContent = `
            <div class="form-group">
                <label>نوع التقرير</label>
                <select id="reportType" style="width: 100%; padding: 12px; border: 2px solid var(--light-gray); border-radius: var(--radius-sm);">
                    <option>تقرير حالة يومية</option>
                    <option>تقرير خروج</option>
                    <option>تقرير متابعة</option>
                    <option>تقرير إجراءات طبية</option>
                </select>
            </div>
            
            <div class="form-group">
                <label>القياسات الحيوية</label>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    <input type="text" placeholder="الضغط" style="padding: 10px; border: 2px solid var(--light-gray); border-radius: var(--radius-sm);">
                    <input type="text" placeholder="السكر" style="padding: 10px; border: 2px solid var(--light-gray); border-radius: var(--radius-sm);">
                    <input type="text" placeholder="درجة الحرارة" style="padding: 10px; border: 2px solid var(--light-gray); border-radius: var(--radius-sm);">
                    <input type="text" placeholder="النبض" style="padding: 10px; border: 2px solid var(--light-gray); border-radius: var(--radius-sm);">
                </div>
            </div>
            
            <div class="form-group">
                <label>الإجراءات المنجزة</label>
                <textarea rows="4" style="width: 100%; padding: 12px; border: 2px solid var(--light-gray); border-radius: var(--radius-sm);" placeholder="صف الإجراءات الطبية التي تم تنفيذها..."></textarea>
            </div>
            
            <div class="form-group">
                <label>توصيات للمريض</label>
                <textarea rows="3" style="width: 100%; padding: 12px; border: 2px solid var(--light-gray); border-radius: var(--radius-sm);" placeholder="توصيات للزيارة القادمة..."></textarea>
            </div>
        `;
        
        const footerContent = `
            <button class="btn btn-outline" onclick="closeModal()">
                <i class="fas fa-times"></i>
                إلغاء
            </button>
            <button class="btn btn-success" onclick="submitReport()">
                <i class="fas fa-paper-plane"></i>
                إرسال التقرير
            </button>
        `;
        
        openModal('إضافة تقرير طبي', bodyContent, footerContent);
    };
    
    window.submitReport = function() {
        alert('تم إرسال التقرير الطبي بنجاح');
        closeModal();
    };
    
    // =============== 7. طلب سحب أرباح ===============
    window.requestPayout = function() {
        const bodyContent = `
            <div style="text-align: center; margin-bottom: 20px;">
                <i class="fas fa-money-bill-wave" style="font-size: 60px; color: var(--success); margin-bottom: 15px;"></i>
                <h3 style="margin-bottom: 10px;">الرصيد الحالي: 1,250 ج.م</h3>
                <p style="color: var(--gray);">الحد الأدنى للسحب: 500 ج.م</p>
            </div>
            
            <div class="form-group">
                <label>المبلغ المراد سحبه</label>
                <input type="number" id="amount" value="500" min="500" max="1250" step="50" style="width: 100%; padding: 12px; border: 2px solid var(--light-gray); border-radius: var(--radius-sm);">
            </div>
            
            <div class="form-group">
                <label>طريقة الدفع</label>
                <select id="paymentMethod" style="width: 100%; padding: 12px; border: 2px solid var(--light-gray); border-radius: var(--radius-sm);">
                    <option>تحويل بنكي</option>
                    <option>محفظة إلكترونية</option>
                    <option>فودافون كاش</option>
                </select>
            </div>
            
            <div class="form-group">
                <label>بيانات الحساب</label>
                <input type="text" placeholder="رقم الحساب / المحفظة" style="width: 100%; padding: 12px; border: 2px solid var(--light-gray); border-radius: var(--radius-sm);">
            </div>
        `;
        
        const footerContent = `
            <button class="btn btn-outline" onclick="closeModal()">
                <i class="fas fa-times"></i>
                إلغاء
            </button>
            <button class="btn btn-primary" onclick="confirmPayout()">
                <i class="fas fa-check"></i>
                تأكيد الطلب
            </button>
        `;
        
        openModal('طلب سحب أرباح', bodyContent, footerContent);
    };
    
    window.confirmPayout = function() {
        const amount = document.getElementById('amount')?.value || 500;
        alert(`تم تقديم طلب سحب ${amount} ج.م بنجاح. سيتم تحويل المبلغ خلال 24 ساعة.`);
        closeModal();
    };
    
    // =============== 8. دوال الأزرار الأخرى ===============
    window.startShift = function() {
        openModal('بدء الدوام', `
            <div style="text-align: center;">
                <i class="fas fa-play-circle" style="font-size: 60px; color: var(--success); margin-bottom: 15px;"></i>
                <h3>هل أنت متأكد من بدء الدوام؟</h3>
                <p style="color: var(--gray); margin-top: 10px;">سيتم تسجيل وقت البدء وسيتم عرضك كمتاح للحجوزات</p>
            </div>
        `, `
            <button class="btn btn-outline" onclick="closeModal()">إلغاء</button>
            <button class="btn btn-success" onclick="confirmStartShift()">بدء الدوام</button>
        `);
    };
    
    window.confirmStartShift = function() {
        alert('تم بدء الدوام بنجاح');
        closeModal();
    };
    
    window.endShift = function() {
        openModal('إنهاء الدوام', `
            <div style="text-align: center;">
                <i class="fas fa-stop-circle" style="font-size: 60px; color: var(--danger); margin-bottom: 15px;"></i>
                <h3>هل أنت متأكد من إنهاء الدوام؟</h3>
                <p style="color: var(--gray); margin-top: 10px;">سيتم إيقاف استقبال الحجوزات الجديدة</p>
            </div>
        `, `
            <button class="btn btn-outline" onclick="closeModal()">إلغاء</button>
            <button class="btn btn-danger" onclick="confirmEndShift()">إنهاء الدوام</button>
        `);
    };
    
    window.confirmEndShift = function() {
        alert('تم إنهاء الدوام بنجاح');
        closeModal();
    };
    
    window.updateAvailability = function() {
        openModal('تحديث حالة التوفر', `
            <div style="text-align: center; margin-bottom: 20px;">
                <i class="fas fa-user-clock" style="font-size: 60px; color: var(--primary); margin-bottom: 15px;"></i>
                <h3>الحالة الحالية: متصل</h3>
            </div>
            
            <div style="display: flex; gap: 15px; justify-content: center;">
                <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                    <input type="radio" name="status" value="online" checked>
                    <span style="color: var(--success); font-weight: 600;">متصل</span>
                </label>
                <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                    <input type="radio" name="status" value="busy">
                    <span style="color: var(--warning); font-weight: 600;">مشغول</span>
                </label>
                <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                    <input type="radio" name="status" value="offline">
                    <span style="color: var(--gray); font-weight: 600;">غير متصل</span>
                </label>
            </div>
        `, `
            <button class="btn btn-outline" onclick="closeModal()">إلغاء</button>
            <button class="btn btn-primary" onclick="confirmUpdateStatus()">تحديث الحالة</button>
        `);
    };
    
    window.confirmUpdateStatus = function() {
        const status = document.querySelector('input[name="status"]:checked')?.value;
        alert(`تم تحديث الحالة إلى: ${status === 'online' ? 'متصل' : status === 'busy' ? 'مشغول' : 'غير متصل'}`);
        closeModal();
    };
    
    window.callPatient = function(phone) {
        if (confirm(`هل تريد الاتصال بالرقم ${phone}؟`)) {
            window.location.href = `tel:${phone}`;
        }
    };
    
    window.navigateTo = function(patientId) {
        openModal('اتجاهات الوصول', `
            <div style="text-align: center;">
                <i class="fas fa-map-marked-alt" style="font-size: 60px; color: var(--primary); margin-bottom: 15px;"></i>
                <h3 style="margin-bottom: 10px;">الوصول إلى المريض</h3>
                <p style="color: var(--gray); margin-bottom: 20px;">مدينة نصر، برج النور - الدور 5</p>
                <div style="background: var(--light-gray); padding: 15px; border-radius: var(--radius);">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <span>المسافة:</span>
                        <span style="font-weight: 600;">3.5 كم</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <span>الوقت المتوقع:</span>
                        <span style="font-weight: 600;">12 دقيقة</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span>حركة المرور:</span>
                        <span style="color: var(--success);">خفيفة</span>
                    </div>
                </div>
            </div>
        `, `
            <button class="btn btn-outline" onclick="closeModal()">إلغاء</button>
            <button class="btn btn-primary" onclick="window.open('https://maps.google.com', '_blank')">
                <i class="fas fa-directions"></i>
                فتح في خرائط جوجل
            </button>
        `);
    };
    
    window.completeService = function(orderId) {
        updateStatus(orderId, 'completed');
    };
    
    window.viewDetailedEarnings = function() {
        openModal('تفاصيل الأرباح', `
            <div style="margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; padding: 12px; background: var(--light-gray); border-radius: var(--radius); margin-bottom: 10px;">
                    <span>اليوم:</span>
                    <span style="font-weight: 600; color: var(--success);">1,850 ج.م</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 12px; background: var(--light-gray); border-radius: var(--radius); margin-bottom: 10px;">
                    <span>هذا الأسبوع:</span>
                    <span style="font-weight: 600; color: var(--success);">8,250 ج.م</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 12px; background: var(--light-gray); border-radius: var(--radius); margin-bottom: 10px;">
                    <span>هذا الشهر:</span>
                    <span style="font-weight: 600; color: var(--success);">32,400 ج.م</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 12px; background: var(--light-gray); border-radius: var(--radius);">
                    <span>الإجمالي:</span>
                    <span style="font-weight: 700; color: var(--primary); font-size: 18px;">42,500 ج.م</span>
                </div>
            </div>
            
            <h4 style="margin-bottom: 15px;">تفاصيل الطلبات</h4>
            <div style="max-height: 200px; overflow-y: auto;">
                <div style="display: flex; justify-content: space-between; padding: 10px; border-bottom: 1px solid var(--light-gray);">
                    <span>#SH20250315001</span>
                    <span>250 ج.م</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 10px; border-bottom: 1px solid var(--light-gray);">
                    <span>#SH20250315002</span>
                    <span>350 ج.م</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 10px; border-bottom: 1px solid var(--light-gray);">
                    <span>#SH20250314003</span>
                    <span>200 ج.م</span>
                </div>
            </div>
        `, `
            <button class="btn btn-primary" onclick="closeModal()">
                <i class="fas fa-check"></i>
                تم
            </button>
        `);
    };
    
    window.checkInventory = function() {
        alert('سيتم فتح صفحة فحص المستلزمات');
    };
    
    window.viewTraining = function() {
        alert('سيتم فتح صفحة التدريبات الجديدة');
    };
    
    window.contactSupport = function() {
        alert('سيتم التواصل مع الدعم الفني');
    };
    
    window.viewPerformance = function() {
        alert('سيتم فتح صفحة الأداء والتقييمات');
    };
    
    window.remindMe = function(orderId) {
        alert(`تم تفعيل التذكير للطلب ${orderId}`);
    };
    
    window.checkSupplies = function() {
        alert('فحص المستلزمات الطبية');
    };
    
    window.addReport = function(orderId) {
        addMedicalReport();
    };
    
    window.requestReview = function(orderId) {
        alert(`تم طلب تقييم الخدمة للطلب ${orderId}`);
    };
    
    window.markAsAvailable = function() {
        updateAvailability();
    };
    
    // =============== 9. إضافة الرسم البياني للأرباح ===============
    function initEarningsChart() {
        const chart = document.getElementById('earningsChart');
        if (!chart) return;
        
        const days = ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];
        const earnings = [1850, 2100, 1950, 2200, 1800, 2400, 1500];
        
        let bars = '';
        days.forEach((day, index) => {
            const height = (earnings[index] / 2500) * 100;
            bars += `
                <div style="display: flex; flex-direction: column; align-items: center; width: 30px;">
                    <div class="chart-bar" style="height: ${height}px; width: 30px;"></div>
                    <span style="font-size: 10px; margin-top: 5px;">${day.slice(0, 2)}</span>
                </div>
            `;
        });
        
        chart.innerHTML = `
            <div style="display: flex; justify-content: space-around; align-items: flex-end; height: 100%; padding: 0 10px;">
                ${bars}
            </div>
        `;
    }
    
    initEarningsChart();
    
    // =============== 10. إضافة تأثيرات بصرية ===============
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    console.log('✅ لوحة تحكم الممرض جاهزة');
});