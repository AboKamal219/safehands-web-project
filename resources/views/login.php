<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Safe Hands - تسجيل الدخول</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="icon" href="../images/icon.png">
    <link rel="stylesheet" href="../css/login.css">
</head>
<body>

    <header>
        <div class="container nav-container">
            <div class="logo">
                <a href="../../index.php">
                    <i class="fa-solid fa-hand-holding-medical" style="margin-left: 10px;"></i>
                    Safe Hands
                </a>
            </div>
            <ul class="nav-links">
                <li><a href="../../index.php">الرئيسية</a></li>
                <li><a href="../../index.php">الخدمات</a></li>
                <li><a href="../../index.php">كيف يعمل</a></li>
                <li><a href="../../index.php">اتصل بنا</a></li>
            </ul>
        </div>
    </header>

    <section class="page-header">
        <div class="container">
            <h1>تسجيل الدخول</h1>
            <p>سجل دخولك للوصول إلى حسابك ومتابعة حجوزاتك</p>
        </div>
    </section>

    <main class="container login-section">
        <div class="login-card">
            <form id="loginForm">
                <div class="form-group">
                    <label class="form-label">البريد الإلكتروني</label>
                    <input type="email" class="form-input" placeholder="example@email.com" id="email">
                </div>

                <div class="form-group">
                    <label class="form-label">كلمة المرور</label>
                    <input type="password" class="form-input" placeholder="أدخل كلمة المرور" id="password">
                </div>

                <button type="submit" class="login-btn">تسجيل الدخول</button>

                <div class="register-link">
                    ليس لديك حساب؟ <a href="register-patient.php">سجل الآن</a>
                </div>
            </form>
        </div>
    </main>

    <footer>
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <h2 class="logo" style="color: white; margin-bottom: 15px;">Safe Hands</h2>
                    <p>منصة وساطة للتمريض المنزلي تهدف إلى ربط المرضى المحتاجين للرعاية الصحية مع الممرضين المؤهلين والمعتمدين في مكان واحد.</p>
                    <div class="social-icons">
                        <a href="#" class="social-btn"><i class="fa-brands fa-facebook-f"></i></a>
                        <a href="#" class="social-btn"><i class="fa-brands fa-twitter"></i></a>
                        <a href="#" class="social-btn"><i class="fa-brands fa-instagram"></i></a>
                        <a href="#" class="social-btn"><i class="fa-brands fa-linkedin-in"></i></a>
                    </div>
                </div>

                <div class="footer-col">
                    <h4>روابط سريعة</h4>
                    <ul>
                        <li><a href="../../index.php"><i class="fa-solid fa-angle-left"></i> الرئيسية</a></li>
                        <li><a href="../../index.php"><i class="fa-solid fa-angle-left"></i> الخدمات</a></li>
                        <li><a href="../../index.php"><i class="fa-solid fa-angle-left"></i> كيف يعمل</a></li>
                        <li><a href="../../index.php"><i class="fa-solid fa-angle-left"></i> اتصل بنا</a></li>
                    </ul>
                </div>

                <div class="footer-col">
                    <h4>للممرضين</h4>
                    <ul>
                        <li><a href="register-nurse.php"><i class="fa-solid fa-angle-left"></i> انضم إلينا</a></li>
                    </ul>
                </div>

                <div class="footer-col contact-info">
                    <h4>اتصل بنا</h4>
                    <ul>
                        <li>
                            <div class="contact-info-icon"><i class="fa-solid fa-phone"></i></div>
                            <span>الهاتف<br>+20 123 456 7890</span>
                        </li>
                        <li>
                            <div class="contact-info-icon"><i class="fa-solid fa-envelope"></i></div>
                            <span>البريد الإلكتروني<br>info@SafeHands.com</span>
                        </li>
                        <li>
                            <div class="contact-info-icon"><i class="fa-solid fa-location-dot"></i></div>
                            <span>العنوان<br>أسيوط ، مصر</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="copyright">
                <p>&copy; 2026 Safe Hands. جميع الحقوق محفوظة | تم التصميم والتطوير بواسطة فريق Safe Hands</p>
            </div>
        </div>
    </footer>
    <script src="../js/login.js"></script>
</body>
</html>