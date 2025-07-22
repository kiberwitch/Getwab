document.addEventListener('DOMContentLoaded', function() {
    const section = document.getElementById('why-choose-getwab');
    const svg = document.querySelector('.chart');
    const chartContainer = document.querySelector('.chart-container');
    
    // Параметры диаграммы
    const centerX = 50;
    const centerY = 50;
    const radius = 45;
    const innerRadius = 25;
    const sectors = 5;
    const sectorAngle = 360 / sectors;
    const gapSize = 4;
    
    // Конфигурация иконок (сохраняем оригинальное расположение)
    const iconsConfig = [
        { // Иконка 1 (слева)
            iconPath: '/img/ico/icon-2.png',
            text: 'Real-time FPDS data sync',
            position: {
                angle: 220, // Угол размещения
                distance: 0.9, // Дистанция от центра
                textOffsetX: -600, // Смещение текста по X
                textOffsetY: 0, // Смещение текста по Y
                textAlign: '', // Выравнивание текста
                textPosition: 'left' // Позиция текста относительно иконки
            },
            style: {
                iconWidth: '90px',
                iconHeight: '90px',
                textFontSize: '32px',
                textMaxWidth: '400px'
            }
        },
        { // Иконка 2 (слева вверху)
            iconPath: '/img/ico/icon-3.png',
            text: 'Secure & scalable architecture',
            position: {
                angle: 295,
                distance: 1,
                textOffsetX: -600,
                textOffsetY: 0,
                textAlign: 'center',
                textPosition: 'left'
            },
            style: {
                iconWidth: '90px',
                iconHeight: '90px',
                textFontSize: '32px',
                textMaxWidth: '450px'
            }
        },
        { // Иконка 3 (вверху)
            iconPath: '/img/ico/icon-4.png',
            text: 'Real-time FPDS data sync',
            position: {
                angle: 360,
                distance: 1,
                textOffsetX: -180,
                textOffsetY: -150,
                textAlign: 'center',
                textPosition: 'left'
            },
            style: {
                iconWidth: '90px',
                iconHeight: '90px',
                textFontSize: '32px',
                textMaxWidth: '450px'
            }
        },
        { // Иконка 4 (справа вверху)
            iconPath: '/img/ico/icon.png',
            text: 'No-code dashboards',
            position: {
                angle: 430,
                distance: 1,
                textOffsetX: 260,
                textOffsetY: 0,
                textAlign: 'left',
                textPosition: 'right'
            },
            style: {
                iconWidth: '90px',
                iconHeight: '90px',
                textFontSize: '32px',
                textMaxWidth: '450px'
            }
        },
        { // Иконка 5 (справа)
            iconPath: '/img/ico/icon-1.png',
            text: 'High-speed backend',
            position: {
                angle: 495,
                distance: 1,
                textOffsetX: 260,
                textOffsetY: 0,
                textAlign: 'left',
                textPosition: 'right'
            },
            style: {
                iconWidth: '90px',
                iconHeight: '90px',
                textFontSize: '32px',
                textMaxWidth: '450px'
            }
        }
    ];
    
    const animationDuration = 1000;
    const delayBetweenSectors = 200;
    
    // Добавляем градиент
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
    gradient.id = 'sectorGradient';
    gradient.setAttribute('cx', '50%');
    gradient.setAttribute('cy', '50%');
    gradient.setAttribute('r', '50%');
    gradient.setAttribute('fx', '50%');
    gradient.setAttribute('fy', '50%');
    
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', 'rgba(181, 217, 167, 0.09)');
    
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', 'rgba(181, 217, 167, 0.09)');
    
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
            
            const startAngle = 180 + (index * sectorAngle + gapSize/2);
            const endAngle = 180 + ((index + 1) * sectorAngle - gapSize/2);
            
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('fill', 'url(#sectorGradient)');
            svg.appendChild(path);
            
            const startTime = Date.now();
            const animate = () => {
                const progress = Math.min(1, (Date.now() - startTime) / animationDuration);
                
                const currentAngle = startAngle + progress * (endAngle - startAngle);
                
                const startAngleRad = (startAngle - 90) * Math.PI / 180;
                const currentAngleRad = (currentAngle - 90) * Math.PI / 180;
                
                const x1 = centerX + radius * Math.cos(startAngleRad);
                const y1 = centerY + radius * Math.sin(startAngleRad);
                const x2 = centerX + radius * Math.cos(currentAngleRad);
                const y2 = centerY + radius * Math.sin(currentAngleRad);
                
                const x3 = centerX + innerRadius * Math.cos(currentAngleRad);
                const y3 = centerY + innerRadius * Math.sin(currentAngleRad);
                const x4 = centerX + innerRadius * Math.cos(startAngleRad);
                const y4 = centerY + innerRadius * Math.sin(startAngleRad);
                
                const largeArcFlag = (currentAngle - startAngle) <= 180 ? 0 : 1;
                
                path.setAttribute('d', `
                    M ${x1} ${y1}
                    A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
                    L ${x3} ${y3}
                    A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}
                    Z
                `);
                
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
        const angleRad = (config.position.angle - 90) * Math.PI / 180;
        const distance = (radius + innerRadius) / 2 * config.position.distance;
        
        // Позиция иконки
        const iconX = centerX + distance * Math.cos(angleRad);
        const iconY = centerY + distance * Math.sin(angleRad);
        
        // Создаем контейнер
        const iconContainer = document.createElement('div');
        iconContainer.className = 'icon-container';
        iconContainer.style.position = 'absolute';
        iconContainer.style.left = `calc(${iconX}% - ${parseInt(config.style.iconWidth)/2}px)`;
        iconContainer.style.top = `calc(${iconY}% - ${parseInt(config.style.iconHeight)/2}px)`;
        iconContainer.style.transition = 'opacity 0.5s ease';
        iconContainer.style.opacity = '0';
        
        // Иконка
        const iconImg = document.createElement('img');
        iconImg.src = config.iconPath;
        iconImg.alt = config.text;
        iconImg.style.width = config.style.iconWidth;
        iconImg.style.height = config.style.iconHeight;
        iconImg.style.transition = 'transform 0.5s ease';
        iconImg.style.transform = 'scale(0)';
        
        // Текст
        const textElement = document.createElement('div');
        textElement.className = 'icon-text';
        textElement.textContent = config.text;
        textElement.style.position = 'absolute';
        textElement.style.left = `${config.position.textOffsetX}px`;
        textElement.style.top = `${config.position.textOffsetY}px`;
        textElement.style.fontSize = config.style.textFontSize;
        textElement.style.maxWidth = config.style.textMaxWidth;
        textElement.style.textAlign = config.position.textAlign;
        textElement.style.transition = 'opacity 0.5s ease';
        textElement.style.opacity = '0';
        
        iconContainer.appendChild(iconImg);
        iconContainer.appendChild(textElement);
        chartContainer.appendChild(iconContainer);
        
        // Анимация (медленнее и последовательнее)
        setTimeout(() => {
            iconContainer.style.opacity = '1';
            setTimeout(() => {
                iconImg.style.transform = 'scale(1)';
                setTimeout(() => {
                    textElement.style.opacity = '1';
                }, 300); // Задержка перед появлением текста
            }, 200); // Задержка перед увеличением иконки
        }, index * 400); // Задержка между иконками
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startAnimation();
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });
    
    observer.observe(section);
});
