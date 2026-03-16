import Phaser from 'phaser';
import { BARRELS_START_X, BARRELS_AMOUNT, BARREL_WIDTH, DESIGN_HEIGHT } from '@utils/constants.ts';
import createBoards, { BOARD_W } from '@scenes/mainScene/components/createBoards.ts';
import { setupWorldAndCamera } from '@scenes/mainScene/components/setupCamera.ts';
import createBackground from '@scenes/mainScene/components/createBackground.ts';
import createPlayer from '@scenes/mainScene/components/createPlayer.ts';
import createChicken from '@scenes/mainScene/components/createChicken.ts';
import setupInput from '@scenes/mainScene/components/setupInput.ts';
import createBarrels from '@scenes/mainScene/components/createBarrels.ts';
import { SpineGameObject } from '@esotericsoftware/spine-phaser';

export type MainSceneObjectsType = {
  player: SpineGameObject;
  chicken: Phaser.GameObjects.Image;
  blocks: Phaser.Physics.Arcade.StaticGroup;
  barrels: Phaser.Physics.Arcade.StaticGroup;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  worldWidth: number;
  snapped: boolean;
};

export class MainScene extends Phaser.Scene {
  objects: MainSceneObjectsType = {} as MainSceneObjectsType;

  constructor() {
    super({
      key: 'MainScene',
      physics: {
        arcade: {
          gravity: { y: 900, x: 0 },
          debug: false,
        },
      },
    });
  }

  create(): void {
    this.objects.worldWidth = BARRELS_START_X + BARRELS_AMOUNT * BARREL_WIDTH + BOARD_W;

    setupWorldAndCamera(this, this.objects);
    createBackground(this, this.objects);
    this.objects.barrels = createBarrels(this);
    this.objects.blocks = createBoards(this, this.objects);
    this.objects.player = createPlayer(this, this.objects);
    this.objects.chicken = createChicken(this, this.objects);
    this.objects.cursors = setupInput(this);
    this.objects.player.scale = 0.3;
  }

  update(): void {
    const body = this.objects.player.body as Phaser.Physics.Arcade.Body;

    if (this.objects.cursors.up?.isDown && body.touching.down) {
      body.setVelocityY(-300);
      body.setVelocityX(354);
      this.objects.snapped = false;
      this.objects.player.animationState.setAnimation(0, 'axtoma', true);
    } else if (
      body.touching.down &&
      this?.objects?.player?.animationState?.getCurrent(0)?.animation?.name === 'axtoma'
    ) {
      body.setVelocityX(0);
      this.objects.player.animationState.setAnimation(0, 'dgoma', true);
    }

    // Snap to barrel center when grounded and horizontal movement has stopped
    if (body.touching.down && Math.abs(body.velocity.x) < 5) {
      const x = this.objects.player.x;
      const inBarrelsRange =
        x >= BARRELS_START_X && x <= BARRELS_START_X + BARRELS_AMOUNT * BARREL_WIDTH;
      if (inBarrelsRange) {
        if (!this.objects.snapped) {
          this.objects.snapped = true;
          const zoom = this.cameras.main.zoom;
          const viewportWorldWidth = this.cameras.main.width / zoom;
          const targetCenterX = this.objects.player.x - 444 / zoom + viewportWorldWidth / 2;
          this.cameras.main.pan(targetCenterX, DESIGN_HEIGHT / 2, 300, 'Sine.easeOut');
        }
      }
    }
  }

  destroy(): void {}
}
