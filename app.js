document.addEventListener("DOMContentLoaded", function () {
  const burgerMenu = document.querySelector(".burger-menu");
  const mobileMenu = document.querySelector(".mobile-menu");

  burgerMenu.addEventListener("click", function () {
    mobileMenu.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  const closeMenu = document.querySelector(".close-mobile-menu");
  closeMenu.addEventListener("click", function () {
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "";
  });

  const menuItems = document.querySelectorAll(".mobile-menu-item");
  menuItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();

        menuItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("active");
            otherItem.nextElementSibling.style.display = "none";
          }
        });

        this.classList.toggle("active");
        const submenu = this.nextElementSibling;
        if (this.classList.contains("active")) {
          submenu.style.display = "flex";
        } else {
          submenu.style.display = "none";
        }
      }
    });
  });

  const mobileSubmenuItems = document.querySelectorAll(".mobile-submenu-item");
  mobileSubmenuItems.forEach((item) => {
    item.addEventListener("click", function () {
      mobileMenu.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  mobileMenu.addEventListener("click", function (e) {
    if (e.target === mobileMenu) {
      mobileMenu.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
});

window.addEventListener("scroll", function () {
  const fixedHeader = document.querySelector(".fixed-header");
  const scrollPosition = window.scrollY;

  if (scrollPosition > 800) {
    fixedHeader.classList.add("active");
  } else {
    fixedHeader.classList.remove("active");
  }
});

function isMobileDevice() {
  return window.innerWidth <= 768;
}

document.addEventListener("DOMContentLoaded", function () {
  const section = document.getElementById("why-choose-getwab");
  const svg = document.querySelector(".chart");
  const chartContainer = document.querySelector(".chart-container");

  const centerX = 50;
  const centerY = 50;
  const radius = 45;
  const innerRadius = 25;
  const sectors = 5;
  const sectorAngle = 360 / sectors;
  const gapSize = 4;

  const iconsConfig = [
    {
      iconPath: "/img/ico/icon-2.png",
      text: "Real-time FPDS data sync",
      position: {
        angle: 220,
        distance: 0.9,
        textOffsetX: -600,
        textOffsetY: 0,
        textAlign: "",
        textPosition: "left",
      },
      style: {
        iconWidth: "90px",
        iconHeight: "90px",
        textFontSize: "32px",
        textMaxWidth: "400px",
      },
    },
    {
      iconPath: "/img/ico/icon-3.png",
      text: "Secure & scalable architecture",
      position: {
        angle: 295,
        distance: 1,
        textOffsetX: -600,
        textOffsetY: 0,
        textAlign: "center",
        textPosition: "left",
      },
      style: {
        iconWidth: "90px",
        iconHeight: "90px",
        textFontSize: "32px",
        textMaxWidth: "450px",
      },
    },
    {
      iconPath: "/img/ico/icon-4.png",
      text: "Real-time FPDS data sync",
      position: {
        angle: 360,
        distance: 1,
        textOffsetX: -180,
        textOffsetY: -150,
        textAlign: "center",
        textPosition: "left",
      },
      style: {
        iconWidth: "90px",
        iconHeight: "90px",
        textFontSize: "32px",
        textMaxWidth: "450px",
      },
    },
    {
      iconPath: "/img/ico/icon.png",
      text: "No-code dashboards",
      position: {
        angle: 430,
        distance: 1,
        textOffsetX: 260,
        textOffsetY: 0,
        textAlign: "left",
        textPosition: "right",
      },
      style: {
        iconWidth: "90px",
        iconHeight: "90px",
        textFontSize: "32px",
        textMaxWidth: "450px",
      },
    },
    {
      iconPath: "/img/ico/icon-1.png",
      text: "High-speed backend",
      position: {
        angle: 495,
        distance: 1,
        textOffsetX: 260,
        textOffsetY: 0,
        textAlign: "left",
        textPosition: "right",
      },
      style: {
        iconWidth: "90px",
        iconHeight: "90px",
        textFontSize: "32px",
        textMaxWidth: "450px",
      },
    },
  ];

  const animationDuration = 1000;
  const delayBetweenSectors = 200;

  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  const gradient = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "radialGradient"
  );
  gradient.id = "sectorGradient";
  gradient.setAttribute("cx", "50%");
  gradient.setAttribute("cy", "50%");
  gradient.setAttribute("r", "50%");
  gradient.setAttribute("fx", "50%");
  gradient.setAttribute("fy", "50%");

  const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop1.setAttribute("offset", "0%");
  stop1.setAttribute("stop-color", "rgba(181, 217, 167, 0.09)");

  const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop2.setAttribute("offset", "100%");
  stop2.setAttribute("stop-color", "rgba(181, 217, 167, 0.09)");

  gradient.appendChild(stop1);
  gradient.appendChild(stop2);
  defs.appendChild(gradient);
  svg.insertBefore(defs, svg.firstChild);

  let animationStarted = false;

  function startAnimation() {
    if (animationStarted) return;
    animationStarted = true;

    function animateSector(index) {
      if (index >= sectors) return;

      const startAngle = 180 + (index * sectorAngle + gapSize / 2);
      const endAngle = 180 + ((index + 1) * sectorAngle - gapSize / 2);

      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      path.setAttribute("fill", "url(#sectorGradient)");
      svg.appendChild(path);

      const startTime = Date.now();
      const animate = () => {
        const progress = Math.min(
          1,
          (Date.now() - startTime) / animationDuration
        );

        const currentAngle = startAngle + progress * (endAngle - startAngle);

        const startAngleRad = ((startAngle - 90) * Math.PI) / 180;
        const currentAngleRad = ((currentAngle - 90) * Math.PI) / 180;

        const x1 = centerX + radius * Math.cos(startAngleRad);
        const y1 = centerY + radius * Math.sin(startAngleRad);
        const x2 = centerX + radius * Math.cos(currentAngleRad);
        const y2 = centerY + radius * Math.sin(currentAngleRad);

        const x3 = centerX + innerRadius * Math.cos(currentAngleRad);
        const y3 = centerY + innerRadius * Math.sin(currentAngleRad);
        const x4 = centerX + innerRadius * Math.cos(startAngleRad);
        const y4 = centerY + innerRadius * Math.sin(startAngleRad);

        const largeArcFlag = currentAngle - startAngle <= 180 ? 0 : 1;

        path.setAttribute(
          "d",
          `
                M ${x1} ${y1}
                A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
                L ${x3} ${y3}
                A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}
                Z
            `
        );

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          addIconWithText(index);
          setTimeout(() => animateSector(index + 1), delayBetweenSectors);
        }
      };

      animate();
    }

    animateSector(0);
  }

  function addIconWithText(index) {
    const config = iconsConfig[index];
    const angleRad = ((config.position.angle - 90) * Math.PI) / 180;
    const distance = ((radius + innerRadius) / 2) * config.position.distance;

    const iconX = centerX + distance * Math.cos(angleRad);
    const iconY = centerY + distance * Math.sin(angleRad);

    const iconContainer = document.createElement("div");
    iconContainer.className = "icon-container";
    iconContainer.style.position = "absolute";
    iconContainer.style.left = `calc(${iconX}% - ${
      parseInt(config.style.iconWidth) / 2
    }px)`;
    iconContainer.style.top = `calc(${iconY}% - ${
      parseInt(config.style.iconHeight) / 2
    }px)`;
    iconContainer.style.transition = "opacity 0.5s ease";
    iconContainer.style.opacity = "0";

    const iconImg = document.createElement("img");
    iconImg.src = config.iconPath;
    iconImg.alt = config.text;
    iconImg.style.width = config.style.iconWidth;
    iconImg.style.height = config.style.iconHeight;
    iconImg.style.transition = "transform 0.5s ease";
    iconImg.style.transform = "scale(0)";

    const textElement = document.createElement("div");
    textElement.className = "icon-text";
    textElement.textContent = config.text;
    textElement.style.position = "absolute";
    textElement.style.left = `${config.position.textOffsetX}px`;
    textElement.style.top = `${config.position.textOffsetY}px`;
    textElement.style.fontSize = config.style.textFontSize;
    textElement.style.maxWidth = config.style.textMaxWidth;
    textElement.style.textAlign = config.position.textAlign;
    textElement.style.transition = "opacity 0.5s ease";
    textElement.style.opacity = "0";

    iconContainer.appendChild(iconImg);
    iconContainer.appendChild(textElement);
    chartContainer.appendChild(iconContainer);

    setTimeout(() => {
      iconContainer.style.opacity = "1";
      iconImg.style.transform = "scale(1)";
      setTimeout(() => {
        textElement.style.opacity = "1";
      }, 150);
    }, 0);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startAnimation();
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

  observer.observe(section);
});

function initMobileAnimation() {
  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  const canvas = document.getElementById("wheel");
  const ctx = canvas.getContext("2d");
  const wheelContainer = document.getElementById("wheelContainer");

  const CONFIG = {
    segments: 5,
    gapAngle: 0.1,
    radius: 200,
    innerRadius: 75,
    center: 225,
    baseColor: "#B5D9A7",
    inactiveAlpha: 0.08,
    activeAlpha: 0.2,
    scale: {
      active: 1.0,
      normal: 0.9,
    },
    maxRotationSpeed: (2 * Math.PI) / 14,
    minRotationSpeed: 0,
    stopDuration: 3000,
    slowdownDuration: 1000,
    startupDuration: 1000,
    widthStretch: 1.1,
  };

  const activeRadiusExtend = 15;
  const activeInnerRadiusExtend = 20;

  const iconsConfig = [
    { iconPath: "/img/ico/icon-2.png", text: "Real-time FPDS data sync" },
    { iconPath: "/img/ico/icon-3.png", text: "Secure & scalable architecture" },
    { iconPath: "/img/ico/icon-4.png", text: "Real-time FPDS data sync" },
    { iconPath: "/img/ico/icon.png", text: "No-code dashboards" },
    { iconPath: "/img/ico/icon-1.png", text: "High-speed backend" },
  ];

  const segmentAngle = (2 * Math.PI) / CONFIG.segments;
  const segmentCenters = Array(CONFIG.segments)
    .fill(0)
    .map((_, i) => segmentAngle * i + segmentAngle / 2);

  function angleDiff(a1, a2) {
    let diff = Math.abs(a1 - a2);
    return diff > Math.PI ? 2 * Math.PI - diff : diff;
  }

  const highlightAngle = Math.PI;

  let state = "rotating";
  let currentRotation = 0;
  let rotationSpeed = CONFIG.maxRotationSpeed;
  let stopStartTime = null;
  let lastTimestamp = null;
  let activeIndex = 0;

  let sectorInfoEl = null;
  let opacity = 0;
  let showingSector = null;
  const fadeDuration = 500;
  let fadeStartTime = null;
  let fadingIn = false;
  let fadingOut = false;

  function createSectorInfoElement(iconPath, text) {
    const container = document.createElement("div");
    container.className = "sector-info";

    const img = document.createElement("img");
    img.src = iconPath;
    img.alt = text;
    img.className = "sector-icon";

    const textEl = document.createElement("div");
    textEl.className = "sector-text";
    textEl.textContent = text;

    container.appendChild(img);
    container.appendChild(textEl);

    wheelContainer.appendChild(container);
    return container;
  }

  function updateSectorInfoPosition(rotation, activeIndex) {
    if (!sectorInfoEl) return;

    const angle = (segmentCenters[activeIndex] + rotation) % (2 * Math.PI);
    const radiusForIcon = CONFIG.radius + activeRadiusExtend + 30;

    const iconCenterX = CONFIG.center + Math.cos(angle) * radiusForIcon;
    const iconCenterY = CONFIG.center + Math.sin(angle) * radiusForIcon;

    const iconOffsetX = 200;
    const iconOffsetY = 25;
    const textOffsetX = 0;
    const textOffsetY = 0;

    const containerLeft = iconCenterX - iconOffsetX + textOffsetX;
    const containerTop = iconCenterY - iconOffsetY + textOffsetY;

    sectorInfoEl.style.left = containerLeft + "px";
    sectorInfoEl.style.top = containerTop + "px";
  }

  function removeSectorInfo() {
    if (sectorInfoEl && wheelContainer.contains(sectorInfoEl)) {
      wheelContainer.removeChild(sectorInfoEl);
      sectorInfoEl = null;
    }
    opacity = 0;
    showingSector = null;
    fadeStartTime = null;
    fadingIn = false;
    fadingOut = false;
  }

  function hexToRgba(hex, alpha) {
    hex = hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  function drawWheel(rotation) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let minDist = Infinity;
    let nearestIndex = 0;
    for (let i = 0; i < CONFIG.segments; i++) {
      let dist = angleDiff(
        (segmentCenters[i] + rotation) % (2 * Math.PI),
        highlightAngle
      );
      if (dist < minDist) {
        minDist = dist;
        nearestIndex = i;
      }
    }
    activeIndex = nearestIndex;

    for (let i = 0; i < CONFIG.segments; i++) {
      let alpha = i === activeIndex ? CONFIG.activeAlpha : CONFIG.inactiveAlpha;
      let scale = CONFIG.scale.normal;

      let radius =
        i === activeIndex ? CONFIG.radius + activeRadiusExtend : CONFIG.radius;
      let innerRadius =
        i === activeIndex
          ? CONFIG.innerRadius + activeInnerRadiusExtend
          : CONFIG.innerRadius;

      ctx.save();
      ctx.translate(CONFIG.center, CONFIG.center);

      const segmentMidAngle = segmentAngle * i + segmentAngle / 2;
      ctx.rotate(segmentMidAngle + rotation);

      ctx.scale(scale * CONFIG.widthStretch, scale);

      ctx.beginPath();

      const startAngle = -segmentAngle / 2 + CONFIG.gapAngle / 2;
      const endAngle = segmentAngle / 2 - CONFIG.gapAngle / 2;

      ctx.moveTo(
        innerRadius * Math.cos(startAngle),
        innerRadius * Math.sin(startAngle)
      );
      ctx.arc(0, 0, radius, startAngle, endAngle, false);
      ctx.lineTo(
        innerRadius * Math.cos(endAngle),
        innerRadius * Math.sin(endAngle)
      );
      ctx.arc(0, 0, innerRadius, endAngle, startAngle, true);
      ctx.closePath();

      ctx.fillStyle = hexToRgba(CONFIG.baseColor, alpha);
      ctx.fill();

      ctx.restore();
    }
  }

  function animate(timestamp) {
    if (!lastTimestamp) lastTimestamp = timestamp;
    if (!stopStartTime) stopStartTime = timestamp;

    const deltaTime = (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;

    switch (state) {
      case "rotating":
        if (
          angleDiff(
            (segmentCenters[activeIndex] + currentRotation) % (2 * Math.PI),
            highlightAngle
          ) < 0.08
        ) {
          state = "stopping";
          stopStartTime = timestamp;
          if (!fadingIn && !opacity) {
            fadeStartTime = timestamp;
            fadingIn = true;
            fadingOut = false;
          }
        }
        currentRotation += rotationSpeed * deltaTime;
        break;

      case "stopping":
        const elapsedStop = timestamp - stopStartTime;
        if (elapsedStop >= CONFIG.slowdownDuration) {
          rotationSpeed = 0;
          state = "stopped";
          stopStartTime = timestamp;
          if (!fadingIn && !opacity) {
            fadeStartTime = timestamp;
            fadingIn = true;
            fadingOut = false;
          }
        } else {
          rotationSpeed = lerp(
            CONFIG.maxRotationSpeed,
            CONFIG.minRotationSpeed,
            elapsedStop / CONFIG.slowdownDuration
          );
          currentRotation += rotationSpeed * deltaTime;
        }
        break;

      case "stopped":
        const elapsedStopped = timestamp - stopStartTime;
        if (elapsedStopped >= CONFIG.stopDuration) {
          state = "starting";
          stopStartTime = timestamp;
          if (!fadingOut && opacity) {
            fadeStartTime = timestamp;
            fadingOut = true;
            fadingIn = false;
          }
        }
        break;

      case "starting":
        const elapsedStart = timestamp - stopStartTime;
        if (elapsedStart >= CONFIG.startupDuration) {
          rotationSpeed = CONFIG.maxRotationSpeed;
          state = "rotating";
          stopStartTime = timestamp;
          activeIndex = (activeIndex + 1) % CONFIG.segments;
          if (!fadingOut && opacity) {
            fadeStartTime = timestamp;
            fadingOut = true;
            fadingIn = false;
          }
        } else {
          rotationSpeed = lerp(
            CONFIG.minRotationSpeed,
            CONFIG.maxRotationSpeed,
            elapsedStart / CONFIG.startupDuration
          );
          currentRotation += rotationSpeed * deltaTime;
        }
        break;
    }

    currentRotation %= 2 * Math.PI;

    if (fadeStartTime !== null) {
      const fadeElapsed = timestamp - fadeStartTime;
      let t = Math.min(fadeElapsed / fadeDuration, 1);
      if (fadingIn) {
        opacity = lerp(0, 1, t);
        if (t >= 1) {
          fadingIn = false;
          fadeStartTime = null;
          opacity = 1;
        }
      } else if (fadingOut) {
        opacity = lerp(1, 0, t);
        if (t >= 1) {
          fadingOut = false;
          fadeStartTime = null;
          opacity = 0;
          removeSectorInfo();
        }
      }
    }

    drawWheel(currentRotation);

    if (opacity > 0) {
      if (!sectorInfoEl) {
        const conf = iconsConfig[activeIndex];
        if (conf) {
          sectorInfoEl = createSectorInfoElement(conf.iconPath, conf.text);
          showingSector = activeIndex;
          sectorInfoEl.style.opacity = "0";
        }
      }
      sectorInfoEl.style.opacity = opacity.toFixed(2);
      updateSectorInfoPosition(currentRotation, activeIndex);
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

document.addEventListener("DOMContentLoaded", function () {
  if (isMobileDevice()) {
    initMobileAnimation();
  } else {
    initDesktopAnimation();
  }
});

window.addEventListener("resize", function () {
  const section = document.getElementById("why-choose-getwab");
  const desktopContent = document.querySelector(".desktop-animation");
  const mobileContent = document.querySelector(".mobile-animation");

  desktopContent.innerHTML = `
    <div class="choose-getwab-main-content">
      <div class="chart-container">
        <svg class="chart" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"></svg>
      </div>
    </div>
  `;

  mobileContent.innerHTML = `
    <div class="wheel-container" id="wheelContainer">
      <canvas id="wheel" width="450" height="450"></canvas>
    </div>
  `;

  if (isMobileDevice()) {
    initMobileAnimation();
  } else {
    initDesktopAnimation();
  }
});
