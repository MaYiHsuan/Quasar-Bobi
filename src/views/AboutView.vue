<template>
  <div class="hero-section" style="margin-top: 60px">
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
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from "vue";

export default defineComponent({
  name: "AboutPage",
  setup() {
    // 控制動畫的狀態
    const fadeInAnimated = ref(false);
    const slideInLeftAnimated = ref(false);
    const slideInRightAnimated = ref(false);

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
      toggleImage,
      fadeInAnimated,
      slideInLeftAnimated,
      slideInRightAnimated,
      fadeInElement,
      slideInLeftElement,
      slideInRightElement,
    };
  },
});
</script>

<style scoped>
@import "../assets/styles/HomeStyles.css";
</style>
