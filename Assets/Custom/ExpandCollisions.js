#pragma strict

static var DEFAULT_LAYER = 0;
static var EXPANDED_COLLISION_LAYER = 8;

static function Set(activate : boolean) {
	PlayerRepositioning.repositionPlayer = activate;
	Physics.IgnoreLayerCollision(DEFAULT_LAYER, EXPANDED_COLLISION_LAYER, !activate);
}