gsapAnimation();
parallaxAnimation();
hoverAnimation();
cursorAnimation();

// VANTA.NET({
//   el: "body",
//   mouseControls: true,
//   touchControls: true,
//   gyroControls: false,
//   minHeight: 200.0,
//   minWidth: 200.0,
//   scale: 1.0,
//   scaleMobile: 1.0,
//   backgroundColor: 0xffffff,
//   color: 0x7e74f1,
// });

function cursorAnimation() {
  var kinet = new Kinet({
    acceleration: 0.06,
    friction: 0.2,
    names: ["x", "y"],
  });

  var circle = document.getElementById("circle");

  // set handler on kinet tick event
  kinet.on("tick", function (instances) {
    circle.style.transform = `translate3d(${instances.x.current}px, ${
      instances.y.current
    }px, 0) rotateX(${instances.x.velocity / 2}deg) rotateY(${
      instances.y.velocity / 2
    }deg)`;
  });

  // call kinet animate method on mousemove
  document.addEventListener("mousemove", function (event) {
    kinet.animate("x", event.clientX - window.innerWidth / 2);
    kinet.animate("y", event.clientY - window.innerHeight / 2);
  });
}

function parallaxAnimation() {
  let headerImage = document.getElementById("header-image-parallax");
  let parallaxInstance = new Parallax(headerImage, {
    relativeInput: true,
  });
}

function gsapAnimation() {
  gsap.fromTo("nav", { y: -100 }, { y: 0, duration: 1 });
  gsap.fromTo(
    ".header-about h4",
    { x: -400, opacity: 0 },
    { x: 0, duration: 0.5, opacity: 1 }
  );
  gsap.fromTo(
    ".header-about h1",
    { x: -400, opacity: 0 },
    { x: 0, duration: 0.6, opacity: 1 }
  );
  gsap.fromTo(
    ".header-about p",
    { x: -400, opacity: 0 },
    { x: 0, duration: 0.8, opacity: 1 }
  );
  gsap.fromTo(
    ".header-about .header-social-media",
    { x: -400, opacity: 0 },
    { x: 0, duration: 1, opacity: 1 }
  );
  gsap.fromTo(".header-image", { x: 400 }, { x: 0, duration: 1 });
}

function hoverAnimation() {
  const links = document.querySelectorAll("a");
  const logo = document.querySelector("nav .nav-logo");

  logo.addEventListener("mouseenter", shootLines);
  links.forEach((link) => link.addEventListener("mouseenter", shootLines));

  function shootLines(e) {
    const itemDim = this.getBoundingClientRect(),
      itemSize = {
        x: itemDim.right - itemDim.left,
        y: itemDim.bottom - itemDim.top,
      };

    const burst = new mojs.Burst({
      left: itemDim.left + itemSize.x / 2,
      top: itemDim.top + itemSize.y / 2,
      radiusX: itemSize.x,
      radiusY: itemSize.y,
      count: 8,

      children: {
        shape: "line",
        radius: 10,
        scale: { 0.8: 1 },
        fill: "none",
        points: 7,
        stroke: "#7e74f1",
        strokeDasharray: "100%",
        strokeDashoffset: { "-100%": "100%" },
        duration: 350,
        delay: 100,
        easing: "quad.out",
        isShowEnd: false,
      },
    });

    burst.play();
  }
}
