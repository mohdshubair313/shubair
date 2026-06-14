"use client";

import { useRef, useEffect } from "react";

const ThreeBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;

    const init = async () => {
      const THREE = await import("three");

      const isDark = document.documentElement.classList.contains("dark");

      const canvas = canvasRef.current;
      if (!canvas) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      camera.position.z = 30;

      const shapeOpacity = isDark ? 0.25 : 0.15;
      const particleOpacity = isDark ? 0.4 : 0.25;

      const geometry = new THREE.IcosahedronGeometry(2.5, 1);
      const material = new THREE.MeshPhysicalMaterial({
        color: isDark ? 0xf9a8d4 : 0xf472b6,
        metalness: 0.2,
        roughness: 0.2,
        transparent: true,
        opacity: shapeOpacity,
        wireframe: true,
      });
      const icosahedron = new THREE.Mesh(geometry, material);
      scene.add(icosahedron);

      const geometry2 = new THREE.TorusKnotGeometry(1.8, 0.6, 64, 8, 2, 3);
      const material2 = new THREE.MeshPhysicalMaterial({
        color: isDark ? 0x93c5fd : 0x60a5fa,
        metalness: 0.2,
        roughness: 0.2,
        transparent: true,
        opacity: shapeOpacity * 0.9,
        wireframe: true,
      });
      const torusKnot = new THREE.Mesh(geometry2, material2);
      torusKnot.position.x = -6;
      torusKnot.position.y = 3;
      scene.add(torusKnot);

      const geometry3 = new THREE.OctahedronGeometry(1.8);
      const material3 = new THREE.MeshPhysicalMaterial({
        color: isDark ? 0xfde68a : 0xfbbf24,
        metalness: 0.2,
        roughness: 0.2,
        transparent: true,
        opacity: shapeOpacity * 0.85,
        wireframe: true,
      });
      const octahedron = new THREE.Mesh(geometry3, material3);
      octahedron.position.x = 6;
      octahedron.position.y = -2;
      scene.add(octahedron);

      const particlesGeo = new THREE.BufferGeometry();
      const particlesCount = 200;
      const posArray = new Float32Array(particlesCount * 3);
      for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 80;
      }
      particlesGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
      const particlesMat = new THREE.PointsMaterial({
        size: isDark ? 0.12 : 0.08,
        transparent: true,
        opacity: particleOpacity,
        color: isDark ? 0x818cf8 : 0x94a3b8,
      });
      const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
      scene.add(particlesMesh);

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      const handleMouseMove = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      };

      window.addEventListener("resize", handleResize);
      window.addEventListener("mousemove", handleMouseMove);

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        icosahedron.rotation.x += 0.003;
        icosahedron.rotation.y += 0.005;
        torusKnot.rotation.x += 0.004;
        torusKnot.rotation.y += 0.006;
        octahedron.rotation.x += 0.005;
        octahedron.rotation.y += 0.004;
        particlesMesh.rotation.y += 0.0003;

        icosahedron.position.x += (mouseX * 3 - icosahedron.position.x) * 0.01;
        icosahedron.position.y += (mouseY * 2 - icosahedron.position.y) * 0.01;
        torusKnot.position.x += (mouseX * 2 - 6 - torusKnot.position.x) * 0.01;
        torusKnot.position.y += (mouseY * 1.5 + 3 - torusKnot.position.y) * 0.01;
        octahedron.position.x += (mouseX * 2.5 + 6 - octahedron.position.x) * 0.01;
        octahedron.position.y += (mouseY * 2 - 2 - octahedron.position.y) * 0.01;

        renderer.render(scene, camera);
      };

      animate();

      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("mousemove", handleMouseMove);
        cancelAnimationFrame(animationFrameId);
        renderer.dispose();
      };
    };

    const cleanup = init();
    return () => {
      cleanup.then((fn) => fn?.());
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default ThreeBackground;
