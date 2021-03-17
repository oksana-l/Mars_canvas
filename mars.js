const scene = new THREE.Scene(); // Création de la scène (éspace pour placer des objets, la lumière et la caméra)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// La caméra prend 4 paramètres: la partie visible(ouvérture) en degrés, aspect ratio et les plans de découpage.
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight); // Ajout de canvas
document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(1, 32, 32); // Définit la forme de l'objet
const material = new THREE.MeshPhongMaterial(); // Définit l'aspect, la téxture
const mesh = new THREE.Mesh(geometry, material); // Un maillage : combinaison de la géométrie et de matériau
const light = new THREE.DirectionalLight(0xcccccc, 1);

light.position.set(5, 3, 5); // Orientation de la lumière
scene.add(light);
scene.add(mesh);
camera.position.z = 2; // Positionnement de la caméra par rapport à l'objet

material.map = new THREE.TextureLoader().load('res/diffuse.jpg'); // Superposition des images de téxture
material.bumpMap = new THREE.TextureLoader().load('res/bump.jpg');     
material.bumpScale = 0.015; // Indice de l'atténuation de relief

const starsGeometry = new THREE.SphereGeometry(4, 32, 32); // Ajout et paramètrage du ciel étoilé
const starsMaterial = new THREE.MeshBasicMaterial();
const starsMesh = new THREE.Mesh(starsGeometry, starsMaterial)

starsMaterial.map = new THREE.TextureLoader().load('res/stars.jpg');
starsMaterial.side = THREE.BackSide; // Affichage en arrière-plan
scene.add(starsMesh);

const animate = () => { // Une boucle de rendu de scéne
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    mesh.rotation.y -= 0.001;
};

document.addEventListener('mousemove', (e) => { // Ajout de l'interaction avec la souris
    camera.position.x = (e.x - (window.innerWidth / 2)) * 0.005;
    camera.position.y = (e.y - (window.innerWidth / 2)) * 0.005;
    camera.lookAt(scene.position);
});

animate();