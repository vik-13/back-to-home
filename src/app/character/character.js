window.character = (() => {
  const START = new V(200, 300);
  const MASS = .4;
  const SPEED_LIMIT = 10;
  const gList = {
    stay: [
      [[[0,9,36,0,21,26],"#000000","black",1],[[21,27,34,39,34,59],"#000000","black",1],[[21,27,21,45,8,58],"#000000","black",1],[[22,7,29,6,26,11],"#000000","red",1]],
      [[[1,12,37,3,22,29],[22,29,35,41,34,59],[22,29,21,47,8,58],[23,10,30,9,27,14]]]
    ],
    walking: [
      [[[0,9,36,0,21,26],"#000000","black",1],[[21,27,34,39,34,59],"#000000","black",1],[[21,27,21,45,8,58],"#000000","black",1],[[22,7,29,6,26,11],"#000000","red",1]],
      [[[3,8,41,5,21,28],[21,27,24,44,13,60],[22,26,28,44,21,58],[24,9,31,10,27,14]],[[0,9,36,0,21,26],[21,27,17,44,1,55],[22,26,34,40,32,58],[22,7,29,6,26,11]],[[2,8,39,3,21,28],[21,26,30,41,25,60],[21,27,25,45,14,60],[23,8,31,9,26,13]]]
    ]
  };
  let sprite;
  let currentSpriteName = '';
  let speed = 4;
  let velocity = new V();
  let acceleration = .1;
  let scale = 1;
  let position;
  const b = [36, 59];
  const mirroring = new V(1, -1);

  function stay() {
    if (currentSpriteName === 'stay') return;
    sprite = new Anim(...gList.stay, 300);
    currentSpriteName = 'stay';
  }

  function walkingRight() {
    if (currentSpriteName === 'walkingRight') return;
    sprite = new Anim(...gList.walking, 150);
    currentSpriteName = 'walkingRight';
    mirroring.x = -1;
  }

  function walkingLeft() {
    if (currentSpriteName === 'walkingLeft') return;
    sprite = new Anim(...gList.walking, 150);
    currentSpriteName = 'walkingLeft';

    mirroring.x = 1;
  }

  function collision(lastPosition) {
    const touches = [];
    let intersectPoint,
      coefTop, coefRight, coefBottom, coefLeft;

    map.getMap().forEach((item) => {
      let nextVelocity = velocity.get();
      if (position.x + b[0] > item.x && position.x < item.x + item.w && position.y < item.y + item.h && position.y + b[1] > item.y) {
        // Top part of block
        if (lastPosition.y >= item.y + item.h && position.y < item.y + item.h) {
          coefTop = ((item.y + item.h) - lastPosition.y) / (position.y - lastPosition.y);
          intersectPoint = new V(lastPosition.x + coefTop * (position.x - lastPosition.x), item.y + item.h);
          position.y = intersectPoint.y;
          nextVelocity.y = 0;
          touches.push('top');
        }

        // Left part of block
        if (lastPosition.x + b[0] <= item.x && position.x + b[0] > item.x) {
          coefLeft = (item.x - (lastPosition.x + b[0])) / (position.x - lastPosition.x);
          intersectPoint = new V(item.x - b[0], lastPosition.y + coefLeft * (position.y - lastPosition.y));
          position.x = intersectPoint.x;
          nextVelocity.x = 0;
          touches.push('left');
        }

        // Bottom part of block
        if (lastPosition.y + b[1] <= item.y && position.y + b[1] > item.y) {
          coefBottom = (item.y - lastPosition.y + b[1]) / (position.y - lastPosition.y);
          intersectPoint = new V(lastPosition.x + coefBottom * (position.x - lastPosition.x), item.y - b[1]);
          position.y = intersectPoint.y;
          nextVelocity.y = 0;
          touches.push('bottom');
        }

        // Right part of block
        if (lastPosition.x >= item.x + item.w && position.x < item.x + item.w) {
          coefRight = (item.x + item.w - lastPosition.x) / (position.x - lastPosition.x);
          intersectPoint = new V( item.x + item.w, lastPosition.y + coefRight * (position.y - lastPosition.y));
          position.x = intersectPoint.x;
          nextVelocity.x = 0;
          touches.push('right');
        }
        velocity.apply(nextVelocity);
      }
    });

    return touches;
  }

  return {
    i: () => {
      position = START.get();
      stay();
    },
    n: () => {
      const lastPosition = position.get();
      const acc = velocity.get().normalize().mult(-0.017);
      acc.add(gc.gravity.get().mult(MASS));

      velocity.add(acc);

      if (control.pressed[0]) {
        velocity.x = -speed;
        walkingRight();
      } else if (control.pressed[2]) {
        velocity.x = speed;
        walkingLeft();
      } else {
        velocity.x = 0;
        stay();
      }

      velocity.x = Math.abs(velocity.x) < 5 ? velocity.x : ((Math.abs(velocity.x) / velocity.x) * 5);

      position.add(velocity);
      collision(lastPosition);
      // console.log(collision(lastPosition));
    },
    r: () => {
      c.save();
      c.translate(position.x + (b[0] / 2), position.y + (b[1] / 2));
      c.scale( mirroring.x * scale, mirroring.y * scale);
      draw.r(sprite.n(), b);
      c.restore();
      c.save();
      c.strokeStyle = 'red';
      c.strokeWidth = 1;
      c.strokeRect(position.x, position.y, b[0], b[1]);
      c.restore();
    }
  };
})();
