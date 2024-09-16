import { useEffect } from 'react';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';

const usePointerLockControls = (camera, renderer) => {
  useEffect(() => {
    if (camera && renderer) {
      const controls = new PointerLockControls(camera, renderer.domElement);

      // Request pointer lock on canvas click
      const handleClick = () => {
        controls.lock();
      };

      const domElement = renderer.domElement;
      if (domElement) {
        domElement.addEventListener('click', handleClick);
      }

      return () => {
        if (domElement) {
          domElement.removeEventListener('click', handleClick);
        }
        controls.dispose();
      };
    }
  }, [camera, renderer]);
};

export default usePointerLockControls;
