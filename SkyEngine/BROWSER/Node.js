/**
 * 트리 구조를 정의하기 위한 Node 클래스 
 * 
 * + 이동 처리
 * + 회전 처리
 */
SkyEngine.Node = CLASS({

	init : function(inner, self, params) {
		'use strict';
		//OPTIONAL: params
		//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트
		//OPTIONAL: params.x
		//OPTIONAL: params.y
		//OPTIONAL: params.z
		//OPTIONAL: params.accelX
		//OPTIONAL: params.accelY
		//OPTIONAL: params.alpha
		
		var
		// parent node
		parentNode,

		// child nodes
		childNodes = [],
		
		// x
		x,
		
		// y
		y,
		
		// z
		z,
		
		// speed x
		speedX = 0,
		
		// speed y
		speedY = 0,
		
		// accel x
		accelX,
		
		// accel y
		accelY,
		
		// max speed x (undefined면 무제한)
		maxSpeedX,
		
		// max speed y (undefined면 무제한)
		maxSpeedY,
		
		// to x
		toX,
		
		// to y
		toY,
		
		// alpha
		alpha,
		
		// get children.
		getChildren,

		// set parent.
		setParent,

		// get parent.
		getParent,

		// empty.
		empty,
		
		// append.
		append,
		
		// append to.
		appendTo,
		
		// append to parent.
		appendToParent,
		
		// remove from parent.
		removeFromParent,

		// remove.
		remove,

		// on.
		on,

		// off.
		off,
		
		// fire event.
		fireEvent,
		
		// on meet.
		onMeet,
		
		// off meet.
		offMeet,
		
		// on part.
		onPart,
		
		// off part.
		offPart,
		
		// set x.
		setX,
		
		// get x.
		getX,
		
		// set y.
		setY,
		
		// get y.
		getY,
		
		// set z.
		setZ,
		
		// get z.
		getZ,
		
		// get alpha.
		getAlpha,
		
		// add collider.
		addCollider,
		
		// add touch area.
		addTouchArea,
		
		// move.
		move,
		
		// move left.
		moveLeft,
		
		// stop left.
		stopLeft,
		
		// move right.
		moveRight,
		
		// stop right.
		stopRight,
		
		// move up.
		moveUp,
		
		// stop up.
		stopUp,
		
		// move down.
		moveDown,
		
		// stop down.
		stopDown,
		
		// move to.
		moveTo,
		
		// stop.
		stop,
		
		// step.
		step,
		
		// draw.
		draw,
		
		// hide.
		hide,
		
		// show.
		show;
		
		if (params !== undefined) {
			x = params.x;
			y = params.y;
			z = params.z;
			accelX = params.accelX;
			accelY = params.accelY;
			alpha = params.alpha;
		}
		
		if (x === undefined) {
			x = 0;
		}
		
		if (y === undefined) {
			y = 0;
		}
		
		if (z === undefined) {
			z = 0;
		}
		
		if (accelX === undefined) {
			accelX = 0;
		}
		
		if (accelY === undefined) {
			accelY = 0;
		}
		
		if (alpha === undefined) {
			alpha = 1;
		}
		
		self.getChildren = getChildren = function() {
			return childNodes;
		};
		
		appendToParent = function() {
			
			var
			// parent children
			parentChildren = parentNode.getChildren(),
			
			// min index
			minIndex = 0,
			
			// max index
			maxIndex = parentChildren.length - 1,
			
			// index
			index = -1,
			
			// node
			node;
			
			while (minIndex <= maxIndex) {
				
				index = Math.ceil((minIndex + maxIndex) / 2);
				
				node = parentChildren[index];
				
				if (node.getZ() < z) {
					minIndex = index + 1;
				} else if (node.getZ() > z) {
					maxIndex = index - 1;
				} else {
					break;
				}
			}
			
			parentChildren.splice(index + 1, 0, self);
		};
		
		removeFromParent = function() {
			
			var
			// parent children
			parentChildren = parentNode.getChildren(),
			
			// min index
			minIndex = 0,
			
			// max index
			maxIndex = parentChildren.length - 1,
			
			// index
			index = -1,
			
			// node
			node,
			
			// level
			level = 0;

			while (minIndex <= maxIndex) {
				
				index = Math.ceil((minIndex + maxIndex) / 2);
				
				node = parentChildren[index];
				
				if (node.getZ() < z) {
					minIndex = index + 1;
				} else if (node.getZ() > z) {
					maxIndex = index - 1;
				} else {
					
					while (true) {
						
						if (parentChildren[index - level] === self) {
							parentChildren.splice(index - level, 1);
							break;
						}
						
						if (level > 0 && parentChildren[index + level] === self) {
							parentChildren.splice(index + level, 1);
							break;
						}
						
						if (
						parentChildren[index - level].getZ() !== z &&
						parentChildren[index + level].getZ() !== z) {
							break;
						}
						
						level += 1;
					}
					
					break;
				}
			}
		};

		self.appendTo = appendTo = function(node) {
			//REQUIRED: node
			
			if (parentNode !== undefined) {
				removeFromParent();
			}

			parentNode = node;
			
			appendToParent();

			return self;
		};
		
		self.append = append = function(node) {
			//REQUIRED: node
			
			node.appendTo(self);
		};
		
		self.remove = remove = function() {
			
			if (parentNode !== undefined) {
				
				removeFromParent();
				
				parentNode = undefined;
			}
		};
		
		self.on = on = function() {
			
		};
		
		self.fireEvent = fireEvent = function() {
			
		};
		
		self.setX = setX = function(_x) {
			x = _x;
		};
		
		self.getX = getX = function() {
			return x;
		};
		
		self.setY = setY = function(_y) {
			y = _y;
		};
		
		self.getY = getY = function() {
			return y;
		};
		
		self.setZ = setZ = function(_z) {
			
			if (parentNode !== undefined) {
				removeFromParent();
				z = _z;
				appendToParent();
			}
		};
		
		self.getZ = getZ = function() {
			return z;
		};
		
		self.getAlpha = getAlpha = function() {
			return alpha;
		};
		
		self.moveLeft = moveLeft = function(speed) {
			speedX = -speed;
		};
		
		self.stopLeft = stopLeft = function() {
			if (speedX < 0) {
				speedX = 0;
			}
		};
		
		self.moveRight = moveRight = function(speed) {
			speedX = speed;
		};
		
		self.stopRight = stopRight = function() {
			if (speedX > 0) {
				speedX = 0;
			}
		};
		
		self.moveUp = moveUp = function(speed) {
			speedY = -speed;
		};
		
		self.stopUp = stopUp = function() {
			if (speedY < 0) {
				speedY = 0;
			}
		};
		
		self.moveDown = moveDown = function(speed) {
			speedY = speed;
		};
		
		self.stopDown = stopDown = function() {
			if (speedY > 0) {
				speedY = 0;
			}
		};
		
		self.moveTo = moveTo = function(params) {
			//REQUIRED: params
			//OPTIONAL: params.x
			//OPTIONAL: params.y
			//REQUIRED: params.speed
		};
		
		self.step = step = function(deltaTime) {
			
			if (accelX !== 0) {
				speedX += accelX * deltaTime / 1000;
			}
			
			if (maxSpeedX !== undefined) {
				
				if (maxSpeedX >= 0 && speedX > maxSpeedX) {
					speedX = maxSpeedX;
				}
				
				if (maxSpeedX < 0 && speedX < maxSpeedX) {
					speedX = maxSpeedX;
				}
			}
			
			if (accelY !== 0) {
				speedY += accelY * deltaTime / 1000;
			}
			
			if (maxSpeedY !== undefined) {
				
				if (maxSpeedY >= 0 && speedX > maxSpeedY) {
					speedX = maxSpeedY;
				}
				
				if (maxSpeedY < 0 && speedX < maxSpeedY) {
					speedX = maxSpeedY;
				}
			}
			
			if (speedX !== 0) {
				x += speedX * deltaTime / 1000;
			}
			
			if (speedY !== 0) {
				y += speedY * deltaTime / 1000;
			}
		};
		
		self.draw = draw = function(context, realX, realY, realAlpha) {
			// to implement.
		};
	}
});
