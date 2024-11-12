document.addEventListener('DOMContentLoaded', () => {
  const hexData = [
    {
      buttons: [
        { 
          image: 'https://raw.githubusercontent.com/Fran15711/prueba1/main/radio.png', 
          isAudio: true
        },
        { image: 'https://raw.githubusercontent.com/Fran15711/prueba1/main/pngegg.png', link: 'https://www.instagram.com' },
        { image: 'https://raw.githubusercontent.com/Fran15711/prueba1/main/pngegg.png', link: 'https://www.twitter.com' },
        { image: 'https://raw.githubusercontent.com/Fran15711/prueba1/main/pngegg.png', link: 'https://www.linkedin.com' }
      ],
      background: 'url("https://example.com/background-hex1.jpg")'
    }
  ];

  const hexagons = document.querySelectorAll('.hex');
  const seccion3 = document.querySelector('.seccion3');

  let audioCtx, audioBuffer, fuenteDeReproduccion, analizador, dataArray, stop = true, progreso = 0;

  function initAudioVisualizer() {
    const canvas = document.createElement("canvas");
    canvas.style.cssText = `
      position: absolute;
      top: 23%;
      left: 17%;
      transform: translate(-50%, -50%);
      z-index: 0;
      width: 200px;
      height: 200px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.2);
      display: none;
      transition: opacity 0.5s;
    `;
    seccion3.appendChild(canvas);

    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analizador = audioCtx.createAnalyser();
    analizador.fftSize = 1024;
    dataArray = new Uint8Array(analizador.frequencyBinCount);
    const ctx = canvas.getContext("2d");

    function drawVisualizer() {
      if (!stop) requestAnimationFrame(drawVisualizer);
      analizador.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const radius = Math.min(canvas.width, canvas.height) / 3;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const barCount = 64;
      const barWidth = 4;

      for (let i = 0; i < barCount; i++) {
        const angle = (i / barCount) * Math.PI * 2;
        const barHeight = dataArray[i] * 0.1;

        const x1 = centerX + Math.cos(angle);
        const y1 = centerY + Math.sin(angle);
        const x2 = centerX + Math.cos(angle) * (radius + barHeight);
        const y2 = centerY + Math.sin(angle) * (radius + barHeight);

        const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, '#FFFFFF');
        gradient.addColorStop(1, '#1E90FF');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = barWidth;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
    }

    function toggleAudio() {
      if (stop) {
        stop = false;
        playAudio(progreso);
        drawVisualizer();
        canvas.style.display = "block";
        setTimeout(() => { canvas.style.opacity = "1"; }, 10);
      } else {
        stop = true;
        stopAudio();
        canvas.style.opacity = "0";
        setTimeout(() => { canvas.style.display = "none"; }, 500);
      }
    }

    function playAudio(offset) {
      fuenteDeReproduccion = audioCtx.createBufferSource();
      fuenteDeReproduccion.buffer = audioBuffer;
      fuenteDeReproduccion.connect(analizador);
      analizador.connect(audioCtx.destination);
      fuenteDeReproduccion.start(audioCtx.currentTime, offset);
    }

    function stopAudio() {
      fuenteDeReproduccion.stop();
    }

    return { canvas, toggleAudio };
  }

  const { canvas: visualizerCanvas, toggleAudio } = initAudioVisualizer();

  function solicitarAudio(url) {
    fetch(url)
      .then(response => response.arrayBuffer())
      .then(data => audioCtx.decodeAudioData(data, buffer => (audioBuffer = buffer)))
      .catch(console.error);
  }

  solicitarAudio("https://raw.githubusercontent.com/Fran15711/prueba1/main/Centinela_Versio%CC%81n%20larga.mp3");

  hexagons.forEach((hex, index) => {
    hex.addEventListener('click', () => {
      if (index === 0) {
        removeButtons();
        createHexButtons(hexData[index].buttons);
        visualizerCanvas.style.display = "block";
      }
    });
  });

  function createHexButtons(buttons) {
    buttons.forEach((buttonData, i) => {
      const button = createButton(buttonData);
      seccion3.appendChild(button);
      positionButtons(button, (i % 2 === 0 ? -35 : 30), (i < 2 ? -30 : 30));

      setTimeout(() => {
        button.classList.add('show');
      }, i * 50);
    });
  }

  function removeButtons() {
    document.querySelectorAll('.dynamic-button').forEach(button => button.remove());
  }

  function createButton(buttonData) {
    const button = document.createElement('button');
    button.classList.add('dynamic-button');
    const img = document.createElement('img');
    img.src = buttonData.image;
    img.alt = '';
    img.style.width = '4vw';
    img.style.height = 'auto';
    button.appendChild(img);

    if (buttonData.isAudio) {
      button.addEventListener('click', toggleAudio);
    } else {
      button.addEventListener('click', () => {
        window.open(buttonData.link, '_blank');
      });
    }
    return button;
  }

  function positionButtons(button, leftVW, topVH) {
    button.style.position = 'absolute';
    button.style.left = `calc(50vw + ${leftVW}vw)`;
    button.style.top = `calc(50vh + ${topVH}vh)`;
  }
});
