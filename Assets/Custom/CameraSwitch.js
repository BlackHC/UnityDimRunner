#pragma strict

// Last time the jump button was clicked down
private var lastButtonTime = -10.0;
private var switchAnimationTime = 2.0;
private var cameraLocalPosition : Vector3;
private var playerOriginalPosition : Vector3;

function Start () {
	animation.wrapMode = WrapMode.ClampForever;
	
	cameraLocalPosition = transform.position;
		
	var player = GameObject.Find( "Player" );
	playerOriginalPosition = player.transform.position;
}

var mode2D : boolean = false;

function Update () {
	var newFieldOfView = Mathf.Rad2Deg * Mathf.Atan( (playerOriginalPosition.z-cameraLocalPosition.z)/(playerOriginalPosition.z-transform.position.z) * Mathf.Tan( Mathf.Deg2Rad * 60.0 ) );
	camera.fieldOfView = newFieldOfView;

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