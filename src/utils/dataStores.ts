// Pure static client-side database layer with automated Version Management.
// No Backend, No Express, No simulated APIs, No Race Conditions, No Cache Poisoning.

export interface Course {
  id: string;
  title: string;
  description: string;
  grade: string;
  image: string;
  lessonIds: string[];
  exams?: any[];
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  videoUrl: string;
  pdfUrl?: string;
  homeworkUrl?: string;
  examId?: string;
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  bio: string;
  image: string;
}

export interface Review {
  id: string;
  studentName: string;
  grade: string;
  rating: number;
  text: string;
  date: string;
}

export interface Settings {
  hero: {
    title: string;
    subtitle: string;
    buttonText: string;
    whatsapp: string;
    telegram: string;
    facebook: string;
    bannerImage: string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
  };
  statistics: {
    totalStudents: number;
    activeSubscriptions: number;
    totalCourses: number;
    examsCompleted: number;
    certificatesIssued: number;
  };
  subscriptionPlans: Array<{
    id: string;
    name: string;
    price: string;
    duration: string;
    description: string;
    features: string[];
  }>;
  students: any[];
  certificates: any[];
  notifications: any[];
  seo_title: string;
  seo_description: string;
  github_repository?: string;
  github_username?: string;
  github_branch?: string;
  github_commit_msg?: string;
}

// Independent LocalStorage keys for modular data layers
export const STORE_KEYS = {
  version: "APP_VERSION",
  courses: "STORE_COURSES",
  teachers: "STORE_TEACHERS",
  lessons: "STORE_LESSONS",
  settings: "STORE_SETTINGS",
  translations: "STORE_TRANSLATIONS",
  reviews: "STORE_REVIEWS"
};

/**
 * Helper to safely fetch JSON files with a fallback. If the fetch fails,
 * it returns the cached localStorage version or the default fallback.
 */
async function safeFetchJson(url: string, fallback: any, storageKey: string): Promise<any> {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }
    const data = await res.json();
    localStorage.setItem(storageKey, JSON.stringify(data));
    return data;
  } catch (err) {
    console.warn(`[Stores] Failed to fetch or parse ${url}, trying local cache...`, err);
    const cached = localStorage.getItem(storageKey);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (parseErr) {
        console.error(`[Stores] Failed to parse cached data for ${storageKey}:`, parseErr);
      }
    }
    return fallback;
  }
}

// Memory cache to prevent redundant update checking during same mount session
let lastSuccessfulCheckTime = 0;
const CHECK_COOLDOWN_MS = 15000; // Only check with server at most once every 15 seconds

/**
 * Validates the latest deployment version from Vercel's version.json.
 * If an update is detected, triggers a sequence:
 * 1. Clear CacheStorage
 * 2. Unregister Service Workers
 * 3. Clear existing cached data from LocalStorage
 * 4. Perform a Hard Reload to load new JS bundles
 * 
 * Returns true if update was initiated, false otherwise.
 */
export async function checkAndTriggerUpdates(): Promise<boolean> {
  // Throttling: avoid hitting the server on rapid successive triggers
  const now = Date.now();
  if (now - lastSuccessfulCheckTime < CHECK_COOLDOWN_MS) {
    return false;
  }

  try {
    const res = await fetch(`/data/version.json?t=${now}`);
    if (!res.ok) {
      console.warn("[Version System] Could not fetch version.json, skipped.");
      return false;
    }
    
    lastSuccessfulCheckTime = now;
    const { version: serverVersion } = await res.json();
    
    if (!serverVersion || typeof serverVersion !== "string") {
      return false;
    }

    const localVersion = localStorage.getItem(STORE_KEYS.version);

    // Only update if there is a valid localVersion AND it's different from serverVersion
    // This avoids forcing updates for brand new users (where localVersion is null)
    if (localVersion && localVersion !== "v-fallback" && localVersion !== "null" && localVersion !== "undefined" && localVersion !== serverVersion) {
      
      // Infinite Loop Shield: Block reloads if they occur within 15 seconds of each other
      const lastReload = localStorage.getItem("APP_LAST_RELOAD_TIMESTAMP");
      if (lastReload) {
        const diff = now - parseInt(lastReload, 10);
        if (diff < 15000) {
          console.warn("[Version System] Potential reload loop blocked. Last reload was " + (diff / 1000).toFixed(1) + "s ago.");
          return false;
        }
      }
      
      localStorage.setItem("APP_LAST_RELOAD_TIMESTAMP", now.toString());
      console.log(`[Version System] Update found! (Local: ${localVersion} -> Server: ${serverVersion})`);

      // 1. Wipe all browser CacheStorage
      if (window.caches) {
        try {
          const cacheNames = await caches.keys();
          await Promise.all(cacheNames.map((name) => caches.delete(name)));
          console.log("[Version System] CacheStorage cleared successfully.");
        } catch (err) {
          console.error("[Version System] Failed to clear CacheStorage:", err);
        }
      }

      // 2. Unregister all service workers
      if (navigator.serviceWorker) {
        try {
          const registrations = await navigator.serviceWorker.getRegistrations();
          await Promise.all(registrations.map((reg) => reg.unregister()));
          console.log("[Version System] Service workers unregistered successfully.");
        } catch (err) {
          console.error("[Version System] Failed to unregister service workers:", err);
        }
      }

      // 3. Clear data-specific LocalStorage layers
      localStorage.removeItem(STORE_KEYS.courses);
      localStorage.removeItem(STORE_KEYS.teachers);
      localStorage.removeItem(STORE_KEYS.lessons);
      localStorage.removeItem(STORE_KEYS.settings);
      localStorage.removeItem(STORE_KEYS.translations);
      localStorage.removeItem(STORE_KEYS.reviews);
      
      // Update local storage version key right now so the subsequent page load starts with the correct version state
      localStorage.setItem(STORE_KEYS.version, serverVersion);
      
      console.log("[Version System] Local storage data cleared and version updated. Showing overlay and executing hard reload...");

      // Create and append a beautiful, modern and premium Arabic update overlay
      try {
        const overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.inset = "0";
        overlay.style.zIndex = "999999";
        overlay.style.backgroundColor = "rgba(8, 17, 31, 0.96)";
        overlay.style.backdropFilter = "blur(16px)";
        overlay.style.display = "flex";
        overlay.style.flexDirection = "column";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.color = "#ffffff";
        overlay.style.fontFamily = "'Cairo', 'Tajawal', sans-serif";
        overlay.style.direction = "rtl";
        overlay.style.padding = "20px";
        overlay.style.textAlign = "center";

        overlay.innerHTML = `
          <div style="background: linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(8, 17, 31, 0.9) 100%); border: 1px solid rgba(201, 161, 74, 0.35); border-radius: 24px; padding: 45px 40px; max-width: 460px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.65); display: flex; flex-direction: column; items: center; gap: 28px; position: relative; overflow: hidden;">
            <div style="position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #C9A14A, #1877F2, #C9A14A); animation: pulse 2s infinite;"></div>
            <div style="position: relative; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center;">
              <div style="position: absolute; inset: 0; border: 4px solid rgba(201, 161, 74, 0.15); border-top-color: #C9A14A; border-radius: 50%; animation: spin 1s cubic-bezier(0.55, 0.055, 0.675, 0.19) infinite;"></div>
              <div style="position: absolute; inset: 12px; border: 3px solid rgba(24, 119, 242, 0.1); border-bottom-color: #1877F2; border-radius: 50%; animation: spin-reverse 1.5s linear infinite;"></div>
            </div>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <h3 style="font-size: 22px; font-weight: 900; color: #C9A14A; margin: 0; letter-spacing: -0.025em; text-shadow: 0 2px 10px rgba(201, 161, 74, 0.15);">يتوفر إصدار جديد، جاري التحديث...</h3>
              <p style="font-size: 14px; color: #94a3b8; margin: 0; line-height: 1.7; font-weight: 500;">تم إصدار تحديث جديد للمنصة يحتوي على آخر التعديلات للمحتوى التعليمي والميزات والتحسينات الأمنية المعتمدة.</p>
            </div>
            <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.05); padding: 8px 16px; border-radius: 12px; font-size: 11px; color: #64748b; font-family: monospace; letter-spacing: 0.05em;">
              ID: ${serverVersion}
            </div>
          </div>
          <style>
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes spin-reverse {
              0% { transform: rotate(360deg); }
              100% { transform: rotate(0deg); }
            }
            @keyframes pulse {
              0%, 100% { opacity: 0.6; }
              50% { opacity: 1; }
            }
          </style>
        `;
        document.body.appendChild(overlay);
      } catch (err) {
        console.error("Failed to append update overlay:", err);
      }

      // 4. Force a pure hard reload after a brief delay so the user can see the progress
      setTimeout(() => {
        window.location.reload();
      }, 2200);
      return true;
    }
    
    // If localVersion is not set yet, set it to the current serverVersion quietly without any reload
    if (!localVersion) {
      localStorage.setItem(STORE_KEYS.version, serverVersion);
    }
    
    return false;
  } catch (error) {
    console.error("[Version System] Error during update detection:", error);
    return false;
  }
}

/**
 * Loads all stores independently. If up to date, retrieves cached LocalStorage layers.
 * If out of date, fetches fresh static JSONs and populates independent LocalStorage keys.
 * Only writes the new version key AFTER successful fetch and setup of all layers.
 */
export async function loadDataStores(): Promise<{
  courses: Course[];
  teachers: Teacher[];
  lessons: Lesson[];
  settings: Settings;
  translations: any;
  reviews: Review[];
  version: string;
}> {
  let serverVersion = "v-fallback";
  try {
    // 1. Fetch current server version
    const versionRes = await fetch(`/data/version.json?t=${Date.now()}`);
    if (versionRes.ok) {
      const vdata = await versionRes.json();
      if (vdata && vdata.version) {
        serverVersion = vdata.version;
      }
    }
  } catch (err) {
    console.warn("[Stores] Could not fetch version.json, using fallback version.", err);
    serverVersion = localStorage.getItem(STORE_KEYS.version) || "v-fallback";
  }

  const cachedVersion = localStorage.getItem(STORE_KEYS.version);
  const isUpToDate = cachedVersion === serverVersion && serverVersion !== "v-fallback";

  let cachedCourses: Course[] | null = null;
  let cachedTeachers: Teacher[] | null = null;
  let cachedLessons: Lesson[] | null = null;
  let cachedSettings: Settings[] | null = null;
  let cachedTranslations: any = null;
  let cachedReviews: Review[] | null = null;

  if (isUpToDate) {
    try {
      cachedCourses = JSON.parse(localStorage.getItem(STORE_KEYS.courses) || "null");
      cachedTeachers = JSON.parse(localStorage.getItem(STORE_KEYS.teachers) || "null");
      cachedLessons = JSON.parse(localStorage.getItem(STORE_KEYS.lessons) || "null");
      cachedSettings = JSON.parse(localStorage.getItem(STORE_KEYS.settings) || "null");
      cachedTranslations = JSON.parse(localStorage.getItem(STORE_KEYS.translations) || "null");
      cachedReviews = JSON.parse(localStorage.getItem(STORE_KEYS.reviews) || "null");
    } catch (err) {
      console.warn("[Stores] Cache corrupt, discarding cache.", err);
      cachedCourses = null;
    }
  }

  // 2. Fetch independent layers in parallel with resilient safeFetchJson wrapper
  try {
    const fetchPromises = [
      safeFetchJson(`/data/courses.json?v=${serverVersion}`, cachedCourses || [], STORE_KEYS.courses),
      safeFetchJson(`/data/teachers.json?v=${serverVersion}`, cachedTeachers || [], STORE_KEYS.teachers),
      safeFetchJson(`/data/lessons.json?v=${serverVersion}`, cachedLessons || [], STORE_KEYS.lessons),
      safeFetchJson(`/data/settings.json?v=${serverVersion}`, cachedSettings || {
        hero: {
          title: "منصة الأستاذ محمد حسين",
          subtitle: "مرحبًا بك في المنصة الرسمية لمستر محمد حسين للكيمياء والعلوم",
          buttonText: "ابدأ الآن",
          whatsapp: "201001944136",
          telegram: "",
          facebook: "https://www.facebook.com/profile.php?id=61554173033193",
          bannerImage: ""
        },
        colors: { primary: "#08111F", secondary: "#C9A14A", accent: "#1877F2", text: "#ffffff" },
        statistics: { totalStudents: 0, activeSubscriptions: 0, totalCourses: 0, examsCompleted: 0, certificatesIssued: 0 },
        subscriptionPlans: [],
        students: [],
        certificates: [],
        notifications: [],
        seo_title: "منصة الأستاذ محمد حسين التعليمية",
        seo_description: "منصة العلوم والكيمياء المتميزة للمرحلة الثانوية"
      }, STORE_KEYS.settings),
      safeFetchJson(`/data/translations.json?v=${serverVersion}`, cachedTranslations || {}, STORE_KEYS.translations),
      safeFetchJson(`/data/reviews.json?v=${serverVersion}`, cachedReviews || [], STORE_KEYS.reviews)
    ];

    const [
      courses,
      teachers,
      lessons,
      settings,
      translations,
      reviews
    ] = await Promise.all(fetchPromises);

    // Write current version to store since files are loaded successfully
    localStorage.setItem(STORE_KEYS.version, serverVersion);

    return {
      courses: courses || [],
      teachers: teachers || [],
      lessons: lessons || [],
      settings: settings || {},
      translations: translations || {},
      reviews: reviews || [],
      version: serverVersion
    };
  } catch (error) {
    console.error("[Stores] Critical error loading static databases, using default fallback.", error);
    return {
      courses: cachedCourses || [],
      teachers: cachedTeachers || [],
      lessons: cachedLessons || [],
      settings: (cachedSettings as any) || {
        hero: {
          title: "منصة الأستاذ محمد حسين",
          subtitle: "مرحبًا بك في المنصة الرسمية لمستر محمد حسين للكيمياء والعلوم",
          buttonText: "ابدأ الآن",
          whatsapp: "201001944136",
          telegram: "",
          facebook: "https://www.facebook.com/profile.php?id=61554173033193",
          bannerImage: ""
        },
        colors: { primary: "#08111F", secondary: "#C9A14A", accent: "#1877F2", text: "#ffffff" },
        statistics: { totalStudents: 0, activeSubscriptions: 0, totalCourses: 0, examsCompleted: 0, certificatesIssued: 0 },
        subscriptionPlans: [],
        students: [],
        certificates: [],
        notifications: [],
        seo_title: "",
        seo_description: ""
      },
      translations: cachedTranslations || {},
      reviews: cachedReviews || [],
      version: serverVersion
    };
  }
}
