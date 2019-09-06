window.character = (() => {
  const START = new V(200, 300);
  const MASS = .8;

  let speed = 4;
  let velocity = new V();
  let acceleration = .1;
  let position;
  const size = {x: 36, y: 59};
  let jump = {
    first: true,
    second: false,
    done: false
  };
  let inAir = false;

  function collision(position, lastPosition) {
    const collisionInfo = {
      touches: [],
      sides: []
    };

    map.getMap().forEach((block) => {
      if (position.x + size.x > block.x && position.x < block.x + block.w && position.y < block.y + block.h && position.y + size.y > block.y) {
        const coords = [
          new V(position.x, block.y + block.h),
          new V(block.x + block.w, position.y),
          new V(position.x, block.y - size.y),
          new V(block.x - size.x, position.y)
        ];
        const distances = [
          // TOP
          (block.y + block.h) - position.y,
          // RIGHT
          (block.x + block.w) - position.x,
          // BOTTOM
          (position.y + size.y) - block.y,
          // LEFT
          (position.x + size.x) - block.x,
        ];

        const side = distances.indexOf(Math.min(...distances));

        collisionInfo.sides.push(side);
        collisionInfo.touches.push({
          side: side,
          intersect: coords[side],
          velocity: block.velocity.get()
        });
      }
    });

    // map.getMap().forEach((item) => {
    //   if (nextPosition.x + b[0] > item.x && nextPosition.x < item.x + item.w && nextPosition.y < item.y + item.h && nextPosition.y + b[1] > item.y) {
    //     // Top part of block
    //     if (lastPosition.y >= item.y + item.h && nextPosition.y < item.y + item.h) {
    //       coefTop = ((item.y + item.h) - lastPosition.y) / (nextPosition.y - lastPosition.y);
    //       intersectPoint = new V(lastPosition.x + coefTop * (nextPosition.x - lastPosition.x), item.y + item.h);
    //       nextPosition.y = intersectPoint.y;
    //       collisionInfo.velocity.apply(item.velocity);
    //       // nextVelocity.y = 0;
    //       // nextVelocity.x = item.speed;
    //       collisionInfo.touches.push('top');
    //     }
    //
    //     // Left part of block
    //     if (lastPosition.x + b[0] <= item.x && nextPosition.x + b[0] > item.x) {
    //       coefLeft = (item.x - (lastPosition.x + b[0])) / (nextPosition.x - lastPosition.x);
    //       intersectPoint = new V(item.x - b[0], lastPosition.y + coefLeft * (nextPosition.y - lastPosition.y));
    //       nextPosition.x = intersectPoint.x;
    //       collisionInfo.velocity.apply(item.velocity);
    //       // nextVelocity.x = 0;
    //       // nextVelocity.y = nextVelocity.y > 0 ? nextVelocity.y : 0;
    //       collisionInfo.touches.push('left');
    //     }
    //
    //     // Bottom part of block
    //     if (lastPosition.y + b[1] <= item.y && nextPosition.y + b[1] > item.y) {
    //       coefBottom = (item.y - lastPosition.y + b[1]) / (nextPosition.y - lastPosition.y);
    //       intersectPoint = new V(lastPosition.x + coefBottom * (nextPosition.x - lastPosition.x), item.y - b[1]);
    //       nextPosition.y = intersectPoint.y;
    //       // collisionInfo.velocity.apply(item.velocity);
    //       // nextVelocity.y = 0;
    //       collisionInfo.touches.push('bottom');
    //     }
    //
    //     // Right part of block
    //     if (lastPosition.x >= item.x + item.w && nextPosition.x < item.x + item.w) {
    //       coefRight = (item.x + item.w - lastPosition.x) / (nextPosition.x - lastPosition.x);
    //       intersectPoint = new V( item.x + item.w, lastPosition.y + coefRight * (nextPosition.y - lastPosition.y));
    //       nextPosition.x = intersectPoint.x;
    //       // nextVelocity.x = 0;
    //       collisionInfo.velocity.apply(item.velocity);
    //       collisionInfo.touches.push('right');
    //     }
    //     // velocity.apply(nextVelocity);
    //     // position.add(nextVelocity);
    //   }
    // });
    return collisionInfo;
  }

  return {
    i: () => {
      position = START.get();
    },
    n: () => {
      const lastPosition = position.get();
      const acc = velocity.get().normalize().mult(-0.017);
      acc.add(gc.gravity.get().mult(MASS));

      velocity.add(acc);

      if (control.pressed[0]) {
        velocity.x = -speed;
        characterAnimations.mirror(true);
      } else if (control.pressed[2]) {
        velocity.x = speed;
        characterAnimations.mirror(false);
      }

      velocity.x = Math.abs(velocity.x) < 5 ? velocity.x : ((Math.abs(velocity.x) / velocity.x) * 5);

      const nextPosition = position.get().add(velocity);

      const collisionResult = collision(nextPosition, lastPosition);

      position.add(velocity);

      collisionResult.touches.forEach((item) => {
        if (item.side === 0) {
          position.y = item.intersect.y;
        }
        if (item.side === 1) {
          position.x = item.intersect.x;
          velocity.x = 0;
        }
        if (item.side === 2) {
          position.y = item.intersect.y;
          velocity.y = 0;
        }
        if (item.side === 3) {
          position.x = item.intersect.x;
          velocity.x = 0;
        }
        velocity = item.velocity;
      });

      if (collisionResult.sides.indexOf(3) !== -1) {
        if (control.pressed[2]) {
          characterAnimations.to('wall');
        }
      }

      if (collisionResult.sides.indexOf(1) !== -1) {
        if (control.pressed[0]) {
          characterAnimations.to('wall');
        }
      }

      if (collisionResult.sides.indexOf(0) !== -1) {
        if (control.pressed[0]) {
          characterAnimations.to('walk');
        }
        if (control.pressed[2]) {
          characterAnimations.to('walk');
        }
        if (!control.pressed[0] && !control.pressed[2]) {
          characterAnimations.to('stay');
        }
        if (control.pressed[1]) {
          if (jump.first) {
            velocity.add(new V(0, 15));
            characterAnimations.to('jump', false, true);
            jump.first = false;
          }
        }

        if (!jump.first && !control.pressed[1]) {
          jump.first = true;
          jump.second = false;
          jump.done = false;
        }

        if (inAir) {
          characterAnimations.to('sit', true);
          inAir = false;
        }
      } else {
        inAir = true;
      }

      if (!collisionResult.touches.length && velocity.y < 0) {
        characterAnimations.to('fall');

        if (control.pressed[1] && jump.second) {
          velocity.apply(new V());
          velocity.add(new V(0, 15));
          characterAnimations.to('jump', false, true);
          jump.second = false;
          jump.done = true;
        }

        if (!control.pressed[1] && !jump.first && !jump.done) {
          jump.second = true;
        }
      }

      if (!control.pressed[1] && velocity.y > 0) {
        velocity.y /= 1.2;
      }

      // console.log(collisionResult.velocity);
      // position.add(velocity);
    },
    r: () => {
      c.save();
      characterAnimations.r(position);
      c.restore();
      // c.save();
      // c.strokeStyle = 'red';
      // c.strokeWidth = 1;
      // c.strokeRect(position.x, position.y, b[0], b[1]);
      // c.restore();
    }
  };
})();
