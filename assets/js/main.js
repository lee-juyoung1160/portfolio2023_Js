window.addEventListener("load", function () {
    main();
});

function main() {

    gsap.registerPlugin(ScrollTrigger);

    // visual animation
    
    const ani0 = gsap.timeline();
    ani0.to(".visual__main__text", {scale: 50, duration: 1})
        .to(".visual__main__text", {autoAlpha: 0})

    ScrollTrigger.create({
        animation: ani0,
        trigger: ".visual",
        start: "top top",
        end: "+=50",
        scrub: true,
        //pin: true,
        // anticipatePin: 1,
        markers: false
    });


    //스킬

    const horSection = gsap.utils.toArray(".skill__item");
    gsap.to(horSection, {
        xPercent: -100 * (horSection.length),
        ease: "none",
        scrollTrigger: {
            trigger: ".skill",
            start: "top 0%",
            end: "+=5000",
            pin: true,
            anticipatePin: true,
            scrub: 1,
            markers: false,
            invalidateOnRefresh: true,
            anticipatePin: 1,
        },
    });



    
}