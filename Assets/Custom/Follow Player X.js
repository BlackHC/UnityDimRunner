#pragma strict

var targetTransform : Transform;		// Transform to follow
var faceForward : boolean = false;		// Match forward vector?
private var thisTransform : Transform;

function Start()
{
	// Cache component lookup at startup instead of doing this every frame
	thisTransform = transform;
}

function Update () 
{
	thisTransform.position.x = targetTransform.position.x;
	
	//if ( faceForward )
		//thisTransform.forward = targetTransform.forward;
}