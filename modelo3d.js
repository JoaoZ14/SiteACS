// Modelo 3D GLB Viewer
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Esperar DOM carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

function init() {
    const canvas = document.getElementById('modelo3d-canvas');
    
    if (!canvas) {
        console.error('Canvas não encontrado');
        return;
    }
    
    console.log('Canvas encontrado:', canvas);
    
    // Cena Three.js
    const scene = new THREE.Scene();
    scene.background = null;
    
    // Câmera
    const camera = new THREE.PerspectiveCamera(
        45,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        1000
    );
    camera.position.set(0, 0, 4);
    camera.lookAt(0, 0, 0);
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.setClearColor(0x000000, 0);
    
    console.log('Renderer configurado');
    
    // Luzes
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight2.position.set(-5, 3, -5);
    scene.add(directionalLight2);
    
    // Loader do modelo
    const loader = new GLTFLoader();
    let model = null;
    
    console.log('Carregando modelo...');
    
    // URL do modelo online - Van de carga
    const modelUrl = 'https://d1a370nemizbjq.cloudfront.net/0e5c89b1-c8a8-46c0-b939-2e08d548f825.glb';
    
    loader.load(
        modelUrl,
        function(gltf) {
            console.log('Modelo carregado!');
            model = gltf.scene;
            
            // Calcular bounding box para centralizar
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            
            // Ajustar escala baseada no tamanho do modelo
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 2 / maxDim;
            model.scale.set(scale, scale, scale);
            
            // Centralizar
            model.position.sub(center.multiplyScalar(scale));
            
            scene.add(model);
            console.log('Modelo adicionado à cena');
        },
        function(progress) {
            if (progress.total > 0) {
                console.log('Carregando modelo:', (progress.loaded / progress.total * 100).toFixed(0) + '%');
            }
        },
        function(error) {
            console.error('Erro ao carregar modelo:', error);
        }
    );
    
    // Controles do mouse para rotação
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    
    canvas.addEventListener('mousedown', (e) => {
        isDragging = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
        canvas.style.cursor = 'grabbing';
    });
    
    canvas.addEventListener('mousemove', (e) => {
        if (!isDragging || !model) return;
        
        const deltaMove = {
            x: e.clientX - previousMousePosition.x,
            y: e.clientY - previousMousePosition.y
        };
        
        // Rotação horizontal
        model.rotation.y += deltaMove.x * 0.01;
        
        // Rotação vertical (limitada)
        model.rotation.x -= deltaMove.y * 0.01;
        model.rotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, model.rotation.x));
        
        previousMousePosition = { x: e.clientX, y: e.clientY };
    });
    
    canvas.addEventListener('mouseup', () => {
        isDragging = false;
        canvas.style.cursor = 'grab';
    });
    
    canvas.addEventListener('mouseleave', () => {
        isDragging = false;
        canvas.style.cursor = 'grab';
    });
    
    // Cursor inicial
    canvas.style.cursor = 'grab';
    
    // Animação contínua para renderizar
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Redimensionar canvas
    function onResize() {
        const container = canvas.parentElement;
        if (!container) return;
        
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        
        camera.aspect = canvas.width / canvas.height;
        camera.updateProjectionMatrix();
        
        renderer.setSize(canvas.width, canvas.height);
    }
    
    window.addEventListener('resize', onResize);
    onResize();
}
