AFRAME.registerComponent('update-texture', {
	
  schema: {
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

			this.updateTexture();
			this.el.addEventListener('object3dset', this.updateTexture.bind(this));   
			  
	  },
	  
	  updateTexture: function () {
		  
		const material = this.el.components.material;
		console.log(material);

			if (material) {
				material.needsUpdate = true;
			}else{
				return;
			}
	
	  },
	  
	  update: function (oldData) {
			const mesh = this.el.getObject3D('mesh');

			if (!mesh) return;

			mesh.traverse(function (node) {
				if ( node instanceof THREE.Mesh ) {
					node.material.needsUpdate = true;
				}
			
			});
		}


});
