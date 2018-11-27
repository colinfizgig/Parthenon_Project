	AFRAME.registerComponent('object-visible-event', {
	    schema: {
			//target: {type: 'selector', default: ''}
	    },

	    /**
	     * Set if component needs multiple instancing.
	     */
	    multiple: false,

	   
	    /**
	     * Called once when component is attached. Generally for initial setup.
	     */
	    init: function () {
			this.visibleFirst = true;
			this.visibleOffFirst = true;
	    },
		
		tick: function () {
			if(this.visibleOffFirst && this.el.object3D.visible){
				this.visibleFirst = true;
				this.visibleOffFirst = false;
				this.el.emit('objectVisible', {visibleObject: this.el}, true);
			}else if(this.visibleFirst && (this.el.object3D.visible == false)){
				this.visibleOffFirst = true;
				this.visibleFirst = false;
				this.el.emit('objectNotVisible', {visibleObject: this.el}, true);
			}
			
		}

	    
	});
