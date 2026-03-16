import { useEffect, useRef, useState } from 'react';

interface Props {
  gameFactory: (config: { parent: string }) => Phaser.Game;
}

function PhaserGameRender({ gameFactory }: Props) {
  const [loaded, setLoaded] = useState<boolean>(false);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, [gameFactory]);

  useEffect(() => {
    const spineTextures = [
      '/assets/spine/rooster/Chicken_animation.webp',
      '/assets/spine/barrelJiggle/Bochka.webp',
      '/assets/spine/barrelDefeat/Tsageba.webp',
    ];

    const preloads = spineTextures.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = src;
        })
    );

    Promise.all(preloads).then(() => {
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (loaded) {
      const game = gameFactory({
        parent: 'phaser-container',
      });

      gameRef.current = game;

      return () => {
        game.destroy(true);
        gameRef.current = null;
      };
    }
  }, [gameFactory, loaded]);

  return <div id='phaser-container' className='h-full w-full overflow-hidden' />;
}

export default PhaserGameRender;
