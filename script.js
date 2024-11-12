document.addEventListener('DOMContentLoaded', () => {
  const hexData = [
    {
      buttons: [
        { 
          isExternalAudio: true // Indicamos que el primer botón es para el audio externo
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

  // Añadir el script externo al documento
  const script = document.createElement('script');
  script.src = 'https://raw.githubusercontent.com/prueba2marcas/radio.js';
  document.head.appendChild(script);

  script.onload = function() {
    console.log('Script radio.js cargado correctamente.');
  };

  hexagons.forEach((hex, index) => {
    hex.addEventListener('click', () => {
      if (index === 0) {
        removeButtons();
        createHexButtons(hexData[index].buttons);
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
    
    if (buttonData.isExternalAudio) {
      // Si el botón es para audio externo, no generamos una imagen, solo el botón
      button.textContent = "Reproducir Audio Externo"; // Puedes personalizar el texto si lo deseas
      button.addEventListener('click', () => {
        // Llamamos a la función playExternalAudio definida en radio.js
        if (typeof playExternalAudio === 'function') {
          playExternalAudio();
        } else {
          console.error('La función playExternalAudio no está definida.');
        }
      });
    } else if (buttonData.link) {
      // Si es un enlace, usamos la imagen y lo enlazamos
      const img = document.createElement('img');
      img.src = buttonData.image;
      img.alt = '';
      img.style.width = '4vw';
      img.style.height = 'auto';
      button.appendChild(img);
      
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
