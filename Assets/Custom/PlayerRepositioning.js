#pragma strict

/*
we always snap to the z axis
*/

static var repositionPlayer : boolean = false;

static function GetRepositioningPivot(gameObject : GameObject) {
	return gameObject.transform.Find("RepositioningPivot") || 
		(gameObject.transform.parent && gameObject.transform.parent.Find("RepositioningPivot"));
}

function OnControllerColliderHit (hit : ControllerColliderHit) {
	if( !repositionPlayer ) {
		return;
	}
	
	var repositioningPivot = GetRepositioningPivot(hit.gameObject);
	if( !repositioningPivot ) {
		//Debug.LogWarning( "No repositioning pivot found!" );
		return;
	}
	
	var controllerPosition = hit.controller.transform.position;
	var repositioningPivotPosition = repositioningPivot.transform.position;
	var distance = Mathf.Abs(controllerPosition.z - repositioningPivotPosition.z);
	if( distance > 0.5 && hit.normal.y > 0.5 ) {
		hit.controller.transform.position.z = repositioningPivotPosition.z;
	}
}