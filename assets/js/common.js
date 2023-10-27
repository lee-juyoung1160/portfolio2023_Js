

window.addEventListener("load", function () {
    window.scrollTo(0,0); // 새로고침 시 최 상단

    cursor(); // 마우스 커서 커스텀
    smooth(); // 페이지 스크롤 부드럽게 
    link(); // 상단 메뉴 클릭 시 해당 영역으로
    menu(); //상단 메뉴 모바일, 피시
    fade(); // 컨텐츠 스크롤 위치에 따라 나타내기 효과

});


function cursor() {
    const cursor = document.querySelector('#cursor');
    const cursorCircle = cursor.querySelector('.cursor__circle');

    const mouse = { x: -100, y: -100 }; // mouse pointer's coordinates
    const pos = { x: 0, y: 0 }; // cursor's coordinates
    const speed = 0.2; // between 0 and 1

    const updateCoordinates = e => {
        mouse.x = e.clientX + 5;
        mouse.y = e.clientY + 5;
    }

    window.addEventListener('mousemove', updateCoordinates);

    function getAngle(diffX, diffY) {
        return Math.atan2(diffY, diffX) * 180 / Math.PI;
    }

    function getSqueeze(diffX, diffY) {
        const distance = Math.sqrt(
            Math.pow(diffX, 2) + Math.pow(diffY, 2)
        );
        const maxSqueeze = 0.15;
        const accelerator = 1500;
        return Math.min(distance / accelerator, maxSqueeze);
    }

    const updateCursor = () => {
    const diffX = Math.round(mouse.x - pos.x);
    const diffY = Math.round(mouse.y - pos.y);

    pos.x += diffX * speed;
    pos.y += diffY * speed;

    const angle = getAngle(diffX, diffY);
    const squeeze = getSqueeze(diffX, diffY);

    const scale = 'scale(' + (1 + squeeze) + ', ' + (1 - squeeze) +')';
    const rotate = 'rotate(' + angle +'deg)';
    const translate = 'translate3d(' + pos.x + 'px ,' + pos.y + 'px, 0)';

    cursor.style.transform = translate;
        cursorCircle.style.transform = rotate + scale;
    };

    function loop() {
        updateCursor();
        requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);

    /* a 태그 전체에 cursor-class="arrow" 추가 */
    var aTags = Array.from(document.getElementsByTagName("a"));
    aTags.forEach(function(aTag) {
        aTag.setAttribute("cursor-class", "arrow");
    });

    var aTags = Array.from(document.querySelectorAll(".skill__list li"));
    aTags.forEach(function(aTag) {
        aTag.setAttribute("cursor-class", "arrow");
    });

    /* 게시글 수정버튼 cursor-class="arrow" 삭제 */
    var modifys = Array.from(document.getElementsByClassName("modify"));
    modifys.forEach(function(modify) {
        modify.removeAttribute("cursor-class", "arrow");
    });

    const cursorModifiers = document.querySelectorAll('[cursor-class]');

    cursorModifiers.forEach(curosrModifier => {
        curosrModifier.addEventListener('mouseenter', function() {
            const className = this.getAttribute('cursor-class');
            cursor.classList.add(className);
        });

        curosrModifier.addEventListener('mouseleave', function() {
            const className = this.getAttribute('cursor-class');
            cursor.classList.remove(className);
        });
    });
}

function smooth() {
    const lenis = new Lenis({
        duration: 1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });

    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
}

function fade() {
    
    //fade animation
    function animateFrom(elem, direction) {
        direction = direction || 1;
        var x = 0, y = direction * 300;
        if (elem.classList.contains("fade_left")) {
        x = -100;
        y = 0;
        } else if (elem.classList.contains("fade_right")) {
        x = 100;
        y = 0;
        } else if (elem.classList.contains("fade_top")) {
        x = 0;
        y = 100;
        }
        elem.style.transform = "translate(" + x + "px, " + y + "px)";
        elem.style.opacity = "0";
        gsap.fromTo(elem, {x: x, y: y, autoAlpha: 0}, {
        duration: 3,
        x: 0,
        y: 0,
        autoAlpha: 1,
        ease: "expo",
        overwrite: "auto"
        });
    }
    
    function hide(elem) {
        gsap.set(elem, {autoAlpha: 0});
    }
    
    gsap.utils.toArray(".fade_action").forEach(function (elem) {
        hide(elem); 
    
        ScrollTrigger.create({
                trigger: elem,
                //markers: true,
                onEnter: function () {
                animateFrom(elem)
                },
                onEnterBack: function () {
                animateFrom(elem, -1)
                },
                onLeave: function () {
                hide(elem)
                } 
            });
        });

}

function link() {
    document.querySelectorAll(".header__nav a[href^='#']").forEach((item) => {
        item.addEventListener("click", function(e){
            e.preventDefault();

            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);

            if(targetElement){
                targetElement.scrollIntoView({ behavior: "smooth"});
            }

            if(window.innerWidth <= 820) {
                document.querySelector(".header__nav").classList.remove('active');
                document.querySelector(".header__nav__mo").classList.remove('active');
            }
            
            
        });
    });
}

function menu() {

    const body = document.querySelector('body');
    const headerToggle = document.querySelector(".header__nav__mo");
    const headerNav = document.querySelector(".header__nav");

    headerToggle.addEventListener("click", () => {
    
    !headerToggle.classList.contains('active')
        ? headerToggle.classList.add('active') 
        & body.classList.add('scroll__hidden')
        & headerNav.classList.add('active')
        : headerToggle.classList.remove('active') 
        & body.classList.remove('scroll__hidden')
        & headerNav.classList.remove('active')
    });

}



