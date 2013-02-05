#pragma strict

var targetTransform : Transform;		// Transform to follow
private var thisTransform : Transform;

function Start()
{
	// Cache component lookup at startup instead of doing this every frame
	thisTransform = transform;
}

function Update () 
{
	thisTransform.position.x = targetTransform.position.x;
}