/*=============== SHOW MENU ===============*/
function showMenu(menu, toggleBtn, closeBtn) {
    const navMenu = document.getElementById(menu),
        toggleButton = document.getElementById(toggleBtn),
        closeButton = document.getElementById(closeBtn)

    toggleButton.addEventListener('click', () => {
        navMenu.classList.add('show')
    })

    closeButton.addEventListener('click', () => {
        navMenu.classList.remove('show')
    })
}

showMenu('nav-menu', 'nav-toggle', 'nav-close')

/*=============== CHANGE BG HEADER ===============*/
function scrollHeader() {
    const header = document.getElementById('header')

    this.scrollY >= 50 ? header.classList.add('scroll-header')
        : header.classList.remove('scroll-header')

}

window.addEventListener('scroll', scrollHeader)

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show')
}

navLink.forEach((link) => {
    link.addEventListener('click', linkAction)
})

//=============SHOW SCROLL UP=============//
function scrollUp() {
    const scrollup = document.getElementById('scroll-up')

    if (scrollup) {
        this.scrollY >= 350 ? scrollup.classList.add('show-scroll')
            : scrollup.classList.remove('show-scroll')
    }
}

window.addEventListener('scroll', scrollUp)

//=============SCROLL SECTION ACTIVE LINK=============//
const sections = document.querySelectorAll('section[id]') //全選section中含有id屬性的元素

function scrollActive() {
    const scrollDown = window.scrollY

    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight, //當前section的元素高度，回傳的單位為pixel，型別為number
            sectionTop = current.offsetTop - 92, //當前section與父層元素top的距離，回傳的單位為pixel，型別為number
            sectionId = current.getAttribute('id'),  //當前section的id，回傳的型別為string
            sectionClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']') //找到href與當前id相同的nav link

        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionClass && sectionClass.classList.add('active-link') //因為這個專案services的部分我並沒有在nav link添加他的連結，所以會出現sectioClass缺漏一個的情況。
        } else {
            sectionClass && sectionClass.classList.remove('active-link')
        }
    })
}

window.addEventListener('scroll', scrollActive)

/*=============== GSAP ===============*/
gsap.from('.home__data', { duration: 1.5, opacity: 0, delay: .25, y: -400, ease: 'back.out(1)' })
gsap.from('.home__social', { duration: 1.5, opacity: 0, delay: 2, y: -400, ease: 'back.out(1)' })

gsap.from('.home__computer', { duration: 1.5, opacity: 0, delay: .75, y: 400, ease: 'back.out(1.5)' })
gsap.from('.home__cloud', { duration: 1.5, opacity: 0, delay: 1.25, x: 400, ease: 'back.out(1)' })
gsap.from('.home__document', { duration: 1.5, opacity: 0, delay: 1.25, x: -400, ease: 'back.out(1)' })
gsap.from('.home__phone', { duration: 1.5, opacity: 0, delay: 1.5, y: 400, ease: 'back.out(1)' })

//animate mouse
const t1 = gsap.timeline({})

t1.from('.home__mouse', { duration: .75, delay: 2.5, opacity: 0, x: 400, ease: 'power2.out' })
    .to('.home__mouse', { duration: .5, delay: 2.5, x: -30, yoyo: true, repeat: -1, repeatDelay: .5, ease: 'power2.out' })


/*stop animate mouse after user scroll down*/
const homeButton = document.getElementById('home-button')

window.addEventListener('scroll', () => {
    if (this.scrollY > 350) {
        t1.pause()
    } else {
        setTimeout(() => {
            t1.play()
        }, 8000)
    }
})

//=============EMAIL JS=============//
const contactForm = document.getElementById('contact-form'),
    contactMessage = document.getElementById('contact-message')

const sendFormEmail = (e) => {
    e.preventDefault()

    emailjs.sendForm('service_uix8dor', 'template_sz3rkpo', '#contact-form', 't32sFPxVA7xF2wh0P')
        .then(() => {
            //play lottie animate
            lottieAnimate()

            //success
            contactMessage.textContent = '訊息已成功送出✅'

            setTimeout(() => {
                contactMessage.textContent = ''
            }, 10000)

            contactForm.reset()

        }), () => {
            //error
            contactMessage.textContent = '失敗，請重新嘗試或者直接寄到我的信箱❌'
        }

}

contactForm.addEventListener('submit', sendFormEmail)


/*=============== LODADING LOTTIE ===============*/
const email = lottie.loadAnimation({
    container: document.getElementById('lottie-email'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'Asset/Images/Lotties/Email.json'
});

const sendEmail = lottie.loadAnimation({
    container: document.getElementById('lottie-sendEmail'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'Asset/Images/Lotties/SendEmail.json'
});

//click submit play animate 
function lottieAnimate() {

    /*show and play lottie animate*/
    const lottieSend = document.getElementById('lottie-sendEmail')
    lottieSend.classList.add('show-sendEmail')
    sendEmail.play()

    /*hidden and stop play lottie animate after complete*/
    sendEmail.addEventListener('complete', () => {
        setTimeout(() => {
            lottieSend.classList.remove('show-sendEmail')
            sendEmail.goToAndStop(0, true)
        }, 1000)
    })
}

//=============SCROLL REVEAL=============//
const sr = ScrollReveal({
    origin: 'bottom',
    distance: '60px',
    duration: 2500,
    delay: 300,
    reset: true
})

sr.reveal('.work__card, .service__box', { interval: 300 })
sr.reveal('.info__portrait', { origin: 'left' })
sr.reveal('.info__content', { origin: 'right' })
sr.reveal('.info__skills', { delay: 900 })
sr.reveal('.contact__form')


//===============Animate Cursor===============//
const cursorL = document.getElementById('cursor-large'),
    cursorS = document.getElementById('cursor-small')

//1.我們需要先給予mouse與大cursor和小cursor的預設值
let [mouseX, mouseY, cursorLX, cursorLY, cursorSX, cursorSY] = [-100, -100, 0, 0, 0, 0]

// 2.監聽滑鼠移動事件，更新目標座標
window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
})

// 3.創建函式，動態更新cursor座標
function animateCursor() {
    //Large Cursor
    //製作遲緩效果
    //計算目標位置(mouseX)與當前位置(cursorX)的差距，再乘一個小餘1的數字
    cursorLX += (mouseX - cursorLX) * 0.15
    cursorLY += (mouseY - cursorLY) * 0.15

    cursorL.style.left = `${cursorLX}px` 
    cursorL.style.top = `${cursorLY}px` 

    //Small Cursor
    cursorSX += (mouseX - cursorSX) * 0.075
    cursorSY += (mouseY - cursorSY) * 0.075

    cursorS.style.left = `${cursorSX}px`
    cursorS.style.top = `${cursorSY}px`

    //4.使用 requestAnimationFrame來持續執行 animateCursor 函數
    requestAnimationFrame(animateCursor)
}

animateCursor()



//Change Cursor When Enter BUTTON//
const buttonArea = document.querySelectorAll('.button')
const linkArea = document.querySelectorAll('a')

const changeCursor = () => {
    cursorL && cursorL.classList.add('focus')
}

const initialCursor = () => {
    cursorL && cursorL.classList.remove('focus')
}

buttonArea.forEach((item) => {
    item.addEventListener('mouseenter', changeCursor)
    item.addEventListener('mouseleave', initialCursor)
})

linkArea.forEach( (item) => {
    item.addEventListener('mouseenter', changeCursor)
    item.addEventListener('mouseleave', initialCursor)
})




