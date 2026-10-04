document.addEventListener("DOMContentLoaded", function() {
      
  const svgNS = "http://www.w3.org/2000/svg";
  const container = document.getElementById('grid-container');

  // 1. LES VARIABLES PAR DÉFAUT
  const pathDefaut = "M0 0 C-10 -20 -5 -40 0 -40 C5 -40 10 -20 0 0 Z";
  const couleurDefaut = "#fde2e4";
  const centreDefaut = "#c3d645";

  // Palette de couleurs variées pour alimenter la grande grille
  const palettes = ["#fde2e4", "#84b6f4", "#ffb347", "#b19cd9", "#a19ca9", "#dd7e7a", "#ffb3a7", "#ffcefa"];
  const paths = [
    pathDefaut,
    "M0 0 C-15 -15 -12 -28 0 -25 C12 -28 15 -15 0 0 Z",
    "M0 0 L -2 -35 C-5 -37 -5 -42 0 -43 C5 -42 5 -37 2 -35 L 0 0 Z",
    "M0 0 L -3 -20 C-15 -27 -10 -38 0 -40 C10 -38 15 -27 3 -20 L 0 0 Z",
    "M0 0 C-10 -30 5 0 -10 -20 L 10 -20 C -5 0 10 -30 0 0 Z",
    "M0 0 C-5 -30 5 0 -5 -20 L 0 -17 L 5 -20 C -5 0 5 -30 0 0 Z"
  ];

  // 2. LE TABLEAU DE CONFIGURATION (8 de large x 15 de haut = 120 fleurs)
  const totalFleurs = 8 * 15;
  const grilleConfig = Array.from({ length: totalFleurs }, (_, index) => ({
    path: paths[index % paths.length],
    couleur: palettes[index % palettes.length],
    centre: index % 2 === 0 ? "#c3d645" : "#ffd700",
    nbPetales: 5 + (index % 10) // Varie le nombre de pétales de 5 à 14
  }));

  // 3. LA FONCTION "USINE"
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

  // 4. MISE À JOUR DU STYLE DE LA GRILLE POUR 8 COLONNES
  container.style.gridTemplateColumns = "repeat(8, 1fr)";
  container.style.maxWidth = "1400px";

  // 5. GÉNÉRATION DE LA GRILLE
  grilleConfig.forEach((config) => {
    const flowerNode = createFlower(config);
    container.appendChild(flowerNode);
  });

  // 6. ANIMATIONS GSAP (optimisées avec stagger adapté pour 120 éléments)
  const flowers = document.querySelectorAll('.wp-single-flower');
  const petals = document.querySelectorAll('.wp-single-flower .petals path');

  if (flowers.length > 0) {
    gsap.fromTo(flowers, 
      { opacity: 0, scale: 0, rotation: -45 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "back.out(1.7)", stagger: 0.01 }
    );

    gsap.to(flowers, {
      rotation: "+=360",
      duration: 40,
      repeat: -1,
      ease: "none"
    });

    petals.forEach(petal => {
      gsap.to(petal, {
        opacity: gsap.utils.random(0.3, 1),
        duration: gsap.utils.random(0.3, 0.9),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: gsap.utils.random(0, 3)
      });
    });
  }
});
