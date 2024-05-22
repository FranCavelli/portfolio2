import { useEffect } from "react"
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export default function Lentes(){

    useEffect(() => {
        
        const contenedor = document.getElementById('contenedor3D');

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(28, contenedor.offsetWidth / contenedor.offsetHeight, 0.1, 1000);
        camera.position.set(3, -.5, 6);

        scene.add(camera);

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(contenedor.offsetWidth, contenedor.offsetHeight);
        //renderer.setClearColor(0x000000, 0);
        
        //RENDERER
        contenedor.appendChild(renderer.domElement);

        //CONTROLS
        const controls = new OrbitControls(camera, renderer.domElement);

        controls.enableDamping = true;

        //GLTF LOADER
        const gltfLoader = new GLTFLoader();
        gltfLoader.load(
            'anteojos.gltf',
            (gltf) => {
                gltf.scene.position.set(0, 1, 0);
                var model = gltf.scene;
                var newMaterial = new THREE.MeshNormalMaterial({flatShading: true});
                model.traverse((o) => {
                    if (o.isMesh) o.material = newMaterial;
                });
                scene.add(gltf.scene);
            }
        );
        const animate = () => {
            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }
        animate();

        //CLEAN UP 
        return () => {
            contenedor.removeChild(renderer.domElement);
        }
    }, []);
    return (
        <div 
            id="contenedor3D"
            style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                transform: 'rotate(-45deg)',
                zIndex: 100,
            }}
        >
        </div>
    )
}