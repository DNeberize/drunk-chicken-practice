import type { SpineGameObject } from '@esotericsoftware/spine-phaser';
import {
  BARREL_WIDTH,
  BARRELS_AMOUNT,
  BARRELS_START_X,
  JIGGLE_BARREL_ANIMATION_MS,
  JIGGLE_BARREL_SCALE,
  JIGGLE_BARREL_X_OFFSET,
  JIGGLE_BARREL_Y_OFFSET,
  JIGGLE_BARREL_Y_POS,
} from '@/utils/constants';

const activeBarrels = new Set<number>();

export default function createJiggleBarrels(scene: Phaser.Scene): SpineGameObject[] {
  const jiggleBarrels: SpineGameObject[] = [];

  for (let i = 0; i < BARRELS_AMOUNT; i++) {
    const x = BARRELS_START_X + BARREL_WIDTH / 2 + i * BARREL_WIDTH + JIGGLE_BARREL_X_OFFSET;
    const y = JIGGLE_BARREL_Y_POS + JIGGLE_BARREL_Y_OFFSET;

    const jiggleBarrel = scene.add.spine(x, y, 'bochka-data', 'bochka-atlas');
    jiggleBarrel.setScale(JIGGLE_BARREL_SCALE);
    jiggleBarrel.setVisible(false);

    jiggleBarrels.push(jiggleBarrel);
  }

  return jiggleBarrels;
}

export function playJiggleBarrelAnimation(
  scene: Phaser.Scene,
  barrelIndex: number,
  normalBarrel: Phaser.GameObjects.Image,
  jiggleBarrels: SpineGameObject[]
): void {
  const jiggleBarrel = jiggleBarrels[barrelIndex];
  if (!jiggleBarrel || !normalBarrel || activeBarrels.has(barrelIndex)) return;

  activeBarrels.add(barrelIndex);
  normalBarrel.setVisible(false);
  jiggleBarrel.setVisible(true);

  jiggleBarrel.animationState.setAnimation(0, 'bochka animation', false);

  scene.time.delayedCall(JIGGLE_BARREL_ANIMATION_MS, () => {
    jiggleBarrel.setVisible(false);
    normalBarrel.setVisible(true);
    activeBarrels.delete(barrelIndex);
  });
}
