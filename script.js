document.addEventListener('DOMContentLoaded', () => {
    // --- AOS Removed ---

    // --- Footer Year ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Theme Toggle ---
    const desktopThemeToggleButton = document.getElementById('theme-toggle');
    const mobileThemeToggleButton = document.getElementById('mobile-theme-toggle');
    const body = document.body;
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');

    // Function to apply theme and update buttons
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
            if(desktopThemeToggleButton) desktopThemeToggleButton.setAttribute('aria-pressed', 'false');
            if(mobileThemeToggleButton) mobileThemeToggleButton.setAttribute('aria-pressed', 'false');
        } else {
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
            if(desktopThemeToggleButton) desktopThemeToggleButton.setAttribute('aria-pressed', 'true');
             if(mobileThemeToggleButton) mobileThemeToggleButton.setAttribute('aria-pressed', 'true');
        }
    };

    // Initialize theme
    if (currentTheme) {
        applyTheme(currentTheme);
    } else {
        applyTheme(prefersDarkScheme.matches ? 'dark' : 'light');
    }

    // Toggle button listeners
    const toggleTheme = () => {
        const newTheme = body.classList.contains('light-theme') ? 'dark' : 'light';
        applyTheme(newTheme);
    };

    if (desktopThemeToggleButton) {
        desktopThemeToggleButton.addEventListener('click', toggleTheme);
    }
    if (mobileThemeToggleButton) {
        mobileThemeToggleButton.addEventListener('click', toggleTheme);
    }

    // --- Mobile Menu Toggle ---
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNavMenu = document.getElementById('mobile-nav-menu');

    if (mobileMenuToggle && mobileNavMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            const isActive = mobileNavMenu.classList.toggle('active');
            mobileMenuToggle.setAttribute('aria-expanded', isActive);

            const icon = mobileMenuToggle.querySelector('i');
            if (isActive) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        const closeMobileMenu = () => {
             if (mobileNavMenu.classList.contains('active')) { // Only if menu is open
                mobileNavMenu.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
             }
         }

        // Close menu when clicking a link inside
        const mobileLinks = mobileNavMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

         // Close menu when clicking the theme toggle inside
         if (mobileThemeToggleButton) {
            mobileThemeToggleButton.addEventListener('click', () => {
                 setTimeout(closeMobileMenu, 150);
            });
         }
          // Optional: Close menu if clicking outside of it
        // document.addEventListener('click', (event) => {
        //     const isClickInsideNav = mobileNavMenu.contains(event.target);
        //     const isClickOnToggle = mobileMenuToggle.contains(event.target);

        //     if (!isClickInsideNav && !isClickOnToggle && mobileNavMenu.classList.contains('active')) {
        //         closeMobileMenu();
        //     }
        // });

    }

    // --- Active Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('.section[id]');
    const navLinks = document.querySelectorAll('#navbar .nav-links a');
    const navHeight = document.getElementById('navbar')?.offsetHeight || 60;

    function setActiveLink() {
        let currentSectionId = '';
        const scrollPosY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 50;
            if (scrollPosY >= sectionTop) {
                 currentSectionId = section.getAttribute('id');
            }
        });

        const heroElement = document.getElementById('hero');
         if (heroElement && scrollPosY < (sections.length > 0 ? sections[0].offsetTop : heroElement.offsetTop + heroElement.offsetHeight) - navHeight - 50 ) {
            currentSectionId = 'hero'; // Activate Hero if above first real section
         }

         const lastSection = sections[sections.length - 1];
         if (lastSection && window.innerHeight + scrollPosY >= document.body.offsetHeight - 50) {
            currentSectionId = lastSection.getAttribute('id');
        }


        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            if (linkHref === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    if (sections.length > 0 && navLinks.length > 0) {
         window.addEventListener('scroll', setActiveLink);
         setActiveLink(); // Initial call
     }

    // --- Console Log ---
    console.log("Professional Portfolio Interface Initialized v3. No Scroll Animations.");
});