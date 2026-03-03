// =============== لوحة تحكم الممرض - تفاعلات متكاملة ===============

class NurseDashboard {
    constructor() {
        this.currentShift = {
            status: 'offline',
            startTime: null,
            endTime: null,
            breaks: []
        };
        
        this.appointments = [];
        this.earnings = {
            today: 1850,
            week: 8250,
            month: 32400,
            history: [1200, 1850, 1600, 1400, 1800, 900, 850]
        };
        
        this.notifications = [];
        this.init();
    }
    
    init() {
        this.loadAppointments();
        this.setupEventListeners();
        this.setupAutoRefresh();
        this.createEarningsChart();
        this.updateAppointmentTimes();
        this.checkShiftStatus();
        this.setupKeyboardShortcuts();
        this.setupTooltips();
    }
    
    loadAppointments() {
        // تحميل المواعيد من localStorage أو استخدام البيانات الافتراضية
        const saved = localStorage.getItem('nurseAppointments');
        if (saved) {
            this.appointments = JSON.parse(saved);
        } else {
            this.appointments = [
                {
                    id: 'SH20250315001',
                    time: '10:00 ص',
                    patient: 'أحمد محمود',
                    service: 'حقنة عضلية + قياس ضغط',
                    address: 'مدينة نصر، برج النور',
                    distance: '15 دقيقة',
                    status: 'urgent',
                    age: 45,
                    condition: 'مريض سكري',
                    allergies: 'حساسية بنسلين',
                    phone: '01001234567'
                },
                {
                    id: 'SH20250315002',
                    time: '11:30 ص',
                    patient: 'فاطمة علي',
                    service: 'قياس ضغط + تخطيط قلب',
                    address: 'مصر الجديدة',
                    distance: '25 دقيقة',
                    status: 'upcoming',
                    age: 70,
                    condition: 'ضغط مرتفع',
                    allergies: 'لا يوجد',
                    phone: '01002345678'
                },
                {
                    id: 'SH20250315003',
                    time: '2:00 م',
                    patient: 'محمد أحمد',
                    service: 'إعطاء حقنة + قياس ضغط',
                    address: 'مدينة نصر، شارع النحاس',
                    distance: 'في الموقع',
                    status: 'arrived',
                    age: 55,
                    condition: 'مريض قلب',
                    allergies: 'أسبرين',
                    phone: '01003456789'
                },
                {
                    id: 'SH20250315004',
                    time: '4:00 م',
                    patient: 'خالد عمر',
                    service: 'تعبئة أدوية أسبوعية',
                    address: 'العباسية',
                    distance: '35 دقيقة',
                    status: 'upcoming',
                    age: 60,
                    condition: 'مريض سكري',
                    allergies: 'لا يوجد',
                    phone: '01004567890'
                },
                {
                    id: 'SH20250314005',
                    time: '10:00 ص',
                    patient: 'سامي رجب',
                    service: 'تغيير جروح',
                    address: 'حدائق القبة',
                    distance: 'مكتمل',
                    status: 'completed',
                    age: 50,
                    condition: 'جروح مزمنة',
                    allergies: 'لا يوجد',
                    phone: '01005678901'
                }
            ];
        }
    }
    
    setupEventListeners() {
        // أزرار التحكم الرئيسية
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => this.addRippleEffect(btn));
        });
        
        // تحديث حالة الدوام
        const startShiftBtn = document.querySelector('.btn-success');
        if (startShiftBtn && startShiftBtn.textContent.includes('بدء الدوام')) {
            startShiftBtn.addEventListener('click', () => this.startShift());
        }
        
        const endShiftBtn = document.querySelector('.btn-warning');
        if (endShiftBtn && endShiftBtn.textContent.includes('إنهاء الدوام')) {
            endShiftBtn.addEventListener('click', () => this.endShift());
        }
        
        // أزرار الإجراءات السريعة
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = btn.querySelector('.action-title')?.textContent;
                this.handleQuickAction(action);
            });
        });
        
        // تحديث حالة المواعيد عند النقر
        document.querySelectorAll('.btn-sm').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const appointmentItem = btn.closest('.appointment-item');
                if (appointmentItem) {
                    const bookingId = this.extractBookingId(appointmentItem);
                    const action = btn.textContent.trim();
                    this.handleAppointmentAction(bookingId, action);
                }
            });
        });
        
        // تأثير النقر على بطاقات المرضى
        document.querySelectorAll('.patient-card').forEach(card => {
            card.addEventListener('click', () => {
                const patientName = card.querySelector('.patient-name-small')?.textContent;
                this.showPatientDetails(patientName);
            });
        });
    }
    
    setupAutoRefresh() {
        // تحديث تلقائي كل 30 ثانية
        setInterval(() => {
            this.refreshData();
        }, 30000);
    }
    
    refreshData() {
        // محاكاة تحديث البيانات
        this.showNotification('تم تحديث البيانات', 'info');
        
        // تحديث حالة المواعيد المتأخرة
        const now = new Date();
        document.querySelectorAll('.appointment-item').forEach(item => {
            const timeText = item.querySelector('.appointment-time')?.textContent;
            if (timeText) {
                const [hour, minute] = timeText.replace('ص', '').replace('م', '').trim().split(':');
                const appointmentTime = new Date();
                appointmentTime.setHours(parseInt(hour), parseInt(minute), 0);
                
                if (now > appointmentTime) {
                    const statusDiv = item.querySelector('.appointment-status');
                    if (statusDiv && !statusDiv.classList.contains('status-completed')) {
                        statusDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> متأخر';
                        statusDiv.className = 'appointment-status status-urgent';
                    }
                }
            }
        });
    }
    
    createEarningsChart() {
        const chart = document.getElementById('earningsChart');
        if (!chart) return;
        
        // تنظيف الرسم البياني
        chart.innerHTML = '';
        
        const days = ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];
        const earnings = this.earnings.history;
        const maxEarning = Math.max(...earnings);
        
        days.forEach((day, index) => {
            const barContainer = document.createElement('div');
            barContainer.style.cssText = `
                position: absolute;
                bottom: 0;
                left: ${10 + (index * 40)}px;
                width: 30px;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
            `;
            
            const bar = document.createElement('div');
            bar.style.cssText = `
                position: absolute;
                bottom: 0;
                width: 100%;
                height: ${(earnings[index] / maxEarning) * 100}%;
                background: linear-gradient(to top, var(--secondary), #00A88A);
                border-radius: 5px 5px 0 0;
                transition: height 0.3s ease;
                cursor: pointer;
            `;
            
            const valueLabel = document.createElement('div');
            valueLabel.style.cssText = `
                position: absolute;
                top: -20px;
                left: 50%;
                transform: translateX(-50%);
                font-size: 10px;
                color: var(--gray);
                white-space: nowrap;
            `;
            valueLabel.textContent = `${earnings[index]} ج.م`;
            
            const dayLabel = document.createElement('div');
            dayLabel.style.cssText = `
                position: absolute;
                bottom: -20px;
                left: 50%;
                transform: translateX(-50%);
                font-size: 10px;
                color: var(--gray);
            `;
            dayLabel.textContent = day;
            
            barContainer.appendChild(bar);
            barContainer.appendChild(valueLabel);
            barContainer.appendChild(dayLabel);
            
            // إضافة تأثير hover
            bar.addEventListener('mouseenter', () => {
                bar.style.opacity = '0.8';
                bar.style.transform = 'scaleX(1.1)';
                valueLabel.style.fontWeight = 'bold';
                valueLabel.style.color = 'var(--primary)';
            });
            
            bar.addEventListener('mouseleave', () => {
                bar.style.opacity = '1';
                bar.style.transform = 'scaleX(1)';
                valueLabel.style.fontWeight = 'normal';
                valueLabel.style.color = 'var(--gray)';
            });
            
            chart.appendChild(barContainer);
        });
    }
    
    startShift() {
        const now = new Date();
        const startTime = now.toLocaleTimeString('ar-EG', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
        
        if (confirm(`بدء الدوام في ${startTime}؟`)) {
            this.currentShift.status = 'online';
            this.currentShift.startTime = now;
            
            this.showNotification(`بدأت الدوام في ${startTime}. حظاً موفقاً!`, 'success');
            
            // تحديث الواجهة
            const shiftBtn = document.querySelector('.btn-success');
            if (shiftBtn) {
                shiftBtn.innerHTML = '<i class="fas fa-stop-circle"></i> إنهاء الدوام';
                shiftBtn.className = 'btn btn-warning';
                shiftBtn.onclick = () => this.endShift();
            }
            
            // تحديث حالة التوفر
            const statusBadge = document.querySelector('.status-badge');
            if (statusBadge) {
                statusBadge.innerHTML = '<i class="fas fa-circle"></i> متصل الآن';
                statusBadge.className = 'status-badge badge-online';
            }
            
            // تسجيل بداية الدوام
            localStorage.setItem('shiftStart', now.toISOString());
        }
    }
    
    endShift() {
        const now = new Date();
        const endTime = now.toLocaleTimeString('ar-EG', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
        
        if (confirm('هل تريد إنهاء الدوام اليوم؟')) {
            const reason = prompt('سبب إنهاء الدوام (اختياري):', 'انتهاء الدوام المقرر');
            
            this.currentShift.status = 'offline';
            this.currentShift.endTime = now;
            
            // حساب مدة الدوام
            if (this.currentShift.startTime) {
                const duration = Math.round((now - this.currentShift.startTime) / 1000 / 60);
                const hours = Math.floor(duration / 60);
                const minutes = duration % 60;
                
                this.showNotification(
                    `تم إنهاء الدوام. مدة العمل: ${hours} ساعة و ${minutes} دقيقة. شكراً لجهودك!`,
                    'success'
                );
            }
            
            // تحديث الواجهة
            const shiftBtn = document.querySelector('.btn-warning');
            if (shiftBtn) {
                shiftBtn.innerHTML = '<i class="fas fa-play-circle"></i> بدء الدوام';
                shiftBtn.className = 'btn btn-success';
                shiftBtn.onclick = () => this.startShift();
            }
            
            // تحديث حالة التوفر
            const statusBadge = document.querySelector('.status-badge');
            if (statusBadge) {
                statusBadge.innerHTML = '<i class="fas fa-circle"></i> غير متصل';
                statusBadge.className = 'status-badge badge-offline';
            }
            
            // مسح بيانات الدوام
            localStorage.removeItem('shiftStart');
        }
    }
    
    handleQuickAction(action) {
        const actions = {
            'متاح للحجوزات': () => this.markAsAvailable(),
            'إضافة تقرير': () => this.addMedicalReport(),
            'فحص المستلزمات': () => this.checkInventory(),
            'تدريبات جديدة': () => this.viewTraining(),
            'الدعم الفني': () => this.contactSupport(),
            'أدائي': () => this.viewPerformance()
        };
        
        if (actions[action]) {
            actions[action]();
        } else {
            this.showNotification('جاري تجهيز هذه الخدمة', 'info');
        }
    }
    
    handleAppointmentAction(bookingId, action) {
        const actions = {
            'وصلت': () => this.updateAppointmentStatus(bookingId, 'arrived'),
            'في الطريق': () => this.updateAppointmentStatus(bookingId, 'on-way'),
            'اتصال': () => this.callPatient(bookingId),
            'اتجاهات': () => this.navigateToPatient(bookingId),
            'انتهيت': () => this.completeService(bookingId),
            'ملاحظات': () => this.addNotes(bookingId),
            'تفاصيل': () => this.viewPatientDetails(bookingId),
            'تذكير': () => this.setReminder(bookingId),
            'المستلزمات': () => this.checkAppointmentSupplies(bookingId),
            'تقرير': () => this.addReport(bookingId),
            'طلب تقييم': () => this.requestReview(bookingId)
        };
        
        // البحث عن الإجراء المناسب
        for (const [key, func] of Object.entries(actions)) {
            if (action.includes(key)) {
                func();
                return;
            }
        }
        
        this.showNotification('جاري معالجة الطلب', 'info');
    }
    
    updateAppointmentStatus(bookingId, status) {
        const statusText = {
            'arrived': 'وصلت إلى الموقع',
            'on-way': 'في الطريق',
            'completed': 'مكتمل'
        };
        
        if (confirm(`تحديث حالة الحجز إلى "${statusText[status]}"؟`)) {
            this.showNotification(`تم تحديث حالة الحجز ${bookingId}`, 'success');
            
            // تحديث الواجهة
            const appointment = this.findAppointmentElement(bookingId);
            if (appointment) {
                const statusDiv = appointment.querySelector('.appointment-status');
                if (statusDiv) {
                    statusDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${statusText[status]}`;
                    statusDiv.className = `appointment-status status-${status}`;
                }
            }
        }
    }
    
    callPatient(bookingId) {
        const appointment = this.appointments.find(a => a.id === bookingId);
        if (appointment && appointment.phone) {
            if (confirm(`الاتصال بالمريض ${appointment.patient} على الرقم ${appointment.phone}؟`)) {
                window.location.href = `tel:${appointment.phone}`;
            }
        } else {
            this.showNotification('رقم الهاتف غير متوفر', 'error');
        }
    }
    
    navigateToPatient(bookingId) {
        const appointment = this.appointments.find(a => a.id === bookingId);
        if (appointment && appointment.address) {
            if (confirm(`فتح خرائط جوجل للوصول إلى ${appointment.address}؟`)) {
                window.open(`https://maps.google.com/?q=${encodeURIComponent(appointment.address)}`, '_blank');
            }
        }
    }
    
    completeService(bookingId) {
        const appointment = this.appointments.find(a => a.id === bookingId);
        
        if (confirm(`انتهيت من خدمة المريض ${appointment?.patient || bookingId}؟`)) {
            const notes = prompt('أضف ملاحظات عن الخدمة (اختياري):');
            const payment = confirm('هل تم استلام الدفع نقداً؟');
            
            if (notes) {
                this.saveMedicalNotes(bookingId, notes);
            }
            
            this.showNotification(
                `تم إكمال الخدمة بنجاح. ${payment ? 'تم تسجيل استلام الدفع.' : ''}`,
                'success'
            );
            
            // تحديث الواجهة
            const appointmentEl = this.findAppointmentElement(bookingId);
            if (appointmentEl) {
                const statusDiv = appointmentEl.querySelector('.appointment-status');
                if (statusDiv) {
                    statusDiv.innerHTML = '<i class="fas fa-check-circle"></i> مكتمل';
                    statusDiv.className = 'appointment-status status-completed';
                }
                
                // إخفاء أزرار الإجراءات
                const actions = appointmentEl.querySelector('.appointment-actions');
                if (actions) {
                    actions.innerHTML = `
                        <button class="btn btn-outline btn-sm" onclick="addReport('${bookingId}')">
                            <i class="fas fa-file-medical"></i> تقرير
                        </button>
                        <button class="btn btn-outline btn-sm" onclick="requestReview('${bookingId}')">
                            <i class="fas fa-star"></i> طلب تقييم
                        </button>
                    `;
                }
            }
        }
    }
    
    addNotes(bookingId) {
        const notes = prompt('أضف ملاحظات طبية للمريض:');
        if (notes) {
            this.saveMedicalNotes(bookingId, notes);
            this.showNotification('تم حفظ الملاحظات الطبية', 'success');
        }
    }
    
    saveMedicalNotes(bookingId, notes) {
        // حفظ في localStorage
        const savedNotes = JSON.parse(localStorage.getItem('medicalNotes') || '{}');
        savedNotes[bookingId] = {
            notes: notes,
            date: new Date().toISOString()
        };
        localStorage.setItem('medicalNotes', JSON.stringify(savedNotes));
    }
    
    viewPatientDetails(bookingId) {
        const appointment = this.appointments.find(a => a.id === bookingId);
        if (appointment) {
            this.showPatientDetails(appointment.patient);
        }
    }
    
    setReminder(bookingId) {
        const appointment = this.appointments.find(a => a.id === bookingId);
        if (appointment) {
            const minutes = prompt('تذكير قبل كم دقيقة؟ (30 دقيقة افتراضياً)', '30');
            if (minutes && !isNaN(minutes)) {
                setTimeout(() => {
                    this.showNotification(
                        `تذكير: موعد ${appointment.patient} بعد ${minutes} دقيقة`,
                        'info'
                    );
                }, minutes * 60 * 1000);
                
                this.showNotification(`تم ضبط تذكير قبل ${minutes} دقيقة`, 'success');
            }
        }
    }
    
    checkAppointmentSupplies(bookingId) {
        const supplies = [
            'قفازات طبية: ✅ متوفرة',
            'محاقن: ✅ متوفرة',
            'شاش طبي: ✅ متوفر',
            'مطهر: ✅ متوفر',
            'أدوية أساسية: ✅ متوفرة'
        ];
        
        this.showNotification('المستلزمات الطبية:\n' + supplies.join('\n'), 'info', 5000);
    }
    
    addReport(bookingId) {
        this.showNotification('جاري فتح نموذج التقرير الطبي', 'info');
        // window.location.href = `add-report.html?booking=${bookingId}`;
    }
    
    requestReview(bookingId) {
        if (confirm('إرسال طلب تقييم للمريض؟')) {
            this.showNotification('تم إرسال طلب التقييم للمريض', 'success');
        }
    }
    
    markAsAvailable() {
        const statusBadge = document.querySelector('.status-badge');
        if (statusBadge) {
            statusBadge.innerHTML = '<i class="fas fa-circle"></i> متاح الآن';
            statusBadge.className = 'status-badge badge-online';
        }
        this.showNotification('تم تحديث حالتك إلى "متاح للحجوزات"', 'success');
    }
    
    addMedicalReport() {
        this.showNotification('جاري فتح نموذج إضافة تقرير طبي', 'info');
        // window.location.href = 'add-medical-report.html';
    }
    
    checkInventory() {
        const inventory = [
            'قفازات: 50 زوج - منخفض',
            'محاقن: 30 وحدة - جيد',
            'شاش طبي: 15 لفافة - جيد',
            'مطهر: 5 زجاجات - جيد',
            'أدوية أساسية: مكتمل'
        ];
        
        this.showNotification('المستلزمات المتوفرة:\n' + inventory.join('\n'), 'info', 5000);
    }
    
    viewTraining() {
        this.showNotification('جاري فتح صفحة التدريبات المتاحة', 'info');
        // window.location.href = 'nurse-training.html';
    }
    
    contactSupport() {
        const supportOptions = [
            '📞 هاتف: 19555',
            '💬 واتساب: 01012345678',
            '📧 بريد: support@safehands.com',
            '⏰ متاح 24/7'
        ];
        
        this.showNotification('الدعم الفني:\n' + supportOptions.join('\n'), 'info', 5000);
    }
    
    viewPerformance() {
        const performance = {
            rating: '4.9/5',
            completed: '127 عملية',
            onTime: '98%',
            earnings: '32,400 ج.م'
        };
        
        this.showNotification(
            `أدائك:\nالتقييم: ${performance.rating}\nالعمليات: ${performance.completed}\nالالتزام: ${performance.onTime}\nالأرباح: ${performance.earnings}`,
            'info',
            5000
        );
    }
    
    showPatientDetails(patientName) {
        const patient = this.appointments.find(a => a.patient === patientName);
        if (patient) {
            const details = `
                👤 المريض: ${patient.patient}
                🎂 العمر: ${patient.age} سنة
                📋 الحالة: ${patient.condition}
                ⚕️ حساسية: ${patient.allergies || 'لا يوجد'}
                📞 هاتف: ${patient.phone}
                📍 العنوان: ${patient.address}
                🏥 آخر خدمة: ${patient.service}
            `;
            
            this.showNotification(details, 'info', 8000);
        }
    }
    
    updateAppointmentTimes() {
        const now = new Date();
        const appointments = document.querySelectorAll('.appointment-item');
        
        appointments.forEach((appointment, index) => {
            const timeElement = appointment.querySelector('.appointment-time');
            if (timeElement) {
                const timeText = timeElement.textContent;
                const [hour, minute] = timeText.replace('ص', '').replace('م', '').trim().split(':');
                
                const appointmentTime = new Date();
                appointmentTime.setHours(parseInt(hour), parseInt(minute), 0);
                
                if (now > appointmentTime) {
                    appointment.style.opacity = '0.7';
                    
                    // إضافة مؤشر تأخير
                    const statusDiv = appointment.querySelector('.appointment-status');
                    if (statusDiv && !statusDiv.classList.contains('status-completed')) {
                        const timeDiff = Math.round((now - appointmentTime) / 1000 / 60);
                        if (timeDiff > 15) {
                            statusDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> متأخر ${timeDiff} د`;
                            statusDiv.className = 'appointment-status status-urgent';
                        }
                    }
                }
            }
        });
    }
    
    checkShiftStatus() {
        const savedShiftStart = localStorage.getItem('shiftStart');
        if (savedShiftStart) {
            const startTime = new Date(savedShiftStart);
            const now = new Date();
            
            // إذا بدأ الدوام قبل أقل من 12 ساعة
            if ((now - startTime) < 12 * 60 * 60 * 1000) {
                this.currentShift.status = 'online';
                this.currentShift.startTime = startTime;
                
                // تحديث الواجهة
                const shiftBtn = document.querySelector('.btn-success');
                if (shiftBtn) {
                    shiftBtn.innerHTML = '<i class="fas fa-stop-circle"></i> إنهاء الدوام';
                    shiftBtn.className = 'btn btn-warning';
                    shiftBtn.onclick = () => this.endShift();
                }
                
                const statusBadge = document.querySelector('.status-badge');
                if (statusBadge) {
                    statusBadge.innerHTML = '<i class="fas fa-circle"></i> متصل الآن';
                    statusBadge.className = 'status-badge badge-online';
                }
            }
        }
    }
    
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl + S: بدء/إنهاء الدوام
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                if (this.currentShift.status === 'online') {
                    this.endShift();
                } else {
                    this.startShift();
                }
            }
            
            // Ctrl + R: تحديث البيانات
            if (e.ctrlKey && e.key === 'r') {
                e.preventDefault();
                this.refreshData();
            }
            
            // Ctrl + M: تحديث الحالة إلى متاح
            if (e.ctrlKey && e.key === 'm') {
                e.preventDefault();
                this.markAsAvailable();
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
    
    addRippleEffect(btn) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        btn.style.position = 'relative';
        btn.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
    
    findAppointmentElement(bookingId) {
        const appointments = document.querySelectorAll('.appointment-item');
        for (const app of appointments) {
            if (app.innerHTML.includes(bookingId)) {
                return app;
            }
        }
        return null;
    }
    
    extractBookingId(appointmentItem) {
        const html = appointmentItem.innerHTML;
        const match = html.match(/SH\d{11}/);
        return match ? match[0] : null;
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
            align-items: center;
            gap: 10px;
            font-size: 14px;
            line-height: 1.6;
            white-space: pre-line;
        `;
        
        notification.innerHTML = `
            <i class="fas ${icons[type]}" style="font-size: 20px;"></i>
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
                @keyframes ripple {
                    to { transform: scale(4); opacity: 0; }
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

document.addEventListener('DOMContentLoaded', function() {
    // إنشاء كائن لوحة التحكم
    window.nurseDashboard = new NurseDashboard();
    
    // تحميل البيانات بشكل تدريجي
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach((stat, index) => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(20px)';
        stat.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
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
    
    // تحديث الوقت الحالي
    const updateCurrentTime = () => {
        const timeElement = document.querySelector('.section-title i + span');
        if (timeElement) {
            const now = new Date();
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };
            timeElement.textContent = now.toLocaleDateString('ar-EG', options);
        }
    };
    
    updateCurrentTime();
    setInterval(updateCurrentTime, 60000);
    
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
        `;
        loader.innerHTML = '<div class="loading-spinner"></div>';
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
            
            if (diffHours > 8) {
                window.nurseDashboard.showNotification('مرحباً بعودتك! لديك 5 مواعيد جديدة اليوم', 'info');
            }
        }
    }, 1000);
});