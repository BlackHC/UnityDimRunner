using UnityEngine;

public class RespawnPlayer : MonoBehaviour {

	public Transform source;

	void OnTriggerEnter (Collider other) {
		GameObject player = GameObject.FindWithTag ("Player");
		player.transform.position = source.position;
	}
}