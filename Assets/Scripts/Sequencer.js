#pragma strict

var bpm = 128.0;
var fadeSpeed = 2.0;

var flags = [false, false, false, false];
var levels = [0.0, 0.0, 0.0, 0.0];
var position = 0.0;
var showInfo = false;

var switchStyle : GUIStyle;

private var startTime = 0.0;

function Start() {
	yield WaitForSeconds(1.0);
	startTime = Time.time;
	GameObject.Find("Audio Tracks").BroadcastMessage("StartPlay");
}

function Update() {
	if (startTime > 0.0) {
		position = (Time.time - startTime) * bpm / 60.0;
	}

	var fadeDelta = fadeSpeed * Time.deltaTime;
	for (var i = 0; i < 4; i++) {
		levels[i] = Mathf.Clamp01(levels[i] + (flags[i] ? 1.0 : -1.0) * fadeDelta);
	}
}

function OnGUI() {
	GUILayout.BeginArea(Rect(24, 24, Screen.width - 48, Screen.height - 48));
	flags[0] = GUILayout.Toggle(flags[0], "Bass", switchStyle);
	flags[1] = GUILayout.Toggle(flags[1], "Kick", switchStyle);
	flags[2] = GUILayout.Toggle(flags[2], "Beats", switchStyle);
	flags[3] = GUILayout.Toggle(flags[3], "Ride", switchStyle);
	GUILayout.FlexibleSpace();
	showInfo = GUILayout.Toggle(showInfo, "Show Rig", switchStyle);
	GUILayout.EndArea();
}