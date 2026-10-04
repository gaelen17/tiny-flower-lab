document.addEventListener("DOMContentLoaded", function() {
      
  const svgNS = "http://www.w3.org/2000/svg";
  const container = document.getElementById('grid-container');

  // 1. LES VARIABLES PAR DÉFAUT (Adaptées au centre 0 0)
  const pathDefaut = "M0 0 C-10 -20 -5 -40 0 -40 C5 -40 10 -20 0 0 Z";
  const couleurDefaut = "#fde2e4";
  const centreDefaut = "#c3d645";

  // 2. LE TABLEAU DE CONFIGURATION (Tes 16 lignes de laboratoire)
  const grilleConfig = Array.from({ length: 16 }, () => ({
    path: pathDefaut,
    couleur: couleurDefaut,
    centre: centreDefaut,
    nbPetales: 5
  }));

  // --- Modifications individuelles (coordonnées ramenées autour de 0 0) ---
  grilleConfig[1].couleur = "#84b6f4";
  
  grilleConfig[2].path = "M0 0 C-15 -15 -12 -28 0 -25 C12 -28 15 -15 0 0 Z"; 
  grilleConfig[2].couleur = "#ffb347"; 
  
  grilleConfig[13].nbPetales = 8; 
  grilleConfig[13].couleur = "#b19cd9"; 

   grilleConfig[3].path = "M0 0 L -2 -35 C-5 -37 -5 -42 0 -43 C5 -42 5 -37 2 -35 L 0 0 Z"; 
  grilleConfig[3].couleur = "#a19ca9"; 
  grilleConfig[3].nbPetales = 18; 

  grilleConfig[4].path = "M0 0 L -3 -20 C-15 -27 -10 -38 0 -40 C10 -38 15 -27 3 -20 L 0 0 Z"; 
  grilleConfig[4].couleur = "#a19ca4"; 
  grilleConfig[4].nbPetales = 7; 

  grilleConfig[5].path = "M0 0 L -2 -26 C-7 -33 -7 -42 0 -43 C7 -42 7 -33 2 -26 L 0 0 Z"; 
  grilleConfig[5].couleur = "#b19ca9"; 
  grilleConfig[5].nbPetales = 14; 
  
  grilleConfig[15].path = "M0 0 C-15 -15 -12 -28 0 -25 C12 -28 15 -15 0 0 Z"; 
  grilleConfig[15].couleur = "#ffb347"; 
  grilleConfig[15].nbPetales = 7; 

  grilleConfig[6].path = "M0 0 C-15 -15 -12 -28 0 -25 C12 -28 15 -15 0 0 Z"; 
  grilleConfig[6].couleur = "#ffb3a7"; 
  grilleConfig[6].nbPetales = 4; 

  grilleConfig[7].path = "M0 0 C-10 -30 5 0 -10 -20 L 10 -20 C -5 0 10 -30 0 0 Z"; 
  grilleConfig[7].couleur = "#b19CD9"; 
  grilleConfig[7].nbPetales = 5; 

  grilleConfig[8].path = "M0 0 C-7 -12 -10 -20 0 -20 C10 -20 7 -12 0 0 Z"; 
  grilleConfig[8].couleur = "#dd7e7a"; 
  grilleConfig[8].nbPetales = 5; 

  grilleConfig[9].path = "M0 0 C-5 -30 5 0 -5 -20 L 0 -17 L 5 -20 C -5 0 5 -30 0 0 Z"; 
  grilleConfig[9].couleur = "#FdDeFa"; 
  grilleConfig[9].nbPetales = 7; 

  grilleConfig[10].path = "M0 0 C-5 -30 5 0 -5 -20 L 0 -17 L 5 -20 C -5 0 5 -30 0 0 Z"; 
  grilleConfig[10].couleur = "#FdDeFa"; 
  grilleConfig[10].nbPetales = 10; 

  grilleConfig[11].path = "M0 0 C-5 -30 5 0 -5 -20 L 0 -17 L 5 -20 C -5 0 5 -30 0 0 Z"; 
  grilleConfig[11].couleur = "#FfceFa"; 
  grilleConfig[11].nbPetales = 10; 

  grilleConfig[12].path = "M0 0 C-5 -30 5 0 -12 -40 C 0 -30 0 -30 12 -40 C -5 0 5 -30 0 0 Z"; 
  grilleConfig[12].couleur = "#84B6F4"; 
  grilleConfig[12].nbPetales = 5; 

  // 3. LA FONCTION "USINE" (avec viewBox centré à 0,0)
  function createFlower(config) {
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('class', 'wp-single-flower');
    svg.setAttribute('viewBox', '-50 -50 100 100');
    
    const petalsGroup = document.createElementNS(svgNS, 'g');
    petalsGroup.setAttribute('class', 'petals');
    petalsGroup.setAttribute('fill', config.couleur);
    petalsGroup.setAttribute('stroke', config.couleur);
    petalsGroup.setAttribute('stroke-width', '1');

    for (let i = 0; i < config.nbPetales; i++) {
      const angle = (360 / config.nbPetales) * i;
      const path = document.createElementNS(svgNS, 'path');
      path.setAttribute('d', config.path);
      path.setAttribute('transform', `rotate(${angle} 0 0)`);
      petalsGroup.appendChild(path);
    }

    const circle = document.createElementNS(svgNS, 'circle');
    circle.setAttribute('class', 'center');
    circle.setAttribute('cx', '0');
    circle.setAttribute('cy', '0');
    circle.setAttribute('r', '6');
    circle.setAttribute('fill', config.centre);

    svg.appendChild(petalsGroup);
    svg.appendChild(circle);

    return svg;
  }

  // 4. GÉNÉRATION DE LA GRILLE
  grilleConfig.forEach((config) => {
    const flowerNode = createFlower(config);
    container.appendChild(flowerNode);
  });

  // 5. TES ANIMATIONS GSAP
  const flowers = document.querySelectorAll('.wp-single-flower');
  const petals = document.querySelectorAll('.wp-single-flower .petals path');

  if (flowers.length > 0) {
    gsap.fromTo(flowers, 
      { opacity: 0, scale: 0, rotation: -45 },
      { opacity: 1, scale: 1, duration: 1.5, ease: "back.out(1.7)", stagger: 0.1 }
    );

    gsap.to(flowers, {
      rotation: "+=360",
      duration: 30,
      repeat: -1,
      ease: "none"
    });

    petals.forEach(petal => {
      gsap.to(petal, {
        opacity: gsap.utils.random(0.3, 1),
        duration: gsap.utils.random(0.2, 0.8),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: gsap.utils.random(0, 2)
      });
    });
  }
});
