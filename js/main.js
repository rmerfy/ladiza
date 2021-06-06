"use strict";

document.addEventListener('DOMContentLoaded', () => {
    // inputmask

    let phone = document.querySelectorAll("input[type='tel']"),
        im = new Inputmask("+7 (999) 999-99-99");
    im.mask(phone);

    // sliders

    const workSteps = new Swiper('.work-steps__slider', {
        speed: 400,
        slidesPerView: 1,
        navigation: {
            nextEl: '.work-steps__next',
        },
        breakpoints: {
            // when window width is >= 320px
            540: {
              slidesPerView: 1.3,
            },
        }
    });

    const slider = new Swiper('.example-slider__container', {
        speed: 400,
        slidesPerView: 1,
        navigation: {
            nextEl: '.example-slider__next',
            prevEl: '.example-slider__prev'
        },
    });

    const allSteps = new Swiper('.all-steps__slider', {
        speed: 400,
        slidesPerView: 1,
        navigation: {
            nextEl: '.all-steps__next',
            prevEl: '.all-steps__prev'
        },
        breakpoints: {
            // when window width is >= 320px
            
            1300: {
                slidesPerView: 3.2,
              },
        }
    });

    // quiz

    const

        btnNext = document.querySelector('.quiz-form__next'),
        btnPrev = document.querySelector('.quiz-form__prev'),
        btnSubmit = document.querySelector('.quiz-form__submit'),
        step = document.querySelectorAll('.quiz-form__step');


    let currentTab = 0;

    if (step.length != 0) {
        showTab(currentTab);

        function showTab(n) {
            step[n].style.display = "block";
            step[n].classList.remove('quiz-form__step--active');
            if (n == 6) {
                btnNext.style.display = "none";
                btnSubmit.style.display = "inline-block";
                document.querySelector('.quiz-form__buttons').classList.add('quiz-form__buttons--last-step');
            } else {
                btnNext.style.display = "inline-block";
                btnSubmit.style.display = "none";
                document.querySelector('.quiz-form__buttons').classList.remove('quiz-form__buttons--last-step');
            }
            if (n == 0) {
                btnPrev.classList.add('quiz-form__prev--disabled');
            } else {
                btnPrev.classList.remove('quiz-form__prev--disabled');
            }

            fixStepIndicator(n);
        }

        btnNext.addEventListener('click', (e) => {
            e.preventDefault();
            nextPrev(1);
        });

        btnPrev.addEventListener('click', (e) => {
            e.preventDefault();
            nextPrev(-1);
        });

        function nextPrev(n) {
            step[currentTab].style.display = "none";
            currentTab = currentTab + n;
            showTab(currentTab);
        }

        function fixStepIndicator(n) {
            var progress = document.querySelector('.quiz-form__progress-bar');
            var number = document.querySelector('.quiz-form__step-indicator');
            number.innerHTML = `Вопрос ${n + 1} из 7`;
            switch (n) {
                case 0:
                    progress.style.width = "20%";
                    break;
                case 1:
                    progress.style.width = "30%";
                    break;

                case 2:
                    progress.style.width = "40%";
                    break;

                case 3:
                    progress.style.width = "50%";
                    break;

                case 4:
                    progress.style.width = "60%";
                    break;

                case 5:
                    progress.style.width = "80%";
                    break;

                case 6:
                    progress.style.width = "100%";
                    break;

            }

        }

    }

    // плавный скролл 

    document.querySelectorAll('.scrollto[href^="#"').forEach(link => {

        link.addEventListener('click', function (e) {
            e.preventDefault();

            let href = this.getAttribute('href').substring(1);

            const scrollTarget = document.getElementById(href);

            const topOffset = document.querySelector('.scrollto').offsetHeight;
            // const topOffset = 0; // отступ сверху 
            const elementPosition = scrollTarget.getBoundingClientRect().top;
            const offsetPosition = elementPosition - topOffset - 80;

            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    // scroll menu
    const menuBlock = document.querySelector('.header'),
        wrapper = document.querySelector('.header-wrapper'),
        main = document.querySelector('.main');
        main.style.marginTop = `${wrapper.scrollHeight}px`;
    let menuBlockHeight = menuBlock.scrollHeight;

    window.addEventListener('scroll', function () {

        if (window.pageYOffset >= 760) {
            menuBlock.classList.add('header--fixed');
            wrapper.style.paddingTop = `${menuBlockHeight}px`;

            wrapper.classList.remove('header-wrapper--fixed');
            main.style.marginTop = 0;

        } else if (window.pageYOffset < 760) {
            menuBlock.classList.remove('header--fixed');
            wrapper.style.paddingTop = 0;
            wrapper.classList.add('header-wrapper--fixed');

            main.style.marginTop = `${wrapper.scrollHeight}px`;
        }
    });

    // меню

    const menuBtn = document.querySelector('.menu-btn'),
        menuClose = document.querySelector('.menu__close'),
        menu = document.querySelector('.menu__inner'),
        body = document.querySelector('body'),
        menuLinks = document.querySelectorAll('.menu__list li a');


    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('active');
        body.classList.toggle('lock');

    });

    menuClose.addEventListener('click', () => {
        menu.classList.toggle('active');
        body.classList.remove('lock');

    });

    menuLinks.forEach((menuLink) => {
        menuLink.addEventListener('click', () => {
            menu.classList.toggle('active');
            body.classList.remove('lock');
        });
    });

    //E-mail Ajax Send
    $("form").submit(function () {
        var th = $(this);
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: th.serialize()
        }).done(function () {
            callbackModal.close();
            submitModal.open();
            $('.form').css('width', '100%');
            setTimeout(function () {
                // Выполнено
                th.trigger("reset");
            }, 1000);
        });
        return false;
    });

    // modals
    var submitModal = new tingle.modal({
        footer: false,
        stickyFooter: false,
        closeMethods: ['overlay', 'button', 'escape'],
        closeLabel: "Закрыть",
        cssClass: ['custom-class-2'],
    });

    submitModal.setContent('<div class="modal__content"><h2 class="title modal__title"><b>Спасибо!</b></h2><span class="step__select-title">Мы свяжемся с вами в течение 20 минут</span></div>');

    // quiz range

    const rangeInput = document.querySelector('.range-val input');
    const rangeItem = document.querySelector('.range-item');

    rangeInput.addEventListener('input', function(){
        rangeItem.value = rangeInput.value;
    });
    rangeItem.addEventListener('input', function(){
        rangeInput.value = rangeItem.value;
    });

    // before / after
    
    $(".twentytwenty-container").twentytwenty({
        default_offset_pct: 0.5,
        orientation: 'horizontal', 
        move_slider_on_hover: true, 
      });

    //lazy load <img>

    var lazyloadImages = document.querySelectorAll("img.lazy");
    var lazyloadThrottleTimeout;

    function lazyload() {
        if (lazyloadThrottleTimeout) {
            clearTimeout(lazyloadThrottleTimeout);
        }

        lazyloadThrottleTimeout = setTimeout(function () {
            var scrollTop = window.pageYOffset;
            lazyloadImages.forEach(function (img) {
                if (img.offsetTop < (window.innerHeight + scrollTop)) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                }
            });
            if (lazyloadImages.length == 0) {
                document.removeEventListener("scroll", lazyload);
                window.removeEventListener("resize", lazyload);
                window.removeEventListener("orientationChange", lazyload);
            }
        }, 20);
    }

    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);

    // show more proj

    const projItems = document.querySelector('.project__items'),
          projItem =  document.querySelector('.project__item'),
          projBtn =  document.querySelector('.project__btn');

          projItems.style.height = `${projItem.scrollHeight}px`;

          projBtn.addEventListener('click', function(e){
            e.preventDefault();
            projItems.style.height = `${projItems.scrollHeight}px`;
            projBtn.style.display = "none";
            
          });
    
          
    
});

