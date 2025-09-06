
        class DemoForm {
            constructor() {
                this.form = document.getElementById('demoForm');
                this.countrySelect = document.getElementById('country');
                this.countryCodeInput = document.getElementById('countryCode');
                this.phoneInput = document.getElementById('phoneNumber');
                this.submitBtn = document.querySelector('.submit-btn');
                this.successMessage = document.getElementById('successMessage');
                
                this.countryCodes = {
                    'US': '+1', 'CA': '+1', 'GB': '+44', 'AU': '+61',
                    'DE': '+49', 'FR': '+33', 'JP': '+81', 'CN': '+86',
                    'IN': '+91', 'BR': '+55', 'MX': '+52', 'NG': '+234',
                    'ZA': '+27', 'other': '+'
                };
                
                this.init();
            }
            
            init() {
                this.setupEventListeners();
                this.setupPhoneFormatting();
                this.presetCountry();
            }
            
            setupEventListeners() {
                // Country change handler
                this.countrySelect.addEventListener('change', (e) => {
                    this.updateCountryCode(e.target.value);
                });
                
                // Form submission
                this.form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.handleSubmit();
                });
                
                // Real-time validation
                const inputs = this.form.querySelectorAll('input, select, textarea');
                inputs.forEach(input => {
                    input.addEventListener('blur', () => this.validateField(input));
                    input.addEventListener('input', () => this.clearError(input));
                });
            }
            
            presetCountry() {
                // Set Nigeria as default based on user location
                this.countrySelect.value = 'NG';
                this.updateCountryCode('NG');
            }
            
            updateCountryCode(countryCode) {
                const code = this.countryCodes[countryCode] || '+';
                this.countryCodeInput.value = code;
                
                if (countryCode === 'other') {
                    this.countryCodeInput.readOnly = false;
                    this.countryCodeInput.placeholder = 'Code';
                } else {
                    this.countryCodeInput.readOnly = true;
                }
            }
            
            setupPhoneFormatting() {
                this.phoneInput.addEventListener('input', (e) => {
                    let value = e.target.value.replace(/\D/g, '');
                    const country = this.countrySelect.value;
                    
                    // Format based on country
                    if (country === 'US' || country === 'CA') {
                        if (value.length >= 6) {
                            value = value.replace(/(\d{3})(\d{3})(\d+)/, '$1-$2-$3');
                        } else if (value.length >= 3) {
                            value = value.replace(/(\d{3})(\d+)/, '$1-$2');
                        }
                    } else if (country === 'GB') {
                        if (value.length >= 7) {
                            value = value.replace(/(\d{4})(\d{3})(\d+)/, '$1 $2 $3');
                        } else if (value.length >= 4) {
                            value = value.replace(/(\d{4})(\d+)/, '$1 $2');
                        }
                    }
                    
                    e.target.value = value;
                });
            }
            
            validateField(field) {
                const value = field.value.trim();
                const fieldName = field.name;
                let isValid = true;
                let errorMessage = '';
                
                switch (fieldName) {
                    case 'firstName':
                    case 'lastName':
                        isValid = value.length >= 2;
                        errorMessage = `Please enter a valid ${fieldName === 'firstName' ? 'first' : 'last'} name`;
                        break;
                        
                    case 'email':
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        isValid = emailRegex.test(value);
                        errorMessage = 'Please enter a valid business email';
                        break;
                        
                    case 'phoneNumber':
                        const phoneRegex = /[\d\-\s()]{7,}/;
                        isValid = phoneRegex.test(value);
                        errorMessage = 'Please enter a valid phone number';
                        break;
                        
                    case 'message':
                        isValid = value.length >= 10;
                        errorMessage = 'Please provide more details (minimum 10 characters)';
                        break;
                        
                    default:
                        if (field.required) {
                            isValid = value !== '';
                            errorMessage = 'This field is required';
                        }
                }
                
                this.toggleFieldError(field, !isValid, errorMessage);
                return isValid;
            }
            
            toggleFieldError(field, hasError, message = '') {
                const formGroup = field.closest('.form-group');
                const errorElement = formGroup.querySelector('.error-message');
                
                if (hasError) {
                    field.classList.add('error');
                    formGroup.classList.add('error');
                    if (errorElement && message) {
                        errorElement.textContent = message;
                    }
                } else {
                    field.classList.remove('error');
                    formGroup.classList.remove('error');
                }
            }
            
            clearError(field) {
                this.toggleFieldError(field, false);
            }
            
            validateForm() {
                const fields = this.form.querySelectorAll('input[required], select[required], textarea[required]');
                let isFormValid = true;
                
                fields.forEach(field => {
                    if (!this.validateField(field)) {
                        isFormValid = false;
                    }
                });
                
                return isFormValid;
            }
            
            async handleSubmit() {
                if (!this.validateForm()) {
                    this.shake();
                    return;
                }
                
                this.setLoading(true);
                
                try {
                    // Simulate API call
                    await this.submitForm();
                    this.showSuccess();
                } catch (error) {
                    console.error('Form submission error:', error);
                    alert('Something went wrong. Please try again.');
                } finally {
                    this.setLoading(false);
                }
            }
            
            async submitForm() {
                const formData = new FormData(this.form);
                const data = Object.fromEntries(formData);
                
                // Add country code to phone number
                data.fullPhoneNumber = this.countryCodeInput.value + data.phoneNumber;
                
                // Simulate API delay
                return new Promise(resolve => {
                    setTimeout(() => {
                        console.log('Form submitted:', data);
                        resolve(data);
                    }, 2000);
                });
            }
            
            setLoading(loading) {
                this.submitBtn.classList.toggle('loading', loading);
                this.submitBtn.disabled = loading;
            }
            
            showSuccess() {
                this.form.style.display = 'none';
                this.successMessage.classList.add('show');
                
                // Reset form after delay
                setTimeout(() => {
                    this.form.reset();
                    this.form.style.display = 'flex';
                    this.successMessage.classList.remove('show');
                    this.presetCountry();
                }, 5000);
            }
            
            shake() {
                this.form.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    this.form.style.animation = '';
                }, 500);
            }
        }
        
        // Add shake animation
        const shakeCSS = `
            @keyframes shake {
                0%, 20%, 40%, 60%, 80%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = shakeCSS;
        document.head.appendChild(styleSheet);
        
        // Initialize form when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new DemoForm();
        });
