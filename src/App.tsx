import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, 
  GraduationCap, 
  Phone, 
  Search, 
  Sparkles, 
  User, 
  Video, 
  FileText, 
  MapPin, 
  Star, 
  Calendar, 
  CheckCircle, 
  Menu, 
  X, 
  AlertCircle, 
  School as SchoolIcon, 
  ChevronRight,
  CreditCard,
  ShieldAlert,
  Download,
  Play,
  Check,
  Lock,
  Trophy,
  Award,
  Clock,
  ArrowRight,
  ArrowLeft,
  LockKeyhole,
  Send,
  ExternalLink,
  Bell,
  Languages,
  Wallet,
  Copy,
  Globe,
  Home,
  BarChart3,
  ChevronDown,
  LogOut,
  UserCheck,
  Settings,
  TrendingUp,
  Sun,
  Moon,
  Facebook,
  MessageCircle
} from "lucide-react";
import { GOVERNORATES, EDUCATIONAL_GRADES } from "./data";
import { t } from "./translations";
import { checkAndTriggerUpdates, loadDataStores } from "./utils/dataStores";

function PremiumLogo({ 
  className = "", 
  imgHeightClass = "h-12 sm:h-14 md:h-16 xl:h-18", 
  scaleOnHover = true 
}: { 
  className?: string; 
  imgHeightClass?: string; 
  scaleOnHover?: boolean 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={scaleOnHover ? { 
        scale: 1.12,
      } : undefined}
      transition={{ duration: 0.3 }}
      className={`relative flex items-center justify-center overflow-visible select-none ${className}`}
    >
      <img 
        src="https://lh3.googleusercontent.com/d/1Z4KDLYS5EWd2yz46fJRAk6643yN1h3Ph" 
        alt="Logo" 
        className={`${imgHeightClass} w-auto object-contain filter drop-shadow-[0_2px_12px_rgba(201,161,74,0.4)]`}
        referrerPolicy="no-referrer"
        onError={(e) => {
          (e.target as HTMLElement).style.display = 'none';
          const parent = (e.target as HTMLElement).parentNode;
          const fallback = parent?.querySelector('.fallback-icon');
          if (fallback) fallback.classList.remove('hidden');
        }}
      />
      <GraduationCap className="w-8 h-8 text-[#C9A14A] fallback-icon hidden animate-pulse" />
    </motion.div>
  );
}

const getYoutubeThumbnail = (url: string) => {
  if (!url) return "https://images.unsplash.com/photo-1532187863486-abf9d39d6618?auto=format&fit=crop&q=80&w=600";
  try {
    let videoId = "";
    if (url.includes("/embed/")) {
      videoId = url.split("/embed/")[1]?.split("?")[0] || "";
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0] || "";
    } else if (url.includes("v=")) {
      videoId = url.split("v=")[1]?.split("&")[0] || "";
    }
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
  } catch (e) {
    // fallback
  }
  return "https://images.unsplash.com/photo-1532187863486-abf9d39d6618?auto=format&fit=crop&q=80&w=600";
};

export default function App() {
  const [data, setData] = useState<any>(null);
  const [lang, setLang] = useState<"ar" | "en">("ar");

  const gt = (key: string): string => {
    if (!key) return "";
    if (lang !== "en") return key;
    switch (key) {
      // Hero
      case "منصة الأستاذ محمد حسين للعلوم والكيمياء":
        return "Mr. Mohamed Hussein Platform for Sciences & Chemistry";
      case "مرحبًا بك في المنصة الرسمية لمستر محمد حسين، حيث نقدم تجربة تعليمية متكاملة في العلوم المتكاملة والكيمياء للمرحلة الثانوية، تعتمد على الفهم العميق والتطبيق العملي، من خلال شرح احترافي، تدريبات ذكية، واختبارات تفاعلية تساعدك على تحقيق أعلى الدرجات والتفوق.":
        return "Welcome to the official platform of Mr. Mohamed Hussein, where we offer an integrated learning experience in sciences and chemistry for high school. Grounded in deep understanding and practical application, we provide professional explanations, smart training, and interactive exams to help you achieve the highest grades.";
      case "ابدأ رحلة التفوق الآن":
        return "Start the Journey of Excellence Now";
      
      // Stats labels
      case "طالب مسجل بالمنصة":
        return "Students Registered";
      case "كارت اشتراك فعال":
        return "Active Cards";
      case "مقررات كيمياء وعلوم":
        return "Chemistry & Science Courses";
      case "امتحان الكتروني تم حله":
        return "Exams Solved";
      case "شهادة تفوق مصدرة":
        return "Honor Certificates Issued";
        
      // Teacher
      case "الأستاذ محمد حسين":
        return "Mr. Mohamed Hussein";
      case "العلوم والكيمياء للمرحلة الثانوية":
        return "Sciences & Chemistry for High School";
      case "خبير ومستشار الكيمياء والعلوم للمرحلة الثانوية العامة في إيصال المعلومة العلمية بأساليب التكنولوجيا التفاعلية والخرائط الذهنية وتأهيل آلاف الطلاب لقمم كليات الطب والهندسة.":
        return "Expert and consultant in high school Chemistry and Sciences, delivering scientific knowledge through interactive technology and mind maps, preparing thousands of students for top colleges in Medicine and Engineering.";

      // Plans
      case "اشتراك الكارت الشهري الأساسي":
        return "Basic Monthly Card Subscription";
      case "شهريًا":
        return "Monthly";
      case "150 جنيه":
        return "150 EGP";
      case "يتيح لك الوصول الكامل لجميع محاضرات الشهر الجاري ومذكرات الـ PDF والواجبات الدورية للفئة التعليمية الخاصة بك.":
        return "Provides full access to all lectures of the current month, PDF notebooks, and period assignments for your educational grade.";
      case "اشتراك الترم الكامل الذهبي (شامل الشهادات)":
        return "Golden Full Term Subscription (Including Certificates)";
      case "فصل دراسي كامل":
        return "Full Term";
      case "450 جنيه":
        return "450 EGP";
      case "الاشتراك الأمثل والوفر الذي يغطي كامل منهج الفصل الدراسي الأول للعام مع متابعة شخصية ممتازة لولي الأمر وإصدار شهادات التفوق.":
        return "The most economical and optimal subscription covering the entire first semester curriculum, with excellent parent updates and certificates of excellence.";

      // Grades
      case "الصف الأول الثانوي":
        return "1st Secondary Grade";
      case "الصف الثاني الثانوي":
        return "2nd Secondary Grade";
      case "الصف الثالث الثانوي":
        return "3rd Secondary Grade";
      case "الكل":
        return "All Grades";

      // Courses
      case "منهج الكيمياء - الصف الأول الثانوي (الترم الأول)":
        return "Chemistry Curriculum - First Secondary Grade (Semester 1)";
      case "شرح متكامل لجميع أبواب منهج الكيمياء للصف الأول الثانوي بما يتوافق مع النظام الجديد للوزارة مع خرائط ذهنية وتدريبات مكثفة.":
        return "Comprehensive explanation of all chemistry chapters for 1st secondary grade, fully aligned with the new ministry system, with mind maps and extensive training.";
      case "الكيمياء العضوية - الصف الثالث الثانوي (القسم الذهبي)":
        return "Organic Chemistry - Third Secondary Grade (Golden Section)";
      case "القسم الأهم والأكبر في منهج الكيمياء للثانوية العامة، مبسط بأسلوب شيق ومبني على الفهم وحل الأفكار والأنماط المعقدة.":
        return "The largest and most crucial part of high school chemistry curriculum, simplified elegantly, focusing on deep understanding and complex problem solving.";

      // Lessons
      case "الباب الأول: الكيمياء مركز العلوم (المحاضرة 1)":
        return "Chapter 1: Chemistry is the Center of Sciences (Lecture 1)";
      case "الباب الأول: أدوات القياس النانوية (المحاضرة 2)":
        return "Chapter 1: Nanotechnology Measuring Tools (Lecture 2)";
      case "الكيمياء العضوية: مقدمة الهيدروكربونات والألكانات":
        return "Organic Chemistry: Introduction to Hydrocarbons & Alkanes";

      // Exams
      case "اختبار المحاضرة الأولى: علم الكيمياء وأهميته":
        return "Lecture 1 Exam: Chemistry Science & Importance";
      case "اختبار المحاضرة الثانية: تكنولوجيا النانو والكيمياء":
        return "Lecture 2 Exam: Nanotechnology & Chemistry";
      case "اختبار الألكانات والهيدروكربونات العضوية":
        return "Alkanes & Organic Hydrocarbons Exam";

      // Questions
      case "علم الكيمياء الذي يهتم بدراسة المواد الكيميائية ومكوناتها وتحديد نسبها هو الكيمياء...؟":
        return "The branch of chemistry concerned with studying chemical substances, their components, and determining their ratios is...?";
      case "الكيمياء العضوية":
        return "Organic Chemistry";
      case "الكيمياء التحليلية":
        return "Analytical Chemistry";
      case "الكيمياء الفيزيائية":
        return "Physical Chemistry";
      case "الكيمياء الحيوية":
        return "Biochemistry";
      case "الكيمياء التحليلية هي العلم الذي يهتم بتحديد هوية مكونات المادة ونسبها الكمية.":
        return "Analytical Chemistry is the science concerned with identifying the components of matter and their quantitative ratios.";
      
      case "أي من الأدوات التالية تستخدم بدقة متناهية لنقل وحساب الحجوم المعينة من السوائل؟":
        return "Which of the following tools is used with extreme accuracy to transfer and calculate specific volumes of liquids?";
      case "المخبار المدرج":
        return "Graduated Cylinder";
      case "الكأس الزجاجي":
        return "Glass Beaker";
      case "المصة":
        return "Pipette";
      case "الدورق المستدير":
        return "Round-Bottom Flask";
      case "المصة تستخدم لنقل وقياس حجوم السوائل بدقة متناهية، خاصة السوائل خطرة الاستعمال.":
        return "A pipette is used to transfer and measure liquid volumes with high accuracy, especially hazardous ones.";

      case "تعتبر كرات البوكي من المواد نانوية الأبعاد...؟":
        return "Buckyballs are considered nanostructured materials of dimension...?";
      case "أحادية البعد النانوي":
        return "One-dimensional Nanostructure";
      case "ثنائية البعد النانوي":
        return "Two-dimensional Nanostructure";
      case "ثلاثية البعد النانوي":
        return "Three-dimensional Nanostructure";
      case "عديمة البعد النانوي":
        return "No-dimensional Nanostructure";
      case "كرات البوكي C60 هي مادة نانوية ثلاثية الأبعاد.":
        return "Buckyballs C60 are three-dimensional nanomaterials.";

      case "ما الصيغة العامة للألكانات غير الحلقية؟":
        return "What is the general formula of acyclic alkanes?";
      case "الصيغة العامة للألكانات (البارافينات) المشبعة غير الحلقية هي CnH2n+2.":
        return "The general formula of saturated acyclic alkanes (paraffins) is CnH2n+2.";

      // Notifications
      case "تنويه هام: ميعاد امتحان شهر يوليو الشامل للكيمياء":
        return "Important Announcement: July Comprehensive Chemistry Exam Date";
      case "أعزائي الطلاب، يرجى العلم أنه تم فتح باب التقديم الإلكتروني للامتحان التجريبي الشامل لجميع المجموعات. الامتحان سيغطي الباب الأول بالكامل ويعد شرطًا أساسيًا لدخول حصص الشهر القادم.":
        return "Dear students, please note that registration for the comprehensive practice exam is now open for all groups. The exam covers Chapter 1 entirely and is a prerequisite for next month's classes.";
      case "نزول مذكرات الفصل الثاني (الكيمياء الحركية)":
        return "Release of Chapter 2 Notes (Chemical Kinetics)";
      case "تم رفع المذكرة الكاملة بصيغة PDF عالية الجودة على المنصة لطلاب الصف الثالث الثانوي. يمكنكم تحميلها والبدء بحل التدريبات استعدادًا للمحاضرة القادمة.":
        return "The full booklet in high-quality PDF has been uploaded for Third Secondary Grade. You can download it and start working on the exercises in preparation for the next lecture.";

      default:
        return key;
    }
  };

  const [activeTab, setActiveTab] = useState<"home" | "courses" | "exams" | "register" | "portal">("home");
  const pushedStatesCountRef = React.useRef(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [showSettingsInline, setShowSettingsInline] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  
  // Registration Form State
  const [fullName, setFullName] = useState("");
  const [grade, setGrade] = useState("");
  const [phone, setPhone] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [school, setSchool] = useState("");
  const [governorate, setGovernorate] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [selectedPlanId, setSelectedPlanId] = useState("plan-1");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [registeredCard, setRegisteredCard] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Search/Inquiry Form State (Quick Check)
  const [showInquiry, setShowInquiry] = useState(false);
  const [searchPhone, setSearchPhone] = useState("");
  const [searchResult, setSearchResult] = useState<any>(null);
  const [searchError, setSearchError] = useState("");

  // Vodafone Cash Modal State
  const [showVodafoneModal, setShowVodafoneModal] = useState(false);
  const [copiedVodafone, setCopiedVodafone] = useState(false);

  // Portal State
  const [portalPhone, setPortalPhone] = useState("");
  const [portalPassword, setPortalPassword] = useState("");
  const [loggedInStudent, setLoggedInStudent] = useState<any>(null);
  const [portalError, setPortalError] = useState("");

  // Secure Video Learning Platform states
  const [secureEmbedUrl, setSecureEmbedUrl] = useState("");
  const [secureVideoError, setSecureVideoError] = useState("");
  const [isSecureVideoLoading, setIsSecureVideoLoading] = useState(false);
  const [watermarkPos, setWatermarkPos] = useState({ top: "25%", left: "25%" });

  useEffect(() => {
    if (selectedLesson && loggedInStudent) {
      const interval = setInterval(() => {
        const topRandom = Math.floor(Math.random() * 60) + 20; // 20% to 80%
        const leftRandom = Math.floor(Math.random() * 60) + 20; // 20% to 80%
        setWatermarkPos({ top: `${topRandom}%`, left: `${leftRandom}%` });
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [selectedLesson, loggedInStudent]);

  useEffect(() => {
    if (selectedLesson) {
      setSecureEmbedUrl("");
      setSecureVideoError("");
      
      // Free/First lesson is index 0 fallback
      const lessonIndex = selectedCourse?.lessons?.findIndex((l: any) => l.id === selectedLesson.id);
      const isFreeLesson = lessonIndex === 0;
      
      const hasAccess = (loggedInStudent && loggedInStudent.subscriptionStatus === "active" && !isSubscriptionExpired(loggedInStudent)) || isFreeLesson;
      
      if (hasAccess && loggedInStudent) {
        setIsSecureVideoLoading(true);
        fetch(`/api/lessons/${selectedLesson.id}/video?studentId=${loggedInStudent.id}&studentPhone=${loggedInStudent.phone}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              setSecureEmbedUrl(data.embedUrl);
            } else {
              setSecureVideoError(lang === "ar" ? data.error : "Failed to load secure video link");
            }
          })
          .catch((err) => {
            setSecureVideoError(lang === "ar" ? "خطأ في الاتصال بالسيرفر لتحميل الفيديو الآمن" : "Connection error while loading secure video");
          })
          .finally(() => {
            setIsSecureVideoLoading(false);
          });
      } else if (isFreeLesson && !loggedInStudent) {
        // Allow guest to fetch the preview link for the first lesson
        setIsSecureVideoLoading(true);
        fetch(`/api/lessons/${selectedLesson.id}/video?studentId=guest`)
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              setSecureEmbedUrl(data.embedUrl);
            } else {
              setSecureVideoError(lang === "ar" ? "يرجى تسجيل الدخول بحساب طالب لتفعيل نظام الحماية والمشاهدة الآمنة." : "Please login to watch the lecture safely");
            }
          })
          .catch(() => {
            // fallback construct a standard preview embed if API fails
            let ytId = "";
            const url = selectedLesson.videoUrl || "";
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            const match = url.match(regExp);
            ytId = (match && match[2].length === 11) ? match[2] : "";
            if (ytId) {
              setSecureEmbedUrl(`https://www.youtube.com/embed/${ytId}?autoplay=1&modestbranding=1&rel=0&showinfo=0`);
            } else {
              setSecureVideoError(lang === "ar" ? "يرجى تسجيل الدخول أولاً للمشاهدة" : "Please login first to watch");
            }
          })
          .finally(() => {
            setIsSecureVideoLoading(false);
          });
      }
    } else {
      setSecureEmbedUrl("");
    }
  }, [selectedLesson, loggedInStudent, selectedCourse]);

  // Admin & Student Management State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [loginMode, setLoginMode] = useState<"student" | "admin">("student");
  const [studentSearchQuery, setStudentSearchQuery] = useState("");
  const [studentStatusFilter, setStudentStatusFilter] = useState("all");
  const [studentGradeFilter, setStudentGradeFilter] = useState("all");
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);
  const [formFullName, setFormFullName] = useState("");
  const [formGrade, setFormGrade] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formParentPhone, setFormParentPhone] = useState("");
  const [formSchool, setFormSchool] = useState("");
  const [formGovernorate, setFormGovernorate] = useState("");
  const [formCity, setFormCity] = useState("");
  const [formAddress, setFormAddress] = useState("");
  const [formNotes, setFormNotes] = useState("");
  const [formUsername, setFormUsername] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formSubStart, setFormSubStart] = useState("");
  const [formSubEnd, setFormSubEnd] = useState("");
  const [formSubStatus, setFormSubStatus] = useState("active");
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [showPasswordMap, setShowPasswordMap] = useState<Record<string, boolean>>({});

  const [activeExam, setActiveExam] = useState<any>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [issuedCertificate, setIssuedCertificate] = useState<any>(null);

  const updateSettingsAndData = (updatedFields: { students?: any[]; certificates?: any[]; hero?: any; statistics?: any; notifications?: any }) => {
    if (!data) return;
    const currentSettings = data.settings || {};
    const newSettings = {
      ...currentSettings,
      ...updatedFields
    };
    localStorage.setItem("STORE_SETTINGS", JSON.stringify(newSettings));
    setData((prev: any) => {
      if (!prev) return prev;
      return {
        ...prev,
        settings: newSettings,
        ...updatedFields
      };
    });
  };

  useEffect(() => {
    let updateInterval: NodeJS.Timeout | any;

    const initApp = async () => {
      // 1. Run check for updates. If an update was triggered, it will clear cache, unregister service workers, and hard reload.
      const updateTriggered = await checkAndTriggerUpdates();
      if (updateTriggered) return;

      // 2. Load all modular independent data stores
      const stores = await loadDataStores();

      // Assemble lessons into courses dynamically to match expected UI nested format
      const mappedCourses = stores.courses.map((course: any) => {
        return {
          ...course,
          lessons: stores.lessons.filter((lesson: any) => lesson.courseId === course.id)
        };
      });

      // Extract all exams from courses
      const allExams = stores.courses.flatMap((c: any) => c.exams || []);

      // Assemble unified object for seamless backwards compatibility with existing UI
      const assembledData = {
        hero: stores.settings.hero,
        colors: stores.settings.colors,
        statistics: stores.settings.statistics,
        subscriptionPlans: stores.settings.subscriptionPlans,
        students: stores.settings.students,
        certificates: stores.settings.certificates,
        notifications: stores.settings.notifications,
        settings: stores.settings,
        teachers: stores.teachers,
        reviews: stores.reviews,
        courses: mappedCourses,
        exams: allExams
      };

      setData(assembledData);

      if (mappedCourses.length > 0) {
        setSelectedCourse(mappedCourses[0]);
        if (mappedCourses[0].lessons && mappedCourses[0].lessons.length > 0) {
          setSelectedLesson(mappedCourses[0].lessons[0]);
        }
      }

      // 3. Register periodic background check for updates (every 60 seconds)
      updateInterval = setInterval(async () => {
        try {
          await checkAndTriggerUpdates();
        } catch (err) {
          console.error("Failed periodic background update check:", err);
        }
      }, 60000);
    };

    initApp().catch((err) => {
      console.error("Failed to initialize app stores: ", err);
    });

    return () => {
      if (updateInterval) {
        clearInterval(updateInterval);
      }
    };
  }, []);

  // Lock scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("overflow-hidden");
    };
  }, [mobileMenuOpen]);

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Track state in browser history for perfect Back Button and Browser Back Button behavior
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state) {
        const { tab, courseId, lessonId, examId, settings, inquiry } = event.state;
        if (tab) setActiveTab(tab);
        
        // Restore Course and Lesson
        if (courseId && data?.courses) {
          const foundCourse = data.courses.find((c: any) => c.id === courseId);
          if (foundCourse) {
            setSelectedCourse(foundCourse);
            if (lessonId) {
              const foundLesson = foundCourse.lessons?.find((l: any) => l.id === lessonId);
              if (foundLesson) setSelectedLesson(foundLesson);
            } else {
              setSelectedLesson(null);
            }
          }
        } else {
          setSelectedCourse(null);
          setSelectedLesson(null);
        }

        // Restore Exam
        if (examId && data?.courses) {
          const foundExam = data.courses.flatMap((c: any) => c.exams || []).find((e: any) => e.id === examId);
          if (foundExam) setActiveExam(foundExam);
        } else {
          setActiveExam(null);
        }

        // Settings / Inquiry
        setShowSettingsInline(!!settings);
        setShowInquiry(!!inquiry);
      } else {
        // Default state
        setActiveTab("home");
        setSelectedCourse(null);
        setSelectedLesson(null);
        setActiveExam(null);
        setShowSettingsInline(false);
        setShowInquiry(false);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [data]);

  // Push state to browser history on internal state changes
  useEffect(() => {
    // Avoid double pushing or pushing initial empty state unnecessarily
    const currentState = {
      tab: activeTab,
      courseId: selectedCourse?.id || null,
      lessonId: selectedLesson?.id || null,
      examId: activeExam?.id || null,
      settings: showSettingsInline,
      inquiry: showInquiry
    };

    const stateStr = JSON.stringify(currentState);
    const lastPushed = sessionStorage.getItem("LAST_PUSHED_STATE");
    
    if (stateStr !== lastPushed) {
      sessionStorage.setItem("LAST_PUSHED_STATE", stateStr);
      window.history.pushState(currentState, "");
      if (lastPushed !== null) {
        pushedStatesCountRef.current += 1;
      }
    }
  }, [activeTab, selectedCourse?.id, selectedLesson?.id, activeExam?.id, showSettingsInline, showInquiry]);

  // Smooth scroll to top of viewport on navigation transitions
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab, selectedCourse?.id, selectedLesson?.id, activeExam?.id, showSettingsInline, showInquiry]);

  // Automatically reset nested views when clicking back to Home
  useEffect(() => {
    if (activeTab === "home") {
      setSelectedCourse(null);
      setSelectedLesson(null);
      setActiveExam(null);
      setShowSettingsInline(false);
      setShowInquiry(false);
    }
  }, [activeTab]);

  const handleBack = () => {
    if (activeExam && !quizCompleted) {
      if (!confirm(lang === "ar" ? "هل أنت متأكد من رغبتك في الخروج من الامتحان الحالي؟ لن يتم حفظ إجاباتك." : "Are you sure you want to leave the current exam? Your progress won't be saved.")) {
        return;
      }
    }

    if (pushedStatesCountRef.current > 0) {
      pushedStatesCountRef.current = Math.max(0, pushedStatesCountRef.current - 1);
      window.history.back();
    } else {
      // Fallback
      if (showSettingsInline) {
        setShowSettingsInline(false);
      } else if (showInquiry) {
        setShowInquiry(false);
      } else if (selectedLesson) {
        setSelectedLesson(null);
      } else if (selectedCourse) {
        setSelectedCourse(null);
      } else if (activeExam) {
        setActiveExam(null);
        setQuizCompleted(false);
        setQuizScore(null);
      } else {
        setActiveTab("home");
      }
    }
  };

  const getBackText = (): string => {
    if (showSettingsInline) return lang === "ar" ? "إغلاق الإعدادات" : "Close Settings";
    if (showInquiry) return lang === "ar" ? "إغلاق الاستعلام" : "Close Inquiry";
    if (activeTab === "courses") {
      if (selectedLesson) return lang === "ar" ? "الرجوع للمحاضرات" : "Back to Lectures";
      if (selectedCourse) return lang === "ar" ? "الرجوع للمقررات" : "Back to Courses";
      return lang === "ar" ? "الرجوع للرئيسية" : "Back to Home";
    }
    if (activeTab === "exams") {
      if (activeExam) return lang === "ar" ? "الرجوع للامتحانات" : "Back to Exams";
      return lang === "ar" ? "الرجوع للرئيسية" : "Back to Home";
    }
    if (activeTab === "portal") {
      return lang === "ar" ? "الرجوع للرئيسية" : "Back to Home";
    }
    if (activeTab === "register") {
      return lang === "ar" ? "الرجوع للرئيسية" : "Back to Home";
    }
    return lang === "ar" ? "رجوع" : "Back";
  };

  const isInternalPage = 
    activeTab !== "home" || 
    selectedCourse !== null || 
    selectedLesson !== null || 
    activeExam !== null || 
    showSettingsInline || 
    showInquiry;

  const validateField = (field: string, value: string) => {
    let errorMsg = "";
    const trimmed = value.trim();

    if (field === "fullName") {
      if (!trimmed) {
        errorMsg = "الاسم رباعي مطلوب لتسجيل الكارت.";
      } else {
        const parts = trimmed.split(/\s+/).filter(Boolean);
        if (parts.length < 4) {
          errorMsg = `يرجى كتابة الاسم رباعي كاملاً. لقد أدخلت (${parts.length}) أسماء فقط، متبقي لك (${4 - parts.length}) أسماء ليكون الاسم رسميًا في الشهادات والبطاقات.`;
        }
      }
    } else if (field === "phone") {
      const cleanPhone = value.replace(/\D/g, "");
      if (!cleanPhone) {
        errorMsg = "رقم الهاتف الأساسي مطلوب لتأكيد الحجز.";
      } else if (!/^01[0125][0-9]{8}$/.test(cleanPhone)) {
        errorMsg = "رقم المحمول غير صحيح. يجب أن يكون رقمًا مصريًا مكونًا من 11 رقمًا يبدأ بـ (010, 011, 012, 015).";
      }
    } else if (field === "parentPhone") {
      // Disabled validation
    } else if (field === "school") {
      if (!trimmed) errorMsg = "اسم المدرسة مطلوب للتوثيق.";
    } else if (field === "governorate") {
      if (!value) errorMsg = "يرجى اختيار المحافظة.";
    } else if (field === "city") {
      if (!value) errorMsg = "يرجى تحديد المركز أو المدينة.";
    } else if (field === "address") {
      if (!trimmed) errorMsg = "العنوان بالتفصيل مطلوب.";
    } else if (field === "grade") {
      if (!value) errorMsg = "يرجى اختيار الصف الدراسي.";
    }

    setErrors((prev) => {
      const updated = { ...prev };
      if (errorMsg) updated[field] = errorMsg;
      else delete updated[field];
      return updated;
    });

    return !errorMsg;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const fields = ["fullName", "grade", "phone", "school", "governorate", "city"];
    let isValid = true;

    // Trigger validation for all fields
    if (!validateField("fullName", fullName)) isValid = false;
    if (!validateField("grade", grade)) isValid = false;
    if (!validateField("phone", phone)) isValid = false;
    if (!validateField("school", school)) isValid = false;
    if (!validateField("governorate", governorate)) isValid = false;
    if (!validateField("city", city)) isValid = false;

    if (!isValid) return;

    setIsSubmitting(true);

    const newStudent = {
      id: "STU-" + Math.floor(100000 + Math.random() * 900000),
      fullName,
      grade,
      phone,
      parentPhone,
      school,
      governorate,
      city,
      address,
      notes,
      subscriptionStatus: "inactive", // Starts as inactive so that the admin can review, activate, and generate credentials
      examScores: [],
      certificates: [],
      createdAt: new Date().toISOString()
    };

    // Simulate server response delay for high-fidelity UI loading state
    setTimeout(() => {
      if (data) {
        const updatedStudents = [newStudent, ...(data.students || [])];
        updateSettingsAndData({ students: updatedStudents });
      }
      setRegisteredCard(newStudent);
      setIsSubmitting(false);
    }, 800);
  };

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError("");
    setSearchResult(null);

    const clean = searchPhone.replace(/\D/g, "");
    if (!clean) {
      setSearchError("يرجى إدخال رقم الهاتف المسجل.");
      return;
    }

    if (data && data.students) {
      const found = data.students.find(
        (s: any) => s.phone.replace(/\D/g, "") === clean || s.parentPhone.replace(/\D/g, "") === clean
      );
      if (found) {
        setSearchResult(found);
      } else {
        setSearchError("عذرًا، لم يتم العثور على أي حجز مسجل بهذا الرقم. يرجى التأكد من الرقم أو إعادة التسجيل.");
      }
    } else {
      setSearchError("جاري الاتصال بقاعدة البيانات...");
    }
  };

  const getStudentAccessState = (student: any) => {
    if (!student) return { hasAccess: false, reason: "not-logged-in" };
    if (student.subscriptionStatus === "suspended") {
      return { hasAccess: false, reason: "suspended" };
    }
    
    if (student.subscriptionEnd) {
      const endDate = new Date(student.subscriptionEnd);
      if (!isNaN(endDate.getTime())) {
        const endDateTime = new Date(endDate);
        endDateTime.setHours(23, 59, 59, 999);
        if (endDateTime.getTime() < Date.now()) {
          return { hasAccess: false, reason: "expired" };
        }
      }
    }
    
    if (student.subscriptionStatus !== "active") {
      return { hasAccess: false, reason: "expired" };
    }
    
    return { hasAccess: true, reason: "active" };
  };

  const isSubscriptionExpired = (student: any) => {
    if (!student) return true;
    const access = getStudentAccessState(student);
    return !access.hasAccess;
  };

  const renderGatedScreen = (sectionNameAr: string) => {
    const access = getStudentAccessState(loggedInStudent);
    const reason = access.reason;
    
    let title = "";
    let description = "";
    let icon = null;
    let buttonText = "";
    let buttonLink = "";
    let secondaryButtonText = "";
    let onSecondaryClick = () => {};

    if (reason === "not-logged-in") {
      title = lang === "ar" ? "المحتوى مغلق ومحمي بالكامل 🔒" : "Content is Locked & Secured 🔒";
      description = lang === "ar" 
        ? `عذراً، لا يمكنك تصفح قسم (${sectionNameAr}) دون تسجيل الدخول. يرجى تسجيل الدخول بحساب الطالب الفعال الخاص بك لمتابعة المحتوى.`
        : `Sorry, you cannot view the (${sectionNameAr}) section without logging in. Please login to your active student account.`;
      icon = <LockKeyhole className="w-14 h-14 text-[#C9A14A] animate-pulse" />;
      buttonText = lang === "ar" ? "بوابة تسجيل دخول الطلاب 🔑" : "Go to Student Login Portal 🔑";
      buttonLink = "portal"; // Special action to set active tab to portal
      secondaryButtonText = lang === "ar" ? "تواصل مع الإدارة للاشتراك 💬" : "Contact Admin to Subscribe 💬";
      onSecondaryClick = () => {
        window.open(`https://wa.me/${data?.settings?.hero?.whatsapp || "201001944136"}?text=${encodeURIComponent("مرحباً مستر محمد حسين، أرغب في الاشتراك بالمنصة وتفعيل حسابي التعليمي.")}`, "_blank");
      };
    } else if (reason === "suspended") {
      title = lang === "ar" ? "تم إيقاف حسابك مؤقتاً 🚫" : "Account Suspended 🚫";
      description = lang === "ar"
        ? "لقد تم إيقاف حسابك من قبل إدارة المنصة لمخالفة شروط الاستخدام. يرجى التواصل فوراً مع الدعم الفني لحل المشكلة وإعادة تفعيل الحساب."
        : "Your account has been temporarily suspended by the administration. Please contact support immediately to reactivate your account.";
      icon = <ShieldAlert className="w-14 h-14 text-red-500 animate-bounce" />;
      buttonText = lang === "ar" ? "تواصل مع الدعم الفني 📞" : "Contact Technical Support 📞";
      buttonLink = `https://wa.me/${data?.settings?.hero?.whatsapp || "201001944136"}?text=${encodeURIComponent("مرحباً، تم إيقاف حسابي التعليمي على منصة مستر محمد حسين وأرغب في معرفة التفاصيل وإعادة التفعيل. رقم هاتف حسابي: " + (loggedInStudent?.phone || ""))}`;
    } else {
      // Expired
      title = lang === "ar" ? "انتهت مدة اشتراكك بالمنصة ⚠️" : "Subscription Expired ⚠️";
      description = lang === "ar"
        ? "انتهت مدة اشتراكك، برجاء تجديد الاشتراك لمواصلة استخدام المنصة والاستمتاع بجميع الشروحات والملخصات والامتحانات."
        : "Your subscription has expired. Please renew your subscription to continue using the platform and access all content.";
      icon = <Lock className="w-14 h-14 text-amber-500 animate-pulse" />;
      buttonText = lang === "ar" ? "تجديد الاشتراك الآن 💳" : "Renew Subscription Now 💳";
      buttonLink = `https://wa.me/${data?.settings?.hero?.whatsapp || "201001944136"}?text=${encodeURIComponent("مرحباً مستر محمد حسين، انتهت صلاحية اشتراكي في المنصة وأرغب في تجديد الاشتراك وتفعيل حسابي. رقم هاتفي المسجل: " + (loggedInStudent?.phone || ""))}`;
    }

    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="glass-panel-gold p-8 sm:p-12 rounded-3xl flex flex-col items-center gap-6 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#C9A14A]/40 via-[#C9A14A] to-[#C9A14A]/40"></div>
          
          <div className="p-4 bg-[#1E293B]/60 rounded-full border border-[#C9A14A]/25 shadow-inner">
            {icon}
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
            {title}
          </h2>

          <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed max-w-md">
            {description}
          </p>

          <div className="w-full flex flex-col gap-3 mt-4">
            {buttonLink === "portal" ? (
              <button
                onClick={() => {
                  setLoginMode("student");
                  setActiveTab("portal");
                }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#C9A14A] to-[#E3BE67] text-slate-950 font-black text-xs sm:text-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-[#C9A14A]/20 cursor-pointer"
              >
                {buttonText}
              </button>
            ) : (
              <a
                href={buttonLink}
                target="_blank"
                referrerPolicy="no-referrer"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#C9A14A] to-[#E3BE67] text-slate-950 font-black text-xs sm:text-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-[#C9A14A]/20 cursor-pointer flex items-center justify-center gap-2"
              >
                {buttonText}
              </a>
            )}

            {secondaryButtonText && (
              <button
                onClick={onSecondaryClick}
                className="w-full py-3.5 rounded-xl bg-[#1E293B]/80 hover:bg-[#1E293B] border border-[#C9A14A]/30 text-[#C9A14A] hover:text-white hover:border-[#C9A14A] font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer"
              >
                {secondaryButtonText}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    );
  };

  const handlePortalLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setPortalError("");
    setLoggedInStudent(null);
    setIsAdminLoggedIn(false);

    const identifier = portalPhone.trim(); // Username or Phone
    const password = portalPassword.trim();

    if (!identifier) {
      setPortalError(lang === "ar" ? "يرجى إدخال اسم المستخدم لتسجيل الدخول." : "Please enter your username to login.");
      return;
    }
    if (!password) {
      setPortalError(lang === "ar" ? "يرجى إدخال كلمة المرور." : "Please enter your password.");
      return;
    }

    if (loginMode === "admin") {
      if (identifier === "admin" && (password === "admin" || password === "admin1030" || password === "admin123")) {
        setIsAdminLoggedIn(true);
        setActiveTab("portal");
        // Clear login form
        setPortalPhone("");
        setPortalPassword("");
      } else {
        setPortalError(lang === "ar" ? "بيانات دخول الإدارة غير صحيحة. يرجى المحاولة مرة أخرى." : "Invalid Admin credentials. Please try again.");
      }
      return;
    }

    if (data && data.students) {
      // Find by username OR phone
      const found = data.students.find((s: any) => {
        const matchUser = s.username && s.username.toLowerCase() === identifier.toLowerCase();
        const cleanPhone = s.phone ? s.phone.replace(/\D/g, "") : "";
        const cleanInput = identifier.replace(/\D/g, "");
        const matchPhone = cleanInput && cleanPhone === cleanInput;
        return matchUser || matchPhone;
      });

      if (found) {
        if (found.password && found.password !== password) {
          setPortalError(lang === "ar" ? "كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى." : "Incorrect password. Please try again.");
          return;
        }

        const access = getStudentAccessState(found);
        if (!access.hasAccess) {
          if (access.reason === "suspended") {
            setPortalError(
              lang === "ar"
                ? "🚫 عذراً، لقد تم إيقاف حسابك مؤقتاً! يرجى التواصل مع الدعم الفني للاستفسار وحل المشكلة."
                : "🚫 Sorry, your account is temporarily suspended! Please contact support to resolve the issue."
            );
          } else {
            setPortalError(
              lang === "ar"
                ? "🚫 عذراً، لقد انتهت صلاحية اشتراكك! يرجى التواصل مع السكرتارية أو مستر محمد حسين لتجديد الاشتراك وتفعيل حسابك."
                : "🚫 Sorry, your subscription has expired! Please contact the assistants or Mr. Mohamed Hussein to renew and reactivate your account."
            );
          }
          return;
        }

        setLoggedInStudent(found);
      } else {
        setPortalError(
          lang === "ar"
            ? "عذراً، اسم المستخدم أو رقم الهاتف هذا غير مسجل لدينا. يرجى مراجعة بيانات الدخول المسلمة لك من السكرتارية."
            : "Sorry, this username or phone number is not registered. Please check the credentials provided to you by the assistants."
        );
      }
    } else {
      setPortalError(lang === "ar" ? "جاري تحميل البيانات من الخادم المساعد..." : "Loading assistant server data...");
    }
  };

  const startQuiz = (examId: string) => {
    if (!data || !data.exams) return;
    const exam = data.exams.find((ex: any) => ex.id === examId);
    if (exam) {
      setActiveExam(exam);
      setSelectedAnswers({});
      setQuizScore(null);
      setQuizCompleted(false);
      setShowExplanation(false);
      setIssuedCertificate(null);
      setActiveTab("exams");
    }
  };

  const submitQuiz = () => {
    if (!activeExam) return;
    let correctCount = 0;
    activeExam.questions.forEach((q: any) => {
      if (selectedAnswers[q.id] === q.correctOptionIndex) {
        correctCount++;
      }
    });

    const percent = Math.round((correctCount / activeExam.questions.length) * 100);
    setQuizScore(percent);
    setQuizCompleted(true);

    // Save exam score if student is logged in
    if (loggedInStudent) {
      const scoreObj = {
        examId: activeExam.id,
        score: percent,
        maxScore: 100,
        date: new Date().toISOString()
      };
      
      const updatedScores = [...(loggedInStudent.examScores || [])];
      // Check if already taken, update it
      const existingIdx = updatedScores.findIndex(s => s.examId === activeExam.id);
      if (existingIdx > -1) {
        updatedScores[existingIdx] = scoreObj;
      } else {
        updatedScores.push(scoreObj);
      }

      // Issue Certificate if passed!
      let newCert = null;
      let updatedCertsList = [...(loggedInStudent.certificates || [])];
      const passScore = activeExam.passingScore || 80;
      if (percent >= passScore) {
        const certId = "CERT-" + Math.floor(1000 + Math.random() * 9000);
        newCert = {
          id: certId,
          studentId: loggedInStudent.id,
          studentName: loggedInStudent.fullName,
          courseTitle: activeExam.title,
          gradeScore: percent === 100 ? "امتياز مع مرتبة الشرف 100%" : `ممتاز بنسبة ${percent}%`,
          issueDate: new Date().toLocaleDateString("en-US")
        };
        setIssuedCertificate(newCert);

        // Add certificate code to student list
        if (!updatedCertsList.includes(certId)) {
          updatedCertsList.push(certId);
        }
      }

      // Update student state immutably
      const updatedStudentObj = {
        ...loggedInStudent,
        examScores: updatedScores,
        certificates: updatedCertsList
      };
      setLoggedInStudent(updatedStudentObj);

      const updatedStudents = data.students.map((s: any) => s.id === loggedInStudent.id ? updatedStudentObj : s);
      const updatedCerts = newCert ? [newCert, ...(data.certificates || [])] : (data.certificates || []);
      
      updateSettingsAndData({
        students: updatedStudents,
        certificates: updatedCerts
      });
    } else {
      // Simulate certificate generation for guest as well so they can enjoy the feature!
      const passScore = activeExam.passingScore || 80;
      if (percent >= passScore) {
        const guestName = fullName || "الطالب المجتهد";
        const certId = "CERT-" + Math.floor(1000 + Math.random() * 9000);
        const guestCert = {
          id: certId,
          studentId: "GUEST-TEMP",
          studentName: guestName,
          courseTitle: activeExam.title,
          gradeScore: percent === 100 ? "امتياز مع مرتبة الشرف 100%" : `ممتاز بنسبة ${percent}%`,
          issueDate: new Date().toLocaleDateString("en-US")
        };
        setIssuedCertificate(guestCert);
      }
    }
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center text-white" dir={lang === "ar" ? "rtl" : "ltr"}>
        <div className="relative flex flex-col items-center">
          {/* Outer glowing pulsing orb */}
          <div className="absolute -inset-6 rounded-full bg-brand-gold/10 blur-2xl animate-pulse"></div>
          
          {/* Main logo container */}
          <PremiumLogo imgHeightClass="h-16 md:h-20" className="scale-110 md:scale-125" scaleOnHover={false} />
          
          {/* Spinner and Status text */}
          <div className="mt-8 flex flex-col items-center space-y-3">
            <div className="w-10 h-10 rounded-full border-2 border-brand-gold/20 border-t-brand-gold animate-spin"></div>
            <p className="text-sm font-black text-white tracking-wide animate-pulse">
              {lang === "ar" ? "جاري تحميل منصة الأستاذ محمد حسين التعليمية..." : "Loading Mr. Mohamed Hussein's Educational Platform..."}
            </p>
            <span className="text-[10px] text-brand-gold font-bold uppercase tracking-widest">
              {lang === "ar" ? "العلوم المتكاملة • جودة وتفوق علمي مضمون" : "Integrated Sciences • Guaranteed Academic Excellence"}
            </span>
          </div>
        </div>
      </div>
    );
  }

  const primaryColor = "#081C3A";
  const secondaryColor = "#0D4EA6";
  const accentColor = "#1D9BF0";
  const goldColor = "#D6A646";

  return (
    <div className={`min-h-screen flex flex-col justify-between font-sans relative bg-brand-dark overflow-x-hidden ${lang === "ar" ? "text-right" : "text-left"}`} dir={lang === "ar" ? "rtl" : "ltr"}>
      {/* Dynamic Scientific floating elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-25 select-none">
        {/* Molecule 1 */}
        <div className="absolute top-[12%] left-[8%] animate-float text-brand-electric">
          <svg width="50" height="50" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="50" cy="50" r="10" />
            <circle cx="20" cy="20" r="6" />
            <circle cx="80" cy="20" r="6" />
            <circle cx="50" cy="85" r="8" />
            <line x1="50" y1="40" x2="20" y2="20" />
            <line x1="50" y1="40" x2="80" y2="20" />
            <line x1="50" y1="60" x2="50" y2="77" />
          </svg>
        </div>
        {/* Atom 1 */}
        <div className="absolute top-[35%] right-[6%] animate-spin-slow text-brand-gold">
          <svg width="70" height="70" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="50" cy="50" r="8" fill="currentColor" />
            <ellipse cx="50" cy="50" rx="35" ry="12" transform="rotate(30 50 50)" />
            <ellipse cx="50" cy="50" rx="35" ry="12" transform="rotate(90 50 50)" />
            <ellipse cx="50" cy="50" rx="35" ry="12" transform="rotate(150 50 50)" />
          </svg>
        </div>
        {/* Molecule 2 */}
        <div className="absolute bottom-[20%] left-[5%] animate-float-delayed text-brand-royal">
          <svg width="45" height="45" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="30" cy="30" r="8" />
            <circle cx="70" cy="30" r="8" />
            <circle cx="50" cy="70" r="10" />
            <line x1="38" y1="30" x2="62" y2="30" />
            <line x1="30" y1="38" x2="45" y2="62" />
            <line x1="70" y1="38" x2="55" y2="62" />
          </svg>
        </div>
        {/* Equation 1 */}
        <div className="absolute top-[22%] right-[25%] animate-float text-xs font-mono text-brand-electric opacity-30 select-none">
          ΔG = ΔH - TΔS
        </div>
        <div className="absolute bottom-[35%] right-[20%] animate-float-delayed text-xs font-mono text-brand-gold opacity-30 select-none">
          E = mc²
        </div>
        <div className="absolute bottom-[10%] right-[40%] animate-float text-xs font-mono text-brand-electric opacity-25 select-none">
          H₂O + CO₂ → C₆H₁₂O₆ + O₂
        </div>
        {/* Molecular Grid background */}
        <div className="absolute inset-0 science-grid opacity-[0.45]"></div>
      </div>

      {/* HEADER & NAV */}
      <header className={`fixed top-0 left-0 right-0 z-[1000] h-[88px] bg-[#08111F]/95 backdrop-blur-md border-b border-[#C9A14A]/25 shadow-[0_4px_30px_rgba(8,24,48,0.65)] ${lang === "ar" ? "font-['Cairo']" : "font-['Poppins']"} flex flex-col justify-center`}>
        {/* DESKTOP HEADER (Hidden on mobile, visible on md:flex) */}
        <div className="hidden md:flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full items-center justify-between relative z-10 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3.5 cursor-pointer group shrink-0" onClick={() => { setActiveTab("home"); setMobileMenuOpen(false); }}>
            <PremiumLogo scaleOnHover={true} />
            <div className="space-y-0.5">
              <h1 className="text-sm md:text-base font-black text-white tracking-tight flex items-center gap-1">
                {lang === "ar" ? t.ar.brand : t.en.brand}
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C9A14A] animate-ping"></span>
              </h1>
              <p className="text-[10px] text-[#C9A14A] font-bold tracking-widest uppercase">{lang === "ar" ? t.ar.subBrand : t.en.subBrand}</p>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="flex items-center gap-1 bg-[#0F172A]/50 border border-[#C9A14A]/15 rounded-full px-1.5 py-1 backdrop-blur-md">
            {/* 🏠 الرئيسية */}
            <button 
              onClick={() => { setActiveTab("home"); setMobileMenuOpen(false); }}
              className={`px-4 py-2 rounded-full text-[12px] font-bold flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${
                activeTab === "home" 
                  ? "bg-[#C9A14A] text-[#08111F] shadow-md shadow-[#C9A14A]/20 scale-102 font-black" 
                  : "text-[#CBD5E1] hover:text-white hover:bg-[#1E293B]/60"
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>{lang === "ar" ? "الرئيسية" : "Home"}</span>
            </button>

            {/* 🎥 المحاضرات */}
            <button 
              onClick={() => { setActiveTab("courses"); setMobileMenuOpen(false); }}
              className={`px-4 py-2 rounded-full text-[12px] font-bold flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${
                activeTab === "courses" 
                  ? "bg-[#C9A14A] text-[#08111F] shadow-md shadow-[#C9A14A]/20 scale-102 font-black" 
                  : "text-[#CBD5E1] hover:text-white hover:bg-[#1E293B]/60"
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>{lang === "ar" ? "المحاضرات" : "Lectures"}</span>
            </button>

            {/* 📝 الاختبارات */}
            <button 
              onClick={() => { setActiveTab("exams"); setMobileMenuOpen(false); }}
              className={`px-4 py-2 rounded-full text-[12px] font-bold flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${
                activeTab === "exams" 
                  ? "bg-[#C9A14A] text-[#08111F] shadow-md shadow-[#C9A14A]/20 scale-102 font-black" 
                  : "text-[#CBD5E1] hover:text-white hover:bg-[#1E293B]/60"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{lang === "ar" ? "الاختبارات" : "Exams"}</span>
            </button>

            {/* 📊 النتائج */}
            <button 
              onClick={() => { setShowInquiry(true); setMobileMenuOpen(false); }}
              className="px-4 py-2 rounded-full text-[12px] font-bold flex items-center gap-1.5 transition-all duration-300 cursor-pointer text-[#CBD5E1] hover:text-white hover:bg-[#1E293B]/60"
            >
              <TrendingUp className="w-3.5 h-3.5 text-[#C9A14A]" />
              <span>{lang === "ar" ? "النتائج" : "Results"}</span>
            </button>
          </nav>

          {/* User Controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Search */}
            <button 
              onClick={() => setShowInquiry(true)}
              className="p-2.5 rounded-full bg-[#0F172A]/80 border border-[#C9A14A]/15 text-[#CBD5E1] hover:text-white hover:bg-[#1E293B] hover:border-[#C9A14A] transition-all duration-300 cursor-pointer hover:scale-105"
              title={lang === "ar" ? "بحث واستعلام" : "Search"}
            >
              <Search className="w-4 h-4 text-[#C9A14A]" />
            </button>

            {/* Language Switch */}
            <button 
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              className="px-3.5 py-2.5 rounded-full border border-[#C9A14A]/25 bg-[#0F172A]/40 text-[11px] font-black text-[#CBD5E1] hover:text-white hover:bg-[#C9A14A]/15 flex items-center gap-1.5 transition-all duration-300 cursor-pointer shadow-[0_0_12px_rgba(201,161,74,0.08)]"
            >
              <Languages className="w-3.5 h-3.5 text-[#C9A14A]" />
              <span>{lang === "ar" ? "English" : "العربية"}</span>
            </button>

            {/* Student Account state */}
            {loggedInStudent ? (
              <div className="relative">
                <button 
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="px-4 py-2 rounded-full bg-[#1E293B]/90 border border-[#C9A14A]/40 text-[12px] font-bold text-white flex items-center gap-2.5 hover:bg-[#1E293B] hover:border-[#C9A14A] transition-all duration-300 cursor-pointer"
                >
                  <div className="w-5 h-5 rounded-full bg-[#C9A14A] text-[#08111F] flex items-center justify-center font-black text-[10px]">
                    {loggedInStudent.fullName?.trim().substring(0, 1).toUpperCase() || "S"}
                  </div>
                  <span className="max-w-[110px] truncate">{loggedInStudent.fullName?.split(" ")[0]}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-[#C9A14A] transition-transform duration-300 ${userMenuOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)}></div>
                      <motion.div 
                        initial={{ opacity: 0, y: 12, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute z-20 mt-2 w-60 bg-[#0F172A]/95 border border-[#C9A14A]/30 rounded-2xl p-4 shadow-2xl space-y-3 backdrop-blur-md ${
                          lang === "ar" ? "left-0 text-right" : "right-0 text-left"
                        }`}
                      >
                        <div className={`border-b border-[#C9A14A]/15 pb-2.5 ${lang === "ar" ? "text-right" : "text-left"}`}>
                          <p className="text-[10px] text-[#C9A14A] font-bold uppercase tracking-wider">{lang === "ar" ? "حساب الطالب التعليمي" : "Student Account"}</p>
                          <h4 className="text-xs font-black text-white truncate mt-0.5">{loggedInStudent.fullName}</h4>
                          <span className="inline-block mt-1 text-[9px] bg-[#C9A14A]/15 text-[#C9A14A] border border-[#C9A14A]/30 px-2 py-0.5 rounded-full font-bold">
                            {loggedInStudent.grade}
                          </span>
                        </div>
                        <button 
                          onClick={() => { setActiveTab("portal"); setUserMenuOpen(false); }}
                          className={`w-full px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-white hover:bg-[#1E293B]/80 flex items-center justify-between transition-colors cursor-pointer ${
                            lang === "ar" ? "flex-row-reverse" : ""
                          }`}
                        >
                          <span>{lang === "ar" ? "لوحة التحكم والدراسة" : "Dashboard Portal"}</span>
                          <UserCheck className="w-3.5 h-3.5 text-[#C9A14A]" />
                        </button>
                        <button 
                          onClick={() => { setLoggedInStudent(null); setActiveTab("home"); setUserMenuOpen(false); }}
                          className={`w-full px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 flex items-center justify-between transition-colors cursor-pointer border border-transparent hover:border-rose-500/20 ${
                            lang === "ar" ? "flex-row-reverse" : ""
                          }`}
                        >
                          <span>{lang === "ar" ? "تسجيل الخروج" : "Log Out"}</span>
                          <LogOut className="w-3.5 h-3.5 text-rose-400" />
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={() => { setActiveTab("portal"); setMobileMenuOpen(false); }}
                  className={`px-4 py-2.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${
                    activeTab === "portal" 
                      ? "bg-[#C9A14A] text-[#08111F] shadow-md shadow-[#C9A14A]/20 font-black scale-102" 
                      : "text-[#CBD5E1] hover:text-white hover:bg-[#1E293B]/60"
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{lang === "ar" ? "بوابة الطالب" : "Student Portal"}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* REDESIGNED MOBILE HEADER - RESPONSIVE & SPACIOUS */}
        <div className="flex md:hidden max-w-7xl mx-auto px-4 h-[88px] items-center justify-between relative z-10 w-full gap-2 shrink-0">
          {/* Brand & Logo */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer shrink-0 min-w-0"
            onClick={() => { setActiveTab("home"); setMobileMenuOpen(false); }}
          >
            <PremiumLogo imgHeightClass="h-12" scaleOnHover={true} />

            {/* Platform Name & Subtitle */}
            <div className="flex flex-col justify-center min-w-0">
              <span className="text-white text-xs font-black truncate max-w-[40vw]">
                {lang === "ar" ? "منصة مستر محمد حسين" : "Mr. Mohamed Hussein"}
              </span>
              <span className="text-[#C9A14A] text-[9px] sm:text-[10px] font-bold truncate max-w-[45vw] mt-0.5">
                {lang === "ar" ? "العلوم المتكاملة للمرحلة الثانوية" : "Integrated Sciences for High School"}
              </span>
            </div>
          </div>

          {/* Controls: Language Switch */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Language Switch */}
            <button 
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              className="px-2.5 py-1.5 rounded-lg border border-[#C9A14A]/30 bg-[#0F172A]/40 text-[10px] font-black text-[#CBD5E1] hover:text-white hover:bg-[#C9A14A]/15 flex items-center gap-1 cursor-pointer transition-all shrink-0"
            >
              <Globe className="w-3.5 h-3.5 text-[#C9A14A]" />
              <span>{lang === "ar" ? "EN" : "عربي"}</span>
            </button>
          </div>
        </div>

        {/* PREMIUM OFF-CANVAS MOBILE DRAWER & BLURRED OVERLAY */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Dark Blurred Backdrop Overlay (z-index: 1100) */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 z-[1100] bg-black/75 backdrop-blur-sm md:hidden cursor-pointer"
                id="drawer-backdrop"
              ></motion.div>

              {/* Drawer Container (z-index: 1200, Slide smooth according to RTL/LTR) */}
              <motion.div 
                initial={{ x: lang === "ar" ? "-100%" : "100%" }}
                animate={{ x: 0 }}
                exit={{ x: lang === "ar" ? "-100%" : "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 240 }}
                className={`fixed top-0 bottom-0 z-[1200] w-[85%] max-w-[380px] bg-[#0B1736] ${
                  lang === "ar" 
                    ? "left-0 rounded-r-[2rem] border-r border-[#C9A14A]/30 shadow-[5px_0_60px_rgba(0,0,0,0.85)]" 
                    : "right-0 rounded-l-[2rem] border-l border-[#C9A14A]/30 shadow-[-5px_0_60px_rgba(0,0,0,0.85)]"
                } flex flex-col h-full overflow-hidden md:hidden`}
                id="drawer-container"
              >
                {/* Drawer Header (Only Logo + Small Platform Name + Close Button) */}
                <div className="p-6 flex flex-col items-center justify-center border-b border-[#C9A14A]/20 bg-[#08111F]/30 relative gap-3">
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className={`absolute top-4 ${lang === "ar" ? "right-4" : "left-4"} p-2 rounded-full bg-[#0B1736] border border-[#C9A14A]/30 text-[#C9A14A] hover:text-white cursor-pointer active:scale-95 transition-all`}
                    aria-label="Close menu"
                    id="drawer-close-btn"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Logo: Proper size and frame */}
                  <PremiumLogo imgHeightClass="h-12" scaleOnHover={true} />

                  {/* Small Platform Name */}
                  <span className="text-white text-xs font-black tracking-tight text-center">
                    {lang === "ar" ? "منصة مستر محمد حسين" : "Mr. Mohamed Hussein Platform"}
                  </span>
                </div>

                {/* Navigation Items container */}
                <div className="flex-grow min-h-0 overflow-y-auto px-5 py-6 scrollbar-none">
                  <nav className="flex flex-col gap-3">
                    
                    {selectedCourse && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3.5 rounded-2xl bg-[#08111F]/50 border border-[#C9A14A]/30 mb-2 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-brand-gold font-black uppercase tracking-wider">
                            {lang === "ar" ? "المقرر المفتوح حالياً" : "Active Course"}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A14A] animate-ping" />
                        </div>
                        <div className="text-white text-xs font-black truncate">
                          {gt(selectedCourse.title)}
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          {/* Back to Courses List */}
                          <button
                            onClick={() => {
                              setSelectedCourse(null);
                              setSelectedLesson(null);
                              setMobileMenuOpen(false);
                            }}
                            className="w-full py-2 px-3 rounded-xl bg-brand-navy/80 hover:bg-[#C9A14A]/20 text-[#C9A14A] hover:text-white border border-[#C9A14A]/30 flex items-center justify-center gap-2 text-xs font-black transition-all duration-300 active:scale-95 cursor-pointer"
                          >
                            <ArrowRight className="w-4 h-4 rtl:rotate-0 ltr:rotate-180" />
                            <span>{lang === "ar" ? "رجوع لقائمة المقررات" : "Back to Courses"}</span>
                          </button>

                          {/* Back to Syllabus / Course Detail (if lesson is active) */}
                          {selectedLesson && (
                            <button
                              onClick={() => {
                                setSelectedLesson(null);
                                setMobileMenuOpen(false);
                              }}
                              className="w-full py-2 px-3 rounded-xl bg-brand-navy/80 hover:bg-brand-electric/20 text-brand-electric hover:text-white border border-brand-electric/30 flex items-center justify-center gap-2 text-xs font-black transition-all duration-300 active:scale-95 cursor-pointer"
                            >
                              <ArrowRight className="w-4 h-4 rtl:rotate-0 ltr:rotate-180" />
                              <span>{lang === "ar" ? "رجوع لفهرس الدروس" : "Back to Syllabus"}</span>
                            </button>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* Item 1: 🏠 الرئيسية */}
                    <button 
                      onClick={() => { setActiveTab("home"); setMobileMenuOpen(false); }}
                      className={`w-full text-[14px] font-black flex items-center gap-3.5 transition-all duration-300 cursor-pointer active:scale-[0.98] ${
                        activeTab === "home" 
                          ? "bg-[#C9A14A]/25 border border-[#C9A14A]/50 text-white" 
                          : "text-white bg-[#0B1736] hover:bg-[#C9A14A]/20 border border-[#C9A14A]/10"
                      }`}
                      style={{ 
                        height: '56px', 
                        borderRadius: '14px', 
                        padding: '16px'
                      }}
                      id="drawer-item-home"
                    >
                      <Home className="w-5 h-5 shrink-0 text-[#C9A14A]" />
                      <span className="flex-grow text-start">{lang === "ar" ? "الرئيسية" : "Home"}</span>
                    </button>

                    {/* Item 2: 📚 المحاضرات والكورسات */}
                    <button 
                      onClick={() => { setActiveTab("courses"); setMobileMenuOpen(false); }}
                      className={`w-full text-[14px] font-black flex items-center gap-3.5 transition-all duration-300 cursor-pointer active:scale-[0.98] ${
                        activeTab === "courses" 
                          ? "bg-[#C9A14A]/25 border border-[#C9A14A]/50 text-white" 
                          : "text-white bg-[#0B1736] hover:bg-[#C9A14A]/20 border border-[#C9A14A]/10"
                      }`}
                      style={{ 
                        height: '56px', 
                        borderRadius: '14px', 
                        padding: '16px'
                      }}
                      id="drawer-item-courses"
                    >
                      <BookOpen className="w-5 h-5 shrink-0 text-[#C9A14A]" />
                      <span className="flex-grow text-start">{lang === "ar" ? "المحاضرات والكورسات" : "Lectures & Courses"}</span>
                    </button>

                    {/* Item 3: 👨‍🎓 بوابة الطالب */}
                    <button 
                      onClick={() => { setActiveTab("portal"); setMobileMenuOpen(false); }}
                      className={`w-full text-[14px] font-black flex items-center gap-3.5 transition-all duration-300 cursor-pointer active:scale-[0.98] ${
                        activeTab === "portal" 
                          ? "bg-[#C9A14A]/25 border border-[#C9A14A]/50 text-white" 
                          : "text-white bg-[#0B1736] hover:bg-[#C9A14A]/20 border border-[#C9A14A]/10"
                      }`}
                      style={{ 
                        height: '56px', 
                        borderRadius: '14px', 
                        padding: '16px'
                      }}
                      id="drawer-item-portal"
                    >
                      <UserCheck className="w-5 h-5 shrink-0 text-[#C9A14A]" />
                      <span className="flex-grow text-start">{lang === "ar" ? "بوابة الطالب" : "Student Portal"}</span>
                    </button>

                    {/* Item 4: 📝 الامتحانات والتقييم */}
                    <button 
                      onClick={() => { setActiveTab("exams"); setMobileMenuOpen(false); }}
                      className={`w-full text-[14px] font-black flex items-center gap-3.5 transition-all duration-300 cursor-pointer active:scale-[0.98] ${
                        activeTab === "exams" 
                          ? "bg-[#C9A14A]/25 border border-[#C9A14A]/50 text-white" 
                          : "text-white bg-[#0B1736] hover:bg-[#C9A14A]/20 border border-[#C9A14A]/10"
                      }`}
                      style={{ 
                        height: '56px', 
                        borderRadius: '14px', 
                        padding: '16px'
                      }}
                      id="drawer-item-exams"
                    >
                      <FileText className="w-5 h-5 shrink-0 text-[#C9A14A]" />
                      <span className="flex-grow text-start">{lang === "ar" ? "الامتحانات والتقييم" : "Exams & Evaluation"}</span>
                    </button>

                    {/* Item 5: 📊 النتائج والتقارير */}
                    <button 
                      onClick={() => { setShowInquiry(true); setMobileMenuOpen(false); }}
                      className="w-full text-[14px] font-black flex items-center gap-3.5 transition-all duration-300 cursor-pointer active:scale-[0.98] text-white bg-[#0B1736] hover:bg-[#C9A14A]/20 border border-[#C9A14A]/10 hover:border-[#C9A14A]/50"
                      style={{ 
                        height: '56px', 
                        borderRadius: '14px', 
                        padding: '16px'
                      }}
                      id="drawer-item-results"
                    >
                      <TrendingUp className="w-5 h-5 shrink-0 text-[#C9A14A]" />
                      <span className="flex-grow text-start">{lang === "ar" ? "النتائج والتقارير" : "Results & Reports"}</span>
                    </button>

                    {/* Item 7: 📞 تواصل معنا */}
                    <button 
                      onClick={() => { 
                        window.open(`https://wa.me/${data?.hero?.whatsapp}`, "_blank"); 
                        setMobileMenuOpen(false); 
                      }}
                      className="w-full text-[14px] font-black flex items-center gap-3.5 transition-all duration-300 cursor-pointer active:scale-[0.98] text-white bg-[#0B1736] hover:bg-[#C9A14A]/20 border border-[#C9A14A]/10 hover:border-[#C9A14A]/50"
                      style={{ 
                        height: '56px', 
                        borderRadius: '14px', 
                        padding: '16px'
                      }}
                      id="drawer-item-contact"
                    >
                      <Phone className="w-5 h-5 shrink-0 text-[#C9A14A]" />
                      <span className="flex-grow text-start">{lang === "ar" ? "تواصل معنا" : "Contact Us"}</span>
                    </button>

                    {/* Item 8: ⚙️ الإعدادات */}
                    <button 
                      onClick={() => { setSoundEnabled(!soundEnabled); setMobileMenuOpen(false); }}
                      className="w-full text-[14px] font-black flex items-center gap-3.5 transition-all duration-300 cursor-pointer active:scale-[0.98] text-white bg-[#0B1736] hover:bg-[#C9A14A]/20 border border-[#C9A14A]/10 hover:border-[#C9A14A]/50"
                      style={{ 
                        height: '56px', 
                        borderRadius: '14px', 
                        padding: '16px'
                      }}
                      id="drawer-item-settings"
                    >
                      <Settings className="w-5 h-5 shrink-0 text-[#C9A14A]" />
                      <span className="flex-grow text-start">{lang === "ar" ? "مؤثرات الصوت" : "Sound FX"}</span>
                      <span className="text-[10px] font-bold bg-[#C9A14A]/15 text-[#C9A14A] px-2 py-0.5 rounded-lg border border-[#C9A14A]/25 uppercase shrink-0">
                        {soundEnabled ? (lang === "ar" ? "مفعّل" : "ON") : (lang === "ar" ? "مغلق" : "OFF")}
                      </span>
                    </button>

                    {/* Item 9: 🌐 العربية | English */}
                    <button 
                      onClick={() => { setLang(lang === "ar" ? "en" : "ar"); setMobileMenuOpen(false); }}
                      className="w-full text-[14px] font-black flex items-center gap-3.5 transition-all duration-300 cursor-pointer active:scale-[0.98] text-white bg-[#0B1736] hover:bg-[#C9A14A]/20 border border-[#C9A14A]/10 hover:border-[#C9A14A]/50"
                      style={{ 
                        height: '56px', 
                        borderRadius: '14px', 
                        padding: '16px'
                      }}
                      id="drawer-item-lang"
                    >
                      <Globe className="w-5 h-5 shrink-0 text-[#C9A14A]" />
                      <span className="flex-grow text-start">{lang === "ar" ? "اللغة (العربية)" : "Language (EN)"}</span>
                      <span className="text-[11px] font-bold bg-[#C9A14A]/15 text-[#C9A14A] px-2 py-0.5 rounded-lg border border-[#C9A14A]/25 uppercase shrink-0">
                        {lang === "ar" ? "AR" : "EN"}
                      </span>
                    </button>

                  </nav>

                  {/* PROMINENT WHATSAPP & FACEBOOK BUTTONS */}
                  <div className="mt-8 pt-6 border-t border-[#C9A14A]/20 space-y-4">
                    <div className="text-center text-xs text-[#C9A14A] font-black tracking-wider uppercase">
                      {lang === "ar" ? "تواصل مباشر مع الأستاذ" : "Direct Contact with Mr. Mohamed"}
                    </div>
                    
                    <div className="flex flex-col gap-3">
                      <a
                        href={`https://wa.me/${data.hero?.whatsapp || "201001944136"}?text=${encodeURIComponent(
                          lang === "ar" 
                            ? "مرحباً مستر محمد حسين، أرغب في الاستفسار عن تفاصيل الحجز والاشتراك بالمنصة."
                            : "Hello Mr. Mohamed Hussein, I would like to inquire about the subscription details."
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/10 active:scale-[0.98] transition-all"
                      >
                        <Phone className="w-4 h-4 text-white" />
                        <span>{lang === "ar" ? "واتساب لتأكيد الحجز والاشتراك 🟢" : "WhatsApp Chat 🟢"}</span>
                      </a>

                      <a
                        href={data.hero?.facebook || "https://www.facebook.com/profile.php?id=61554173033193"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/10 active:scale-[0.98] transition-all"
                      >
                        <Facebook className="w-4 h-4 text-white" />
                        <span>{lang === "ar" ? "فيسبوك الأستاذ الشخصي 🔵" : "Teacher's Facebook Page 🔵"}</span>
                      </a>
                    </div>
                  </div>

                </div>

              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 md:pt-32 md:pb-12 relative z-10">
        
        {/* Elegant Back Button for Internal Pages */}
        {isInternalPage && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="mb-5 flex justify-start"
          >
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-brand-navy/60 hover:bg-brand-royal border border-brand-gold/20 hover:border-brand-gold/60 text-brand-gold hover:text-white text-xs font-semibold transition-all duration-300 shadow-md cursor-pointer active:scale-95 group select-none backdrop-blur-md"
            >
              {lang === "ar" ? (
                <>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  <span>{getBackText()}</span>
                </>
              ) : (
                <>
                  <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
                  <span>{getBackText()}</span>
                </>
              )}
            </button>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          
          {/* TAB 1: HOME */}
          {activeTab === "home" && (
            <motion.div
              key="home-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-12"
            >
              {/* HERO SECTION */}
              <div className="relative rounded-3xl overflow-hidden border border-brand-gold/25 bg-brand-navy shadow-[0_20px_50px_rgba(201,161,74,0.06)]">
                <div className="absolute inset-0 bg-gradient-to-l from-brand-navy via-brand-navy/80 to-transparent z-10"></div>
                
                {/* Science background elements inside Hero */}
                <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
                  <div className="absolute top-10 right-20 animate-pulse-slow">
                    <svg width="200" height="200" viewBox="0 0 100 100" fill="none" stroke="#C9A14A" strokeWidth="0.5">
                      <circle cx="50" cy="50" r="40" />
                      <circle cx="50" cy="50" r="30" />
                      <line x1="10" y1="50" x2="90" y2="50" />
                      <line x1="50" y1="10" x2="50" y2="90" />
                    </svg>
                  </div>
                </div>

                <img 
                  src={data.hero?.bannerImage} 
                  alt="Scientific lab" 
                  className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
                />
                
                <div className="relative z-20 px-6 sm:px-12 py-12 md:py-24 max-w-2xl space-y-6 flex flex-col items-center text-center md:items-start md:text-start">
                  <span className="inline-flex items-center gap-1.5 bg-brand-gold/10 text-brand-gold text-xs font-black px-4 py-1.5 rounded-full border border-brand-gold/20">
                    <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-spin-slow animate-spin-slow shrink-0" />
                    {lang === "ar" ? "المنصة الرسمية المعتمدة لتدريس العلوم المتكاملة الكترونياً" : "The official approved platform for teaching Integrated Sciences online"}
                  </span>
                  
                  <h2 className="text-2xl sm:text-5xl font-black text-white leading-tight tracking-tight">
                    {gt(data.hero?.title)}
                  </h2>
                  <p className="text-xs sm:text-base text-brand-light/90 leading-relaxed font-semibold">
                    {gt(data.hero?.subtitle)}
                  </p>

                  <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4 w-full justify-center md:justify-start">
                    <button 
                      onClick={() => setActiveTab("register")}
                      className="px-8 py-4 bg-gradient-to-r from-brand-gold to-brand-gold-hover hover:from-brand-gold-hover hover:to-brand-gold text-slate-950 font-black text-sm rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-brand-gold/20 cursor-pointer min-h-[52px] w-full sm:w-auto"
                    >
                      {lang === "ar" ? (data.hero?.buttonText || "اشترك الآن 🎟️") : "Subscribe Now 🎟️"}
                    </button>

                    <button 
                      onClick={() => setShowVodafoneModal(true)}
                      className="px-6 py-4 bg-rose-600 hover:bg-rose-500 text-white font-black text-sm rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-rose-600/20 cursor-pointer min-h-[52px] w-full sm:w-auto flex items-center justify-center gap-2"
                    >
                      <Wallet className="w-4 h-4 text-white" />
                      {lang === "ar" ? "الدفع بفودافون كاش 💳" : "Pay via Vodafone Cash 💳"}
                    </button>
                    
                    <a 
                      href={`https://wa.me/${data.hero?.whatsapp}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-6 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm rounded-xl flex items-center justify-center gap-2.5 transition-all duration-300 shadow-[0_8px_20px_-4px_rgba(16,185,129,0.3)] hover:shadow-[0_12px_24px_-4px_rgba(16,185,129,0.5)] min-h-[52px] w-full sm:w-auto hover:scale-[1.03] active:scale-[0.98] border border-emerald-500/20 cursor-pointer"
                    >
                      <svg className="w-5 h-5 fill-current text-white shrink-0" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      {lang === "ar" ? "تواصل واتساب المساعدين" : "WhatsApp Assistants"}
                    </a>

                    <a 
                      href={data.hero?.facebook || "https://www.facebook.com/profile.php?id=61554173033193"}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-6 py-4 bg-[#1877F2]/10 hover:bg-[#1877F2] border border-[#1877F2]/30 hover:border-[#1877F2] text-[#1877F2] hover:text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_15px_rgba(24,119,242,0.15)] hover:shadow-[0_0_25px_rgba(24,119,242,0.35)] min-h-[52px] w-full sm:w-auto hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Facebook className="w-4 h-4 shrink-0" />
                      {lang === "ar" ? "صفحة الفيسبوك" : "Facebook Page"}
                    </a>
                  </div>
                </div>
              </div>



              {/* BIOGRAPHY SECTION */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-brand-navy/60 border border-brand-gold/25 p-6 sm:p-10 rounded-3xl shadow-[0_15px_35px_rgba(201,161,74,0.04)]">
                <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-4">
                  <div className="relative w-full overflow-hidden rounded-2xl border border-brand-gold/25 bg-brand-dark/40 shadow-inner group">
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent z-10"></div>
                    <img 
                      src="https://lh3.googleusercontent.com/d/1kvuZJvlZcrKFWJYrzu3B5b60qDugyCJP" 
                      alt="Mr. Mohamed Hussein Cover Banner" 
                      className="w-full h-auto object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-[11px] text-brand-gold font-black bg-brand-gold/10 px-3 py-1 rounded-full border border-brand-gold/20 animate-pulse">
                     {lang === "ar" ? "البانر التعريفي الرسمي للأستاذ محمد حسين 🌟" : "Official Introduction Banner of Mr. Mohamed Hussein 🌟"}
                  </span>
                </div>

                <div className="lg:col-span-7 space-y-4">
                  <span className="text-brand-gold text-xs font-black tracking-widest uppercase flex items-center gap-2">
                    <Award className="w-4 h-4 text-brand-gold" />
                    {lang === "ar" ? "الخبرة والريادة التعليمية الأولى" : "First Name in Educational Leadership"}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    {lang === "ar" ? `من هو ${data.teachers?.[0]?.name}؟` : `Who is ${gt(data.teachers?.[0]?.name)}?`}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-light/90 leading-relaxed font-semibold">
                    {gt(data.teachers?.[0]?.bio)}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-bold text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-brand-gold shrink-0" />
                      {lang === "ar" ? "شرح مبسط للنظام الجديد تابلت وثانوية عامة." : "Simplified explanation of the new tablet & high school system."}
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-brand-gold shrink-0" />
                      {lang === "ar" ? "خرائط ذهنية متميزة لتلخيص الكيمياء والعلوم المتكاملة." : "Excellent mind maps for summarizing chemistry & integrated sciences."}
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-brand-gold shrink-0" />
                      {lang === "ar" ? "متابعة أسبوعية دقيقة لدرجات الواجب وحضور الطالب." : "Precise weekly tracking of homework grades and student attendance."}
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-brand-gold shrink-0" />
                      {lang === "ar" ? "تقارير متكاملة ترسل لولي الأمر بصفة دورية تلقائياً." : "Comprehensive reports sent periodically & automatically to parents."}
                    </div>
                  </div>
                </div>
              </div>

              {/* CORE SERVICES */}
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-black text-white">{lang === "ar" ? "ماذا تقدم لك المنصة الرسمية" : "What does the Official Platform Offer?"}</h3>
                  <p className="text-xs text-brand-light/70">{lang === "ar" ? "بوابتك الرقمية المتكاملة لتوفير الجهد والوقت وضمان الدرجات النهائية" : "Your integrated digital gateway to save effort, time, and guarantee top grades"}</p>
                </div>
 
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="glass-panel p-6 rounded-2xl space-y-4 hover:border-brand-electric/50 transition-all group">
                    <div className="w-12 h-12 bg-brand-royal/20 border border-brand-electric/30 text-brand-electric rounded-xl flex items-center justify-center group-hover:scale-110 transition-all">
                      <Video className="w-6 h-6" />
                    </div>
                    <h4 className="text-sm font-black text-white">{lang === "ar" ? "محاضرات فيديو تفاعلية" : "Interactive Video Lectures"}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                      {lang === "ar" 
                        ? "شاهد الشرح والتدريبات المسجلة بدقة فائقة HD، مع إمكانية إيقاف الشرح، الرجوع لأي فكرة، ومراجعة الدرس طوال العام." 
                        : "Watch professional explanations and high-definition recordings with options to pause, rewind, and review lessons all year round."}
                    </p>
                  </div>
 
                  <div className="glass-panel p-6 rounded-2xl space-y-4 hover:border-brand-electric/50 transition-all group">
                    <div className="w-12 h-12 bg-brand-royal/20 border border-brand-electric/30 text-brand-electric rounded-xl flex items-center justify-center group-hover:scale-110 transition-all">
                      <FileText className="w-6 h-6" />
                    </div>
                    <h4 className="text-sm font-black text-white">{lang === "ar" ? "ملخصات ومذكرات PDF" : "PDF Booklets & Summaries"}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                      {lang === "ar" 
                        ? "تحميل وطباعة ملازم الشرح الشاملة ومذكرات بنوك الأسئلة التي تحتوي على كافة أفكار الامتحانات السابقة والوزارية." 
                        : "Download and print comprehensive booklets and question banks that cover all past and ministry exam ideas."}
                    </p>
                  </div>
 
                  <div className="glass-panel p-6 rounded-2xl space-y-4 hover:border-brand-electric/50 transition-all group">
                    <div className="w-12 h-12 bg-brand-gold/15 border border-brand-gold/30 text-brand-gold rounded-xl flex items-center justify-center group-hover:scale-110 transition-all">
                      <Trophy className="w-6 h-6 animate-pulse" />
                    </div>
                    <h4 className="text-sm font-black text-white">{lang === "ar" ? "امتحانات وشهادات معتمدة" : "Certified Exams & Honor Certificates"}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                      {lang === "ar" 
                        ? "امتحن إلكترونياً على كل محاضرة وتلقى نتيجتك وحل الأسئلة الخاطئة فورياً مع شهادة تفوق قابلة للمشاركة عند تحقيق الامتياز." 
                        : "Take online quizzes after each lecture, receive instant feedback, and get shareable certificates of excellence upon high performance."}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: COURSES & SYLLABUS */}
          {activeTab === "courses" && (
            !getStudentAccessState(loggedInStudent).hasAccess && !isAdminLoggedIn ? (
              renderGatedScreen(lang === "ar" ? "المحاضرات والمقررات" : "Courses & Lectures")
            ) : (
              <motion.div
                key="courses-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
              <div>
                <h2 className="text-2xl font-black text-white flex items-center gap-2">
                  <span className="w-2.5 h-6 rounded bg-brand-electric inline-block animate-pulse"></span>
                  {lang === "ar" ? "المقررات الدراسية والمحاضرات الرقمية" : "Courses & Digital Lectures"}
                </h2>
                <p className="text-xs text-slate-400 font-semibold mt-1">
                  {lang === "ar" 
                    ? "تصفح المناهج والوحدات، شاهد الشرح، حمل المذكرات وحل الاختبار لكل درس بذكاء" 
                    : "Browse courses, watch explanations, download materials, and solve quizzes interactively"}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Courses List Selector (Left) */}
                <div className={`lg:col-span-4 space-y-4 ${selectedCourse ? "hidden lg:block" : "block"}`}>
                  <h3 className="text-xs font-black text-brand-gold border-r-2 border-brand-gold pr-2">
                    {lang === "ar" ? "اختر مقررك الدراسي:" : "Choose your course:"}
                  </h3>
                  
                  <div className="space-y-3">
                    {data.courses?.map((c: any) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          setSelectedCourse(c);
                          if (c.lessons && c.lessons.length > 0) {
                            setSelectedLesson(c.lessons[0]);
                          } else {
                            setSelectedLesson(null);
                          }
                        }}
                        className={`w-full text-right p-4 rounded-xl border transition-all text-xs font-bold flex flex-col gap-2 cursor-pointer ${
                          selectedCourse?.id === c.id 
                            ? "bg-brand-royal/40 border-brand-electric/60 shadow-lg shadow-brand-royal/20 text-white" 
                            : "bg-brand-navy/40 border-brand-electric/10 text-slate-300 hover:bg-brand-navy/60 hover:border-brand-electric/30"
                        }`}
                      >
                        <div className="flex justify-between items-center w-full">
                          <span className="bg-brand-electric/15 text-brand-electric text-[10px] font-black px-2 py-0.5 rounded border border-brand-electric/20">
                            {gt(c.grade)}
                          </span>
                          <span className="text-[10px] text-brand-gold font-mono">{lang === "ar" ? "رمز:" : "ID:"} {c.id}</span>
                        </div>
                        <h4 className="font-black text-sm">{gt(c.title)}</h4>
                        <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">{gt(c.description)}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selected Course Details and Lessons Player (Right) */}
                <div className={`lg:col-span-8 space-y-6 ${selectedCourse ? "block" : "hidden lg:block"}`}>
                  {selectedCourse ? (
                    <div className="glass-panel rounded-3xl p-6 space-y-6 shadow-2xl relative overflow-hidden">
                      {/* Subtle lighting in corner */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-electric/10 rounded-full blur-3xl pointer-events-none"></div>

                      {/* Title banner */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-brand-electric/20 pb-4 relative z-10">
                        <div className="flex items-center gap-3.5">
                          {/* Elegant Back Button */}
                          <button
                            onClick={() => { setSelectedCourse(null); setSelectedLesson(null); }}
                            className="p-2.5 rounded-full bg-brand-navy/60 hover:bg-[#C9A14A]/20 text-[#C9A14A] hover:text-white border border-[#C9A14A]/30 shadow-[0_0_12px_rgba(201,161,74,0.15)] hover:shadow-[0_0_20px_rgba(201,161,74,0.45)] transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 group/back"
                            title={lang === "ar" ? "رجوع للمقررات" : "Back to courses"}
                          >
                            <ArrowRight className="w-4 h-4 transition-transform group-hover/back:translate-x-0.5 rtl:rotate-0 ltr:rotate-180" />
                          </button>
                          <div>
                            <h3 className="text-lg font-black text-white">{gt(selectedCourse.title)}</h3>
                            <p className="text-xs text-brand-gold font-bold mt-0.5">{gt(selectedCourse.grade)}</p>
                          </div>
                        </div>
                        <span className="bg-brand-royal/30 text-brand-electric text-xs font-black px-3.5 py-1 rounded-full border border-brand-electric/25">
                          {selectedCourse.lessons?.length || 0} {lang === "ar" ? "محاضرة تفاعلية" : "Interactive Lectures"}
                        </span>
                      </div>

                      {/* Active Lesson Player */}
                      {selectedLesson ? (
                        (() => {
                          const lessonIndex = selectedCourse.lessons?.findIndex((l: any) => l.id === selectedLesson.id);
                          const isFreeLesson = lessonIndex === 0;
                          const hasActiveAccess = (loggedInStudent && !isSubscriptionExpired(loggedInStudent)) || isFreeLesson;
                          return (
                            <div className="space-y-4 relative z-10">
                              
                              {/* Lesson Header with Elegant Back Button */}
                              <div className="flex items-center justify-between pb-2 border-b border-brand-electric/10">
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => setSelectedLesson(null)}
                                    className="p-2 rounded-lg bg-brand-navy/80 hover:bg-[#C9A14A]/20 text-[#C9A14A] hover:text-white border border-[#C9A14A]/30 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 group/back-lesson transition-all duration-300"
                                    title={lang === "ar" ? "رجوع للفهرس" : "Back to syllabus"}
                                  >
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover/back-lesson:translate-x-0.5 rtl:rotate-0 ltr:rotate-180" />
                                  </button>
                                  <span className="text-xs font-black text-white truncate max-w-[150px] sm:max-w-xs">{gt(selectedLesson.title)}</span>
                                </div>
                                <span className="bg-brand-gold/15 text-brand-gold text-[10px] font-black px-2 py-0.5 rounded border border-brand-gold/25 flex items-center gap-1 shrink-0 animate-pulse">
                                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-ping"></span>
                                  {lang === "ar" ? "محاضرة نشطة" : "Active Lecture"}
                                </span>
                              </div>

                              {/* Video Box */}
                              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-brand-electric/20 shadow-2xl flex flex-col items-center justify-center text-center p-4">
                                {hasActiveAccess ? (
                                  isSecureVideoLoading ? (
                                    <div className="flex flex-col items-center gap-3">
                                      <div className="w-10 h-10 rounded-full border-4 border-brand-gold/20 border-t-brand-gold animate-spin"></div>
                                      <span className="text-xs text-slate-400 font-bold">{lang === "ar" ? "جاري تشفير وتأمين اتصال الفيديو..." : "Securing stream connection..."}</span>
                                    </div>
                                  ) : secureVideoError ? (
                                    <div className="p-4 space-y-2">
                                      <p className="text-rose-400 font-bold text-xs">{secureVideoError}</p>
                                      <button 
                                        onClick={() => {
                                          // Force state update to retry fetch
                                          setSelectedLesson({ ...selectedLesson });
                                        }}
                                        className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-200 text-[10px] font-bold rounded-lg hover:bg-slate-850 cursor-pointer"
                                      >
                                        {lang === "ar" ? "إعادة المحاولة 🔄" : "Retry 🔄"}
                                      </button>
                                    </div>
                                  ) : secureEmbedUrl ? (
                                    <>
                                      <iframe 
                                        src={secureEmbedUrl} 
                                        title={selectedLesson.title}
                                        className="absolute inset-0 w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                        allowFullScreen
                                      ></iframe>
                                      {/* Floating, Anti-Piracy Watermark Overlay */}
                                      {loggedInStudent && (
                                        <div 
                                          className="absolute pointer-events-none select-none text-white/20 text-[10px] sm:text-xs font-black bg-black/10 px-2 py-1 rounded backdrop-blur-[0.5px] border border-white/5 transition-all duration-1000 ease-in-out whitespace-nowrap z-30 font-mono"
                                          style={{ 
                                            top: watermarkPos.top, 
                                            left: watermarkPos.left,
                                            textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                                          }}
                                        >
                                          🔒 {loggedInStudent.fullName} ({loggedInStudent.phone || loggedInStudent.id}) - منصة م. محمد حسين
                                        </div>
                                      )}
                                    </>
                                  ) : (
                                    <div className="text-xs text-slate-500">{lang === "ar" ? "يرجى الانتظار، جاري تحضير المحاضرة..." : "Preparing secure playback..."}</div>
                                  )
                                ) : (
                                  <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/95 via-brand-navy/90 to-brand-dark/95 flex flex-col items-center justify-center p-6 space-y-4">
                                    <div className="w-16 h-16 rounded-2xl bg-brand-navy border border-brand-gold/30 flex items-center justify-center text-brand-gold shadow-[0_0_15px_rgba(201,161,74,0.3)] animate-pulse">
                                      <Lock className="w-8 h-8 text-brand-gold" />
                                    </div>
                                    <div className="space-y-1.5 max-w-md">
                                      <h4 className="text-sm font-black text-white">{lang === "ar" ? "المحاضرة مغلقة ومخصصة للمشتركين فقط 🔒" : "Lecture Gated - Subscribed Students Only 🔒"}</h4>
                                      <p className="text-[11px] text-slate-300 leading-relaxed font-semibold">
                                        {lang === "ar" 
                                          ? "لمشاهدة فيديو الشرح، تحميل الملصخات، وحل الاختبارات الدورية؛ يرجى تسجيل الدخول بحسابك الفعال في بوابة الطالب." 
                                          : "To watch the explanation video, download files, and solve exams; please login to your active student portal account."}
                                      </p>
                                    </div>
                                    <button
                                      onClick={() => setActiveTab("portal")}
                                      className="px-5 py-2.5 bg-brand-gold hover:bg-brand-gold/90 text-brand-dark font-black text-xs rounded-xl flex items-center gap-1.5 shadow-lg shadow-brand-gold/20 cursor-pointer"
                                    >
                                      <LockKeyhole className="w-3.5 h-3.5" />
                                      {lang === "ar" ? "تسجيل دخول البوابة 🔑" : "Login to Student Portal 🔑"}
                                    </button>
                                  </div>
                                )}
                              </div>

                              {/* Lesson Title and resources */}
                              <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center bg-brand-dark/55 p-4 rounded-xl border border-brand-electric/20">
                                <div className="max-w-[250px] sm:max-w-xs">
                                  <span className="text-[10px] text-slate-400 font-bold block">{lang === "ar" ? "المحاضرة الحالية:" : "Current Lecture:"}</span>
                                  <h4 className="text-sm font-black text-white flex items-center gap-1.5 mt-0.5">
                                    <Play className="w-3.5 h-3.5 text-brand-electric fill-current animate-pulse shrink-0" />
                                    <span className="truncate">{gt(selectedLesson.title)}</span>
                                  </h4>
                                </div>

                                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                                  {selectedLesson.pdfUrl && (
                                    hasActiveAccess ? (
                                      <a 
                                        href={selectedLesson.pdfUrl}
                                        download
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="px-3.5 py-2 bg-brand-navy/90 hover:bg-brand-royal/40 text-slate-200 font-bold text-[11px] rounded-lg border border-brand-electric/30 flex items-center gap-1 transition-all"
                                      >
                                        <Download className="w-3.5 h-3.5 text-brand-electric" />
                                        {lang === "ar" ? "الملخص PDF" : "PDF Summary"}
                                      </a>
                                    ) : (
                                      <button 
                                        onClick={() => setActiveTab("portal")}
                                        className="px-3.5 py-2 bg-slate-900 text-slate-500 font-bold text-[11px] rounded-lg border border-slate-800 flex items-center gap-1 opacity-70 cursor-pointer"
                                      >
                                        <Lock className="w-3 h-3 text-slate-500" />
                                        {lang === "ar" ? "الملخص مقفل 🔒" : "PDF Locked 🔒"}
                                      </button>
                                    )
                                  )}
                                  
                                  {selectedLesson.homeworkUrl && (
                                    hasActiveAccess ? (
                                      <a 
                                        href={selectedLesson.homeworkUrl}
                                        download
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="px-3.5 py-2 bg-brand-navy/90 hover:bg-brand-royal/40 text-slate-200 font-bold text-[11px] rounded-lg border border-brand-electric/30 flex items-center gap-1 transition-all"
                                      >
                                        <FileText className="w-3.5 h-3.5 text-brand-gold" />
                                        {lang === "ar" ? "الواجب والمرفق" : "Homework PDF"}
                                      </a>
                                    ) : (
                                      <button 
                                        onClick={() => setActiveTab("portal")}
                                        className="px-3.5 py-2 bg-slate-900 text-slate-500 font-bold text-[11px] rounded-lg border border-slate-800 flex items-center gap-1 opacity-70 cursor-pointer"
                                      >
                                        <Lock className="w-3 h-3 text-slate-500" />
                                        {lang === "ar" ? "الواجب مقفل 🔒" : "Homework Locked 🔒"}
                                      </button>
                                    )
                                  )}

                                  {selectedLesson.examId && (
                                    hasActiveAccess ? (
                                      <button 
                                        onClick={() => startQuiz(selectedLesson.examId)}
                                        className="px-4 py-2 bg-brand-gold text-brand-dark hover:scale-[1.03] font-black text-[11px] rounded-lg shadow-lg shadow-brand-gold/20 transition-all cursor-pointer flex items-center gap-1"
                                      >
                                        <Trophy className="w-3.5 h-3.5 text-brand-dark" />
                                        {lang === "ar" ? "حل الامتحان 🏆" : "Take Exam 🏆"}
                                      </button>
                                    ) : (
                                      <button 
                                        onClick={() => setActiveTab("portal")}
                                        className="px-4 py-2 bg-slate-900 text-slate-500 font-bold text-[11px] rounded-lg border border-slate-800 flex items-center gap-1 opacity-70 cursor-pointer"
                                      >
                                        <Lock className="w-3 h-3 text-slate-500" />
                                        {lang === "ar" ? "الامتحان مقفل 🔒" : "Exam Locked 🔒"}
                                      </button>
                                    )
                                  )}
                                </div>
                              </div>

                            </div>
                          );
                        })()
                      ) : (
                        <div className="text-center py-8 text-slate-400 text-xs">
                          {lang === "ar" ? "لا توجد محاضرات مدرجة في هذا المقرر حالياً." : "No lectures available in this course currently."}
                        </div>
                      )}

                      {/* Course Syllabus / Lessons List Grid */}
                      <div className="space-y-4 relative z-10 text-right">
                        <h4 className="text-xs font-black text-brand-gold border-r-2 border-brand-gold pr-2">
                          {lang === "ar" ? "فهرس المحاضرات والدروس:" : "Lectures Index:"}
                        </h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          {selectedCourse.lessons?.map((les: any, index: number) => {
                            const isFree = index === 0;
                            const isSelected = selectedLesson?.id === les.id;
                            const lessonDuration = les.videoDuration 
                              ? (lang === "ar" ? `${les.videoDuration} دقيقة` : `${les.videoDuration} Mins`) 
                              : (index % 2 === 0 
                                ? (lang === "ar" ? "45 دقيقة" : "45 Mins") 
                                : (lang === "ar" ? "60 دقيقة" : "60 Mins"));
                            const thumbUrl = les.imageUrl || selectedCourse.image || "https://images.unsplash.com/photo-1532187863486-abf9d39d6618?auto=format&fit=crop&q=80&w=600";
                            
                            return (
                              <div
                                key={les.id}
                                className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
                                  isSelected
                                    ? "bg-brand-royal/25 border-brand-gold/60 shadow-[0_10px_30px_rgba(201,161,74,0.12)]"
                                    : "bg-[#0B1528]/50 border-brand-electric/10 hover:border-[#C9A14A]/30 shadow-md hover:shadow-[0_10px_25px_rgba(8,17,31,0.4)]"
                                }`}
                              >
                                {/* Thumbnail Image Container (16:9) */}
                                <div className="relative aspect-video w-full overflow-hidden bg-black/40">
                                  <img 
                                    src={thumbUrl} 
                                    alt={les.title} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    referrerPolicy="no-referrer"
                                  />
                                  {/* Dark gradient overlay */}
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                  
                                  {/* Badges Overlay */}
                                  <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                                    {/* Free or Premium Badge */}
                                    {isFree ? (
                                      <span className="bg-emerald-500/95 text-white text-[9px] font-black px-2.5 py-1 rounded-md shadow-sm border border-emerald-400/30">
                                        {lang === "ar" ? "🔓 عرض مجاني" : "🔓 Free Preview"}
                                      </span>
                                    ) : (
                                      <span className="bg-brand-gold/90 text-brand-dark text-[9px] font-black px-2.5 py-1 rounded-md shadow-sm border border-brand-gold/40">
                                        {lang === "ar" ? "🔒 للمشتركين" : "🔒 Premium"}
                                      </span>
                                    )}

                                    {/* Active/Now Playing Badge */}
                                    {isSelected && (
                                      <span className="bg-brand-electric text-white text-[9px] font-black px-2.5 py-1 rounded-md flex items-center gap-1 shrink-0 animate-pulse shadow-md">
                                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                                        {lang === "ar" ? "نشط الآن" : "Active"}
                                      </span>
                                    )}
                                  </div>

                                  {/* Big Play Button Overlay */}
                                  <button 
                                    onClick={() => setSelectedLesson(les)}
                                    className={`absolute inset-0 m-auto w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer ${
                                      isSelected 
                                        ? "bg-[#C9A14A] text-brand-dark scale-110 shadow-[#C9A14A]/25" 
                                        : "bg-white/95 text-brand-dark hover:bg-[#C9A14A] hover:text-brand-dark group-hover:scale-110 shadow-black/30"
                                    }`}
                                    aria-label="Play Lesson"
                                  >
                                    <Play className={`w-5 h-5 ${lang === "ar" ? "translate-x-[-1px]" : "translate-x-[1px]"} fill-current`} />
                                  </button>

                                  {/* Duration display badge in corner */}
                                  <div className="absolute bottom-3 right-3 bg-black/75 px-2 py-0.5 rounded text-[10px] text-slate-300 font-bold flex items-center gap-1 border border-white/5">
                                    <Clock className="w-3 h-3 text-[#C9A14A]" />
                                    <span>{lessonDuration}</span>
                                  </div>
                                </div>

                                {/* Video Metadata details */}
                                <div className="p-4 flex flex-col justify-between flex-grow gap-3 text-right">
                                  <div className="space-y-1.5">
                                    <h5 className="font-black text-xs text-white line-clamp-2 leading-snug group-hover:text-brand-gold transition-colors duration-300">
                                      {gt(les.title)}
                                    </h5>
                                    <p className="text-[10px] text-slate-400 font-bold">
                                      {lang === "ar" ? "المحاضرة رقم " : "Lecture #"}{index + 1} • {lang === "ar" ? "شرح وتدريبات متكاملة" : "Explanations & Exercises"}
                                    </p>
                                  </div>

                                  {/* Bottom Watch/Status Button */}
                                  <button
                                    onClick={() => setSelectedLesson(les)}
                                    className={`w-full py-2.5 rounded-xl font-black text-xs transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                                      isSelected
                                        ? "bg-brand-royal/40 text-[#C9A14A] border border-[#C9A14A]/30 hover:bg-brand-royal/60"
                                        : "bg-[#C9A14A] hover:bg-[#C9A14A]/90 text-brand-dark shadow-md shadow-[#C9A14A]/10 hover:shadow-[#C9A14A]/25"
                                    }`}
                                  >
                                    <Play className="w-3.5 h-3.5 fill-current" />
                                    <span>
                                      {isSelected 
                                        ? (lang === "ar" ? "تشغل الآن 📺" : "Playing Now 📺") 
                                        : (lang === "ar" ? "مشاهدة المحاضرة 🎯" : "Watch Lecture 🎯")}
                                    </span>
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                    </div>
                  ) : (
                    <div className="text-center py-16 glass-panel rounded-3xl text-slate-400 text-xs font-bold">
                      {lang === "ar" ? "يرجى اختيار مقرر دراسي من القائمة أولاً." : "Please select a course from the list first."}
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
            )
          )}

          {/* TAB 3: ONLINE EXAMS & INTERACTIVE QUIZ ENGINE */}
          {activeTab === "exams" && (
            !getStudentAccessState(loggedInStudent).hasAccess && !isAdminLoggedIn ? (
              renderGatedScreen(lang === "ar" ? "الامتحانات والتقييم" : "Exams & Evaluation")
) : (
            <motion.div
              key="exams-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-black text-white flex items-center gap-2">
                  <span className="w-2.5 h-6 rounded bg-brand-gold inline-block animate-pulse"></span>
                  {lang === "ar" ? "نظام التقييم والامتحانات الإلكترونية" : "Evaluation & Electronic Exams"}
                </h2>
                <p className="text-xs text-slate-400 font-semibold mt-1">
                  {lang === "ar" 
                    ? "امتحن إلكترونياً، قيّم مستواك تلقائياً، واحصل على شهادة التفوق والامتياز من مستر محمد حسين" 
                    : "Take quizzes online, evaluate your level automatically, and get certificates of excellence from Mr. Mohamed Hussein"}
                </p>
              </div>

              {!activeExam ? (
                <div className="glass-panel rounded-3xl p-6 sm:p-10 space-y-6">
                  <h3 className="text-sm font-black text-white border-r-2 border-brand-electric pr-2">
                    {lang === "ar" ? "الامتحانات المتاحة للحل:" : "Available Exams:"}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.exams?.map((ex: any) => (
                      <div 
                        key={ex.id}
                        className="bg-brand-navy/40 p-5 rounded-2xl border border-brand-electric/20 flex flex-col justify-between gap-4 hover:border-brand-electric/50 transition-all group"
                      >
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-[10px]">
                            <span className="text-brand-gold font-mono">{lang === "ar" ? "رمز الامتحان:" : "Exam ID:"} {ex.id}</span>
                            <span className="bg-brand-gold/10 text-brand-gold font-extrabold px-2 py-0.5 rounded border border-brand-gold/20">
                              {lang === "ar" ? "درجة النجاح:" : "Passing Score:"} {ex.passingScore}%
                            </span>
                          </div>
                          <h4 className="text-sm font-black text-white leading-normal group-hover:text-brand-electric transition-colors">{gt(ex.title)}</h4>
                          <p className="text-xs text-slate-400 font-semibold">
                            {ex.questions?.length || 0} {lang === "ar" ? "أسئلة اختيار من متعدد متوافقة مع نظام الوزارة الجديد." : "multiple choice questions aligned with the ministry system."}
                          </p>
                        </div>

                        <button
                          onClick={() => startQuiz(ex.id)}
                          className="w-full py-3 bg-brand-electric hover:bg-brand-electric/90 text-white font-black text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md hover:scale-[1.01]"
                        >
                          <Trophy className="w-4 h-4 text-brand-gold" />
                          {lang === "ar" ? "دخول الاختبار الآن 📝" : "Enter Exam Now 📝"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-8 relative overflow-hidden">
                  
                  {/* Subtle decorative scientific grid inside exam box */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#1D9BF0_1px,transparent_1px)] [background-size:16px_16px]"></div>

                  {/* Exam progress header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-brand-electric/25 pb-4 relative z-10">
                    <div className="flex items-center gap-3.5">
                      {/* Elegant Back Button */}
                      <button
                        onClick={() => setActiveExam(null)}
                        className="p-2.5 rounded-full bg-brand-navy/60 hover:bg-[#C9A14A]/20 text-[#C9A14A] hover:text-white border border-[#C9A14A]/30 shadow-[0_0_12px_rgba(201,161,74,0.15)] hover:shadow-[0_0_20px_rgba(201,161,74,0.45)] transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 group/back"
                        title={lang === "ar" ? "العودة لقائمة الامتحانات" : "Back to Exams List"}
                      >
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/back:translate-x-0.5 rtl:rotate-0 ltr:rotate-180" />
                      </button>
                      <div>
                        <h3 className="text-base font-black text-white">{gt(activeExam.title)}</h3>
                        <p className="text-[10px] text-brand-gold font-bold mt-0.5">{lang === "ar" ? "العودة لقائمة الامتحانات" : "Back to Exams List"}</p>
                      </div>
                    </div>

                    <span className="bg-brand-royal/30 text-brand-electric text-xs font-black px-3.5 py-1.5 rounded-full border border-brand-electric/30">
                      {lang === "ar" ? "إجمالي الأسئلة:" : "Total Questions:"} {activeExam.questions?.length || 0}
                    </span>
                  </div>

                  {/* Exam Finished Score View */}
                  {quizCompleted ? (
                    <div className="space-y-8 relative z-10">
                      
                      {/* Score circle card */}
                      <div className="bg-brand-navy/60 p-6 rounded-2xl border border-brand-electric/25 text-center max-w-md mx-auto space-y-4 shadow-xl">
                        <div className="w-24 h-24 rounded-full border-4 border-brand-electric/20 border-t-brand-gold flex flex-col items-center justify-center mx-auto animate-pulse">
                          <span className="text-2xl font-black text-white font-mono">{quizScore}%</span>
                          <span className="text-[9px] text-brand-gold font-bold">{lang === "ar" ? "النتيجة النهائية" : "Final Score"}</span>
                        </div>

                        <div className="space-y-1">
                          {quizScore !== null && quizScore >= (activeExam.passingScore || 80) ? (
                            <>
                              <h4 className="text-base font-black text-emerald-400">{lang === "ar" ? "مبارك التفوق والنجاح! 🎉" : "Congratulations on your Success! 🎉"}</h4>
                              <p className="text-xs text-slate-300">
                                {lang === "ar" 
                                  ? "لقد اجتزت الامتحان بنجاح باهر وتستحق شهادة الامتياز المرفقة أدناه." 
                                  : "You passed the exam with flying colors and deserve the certificate of excellence below."}
                              </p>
                            </>
                          ) : (
                            <>
                              <h4 className="text-base font-black text-brand-gold">{lang === "ar" ? "لم يحالفك الحظ هذه المرة ❌" : "Better luck next time ❌"}</h4>
                              <p className="text-xs text-slate-300">
                                {lang === "ar" 
                                  ? "يرجى مراجعة الشرح، حل الواجب وإعادة المحاولة لتحسين نتيجتك." 
                                  : "Please review the explanation, solve the homework and try again to improve your score."}
                              </p>
                            </>
                          )}
                        </div>

                        <div className="flex gap-2 justify-center pt-2">
                          <button
                            onClick={() => {
                              setSelectedAnswers({});
                              setQuizScore(null);
                              setQuizCompleted(false);
                              setShowExplanation(false);
                              setIssuedCertificate(null);
                            }}
                            className="px-4 py-2.5 bg-brand-navy hover:bg-brand-navy/80 border border-brand-electric/30 text-slate-200 font-bold text-xs rounded-xl cursor-pointer"
                          >
                            {lang === "ar" ? "إعادة حل الاختبار 🔄" : "Re-solve Exam 🔄"}
                          </button>
                          <button
                            onClick={() => setShowExplanation(!showExplanation)}
                            className="px-4 py-2.5 bg-brand-royal text-brand-electric border border-brand-electric/30 font-bold text-xs rounded-xl cursor-pointer"
                          >
                            {showExplanation 
                              ? (lang === "ar" ? "إخفاء التفسير العلمي 👁️" : "Hide Scientific Explanation 👁️") 
                              : (lang === "ar" ? "عرض نموذج الإجابة والتفسير 👁️" : "Show Answer Key & Explanation 👁️")}
                          </button>
                        </div>
                      </div>

                      {/* Display Issued Certificate on Pass */}
                      {issuedCertificate && (
                        <div className="bg-gradient-to-br from-brand-navy via-brand-dark to-brand-navy p-6 sm:p-10 rounded-3xl border-4 border-brand-gold/30 max-w-2xl mx-auto space-y-6 relative overflow-hidden shadow-2xl print:bg-white print:text-black">
                          
                          {/* Decorative border frame */}
                          <div className="absolute inset-2 border-2 border-brand-gold/25 pointer-events-none rounded-2xl"></div>
                          <div className="absolute -left-16 -top-16 w-32 h-32 bg-brand-gold/10 rounded-full blur-2xl"></div>
                          
                          {/* Certificate Content */}
                          <div className="text-center space-y-4 relative z-10">
                            <div className="flex justify-center">
                              <Award className="w-16 h-16 text-brand-gold animate-bounce" />
                            </div>

                            <div className="space-y-1">
                              <h3 className="text-lg sm:text-2xl font-black text-brand-gold tracking-tight">{lang === "ar" ? "شهادة تفوق وتقدير 🏆" : "Certificate of Excellence 🏆"}</h3>
                              <p className="text-[10px] sm:text-xs text-brand-electric tracking-wider font-semibold">
                                {lang === "ar" ? "منصة الأستاذ محمد حسين الرقمية لكيمياء الثانوية العامة" : "Mr. Mohamed Hussein Digital Platform for High School Chemistry"}
                              </p>
                            </div>

                            <p className="text-xs sm:text-sm text-slate-300">{lang === "ar" ? "يشهد الأستاذ محمد حسين بأن الطالب / الطالبة:" : "Mr. Mohamed Hussein hereby certifies that the student:"}</p>
                            <h4 className="text-base sm:text-2xl font-black text-white border-b border-brand-gold/25 pb-2 max-w-sm mx-auto">{issuedCertificate.studentName}</h4>
                            
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto font-semibold">
                              {lang === "ar" ? "قد اجتاز بنجاح وتفوق منقطع النظير الاختبار الشامل بعنوان:" : "Has successfully passed the comprehensive exam titled:"} <br />
                              <strong className="text-brand-electric font-black">{gt(issuedCertificate.courseTitle)}</strong> <br />
                              {lang === "ar" ? "وحصل على تقدير ممتاز بمعدل:" : "And achieved an excellent grade of:"} <strong className="text-brand-gold font-black">{issuedCertificate.gradeScore}</strong>.
                            </p>

                            <div className="grid grid-cols-2 gap-4 pt-6 text-[10px] sm:text-xs border-t border-brand-gold/20">
                              <div className="text-right">
                                <span className="text-slate-400 block">{lang === "ar" ? "تاريخ الإصدار:" : "Issue Date:"}</span>
                                <span className="text-white font-bold">{issuedCertificate.issueDate}</span>
                              </div>
                              <div className="text-left font-semibold">
                                <span className="text-slate-400 block">{lang === "ar" ? "كود التوثيق المعتمد:" : "Verification Code:"}</span>
                                <span className="text-brand-gold font-mono font-bold">{issuedCertificate.id}</span>
                              </div>
                            </div>
                          </div>

                          {/* Print or Download button */}
                          <div className="flex justify-center pt-2 relative z-10 print:hidden">
                            <button
                              onClick={() => window.print()}
                              className="px-6 py-3 bg-brand-gold hover:bg-brand-gold/90 text-brand-dark font-black text-xs rounded-xl flex items-center gap-1.5 shadow-lg shadow-brand-gold/20 cursor-pointer"
                            >
                              <Download className="w-4 h-4 text-brand-dark" />
                              {lang === "ar" ? "تحميل وطباعة شهادة التقدير 🖨️" : "Download & Print Certificate 🖨️"}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Explanation Model */}
                      {showExplanation && (
                        <div className="space-y-4">
                          <h4 className="text-xs font-black text-brand-gold border-r-2 border-brand-gold pr-2">
                            {lang === "ar" ? "تفاصيل الإجابات النموذجية مع التفسير العلمي:" : "Model Answers & Scientific Explanations:"}
                          </h4>
                          
                          <div className="space-y-4">
                            {activeExam.questions.map((q: any, idx: number) => {
                              const selectedOpt = selectedAnswers[q.id];
                              const isCorrect = selectedOpt === q.correctOptionIndex;
                              return (
                                <div key={q.id} className="bg-brand-navy/60 p-5 rounded-2xl border border-brand-electric/25 space-y-3">
                                  <h5 className="text-xs font-black text-white flex items-center gap-2">
                                    <span className="w-5 h-5 rounded bg-brand-dark flex items-center justify-center text-[10px] text-brand-gold">{idx+1}</span>
                                    {gt(q.text)}
                                  </h5>

                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                    {q.options.map((opt: string, oIdx: number) => {
                                      let optStyle = "bg-brand-dark/40 border-brand-electric/10 text-slate-400";
                                      if (oIdx === q.correctOptionIndex) {
                                        optStyle = "bg-emerald-500/10 border-emerald-500/30 text-emerald-400";
                                      } else if (oIdx === selectedOpt && !isCorrect) {
                                        optStyle = "bg-rose-500/10 border-rose-500/30 text-rose-400";
                                      }
                                      return (
                                        <div key={oIdx} className={`p-2.5 rounded-lg border font-bold ${optStyle}`}>
                                          {gt(opt)}
                                        </div>
                                      );
                                    })}
                                  </div>

                                  <p className="text-[11px] text-slate-300 bg-brand-dark/50 p-3 rounded-xl border border-brand-electric/15 leading-relaxed font-semibold">
                                    💡 <strong>{lang === "ar" ? "التفسير العلمي للأستاذ محمد حسين:" : "Scientific Explanation:"}</strong> {gt(q.explanation)}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                    </div>
                  ) : (
                    /* Active Solving Mode */
                    <div className="space-y-6 relative z-10">
                      {activeExam.questions.map((q: any, idx: number) => (
                        <div key={q.id} className="bg-brand-navy/40 p-6 rounded-2xl border border-brand-electric/20 space-y-4">
                          <h4 className="text-sm font-black text-white leading-relaxed flex items-start gap-2">
                            <span className="w-6 h-6 rounded-lg bg-brand-dark border border-brand-electric/30 flex items-center justify-center text-xs text-brand-gold shrink-0 mt-0.5">{idx+1}</span>
                            {gt(q.text)}
                          </h4>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            {q.options.map((opt: string, oIdx: number) => {
                              const isSelected = selectedAnswers[q.id] === oIdx;
                              return (
                                <button
                                  key={oIdx}
                                  onClick={() => setSelectedAnswers({ ...selectedAnswers, [q.id]: oIdx })}
                                  className={`w-full text-right p-3.5 rounded-xl border font-bold cursor-pointer transition-all ${
                                    isSelected 
                                      ? "bg-brand-royal/40 border-brand-electric text-white shadow-lg" 
                                      : "bg-brand-dark/50 border-brand-electric/15 text-slate-300 hover:bg-brand-navy/80 hover:text-white"
                                  }`}
                                >
                                  {gt(opt)}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}

                      {/* Submit action */}
                      <div className="flex justify-end pt-4 border-t border-brand-electric/20">
                        <button
                          onClick={submitQuiz}
                          disabled={Object.keys(selectedAnswers).length < activeExam.questions.length}
                          className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-brand-navy/60 disabled:border-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-black text-sm rounded-xl shadow-lg transition-all cursor-pointer"
                        >
                          {lang === "ar" ? "تأكيد وتسليم الامتحان الإلكتروني 📨" : "Confirm and Submit Exam 📨"}
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              )}
            </motion.div>
            )
          )}

          {/* TAB 4: NEW REGISTRATION (CLOSED - CONTACT ADMIN) */}
          {activeTab === "register" && (
            <div className="max-w-xl mx-auto px-4 py-16 text-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel-gold p-8 sm:p-12 rounded-3xl flex flex-col items-center gap-6 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500/40 via-red-500 to-red-500/40"></div>
                
                <div className="p-4 bg-red-500/10 rounded-full border border-red-500/25">
                  <ShieldAlert className="w-14 h-14 text-red-500 animate-pulse" />
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {lang === "ar" ? "التسجيل مغلق حالياً 🚫" : "Registration is Closed 🚫"}
                </h2>

                <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed max-w-md">
                  {lang === "ar" 
                    ? "عذراً، يُمنع إنشاء الحسابات ذاتياً من الموقع. يتم إنشاء وتفعيل حسابات الطلاب حصرياً ومباشرة من خلال لوحة تحكم السكرتارية وإدارة مستر محمد حسين."
                    : "Sorry, self-registration is disabled. Student accounts are generated and activated exclusively by the administration and assistants of Mr. Mohamed Hussein."}
                </p>

                <div className="w-full flex flex-col gap-3 mt-4">
                  <a
                    href={`https://wa.me/${data?.settings?.hero?.whatsapp || "201001944136"}?text=${encodeURIComponent("مرحباً مستر محمد حسين، أرغب في حجز كارت والاشتراك في المنصة وتفعيل حساب طالب جديد.")}`}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#C9A14A] to-[#E3BE67] text-slate-950 font-black text-xs sm:text-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-[#C9A14A]/20 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {lang === "ar" ? "تواصل معنا لحجز كارت وتفعيل حسابك 💬" : "Contact us to subscribe and activate your account 💬"}
                  </a>
                </div>
              </motion.div>
            </div>
          )}

          {/* TAB 5: STUDENT PORTAL (LOGIN & STATUS) */}
          {activeTab === "portal" && (
            <motion.div
              key="portal-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-4xl mx-auto space-y-8"
            >
              {!loggedInStudent ? (
                /* Login Gate */
                <div className="bg-brand-navy/60 border border-brand-electric/25 rounded-3xl p-6 sm:p-10 max-w-md mx-auto space-y-6 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand-electric via-brand-royal to-brand-gold animate-pulse"></div>
                  
                  <div className="text-center space-y-4 group/login flex flex-col items-center">
                    <PremiumLogo imgHeightClass="h-16" className="mx-auto" />
                    <h3 className="text-xl font-black text-white">
                      {lang === "ar" ? "تسجيل دخول بوابة الطالب" : "Student Portal Login"}
                    </h3>
                    <p className="text-xs text-slate-300 font-semibold leading-relaxed">
                      {lang === "ar" 
                        ? "أدخل اسم المستخدم أو رقم الهاتف مع كلمة المرور المستلمة لتسجيل الدخول بأمان." 
                        : "Enter your username or phone number with your password to login securely."}
                    </p>
                  </div>

                  <form onSubmit={handlePortalLogin} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300 block">
                        {lang === "ar" ? "اسم المستخدم أو رقم الهاتف:" : "Username or Phone Number:"}
                      </label>
                      <div className="relative">
                        <input 
                          type="text" 
                          value={portalPhone}
                          onChange={(e) => setPortalPhone(e.target.value)}
                          placeholder={lang === "ar" ? "أدخل اسم المستخدم أو الهاتف" : "Enter username or phone"}
                          className="w-full py-3 px-4 pl-10 text-right rounded-xl border border-brand-electric/20 bg-brand-dark/60 text-white outline-none focus:ring-2 focus:ring-brand-electric/40 transition-all font-bold"
                          required
                        />
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300 block">
                        {lang === "ar" ? "كلمة المرور المستلمة (Password):" : "Password:"}
                      </label>
                      <div className="relative">
                        <input 
                          type="password" 
                          value={portalPassword}
                          onChange={(e) => setPortalPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full py-3 px-4 pl-10 text-right rounded-xl border border-brand-electric/20 bg-brand-dark/60 text-white outline-none focus:ring-2 focus:ring-brand-electric/40 transition-all font-mono font-bold"
                          required
                        />
                        <LockKeyhole className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-brand-electric hover:bg-brand-electric/90 text-white font-black rounded-xl transition-all shadow-lg cursor-pointer text-xs"
                    >
                      {lang === "ar" ? "تسجيل الدخول الآمن للبوابة 🔑" : "Secure Portal Login 🔑"}
                    </button>
                  </form>

                  {portalError && (
                    <p className="text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl flex items-center gap-1.5 justify-end leading-relaxed">
                      <span>{gt(portalError)}</span>
                      <AlertCircle className="w-4 h-4 shrink-0" />
                    </p>
                  )}
                </div>
              ) : (
                /* Authenticated Dashboard */
                <div className="space-y-8">
                  
                  {/* Student Welcome Banner */}
                  <div className="bg-brand-navy/60 border border-brand-electric/25 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xl">
                    <div className="flex items-center gap-3.5">
                      <div className="w-14 h-14 bg-gradient-to-tr from-brand-royal to-brand-electric border border-brand-electric/40 text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-lg">
                        {loggedInStudent.fullName.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base sm:text-lg font-black text-white">
                            {lang === "ar" 
                              ? `أهلاً بك مجددًا يا ${loggedInStudent.fullName.split(" ")[0]}! 👋` 
                              : `Welcome back, ${gt(loggedInStudent.fullName.split(" ")[0])}! 👋`}
                          </h3>
                          <span className={`inline-flex items-center gap-1 text-[9px] font-black px-2 py-0.5 rounded border ${
                            loggedInStudent.subscriptionStatus === "active" 
                              ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/25" 
                              : "bg-brand-gold/15 text-brand-gold border-brand-gold/25 animate-pulse"
                          }`}>
                            {loggedInStudent.subscriptionStatus === "active" 
                              ? (lang === "ar" ? "اشتراك فعال ونشط ✅" : "Active Subscription ✅") 
                              : (lang === "ar" ? "انتظار التفعيل المالي ⚠️" : "Pending Financial Activation ⚠️")}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 font-semibold mt-1">{gt(loggedInStudent.grade)} • {lang === "ar" ? "كود:" : "Code:"} {loggedInStudent.id}</p>
                      </div>
                    </div>

                    <button 
                      onClick={() => setLoggedInStudent(null)}
                      className="px-4 py-2 border border-brand-electric/30 hover:bg-brand-royal hover:text-white text-slate-300 font-bold text-xs rounded-xl cursor-pointer transition-colors"
                    >
                      {lang === "ar" ? "تسجيل الخروج" : "Logout"}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Progress Card (Right) */}
                    <div className="bg-brand-navy/60 border border-brand-electric/20 p-6 rounded-2xl space-y-6">
                      <h4 className="text-xs font-black text-brand-gold border-r-2 border-brand-gold pr-2">
                        {lang === "ar" ? "درجات الامتحانات والتقييمات:" : "Exam Scores & Assessments:"}
                      </h4>
                      
                      {loggedInStudent.examScores?.length === 0 ? (
                        <div className="bg-brand-dark/40 p-4 rounded-xl border border-brand-electric/10 text-center text-xs text-slate-400 leading-normal py-6">
                          {lang === "ar" 
                            ? "لم تقم بحل أي امتحان إلكتروني بالمنصة بعد. توجه لعلامة تبويب المقررات وابدأ التعلم والحل!" 
                            : "You have not solved any electronic exam on the platform yet. Go to the Courses tab and start learning and solving!"}
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {loggedInStudent.examScores.map((score: any, idx: number) => {
                            const exDetails = data.exams?.find((ex: any) => ex.id === score.examId);
                            return (
                              <div key={idx} className="bg-brand-dark/40 p-3.5 rounded-xl border border-brand-electric/15 flex items-center justify-between text-xs">
                                <div className="space-y-1">
                                  <strong className="text-white block line-clamp-1">{exDetails?.title ? gt(exDetails.title) : "Exam"}</strong>
                                  <span className="text-[10px] text-slate-400">{score.date}</span>
                                </div>
                                <span className={`font-mono font-bold text-xs px-2.5 py-1 rounded-lg ${
                                  score.score >= (exDetails?.passingScore || 80) 
                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                                    : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                                }`}>
                                  {score.score}%
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Display active certificates code list */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-black text-brand-gold border-r-2 border-brand-gold pr-2">
                          {lang === "ar" ? "شهادات التقدير الحاصل عليها:" : "Certificates of Appreciation Earned:"}
                        </h4>
                        
                        {loggedInStudent.certificates?.length === 0 ? (
                          <div className="bg-brand-dark/40 p-4 rounded-xl border border-brand-electric/10 text-center text-xs text-slate-400 leading-normal py-4">
                            {lang === "ar" 
                              ? "تحصل على الشهادات تلقائياً عند نيل نسبة 80% فما فوق بالامتحانات." 
                              : "You will receive certificates automatically upon achieving 80% or more on exams."}
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-2">
                            {loggedInStudent.certificates.map((certCode: string) => (
                              <div key={certCode} className="bg-brand-dark/50 p-2.5 rounded-xl border border-brand-gold/20 text-center text-[10px] font-bold text-brand-gold space-y-1">
                                <Award className="w-5 h-5 mx-auto text-brand-gold animate-pulse" />
                                <span className="block truncate">{lang === "ar" ? "كود:" : "Code:"} {certCode}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Notifications Feed and profile detail (Left/Center) */}
                    <div className="lg:col-span-2 space-y-6">
                      
                      {/* Notifications from Mr. Mohamed Hussein */}
                      <div className="bg-brand-navy/60 border border-brand-electric/20 p-6 rounded-2xl space-y-4">
                        <h4 className="text-xs font-black text-white border-r-2 border-brand-electric pr-2 flex items-center gap-1.5">
                          <Bell className="w-4 h-4 text-brand-electric animate-bounce" />
                          {lang === "ar" ? "إشعارات الأستاذ والتنبيهات المباشرة:" : "Teacher Notifications & Direct Alerts:"}
                        </h4>

                        <div className="space-y-3">
                          {data.notifications?.map((not: any) => (
                            <div key={not.id} className="bg-brand-dark/40 p-4 rounded-xl border border-brand-electric/15 space-y-2 text-xs leading-relaxed">
                              <div className="flex justify-between items-center text-[10px] border-b border-brand-electric/10 pb-1.5">
                                <span className="text-brand-gold font-bold bg-brand-navy/50 px-2 py-0.5 rounded border border-brand-gold/15">{gt(not.targetGrade)}</span>
                                <span className="text-slate-400 font-mono">{not.date}</span>
                              </div>
                              <h5 className="font-black text-white">{gt(not.title)}</h5>
                              <p className="text-slate-300 leading-relaxed font-semibold">{gt(not.text)}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Contact assistants block */}
                      <div className="bg-brand-navy/60 border border-brand-electric/20 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="space-y-1.5 text-right w-full sm:w-auto">
                          <h4 className="text-xs font-black text-white">
                            {lang === "ar" ? "هل تواجه أي مشكلة تقنية أو صعوبة بالمنصة؟" : "Are you facing any technical problems or difficulties on the platform?"}
                          </h4>
                          <p className="text-[10px] text-slate-300 font-semibold">
                            {lang === "ar" 
                              ? "مساعدو الأستاذ متواجدون لمساعدتك فورًا لتسجيل حسابك وتفعيل الأكواد اليدوية." 
                              : "The teacher's assistants are available to help you immediately to register your account and activate manual codes."}
                          </p>
                        </div>
                        
                        <a 
                          href={`https://wa.me/${data.hero?.whatsapp}`}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow transition-all flex items-center justify-center gap-1.5"
                        >
                          <Phone className="w-4 h-4" />
                          {lang === "ar" ? "تواصل مع الدعم الفني 🟢" : "Contact Technical Support 🟢"}
                        </a>
                      </div>

                    </div>

                  </div>
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="bg-brand-dark/95 border-t border-brand-electric/15 pt-12 pb-28 md:py-12 text-center text-slate-300 text-xs shrink-0 space-y-6">
        {/* Footer Brand Logo */}
        <div className="flex flex-col items-center justify-center space-y-3 group/footer">
          <PremiumLogo imgHeightClass="h-12" scaleOnHover={true} />
          <div className="space-y-0.5">
            <h4 className="text-sm font-black text-white tracking-tight">{lang === "ar" ? t.ar.brand : t.en.brand}</h4>
            <p className="text-[10px] text-brand-gold font-bold tracking-wide">{lang === "ar" ? t.ar.subBrand : t.en.subBrand}</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-center gap-6 text-slate-200 font-semibold">
          <span className="flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-brand-electric" />
            {lang === "ar" ? "شرح الكيمياء والعلوم للمرحلة الثانوية" : "Chemistry & Science for High School Phase"}
          </span>
          <span className="hidden sm:inline text-brand-electric/30">•</span>
          <span className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-brand-gold" />
            {lang === "ar" ? "امتحانات تفاعلية وشهادات تقدير معتمدة" : "Interactive Exams & Certified Appreciation Certificates"}
          </span>
          <span className="hidden sm:inline text-brand-electric/30">•</span>
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-brand-electric" />
            {lang === "ar" ? "مذكرات وتلخيصات PDF جاهزة للتحميل" : "Ready-to-Download PDF Notes & Summaries"}
          </span>
        </div>
        


        <div className="text-[11px] sm:text-xs text-slate-400/85 font-semibold tracking-wide border-t border-slate-800/60 pt-6 max-w-2xl mx-auto" id="footer-copyright-text">
          {lang === "ar" 
            ? `جميع الحقوق محفوظة للأستاذ ${data?.teachers?.[0]?.name || "محمد حسين"} © ${new Date().getFullYear()} • جودة وتفوق علمي مضمون` 
            : `All rights reserved to Mr. ${gt(data?.teachers?.[0]?.name || "Mohamed Hussein")} © ${new Date().getFullYear()} • Guaranteed Quality & Excellence`}
        </div>
      </footer>

      {/* Quick Inquiry Drawer Overlay */}
      <AnimatePresence>
        {showInquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowInquiry(false)}
              className="absolute inset-0 bg-brand-dark/85 backdrop-blur-md"
            ></motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative z-10 w-full max-w-md bg-brand-navy/90 border border-brand-electric/30 rounded-3xl p-6 shadow-2xl text-slate-100 text-right space-y-4"
            >
              <div className="flex items-center justify-between border-b border-brand-electric/20 pb-3">
                <button 
                  onClick={() => setShowInquiry(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-brand-royal cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <h3 className="font-bold text-white flex items-center gap-2">
                  <Search className="w-5 h-5 text-brand-electric" />
                  {lang === "ar" ? "بوابة الاستعلام السريع 🔐" : "Quick Inquiry Gateway 🔐"}
                </h3>
              </div>

              <form onSubmit={handleInquiry} className="space-y-4">
                <div className="space-y-1 text-xs">
                  <label className="text-xs font-bold text-slate-300 block">{lang === "ar" ? "أدخل رقم هاتف الطالب المسجل:" : "Enter registered student phone number:"}</label>
                  <div className="relative">
                    <input 
                      type="tel" 
                      value={searchPhone}
                      onChange={(e) => setSearchPhone(e.target.value)}
                      placeholder={lang === "ar" ? "رقم الموبايل (مثال: 01011223344)" : "Mobile number (e.g. 01011223344)"}
                      className="w-full py-3 px-4 pl-10 text-right rounded-xl border border-brand-electric/25 bg-brand-dark/60 text-white outline-none"
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-brand-electric hover:bg-brand-electric/95 text-white font-black rounded-xl transition-all shadow-md cursor-pointer text-xs"
                >
                  {lang === "ar" ? "التحقق والاستعلام عن كارت الطالب 🔎" : "Verify & Query Student Card 🔎"}
                </button>
              </form>

              {searchError && (
                <p className="text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl flex items-center gap-1.5 justify-end">
                  <span>{gt(searchError)}</span>
                  <AlertCircle className="w-4 h-4 shrink-0" />
                </p>
              )}

              {searchResult && (
                <div className="bg-brand-dark/70 p-4 rounded-2xl border border-brand-electric/20 space-y-3">
                  <div className="flex items-center justify-between text-[10px] text-brand-gold font-bold border-b border-brand-electric/15 pb-2">
                    <span>{lang === "ar" ? "كود الكارت:" : "Card Code:"} {searchResult.id}</span>
                    <span className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 px-2 py-0.5 rounded font-black">
                      {lang === "ar" ? "اشتراك نشط ومسجل ✅" : "Active & Registered Subscription ✅"}
                    </span>
                  </div>
                  
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">{lang === "ar" ? "الطالب:" : "Student:"}</span>
                      <strong className="text-white font-black">{searchResult.fullName}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">{lang === "ar" ? "الصف الدراسي:" : "Grade:"}</span>
                      <span className="text-brand-gold font-bold">{gt(searchResult.grade)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">{lang === "ar" ? "المدرسة الحالية:" : "Current School:"}</span>
                      <span className="text-slate-200">{searchResult.school}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">{lang === "ar" ? "تاريخ التسجيل:" : "Registration Date:"}</span>
                      <span className="text-slate-300 font-mono">{searchResult.createdAt}</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Vodafone Cash Payment Modal Overlay */}
      <AnimatePresence>
        {showVodafoneModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowVodafoneModal(false)}
              className="absolute inset-0 bg-brand-dark/85 backdrop-blur-md"
            ></motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative z-10 w-full max-w-md bg-brand-navy/90 border border-brand-electric/30 rounded-3xl p-6 shadow-2xl text-slate-100 text-right space-y-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-brand-electric/20 pb-4">
                <button 
                  onClick={() => setShowVodafoneModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-brand-royal cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <h3 className="font-black text-white flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-rose-500 animate-pulse" />
                  {lang === "ar" ? "الدفع عبر Vodafone Cash" : "Pay via Vodafone Cash"}
                </h3>
              </div>

              {/* Number presentation */}
              <div className="bg-brand-dark/50 p-5 rounded-2xl border border-brand-electric/15 text-center space-y-2">
                <span className="text-xs font-bold text-slate-400 block">
                  {lang === "ar" ? "رقم فودافون كاش للمنصة:" : "Platform Vodafone Cash Number:"}
                </span>
                <span className="text-2xl font-black text-brand-gold tracking-widest block font-mono">
                  01001944136
                </span>
                
                <button
                  onClick={() => {
                    navigator.clipboard.writeText("01001944136");
                    setCopiedVodafone(true);
                    setTimeout(() => setCopiedVodafone(false), 2000);
                  }}
                  className="mt-2 inline-flex items-center gap-1.5 px-4 py-1.5 bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 hover:text-rose-300 font-bold text-xs rounded-xl border border-rose-500/20 transition-all cursor-pointer"
                >
                  {copiedVodafone ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{lang === "ar" ? "تم نسخ رقم فودافون كاش." : "Vodafone Cash number copied."}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{lang === "ar" ? "نسخ الرقم" : "Copy Number"}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Price details */}
              <div className="bg-brand-royal/20 p-4 rounded-2xl border border-brand-electric/30 text-center space-y-1">
                <span className="text-xs font-bold text-slate-400 block">
                  {lang === "ar" ? "قيمة الاشتراك الشهري المطلوب تحويلها:" : "Monthly Subscription Amount to Transfer:"}
                </span>
                <span className="text-xl font-black text-brand-gold">
                  150 {lang === "ar" ? "جنيه مصري" : "EGP"}
                </span>
              </div>

              {/* Instructions */}
              <div className="space-y-3 text-xs leading-relaxed text-slate-300 font-semibold">
                <div className="flex gap-2.5 items-start justify-end text-right">
                  <span>قم بتحويل قيمة الاشتراك الشهري (150 جنيه) إلى رقم فودافون كاش الموضح.</span>
                  <span className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                </div>
                <div className="flex gap-2.5 items-start justify-end text-right">
                  <span>احتفظ بصورة إيصال التحويل.</span>
                  <span className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                </div>
                <div className="flex gap-2.5 items-start justify-end text-right">
                  <span>بعد التحويل اضغط على <strong>"إرسال بيانات الاشتراك"</strong> لإرسال بياناتك وصورة الإيصال.</span>
                  <span className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                </div>
                <div className="flex gap-2.5 items-start justify-end text-right text-brand-gold font-bold">
                  <span>بمجرد إرسال البيانات والإيصال، سيتم تزويدك باليوزر والباسورد الخاص بك فورًا لتسجيل الدخول للمنصة.</span>
                  <span className="w-2 h-2 rounded-full bg-brand-gold mt-1.5 shrink-0" />
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-3">
                <a
                  href={`https://wa.me/201001944136?text=${encodeURIComponent(
                    lang === "ar"
                      ? "السلام عليكم،\nلقد قمت بتحويل قيمة الاشتراك الشهري (150 جنيه) عبر فودافون كاش إلى الرقم 01001944136.\nأريد الحصول على اليوزر والباسورد الخاص بي لتسجيل الدخول وتفعيل اشتراكي.\nسأرسل الآن صورة إيصال التحويل."
                      : "Hello, I have transferred the monthly subscription fee (150 EGP) via Vodafone Cash to 01001944136.\nI would like to get my username and password to log in and activate my subscription.\nI will send the receipt image now."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-black rounded-xl text-center shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-xs"
                >
                  <Phone className="w-4 h-4" />
                  {lang === "ar" ? "التواصل عبر واتساب" : "Contact via WhatsApp"}
                </a>

                <button
                  onClick={() => {
                    setShowVodafoneModal(false);
                    setActiveTab("register");
                  }}
                  className="w-full py-3 bg-brand-electric hover:bg-brand-electric/90 text-white font-black rounded-xl text-center shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-xs"
                >
                  <Send className="w-4 h-4" />
                  {lang === "ar" ? "إرسال بيانات الاشتراك" : "Send Subscription Details"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FIXED MOBILE BOTTOM NAVIGATION BAR */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-[999] h-[68px] bg-[#08111F]/95 backdrop-blur-md border-t border-[#C9A14A]/25 shadow-[0_-4px_24px_rgba(8,17,31,0.85)] md:hidden flex justify-around items-center px-2 pb-safe ${
          lang === "ar" ? "font-['Cairo'] flex-row-reverse" : "font-['Poppins'] flex-row"
        }`}
      >
        {/* Home Tab */}
        <button
          onClick={() => { setActiveTab("home"); setMobileMenuOpen(false); }}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all duration-300 relative cursor-pointer active:scale-95 ${
            activeTab === "home" ? "text-[#C9A14A]" : "text-slate-400 hover:text-white"
          }`}
        >
          <Home className="w-5 h-5 mb-1 shrink-0" />
          <span className="text-[10px] font-black">{lang === "ar" ? "الرئيسية" : "Home"}</span>
          {activeTab === "home" && (
            <span className="absolute bottom-0 w-1.5 h-1.5 rounded-full bg-[#C9A14A]" />
          )}
        </button>

        {/* Lectures/Courses Tab */}
        <button
          onClick={() => { setActiveTab("courses"); setMobileMenuOpen(false); }}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all duration-300 relative cursor-pointer active:scale-95 ${
            activeTab === "courses" ? "text-[#C9A14A]" : "text-slate-400 hover:text-white"
          }`}
        >
          <BookOpen className="w-5 h-5 mb-1 shrink-0" />
          <span className="text-[10px] font-black">{lang === "ar" ? "المحاضرات" : "Lectures"}</span>
          {activeTab === "courses" && (
            <span className="absolute bottom-0 w-1.5 h-1.5 rounded-full bg-[#C9A14A]" />
          )}
        </button>

        {/* Exams Tab */}
        <button
          onClick={() => { setActiveTab("exams"); setMobileMenuOpen(false); }}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all duration-300 relative cursor-pointer active:scale-95 ${
            activeTab === "exams" ? "text-[#C9A14A]" : "text-slate-400 hover:text-white"
          }`}
        >
          <FileText className="w-5 h-5 mb-1 shrink-0" />
          <span className="text-[10px] font-black">{lang === "ar" ? "الامتحانات" : "Exams"}</span>
          {activeTab === "exams" && (
            <span className="absolute bottom-0 w-1.5 h-1.5 rounded-full bg-[#C9A14A]" />
          )}
        </button>

        {/* Student Portal Tab */}
        <button
          onClick={() => { setActiveTab("portal"); setMobileMenuOpen(false); }}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all duration-300 relative cursor-pointer active:scale-95 ${
            activeTab === "portal" ? "text-[#C9A14A]" : "text-slate-400 hover:text-white"
          }`}
        >
          <UserCheck className="w-5 h-5 mb-1 shrink-0" />
          <span className="text-[10px] font-black">{lang === "ar" ? "بوابة الطالب" : "Portal"}</span>
          {activeTab === "portal" && (
            <span className="absolute bottom-0 w-1.5 h-1.5 rounded-full bg-[#C9A14A]" />
          )}
        </button>

      </div>
    </div>
  );
}
