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
  script.src = 'https://raw.githubusercontent.com/Fran15711/prueba2marcas/refs/heads/main/radio.js';
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
      // Si es el botón externo, no creamos un botón manual
      if (buttonData.isExternalAudio) {
        console.log('Creando botón de audio externo...');
        // Esperamos que `initializeExternalAudioPlayer` o la función en radio.js cree y muestre el botón
        if (typeof initializeExternalAudioPlayer === 'function') {
          initializeExternalAudioPlayer(seccion3); // Llamamos la función que maneja el reproductor externo
        } else {
          console.error('La función initializeExternalAudioPlayer no está definida en radio.js');
        }
      } else {
        // Creamos botones para enlaces de redes sociales
        const button = createButton(buttonData);
        seccion3.appendChild(button);
        positionButtons(button, (i % 2 === 0 ? -35 : 30), (i < 2 ? -30 : 30));
  
        setTimeout(() => {
          button.classList.add('show');
        }, i * 50);
      }
    });
  }

  function removeButtons() {
    document.querySelectorAll('.dynamic-button').forEach(button => button.remove());
  }

  function createButton(buttonData) {
    const button = document.createElement('button');
    button.classList.add('dynamic-button');
    
    if (buttonData.link) {
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
