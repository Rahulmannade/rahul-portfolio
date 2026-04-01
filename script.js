tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
      },
      colors: {
        primary: "#6366f1",
        secondary: "#10b981",
        dark: "#0f172a",
        darker: "#020617",
      },
    },
  },
};


        // Register GSAP ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);
        
        document.addEventListener("DOMContentLoaded", () => {
            // 1. Custom Cursor
            const cursor = document.querySelector(".custom-cursor");
            const cursorDot = document.querySelector(".custom-cursor-dot");
            
            if (cursor && cursorDot && window.matchMedia("(hover: hover)").matches) {
                let mouseX = 0, mouseY = 0;
                let cursorX = 0, cursorY = 0;
                let dotX = 0, dotY = 0;
                
                document.addEventListener("mousemove", (e) => {
                    mouseX = e.clientX;
                    mouseY = e.clientY;
                });
                
                function animateCursor() {
                    cursorX += (mouseX - cursorX) * 0.1;
                    cursorY += (mouseY - cursorY) * 0.1;
                    dotX += (mouseX - dotX) * 0.5;
                    dotY += (mouseY - dotY) * 0.5;
                    
                    cursor.style.left = cursorX - 10 + "px";
                    cursor.style.top = cursorY - 10 + "px";
                    cursorDot.style.left = dotX - 2 + "px";
                    cursorDot.style.top = dotY - 2 + "px";
                    
                    requestAnimationFrame(animateCursor);
                }
                animateCursor();
                
                // Hover effect on interactive elements
                const interactiveElements = document.querySelectorAll("a, button, .project-card, input, textarea, select");
                interactiveElements.forEach((el) => {
                    el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
                    el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
                });
            }
            
            // 2. Scroll Progress Bar
            window.addEventListener("scroll", () => {
                const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (winScroll / height) * 100;
                document.querySelector(".progress-bar").style.width = scrolled + "%";
            });
            
            // 3. Text Scramble Effect
            class TextScramble {
                constructor(el) {
                    this.el = el;
                    this.chars = "!<>-_\\\\/[]{}—=+*^?#________";
                    this.update = this.update.bind(this);
                }
                setText(newText) {
                    const oldText = this.el.innerText;
                    const length = Math.max(oldText.length, newText.length);
                    const promise = new Promise((resolve) => (this.resolve = resolve));
                    this.queue = [];
                    for (let i = 0; i < length; i++) {
                        const from = oldText[i] || "";
                        const to = newText[i] || "";
                        const start = Math.floor(Math.random() * 40);
                        const end = start + Math.floor(Math.random() * 40);
                        this.queue.push({ from, to, start, end });
                    }
                    cancelAnimationFrame(this.frameRequest);
                    this.frame = 0;
                    this.update();
                    return promise;
                }
                update() {
                    let output = "";
                    let complete = 0;
                    for (let i = 0, n = this.queue.length; i < n; i++) {
                        let { from, to, start, end, char } = this.queue[i];
                        if (this.frame >= end) {
                            complete++;
                            output += to;
                        } else if (this.frame >= start) {
                            if (!char || Math.random() < 0.28) {
                                char = this.randomChar();
                                this.queue[i].char = char;
                            }
                            output += `<span class="text-primary">${char}</span>`;
                        } else {
                            output += from;
                        }
                    }
                    this.el.innerHTML = output;
                    if (complete === this.queue.length) {
                        this.resolve();
                    } else {
                        this.frameRequest = requestAnimationFrame(this.update);
                        this.frame++;
                    }
                }
                randomChar() {
                    return this.chars[Math.floor(Math.random() * this.chars.length)];
                }
            }
            
            // Apply scramble effect to name
            const nameEl = document.querySelector(".scramble-text");
            if (nameEl) {
                const fx = new TextScramble(nameEl);
                setTimeout(() => {
                    fx.setText("Rahul Mannade");
                }, 500);
            }
            
            // 4. Typewriter Effect
            const textElement = document.getElementById("typewriter");
            const phrases = ["BCA Student", "Web Developer", "Problem Solver"];
            let phraseIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            let typeSpeed = 100;
            
            function type() {
                const currentPhrase = phrases[phraseIndex];
                if (isDeleting) {
                    textElement.textContent = currentPhrase.substring(0, charIndex - 1);
                    charIndex--;
                    typeSpeed = 50;
                } else {
                    textElement.textContent = currentPhrase.substring(0, charIndex + 1);
                    charIndex++;
                    typeSpeed = 100;
                }
                
                if (!isDeleting && charIndex === currentPhrase.length) {
                    isDeleting = true;
                    typeSpeed = 2000;
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    typeSpeed = 500;
                }
                setTimeout(type, typeSpeed);
            }
            setTimeout(type, 2000);
            
            // 5. GSAP Scroll Animations
            gsap.utils.toArray(".gs-reveal").forEach((element) => {
                gsap.from(element, {
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                });
            });
            
            gsap.utils.toArray(".gs-reveal-left").forEach((element) => {
                gsap.from(element, {
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                    x: -50,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                });
            });
            
            gsap.utils.toArray(".gs-reveal-right").forEach((element) => {
                gsap.from(element, {
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                    x: 50,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                });
            });
            
            // 6. Magnetic Buttons
            const magneticBtns = document.querySelectorAll(".magnetic-btn");
            const isTouchDevice = window.matchMedia("(hover: none)").matches;
            
            if (!isTouchDevice) {
                magneticBtns.forEach((btn) => {
                    btn.addEventListener("mousemove", (e) => {
                        const rect = btn.getBoundingClientRect();
                        const x = e.clientX - rect.left - rect.width / 2;
                        const y = e.clientY - rect.top - rect.height / 2;
                        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
                    });
                    btn.addEventListener("mouseleave", () => {
                        btn.style.transform = "translate(0, 0)";
                    });
                });
            }
            
            // 7. Dark Mode Toggle
            const themeToggle = document.getElementById("theme-toggle");
            const themeToggleMobile = document.getElementById("theme-toggle-mobile");
            const themeIcon = document.getElementById("theme-icon");
            const themeIconMobile = document.getElementById("theme-icon-mobile");
            const html = document.documentElement;
            
            function updateThemeIcon(isDark) {
                const iconClass = isDark ? "fa-sun" : "fa-moon";
                const removeClass = isDark ? "fa-moon" : "fa-sun";
                
                if (themeIcon) {
                    themeIcon.classList.remove(removeClass);
                    themeIcon.classList.add(iconClass);
                    themeIcon.style.transform = isDark ? "rotate(360deg)" : "rotate(0deg)";
                }
                if (themeIconMobile) {
                    themeIconMobile.classList.remove(removeClass);
                    themeIconMobile.classList.add(iconClass);
                }
            }
            
            // Check system preference
            if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
                html.classList.add("dark");
                updateThemeIcon(true);
            }
            
            function toggleTheme() {
                html.classList.toggle("dark");
                const isDark = html.classList.contains("dark");
                updateThemeIcon(isDark);
            }
            
            if (themeToggle) themeToggle.addEventListener("click", toggleTheme);
            if (themeToggleMobile) themeToggleMobile.addEventListener("click", toggleTheme);
            
            // 8. Mobile Menu - Fixed Implementation
            const mobileMenuBtn = document.getElementById("mobile-menu-btn");
            const mobileMenu = document.getElementById("mobile-menu");
            const menuIcon = document.getElementById("menu-icon");
            const mobileLinks = document.querySelectorAll(".mobile-link");
            let isMenuOpen = false;
            
            function toggleMobileMenu() {
                isMenuOpen = !isMenuOpen;
                
                if (isMenuOpen) {
                    mobileMenu.classList.remove("hidden");
                    mobileMenu.classList.add("mobile-menu-enter");
                    setTimeout(() => {
                        mobileMenu.classList.add("mobile-menu-enter-active");
                        mobileMenu.classList.remove("mobile-menu-enter");
                    }, 10);
                    menuIcon.classList.remove("fa-bars");
                    menuIcon.classList.add("fa-times");
                    document.body.style.overflow = "hidden";
                } else {
                    mobileMenu.classList.remove("mobile-menu-enter-active");
                    mobileMenu.classList.add("mobile-menu-enter");
                    setTimeout(() => {
                        mobileMenu.classList.add("hidden");
                        mobileMenu.classList.remove("mobile-menu-enter");
                    }, 300);
                    menuIcon.classList.remove("fa-times");
                    menuIcon.classList.add("fa-bars");
                    document.body.style.overflow = "";
                }
            }
            
            if (mobileMenuBtn) {
                mobileMenuBtn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    toggleMobileMenu();
                });
            }
            
            // Close menu when clicking on links
            mobileLinks.forEach((link) => {
                link.addEventListener("click", () => {
                    if (isMenuOpen) toggleMobileMenu();
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener("click", (e) => {
                if (isMenuOpen && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                    toggleMobileMenu();
                }
            });
            
            // Close menu on resize if open
            window.addEventListener("resize", () => {
                if (window.innerWidth >= 768 && isMenuOpen) {
                    toggleMobileMenu();
                }
            });
            
            // 9. Contact Form
            const form = document.getElementById("contact-form");
            if (form) {
                form.addEventListener("submit", (e) => {
                    e.preventDefault();
                    const btn = form.querySelector("button[type='submit']");
                    const originalText = btn.innerHTML;
                    
                    btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
                    btn.disabled = true;
                    btn.classList.add("opacity-75");
                    
                    setTimeout(() => {
                        btn.innerHTML = '<i class="fas fa-check mr-2"></i> Message Sent!';
                        btn.classList.remove("from-primary", "to-indigo-600");
                        btn.classList.add("from-green-500", "to-green-600");
                        form.reset();
                        
                        setTimeout(() => {
                            btn.innerHTML = originalText;
                            btn.disabled = false;
                            btn.classList.remove("opacity-75", "from-green-500", "to-green-600");
                            btn.classList.add("from-primary", "to-indigo-600");
                        }, 3000);
                    }, 1500);
                });
            }
            
            // 10. Active Navigation Link
            const sections = document.querySelectorAll("section[id]");
            const navLinks = document.querySelectorAll(".nav-link");
            
            function updateActiveLink() {
                let current = "";
                const scrollPos = window.pageYOffset + 100;
                
                sections.forEach((section) => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                        current = section.getAttribute("id");
                    }
                });
                
                navLinks.forEach((link) => {
                    link.classList.remove("text-primary");
                    if (link.getAttribute("href") === `#${current}`) {
                        link.classList.add("text-primary");
                    }
                });
            }
            
            window.addEventListener("scroll", updateActiveLink);
            updateActiveLink();
            
            // 11. Navbar background on scroll
            const navbar = document.getElementById("navbar");
            window.addEventListener("scroll", () => {
                if (window.scrollY > 50) {
                    navbar.classList.add("shadow-lg");
                } else {
                    navbar.classList.remove("shadow-lg");
                }
            });
        });
    
