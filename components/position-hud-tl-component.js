AFRAME.registerComponent('hud-topleft-component', {
	
  schema: {
		cameraFov: { type:'float', default: 80.0},
		hudDistance: { type:'float', default: 1.0},
		vrOffsetX: {type: 'float', default: 0.7},
		vrOffsetY: {type: 'float', default: 0.1}
	  },

	  /**
	   * Set if component needs multiple instancing.
	   */
	  multiple: false,

	  /**
	   * Called once when component is attached. Generally for initial setup.
	   */
	  init: function(){
			const el = this.el;
			const scene = this.el.sceneEl;
			const myOffsetX = this.data.vrOffsetX;
			const myOffsetY = this.data.vrOffsetY;
			const myHudDist = this.data.hudDistance;
			const camFOV = this.data.cameraFov;
			
			this.headSetEnabled = AFRAME.utils.device.checkHeadsetConnected ();
			const headsetAvailable = AFRAME.utils.device.checkHeadsetConnected ();
			var set = this.set = false;

			this.positionHud();
			this.el.addEventListener('object3dset', this.positionHud.bind(this));
			
			// offset the menu for VR headsets
			window.addEventListener('enter-vr', function(){
				if(headsetAvailable){
					var docWidth = window.innerWidth;
					var docHeight = window.innerHeight;
					var ratioW = docWidth/docHeight;
	
					// Get half of the cameras field of view angle in radians
					var fov = camFOV / 180 * Math.PI / 2;
					// Use trig to get the leftmost point (tangent = o / a)
					var left = -1.0 * (Math.tan( fov ) * myHudDist  * ratioW);
					var topL = Math.tan( fov ) * myHudDist;
				
					el.object3D.position.set((left + myOffsetX), (topL-myOffsetY), -1*(myHudDist));
				}
			});
			
			document.querySelector('a-scene').addEventListener('exit-vr',function() {
				
			});
			  
	  },
	  
	  positionHud: function () {
		
			set = true;
			console.log(set);
	  
			var objDistance = this.data.hudDistance;
			var cameraFov = this.data.cameraFov;
			var docWidth = window.innerWidth;
			var docHeight = window.innerHeight;
			var ratioW = docWidth/docHeight;
	
			// Get half of the cameras field of view angle in radians
			var fov = cameraFov / 180 * Math.PI / 2;
			// Use trig to get the leftmost point (tangent = o / a)
			var left = -1.0 * (Math.tan( fov ) * objDistance  * ratioW);
			var topL = Math.tan( fov ) * objDistance;
			this.el.object3D.position.set(left, topL, -1*(objDistance));
	
	  },
	  
	  tick: function () {
		  
			if(set && !(this.headSetEnabled)){

				var objDistance = this.data.hudDistance;
				var cameraFov = this.data.cameraFov;
				var docWidth = window.innerWidth;
				var docHeight = window.innerHeight;
				var ratioW = docWidth/docHeight;
	
				// Get half of the cameras field of view angle in radians
				var fov = cameraFov / 180 * Math.PI / 2;
				// Use trig to get the leftmost point (tangent = o / a)
				var left = -1.0 * (Math.tan( fov ) * objDistance  * ratioW);
				var topL = Math.tan( fov ) * objDistance;
				this.el.object3D.position.set(left, topL, -1*(objDistance));
			}
	  }


});