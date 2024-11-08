<template>
  <header class="header">
    <nav class="nav-container">
      <h1 class="brand">MedBobi</h1>
      <div class="left-section">
        <div class="nav-buttons">
          <div v-for="item in navItems" :key="item.title" class="nav-item">
            <button class="nav-button" @click="navigate(item.link)">
              {{ item.title }}
              <span v-if="item.subItems" class="arrow">▼</span>
            </button>
            <div v-if="item.subItems" class="dropdown-menu">
              <div
                v-for="subItem in item.subItems"
                :key="subItem.title"
                class="dropdown-item"
                @click="navigate(subItem.link)"
              >
                {{ subItem.title }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="right-section">
        <div class="language-selector" v-click-outside="closeLanguageMenu">
          <button class="lang-button" @click.stop="toggleLanguageMenu">
            {{ selectedLanguage }}
            <span class="arrow" :class="{ 'arrow-up': isLanguageMenuOpen }"
              >▼</span
            >
          </button>
          <transition name="fade">
            <div v-if="isLanguageMenuOpen" class="language-menu">
              <button
                v-for="lang in languages"
                :key="lang.code"
                class="language-option"
                @click="selectLanguage(lang)"
              >
                {{ lang.name }}
              </button>
            </div>
          </transition>
        </div>

        <button class="login-button" @click="showLoginModal">
          <span class="login-icon">➜</span>
          登入
        </button>
      </div>
    </nav>
    <LoginView
      v-if="isLoginModalVisible"
      @close="hideLoginModal"
      @login-success="handleLoginSuccess"
    />
  </header>
</template>

<script>
import LoginView from "./Login.vue";

export default {
  name: "HeaderComp",
  components: {
    LoginView,
  },
  directives: {
    "click-outside": {
      mounted(el, binding) {
        el._clickOutside = (event) => {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value(event);
          }
        };
        document.addEventListener("click", el._clickOutside);
      },
      unmounted(el) {
        document.removeEventListener("click", el._clickOutside);
      },
    },
  },
  data() {
    return {
      isLoginModalVisible: false,
      navItems: [
        {
          title: "首頁",
          link: "/",
        },
        {
          title: "關於我們",
          link: "/about",
          subItems: [
            { title: "公司簡介", link: "/about/intro" },
            { title: "經營理念", link: "/about/philosophy" },
            { title: "團隊成員", link: "/about/team" },
          ],
        },
        {
          title: "服務項目",
          link: "/service",
          subItems: [
            { title: "門診紀錄", link: "/services/clinic" },
            { title: "護理紀錄", link: "/services/nursing" },
            { title: "會議紀錄", link: "/services/meeting" },
            { title: "住院摘要", link: "/services/hospitalization" },
            { title: "衛教諮詢", link: "/services/consultation" },
          ],
        },
        {
          title: "聯絡我們",
          link: "/contact",
        },
      ],
      languages: [
        { code: "zh", name: "中文" },
        { code: "en", name: "English" },
        { code: "ja", name: "日本語" },
      ],
      selectedLanguage: "中文",
      isLanguageMenuOpen: false,
    };
  },
  methods: {
    // 新增的登入相關方法
    showLoginModal() {
      this.isLoginModalVisible = true;
      // 可以添加額外的模態框開啟邏輯，例如禁止背景滾動
      document.body.style.overflow = "hidden";
    },
    hideLoginModal() {
      this.isLoginModalVisible = false;
      // 恢復背景滾動
      document.body.style.overflow = "auto";
    },
    handleLoginSuccess(userData) {
      // 處理登入成功後的邏輯
      console.log("Login successful:", userData);
      this.hideLoginModal();
      // 可以觸發父組件的事件
      this.$emit("login-success", userData);
    },
    //導航欄
    navigate(link) {
      try {
        this.$router.push(link);
      } catch (error) {
        console.error("Navigation failed:", error);
      }
    },
    toggleLanguageMenu() {
      this.isLanguageMenuOpen = !this.isLanguageMenuOpen;
    },
    closeLanguageMenu() {
      this.isLanguageMenuOpen = false;
    },
    selectLanguage(lang) {
      this.selectedLanguage = lang.name;
      this.isLanguageMenuOpen = false;
      this.$emit("language-change", lang.code);
    },
    handleLogin() {
      this.$emit("login");
    },
  },
};
</script>

<style scoped>
.header {
  background-color: #0d9488;
  color: white;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000; /* 確保在最上層 */
}

.nav-container {
  width: 100%; /* 改為全寬 */
  max-width: 1200px;
  margin: 0 auto;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-section {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.brand {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
}

.nav-buttons {
  display: flex;
  gap: 0.5rem;
}

.nav-item {
  position: relative;
}

.nav-button {
  padding: 1rem 2rem;
  background: transparent;
  border: none;
  color: white;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 40px;
}

.nav-button:hover {
  background-color: #0f766e;
}

.arrow {
  font-size: 0.8rem;
  transition: transform 0.2s;
}

.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 200px;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0;
  z-index: 51;
}

.nav-item:hover .dropdown-menu {
  display: block;
  animation: fadeIn 0.2s ease;
  font-size: 18px;
}

.dropdown-item {
  padding: 0.75rem 1rem;
  color: #333;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
}

.dropdown-item:hover {
  background-color: #f3f4f6;
  color: #0d9488;
  padding-left: 1.5rem;
}

.login-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001; /* 確保在導航欄之上 */
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 其他原有的样式保持不变... */

.right-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.language-selector {
  position: relative;
}

.lang-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: transparent;
  border: none;
  color: white;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 1rem;
  width: 100px;
}

.lang-button:hover {
  background-color: #0f766e;
}

.arrow-up {
  transform: rotate(180deg);
}

.language-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background-color: white;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  min-width: 120px;
}

.language-option {
  display: block;
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  background: transparent;
  color: #333;
  text-align: left;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.language-option:hover {
  background-color: #f3f4f6;
}

.login-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #0f766e;
  border: none;
  color: white;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 1rem;
}

.login-button:hover {
  background-color: #115e59;
}

.login-icon {
  font-size: 1rem;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Mobile styles */
@media (max-width: 768px) {
  .nav-item {
    position: static;
  }

  .dropdown-menu {
    left: 0;
    right: 0;
    width: 100%;
    position: fixed;
    top: 60px;
  }

  .nav-buttons {
    display: none;
  }

  .right-section {
    gap: 0.5rem;
  }

  .lang-button,
  .login-button {
    padding: 0.5rem;
  }

  .brand {
    font-size: 1.25rem;
  }
}
</style>
