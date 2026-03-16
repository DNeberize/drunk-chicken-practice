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

export class MainScene extends Phaser.Scene {
  private player!: SpineGameObject;
  private chicken!: Phaser.GameObjects.Image;
  private blocks!: Phaser.Physics.Arcade.StaticGroup;
  private barrels!: Phaser.Physics.Arcade.StaticGroup;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private worldWidth!: number;
  private snapped = false;

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
    this.worldWidth = BARRELS_START_X + BARRELS_AMOUNT * BARREL_WIDTH + BOARD_W;

    setupWorldAndCamera(this, this.worldWidth);
    createBackground(this, this.worldWidth);
    this.barrels = createBarrels(this);
    this.blocks = createBoards(this, this.worldWidth);
    this.player = createPlayer(this, this.blocks, this.barrels);
    this.chicken = createChicken(this, this.worldWidth);
    this.cursors = setupInput(this);
    this.player.scale = 0.3;
  }

  update(): void {
    const body = this.player.body as Phaser.Physics.Arcade.Body;

    if (this.cursors.up?.isDown && body.touching.down) {
      body.setVelocityY(-300);
      body.setVelocityX(354);
      this.snapped = false;
      this.player.animationState.setAnimation(0, 'axtoma', true);
    } else if (
      body.touching.down &&
      this?.player?.animationState?.getCurrent(0)?.animation?.name === 'axtoma'
    ) {
      body.setVelocityX(0);
      this.player.animationState.setAnimation(0, 'dgoma', true);
    }

    // Snap to barrel center when grounded and horizontal movement has stopped
    if (body.touching.down && Math.abs(body.velocity.x) < 5) {
      const x = this.player.x;
      const inBarrelsRange =
        x >= BARRELS_START_X && x <= BARRELS_START_X + BARRELS_AMOUNT * BARREL_WIDTH;
      if (inBarrelsRange) {
        if (!this.snapped) {
          this.snapped = true;
          const zoom = this.cameras.main.zoom;
          const viewportWorldWidth = this.cameras.main.width / zoom;
          const targetCenterX = this.player.x - 444 / zoom + viewportWorldWidth / 2;
          this.cameras.main.pan(targetCenterX, DESIGN_HEIGHT / 2, 300, 'Sine.easeOut');
        }
      }
    }
  }

  destroy(): void {}
}
