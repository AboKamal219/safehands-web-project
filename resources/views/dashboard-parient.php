<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>لوحة تحكم المريض - Safe Hands</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../css/dashboard-parient.css">
</head>
<body>
    <!-- Header -->
    <header>
        <div class="container">
            <div class="header-content">
                <a href="../../index.php" class="logo">
                    <div class="logo-icon">
                        <i class="fas fa-hand-holding-medical"></i>
                    </div>
                    <div class="logo-text">Safe Hands</div>
                </a>
                
                <div class="header-actions">
                    <div class="notification-container">
                        <button class="notification-btn" id="notificationBtn">
                            <i class="far fa-bell"></i>
                            <span class="notification-badge" id="notificationCount">3</span>
                        </button>
                        
                        <div class="notification-dropdown" id="notificationDropdown">
                            <div class="notification-header">
                                <h3>الإشعارات</h3>
                                <button class="mark-all-read" id="markAllReadBtn">تعليم الكل كمقروء</button>
                            </div>
                            <div class="notification-list" id="notificationList"></div>
                            <div class="notification-footer">
                                <a href="#" class="view-all-notifications" onclick="viewAllNotifications()">
                                    <span>عرض جميع الإشعارات</span>
                                    <i class="fas fa-arrow-left"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <a href="../../index.php" class="btn btn-outline btn-sm">
                        <i class="fas fa-home"></i>
                        الرئيسية
                    </a>
                </div>
            </div>
        </div>
    </header>

    <!-- Main Container -->
    <div class="container">
        <!-- Page Header -->
        <div class="page-header">
            <h1 class="page-title">
                <i class="fas fa-user"></i>
                لوحة تحكم المريض
            </h1>
            <p class="page-subtitle">مرحباً بعودتك! إليك جدول مواعيدك وخدماتك الصحية</p>
        </div>

        <!-- Patient Profile -->
        <div class="patient-profile">
            <div class="patient-avatar-large">م</div>
            <div class="patient-info">
                <div class="patient-name">محمد أحمد عبدالله</div>
                <div class="patient-meta">
                    <div class="patient-meta-item">
                        <i class="fas fa-birthday-cake"></i>
                        45 سنة
                    </div>
                    <div class="patient-meta-item">
                        <i class="fas fa-map-marker-alt"></i>
                        مدينة نصر - القاهرة
                    </div>
                    <div class="patient-meta-item">
                        <i class="fas fa-calendar-alt"></i>
                        عضو منذ يناير 2024
                    </div>
                </div>
                <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                    <div class="patient-status-badge">
                        <i class="fas fa-check-circle"></i>
                        حساب نشط
                    </div>
                    <div class="patient-status-badge">
                        <i class="fas fa-shield-alt"></i>
                        مؤمن عليه
                    </div>
                </div>
            </div>
        </div>

        <!-- Stats Grid -->
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-header">
                    <div class="stat-icon">
                        <i class="fas fa-calendar-check"></i>
                    </div>
                </div>
                <div class="stat-value">3</div>
                <div class="stat-label">مواعيد قادمة</div>
            </div>
            
            <div class="stat-card primary">
                <div class="stat-header">
                    <div class="stat-icon">
                        <i class="fas fa-history"></i>
                    </div>
                </div>
                <div class="stat-value">12</div>
                <div class="stat-label">زيارات سابقة</div>
            </div>
            
            <div class="stat-card">
                <div class="stat-header">
                    <div class="stat-icon">
                        <i class="fas fa-user-nurse"></i>
                    </div>
                </div>
                <div class="stat-value">5</div>
                <div class="stat-label">ممرضين تعاملت معهم</div>
            </div>
            
            <div class="stat-card primary">
                <div class="stat-header">
                    <div class="stat-icon">
                        <i class="fas fa-star"></i>
                    </div>
                </div>
                <div class="stat-value">4.8</div>
                <div class="stat-label">متوسط تقييماتي</div>
            </div>
        </div>

        <!-- Dashboard Grid -->
        <div class="dashboard-grid">
            <!-- Main Column -->
            <div class="main-column">
                <!-- Upcoming Appointments -->
                <div class="appointments-section">
                    <div class="section-header">
                        <h3 class="section-title">
                            <i class="fas fa-clock"></i>
                            المواعيد القادمة
                        </h3>
                        <button class="btn btn-primary btn-sm" onclick="bookNewAppointment()">
                            <i class="fas fa-plus"></i>
                            حجز جديد
                        </button>
                    </div>
                    
                    <div class="appointments-list">
                        <!-- Appointment 1 -->
                        <div class="appointment-item">
                            <div class="appointment-time">غداً 10:00 ص</div>
                            <div class="appointment-details">
                                <div class="nurse-name">
                                    <i class="fas fa-user-nurse"></i>
                                    سارة محمود
                                </div>
                                <div class="service-type">تمريض منزلي - قياس ضغط + حقنة</div>
                                <div class="appointment-location">
                                    <i class="fas fa-map-marker-alt"></i>
                                    مدينة نصر - برج النور
                                </div>
                                <div class="appointment-actions">
                                    <button class="btn btn-outline btn-sm" onclick="viewNurseDetails('sara')">
                                        <i class="fas fa-info-circle"></i>
                                        تفاصيل الممرضة
                                    </button>
                                    <button class="btn btn-outline btn-sm" onclick="rescheduleAppointment('A001')">
                                        <i class="fas fa-calendar-alt"></i>
                                        إعادة جدولة
                                    </button>
                                </div>
                            </div>
                            <div class="appointment-status status-confirmed">
                                <i class="fas fa-check-circle"></i>
                                مؤكد
                            </div>
                        </div>
                        
                        <!-- Appointment 2 -->
                        <div class="appointment-item">
                            <div class="appointment-time">الاثنين 2:00 م</div>
                            <div class="appointment-details">
                                <div class="nurse-name">
                                    <i class="fas fa-user-nurse"></i>
                                    أحمد محمد
                                </div>
                                <div class="service-type">رعاية مسنين - 4 ساعات</div>
                                <div class="appointment-location">
                                    <i class="fas fa-map-marker-alt"></i>
                                    مصر الجديدة - شارع النزهة
                                </div>
                                <div class="appointment-actions">
                                    <button class="btn btn-outline btn-sm" onclick="viewNurseDetails('ahmed')">
                                        <i class="fas fa-info-circle"></i>
                                        تفاصيل الممرض
                                    </button>
                                    <button class="btn btn-outline btn-sm" onclick="cancelAppointment('A002')">
                                        <i class="fas fa-times"></i>
                                        إلغاء
                                    </button>
                                </div>
                            </div>
                            <div class="appointment-status status-pending">
                                <i class="fas fa-clock"></i>
                                في انتظار التأكيد
                            </div>
                        </div>
                        
                        <!-- Appointment 3 (In Progress) -->
                        <div class="appointment-item">
                            <div class="appointment-time">اليوم 4:00 م</div>
                            <div class="appointment-details">
                                <div class="nurse-name">
                                    <i class="fas fa-user-nurse"></i>
                                    فاطمة علي
                                </div>
                                <div class="service-type">تركيب كانيولا + متابعة</div>
                                <div class="appointment-location">
                                    <i class="fas fa-map-marker-alt"></i>
                                    العباسية - المنزل
                                </div>
                                <div class="appointment-actions">
                                    <button class="btn btn-success btn-sm" onclick="trackNurse('A003')">
                                        <i class="fas fa-map-marked-alt"></i>
                                        تتبع الممرضة
                                    </button>
                                    <button class="btn btn-outline btn-sm" onclick="contactNurse('fatima')">
                                        <i class="fas fa-phone"></i>
                                        اتصال
                                    </button>
                                </div>
                            </div>
                            <div class="appointment-status status-in-progress">
                                <i class="fas fa-spinner fa-spin"></i>
                                جاري التنفيذ
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Visit History -->
                <div class="history-section">
                    <h3 class="section-title">
                        <i class="fas fa-history"></i>
                        آخر الزيارات
                    </h3>
                    
                    <div class="history-list">
                        <!-- History Item 1 -->
                        <div class="history-item">
                            <div class="history-date">15 مارس</div>
                            <div class="history-details">
                                <div class="history-service">إعطاء حقنة عضلية</div>
                                <div class="history-nurse">
                                    <i class="fas fa-user-nurse"></i>
                                    سارة محمود
                                </div>
                                <div class="history-rating">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star-half-alt"></i>
                                    4.5
                                </div>
                            </div>
                            <div class="history-price">250 ج.م</div>
                            <button class="btn btn-outline btn-sm" onclick="viewServiceDetails('S001')">
                                <i class="fas fa-eye"></i>
                                عرض
                            </button>
                        </div>
                        
                        <!-- History Item 2 -->
                        <div class="history-item">
                            <div class="history-date">10 مارس</div>
                            <div class="history-details">
                                <div class="history-service">قياس ضغط + سكر</div>
                                <div class="history-nurse">
                                    <i class="fas fa-user-nurse"></i>
                                    أحمد محمد
                                </div>
                                <div class="history-rating">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    5.0
                                </div>
                            </div>
                            <div class="history-price">180 ج.م</div>
                            <button class="btn btn-outline btn-sm" onclick="viewServiceDetails('S002')">
                                <i class="fas fa-eye"></i>
                                عرض
                            </button>
                        </div>
                        
                        <!-- History Item 3 -->
                        <div class="history-item">
                            <div class="history-date">5 مارس</div>
                            <div class="history-details">
                                <div class="history-service">رعاية مسنين (8 ساعات)</div>
                                <div class="history-nurse">
                                    <i class="fas fa-user-nurse"></i>
                                    فاطمة علي
                                </div>
                                <div class="history-rating">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    5.0
                                </div>
                            </div>
                            <div class="history-price">1,200 ج.م</div>
                            <button class="btn btn-outline btn-sm" onclick="viewServiceDetails('S003')">
                                <i class="fas fa-eye"></i>
                                عرض
                            </button>
                        </div>
                    </div>
                    
                    <div style="text-align: center; margin-top: 20px;">
                        <button type="button" class="btn btn-outline" onclick="event.preventDefault(); viewAllHistory();">
                            <i class="fas fa-arrow-left"></i>
                            عرض كل الزيارات
                        </button>
                    </div>
                </div>
            </div>

            <!-- Sidebar -->
            <div class="sidebar">
                <!-- Quick Actions -->
                <div class="sidebar-card">
                    <h3 class="card-title">
                        <i class="fas fa-bolt"></i>
                        إجراءات سريعة
                    </h3>
                    
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <button class="btn btn-primary" onclick="bookNewAppointment()">
                            <i class="fas fa-calendar-plus"></i>
                            حجز خدمة جديدة
                        </button>
                        <button class="btn btn-outline" onclick="findNurse()">
                            <i class="fas fa-search"></i>
                            ابحث عن ممرض
                        </button>
                        <button class="btn btn-outline" onclick="contactSupport()">
                            <i class="fas fa-headset"></i>
                            الدعم الفني
                        </button>
                    </div>
                </div>

                <!-- Favorite Nurses -->
                <div class="sidebar-card">
                    <h3 class="card-title">
                        <i class="fas fa-heart" style="color: var(--danger);"></i>
                        الممرضون المفضلون
                    </h3>
                    
                    <div class="favorite-nurses-list">
                        <!-- Nurse 1 -->
                        <div class="favorite-nurse-item" onclick="viewNurseDetails('sara')">
                            <div class="nurse-avatar-small">س</div>
                            <div class="favorite-nurse-info">
                                <div class="favorite-nurse-name">سارة محمود</div>
                                <div class="favorite-nurse-rating">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    4.9
                                </div>
                            </div>
                            <i class="fas fa-chevron-left" style="color: var(--gray);"></i>
                        </div>
                        
                        <!-- Nurse 2 -->
                        <div class="favorite-nurse-item" onclick="viewNurseDetails('ahmed')">
                            <div class="nurse-avatar-small">أ</div>
                            <div class="favorite-nurse-info">
                                <div class="favorite-nurse-name">أحمد محمد</div>
                                <div class="favorite-nurse-rating">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star-half-alt"></i>
                                    4.7
                                </div>
                            </div>
                            <i class="fas fa-chevron-left" style="color: var(--gray);"></i>
                        </div>
                        
                        <!-- Nurse 3 -->
                        <div class="favorite-nurse-item" onclick="viewNurseDetails('fatima')">
                            <div class="nurse-avatar-small">ف</div>
                            <div class="favorite-nurse-info">
                                <div class="favorite-nurse-name">فاطمة علي</div>
                                <div class="favorite-nurse-rating">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    5.0
                                </div>
                            </div>
                            <i class="fas fa-chevron-left" style="color: var(--gray);"></i>
                        </div>
                    </div>
                </div>

                <!-- Health Tips -->
                <div class="sidebar-card">
                    <h3 class="card-title">
                        <i class="fas fa-lightbulb" style="color: var(--warning);"></i>
                        نصائح صحية
                    </h3>
                    
                    <div class="health-tips">
                        <div class="tip-item">
                            <div class="tip-icon">
                                <i class="fas fa-apple-alt"></i>
                            </div>
                            <div class="tip-content">
                                <div class="tip-title">تناول الطعام الصحي</div>
                                <div class="tip-text">احرص على تناول الخضروات والفواكه يومياً</div>
                            </div>
                        </div>
                        
                        <div class="tip-item">
                            <div class="tip-icon">
                                <i class="fas fa-walking"></i>
                            </div>
                            <div class="tip-content">
                                <div class="tip-title">النشاط البدني</div>
                                <div class="tip-text">المشي 30 دقيقة يومياً يحسن الدورة الدموية</div>
                            </div>
                        </div>
                        
                        <div class="tip-item">
                            <div class="tip-icon">
                                <i class="fas fa-bed"></i>
                            </div>
                            <div class="tip-content">
                                <div class="tip-title">النوم الكافي</div>
                                <div class="tip-text">احصل على 7-8 ساعات نوم يومياً</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Medical Summary -->
                <div class="sidebar-card">
                    <h3 class="card-title">
                        <i class="fas fa-file-medical"></i>
                        الملخص الطبي
                    </h3>
                    
                    <div style="margin-bottom: 15px;">
                        <div style="font-weight: 600; margin-bottom: 5px;">فصيلة الدم</div>
                        <div style="color: var(--primary); font-size: 20px; font-weight: 700;">O+</div>
                    </div>
                    
                    <div style="margin-bottom: 15px;">
                        <div style="font-weight: 600; margin-bottom: 5px;">الحساسية</div>
                        <div style="color: var(--gray);">حساسية بنسلين - حساسية صدرية</div>
                    </div>
                    
                    <div>
                        <div style="font-weight: 600; margin-bottom: 5px;">الأمراض المزمنة</div>
                        <div style="color: var(--gray);">ضغط الدم المرتفع - سكري نوع 2</div>
                    </div>
                    
                    <button type="button" class="btn btn-outline btn-sm" style="width: 100%; margin-top: 15px;" onclick="event.preventDefault(); viewFullMedicalHistory();">
                        <i class="fas fa-arrow-left"></i>
                        عرض الملف الطبي الكامل
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <div class="footer">
        © 2025 Safe Hands. جميع الحقوق محفوظة. | آخر تحديث: 15 مارس 2025
    </div>

    <!-- Universal Modal -->
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
    <script src="../js/dashboard-parient.js"></script>
</body>
</html>