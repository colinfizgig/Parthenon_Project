AFRAME.registerComponent('scalenormals', {
	
  schema: {
	    normalScaleX: { type:'number', default: 1.0},
		normalScaleY: { type:'number', default: 1.0}
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

			this.applyScale();
			this.el.addEventListener('object3dset', this.applyScale.bind(this));   
			  
	  },
	  
	  applyScale: function () {
		  
		const mesh = this.el.getObject3D('mesh');
		const normalX = this.data.normalScaleX;
		const normalY = this.data.normalScaleY;

		if (!mesh) return;

		mesh.traverse(function (node) {
			if ( node instanceof THREE.Mesh ) {
				node.material.normalScale.y = normalY;
				node.material.normalScale.x = normalX;
				node.material.needsUpdate = true;
			}
			
		});
	
	  },
	  
	  update: function (oldData) {
			const mesh = this.el.getObject3D('mesh');
			const normalX = this.data.normalScaleX;
			const normalY = this.data.normalScaleY;

			if (!mesh) return;

			mesh.traverse(function (node) {
				if ( node instanceof THREE.Mesh ) {
					node.material.normalScale.y = normalY;
					node.material.normalScale.x = normalX;
					node.material.needsUpdate = true;
				}
			
			});
		}


});