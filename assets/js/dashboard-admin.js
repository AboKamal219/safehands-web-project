class DashboardUI {
    constructor() {
        this.currentSection = 'overview';
        this.init();
    }
    init() {
        this.setupNavigation();
        this.setupNotifications();
        this.setupModals();
        this.setupFaqAccordion();
        this.setupForms();
        this.setupSearch();
        this.setupOrderFilter();
    }
    // =============== التنقل بين الأقسام ===============
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link[data-section]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = link.dataset.section;
                // تحديث الشكل
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                // إخفاء جميع الأقسام وإظهار المطلوب
                document.querySelectorAll('.content-section').forEach(section => {
                    section.classList.remove('active');
                });
                const targetSection = document.getElementById(sectionId);
                if (targetSection) {
                    targetSection.classList.add('active');
                    this.currentSection = sectionId;
                    
                    // تحديث عنوان الصفحة
                    this.updatePageTitle(sectionId);
                }
            });
        });
        // معالجة زر تسجيل الخروج
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
                    window.location.href = 'login.html';
                }
            });
        }
        // معالجة "عرض الكل" في الطلبات
        const viewAllOrders = document.getElementById('viewAllOrders');
        if (viewAllOrders) {
            viewAllOrders.addEventListener('click', (e) => {
                e.preventDefault();
                // تفعيل قسم الطلبات
                document.querySelector('[data-section="orders"]').click();
            });
        }
    }
    updatePageTitle(sectionId) {
        const titles = {
            'overview': { main: 'نظرة عامة', sub: 'مرحباً أحمد، هذه نظرة عامة على النظام' },
            'patients': { main: 'المرضى', sub: 'قائمة بجميع المرضى المسجلين' },
            'nurses': { main: 'الممرضون', sub: 'قائمة بجميع الممرضين المتاحين' },
            'orders': { main: 'الطلبات', sub: 'جميع طلبات الخدمة' },
            'reports': { main: 'التقارير', sub: 'تحليلات وإحصائيات النظام' },
            'settings': { main: 'الإعدادات', sub: 'تخصيص إعدادات النظام' },
            'help': { main: 'المساعدة', sub: 'أسئلة شائعة وتواصل مع الدعم' }
        };
            // لتغيير النص في الصفحة
        const titleEl = document.getElementById('pageTitle');
        const subtitleEl = document.getElementById('pageSubtitle');
        
        if (titleEl && titles[sectionId]) {
            titleEl.textContent = titles[sectionId].main;
            subtitleEl.textContent = titles[sectionId].sub;
        }
    }
    // =============== نظام الإشعارات ===============
    setupNotifications() {
        const notificationBtn = document.getElementById('notificationBtn');
        const notificationDropdown = document.getElementById('notificationDropdown');
        const markAllReadBtn = document.getElementById('markAllReadBtn');
        
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
        // تعيين الكل كمقروء
        if (markAllReadBtn) {
            markAllReadBtn.addEventListener('click', () => {
                document.querySelectorAll('.notification-item.unread').forEach(item => {
                    item.classList.remove('unread');
                });
                this.updateNotificationBadge();
            });
        }
        // تحديث عداد الإشعارات عند الضغط على إشعار
        document.addEventListener('click', (e) => {
            const notificationItem = e.target.closest('.notification-item');
            if (notificationItem && notificationItem.classList.contains('unread')) {
                notificationItem.classList.remove('unread');
                this.updateNotificationBadge();
            }
        });
    }
    updateNotificationBadge() {
        const badge = document.getElementById('notificationCount');
        const unreadCount = document.querySelectorAll('.notification-item.unread').length;
        
        if (badge) {
            badge.textContent = unreadCount;
            badge.style.display = unreadCount > 0 ? 'flex' : 'none';
        }
    }
    // =============== إدارة النوافذ المنبثقة ===============
    setupModals() {
        // إغلاق النوافذ
        const closeButtons = document.querySelectorAll('.close-modal');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const modal = btn.closest('.modal');
                if (modal) {
                    modal.style.display = 'none';
                }
            });
        });
        // إغلاق عند الضغط خارج المحتوى
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });
        // إغلاق بالضغط على ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal').forEach(modal => {
                    modal.style.display = 'none';
                });
            }
        });
    }
    // فتح نافذة طلبات الممرض
    showNurseOrders(nurseName, nurseAvatar) {
        const modal = document.getElementById('nurseOrdersModal');
        if (!modal) return;
        // تحديث البيانات
        const avatarEl = document.getElementById('modalNurseAvatar');
        const nameEl = document.getElementById('modalNurseName');
        if (avatarEl) avatarEl.textContent = nurseAvatar || 'م';
        if (nameEl) nameEl.textContent = nurseName || 'الممرض';
        modal.style.display = 'flex';
    }
    // فتح نافذة تفاصيل المريض
    showPatientDetails(patientId) {
        const modal = document.getElementById('patientDetailsModal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }
    // فتح نافذة تفاصيل الممرض
    showNurseDetails(nurseId) {
        const modal = document.getElementById('nurseDetailsModal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }
    // =============== الأسئلة الشائعة ===============
    setupFaqAccordion() {
        const faqContainer = document.getElementById('faqContainer');   
        if (faqContainer) {
            faqContainer.addEventListener('click', (e) => {
                const question = e.target.closest('.faq-question');
                if (question) {
                    const faqItem = question.closest('.faq-item');
                    const answer = faqItem?.querySelector('.faq-answer');
                    const icon = question.querySelector('.faq-icon i');
                    
                    if (answer) {
                        answer.classList.toggle('show');
                        faqItem.classList.toggle('active');
                        
                        // تحديث الأيقونة
                        if (icon) {
                            if (answer.classList.contains('show')) {
                                icon.classList.remove('fa-chevron-down');
                                icon.classList.add('fa-chevron-up');
                            } else {
                                icon.classList.remove('fa-chevron-up');
                                icon.classList.add('fa-chevron-down');
                            }
                        }
                    }
                }
            });
        }
    }
    // =============== النماذج ===============
    setupForms() {
        // نموذج الإعدادات
        const settingsForm = document.getElementById('settingsForm');
        if (settingsForm) {
            settingsForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('تم حفظ الإعدادات بنجاح');
            });
        }
        // أزرار الإضافة
        const addPatientBtn = document.getElementById('addPatientBtn');
        if (addPatientBtn) {
            addPatientBtn.addEventListener('click', () => {
                alert('سيتم توجيهك لصفحة إضافة مريض جديد');
            });
        }
        const addNurseBtn = document.getElementById('addNurseBtn');
        if (addNurseBtn) {
            addNurseBtn.addEventListener('click', () => {
                alert('سيتم توجيهك لصفحة إضافة ممرض جديد');
            });
        }
    }
    // =============== البحث ===============
    setupSearch() {
        const searchInput = document.getElementById('globalSearch');   
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase().trim();
                
                // البحث في الجدول النشط حالياً
                const activeSection = document.querySelector('.content-section.active');
                if (activeSection) {
                    const table = activeSection.querySelector('.data-table');
                    if (table) {
                        this.filterTable(table, searchTerm);
                    }
                }
            });
        }
    }
    filterTable(table, searchTerm) {
        const rows = table.querySelectorAll('tbody tr');
        let hasVisibleRows = false;
        rows.forEach(row => {
            let textContent = '';
            row.querySelectorAll('td').forEach(cell => {
                textContent += cell.textContent.toLowerCase() + ' ';
            });
            
            if (textContent.includes(searchTerm) || searchTerm === '') {
                row.style.display = '';
                hasVisibleRows = true;
            } else {
                row.style.display = 'none';
            }
        });
        // إظهار رسالة إذا لم توجد نتائج
        const tbody = table.querySelector('tbody');
        let noResultsRow = tbody.querySelector('.no-results-row');
        if (!hasVisibleRows && searchTerm !== '') {
            if (!noResultsRow) {
                noResultsRow = document.createElement('tr');
                noResultsRow.className = 'no-results-row';
                noResultsRow.innerHTML = `<td colspan="10" style="text-align: center; padding: 30px; color: var(--gray);">
                    <i class="fas fa-search" style="font-size: 24px; margin-bottom: 10px; display: block;"></i>
                    لا توجد نتائج للبحث "${searchTerm}"
                </td>`;
                tbody.appendChild(noResultsRow);
            }
        } else if (noResultsRow) {
            noResultsRow.remove();
        }
    }
    // =============== فلتر الطلبات ===============
    setupOrderFilter() {
        const filterSelect = document.getElementById('orderFilter');
        if (filterSelect) {
            filterSelect.addEventListener('change', (e) => {
                const filterValue = e.target.value;
                const table = document.querySelector('#orders .data-table');
                if (table) {
                    const rows = table.querySelectorAll('tbody tr');
                    rows.forEach(row => {
                        const statusCell = row.querySelector('td:nth-child(8)'); // عمود الحالة
                        if (statusCell) {
                            const status = statusCell.textContent.trim().toLowerCase();
                            
                            if (filterValue === 'all') {
                                row.style.display = '';
                            } else if (filterValue === 'today') {
                                // فلترة طلبات اليوم - هنا يحتاج لبيانات من الباك
                                row.style.display = '';
                            } else {
                                const statusMap = {
                                    'pending': 'قيد الانتظار',
                                    'completed': 'مكتملة',
                                    'cancelled': 'ملغية'
                                };
                                
                                if (status.includes(statusMap[filterValue] || filterValue)) {
                                    row.style.display = '';
                                } else {
                                    row.style.display = 'none';
                                }
                            }
                        }
                    });
                }
            });
        }
    }
}
// =============== دوال عامة للاستخدام من HTML ===============
function showNurseOrders(nurseName, nurseAvatar) {
    if (window.dashboard) {
        window.dashboard.showNurseOrders(nurseName, nurseAvatar);
    }
}
function showPatientDetails(patientId) {
    if (window.dashboard) {
        window.dashboard.showPatientDetails(patientId);
    }
}
function showNurseDetails(nurseId) {
    if (window.dashboard) {
        window.dashboard.showNurseDetails(nurseId);
    }
}
function editPatientFromModal() {
    alert('فتح نافذة تعديل بيانات المريض');
}
function viewPatientOrders() {
    alert('عرض طلبات المريض');
}
function editNurseFromModal() {
    alert('فتح نافذة تعديل بيانات الممرض');
}
function showNurseOrdersFromModal() {
    const modal = document.getElementById('nurseDetailsModal');
    if (modal) {
        modal.style.display = 'none';
        setTimeout(() => {
            showNurseOrders('الممرض', 'م');
        }, 300);
    }
}
// =============== تشغيل الكود بعد تحميل الصفحة ===============
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new DashboardUI();
});