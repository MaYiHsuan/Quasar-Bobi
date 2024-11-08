<template>
  <q-page class="flex flex-center">
    <main class="main-content">
      <section class="gallery-container">
        <div class="image-row">
          <div
            v-for="(image, index) in galleryImages"
            :key="index"
            class="image-item"
            :class="{
              expanded: selectedIndex === index,
              collapsed: selectedIndex !== null && selectedIndex !== index,
            }"
            @click="toggleImage(index)"
          >
            <div class="image-wrapper">
              <img :src="image.url" :alt="image.title" class="gallery-image" />
              <div class="image-overlay" v-show="selectedIndex === index">
                <h3 class="image-title">{{ image.title }}</h3>
                <p class="image-description">{{ image.description }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="titletext">
          <p class="bobiTitle">Medbobi</p>
          <div class="yellow-line-1"></div>
          <p class="h1text">
            致力於打造全方位智慧醫療生態系統，運用創新科技整合<br />
            醫療資源，為您提供更優質、更便捷的醫療服務體驗
          </p>
          <button class="titlebutton" @click="showLoginModal">
            登入立即體驗
          </button>
        </div>
        <LoginView
          v-if="isLoginModalVisible"
          @close="hideLoginModal"
          @login-success="handleLoginSuccess"
        />
      </section>

      <div class="hero-section">
        <div class="gradient-container">
          <div
            ref="fadeInElement"
            :class="{ 'fade-in': fadeInAnimated }"
            class="text-content element"
          >
            <div class="brand-name slide-in-left">醫護聲易通 Medbobi</div>
            <div class="slogan">
              "智慧對話，專業解答，
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;為您提供最貼心的服務"
            </div>
          </div>
          <div class="phone-container">
            <div class="phone phone-top"></div>
            <div class="phone phone-bottom"></div>
          </div>
        </div>
      </div>

      <div class="blue-container">
        <div class="ai-section">
          <div
            ref="slideInLeftElement"
            :class="{ 'slide-in-left': slideInLeftAnimated }"
            class="ai-image-container element"
          >
            <img src="/images/Macbook Air.png" alt="AI診斷" class="ai-image" />
          </div>
          <div
            ref="slideInRightElement"
            :class="{ 'slide-in-right': slideInRightAnimated }"
            class="ai-content element"
          >
            <div class="ai-text">
              <h2 class="ai-title">AI 輔助診斷</h2>
              <div class="yellow-line-2"></div>
              <ul class="feature-list">
                <li class="feature-item">運用LLM協助語音診斷</li>
                <li class="feature-item">提升診斷準確度</li>
                <li class="feature-item">縮短就診等待時間</li>
                <li class="feature-item">即時分析病症資料</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <section class="services-section">
        <h2 class="section-title">服務項目</h2>
        <div class="doctor-grid">
          <div class="doctor-image" @click="goToService">
            <img
              src="/images/male-doctor-with-stethoscope-and-clipboard.jpg"
              alt="門診紀錄"
            />
            <div class="overlay">
              <span class="material-symbols-outlined icon">stethoscope</span>
              <span class="iconTitle">門診紀錄</span>
            </div>
          </div>
          <div class="doctor-image" @click="goToService">
            <img
              src="/images/female-medical-professional-holds-clipboard-in-hospital-room.jpg"
              alt="護理紀錄"
            />
            <div class="overlay">
              <span class="material-symbols-outlined icon"
                >medication_liquid</span
              >
              <span class="iconTitle">護理紀錄</span>
            </div>
          </div>
          <div class="doctor-image" @click="goToService">
            <img src="/images/team-taking-meeting-notes.jpg" alt="會議紀錄" />
            <div class="overlay">
              <span class="material-symbols-outlined icon">clinical_notes</span>
              <span class="iconTitle">會議紀錄</span>
            </div>
          </div>
          <div class="doctor-image" @click="goToService">
            <img src="/images/doctor-approaches-patient.jpg" alt="住院摘要" />
            <div class="overlay">
              <span class="material-symbols-outlined icon">home_health</span>
              <span class="iconTitle">住院摘要</span>
            </div>
          </div>
          <div class="doctor-image" @click="goToService">
            <img src="/images/nurse-helping-patient.jpg" alt="衛教諮詢" />
            <div class="overlay">
              <span class="material-symbols-outlined icon">vaccines</span>
              <span class="iconTitle">衛教諮詢</span>
            </div>
          </div>
          <div class="doctor-image" @click="goToService">
            <img src="/images/medical-doctors-desk.jpg" alt="其他服務" />
            <div class="overlay">
              <span class="material-symbols-outlined icon">info</span>
              <span class="iconTitle">其他服務</span>
            </div>
          </div>
        </div>
      </section>

      <LoginView
        v-if="isLoginModalVisible"
        @close="hideLoginModal"
        @login-success="handleLoginSuccess"
      />
    </main>
  </q-page>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from "vue";
import { useRouter } from "vue-router"; // 引入 useRouter
import LoginView from "./Login.vue";

export default defineComponent({
  name: "IndexPage",
  components: {
    LoginView,
  },
  setup() {
    const router = useRouter(); // 獲取 router 實例

    // 跳轉到服務頁面的方法
    const goToService = () => {
      router.push("/service");
    };

    // 登入模態框的狀態
    const isLoginModalVisible = ref(false);

    // 登入相關方法
    const showLoginModal = () => {
      isLoginModalVisible.value = true;
      document.body.style.overflow = "hidden";
    };

    const hideLoginModal = () => {
      isLoginModalVisible.value = false;
      document.body.style.overflow = "auto";
    };

    const handleLoginSuccess = () => {
      console.log("Login successful:");
      hideLoginModal();
      // 可以添加其他登入成功後的邏輯
    };

    // 控制動畫的狀態
    const fadeInAnimated = ref(false);
    const slideInLeftAnimated = ref(false);
    const slideInRightAnimated = ref(false);

    // 圖片切換的狀態和數據
    const selectedIndex = ref<number | null>(0);
    const galleryImages = ref([
      {
        url: "/images/pexels-gustavo-fring-3985163.jpg",
        title: "專業醫療團隊",
        description: "我們的專業醫療團隊提供全方位醫療照護服務",
      },
      {
        url: "/images/doctor-approaches-patient.jpg",
        title: "細心照護",
        description: "以病人為中心的貼心護理服務",
      },
      {
        url: "/images/doctors-medical-gear.jpg",
        title: "醫療諮詢",
        description: "提供專業的醫療諮詢與建議",
      },
      {
        url: "/images/hospital-room-interior.jpg",
        title: "完整紀錄",
        description: "詳實的醫療記錄管理系統",
      },
    ]);

    const toggleImage = (index) => {
      selectedIndex.value = selectedIndex.value === index ? null : index;
    };

    const fadeInElement = ref<HTMLElement | null>(null);
    const slideInLeftElement = ref<HTMLElement | null>(null);
    const slideInRightElement = ref<HTMLElement | null>(null);

    onMounted(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === fadeInElement.value) {
              fadeInAnimated.value = true;
            } else if (entry.target === slideInLeftElement.value) {
              slideInLeftAnimated.value = true;
            } else if (entry.target === slideInRightElement.value) {
              slideInRightAnimated.value = true;
            }
            observer.unobserve(entry.target);
          }
        });
      });

      if (fadeInElement.value) observer.observe(fadeInElement.value);
      if (slideInLeftElement.value) observer.observe(slideInLeftElement.value);
      if (slideInRightElement.value)
        observer.observe(slideInRightElement.value);
    });

    return {
      isLoginModalVisible,
      showLoginModal,
      hideLoginModal,
      handleLoginSuccess,
      selectedIndex,
      galleryImages,
      toggleImage,
      fadeInAnimated,
      slideInLeftAnimated,
      slideInRightAnimated,
      fadeInElement,
      slideInLeftElement,
      slideInRightElement,
      goToService, // 將 goToService 暴露給模板
    };
  },
});
</script>

<style scoped>
@import "../assets/styles/HomeStyles.css";
</style>
