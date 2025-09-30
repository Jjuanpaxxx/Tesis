
        // Smooth scroll for navigation links
        document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add reading progress indicator
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            
            // Create progress bar if it doesn't exist
            let progressBar = document.getElementById('reading-progress');
            if (!progressBar) {
                progressBar = document.createElement('div');
                progressBar.id = 'reading-progress';
                progressBar.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: ${scrolled}%;
                    height: 3px;
                    background: #e74c3c;
                    z-index: 1000;
                    transition: width 0.1s ease;
                `;
                document.body.appendChild(progressBar);
            } else {
                progressBar.style.width = scrolled + '%';
            }
        });

        // Highlight active section in navigation
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');

        function highlightActiveSection() {
            let currentSection = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 120;
                if (pageYOffset >= sectionTop) {
                    currentSection = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.style.color = '#34495e';
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.style.color = '#e74c3c';
                }
            });
        }

        window.addEventListener('scroll', highlightActiveSection);