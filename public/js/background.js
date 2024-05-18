document.addEventListener('DOMContentLoaded', () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
  
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
  
    // Load the image as a texture
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/imgs/Logo circle.png', () => {
      // Create a plane with the texture as its material
      const geometry = new THREE.PlaneGeometry(5, 5);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const plane = new THREE.Mesh(geometry, material);
  
      scene.add(plane);
      camera.position.z = 4;
  
      // Animate the plane for a dynamic effect
      function animate() {
        requestAnimationFrame(animate);
        plane.rotation.x += 0.01;
        plane.rotation.y += 0.01;
        renderer.render(scene, camera);
      }
      animate();
    });
  
    // Adjust the canvas size when the window is resized
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  });
  