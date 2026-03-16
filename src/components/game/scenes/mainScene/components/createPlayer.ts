import Phaser from 'phaser';
import { DESIGN_HEIGHT, BARRELS_START_X, BARREL_WIDTH } from '@utils/constants.ts';
import type { SpineGameObject } from '@esotericsoftware/spine-phaser';

export default function createPlayer(
  scene: Phaser.Scene,
  blocks: Phaser.Physics.Arcade.StaticGroup,
  barrels: Phaser.Physics.Arcade.StaticGroup
): SpineGameObject {
  const player = scene.add.spine(
    BARRELS_START_X + BARREL_WIDTH / 2 - BARREL_WIDTH + 5,
    DESIGN_HEIGHT / 2 - 200 / 2, // Position at bottom of world
    'rooster-data',
    'rooster-atlas'
  );

  player.setOrigin(0.5, 0.5);

  scene.physics.add.existing(player);
  const body = player.body as Phaser.Physics.Arcade.Body;
  body.setSize(140, 200);
  body.setCollideWorldBounds(true);

  scene.physics.add.collider(player, blocks);
  scene.physics.add.collider(player, barrels);
  player.animationState.setAnimation(0, 'dgoma', true);
  player.scale = 0.3;

  return player;
}
