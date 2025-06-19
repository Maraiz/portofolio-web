// Theme toggle functionality
function toggleTheme() {
    const body = document.body;
    const toggleBall = document.querySelector('.toggle-ball i');
    
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        toggleBall.className = 'fas fa-sun';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        toggleBall.className = 'fas fa-moon';
        localStorage.setItem('theme', 'dark');
    }
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    const toggleBall = document.querySelector('.toggle-ball i');
    
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        toggleBall.className = 'fas fa-moon';
    } else {
        toggleBall.className = 'fas fa-sun';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'var(--header-bg)';
    } else {
        header.style.background = 'var(--header-bg)';
    }
});

// Form submission with AJAX
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const form = e.target;
            const formData = new FormData(form);
            const submitBtn = document.getElementById('submitBtn');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoader = submitBtn.querySelector('.btn-loader');
            const messageDiv = document.getElementById('formMessage');
            
            // Debug: Log untuk memastikan elemen ditemukan
            console.log('Form submission started');
            console.log('submitBtn:', submitBtn);
            console.log('messageDiv:', messageDiv);
            
            // Show loading state
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoader.style.display = 'flex';
            messageDiv.style.display = 'none';
            messageDiv.className = 'form-message';
            
            // Add hidden fields for Formspree
            formData.append('_subject', 'Pesan Baru dari Portfolio Website');
            
            try {
                console.log('Sending request to Formspree...');
                
                const response = await fetch('https://formspree.io/f/mgvyzbne', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                console.log('Response status:', response.status);
                console.log('Response ok:', response.ok);
                
                if (response.ok) {
                    // Success
                    console.log('Success!');
                    messageDiv.innerHTML = '<i class="fas fa-check-circle"></i> Pesan berhasil dikirim! Terima kasih telah menghubungi saya. Saya akan segera membalas dalam 1-2 hari kerja.';
                    messageDiv.className = 'form-message success';
                    messageDiv.style.display = 'block';
                    form.reset();
                } else {
                    // Server error
                    console.log('Server error');
                    const data = await response.json().catch(() => ({}));
                    console.log('Error data:', data);
                    
                    if (data.errors) {
                        // Validation errors
                        const errorMessages = data.errors.map(error => error.message).join(', ');
                        messageDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> Terjadi kesalahan: ${errorMessages}`;
                    } else {
                        messageDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.';
                    }
                    messageDiv.className = 'form-message error';
                    messageDiv.style.display = 'block';
                }
            } catch (error) {
                // Network error
                console.log('Network error:', error);
                messageDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Terjadi kesalahan jaringan. Periksa koneksi internet Anda dan coba lagi.';
                messageDiv.className = 'form-message error';
                messageDiv.style.display = 'block';
            }
            
            // Reset button state
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
            
            // Auto hide success message after 10 seconds
            setTimeout(() => {
                if (messageDiv.classList.contains('success')) {
                    messageDiv.style.display = 'none';
                }
            }, 10000);
        });
    } else {
        console.error('Contact form not found!');
    }
});

// Download CV function
function downloadCV() {
    // Ganti dengan URL file CV Anda yang sesungguhnya
    const cvUrl = 'path/to/your/cv.pdf'; // Ubah ini dengan path CV Anda

    // Untuk demo, kita tampilkan alert
    alert('Fitur download CV! Silakan ganti URL di function downloadCV() dengan link CV Anda.');

    // Uncomment baris di bawah ini setelah Anda memiliki file CV:
    // const link = document.createElement('a');
    // link.href = cvUrl;
    // link.download = 'Maulana_Nurfaizi_Anugerah_CV.pdf';
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
}