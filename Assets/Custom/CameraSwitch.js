#pragma strict

// Last time the jump button was clicked down
private var lastButtonTime = -10.0;
private var switchAnimationTime = 0.5;
private var originalCameraPlayerDistance : float;

function Start () {
	animation.wrapMode = WrapMode.ClampForever;
	
	// fix camera
	// Set up some state;
	animation["SwitchCameraTo2D"].normalizedTime = 0.0;
	animation["SwitchCameraTo2D"].speed = -1.0;
	// Sample animations now.
	animation.Play("SwitchCameraTo2D");
	animation.Sample();	
	
	var player = GameObject.Find( "Player" );
	originalCameraPlayerDistance = (player.transform.position - transform.position).magnitude;
	
	animation.Stop();
}

var mode2D : boolean = false;

function LateUpdate() {
	var player = GameObject.Find( "Player" );
	var cameraPlayerDistance = (player.transform.position - transform.position).magnitude;
	
	var newFieldOfView = Mathf.Rad2Deg * Mathf.Atan( originalCameraPlayerDistance/cameraPlayerDistance * Mathf.Tan( Mathf.Deg2Rad * 60.0 ) );
	camera.fieldOfView = newFieldOfView;
}

function Update () {
	if( Input.GetButtonDown( "Switch Dimensions" ) && lastButtonTime < Time.time + switchAnimationTime ) {
		mode2D = !mode2D;
		ExpandCollisions.Set(mode2D);
		
		var player = GameObject.Find( "Player" );
		player.GetComponent( AdaptedThirdPersonController ).onlyAllowLeftRight = mode2D;
			
		if( mode2D ) {
			animation["SwitchCameraTo2D"].normalizedTime = 0.0;
			animation["SwitchCameraTo2D"].speed = 1.0;
			Camera.mainCamera.animation.CrossFade ("SwitchCameraTo2D");
			/*Camera.main.nearClipPlane = 500;
			Camera.main.farClipPlane = 1500;
			Camera.main.fieldOfView = 1.0;
			Camera.main.transform.position.z = -1000;
			Camera.main.transform.position.x = 0;*/
			
		}
		else {
			animation["SwitchCameraTo2D"].normalizedTime = 1.0;
			animation["SwitchCameraTo2D"].speed = -1.0;
			Camera.mainCamera.animation.CrossFade ("SwitchCameraTo2D");
			/*Camera.main.nearClipPlane = 0.3;
			Camera.main.farClipPlane = 300;
			Camera.main.fieldOfView = 60.0;
			Camera.main.transform.position.z = -20;
			Camera.main.transform.position.x = -20;*/
		}
		lastButtonTime = Time.time;
	}
}