#pragma strict

// Last time the jump button was clicked down
private var lastButtonTime = -10.0;

function Start () {
	
}

var mode2D : boolean = false;

function Update () {
	if( Input.GetButtonDown( "Switch Dimensions" ) && lastButtonTime < Time.time + 0.1 ) {
		mode2D = !mode2D;
		ExpandCollisions.Set(mode2D);
		GameObject.Find( "Player" ).GetComponent( AdaptedThirdPersonController ).onlyAllowLeftRight = mode2D;
			
		if( mode2D ) {
			Camera.main.nearClipPlane = 500;
			Camera.main.farClipPlane = 1500;
			Camera.main.fieldOfView = 1.0;
			Camera.main.transform.position.z = -1000;
			Camera.main.transform.position.x = 0;
		}
		else {
			Camera.main.nearClipPlane = 0.3;
			Camera.main.farClipPlane = 300;
			Camera.main.fieldOfView = 60.0;
			Camera.main.transform.position.z = -20;
			Camera.main.transform.position.x = -20;
		}
		lastButtonTime = Time.time;
	}
}