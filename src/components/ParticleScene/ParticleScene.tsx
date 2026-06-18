/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/purity */
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

interface ParticleSceneProps {
  triggerText: string | null;
}

const ParticleScene: React.FC<ParticleSceneProps> = ({ triggerText }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const currentStateRef = useRef<"sphere" | "text">("sphere");
  const animationTweenRef = useRef<gsap.core.Tween | null>(null);

  const COUNT = 12000;

  // Initialize Three.js Scene
  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 25;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    createParticles();

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (particlesRef.current && currentStateRef.current === "sphere") {
        particlesRef.current.rotation.y += 0.002;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Watch for text changes
  useEffect(() => {
    if (triggerText && particlesRef.current) {
      morphToText(triggerText);
    }
  }, [triggerText]);

  // --- Helper Functions ---

  const sphericalDistribution = (i: number) => {
    const phi = Math.acos(-1 + (2 * i) / COUNT);
    const theta = Math.sqrt(COUNT * Math.PI) * phi;
    return {
      x: 8 * Math.cos(theta) * Math.sin(phi),
      y: 8 * Math.sin(theta) * Math.sin(phi),
      z: 8 * Math.cos(phi),
    };
  };

  const createParticles = () => {
    if (!sceneRef.current) return;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      const point = sphericalDistribution(i);
      positions[i * 3] = point.x + (Math.random() - 0.5) * 0.5;
      positions[i * 3 + 1] = point.y + (Math.random() - 0.5) * 0.5;
      positions[i * 3 + 2] = point.z + (Math.random() - 0.5) * 0.5;

      const color = new THREE.Color();
      const depth =
        Math.sqrt(point.x * point.x + point.y * point.y + point.z * point.z) /
        8;
      color.setHSL(0.5 + depth * 0.2, 0.7, 0.4 + depth * 0.3);

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });

    if (particlesRef.current) sceneRef.current.remove(particlesRef.current);

    const particles = new THREE.Points(geometry, material);
    sceneRef.current.add(particles);
    particlesRef.current = particles;
  };

  const createTextPoints = (text: string) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return [];

    const fontSize = 60;
    ctx.font = `bold ${fontSize}px Arial`;
    const textWidth = ctx.measureText(text).width;
    const textHeight = fontSize;

    canvas.width = textWidth + 40;
    canvas.height = textHeight + 40;

    ctx.fillStyle = "white";
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    const points: { x: number; y: number }[] = [];

    // Skip every 2 pixels to improve loop performance
    for (let y = 0; y < canvas.height; y += 2) {
      for (let x = 0; x < canvas.width; x += 2) {
        const index = (y * canvas.width + x) * 4;
        if (pixels[index] > 128) {
          // Properly scaled dimensions for the 3D space
          points.push({
            x: (x - canvas.width / 2) * 0.15,
            y: -(y - canvas.height / 2) * 0.15,
          });
        }
      }
    }
    return points;
  };

  const morphToText = (text: string) => {
    if (!particlesRef.current) return;

    // Prevent tween overlaps
    if (animationTweenRef.current) animationTweenRef.current.kill();

    currentStateRef.current = "text";
    const textPoints = createTextPoints(text);

    const geometry = particlesRef.current.geometry;
    const currentPositions = geometry.attributes.position.array as Float32Array;

    // Cache start states
    const startPositions = new Float32Array(currentPositions);
    const targetPositions = new Float32Array(COUNT * 3);

    // Reset rotation before morphing
    gsap.to(particlesRef.current.rotation, { x: 0, y: 0, z: 0, duration: 0.5 });

    for (let i = 0; i < COUNT; i++) {
      if (textPoints.length > 0 && i < textPoints.length) {
        targetPositions[i * 3] = textPoints[i].x;
        targetPositions[i * 3 + 1] = textPoints[i].y;
        targetPositions[i * 3 + 2] = 0;
      } else {
        // Explode extra particles outward in space
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 15 + 12;
        targetPositions[i * 3] = Math.cos(angle) * radius;
        targetPositions[i * 3 + 1] = Math.sin(angle) * radius;
        targetPositions[i * 3 + 2] = (Math.random() - 0.5) * 5;
      }
    }

    // Single unified GSAP animation wrapper
    const transitionProgress = { value: 0 };
    animationTweenRef.current = gsap.to(transitionProgress, {
      value: 1,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        if (!particlesRef.current) return;
        const posAttr = particlesRef.current.geometry.attributes.position
          .array as Float32Array;
        const t = transitionProgress.value;

        for (let i = 0; i < COUNT * 3; i++) {
          posAttr[i] =
            startPositions[i] + (targetPositions[i] - startPositions[i]) * t;
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      },
      onComplete: () => {
        setTimeout(() => {
          morphToCircle();
        }, 4000);
      },
    });
  };

  const morphToCircle = () => {
    if (!particlesRef.current) return;

    if (animationTweenRef.current) animationTweenRef.current.kill();

    currentStateRef.current = "sphere";
    const geometry = particlesRef.current.geometry;
    const currentPositions = geometry.attributes.position.array as Float32Array;

    const startPositions = new Float32Array(currentPositions);
    const targetPositions = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      const point = sphericalDistribution(i);
      targetPositions[i * 3] = point.x + (Math.random() - 0.5) * 0.5;
      targetPositions[i * 3 + 1] = point.y + (Math.random() - 0.5) * 0.5;
      targetPositions[i * 3 + 2] = point.z + (Math.random() - 0.5) * 0.5;
    }

    const transitionProgress = { value: 0 };
    animationTweenRef.current = gsap.to(transitionProgress, {
      value: 1,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        if (!particlesRef.current) return;
        const posAttr = particlesRef.current.geometry.attributes.position
          .array as Float32Array;
        const t = transitionProgress.value;

        for (let i = 0; i < COUNT * 3; i++) {
          posAttr[i] =
            startPositions[i] + (targetPositions[i] - startPositions[i]) * t;
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      },
    });
  };

  return (
    <div ref={mountRef} className="fixed top-0 left-0 w-full h-full z-0" />
  );
};

export default ParticleScene;
