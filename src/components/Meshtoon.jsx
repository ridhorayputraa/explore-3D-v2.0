function Meshtoon() {
  return (
    <div>
      <Canvas>
        <mesh>
          {/* <sphereGeometry args={[3, 80,80]} /> */}
          <torusKnotGeometry args={[1.7, 0.3, 256, 256]} />
          <meshToonMaterial color={0x00bfff} />
          {/* <meshBasicMaterial wireframe /> */}
        </mesh>
        <directionalLight position={[2, 5, 1]} />
      </Canvas>
    </div>
  );
}

export default Meshtoon;
