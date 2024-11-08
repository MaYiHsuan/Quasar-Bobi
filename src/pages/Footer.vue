<template>
  <footer class="footer" ref="footer">
    <div class="footer-container">
      <!-- 公司資訊 -->
      <div class="footer-section" :class="{ 'fade-in': isVisible }">
        <h2 class="company-title">MedBobi</h2>

        <h3 class="company-subtitle">醫護易聲通</h3>
        <div>
          <p>總機：+886-2-0122-1234</p>
          <p>傳真：+886-2-0122-1234</p>
          <p>手機：+886-2-0122-1234</p>
          <p>Email：@.com.tw</p>
        </div>
      </div>

      <!-- 院區資訊 -->
      <div class="footer-section" :class="{ 'fade-in': isVisible }">
        <div class="section-title">院區資訊</div>
        <div class="section-underline"></div>
        <div class="hospital-info">
          <h3>中興院區</h3>
          <p>新竹縣竹東鎮中興路四段195號</p>
        </div>
        <div class="hospital-info">
          <h3>光復院區</h3>
          <p>新竹市光復路二段321號1館</p>
        </div>
      </div>

      <!-- 服務項目 -->
      <div class="footer-section" :class="{ 'fade-in': isVisible }">
        <div class="section-title">服務內容</div>
        <div class="section-underline"></div>
        <ul class="service-list">
          <li>門診紀錄</li>
          <li>護理紀錄</li>
          <li>會議紀錄</li>
          <li>住院摘要</li>
          <li>阿茲海默症衛教</li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComp",
  data() {
    return {
      isVisible: false,
      observer: null,
    };
  },
  mounted() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.isVisible = true;
          this.observer.disconnect(); // 停止觀察
        }
      });
    });

    this.observer.observe(this.$refs.footer);
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  },
};
</script>

<style scoped>
.company-title {
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
  color: #ffe66d;
}

.company-subtitle {
  font-size: 1.2rem;
  margin: 0.5rem 0 1.5rem 0;
  padding-bottom: 1rem;
  border-bottom: 2px solid #ffe66d;
  width: 100%;
}

.footer {
  background-color: #19867e;
  color: white;
  padding: 3rem 3rem;
  width: 100%;
  display: flex;
  justify-content: center;
}

.footer-container {
  max-width: 1360px;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: 10rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  opacity: 0; /* 初始不透明度 */
  transition: opacity 0.5s ease-in, transform 0.5s ease-in;
  transform: translateY(20px); /* 初始位置 */
}

.fade-in {
  opacity: 1; /* 可見時的透明度 */
  transform: translateY(0); /* 恢復原位 */
}

.section-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #ffe66d;
}

.section-underline {
  width: 100%;
  height: 2px;
  background-color: #ffe66d;
  margin-bottom: 1.5rem;
}

.hospital-info {
  margin-bottom: 1.5rem;
}

.hospital-info h3 {
  font-size: 1.1rem;
  margin: 0 0 0.5rem 0;
  color: white;
}

.hospital-info p {
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
}

.service-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.service-list li {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  line-height: 1.5;
}

/* 響應式設計 */
@media (max-width: 1024px) {
  .footer-container {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }

  .footer-section:first-child {
    grid-column: 1 / -1;
  }

  .company-subtitle,
  .section-underline {
    width: 80%;
  }

  .contact-info,
  .hospital-info,
  .service-list {
    width: 100%;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    padding: 0 1.5rem;
  }

  .footer-section {
    align-items: center;
    text-align: center;
    padding: 0;
  }

  .company-title {
    font-size: 1.75rem;
  }

  .company-subtitle,
  .section-title {
    font-size: 1.1rem;
  }

  .contact-info p,
  .hospital-info p,
  .service-list li {
    font-size: 0.95rem;
  }
}
</style>
