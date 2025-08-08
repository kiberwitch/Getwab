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
  // Smoothing helper functions
  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  const canvas = document.getElementById("wheel");
  const ctx = canvas.getContext("2d");
  const wheelContainer = document.getElementById("wheelContainer");
  const sectorsInfo = document.querySelector('.sectors-info');

  const CONFIG = {
    segments: 5,
    gapAngle: 0.05,
    radius: 200,
    innerRadius: 75,
    center: 225,
    baseColor: "#B5D9A7",
    inactiveAlpha: 0.08,
    activeAlpha: 0.2,
    scale: {
      active: 1.0,
      normal: 0.92,
    },
    maxRotationSpeed: (2 * Math.PI) / 16,
    minRotationSpeed: 0,
    stopDuration: 3500,
    slowdownDuration: 1500,
    startupDuration: 1500,
    widthStretch: 1.05,
    transitionDuration: 800,
    activeRadiusExtend: 15,
    activeInnerRadiusExtend: 15,
    highlightAngle: Math.PI, 
  };


  const segmentAngle = (2 * Math.PI) / CONFIG.segments;
  const segmentCenters = Array.from({ length: CONFIG.segments }, (_, i) => 
    segmentAngle * i + segmentAngle / 2
  );


  let state = "rotating";
  let currentRotation = 90;
  let rotationSpeed = CONFIG.maxRotationSpeed;
  let lastTimestamp = null;
  

  let currentActiveIndex = 0;
  let targetActiveIndex = 0;
  let transitionStartTime = 0;
  let isTransitioning = false;
  

  let infoOpacity = 0;
  let infoFadeState = "hidden";


  function angleDiff(a, b) {
    const diff = Math.abs(a - b);
    return Math.min(diff, 2 * Math.PI - diff);
  }

  function drawWheel(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    

    const transitionProgress = isTransitioning ? 
      Math.min(1, (timestamp - transitionStartTime) / CONFIG.transitionDuration) : 0;
    const easeProgress = easeInOutCubic(transitionProgress);
    

    for (let i = 0; i < CONFIG.segments; i++) {

      let activeWeight = 0;
      
      if (i === currentActiveIndex) {
        activeWeight = 1 - easeProgress;
      } else if (i === targetActiveIndex && isTransitioning) {
        activeWeight = easeProgress;
      }
      

      const alpha = lerp(CONFIG.inactiveAlpha, CONFIG.activeAlpha, activeWeight);
      const scale = lerp(CONFIG.scale.normal, CONFIG.scale.active, activeWeight);
      const radius = lerp(
        CONFIG.radius, 
        CONFIG.radius + CONFIG.activeRadiusExtend, 
        activeWeight
      );
      const innerRadius = lerp(
        CONFIG.innerRadius, 
        CONFIG.innerRadius + CONFIG.activeInnerRadiusExtend, 
        activeWeight
      );
      
      ctx.save();
      ctx.translate(CONFIG.center, CONFIG.center);
      
      const segmentMidAngle = segmentAngle * i + segmentAngle / 2;
      ctx.rotate(segmentMidAngle + currentRotation);
      ctx.scale(scale * CONFIG.widthStretch, scale);
      
      // Draw segment
      ctx.beginPath();
      const startAngle = -segmentAngle / 2 + CONFIG.gapAngle / 2;
      const endAngle = segmentAngle / 2 - CONFIG.gapAngle / 2;
      
      ctx.moveTo(innerRadius * Math.cos(startAngle), innerRadius * Math.sin(startAngle));
      ctx.arc(0, 0, radius, startAngle, endAngle, false);
      ctx.lineTo(innerRadius * Math.cos(endAngle), innerRadius * Math.sin(endAngle));
      ctx.arc(0, 0, innerRadius, endAngle, startAngle, true);
      ctx.closePath();
      
      ctx.fillStyle = `rgba(181, 217, 167, ${alpha})`;
      ctx.fill();
      
      ctx.restore();
    }
  }

  function updateActiveSector(timestamp) {

    let closestIndex = 0;
    let minDistance = Infinity;
    
    for (let i = 0; i < CONFIG.segments; i++) {
      const angle = (segmentCenters[i] + currentRotation) % (2 * Math.PI);
      const distance = angleDiff(angle, CONFIG.highlightAngle);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }
    

    if (closestIndex !== targetActiveIndex) {
      if (!isTransitioning) {
        transitionStartTime = timestamp;
        isTransitioning = true;
      }
      targetActiveIndex = closestIndex;
    }
    

    if (isTransitioning && timestamp - transitionStartTime >= CONFIG.transitionDuration) {
      currentActiveIndex = targetActiveIndex;
      isTransitioning = false;
    }
    

    sectorsInfo.querySelectorAll('.sector-info').forEach((el, i) => {
      const isActive = i === currentActiveIndex || (isTransitioning && i === targetActiveIndex);
      el.classList.toggle('active', isActive);
      el.classList.toggle('inactive', !isActive);
    });
  }

  function updateInfoDisplay() {

    switch (state) {
      case "stopping":
      case "stopped":
        if (infoFadeState !== "showing") {
          infoFadeState = "showing";
        }
        infoOpacity = Math.min(1, infoOpacity + 0.02);
        sectorsInfo.classList.add('visible');
        sectorsInfo.classList.remove('hidden');
        break;
        
      case "starting":
      case "rotating":
        if (infoFadeState !== "hiding") {
          infoFadeState = "hiding";
        }
        infoOpacity = Math.max(0, infoOpacity - 0.02);
        if (infoOpacity <= 0) {
          sectorsInfo.classList.remove('visible');
          sectorsInfo.classList.add('hidden');
        }
        break;
    }
  }

  function animate(timestamp) {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const deltaTime = (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;
    

    switch (state) {
      case "rotating":
        currentRotation += rotationSpeed * deltaTime;
        

        if (angleDiff(
          (segmentCenters[targetActiveIndex] + currentRotation) % (2 * Math.PI),
          CONFIG.highlightAngle
        ) < 0.05) {
          state = "stopping";
        }
        break;
        
      case "stopping":
        rotationSpeed = lerp(
          CONFIG.maxRotationSpeed,
          CONFIG.minRotationSpeed,
          Math.min(1, (timestamp - transitionStartTime) / CONFIG.slowdownDuration)
        );
        
        currentRotation += rotationSpeed * deltaTime;
        
        if (rotationSpeed <= CONFIG.minRotationSpeed + 0.001) {
          state = "stopped";
          rotationSpeed = CONFIG.minRotationSpeed;
        }
        break;
        
      case "stopped":
        if (timestamp - transitionStartTime > CONFIG.stopDuration) {
          state = "starting";
          transitionStartTime = timestamp;
        }
        break;
        
      case "starting":
        rotationSpeed = lerp(
          CONFIG.minRotationSpeed,
          CONFIG.maxRotationSpeed,
          Math.min(1, (timestamp - transitionStartTime) / CONFIG.startupDuration)
        );
        
        currentRotation += rotationSpeed * deltaTime;
        
        if (rotationSpeed >= CONFIG.maxRotationSpeed - 0.001) {
          state = "rotating";
          rotationSpeed = CONFIG.maxRotationSpeed;
        }
        break;
    }
    
    currentRotation %= 2 * Math.PI;
    

    updateActiveSector(timestamp);
    

    updateInfoDisplay();
    

    drawWheel(timestamp);
    
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
