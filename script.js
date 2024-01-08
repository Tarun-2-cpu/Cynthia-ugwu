const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

function firstPageAnimation() {
  var tl = gsap.timeline();

  tl.from("#nav", {
      y: -10,
      opacity: 0,
      duration: 2,
      ease: Expo.easeInOut,
  })
      .to(".boundingelem", {
          y: 0,
          ease: Expo.easeInOut,
          duration: 2,
          delay: -1,
          stagger: 0.2
      })

      .from("#herofooter", {
          y: -10,
          opacity: 0,
          duration: 1.5,
          delay: -1,
          ease: Expo.easeInOut
      });
}

var timeout;

function skewcircle() {
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;

  window.addEventListener("mousemove", function (dets) {
      clearTimeout(timeout);

      xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
      yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

      xprev = dets.clientX;
      yprev = dets.clientY;

      mouseFollower(xscale, yscale);

      timeout = setTimeout(function () {
          document.querySelector("#minicircle").style.transform = `translate(${dets.clientX - 5}px, ${dets.clientY - 5}px) scale(1,1)`;
      }, 100);
  });
}

function mouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
      document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale},${yscale})`;
  });
}

scroll.init();

document.addEventListener("DOMContentLoaded", function () {
  firstPageAnimation();
  skewcircle();

  document.querySelectorAll(".elem").forEach(function (elem) {
      var rotate = 0;
      var diffrot = 0;

      elem.addEventListener("mouseleave", function (dets) {
          gsap.to(elem.querySelector("img"), {
              opacity: 0,
              ease: Power3,
              duration: 0.5,
          });
      });

      elem.addEventListener("mousemove", function (dets) {
          var diff = dets.clientY - elem.getBoundingClientRect().top;
          diffrot = dets.clientX - rotate;
          rotate = dets.clientX;
          gsap.to(elem.querySelector("img"), {
              opacity: 1,
              ease: Power3,
              top: diff,
              left: dets.clientX,
              rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
          });
      });
  });

  function firstcursor() {
      let hero = document.querySelector("#hero");

      hero.addEventListener("mouseleave", () => {
          document.querySelector("#minicircle").style.display = "none";
      });

      hero.addEventListener("mouseenter", () => {
          document.querySelector("#minicircle").style.display = "block";
      });
  }

  firstcursor();

  function secondcursor() {
      let hero2 = document.querySelector("#hero2");

      hero2.addEventListener("mousemove", (dets) => {
          gsap.to("#view", {
              x: (dets.clientX-50) + "px",
              y: (dets.clientY) + "px",
              opacity: 1
          });
      });

      hero2.addEventListener("mouseenter", (dets) => {
          gsap.to("#view", {
              opacity: 1
          });
      });

      hero2.addEventListener("mouseleave", (dets) => {
          gsap.to("#view", {
              opacity: 0
          });
      });
  }

  secondcursor();
});


